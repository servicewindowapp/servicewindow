


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_trial_dates"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_trial_dates"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_trial_end_date"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_trial_end_date"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_trial_ends_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
    NEW.trial_converted = false;
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_trial_ends_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."jobs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "poster_id" "uuid",
    "title" "text" NOT NULL,
    "job_type" "text",
    "description" "text",
    "city" "text",
    "state" "text" DEFAULT 'FL'::"text",
    "pay_rate" numeric(10,2),
    "pay_type" "text",
    "requirements" "text",
    "is_active" boolean DEFAULT true,
    "expires_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "jobs_job_type_check" CHECK (("job_type" = ANY (ARRAY['full_time'::"text", 'part_time'::"text", 'gig'::"text", 'seasonal'::"text"]))),
    CONSTRAINT "jobs_pay_type_check" CHECK (("pay_type" = ANY (ARRAY['hourly'::"text", 'salary'::"text", 'per_event'::"text"])))
);


ALTER TABLE "public"."jobs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "request_id" "uuid",
    "sender_id" "uuid",
    "recipient_id" "uuid",
    "body" "text" NOT NULL,
    "is_read" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "type" "text" NOT NULL,
    "title" "text",
    "body" "text",
    "is_read" boolean DEFAULT false,
    "link" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."notifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "role" "text" NOT NULL,
    "full_name" "text",
    "business_name" "text",
    "email" "text",
    "phone" "text",
    "city" "text",
    "state" "text" DEFAULT 'FL'::"text",
    "bio" "text",
    "avatar_url" "text",
    "website" "text",
    "subscription_tier" "text" DEFAULT 'free'::"text",
    "subscription_status" "text" DEFAULT 'inactive'::"text",
    "stripe_customer_id" "text",
    "stripe_subscription_id" "text",
    "is_verified" boolean DEFAULT false,
    "is_active" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "organizer_type" "text",
    "verification_status" "text" DEFAULT 'unverified'::"text" NOT NULL,
    "trial_starts_at" timestamp with time zone,
    "trial_ends_at" timestamp with time zone,
    "trial_converted" boolean DEFAULT false,
    "intended_plan" "text",
    "trial_started_at" timestamp with time zone,
    CONSTRAINT "profiles_role_check" CHECK (("role" = ANY (ARRAY['truck'::"text", 'venue'::"text", 'organizer'::"text", 'property'::"text", 'service_provider'::"text", 'job_seeker'::"text", 'admin'::"text"]))),
    CONSTRAINT "profiles_subscription_status_check" CHECK (("subscription_status" = ANY (ARRAY['active'::"text", 'inactive'::"text", 'cancelled'::"text", 'past_due'::"text"]))),
    CONSTRAINT "profiles_subscription_tier_check" CHECK (("subscription_tier" = ANY (ARRAY['free'::"text", 'starter'::"text", 'pro'::"text", 'enterprise'::"text"])))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."properties" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "uuid",
    "name" "text" NOT NULL,
    "property_type" "text",
    "description" "text",
    "address" "text",
    "city" "text",
    "state" "text" DEFAULT 'FL'::"text",
    "available_spaces" integer DEFAULT 1,
    "price_per_day" numeric(10,2),
    "price_per_month" numeric(10,2),
    "power_available" boolean DEFAULT false,
    "water_available" boolean DEFAULT false,
    "is_active" boolean DEFAULT true,
    "is_approved" boolean DEFAULT false,
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."properties" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "requester_id" "uuid",
    "truck_id" "uuid",
    "venue_id" "uuid",
    "property_id" "uuid",
    "request_type" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text",
    "event_name" "text",
    "event_date" "date",
    "start_time" time without time zone,
    "end_time" time without time zone,
    "guest_count" integer,
    "location" "text",
    "city" "text",
    "notes" "text",
    "budget" numeric(10,2),
    "quoted_price" numeric(10,2),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "requests_request_type_check" CHECK (("request_type" = ANY (ARRAY['truck_booking'::"text", 'venue_booking'::"text", 'property_rental'::"text", 'job_inquiry'::"text"]))),
    CONSTRAINT "requests_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'accepted'::"text", 'declined'::"text", 'cancelled'::"text", 'completed'::"text"])))
);


