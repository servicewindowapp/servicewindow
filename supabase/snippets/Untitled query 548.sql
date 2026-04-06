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