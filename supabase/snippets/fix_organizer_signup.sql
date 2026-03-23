-- Fix organizer signup: update role CHECK constraint + handle_new_user trigger
-- Run this in Supabase Studio SQL editor

-- 1. Update role CHECK constraint to allow 'organizer' (replaces 'planner')
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_role_check,
  ADD CONSTRAINT profiles_role_check
    CHECK (role IN ('truck','venue','organizer','property','service_provider','job_seeker','admin'));

-- 2. Update handle_new_user trigger to propagate organizer_type and verification_status
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, organizer_type, verification_status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'truck'),
    NEW.raw_user_meta_data->>'organizer_type',
    'unverified'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