ALTER TABLE "public"."requests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."reviews" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "reviewer_id" "uuid",
    "truck_id" "uuid",
    "venue_id" "uuid",
    "request_id" "uuid",
    "rating" integer,
    "body" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "reviews_rating_check" CHECK ((("rating" >= 1) AND ("rating" <= 5)))
);


ALTER TABLE "public"."reviews" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."trucks" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "uuid",
    "name" "text" NOT NULL,
    "cuisine_type" "text",
    "description" "text",
    "service_radius_miles" integer DEFAULT 25,
    "min_booking_hours" integer DEFAULT 2,
    "price_per_hour" numeric(10,2),
    "flat_event_rate" numeric(10,2),
    "serves_per_hour" integer,
    "max_capacity" integer,
    "setup_time_minutes" integer DEFAULT 30,
    "equipment_needs" "text",
    "cities_served" "text"[],
    "is_active" boolean DEFAULT true,
    "is_approved" boolean DEFAULT false,
    "avatar_url" "text",
    "cover_url" "text",
    "rating" numeric(3,2) DEFAULT 0,
    "review_count" integer DEFAULT 0,
    "total_bookings" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "is_school_approved" boolean DEFAULT false NOT NULL,
    "has_food_handler_cert" boolean DEFAULT false NOT NULL,
    "is_verified" boolean DEFAULT false NOT NULL,
    "has_insurance" boolean DEFAULT false NOT NULL,
    "has_license" boolean DEFAULT false NOT NULL,
    "license_expiry" "date"
);


ALTER TABLE "public"."trucks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."venues" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "owner_id" "uuid",
    "name" "text" NOT NULL,
    "venue_type" "text",
    "description" "text",
    "address" "text",
    "city" "text",
    "state" "text" DEFAULT 'FL'::"text",
    "capacity" integer,
    "parking_spaces" integer,
    "power_available" boolean DEFAULT false,
    "water_available" boolean DEFAULT false,
    "price_per_event" numeric(10,2),
    "price_per_day" numeric(10,2),
    "is_active" boolean DEFAULT true,
    "is_approved" boolean DEFAULT false,
    "avatar_url" "text",
    "cover_url" "text",
    "rating" numeric(3,2) DEFAULT 0,
    "review_count" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."venues" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."verification_requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "full_name" "text" NOT NULL,
    "org_name" "text" NOT NULL,
    "org_type" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "website" "text",
    "description" "text" NOT NULL,
    "referral" "text",
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "submitted_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "reviewed_at" timestamp with time zone,
    "reviewed_by" "uuid",
    "admin_notes" "text",
    CONSTRAINT "verification_requests_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'approved'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."verification_requests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."waitlist" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text" NOT NULL,
    "role" "text",
    "business_name" "text",
    "city" "text",
    "source" "text" DEFAULT 'landing'::"text",
    "converted" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."waitlist" OWNER TO "postgres";


ALTER TABLE ONLY "public"."jobs"
    ADD CONSTRAINT "jobs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."properties"
    ADD CONSTRAINT "properties_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."requests"
    ADD CONSTRAINT "requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."trucks"
    ADD CONSTRAINT "trucks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."venues"
    ADD CONSTRAINT "venues_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."verification_requests"
    ADD CONSTRAINT "verification_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."waitlist"
    ADD CONSTRAINT "waitlist_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."waitlist"
    ADD CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_profiles_trial_converted" ON "public"."profiles" USING "btree" ("trial_converted") WHERE ("trial_converted" = false);



CREATE INDEX "idx_profiles_trial_ends_at" ON "public"."profiles" USING "btree" ("trial_ends_at") WHERE ("trial_ends_at" IS NOT NULL);



