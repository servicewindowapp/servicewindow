-- ══════════════════════════════════════════════════════════════════════════════
-- ServiceWindow — RLS Audit & Fix
-- Run in: Supabase Dashboard → SQL Editor
-- URL: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/sql
--
-- HOW TO USE:
--   1. Run STEP 1 (audit queries) and review output
--   2. Run STEP 2 through STEP 10 to apply fixes
--   3. Run STEP 11 (verify) to confirm everything landed
--
-- Safe to re-run — all policies use DROP IF EXISTS before CREATE.
-- ══════════════════════════════════════════════════════════════════════════════


-- ── STEP 1: AUDIT CURRENT STATE ──────────────────────────────────────────────
-- Run this first. Review which tables have RLS enabled and what policies exist.

SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;


-- ── STEP 2: ADMIN HELPER FUNCTION ────────────────────────────────────────────
-- Replaces inline subquery (EXISTS SELECT 1 FROM profiles WHERE role='admin')
-- with a cached SECURITY DEFINER function.
-- Benefit: faster (called once per statement, not once per row), avoids
-- recursive policy evaluation on the profiles table itself.

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
$$;


-- ── STEP 3: profiles ─────────────────────────────────────────────────────────
--
-- RISK NOTE: profiles SELECT ALL exposes stripe_customer_id, stripe_subscription_id,
-- phone, and email to any caller with the anon key. RLS cannot restrict by column —
-- only by row. The app mitigates this by always specifying columns in queries, but
-- a malicious client with the anon key can still SELECT * and get Stripe IDs.
-- Full fix requires a restricted security view (post-launch task).
-- Stripe customer/subscription IDs without the secret key are not exploitable, but
-- phone and email exposure to unauthenticated users is a real risk.
--
-- IMMEDIATE PARTIAL FIX: restrict anon SELECT to verified trucks only (marketplace
-- use case). Authenticated users see all profiles (needed for bookings/messaging).
-- This is a tradeoff — apply only after confirming it doesn't break anything.

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read all profiles (needed for booking, messaging, admin)
DROP POLICY IF EXISTS "profiles_select_authenticated" ON profiles;
CREATE POLICY "profiles_select_authenticated" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- Unauthenticated (anon) users can only see verified truck profiles (marketplace)
DROP POLICY IF EXISTS "profiles_select_anon_trucks"   ON profiles;
CREATE POLICY "profiles_select_anon_trucks" ON profiles
  FOR SELECT USING (
    auth.role() = 'anon'
    AND role = 'truck'
    AND is_verified = true
  );

-- Users can only insert their own profile row
DROP POLICY IF EXISTS "profiles_insert_own"           ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Users can only update their own profile row
DROP POLICY IF EXISTS "profiles_update_own"           ON profiles;
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin can update any profile (approve, suspend, change plan)
DROP POLICY IF EXISTS "profiles_update_admin"         ON profiles;
CREATE POLICY "profiles_update_admin" ON profiles
  FOR UPDATE USING (is_admin());

-- Admin can delete any profile (reject unverified user)
DROP POLICY IF EXISTS "profiles_delete_admin"         ON profiles;
CREATE POLICY "profiles_delete_admin" ON profiles
  FOR DELETE USING (is_admin());


-- ── STEP 4: bookings ─────────────────────────────────────────────────────────
--
-- BUG FIX: Prior INSERT policy was "bookings_insert_requester" which only allowed
-- auth.uid() = requester_id. This blocks truck-dashboard from creating external
-- (is_external=true) bookings where the truck is the inserting party.
-- Fix: allow insert when auth.uid() matches EITHER party column.

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Both parties can read bookings they are part of
DROP POLICY IF EXISTS "bookings_select_parties"   ON bookings;
CREATE POLICY "bookings_select_parties" ON bookings
  FOR SELECT USING (
    auth.uid() = truck_id OR auth.uid() = requester_id
  );

-- Either party can create a booking (requesters create inbound requests;
-- trucks create external/manual bookings with is_external=true)
DROP POLICY IF EXISTS "bookings_insert_requester" ON bookings;  -- drop old broken policy
DROP POLICY IF EXISTS "bookings_insert_party"     ON bookings;
CREATE POLICY "bookings_insert_party" ON bookings
  FOR INSERT WITH CHECK (
    auth.uid() = requester_id OR auth.uid() = truck_id
  );

