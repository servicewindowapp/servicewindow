-- ServiceWindow — Missing bookings table migration
-- Run this in: Supabase Dashboard → SQL Editor
-- URL: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/sql

-- ─────────────────────────────────────────────────────────
-- bookings table
-- Connects truck operators to demand-side requesters
-- Status verified 2026-04-18: table returns 404 (does not exist)
-- ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bookings (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  truck_id          uuid REFERENCES profiles(id) ON DELETE SET NULL,
  requester_id      uuid REFERENCES profiles(id) ON DELETE SET NULL,
  event_name        text NOT NULL,
  event_date        date NOT NULL,
  event_time_start  time,
  event_time_end    time,
  location          text,
  city              text,
  guest_count       integer,
  budget_range      text,
  cuisine_requested text,
  notes             text,
  status            text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'accepted', 'declined', 'confirmed', 'cancelled', 'completed')),
  is_external       boolean DEFAULT false,  -- manually entered bookings from outside platform
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

-- ─── RLS ───
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Truck can see bookings where they are the truck
-- Requester can see bookings they created
CREATE POLICY "bookings_select_parties" ON bookings
  FOR SELECT USING (
    auth.uid() = truck_id OR auth.uid() = requester_id
  );

-- Only requesters can create bookings
CREATE POLICY "bookings_insert_requester" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = requester_id);

-- Either party can update (to accept, decline, cancel)
CREATE POLICY "bookings_update_parties" ON bookings
  FOR UPDATE USING (
    auth.uid() = truck_id OR auth.uid() = requester_id
  );

-- Admin can see all
CREATE POLICY "bookings_admin_all" ON bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ─── Auto-update updated_at ───
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ─── Indexes ───
CREATE INDEX IF NOT EXISTS idx_bookings_truck_id     ON bookings(truck_id);
CREATE INDEX IF NOT EXISTS idx_bookings_requester_id ON bookings(requester_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status       ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date   ON bookings(event_date);

-- ─── VERIFY ───
-- Run this after to confirm table exists:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'bookings';
