-- OI-010: Photo uploads — add photos array to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS photos text[] DEFAULT '{}';

-- Index for any future queries filtering on photo presence
CREATE INDEX IF NOT EXISTS idx_profiles_photos_nonempty
  ON profiles USING gin(photos)
  WHERE photos IS NOT NULL AND photos != '{}';
