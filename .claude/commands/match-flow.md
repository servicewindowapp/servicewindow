# /match-flow — Scaffold Match Interaction Flow

Scaffold the complete match lifecycle: operator submits a response, requester selects one, both get confirmation, status updates, and competing responses auto-decline.

## Invocation
```
/match-flow
/match-flow [context: api | components | both]
```

Default: generates both API routes and React components.

---

## Flow States

```
Request: active
  └─ Operator submits response → Match: pending
  └─ Operator submits response → Match: pending  (multiple operators can respond)
  └─ Requester selects one    → Match (selected): accepted
                               → Request: matched
                               → All other Matches: declined (auto, in transaction)
  └─ Event occurs             → Match: completed (manual trigger or date-based job)
  └─ Match: completed         → Reviews unlock
```

---

## API Routes

### `src/app/api/matches/route.ts` — Operator submits response

```typescript
import { requireOperator } from '@/lib/auth/guards'
import { requireActiveSubscription, SubscriptionError } from '@/lib/auth/subscription'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'

const matchSubmitSchema = z.object({
  request_id: z.string().uuid(),
  operator_note: z.string().max(500).optional(),
  proposed_rate: z.number().positive().optional(),
})

export async function POST(request: Request) {
  // Guard: operator role
  const userOrResponse = await requireOperator(request)
  if (userOrResponse instanceof Response) return userOrResponse
  const operator = userOrResponse

  // Guard: active subscription — server-side, always
  try {
    await requireActiveSubscription(operator.id)
  } catch (err) {
    if (err instanceof SubscriptionError) {
      return Response.json({ error: err.message, code: err.code }, { status: 403 })
    }
    throw err
  }

  const body = await request.json()
  const validation = matchSubmitSchema.safeParse(body)
  if (!validation.success) {
    return Response.json({ error: 'Invalid input', details: validation.error.flatten() }, { status: 400 })
  }

  const supabase = createRouteHandlerClient({ cookies })

  // Verify request exists and is active
  const { data: req } = await supabase
    .from('requests')
    .select('id, status, expires_at')
    .eq('id', validation.data.request_id)
    .single()

  if (!req || req.status !== 'active' || new Date(req.expires_at) < new Date()) {
    return Response.json({ error: 'Request is no longer accepting responses' }, { status: 422 })
  }

  // Check for duplicate response (UNIQUE constraint will also catch this at DB level)
  const { data: existing } = await supabase
    .from('matches')
    .select('id')
    .eq('request_id', validation.data.request_id)
    .eq('operator_id', operator.id)
    .single()

  if (existing) {
    return Response.json({ error: 'You have already responded to this request' }, { status: 409 })
  }

  const { data: match, error } = await supabase
    .from('matches')
    .insert({
      request_id: validation.data.request_id,
      operator_id: operator.id,
      operator_note: validation.data.operator_note ?? null,
      proposed_rate: validation.data.proposed_rate ?? null,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    console.error('Match insert error:', error)
    return Response.json({ error: 'Failed to submit response — please try again' }, { status: 500 })
  }

  return Response.json({ match }, { status: 201 })
}
```

### `src/app/api/matches/[matchId]/accept/route.ts` — Requester accepts a response

```typescript
import { requireRequester } from '@/lib/auth/guards'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(
  request: Request,
  { params }: { params: { matchId: string } }
) {
  const userOrResponse = await requireRequester(request)
  if (userOrResponse instanceof Response) return userOrResponse
  const requester = userOrResponse

  const supabase = createRouteHandlerClient({ cookies })

  // Verify the match belongs to a request owned by this requester
  const { data: match } = await supabase
    .from('matches')
    .select(`
      id,
      status,
      request_id,
      requests!inner (
        id,
        requester_id,
        status
      )
    `)
    .eq('id', params.matchId)
    .single()

  if (!match) {
    return Response.json({ error: 'Match not found' }, { status: 404 })
  }

  // Verify ownership
  if (match.requests.requester_id !== requester.id) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (match.status !== 'pending') {
    return Response.json({ error: 'This response is no longer available' }, { status: 422 })
  }

  if (match.requests.status !== 'active') {
    return Response.json({ error: 'This request is no longer active' }, { status: 422 })
  }

  // Transaction: accept this match, decline all others, update request status
  const { error: rpcError } = await supabase.rpc('accept_match', {
    p_match_id: params.matchId,
    p_request_id: match.request_id,
  })

  if (rpcError) {
    console.error('accept_match RPC error:', rpcError)
    return Response.json({ error: 'Failed to confirm match — please try again' }, { status: 500 })
  }

  return Response.json({ success: true, matchId: params.matchId })
}
```

