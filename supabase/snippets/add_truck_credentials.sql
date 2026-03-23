-- Add credential verification columns to trucks table
ALTER TABLE trucks
  ADD COLUMN IF NOT EXISTS is_school_approved   boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_food_handler_cert boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_verified           boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_insurance         boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS has_license           boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS license_expiry        date;
