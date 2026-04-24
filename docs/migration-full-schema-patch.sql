-- ServiceWindow — Full Schema Patch Migration
-- Run in: Supabase Dashboard → SQL Editor
-- URL: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/sql
--
-- Purpose: Add missing columns to profiles + listings, and create bookings table
-- with correct column names (fixing event_name→event_type and event_time_start→start_time
-- that were in the earlier draft migration).
--
-- Safe to run multiple times — all statements use IF NOT EXISTS / ADD COLUMN IF NOT EXISTS.
-- ════════════════════════════════════════════════════════════════════════════════


-- ────────────────────────────────────────────────────────────────────────────
-- 1. PROFILES — missing columns
-- ────────────────────────────────────────────────────────────────────────────

-- Venue profile fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS venue_type       text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS capacity         text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address          text;

-- Flexible metadata blob (service-provider stores years_in_business here;
-- extend for other roles without schema changes)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS metadata         jsonb;

-- Founding member flag (set at signup for early adopters; used in truck-dashboard
-- to display the locked founding rate badge)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_founding_member boolean DEFAULT false;

-- Trial expiration date (set to now() + 30 days at admin approval for truck accounts)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trial_ends_at    timestamptz;


-- ────────────────────────────────────────────────────────────────────────────
-- 2. LISTINGS — missing columns
-- ────────────────────────────────────────────────────────────────────────────

-- Time slots (used by venue, truck shift, and planner request boards)
ALTER TABLE listings ADD COLUMN IF NOT EXISTS start_time       time;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS end_time         time;

-- Flexible metadata blob (property-dashboard stores pricing_model, rate, extras here;
-- service-provider-dashboard stores service_category)
ALTER TABLE listings ADD COLUMN IF NOT EXISTS metadata         jsonb;

-- Cuisine type on listings (used by service-provider board and property board
-- to tag listing type; separate from profiles.cuisine_type)
ALTER TABLE listings ADD COLUMN IF NOT EXISTS cuisine_type     text;

-- Planner request board — event size and configuration
ALTER TABLE listings ADD COLUMN IF NOT EXISTS guest_count_min  integer;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS guest_count_max  integer;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS trucks_needed    integer DEFAULT 1;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS cuisine_type_needed text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS is_urgent        boolean DEFAULT false;


-- ────────────────────────────────────────────────────────────────────────────
-- 3. BOOKINGS — create table
--
-- NOTE: The earlier draft (missing-bookings-migration.sql) used wrong column names:
--   event_name       → correct name is event_type  (both dashboards reference event_type)
--   event_time_start → correct name is start_time  (truck-dashboard selects start_time)
-- This CREATE TABLE uses the correct names. Do NOT run the old draft.
-- ────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bookings (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  truck_id          uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  requester_id      uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  event_type        text        NOT NULL,                   -- e.g. 'HOA Event', 'Private Party', 'Corporate Lunch'
  event_date        date        NOT NULL,
  start_time        time,                                   -- dashboard selects this as start_time
  location          text,
  city              text,
  guest_count       integer,
  budget_range      text,
  cuisine_requested text,
  notes             text,
  status            text        NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','accepted','declined','confirmed','cancelled','completed')),
  is_external       boolean     DEFAULT false,              -- manually entered bookings from outside platform
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- ─── RLS ─────────────────────────────────────────────────────────────────────

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Truck sees bookings where they are the truck
-- Requester sees bookings they created
DROP POLICY IF EXISTS "bookings_select_parties" ON bookings;
CREATE POLICY "bookings_select_parties" ON bookings
  FOR SELECT USING (
    auth.uid() = truck_id OR auth.uid() = requester_id
  );

-- Only requesters can create bookings
DROP POLICY IF EXISTS "bookings_insert_requester" ON bookings;
CREATE POLICY "bookings_insert_requester" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

-- Either party can update (accept, decline, cancel)
DROP POLICY IF EXISTS "bookings_update_parties" ON bookings;
CREATE POLICY "bookings_update_parties" ON bookings
  FOR UPDATE USING (
    auth.uid() = truck_id OR auth.uid() = requester_id
  );

-- Admins see and can modify everything
DROP POLICY IF EXISTS "bookings_admin_all" ON bookings;
CREATE POLICY "bookings_admin_all" ON bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ─── Auto-update updated_at ───────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ─── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_bookings_truck_id      ON bookings(truck_id);
CREATE INDEX IF NOT EXISTS idx_bookings_requester_id  ON bookings(requester_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status        ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date    ON bookings(event_date);


-- ════════════════════════════════════════════════════════════════════════════
-- VERIFY — run these after to confirm everything landed correctly
-- ════════════════════════════════════════════════════════════════════════════

-- New profile columns:
-- SELECT column_name, data_type
-- FROM information_schema.columns
-- WHERE table_name = 'profiles'
--   AND column_name IN ('venue_type','capacity','address','metadata','is_founding_member','trial_ends_at')
-- ORDER BY column_name;

-- New listing columns:
-- SELECT column_name, data_type
-- FROM information_schema.columns
-- WHERE table_name = 'listings'
--   AND column_name IN ('start_time','end_time','metadata','cuisine_type','guest_count_min','guest_count_max','trucks_needed','cuisine_type_needed','is_urgent')
-- ORDER BY column_name;

-- Bookings table exists with correct columns:
-- SELECT column_name, data_type
-- FROM information_schema.columns
-- WHERE table_name = 'bookings'
-- ORDER BY column_name;

-- Bookings RLS active:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'bookings';