-- Either party can update status (accept, decline, complete, cancel)
DROP POLICY IF EXISTS "bookings_update_parties"   ON bookings;
CREATE POLICY "bookings_update_parties" ON bookings
  FOR UPDATE USING (
    auth.uid() = truck_id OR auth.uid() = requester_id
  );

-- No DELETE for regular users — status transitions handle closure
-- Admin can do everything
DROP POLICY IF EXISTS "bookings_admin_all"        ON bookings;
CREATE POLICY "bookings_admin_all" ON bookings
  FOR ALL USING (is_admin());


-- ── STEP 5: listings ─────────────────────────────────────────────────────────
--
-- Marketplace requires public SELECT on active listings (no auth).
-- Poster controls their own inactive/cancelled listings.

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Active listings are public; poster can always see their own regardless of status
DROP POLICY IF EXISTS "listings_select_public"    ON listings;
CREATE POLICY "listings_select_public" ON listings
  FOR SELECT USING (
    status = 'active'
    OR auth.uid() = poster_id
    OR is_admin()
  );

-- Any authenticated user can post a listing
DROP POLICY IF EXISTS "listings_insert_own"       ON listings;
CREATE POLICY "listings_insert_own" ON listings
  FOR INSERT WITH CHECK (auth.uid() = poster_id);

-- Poster or admin can update (cancel, edit)
DROP POLICY IF EXISTS "listings_update_own"       ON listings;
CREATE POLICY "listings_update_own" ON listings
  FOR UPDATE USING (
    auth.uid() = poster_id OR is_admin()
  );

-- Poster or admin can delete
DROP POLICY IF EXISTS "listings_delete_own"       ON listings;
CREATE POLICY "listings_delete_own" ON listings
  FOR DELETE USING (
    auth.uid() = poster_id OR is_admin()
  );


-- ── STEP 6: messages ─────────────────────────────────────────────────────────
--
-- Without RLS, any authenticated user with the anon key can read all messages.
-- This is the highest severity gap — direct PII and private communication exposure.

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Only parties to the conversation can read messages
DROP POLICY IF EXISTS "messages_select_parties"   ON messages;
CREATE POLICY "messages_select_parties" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
  );

-- Only the sender can insert (enforces sender_id = self, prevents spoofing)
DROP POLICY IF EXISTS "messages_insert_sender"    ON messages;
CREATE POLICY "messages_insert_sender" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Either party can update (sender edits, recipient marks read)
DROP POLICY IF EXISTS "messages_update_party"     ON messages;
CREATE POLICY "messages_update_party" ON messages
  FOR UPDATE USING (
    auth.uid() = sender_id OR auth.uid() = recipient_id
  );

-- No delete for regular users; admin oversight only
DROP POLICY IF EXISTS "messages_delete_admin"     ON messages;
CREATE POLICY "messages_delete_admin" ON messages
  FOR DELETE USING (is_admin());


-- ── STEP 7: reviews ──────────────────────────────────────────────────────────

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Reviews are public (anyone can read — needed for trust signals on marketplace)
DROP POLICY IF EXISTS "reviews_select_all"        ON reviews;
CREATE POLICY "reviews_select_all" ON reviews
  FOR SELECT USING (true);

-- Only authenticated users can submit reviews; must be the reviewer
DROP POLICY IF EXISTS "reviews_insert_own"        ON reviews;
CREATE POLICY "reviews_insert_own" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Reviews are immutable — no UPDATE policy

-- Admin can delete reviews (abuse/spam moderation)
DROP POLICY IF EXISTS "reviews_delete_admin"      ON reviews;
CREATE POLICY "reviews_delete_admin" ON reviews
  FOR DELETE USING (is_admin());


-- ── STEP 8: waitlist ─────────────────────────────────────────────────────────
--
-- Waitlist contains PII (emails). Without RLS, any authenticated user can read
-- all waitlist entries via the anon key. Only admin should read this.

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Only admin can read waitlist
DROP POLICY IF EXISTS "waitlist_select_admin"     ON waitlist;
CREATE POLICY "waitlist_select_admin" ON waitlist
  FOR SELECT USING (is_admin());

-- Allow unauthenticated inserts (waitlist form submissions from index.html)
-- If submissions only go through Formspree, this INSERT policy is harmless.
-- If a direct Supabase insert exists anywhere, this allows it.
DROP POLICY IF EXISTS "waitlist_insert_anon"      ON waitlist;
CREATE POLICY "waitlist_insert_anon" ON waitlist
  FOR INSERT WITH CHECK (true);