CREATE INDEX "idx_verif_requests_status_submitted" ON "public"."verification_requests" USING "btree" ("status", "submitted_at" DESC);



CREATE INDEX "idx_verif_requests_user_id" ON "public"."verification_requests" USING "btree" ("user_id");



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."jobs" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."properties" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."requests" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."trucks" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "handle_updated_at" BEFORE UPDATE ON "public"."venues" FOR EACH ROW EXECUTE FUNCTION "public"."handle_updated_at"();



CREATE OR REPLACE TRIGGER "set_trial_dates_trigger" BEFORE INSERT ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."set_trial_dates"();



CREATE OR REPLACE TRIGGER "set_trial_end_date_trigger" BEFORE INSERT ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."set_trial_end_date"();



CREATE OR REPLACE TRIGGER "set_trial_ends_at_trigger" BEFORE INSERT ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."set_trial_ends_at"();



ALTER TABLE ONLY "public"."jobs"
    ADD CONSTRAINT "jobs_poster_id_fkey" FOREIGN KEY ("poster_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."requests"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."properties"
    ADD CONSTRAINT "properties_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."requests"
    ADD CONSTRAINT "requests_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."requests"
    ADD CONSTRAINT "requests_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."requests"
    ADD CONSTRAINT "requests_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "public"."trucks"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."requests"
    ADD CONSTRAINT "requests_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."requests"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "public"."trucks"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reviews"
    ADD CONSTRAINT "reviews_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."trucks"
    ADD CONSTRAINT "trucks_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."venues"
    ADD CONSTRAINT "venues_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."verification_requests"
    ADD CONSTRAINT "verification_requests_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."verification_requests"
    ADD CONSTRAINT "verification_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Admins can view waitlist" ON "public"."waitlist" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"text")))));



CREATE POLICY "Anyone can join waitlist" ON "public"."waitlist" FOR INSERT WITH CHECK (true);



CREATE POLICY "Anyone can view active approved properties" ON "public"."properties" FOR SELECT USING ((("is_active" = true) AND ("is_approved" = true)));



CREATE POLICY "Anyone can view active approved trucks" ON "public"."trucks" FOR SELECT USING ((("is_active" = true) AND ("is_approved" = true)));



CREATE POLICY "Anyone can view active approved venues" ON "public"."venues" FOR SELECT USING ((("is_active" = true) AND ("is_approved" = true)));



CREATE POLICY "Anyone can view active jobs" ON "public"."jobs" FOR SELECT USING (("is_active" = true));



CREATE POLICY "Anyone can view reviews" ON "public"."reviews" FOR SELECT USING (true);



CREATE POLICY "Authenticated users can create requests" ON "public"."requests" FOR INSERT WITH CHECK (("auth"."uid"() = "requester_id"));



CREATE POLICY "Authenticated users can send messages" ON "public"."messages" FOR INSERT WITH CHECK (("auth"."uid"() = "sender_id"));



CREATE POLICY "Authenticated users can write reviews" ON "public"."reviews" FOR INSERT WITH CHECK (("auth"."uid"() = "reviewer_id"));



