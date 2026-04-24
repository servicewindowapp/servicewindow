# /review-prompt — Scaffold Post-Event Review Flow

Scaffold the two-direction review system triggered when a match reaches `completed` status. Neither review is shown publicly until both are submitted or the 7-day window expires.

## Invocation
```
/review-prompt
/review-prompt [context: api | components | both]
```

---

## Review Rules — Encode These Before Writing Code

1. Reviews only unlock when `match.status = 'completed'` — never before
2. Two directions: requester reviews operator AND operator reviews requester
3. Neither review is public until BOTH are submitted OR the 7-day window expires
4. Each person can only submit one review per match (enforced by `UNIQUE (match_id, reviewer_id)`)
5. The window is 7 days from when `match.status` becomes `completed`
6. After 7 days, unsubmitted reviews auto-expire — the submitted review becomes visible on its own
7. Reviews cannot be edited after submission

---

## Schema

```sql
-- Already in marketplace-architecture skill — reproduced for reference
-- reviews table with the key constraints:
-- UNIQUE (match_id, reviewer_id)
-- CHECK: reviewer_id must be either the requester or operator on the parent match
-- is_public starts false; set to true when both submitted OR 7-day window expires

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS window_expires_at timestamptz;
-- Set on match completion: now() + INTERVAL '7 days'

-- Function to set review windows when a match completes
CREATE OR REPLACE FUNCTION open_review_window()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Notify both parties reviews are now available
    INSERT INTO notifications (user_id, type, reference_id, message)
    SELECT r.requester_id, 'review_requested', NEW.id, 'Your event is complete — leave a review.'
    FROM requests r WHERE r.id = NEW.request_id
    UNION ALL
    SELECT NEW.operator_id, 'review_requested', NEW.id, 'Your event is complete — leave a review.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Daily job: publish reviews where window has expired
UPDATE reviews r
SET is_public = true
WHERE is_public = false
  AND window_expires_at < now()
  AND EXISTS (
    SELECT 1 FROM reviews r2
    WHERE r2.match_id = r.match_id
      AND r2.id != r.id
  );  -- only publish if the other review was submitted; if not, the lone review stays private
-- Note: decide with user whether a lone review after expiry should publish — flag this as an open question
```

---

## API Routes

### `src/app/api/reviews/route.ts` — Submit a review

```typescript
import { requireAuth } from '@/lib/auth/guards'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'

const reviewSchema = z.object({
  match_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
})

export async function POST(request: Request) {
  const userOrResponse = await requireAuth(request)
  if (userOrResponse instanceof Response) return userOrResponse
  const user = userOrResponse

  const body = await request.json()
  const validation = reviewSchema.safeParse(body)
  if (!validation.success) {
    return Response.json({ error: 'Invalid input', details: validation.error.flatten() }, { status: 400 })
  }

  const supabase = createRouteHandlerClient({ cookies })

  // Verify the match is completed
  const { data: match } = await supabase
    .from('matches')
    .select(`
      id, status, operator_id,
      requests!inner ( requester_id )
    `)
    .eq('id', validation.data.match_id)
    .single()

  if (!match) {
    return Response.json({ error: 'Match not found' }, { status: 404 })
  }

  // Gate: reviews only available on completed matches
  if (match.status !== 'completed') {
    return Response.json(
      { error: 'Reviews are only available after the event is marked complete' },
      { status: 422 }
    )
  }

  // Gate: reviewer must be a party to this match
  const isRequester = match.requests.requester_id === user.id
  const isOperator = match.operator_id === user.id

  if (!isRequester && !isOperator) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const revieweeId = isRequester ? match.operator_id : match.requests.requester_id

  // Filter content before storage
  const { filterUserContent } = await import('@/lib/content/filter')
  const filteredComment = validation.data.comment
    ? await filterUserContent(validation.data.comment)
    : null

  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      match_id: validation.data.match_id,
      reviewer_id: user.id,
      reviewee_id: revieweeId,
      rating: validation.data.rating,
      comment: filteredComment,
      is_public: false,  // never public on insert — visibility logic runs separately
    })
    .select()
    .single()

  if (error) {
    // UNIQUE constraint violation = already reviewed
    if (error.code === '23505') {
      return Response.json({ error: 'You have already submitted a review for this event' }, { status: 409 })
    }
    return Response.json({ error: 'Failed to submit review — please try again' }, { status: 500 })
  }

  // Check if both reviews are now in — if so, publish both
  await maybePublishReviews(supabase, validation.data.match_id)

  return Response.json({ review }, { status: 201 })
}

async function maybePublishReviews(supabase: any, matchId: string) {
  const { data: reviews } = await supabase
    .from('reviews')
    .select('id')
    .eq('match_id', matchId)

  if (reviews?.length === 2) {
    await supabase
      .from('reviews')
      .update({ is_public: true })
      .eq('match_id', matchId)
  }
}
```

