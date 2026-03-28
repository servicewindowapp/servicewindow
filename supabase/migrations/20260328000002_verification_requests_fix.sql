-- Add profile snapshot columns to verification_requests table
-- These columns allow admins to see user details without JOIN to profiles table

ALTER TABLE "public"."verification_requests"
ADD COLUMN "role" text,
ADD COLUMN "business_name" text,
ADD COLUMN "email" text,
ADD COLUMN "contact_name" text,
ADD COLUMN "city" text;

-- Make old required columns nullable to support the new simplified flow
ALTER TABLE "public"."verification_requests"
ALTER COLUMN "full_name" DROP NOT NULL,
ALTER COLUMN "org_name" DROP NOT NULL,
ALTER COLUMN "org_type" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- Create index on new columns for faster queries
CREATE INDEX idx_verif_requests_role ON public.verification_requests USING btree (role);
CREATE INDEX idx_verif_requests_email ON public.verification_requests USING btree (email);

-- Update RLS policies to be more restrictive
-- Drop existing policies that are too permissive
DROP POLICY IF EXISTS "organizers can submit verification requests" ON "public"."verification_requests";
DROP POLICY IF EXISTS "organizers can view own requests" ON "public"."verification_requests";

-- Create new, more specific policies
CREATE POLICY "users can submit verification requests for themselves"
  ON "public"."verification_requests"
  AS PERMISSIVE
  FOR INSERT
  TO public
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users can view own verification requests"
  ON "public"."verification_requests"
  AS PERMISSIVE
  FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "admins can view all verification requests"
  ON "public"."verification_requests"
  AS PERMISSIVE
  FOR SELECT
  TO public
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "admins can update verification requests"
  ON "public"."verification_requests"
  AS PERMISSIVE
  FOR UPDATE
  TO public
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