-- ── STEP 9: notifications (if table exists) ──────────────────────────────────
-- Assumes column: user_id uuid referencing profiles(id)
-- Adjust column name if different — check with:
--   SELECT column_name FROM information_schema.columns WHERE table_name = 'notifications';

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'notifications'
  ) THEN
    EXECUTE 'ALTER TABLE notifications ENABLE ROW LEVEL SECURITY';

    EXECUTE 'DROP POLICY IF EXISTS "notifications_select_own" ON notifications';
    EXECUTE 'CREATE POLICY "notifications_select_own" ON notifications
      FOR SELECT USING (auth.uid() = user_id)';

    EXECUTE 'DROP POLICY IF EXISTS "notifications_update_own" ON notifications';
    EXECUTE 'CREATE POLICY "notifications_update_own" ON notifications
      FOR UPDATE USING (auth.uid() = user_id)';

    -- System/admin inserts notifications; regular users do not
    EXECUTE 'DROP POLICY IF EXISTS "notifications_insert_admin" ON notifications';
    EXECUTE 'CREATE POLICY "notifications_insert_admin" ON notifications
      FOR INSERT WITH CHECK (is_admin())';

    RAISE NOTICE 'notifications RLS applied';
  ELSE
    RAISE NOTICE 'notifications table not found — skipped';
  END IF;
END
$$;


-- ── STEP 10: verification_requests (if table exists) ─────────────────────────
-- Assumes column: user_id uuid referencing profiles(id)
-- Adjust column name if different.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_tables
    WHERE schemaname = 'public' AND tablename = 'verification_requests'
  ) THEN
    EXECUTE 'ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY';

    -- Users can submit their own verification request
    EXECUTE 'DROP POLICY IF EXISTS "vr_insert_own" ON verification_requests';
    EXECUTE 'CREATE POLICY "vr_insert_own" ON verification_requests
      FOR INSERT WITH CHECK (auth.uid() = user_id)';

    -- Users can see their own; admin sees all
    EXECUTE 'DROP POLICY IF EXISTS "vr_select_own_or_admin" ON verification_requests';
    EXECUTE 'CREATE POLICY "vr_select_own_or_admin" ON verification_requests
      FOR SELECT USING (auth.uid() = user_id OR is_admin())';

    -- Only admin approves/rejects
    EXECUTE 'DROP POLICY IF EXISTS "vr_update_admin" ON verification_requests';
    EXECUTE 'CREATE POLICY "vr_update_admin" ON verification_requests
      FOR UPDATE USING (is_admin())';

    RAISE NOTICE 'verification_requests RLS applied';
  ELSE
    RAISE NOTICE 'verification_requests table not found — skipped';
  END IF;
END
$$;


-- ── STEP 11: VERIFY — run after applying all fixes ───────────────────────────

-- Which tables have RLS enabled now?
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- All active policies:
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;

-- Confirm is_admin() function exists:
SELECT proname, prosecdef
FROM pg_proc
WHERE proname = 'is_admin';


-- ══════════════════════════════════════════════════════════════════════════════
-- RESIDUAL RISK (cannot be fixed with RLS alone — post-launch tasks)
-- ══════════════════════════════════════════════════════════════════════════════
--
-- 1. SENSITIVE COLUMN EXPOSURE ON profiles
--    Authenticated users can SELECT * FROM profiles and get stripe_customer_id,
--    stripe_subscription_id, phone, email for any user. RLS is row-level — it
--    cannot restrict columns. The app always specifies columns in queries, which
--    mitigates this in practice, but the raw Supabase API is still accessible.
--
--    Full fix (post-launch): Create a restricted view:
--      CREATE VIEW public_profiles AS
--        SELECT id, role, business_name, city, bio, cuisine_type, service_radius,
--               is_verified, is_fundraiser_friendly, is_veteran_owned, created_at
--        FROM profiles;
--    Then revoke direct profiles SELECT from anon and authenticated roles and
--    grant SELECT on public_profiles instead. Requires updating all dashboard
--    queries that need the full profile to use service_role via Edge Functions.
--
-- 2. ANON KEY IS PUBLIC
--    The anon key is embedded in supabase-client.js and visible to anyone who
--    reads the source. This is expected and by design in Supabase — the anon key
--    is not a secret. RLS is the enforcement layer. These policies are that layer.
-- ══════════════════════════════════════════════════════════════════════════════
