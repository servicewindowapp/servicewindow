# Trust & Safety Skill
> Apply to all feature work. Trust is the core product promise. Never compromise it for convenience.

---

## Operator Listing Completeness — Incomplete Profiles Are Hidden, Not Shown With Gaps

An operator listing is visible in feeds only when ALL of the following are true:

| Requirement | Column | Validation |
|-------------|--------|-----------|
| At least one photo | `photo_urls` | `array_length(photo_urls, 1) >= 1` |
| At least one cuisine type | `cuisine_types` | `array_length(cuisine_types, 1) >= 1` |
| Service radius set | `service_radius_m` | `service_radius_m > 0` |
| Base location set | `base_location` | `base_location IS NOT NULL` |
| Active subscription | `subscriptions.status` | `status IN ('active', 'trialing')` |
| Listing marked active | `listings.is_active` | `is_active = true` |

`is_active` is **never set by the operator directly** — it is computed and set by a database function when all requirements are met.

```sql
-- Function to re-evaluate listing visibility (called after any listing update)
CREATE OR REPLACE FUNCTION update_listing_active_status(listing_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE listings l
  SET is_active = (
    array_length(l.photo_urls, 1) >= 1
    AND array_length(l.cuisine_types, 1) >= 1
    AND l.service_radius_m > 0
    AND l.base_location IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM subscriptions s
      WHERE s.operator_id = l.operator_id
        AND s.status IN ('active', 'trialing')
    )
  )
  WHERE l.id = listing_id;
END;
$$ LANGUAGE plpgsql;
```

```
🔴 TRUST VIOLATION — Incomplete listing in feed
A listing is appearing in operator feeds without meeting all completeness requirements.
Listings must be hidden (is_active = false) if any requirement is unmet.
Never show a listing with missing fields as a "partial" profile.
```

---

## Health Certification — Required for Verified Badge

The "verified" badge on an operator listing means health certifications have been reviewed and approved by an admin. It does not mean "signed up."

```
🟡 TRUST FLAG — Verified badge without certification
The 'is_verified' flag on listings.is_verified can only be set to true by an admin 
after reviewing cert_urls. It cannot be set by:
  - An automated process
  - A webhook
  - The operator themselves
  - Any API route that doesn't require admin role

Any code that sets is_verified = true must confirm it's executing in an admin context.
```

UI rule: The "Verified" badge only renders if `listing.is_verified === true`. Never show it based on `is_active` or subscription status.

---

## No Direct Contact Before Match Acceptance

Phone numbers and email addresses are **never exposed** before a Match reaches `accepted` status. This is a hard rule — not a UX preference.

```typescript
// Contact info sanitization by match status
function getContactVisibility(
  match: Match,
  requestingUserId: string
): ContactInfo | RedactedContact {
  if (match.status !== 'accepted') {
    return {
      name: match.operator_name,  // name only
      phone: null,                // 🔴 never exposed before acceptance
      email: null,                // 🔴 never exposed before acceptance
      _redacted: true,
    }
  }

  // Only after acceptance: full contact
  return {
    name: match.operator_name,
    phone: match.operator_phone,
    email: match.operator_email,
  }
}
```

The same applies to operators — requester contact info is not exposed until the match is accepted.

```
🔴 CONTACT EXPOSURE VIOLATION
Phone number or email is being surfaced before match.status = 'accepted'.
This breaks trust and could expose users to spam/harassment.
Redact immediately — expose only name and cuisine until acceptance.
```

---

## Report/Flag Mechanism — Required on All UGC

Every request post and operator listing must have a "Report" option. Reports route to an internal moderation queue — not email.

```sql
CREATE TABLE reports (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
  reporter_id  uuid NOT NULL REFERENCES users(id)
  target_type  text NOT NULL CHECK (target_type IN ('request', 'listing', 'match', 'review'))
  target_id    uuid NOT NULL
  reason       text NOT NULL CHECK (reason IN (
    'spam', 'fake_listing', 'inappropriate_content', 
    'harassment', 'fraud', 'other'
  ))
  description  text
  status       text NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'reviewed', 'actioned', 'dismissed'))
  created_at   timestamptz DEFAULT now()
  reviewed_by  uuid REFERENCES users(id)  -- admin who reviewed
  reviewed_at  timestamptz
)
```

