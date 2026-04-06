-- Step 1: Apply migration 20260328000002 (was never run on live DB)
ALTER TABLE public.verification_requests
ADD COLUMN IF NOT EXISTS "role" text,
ADD COLUMN IF NOT EXISTS "business_name" text,
ADD COLUMN IF NOT EXISTS "email" text,
ADD COLUMN IF NOT EXISTS "contact_name" text,
ADD COLUMN IF NOT EXISTS "city" text;

ALTER TABLE public.verification_requests
ALTER COLUMN "full_name" DROP NOT NULL,
ALTER COLUMN "org_name" DROP NOT NULL,
ALTER COLUMN "org_type" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- Step 2: Set admin role
UPDATE profiles SET role = 'admin' WHERE email = 'wesfitz72@gmail.com';

-- Step 3: Create the trigger
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

-- Step 4: Check for existing rows and backfill test accounts
SELECT * FROM verification_requests ORDER BY submitted_at DESC LIMIT 10;

INSERT INTO verification_requests (user_id, status, role, email, contact_name, submitted_at)
SELECT id, 'pending', role, email, full_name, now()
FROM profiles
WHERE role IN ('truck', 'organizer', 'venue', 'property', 'service_provider')
AND id NOT IN (SELECT user_id FROM verification_requests);