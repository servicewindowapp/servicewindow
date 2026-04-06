-- 1. Set admin role
UPDATE profiles SET role = 'admin' WHERE email = 'wesfitz72@gmail.com';

-- 2. Check for existing verification requests
SELECT * FROM verification_requests ORDER BY submitted_at DESC LIMIT 10;

-- 3. Create the trigger
CREATE OR REPLACE FUNCTION public.create_verification_request_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.role IN ('truck', 'organizer', 'venue', 'property', 'service_provider') THEN
    INSERT INTO public.verification_requests (user_id, status, role, email, contact_name)
    VALUES (NEW.id, 'pending', NEW.role, NEW.email, NEW.full_name)
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