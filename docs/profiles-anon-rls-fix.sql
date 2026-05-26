-- ============================================================
-- MIGRATION: Restrict anon access to profiles + public view
-- Issue: OI-062 (security scan) — anon ?select=* exposes email,
--        phone, stripe_customer_id, stripe_subscription_id for all users
-- Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/sql/new
-- ============================================================

-- ── STEP 0: Identify current anon SELECT policies (run this first, read output) ──
-- SELECT policyname, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename = 'profiles' AND cmd = 'SELECT';

-- ── STEP 1: Create public view — safe columns only, verified trucks only ──────────
CREATE OR REPLACE VIEW public_truck_profiles
WITH (security_invoker = false) AS
SELECT
  id,
  business_name,
  city,
  state,
  bio,
  cuisine_type,
  service_radius,
  photos,
  avatar_url,
  is_verified,
  is_fundraiser_friendly,
  is_veteran_owned,
  is_standby,
  website,
  facebook_url,
  uber_eats_url,
  doordash_url,
  created_at
FROM profiles
WHERE role = 'truck'
  AND is_verified = true;

-- ── STEP 2: Grant anon SELECT on the view ────────────────────────────────────────
GRANT SELECT ON public_truck_profiles TO anon;

-- ── STEP 3: Drop known permissive anon SELECT policies on profiles ───────────────
-- Covers common Supabase default naming. Adjust if your policy has a different name
-- (use the STEP 0 query to confirm exact names before running).
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "Anyone can view truck profiles" ON profiles;
DROP POLICY IF EXISTS "Public can view verified trucks" ON profiles;
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON profiles;

-- ── STEP 4: Add restrictive anon policy — deny all direct profile reads ──────────
-- Authenticated users are unaffected (their policies are separate).
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'profiles'
      AND policyname = 'anon: no direct profile access'
  ) THEN
    EXECUTE $policy$
      CREATE POLICY "anon: no direct profile access"
      ON profiles FOR SELECT
      TO anon
      USING (false)
    $policy$;
  END IF;
END $$;

-- ── VERIFY ───────────────────────────────────────────────────────────────────────
-- After running, test with the anon key via REST API:
--   GET /rest/v1/profiles?select=*           → should return []
--   GET /rest/v1/public_truck_profiles?select=*  → should return safe cols only
--
-- Also verify marketplace.html, find-trucks.html, truck-profile.html still load
-- truck listings correctly (they now query public_truck_profiles).
