-- ─── Booking Completion Stats Migration ───────────────────────────────────────
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/sql

-- 1. Customer count on bookings (public to both parties)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS customer_count integer;

-- 2. Truck-private revenue — only the truck operator can read/write
CREATE TABLE IF NOT EXISTS booking_truck_financials (
  booking_id    uuid PRIMARY KEY REFERENCES bookings(id) ON DELETE CASCADE,
  revenue_cents integer NOT NULL,
  created_at    timestamptz DEFAULT now()
);
ALTER TABLE booking_truck_financials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "truck_own_financials" ON booking_truck_financials;
CREATE POLICY "truck_own_financials" ON booking_truck_financials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM bookings b WHERE b.id = booking_id AND b.truck_id = auth.uid())
  );

-- 3. Requester-private spend — only the requester can read/write
CREATE TABLE IF NOT EXISTS booking_requester_financials (
  booking_id  uuid PRIMARY KEY REFERENCES bookings(id) ON DELETE CASCADE,
  spend_cents integer NOT NULL,
  created_at  timestamptz DEFAULT now()
);
ALTER TABLE booking_requester_financials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "requester_own_financials" ON booking_requester_financials;
CREATE POLICY "requester_own_financials" ON booking_requester_financials
  FOR ALL USING (
    EXISTS (SELECT 1 FROM bookings b WHERE b.id = booking_id AND b.requester_id = auth.uid())
  );

-- 4. Add reviewed_requester_id to reviews (trucks reviewing requesters)
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewed_requester_id uuid REFERENCES profiles(id);
-- Unique: one review per truck per booking (request_id already has partial unique index)
-- No additional index needed — existing (reviewer_id, request_id) covers per-booking uniqueness
