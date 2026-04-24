# Marketplace Architecture Skill
> Apply to all backend, database, and API work. The free/paid split is the core business model.
> Any feature that accidentally monetizes requesters or gives operators free access is a P0 bug.

---

## The Two User Types — Never Conflate

| | Requester | Operator |
|--|-----------|----------|
| Who | Individual or org posting food truck requests | Food truck owner/business |
| Pricing | Free forever | Monthly subscription required |
| Primary action | Post a request | Respond to requests |
| Payment involvement | None — requesters are never charged | Stripe subscription only |
| Auth | Shared `users` table with `role: 'requester'` | Shared `users` table with `role: 'operator'` |
| Role change | Cannot become an operator on the same account | Cannot become a requester on the same account |

**Hard rule:** Any code path that calls a payment or billing function with a requester's user ID is a bug. Flag it as P0 before proceeding.

---

## Core Entity Schema

### `users`
```sql
id            uuid PRIMARY KEY DEFAULT gen_random_uuid()
email         text UNIQUE NOT NULL
role          text NOT NULL CHECK (role IN ('requester', 'operator', 'admin'))
display_name  text NOT NULL
phone         text
avatar_url    text
is_verified   boolean DEFAULT false
created_at    timestamptz DEFAULT now()
updated_at    timestamptz DEFAULT now()

-- No payment fields on this table
-- Operators have a separate subscriptions table
```

### `requests` (created by requesters only)
```sql
id               uuid PRIMARY KEY DEFAULT gen_random_uuid()
requester_id     uuid NOT NULL REFERENCES users(id)
title            text NOT NULL
event_type       text NOT NULL  -- 'corporate', 'private_party', 'hoa_community', 'wedding', 'festival', 'other'
location_address text NOT NULL
location_point   geography(POINT, 4326) NOT NULL  -- PostGIS point, required
location_notes   text
event_date       date NOT NULL
start_time       time NOT NULL
end_time         time NOT NULL
headcount_min    integer
headcount_max    integer NOT NULL
cuisine_prefs    text[]  -- array of cuisine types, optional
budget_min       numeric(10,2)
budget_max       numeric(10,2)
notes            text
status           text NOT NULL DEFAULT 'active'
                 CHECK (status IN ('active', 'matched', 'completed', 'expired', 'canceled'))
expires_at       timestamptz NOT NULL  -- set at creation, not nullable
created_at       timestamptz DEFAULT now()
updated_at       timestamptz DEFAULT now()

-- Constraint: expires_at must be set at creation — never null
-- Constraint: end_time must be after start_time
-- Constraint: requester_id must resolve to a user with role='requester'
```

### `listings` (operator truck profiles)
```sql
id               uuid PRIMARY KEY DEFAULT gen_random_uuid()
operator_id      uuid NOT NULL REFERENCES users(id) UNIQUE  -- one listing per operator
truck_name       text NOT NULL
description      text
cuisine_types    text[] NOT NULL  -- at least one required
service_radius_m integer NOT NULL  -- meters, enforced server-side
base_location    geography(POINT, 4326) NOT NULL  -- PostGIS center of service area
pricing_model    text CHECK (pricing_model IN ('hourly', 'flat_rate', 'per_head', 'negotiable'))
hourly_rate      numeric(10,2)
flat_rate        numeric(10,2)
capacity_min     integer
capacity_max     integer
photo_urls       text[]  -- at minimum one required before listing is active
cert_urls        text[]  -- health certifications
social_links     jsonb   -- { instagram, facebook, website, yelp }
is_active        boolean DEFAULT false  -- false until profile is complete + subscription active
is_verified      boolean DEFAULT false  -- set by admin after cert review
created_at       timestamptz DEFAULT now()
updated_at       timestamptz DEFAULT now()

-- Constraint: operator_id must resolve to a user with role='operator'
-- is_active can only be true if: photo_urls is not empty, cuisine_types is not empty, 
--   service_radius_m > 0, AND subscription is active
```

### `matches` (operator response to a request)
```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
request_id      uuid NOT NULL REFERENCES requests(id)
operator_id     uuid NOT NULL REFERENCES users(id)
status          text NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'accepted', 'declined', 'expired', 'withdrawn'))
operator_note   text
proposed_rate   numeric(10,2)
responded_at    timestamptz DEFAULT now()
resolved_at     timestamptz  -- set when status changes from pending
created_at      timestamptz DEFAULT now()
updated_at      timestamptz DEFAULT now()

UNIQUE (request_id, operator_id)  -- one response per operator per request
```

