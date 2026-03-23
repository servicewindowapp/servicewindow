-- Add organizer_type and verification_status to profiles table
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS organizer_type      text,
  ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'unverified';