```sql
-- Database function: accept_match (runs as a transaction)
CREATE OR REPLACE FUNCTION accept_match(p_match_id uuid, p_request_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Accept the selected match
  UPDATE matches
  SET status = 'accepted', resolved_at = now(), updated_at = now()
  WHERE id = p_match_id;

  -- Decline all other pending matches on this request
  UPDATE matches
  SET status = 'declined', resolved_at = now(), updated_at = now()
  WHERE request_id = p_request_id
    AND id != p_match_id
    AND status = 'pending';

  -- Update request status to matched
  UPDATE requests
  SET status = 'matched', updated_at = now()
  WHERE id = p_request_id;
END;
$$;
```

---

## UI Components

### `src/components/MatchResponseCard/MatchResponseCard.tsx`

```tsx
// Shown in the requester's request detail view — one card per operator response
interface MatchResponseCardProps {
  match: {
    id: string
    operator_name: string
    operator_cuisine: string[]
    operator_rating: number | null
    proposed_rate: number | null
    operator_note: string | null
    responded_at: string
  }
  onAccept: (matchId: string) => Promise<void>
  isAccepting: boolean
}

export function MatchResponseCard({ match, onAccept, isAccepting }: MatchResponseCardProps) {
  return (
    <article aria-label={`Response from ${match.operator_name}`}>
      {/* Operator identity */}
      {/* Proposed rate */}
      {/* Operator note */}
      {/* Accept button */}
      <Button
        onClick={() => onAccept(match.id)}
        disabled={isAccepting}
        aria-busy={isAccepting}
      >
        {isAccepting ? 'Confirming...' : `Select ${match.operator_name}`}
      </Button>
    </article>
  )
}
```

### `src/components/MatchConfirmation/MatchConfirmation.tsx`

```tsx
// Shown to both parties after a match is accepted
// Requester sees: operator name, truck info, contact info (now revealed), event details
// Operator sees: event details, requester name, contact info (now revealed), event address
interface MatchConfirmationProps {
  match: AcceptedMatch
  viewAs: 'requester' | 'operator'
}
```

---

## Test Stubs

```typescript
// src/app/api/matches/route.test.ts
describe('POST /api/matches', () => {
  it('returns 201 with match data when operator submits a valid response', async () => { /* TODO */ })
  it('returns 403 when operator has no active subscription', async () => { /* TODO */ })
  it('returns 403 when user is not an operator', async () => { /* TODO */ })
  it('returns 409 when operator has already responded to this request', async () => { /* TODO */ })
  it('returns 422 when the request is expired or not active', async () => { /* TODO */ })
})

describe('POST /api/matches/[matchId]/accept', () => {
  it('returns 200 and declines all other pending matches', async () => { /* TODO */ })
  it('returns 403 when a requester tries to accept a match on another requester\'s request', async () => { /* TODO */ })
  it('returns 422 when the match is not in pending status', async () => { /* TODO */ })
  it('updates the request status to matched', async () => { /* TODO */ })
})
```

---

## Flags

- The `accept_match` database function runs as a transaction — if it doesn't exist, the accept route will fail. Create this migration before wiring the UI.
- Notification triggers (Supabase Realtime) for match acceptance need to be added as Postgres triggers on the `matches` table.
- The "competing responses auto-decline" behavior is handled entirely in the `accept_match` DB function — never re-implement this logic in application code.
