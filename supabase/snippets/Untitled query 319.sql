ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS trial_starts_at timestamptz,
  ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz,
  ADD COLUMN IF NOT EXISTS trial_converted boolean DEFAULT false;