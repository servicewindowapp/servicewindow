ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS trial_starts_at timestamptz,
ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz,
ADD COLUMN IF NOT EXISTS trial_converted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS intended_plan text;

CREATE INDEX IF NOT EXISTS idx_profiles_trial_ends_at ON profiles(trial_ends_at) WHERE trial_ends_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_profiles_trial_converted ON profiles(trial_converted) WHERE trial_converted = false;