The admin dashboard consumes `reports WHERE status = 'pending'`. No report sends an email to the reported user or the reporter — moderation is asynchronous and internal.

---

## Rate Limiting — Defined in Config, Not Hardcoded

```typescript
// config/rate-limits.ts
export const RATE_LIMITS = {
  requestPosting: {
    maxPerHour: 3,       // requesters can post 3 requests per hour
    maxPerDay: 10,       // and 10 per day
  },
  matchResponse: {
    maxPerHour: 20,      // operators can respond to 20 requests per hour
    maxPerDay: 50,
  },
  reportSubmission: {
    maxPerHour: 5,       // prevent report spam
  },
} as const
```

Apply rate limits at the API route level using Upstash Rate Limit or Vercel Edge Middleware. Never enforce rate limits only in the UI.

---

## Inactive Account Handling

### Requests
- Requests older than 90 days with `status = 'active'` (no match accepted) auto-archive to `status = 'expired'`
- Run as scheduled job alongside the standard expiry job

### Operator Listings
- Operator listings where the operator has not logged in for 60 days get `is_active = false` and a reactivation email
- After the email, listing remains hidden until the operator logs in and re-activates
- This prevents stale listings from appearing in the operator feed

```sql
-- Detect inactive operators (run as weekly job)
SELECT u.id, u.email, l.id as listing_id
FROM users u
JOIN listings l ON l.operator_id = u.id
WHERE l.is_active = true
  AND u.last_login_at < now() - INTERVAL '60 days'
  AND NOT EXISTS (
    SELECT 1 FROM inactivity_notices n
    WHERE n.user_id = u.id
      AND n.sent_at > now() - INTERVAL '60 days'
  );
```

---

## Content Filtering — Before Storage, Not Just Display

All user-generated text content (descriptions, bios, event notes, review comments) passes through a profanity and spam filter **before being written to the database**.

```typescript
// lib/content/filter.ts
import { FilterResult, checkContent } from '@/lib/content/provider'

export async function filterUserContent(content: string): Promise<string> {
  const result: FilterResult = await checkContent(content)

  if (result.blocked) {
    throw new ContentFilterError(
      'Your content contains terms that are not allowed on this platform.'
    )
  }

  // Return the cleaned version (provider may sanitize allowed content)
  return result.cleaned ?? content
}

// In any API route that accepts user text:
const filteredDescription = await filterUserContent(body.description)
await db.listings.update({ description: filteredDescription })
```

The filter runs server-side in the API/Server Action, not on the client.

---

## Account Deletion — Anonymize, Don't Hard Delete

Deleted accounts preserve marketplace integrity. Reviews and request history remain, attributed to "[Deleted User]."

```sql
-- On account deletion (soft delete pattern)
UPDATE users
SET
  email = 'deleted-' || id || '@deleted.invalid',
  display_name = 'Deleted User',
  phone = null,
  avatar_url = null,
  is_deleted = true,
  deleted_at = now()
WHERE id = $user_id;

-- reviews.reviewer_id and reviewee_id remain intact (FK preserved)
-- requests.requester_id remains intact
-- The display layer shows 'Deleted User' when display_name = 'Deleted User'
-- Hard delete is never run — run VACUUM if storage is a concern, not row deletion
```

---

## Trust Flag Summary — Check Before Any Feature Involving UGC or User Data

- [ ] Is a listing appearing in the feed? → Is `is_active = true` verified by the completeness function?
- [ ] Is the verified badge showing? → Is `is_verified = true` set only by admin action?
- [ ] Is contact info being shown? → Is match.status = 'accepted'?
- [ ] Is user-generated content being stored? → Did it pass through the content filter?
- [ ] Is a report being submitted? → Does it write to the reports table (not send email)?
- [ ] Is an account being deleted? → Is it anonymized, not hard deleted?
