# ServiceWindow — Supabase Schema Reference
> Project ID: krmfxedkxoyzkeqnijcd
> Project URL: https://krmfxedkxoyzkeqnijcd.supabase.co
> Dashboard: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd

---

## Core Tables

### profiles
One row per auth.users entry. Primary user record for both sides.
```sql
profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text,  -- 'truck' | 'venue' | 'organizer' | 'property' | 'service_provider' | 'job_seeker' | 'admin'
  business_name text,
  contact_name text,
  email text,
  phone text,
  city text,
  bio text,
  avatar_url text,
  website text,
  cuisine_type text,              -- trucks only
  service_radius integer,         -- trucks only (miles)
  venue_type text,                -- venues only (e.g. 'Beer/Wine Bar', 'Brewery', 'Event Space')
  address text,                   -- venues only (street address)
  capacity text,                  -- venues only (e.g. '200 guests')
  is_verified boolean DEFAULT false,
  is_fundraiser_friendly boolean DEFAULT false,
  is_veteran_owned boolean DEFAULT false,
  uber_eats_url text,             -- trucks only (not yet wired in UI)
  doordash_url text,              -- trucks only (not yet wired in UI)
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_plan text,         -- 'free' | 'standard' | 'pro'
  subscription_status text,       -- CHECK: 'pending' | 'trialing' | 'active' | 'past_due' | 'cancelled' | 'canceled'
  trial_ends_at timestamptz,
  is_founding_member boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)
```

### bookings
```sql
bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  truck_id uuid REFERENCES profiles(id),
  requester_id uuid REFERENCES profiles(id),
  event_type text,
  event_date date,
  start_time time,
  end_time time,
  location text,
  city text,
  guest_count integer,
  budget_range text,
  cuisine_requested text,
  notes text,
  status text DEFAULT 'pending',  -- 'pending' | 'accepted' | 'declined' | 'cancelled' | 'completed'
  is_recurring boolean DEFAULT false,
  recurrence_pattern text,        -- 'weekly' | 'biweekly' | 'monthly' (Phase 2)
  is_external boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)
```

### listings (marketplace posts)
```sql
listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poster_id uuid REFERENCES profiles(id),
  board text,  -- 'request' | 'event' | 'shift' | 'venue' | 'parking' | 'vendor' | 'jobs'
  title text NOT NULL,
  description text,
  location text,
  city text,
  event_date date,
  start_time time,
  end_time time,
  guest_count_min integer,
  guest_count_max integer,
  budget_range text,
  cuisine_type_needed text,       -- demand side filter field
  trucks_needed integer DEFAULT 1,
  status text DEFAULT 'active',   -- 'active' | 'filled' | 'cancelled' | 'expired'
  is_urgent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
)
```

### bids (marketplace bid submissions)
```sql
bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  truck_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (listing_id, truck_id)   -- one bid per truck per listing
)
```

### messages
```sql
messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL,
  sender_id uuid REFERENCES profiles(id),
  recipient_id uuid REFERENCES profiles(id),
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
)
```

### reviews
```sql
reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id uuid REFERENCES profiles(id),
  truck_id uuid REFERENCES profiles(id),   -- nullable: review target is a truck
  venue_id uuid REFERENCES profiles(id),   -- nullable: review target is a venue
  request_id uuid,                         -- nullable: review tied to a specific request
  rating integer CHECK (rating >= 1 AND rating <= 5),
  body text,
  created_at timestamptz DEFAULT now()
)
-- Partial unique indexes (prevent duplicate reviews per reviewer per entity):
-- UNIQUE (reviewer_id, truck_id) WHERE truck_id IS NOT NULL
-- UNIQUE (reviewer_id, venue_id) WHERE venue_id IS NOT NULL
-- UNIQUE (reviewer_id, request_id) WHERE request_id IS NOT NULL
```

### waitlist (pre-launch)
```sql
waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text,  -- 'truck' | 'planner' | 'venue' | 'other'
  city text,
  business_name text,
  created_at timestamptz DEFAULT now()
)
```

---

## Role-to-Dashboard Map
```javascript
const dashboardMap = {
  truck: 'truck-dashboard.html',
  venue: 'venue-dashboard.html',
  organizer: 'planner-dashboard.html',
  property: 'property-dashboard.html',
  service_provider: 'service-provider-dashboard.html',
  job_seeker: 'jobs-dashboard.html',
  admin: 'admin-dashboard.html'
}
```
Note: `organizer` is correct (NOT `planner`) — renamed for broader appeal.

---

## RLS Patterns
```sql
-- Always enable RLS first
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

-- Profiles: readable by all, writable by owner
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Bookings: visible to truck and requester only
CREATE POLICY "bookings_select" ON bookings FOR SELECT
  USING (auth.uid() = truck_id OR auth.uid() = requester_id);

-- Admin bypass
CREATE POLICY "admin_all" ON profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
```

---

## Edge Functions
Deploy command: `supabase functions deploy function-name --no-verify-jwt`
Never omit `--no-verify-jwt`.

| Function | Purpose |
|----------|---------|
| `create-checkout-session` | Stripe checkout initiation |
| `create-portal-session` | Stripe billing portal |
| `send-notification` | Resend email delivery |
| `stripe-webhook-success` | Activates subscription post-payment |

---

## Stripe Pricing
- Founding Standard: $29/mo locked forever (is_founding_member = true)
- Standard: $49/mo
- Founding Pro: $49/mo locked forever
- Pro: $79/mo
- Service Provider: $39/mo

### subscription_status lifecycle (trucks)
| Value | When set |
|-------|----------|
| `pending` | At signup — awaiting admin review |
| `trialing` | Admin approves — 30-day free trial starts |
| `active` | Stripe subscription active |
| `past_due` | Stripe payment failed |
| `cancelled` / `canceled` | Subscription ended (both spellings accepted by constraint) |

DB constraint: `profiles_subscription_status_check`
```sql
CHECK (subscription_status IN ('pending','trialing','active','past_due','cancelled','canceled'))
```
Non-truck roles (organizer, venue, property, service_provider) are set to `active` at signup — free forever.

30-day trial: `subscription_status = 'trialing'`, `trial_ends_at = now() + 30 days` (set by admin approval)

---

## Migration Location
`supabase/migrations/20260324000000_initial_schema.sql`
When adding columns: `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS column_name type DEFAULT value;`

### Applied Migrations (run in Supabase SQL Editor)
```sql
-- 2026-04-26: venue profile fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS venue_type text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS capacity text;
```

```sql
-- 2026-05-03: listings was never created from initial migration (ALTER TABLE was failing silently)
-- Full CREATE TABLE listings + RLS run manually in SQL Editor (see session log 2026-05-03 Session 3)
-- Also created: bids table (new — marketplace bid submissions from truck operators)
```