CREATE POLICY "Owners can delete their own trucks" ON "public"."trucks" FOR DELETE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can delete their own venues" ON "public"."venues" FOR DELETE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can insert their own properties" ON "public"."properties" FOR INSERT WITH CHECK (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can insert their own trucks" ON "public"."trucks" FOR INSERT WITH CHECK (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can insert their own venues" ON "public"."venues" FOR INSERT WITH CHECK (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can update their own properties" ON "public"."properties" FOR UPDATE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can update their own trucks" ON "public"."trucks" FOR UPDATE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can update their own venues" ON "public"."venues" FOR UPDATE USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can view their own properties" ON "public"."properties" FOR SELECT USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can view their own trucks" ON "public"."trucks" FOR SELECT USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Owners can view their own venues" ON "public"."venues" FOR SELECT USING (("auth"."uid"() = "owner_id"));



CREATE POLICY "Participants can view their messages" ON "public"."messages" FOR SELECT USING ((("auth"."uid"() = "sender_id") OR ("auth"."uid"() = "recipient_id")));



CREATE POLICY "Parties can update their own requests" ON "public"."requests" FOR UPDATE USING ((("auth"."uid"() = "requester_id") OR ("auth"."uid"() = ( SELECT "trucks"."owner_id"
   FROM "public"."trucks"
  WHERE ("trucks"."id" = "requests"."truck_id"))) OR ("auth"."uid"() = ( SELECT "venues"."owner_id"
   FROM "public"."venues"
  WHERE ("venues"."id" = "requests"."venue_id")))));



CREATE POLICY "Parties can view their own requests" ON "public"."requests" FOR SELECT USING ((("auth"."uid"() = "requester_id") OR ("auth"."uid"() = ( SELECT "trucks"."owner_id"
   FROM "public"."trucks"
  WHERE ("trucks"."id" = "requests"."truck_id"))) OR ("auth"."uid"() = ( SELECT "venues"."owner_id"
   FROM "public"."venues"
  WHERE ("venues"."id" = "requests"."venue_id"))) OR ("auth"."uid"() = ( SELECT "properties"."owner_id"
   FROM "public"."properties"
  WHERE ("properties"."id" = "requests"."property_id")))));



CREATE POLICY "Posters can manage their own jobs" ON "public"."jobs" USING (("auth"."uid"() = "poster_id"));



CREATE POLICY "Recipients can mark messages read" ON "public"."messages" FOR UPDATE USING (("auth"."uid"() = "recipient_id"));



CREATE POLICY "Users can update own notifications" ON "public"."notifications" FOR UPDATE USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view any profile" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Users can view own notifications" ON "public"."notifications" FOR SELECT USING (("auth"."uid"() = "user_id"));



CREATE POLICY "admins can manage all verification requests" ON "public"."verification_requests" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"text")))));



ALTER TABLE "public"."jobs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."messages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."notifications" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "organizers can submit verification requests" ON "public"."verification_requests" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "organizers can view own requests" ON "public"."verification_requests" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."requests" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."reviews" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."verification_requests" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."waitlist" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."messages";






GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_trial_dates"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_trial_dates"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_trial_dates"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_trial_end_date"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_trial_end_date"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_trial_end_date"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_trial_ends_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_trial_ends_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_trial_ends_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."jobs" TO "anon";
GRANT ALL ON TABLE "public"."jobs" TO "authenticated";
GRANT ALL ON TABLE "public"."jobs" TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON TABLE "public"."notifications" TO "anon";
GRANT ALL ON TABLE "public"."notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."properties" TO "anon";
GRANT ALL ON TABLE "public"."properties" TO "authenticated";
GRANT ALL ON TABLE "public"."properties" TO "service_role";



GRANT ALL ON TABLE "public"."requests" TO "anon";
GRANT ALL ON TABLE "public"."requests" TO "authenticated";
GRANT ALL ON TABLE "public"."requests" TO "service_role";



GRANT ALL ON TABLE "public"."reviews" TO "anon";
GRANT ALL ON TABLE "public"."reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."reviews" TO "service_role";



GRANT ALL ON TABLE "public"."trucks" TO "anon";
GRANT ALL ON TABLE "public"."trucks" TO "authenticated";
GRANT ALL ON TABLE "public"."trucks" TO "service_role";



GRANT ALL ON TABLE "public"."venues" TO "anon";
GRANT ALL ON TABLE "public"."venues" TO "authenticated";
GRANT ALL ON TABLE "public"."venues" TO "service_role";



GRANT ALL ON TABLE "public"."verification_requests" TO "anon";
GRANT ALL ON TABLE "public"."verification_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."verification_requests" TO "service_role";



GRANT ALL ON TABLE "public"."waitlist" TO "anon";
GRANT ALL ON TABLE "public"."waitlist" TO "authenticated";
GRANT ALL ON TABLE "public"."waitlist" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































