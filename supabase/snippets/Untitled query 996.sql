ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trial_converted boolean DEFAULT false;

CREATE OR REPLACE FUNCTION set_trial_ends_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
    NEW.trial_converted = false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_trial_ends_at_trigger ON profiles;
CREATE TRIGGER set_trial_ends_at_trigger
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_trial_ends_at();