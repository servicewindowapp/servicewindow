-- Auto-verify all new signups — users get immediate dashboard access
-- is_verified (the badge) is still admin-awarded manually
-- verification_status just controls dashboard access

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, email, role, organizer_type,
    verification_status, is_verified, trial_ends_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'truck'),
    NEW.raw_user_meta_data->>'organizer_type',
    'verified',   -- immediate access, no gate
    false,        -- verified badge still admin-awarded
    CASE
      WHEN COALESCE(NEW.raw_user_meta_data->>'role', 'truck')
           IN ('truck', 'service_provider')
      THEN now() + interval '30 days'
      ELSE NULL
    END
  );
  RETURN NEW;
END;
$$;

-- Auto-approve any existing unverified profiles
UPDATE public.profiles
SET verification_status = 'verified'
WHERE verification_status = 'unverified';
