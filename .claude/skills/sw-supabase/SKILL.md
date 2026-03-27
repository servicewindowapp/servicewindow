---
name: sw-supabase
description: "ServiceWindow Supabase configuration, project credentials, schema, RLS patterns, Edge Function conventions, and local dev workflow. Use for ANY Supabase work on ServiceWindow — schema changes, RLS policies, Edge Functions, auth, storage, or SQL migrations."
---

# ServiceWindow — Supabase Reference

Always reference this skill before writing any Supabase code, SQL, or Edge Function for ServiceWindow.

---

## Project Credentials
- **Project ID**: `krmfxedkxoyzkeqnijcd`
- **Project URL**: `https://krmfxedkxoyzkeqnijcd.supabase.co`
- **Supabase client file**: `supabase-client.js` (repo root)
- **Dashboard**: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd

---

## Local Dev Environment
- **Platform**: Windows, PowerShell
- **Project path**: `C:\Users\wesfi\OneDrive\Desktop\Food Truck App` (E: drive — always quote paths in PowerShell)
- **PowerShell path syntax**: `cd "C:\Users\wesfi\OneDrive\Desktop\Food Truck App"` — quotes required due to spaces
- **Docker**: Must be running before `supabase start`
- **Start local Supabase**: `supabase start` (from project directory)
- **Stop**: `supabase stop`
- **Local Studio**: http://localhost:54323
- **Local API**: http://localhost:54321

---

## Supabase Client Init
```javascript
// supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://krmfxedkxoyzkeqnijcd.supabase.co'
const SUPABASE_ANON_KEY = '...' // in supabase-client.js
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

---

## Database Schema — Core Tables

### profiles
Primary user table. One row per auth.users entry.
```sql
profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text,                    -- 'truck' | 'venue' | 'organizer' | 'property' | 'service_provider' | 'job_seeker' | 'admin'
  business_name text,
  contact_name text,
  email text,
  phone text,
  city text,
  bio text,
  avatar_url text,
  website text,
  cuisine_type text,            -- trucks only
  service_radius integer,       -- trucks only
  is_verified boolean DEFAULT false,
  is_fundraiser_friendly boolean DEFAULT false,
  is_veteran_owned boolean DEFAULT false,
  uber_eats_url text,           -- trucks only
  doordash_url text,            -- trucks only
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_plan text,       -- 'free' | 'standard' | 'pro'
  subscription_status text,
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
  location text,
  guest_count integer,
  budget_range text,
  status text DEFAULT 'pending',  -- 'pending' | 'accepted' | 'declined' | 'cancelled'
  notes text,
  is_external boolean DEFAULT false,  -- bookings entered manually from outside app
  created_at timestamptz DEFAULT now()
)
```

### messages
```sql
messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid,
  sender_id uuid REFERENCES profiles(id),
  recipient_id uuid REFERENCES profiles(id),
  content text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
)
```

### reviews
```sql
reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id uuid REFERENCES profiles(id),
  reviewee_id uuid REFERENCES profiles(id),
  reviewer_type text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamptz DEFAULT now()
)
```

### listings (marketplace posts)
```sql
listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poster_id uuid REFERENCES profiles(id),
  board text,   -- 'request' | 'event' | 'shift' | 'venue' | 'parking' | 'vendor' | 'jobs'
  title text,
  description text,
  location text,
  city text,
  event_date date,
  budget_range text,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
)
```

---

## RLS Patterns

### Golden Rule
Always enable RLS on every table. Default deny. Grant explicitly.

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (marketplace requires this)
CREATE POLICY "profiles_select_all" ON profiles
  FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can only insert their own profile
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### Bookings RLS Pattern
```sql
-- Trucks see bookings where they're the truck
-- Requesters see bookings they created
CREATE POLICY "bookings_select" ON bookings
  FOR SELECT USING (
    auth.uid() = truck_id OR auth.uid() = requester_id
  );
```

### Admin Bypass Pattern
```sql
-- Admins see everything
CREATE POLICY "admin_all" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

---

## Edge Functions

### Deployment Command (ALWAYS use --no-verify-jwt)
```bash
supabase functions deploy function-name --no-verify-jwt
```
Never deploy without `--no-verify-jwt` — it will break client-side calls.

### Existing Functions
- `create-checkout-session` — Stripe checkout
- `create-portal-session` — Stripe billing portal
- `get-upload-url` — file upload presigned URLs
- `send-notification` — Resend email notifications
- `stripe-webhook-success` — post-payment subscription activation

### Edge Function Template
```typescript
// supabase/functions/function-name/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    // ... logic
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
```

---

## Auth Patterns

### Role-based redirect after login
```javascript
const { data: { user } } = await supabase.auth.getUser()
const { data: profile } = await supabase
  .from('profiles')
  .select('role')
  .eq('id', user.id)
  .single()

const dashboardMap = {
  truck: 'truck-dashboard.html',
  venue: 'venue-dashboard.html',
  organizer: 'planner-dashboard.html',
  property: 'property-dashboard.html',
  service_provider: 'service-provider-dashboard.html',
  job_seeker: 'jobs-dashboard.html',
  admin: 'admin-dashboard.html'
}
window.location.href = dashboardMap[profile.role] || 'index.html'
```

### Auth file: `auth.html`
Single auth page handles signup and login for all 7 roles. Role is collected during signup and stored in profiles table.

---

## Storage (Photo Uploads)
- Supabase Storage RLS blocks uploads on free tier
- **Current status**: Upload button hidden, photo uploads deferred until Supabase Pro ($25/mo)
- Do NOT re-attempt Cloudflare R2 or Worker proxy approaches — both had CORS/signature issues
- Resolution path: Upgrade to Supabase Pro → fix Storage RLS → re-enable upload UI

---

## Migration Files
Location: `supabase/migrations/`
Primary migration: `20260324000000_initial_schema.sql`

When adding columns, always use:
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS column_name type DEFAULT value;
```

---

## Email (Resend)
- Provider: Resend
- Trigger file: `RESEND_EMAIL_TRIGGERS.sql`
- 6 database triggers fire emails on key events
- Function: `send-notification` Edge Function handles delivery

---

## Common Mistakes to Avoid
- Never deploy Edge Functions without `--no-verify-jwt`
- Never run `supabase` CLI commands without first `cd`ing to `"C:\Users\wesfi\OneDrive\Desktop\Food Truck App"` with quotes
- Never write RLS policies that reference `auth.email()` — use `auth.uid()` only
- Never add tables without enabling RLS immediately
- The role is stored in `profiles.role`, not in `auth.users` metadata
- `organizer` is the correct role name (NOT `planner`) — was renamed for broader appeal