### `subscriptions` (operators only)
```sql
id                    uuid PRIMARY KEY DEFAULT gen_random_uuid()
operator_id           uuid NOT NULL REFERENCES users(id) UNIQUE
stripe_customer_id    text NOT NULL UNIQUE
stripe_subscription_id text NOT NULL UNIQUE
plan                  text NOT NULL CHECK (plan IN ('founding', 'standard', 'pro'))
status                text NOT NULL
                      CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete'))
current_period_start  timestamptz NOT NULL
current_period_end    timestamptz NOT NULL
cancel_at_period_end  boolean DEFAULT false
trial_end             timestamptz  -- null if not on trial
created_at            timestamptz DEFAULT now()
updated_at            timestamptz DEFAULT now()

-- Never store: card numbers, CVV, full PAN, bank account numbers
-- Only store: stripe_customer_id and stripe_subscription_id
```

### `reviews`
```sql
id           uuid PRIMARY KEY DEFAULT gen_random_uuid()
match_id     uuid NOT NULL REFERENCES matches(id)
reviewer_id  uuid NOT NULL REFERENCES users(id)
reviewee_id  uuid NOT NULL REFERENCES users(id)
rating       integer NOT NULL CHECK (rating BETWEEN 1 AND 5)
comment      text
is_public    boolean DEFAULT false  -- true only after both reviews submitted or window expires
created_at   timestamptz DEFAULT now()

UNIQUE (match_id, reviewer_id)  -- one review per person per match
-- Constraint: match.status must be 'completed' before a review can be inserted
-- Constraint: reviewer_id must be either the requester or operator on the parent match
```

---

## Business Rules — Flag Violations Before Writing Code

### Rule 1: Subscription Gate — API Level, Not UI Level
```
🔴 SUBSCRIPTION GATE VIOLATION
Operators CANNOT respond to requests without an active subscription.
This check must happen in the API route / Server Action — not in the UI component.
UI gates are cosmetic. The gate that matters is server-side.

Required check before any operator action:
const subscription = await getOperatorSubscription(operatorId)
if (!subscription || !['active', 'trialing'].includes(subscription.status)) {
  return Response.json({ error: 'Active subscription required' }, { status: 403 })
}
```

### Rule 2: Requesters Are Never Charged
```
🔴 P0 BUG — Requester in payment flow
User ID [id] has role='requester'. No Stripe call, subscription check, or 
billing UI should ever touch a requester account. Halt and flag before proceeding.
```

### Rule 3: Request Expiry is Schema-Level
Every request gets an `expires_at` at creation. Never nullable. Background job or Supabase scheduled function must update `status = 'expired'` when `now() > expires_at AND status = 'active'`. Do not rely on application code checking expiry at query time — the status column must be authoritative.

```sql
-- Expiry enforcement (run as scheduled job, e.g., pg_cron or Supabase Edge Function)
UPDATE requests
SET status = 'expired', updated_at = now()
WHERE status = 'active'
  AND expires_at < now();
```

### Rule 4: Duplicate Response Prevention
The `UNIQUE (request_id, operator_id)` constraint on `matches` enforces this at the database level. The API should also check and return a clear error rather than relying solely on the constraint violation.

### Rule 5: Reviews Gate on Match Status
```sql
-- Before inserting a review, always verify:
SELECT status FROM matches WHERE id = $match_id AND status = 'completed';
-- If not 'completed', return 403 — never insert an unearned review
```

### Rule 6: When a Match is Accepted, All Other Matches on That Request Are Declined
```sql
-- Run in a transaction with the acceptance update:
UPDATE matches
SET status = 'declined', resolved_at = now(), updated_at = now()
WHERE request_id = $request_id
  AND id != $accepted_match_id
  AND status = 'pending';

UPDATE requests
SET status = 'matched', updated_at = now()
WHERE id = $request_id;
```

---

## RLS Policy Patterns (Supabase)

```sql
-- Requesters can only see their own requests
CREATE POLICY "Requesters see own requests"
ON requests FOR SELECT
USING (auth.uid() = requester_id);

-- Active operators can see all active requests (for the feed)
CREATE POLICY "Active operators see active requests"
ON requests FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM subscriptions s
    WHERE s.operator_id = auth.uid()
      AND s.status IN ('active', 'trialing')
  )
  AND requests.status = 'active'
);

-- Operators can only create a match if subscription is active
CREATE POLICY "Subscribed operators can create matches"
ON matches FOR INSERT
WITH CHECK (
  auth.uid() = operator_id
  AND EXISTS (
    SELECT 1 FROM subscriptions s
    WHERE s.operator_id = auth.uid()
      AND s.status IN ('active', 'trialing')
  )
);
```

---

## Flag Checklist — Before Any Schema or API Work

1. Does this code touch payment logic? If yes — is the user a requester? If yes, 🔴 STOP.
2. Does this code allow an operator action? If yes — is subscription status checked server-side?
3. Does this schema have an expiry mechanism? If not — flag it.
4. Can this query return duplicate matches for the same operator/request? If yes — add the UNIQUE constraint.
5. Does this review insertion check match.status = 'completed'? If not — add the gate.
