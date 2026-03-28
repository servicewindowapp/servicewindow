ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_fundraiser_friendly boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_veteran_owned boolean DEFAULT false;