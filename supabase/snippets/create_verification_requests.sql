-- Create verification_requests table
-- Run in Supabase Studio SQL editor

CREATE TABLE IF NOT EXISTS public.verification_requests (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     text NOT NULL,
  org_name      text NOT NULL,
  org_type      text NOT NULL,
  phone         text NOT NULL,
  website       text,
  description   text NOT NULL,
  referral      text,
  status        text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','approved','rejected')),
  submitted_at  timestamptz NOT NULL DEFAULT now(),
  reviewed_at   timestamptz,
  reviewed_by   uuid REFERENCES auth.users(id),
  admin_notes   text
);

-- Index for admin queue view (pending first, newest first)
CREATE INDEX IF NOT EXISTS idx_verif_requests_status_submitted
  ON public.verification_requests (status, submitted_at DESC);

-- Index for user's own submissions
CREATE INDEX IF NOT EXISTS idx_verif_requests_user_id
  ON public.verification_requests (user_id);

-- RLS: enable row-level security
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Users can insert their own requests
CREATE POLICY "organizers can submit verification requests"
  ON public.verification_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own requests
CREATE POLICY "organizers can view own requests"
  ON public.verification_requests FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can read and update all requests (requires profiles.role = 'admin')
CREATE POLICY "admins can manage all verification requests"
  ON public.verification_requests FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
