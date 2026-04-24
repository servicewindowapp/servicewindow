# Matching & Discovery Skill
> Geo and availability logic lives server-side always. Client-side filtering is display only, never the source of truth.

---

## Discovery Model — Who Finds Whom

### Requester Side
Requesters **post** requests. They do not browse operator profiles or cold-search trucks. The marketplace comes to them.

Flow:
1. Requester posts a request (location, date, event details)
2. Request enters the active feed visible to eligible operators
3. Operators who match the radius browse and respond
4. Requester reviews responses and selects one

There is no operator directory browse for requesters. No "search for trucks" UI. Operators come to the request.

### Operator Side
Operators **browse an active request feed** filtered to their service radius. They see requests, choose which to respond to, and submit responses.

Flow:
1. Operator's listing has a defined service radius (stored as meters in `listings.service_radius_m`)
2. Request feed query filters requests where `ST_DWithin(request.location_point, listing.base_location, listing.service_radius_m)`
3. This filter runs at the database level — not in application code
4. Operators respond to requests they want — they do not "apply" to be listed

---

## Geo Logic — PostGIS / Supabase Geospatial Functions Only

**Never calculate distance in application code.** No Haversine formula in TypeScript. No raw lat/long subtraction. All distance queries use the database.

```sql
-- Correct: Get all active requests within an operator's service radius
SELECT r.*
FROM requests r
JOIN listings l ON l.operator_id = $operator_id
WHERE r.status = 'active'
  AND r.expires_at > now()
  AND ST_DWithin(
    r.location_point::geography,
    l.base_location::geography,
    l.service_radius_m
  )
ORDER BY r.created_at DESC;

-- Correct: Distance calculation for display
SELECT
  r.*,
  ROUND(ST_Distance(
    r.location_point::geography,
    l.base_location::geography
  ) / 1000, 1) AS distance_km
FROM requests r
JOIN listings l ON l.operator_id = $operator_id
WHERE r.status = 'active';
```

```
🔴 GEO LOGIC VIOLATION — Application-level distance calculation
Found: Distance being calculated in TypeScript/JavaScript
Required: Move this to a SQL query using ST_DWithin or ST_Distance
Application code must only receive pre-filtered results from the database
```

---

## Feed Ranking

Active request feed for operators, ordered by:
1. `created_at DESC` as the base sort (newest first)
2. Boosted by: requests with `headcount_max >= 200` OR time window `>= 4 hours` (proxy for higher operator revenue)
3. Never randomized — consistent ordering prevents confusion

```sql
SELECT
  r.*,
  ROUND(ST_Distance(
    r.location_point::geography,
    l.base_location::geography
  ) / 1000, 1) AS distance_km,
  -- Boost score: higher headcount or longer window = higher relevance
  (
    CASE WHEN r.headcount_max >= 200 THEN 2 ELSE 0 END +
    CASE WHEN EXTRACT(EPOCH FROM (r.end_time - r.start_time)) / 3600 >= 4 THEN 1 ELSE 0 END
  ) AS boost_score
FROM requests r
JOIN listings l ON l.operator_id = $operator_id
WHERE r.status = 'active'
  AND r.expires_at > now()
  AND ST_DWithin(
    r.location_point::geography,
    l.base_location::geography,
    l.service_radius_m
  )
ORDER BY boost_score DESC, r.created_at DESC;
```

---

## Request Visibility — Subscription-Gated Details

Unsubscribed operators (or operators with `past_due`, `canceled`, `incomplete` status) can see that requests exist, but **contact info and exact address are hidden**. This is a deliberate conversion mechanic.

```typescript
// Transform request data based on subscription status
function sanitizeRequestForOperator(
  request: Request,
  subscription: Subscription | null
): PublicRequest | FullRequest {
  const hasAccess = subscription && isOperatorAccessGranted(subscription.status)

  if (hasAccess) {
    return request  // full data
  }

  // Teaser: strip sensitive fields, blur address
  return {
    ...request,
    location_address: blurAddress(request.location_address),  // "Cape Coral, FL" not "123 Main St"
    requester_id: null,        // hide identity
    notes: null,               // hide notes
    _teaser: true,             // flag for UI to show upgrade prompt
  }
}

function blurAddress(address: string): string {
  // Return only city/state — strip street number and street name
  const parts = address.split(',')
  return parts.slice(-2).join(',').trim()  // e.g., "Cape Coral, FL 33990"
}
```

---

## Expiry Behavior

- Expired requests update `status = 'expired'` via scheduled job (see marketplace-architecture skill)
- Expired requests are **not shown in operator feeds**
- Expired requests **remain visible to the requester** in their dashboard history
- Requester can re-post an expired request as a new request — no "reactivate" feature (avoids stale data)

```sql
-- Operator feed: exclude expired
WHERE r.status = 'active' AND r.expires_at > now()

-- Requester dashboard: show all statuses
WHERE r.requester_id = $requester_id
ORDER BY r.created_at DESC
```

---

## Match Notifications — Supabase Realtime

Notifications are **push-based via Supabase Realtime**, not polling.

### Operator: New Request in Radius

When a new request is inserted and its location falls within an operator's service radius:
- Trigger: Supabase Postgres function on `INSERT` to `requests` table
- Action: Insert into `notifications` table for each qualifying operator
- Delivery: Supabase Realtime broadcasts the `notifications` insert to the operator's active session
- Fallback: Email notification if operator is not online (async, via Resend)

```sql
-- Notification trigger (runs on requests INSERT)
CREATE OR REPLACE FUNCTION notify_operators_of_new_request()
RETURNS trigger AS $$
BEGIN
  INSERT INTO notifications (user_id, type, reference_id, message)
  SELECT
    l.operator_id,
    'new_request_in_radius',
    NEW.id,
    'A new request is available in your service area'
  FROM listings l
  JOIN subscriptions s ON s.operator_id = l.operator_id
  WHERE s.status IN ('active', 'trialing')
    AND l.is_active = true
    AND ST_DWithin(
      NEW.location_point::geography,
      l.base_location::geography,
      l.service_radius_m
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Requester: Operator Responded

When a new match is inserted (operator responds):
- Trigger: Supabase Postgres function on `INSERT` to `matches` table
- Action: Insert into `notifications` for the requester
- Delivery: Supabase Realtime → fallback email if offline

### Client Subscription Pattern

```typescript
// In the operator's dashboard component
const supabase = createClientComponentClient()

useEffect(() => {
  const channel = supabase
    .channel('operator-notifications')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${operatorId}`,
      },
      (payload) => {
        // Add notification to UI state
        addNotification(payload.new)
      }
    )
    .subscribe()

  return () => { supabase.removeChannel(channel) }
}, [operatorId])
```

---

## Flags Before Any Discovery/Matching Work

1. Is distance filtering happening in application code? → 🔴 Move to database
2. Is request visibility respecting subscription status? → 🟡 Check teaser logic
3. Is the feed using `expires_at > now()` in the WHERE clause? → If not, expired requests leak
4. Are notifications using Realtime or polling? → Polling is not acceptable for this feature
5. Is service radius enforced server-side in the query, not just client-side UI? → Must be in SQL
