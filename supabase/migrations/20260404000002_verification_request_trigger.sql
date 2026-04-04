-- Move verification_request creation from frontend JS to a DB trigger.
-- Reason: frontend insert depends on auth.uid() which is null when Supabase
-- email confirmation is enabled — causing silent RLS failures.
-- SECURITY DEFINER ensures this runs regardless of session state.

CREATE OR REPLACE FUNCTION public.create_verification_request_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.role IN ('truck', 'organizer', 'venue', 'property', 'service_provider') THEN
    INSERT INTO public.verification_requests (user_id, status, role, email, contact_name, submitted_at)
    VALUES (NEW.id, 'pending', NEW.role, NEW.email, NEW.full_name, now())
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created_create_verification_request ON public.profiles;
CREATE TRIGGER on_profile_created_create_verification_request
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_verification_request_on_signup();
