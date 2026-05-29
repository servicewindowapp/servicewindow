-- Add ON DELETE CASCADE to profiles → auth.users FK
-- Run in: Supabase SQL Editor
-- https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/sql
--
-- Without this, deleting a user from auth.users leaves an orphaned
-- profiles row. Playwright test cleanup was silently leaving ghost profiles.

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_id_fkey;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_id_fkey
  FOREIGN KEY (id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;
