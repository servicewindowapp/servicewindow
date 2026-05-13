-- ============================================================
-- ServiceWindow — Truck Submissions Migration
-- Purpose: Pre-launch self-submit directory. Trucks fill out a
--          simple form on list-your-truck.html with no auth.
--          Submissions are publicly visible as unverified listings.
--          Admin can reject spam or link submissions to verified trucks.
-- Run in: Supabase SQL Editor (production)
-- Date: 2026-05-13
-- ============================================================

CREATE TABLE IF NOT EXISTS truck_submissions (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name text NOT NULL,
  cuisine_type  text,
  cities_served text[],
  contact_phone text,
  contact_email text,
  facebook_url  text,
  instagram_url text,
  website       text,
  description   text,
  status        text DEFAULT 'pending'
                CHECK (status IN ('pending', 'claimed', 'rejected')),
  claimed_truck_id uuid REFERENCES trucks(id) ON DELETE SET NULL,
  admin_notes   text,
  created_at    timestamptz DEFAULT now()
);

-- ─── RLS ───────────────────────────────────────────────────
ALTER TABLE truck_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can submit
CREATE POLICY "anon_insert_truck_submission"
  ON truck_submissions
  FOR INSERT
  WITH CHECK (true);

-- Anyone can read pending submissions (public directory)
CREATE POLICY "public_select_pending_submissions"
  ON truck_submissions
  FOR SELECT
  USING (status = 'pending');

-- Admins can read + manage all
CREATE POLICY "admin_all_truck_submissions"
  ON truck_submissions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- ─── INDEX ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_truck_submissions_status
  ON truck_submissions (status);

CREATE INDEX IF NOT EXISTS idx_truck_submissions_created_at
  ON truck_submissions (created_at DESC);

-- ─── VERIFY ────────────────────────────────────────────────
-- After running, confirm:
SELECT COUNT(*) FROM truck_submissions;
-- Should return 0 (empty table, ready for submissions)
