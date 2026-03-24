ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trial_ends_at timestamptz;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trial_converted boolean DEFAULT false;

CREATE OR REPLACE FUNCTION set_trial_dates()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_trial_dates_trigger ON profiles;
CREATE TRIGGER set_trial_dates_trigger
BEFORE INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION set_trial_dates();