---

## UI Components

### `src/components/ReviewPrompt/ReviewPrompt.tsx`

```tsx
"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ReviewPromptProps {
  matchId: string
  revieweeType: 'operator' | 'requester'
  revieweeName: string
  onSubmitSuccess: () => void
}

export function ReviewPrompt({
  matchId,
  revieweeType,
  revieweeName,
  onSubmitSuccess,
}: ReviewPromptProps) {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const prompt = revieweeType === 'operator'
    ? `How was your experience with ${revieweeName}?`
    : `How was ${revieweeName} as an event host?`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a star rating before submitting.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_id: matchId, rating, comment }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error ?? 'Something went wrong — please try again.')
        return
      }

      onSubmitSuccess()
    } catch {
      setError('Could not submit your review. Check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayRating = hoveredRating || rating

  return (
    <form onSubmit={handleSubmit} aria-label={`Review for ${revieweeName}`}>
      <p className="font-medium">{prompt}</p>

      {/* Star rating */}
      <fieldset>
        <legend className="sr-only">Rating out of 5 stars</legend>
        <div className="flex gap-1" role="group">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`${star} star${star !== 1 ? 's' : ''}`}
              aria-pressed={rating === star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
            >
              <Star
                size={24}
                aria-hidden="true"
                className={
                  star <= displayRating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-neutral-300'
                }
              />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Comment */}
      <div>
        <Label htmlFor="review-comment">
          Tell others about your experience (optional)
        </Label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          placeholder={
            revieweeType === 'operator'
              ? 'e.g., The truck arrived on time and the food was excellent. Would book again for our next HOA event.'
              : 'e.g., Great communication, clear about the space requirements. Event ran smoothly.'
          }
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">{error}</p>
      )}

      <p className="text-sm text-muted-foreground">
        Your review won't appear publicly until the other party also submits theirs,
        or 7 days have passed.
      </p>

      <Button type="submit" disabled={isSubmitting || rating === 0} aria-busy={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit review'}
      </Button>
    </form>
  )
}
```

---

## Test Stubs

```typescript
// src/app/api/reviews/route.test.ts
describe('POST /api/reviews', () => {
  it('returns 201 when a valid review is submitted for a completed match', async () => { /* TODO */ })
  it('returns 422 when the match is not yet completed', async () => { /* TODO */ })
  it('returns 409 when the user has already reviewed this match', async () => { /* TODO */ })
  it('returns 403 when the reviewer is not a party to the match', async () => { /* TODO */ })
  it('publishes both reviews when the second one is submitted', async () => { /* TODO */ })
  it('does not publish reviews when only one has been submitted', async () => { /* TODO */ })
})
```

---

## Open Question — Flag Before Implementing

After the 7-day window expires with only one review submitted: does the single submitted review become public, or does it stay private forever?

This is a business decision. Options:
- **Publish lone review after expiry** — more content in the system, but the lone reviewer may feel exposed
- **Keep lone review private forever** — cleaner, but means incomplete events produce no public data

Default assumption in this scaffold: **lone review stays private after window expiry**. Override in `maybePublishReviews()` if the business decision changes.
