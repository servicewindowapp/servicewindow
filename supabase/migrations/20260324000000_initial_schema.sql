
  create table "public"."jobs" (
    "id" uuid not null default gen_random_uuid(),
    "poster_id" uuid,
    "title" text not null,
    "job_type" text,
    "description" text,
    "city" text,
    "state" text default 'FL'::text,
    "pay_rate" numeric(10,2),
    "pay_type" text,
    "requirements" text,
    "is_active" boolean default true,
    "expires_at" timestamp with time zone,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."jobs" enable row level security;


  create table "public"."messages" (
    "id" uuid not null default gen_random_uuid(),
    "request_id" uuid,
    "sender_id" uuid,
    "recipient_id" uuid,
    "body" text not null,
    "is_read" boolean default false,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."messages" enable row level security;


  create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "type" text not null,
    "title" text,
    "body" text,
    "is_read" boolean default false,
    "link" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."notifications" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "role" text not null,
    "full_name" text,
    "business_name" text,
    "email" text,
    "phone" text,
    "city" text,
    "state" text default 'FL'::text,
    "bio" text,
    "avatar_url" text,
    "website" text,
    "subscription_tier" text default 'free'::text,
    "subscription_status" text default 'inactive'::text,
    "stripe_customer_id" text,
    "stripe_subscription_id" text,
    "is_verified" boolean default false,
    "is_active" boolean default true,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "organizer_type" text,
    "verification_status" text not null default 'unverified'::text,
    "trial_starts_at" timestamp with time zone,
    "trial_ends_at" timestamp with time zone,
    "trial_converted" boolean default false,
    "intended_plan" text,
    "trial_started_at" timestamp with time zone
      );



  create table "public"."properties" (
    "id" uuid not null default gen_random_uuid(),
    "owner_id" uuid,
    "name" text not null,
    "property_type" text,
    "description" text,
    "address" text,
    "city" text,
    "state" text default 'FL'::text,
    "available_spaces" integer default 1,
    "price_per_day" numeric(10,2),
    "price_per_month" numeric(10,2),
    "power_available" boolean default false,
    "water_available" boolean default false,
    "is_active" boolean default true,
    "is_approved" boolean default false,
    "avatar_url" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."requests" (
    "id" uuid not null default gen_random_uuid(),
    "requester_id" uuid,
    "truck_id" uuid,
    "venue_id" uuid,
    "property_id" uuid,
    "request_type" text not null,
    "status" text default 'pending'::text,
    "event_name" text,
    "event_date" date,
    "start_time" time without time zone,
    "end_time" time without time zone,
    "guest_count" integer,
    "location" text,
    "city" text,
    "notes" text,
    "budget" numeric(10,2),
    "quoted_price" numeric(10,2),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."requests" enable row level security;


  create table "public"."reviews" (
    "id" uuid not null default gen_random_uuid(),
    "reviewer_id" uuid,
    "truck_id" uuid,
    "venue_id" uuid,
    "request_id" uuid,
    "rating" integer,
    "body" text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."reviews" enable row level security;


  create table "public"."trucks" (
    "id" uuid not null default gen_random_uuid(),
    "owner_id" uuid,
    "name" text not null,
    "cuisine_type" text,
    "description" text,
    "service_radius_miles" integer default 25,
    "min_booking_hours" integer default 2,
    "price_per_hour" numeric(10,2),
    "flat_event_rate" numeric(10,2),
    "serves_per_hour" integer,
    "max_capacity" integer,
    "setup_time_minutes" integer default 30,
    "equipment_needs" text,
    "cities_served" text[],
    "is_active" boolean default true,
    "is_approved" boolean default false,
    "avatar_url" text,
    "cover_url" text,
    "rating" numeric(3,2) default 0,
    "review_count" integer default 0,
    "total_bookings" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "is_school_approved" boolean not null default false,
    "has_food_handler_cert" boolean not null default false,
    "is_verified" boolean not null default false,
    "has_insurance" boolean not null default false,
    "has_license" boolean not null default false,
    "license_expiry" date
      );



  create table "public"."venues" (
    "id" uuid not null default gen_random_uuid(),
    "owner_id" uuid,
    "name" text not null,
    "venue_type" text,
    "description" text,
    "address" text,
    "city" text,
    "state" text default 'FL'::text,
    "capacity" integer,
    "parking_spaces" integer,
    "power_available" boolean default false,
    "water_available" boolean default false,
    "price_per_event" numeric(10,2),
    "price_per_day" numeric(10,2),
    "is_active" boolean default true,
    "is_approved" boolean default false,
    "avatar_url" text,
    "cover_url" text,
    "rating" numeric(3,2) default 0,
    "review_count" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."verification_requests" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "full_name" text not null,
    "org_name" text not null,
    "org_type" text not null,
    "phone" text not null,
    "website" text,
    "description" text not null,
    "referral" text,
    "status" text not null default 'pending'::text,
    "submitted_at" timestamp with time zone not null default now(),
    "reviewed_at" timestamp with time zone,
    "reviewed_by" uuid,
    "admin_notes" text
      );


alter table "public"."verification_requests" enable row level security;


  create table "public"."waitlist" (
    "id" uuid not null default gen_random_uuid(),
    "email" text not null,
    "role" text,
    "business_name" text,
    "city" text,
    "source" text default 'landing'::text,
    "converted" boolean default false,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."waitlist" enable row level security;

CREATE INDEX idx_profiles_trial_converted ON public.profiles USING btree (trial_converted) WHERE (trial_converted = false);

CREATE INDEX idx_profiles_trial_ends_at ON public.profiles USING btree (trial_ends_at) WHERE (trial_ends_at IS NOT NULL);

CREATE INDEX idx_verif_requests_status_submitted ON public.verification_requests USING btree (status, submitted_at DESC);

CREATE INDEX idx_verif_requests_user_id ON public.verification_requests USING btree (user_id);

CREATE UNIQUE INDEX jobs_pkey ON public.jobs USING btree (id);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX properties_pkey ON public.properties USING btree (id);

CREATE UNIQUE INDEX requests_pkey ON public.requests USING btree (id);

CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (id);

CREATE UNIQUE INDEX trucks_pkey ON public.trucks USING btree (id);

CREATE UNIQUE INDEX venues_pkey ON public.venues USING btree (id);

CREATE UNIQUE INDEX verification_requests_pkey ON public.verification_requests USING btree (id);

CREATE UNIQUE INDEX waitlist_email_key ON public.waitlist USING btree (email);

CREATE UNIQUE INDEX waitlist_pkey ON public.waitlist USING btree (id);

alter table "public"."jobs" add constraint "jobs_pkey" PRIMARY KEY using index "jobs_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."properties" add constraint "properties_pkey" PRIMARY KEY using index "properties_pkey";

alter table "public"."requests" add constraint "requests_pkey" PRIMARY KEY using index "requests_pkey";

alter table "public"."reviews" add constraint "reviews_pkey" PRIMARY KEY using index "reviews_pkey";

alter table "public"."trucks" add constraint "trucks_pkey" PRIMARY KEY using index "trucks_pkey";

alter table "public"."venues" add constraint "venues_pkey" PRIMARY KEY using index "venues_pkey";

alter table "public"."verification_requests" add constraint "verification_requests_pkey" PRIMARY KEY using index "verification_requests_pkey";

alter table "public"."waitlist" add constraint "waitlist_pkey" PRIMARY KEY using index "waitlist_pkey";

alter table "public"."jobs" add constraint "jobs_job_type_check" CHECK ((job_type = ANY (ARRAY['full_time'::text, 'part_time'::text, 'gig'::text, 'seasonal'::text]))) not valid;

alter table "public"."jobs" validate constraint "jobs_job_type_check";

alter table "public"."jobs" add constraint "jobs_pay_type_check" CHECK ((pay_type = ANY (ARRAY['hourly'::text, 'salary'::text, 'per_event'::text]))) not valid;

alter table "public"."jobs" validate constraint "jobs_pay_type_check";

alter table "public"."jobs" add constraint "jobs_poster_id_fkey" FOREIGN KEY (poster_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."jobs" validate constraint "jobs_poster_id_fkey";

alter table "public"."messages" add constraint "messages_recipient_id_fkey" FOREIGN KEY (recipient_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_recipient_id_fkey";

alter table "public"."messages" add constraint "messages_request_id_fkey" FOREIGN KEY (request_id) REFERENCES public.requests(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_request_id_fkey";

alter table "public"."messages" add constraint "messages_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_sender_id_fkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_role_check" CHECK ((role = ANY (ARRAY['truck'::text, 'venue'::text, 'organizer'::text, 'property'::text, 'service_provider'::text, 'job_seeker'::text, 'admin'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_role_check";

alter table "public"."profiles" add constraint "profiles_subscription_status_check" CHECK ((subscription_status = ANY (ARRAY['active'::text, 'inactive'::text, 'cancelled'::text, 'past_due'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_subscription_status_check";

alter table "public"."profiles" add constraint "profiles_subscription_tier_check" CHECK ((subscription_tier = ANY (ARRAY['free'::text, 'starter'::text, 'pro'::text, 'enterprise'::text]))) not valid;

alter table "public"."profiles" validate constraint "profiles_subscription_tier_check";

alter table "public"."properties" add constraint "properties_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."properties" validate constraint "properties_owner_id_fkey";

alter table "public"."requests" add constraint "requests_property_id_fkey" FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL not valid;

alter table "public"."requests" validate constraint "requests_property_id_fkey";

alter table "public"."requests" add constraint "requests_request_type_check" CHECK ((request_type = ANY (ARRAY['truck_booking'::text, 'venue_booking'::text, 'property_rental'::text, 'job_inquiry'::text]))) not valid;

alter table "public"."requests" validate constraint "requests_request_type_check";

alter table "public"."requests" add constraint "requests_requester_id_fkey" FOREIGN KEY (requester_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."requests" validate constraint "requests_requester_id_fkey";

alter table "public"."requests" add constraint "requests_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'accepted'::text, 'declined'::text, 'cancelled'::text, 'completed'::text]))) not valid;

alter table "public"."requests" validate constraint "requests_status_check";

alter table "public"."requests" add constraint "requests_truck_id_fkey" FOREIGN KEY (truck_id) REFERENCES public.trucks(id) ON DELETE SET NULL not valid;

alter table "public"."requests" validate constraint "requests_truck_id_fkey";

alter table "public"."requests" add constraint "requests_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE SET NULL not valid;

alter table "public"."requests" validate constraint "requests_venue_id_fkey";

alter table "public"."reviews" add constraint "reviews_rating_check" CHECK (((rating >= 1) AND (rating <= 5))) not valid;

alter table "public"."reviews" validate constraint "reviews_rating_check";

alter table "public"."reviews" add constraint "reviews_request_id_fkey" FOREIGN KEY (request_id) REFERENCES public.requests(id) ON DELETE SET NULL not valid;

alter table "public"."reviews" validate constraint "reviews_request_id_fkey";

alter table "public"."reviews" add constraint "reviews_reviewer_id_fkey" FOREIGN KEY (reviewer_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."reviews" validate constraint "reviews_reviewer_id_fkey";

alter table "public"."reviews" add constraint "reviews_truck_id_fkey" FOREIGN KEY (truck_id) REFERENCES public.trucks(id) ON DELETE CASCADE not valid;

alter table "public"."reviews" validate constraint "reviews_truck_id_fkey";

alter table "public"."reviews" add constraint "reviews_venue_id_fkey" FOREIGN KEY (venue_id) REFERENCES public.venues(id) ON DELETE CASCADE not valid;

alter table "public"."reviews" validate constraint "reviews_venue_id_fkey";

alter table "public"."trucks" add constraint "trucks_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."trucks" validate constraint "trucks_owner_id_fkey";

alter table "public"."venues" add constraint "venues_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."venues" validate constraint "venues_owner_id_fkey";

alter table "public"."verification_requests" add constraint "verification_requests_reviewed_by_fkey" FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) not valid;

alter table "public"."verification_requests" validate constraint "verification_requests_reviewed_by_fkey";

alter table "public"."verification_requests" add constraint "verification_requests_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text]))) not valid;

alter table "public"."verification_requests" validate constraint "verification_requests_status_check";

alter table "public"."verification_requests" add constraint "verification_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."verification_requests" validate constraint "verification_requests_user_id_fkey";

alter table "public"."waitlist" add constraint "waitlist_email_key" UNIQUE using index "waitlist_email_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_trial_dates()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_trial_end_date()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
  END IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.set_trial_ends_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.role IN ('truck', 'service_provider') THEN
    NEW.trial_ends_at = now() + interval '30 days';
    NEW.trial_converted = false;
  END IF;
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."jobs" to "anon";

grant insert on table "public"."jobs" to "anon";

grant references on table "public"."jobs" to "anon";

grant select on table "public"."jobs" to "anon";

grant trigger on table "public"."jobs" to "anon";

grant truncate on table "public"."jobs" to "anon";

grant update on table "public"."jobs" to "anon";

grant delete on table "public"."jobs" to "authenticated";

grant insert on table "public"."jobs" to "authenticated";

grant references on table "public"."jobs" to "authenticated";

grant select on table "public"."jobs" to "authenticated";

grant trigger on table "public"."jobs" to "authenticated";

grant truncate on table "public"."jobs" to "authenticated";

grant update on table "public"."jobs" to "authenticated";

grant delete on table "public"."jobs" to "service_role";

grant insert on table "public"."jobs" to "service_role";

grant references on table "public"."jobs" to "service_role";

grant select on table "public"."jobs" to "service_role";

grant trigger on table "public"."jobs" to "service_role";

grant truncate on table "public"."jobs" to "service_role";

grant update on table "public"."jobs" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."properties" to "anon";

grant insert on table "public"."properties" to "anon";

grant references on table "public"."properties" to "anon";

grant select on table "public"."properties" to "anon";

grant trigger on table "public"."properties" to "anon";

grant truncate on table "public"."properties" to "anon";

grant update on table "public"."properties" to "anon";

grant delete on table "public"."properties" to "authenticated";

grant insert on table "public"."properties" to "authenticated";

grant references on table "public"."properties" to "authenticated";

grant select on table "public"."properties" to "authenticated";

grant trigger on table "public"."properties" to "authenticated";

grant truncate on table "public"."properties" to "authenticated";

grant update on table "public"."properties" to "authenticated";

grant delete on table "public"."properties" to "service_role";

grant insert on table "public"."properties" to "service_role";

grant references on table "public"."properties" to "service_role";

grant select on table "public"."properties" to "service_role";

grant trigger on table "public"."properties" to "service_role";

grant truncate on table "public"."properties" to "service_role";

grant update on table "public"."properties" to "service_role";

grant delete on table "public"."requests" to "anon";

grant insert on table "public"."requests" to "anon";

grant references on table "public"."requests" to "anon";

grant select on table "public"."requests" to "anon";

grant trigger on table "public"."requests" to "anon";

grant truncate on table "public"."requests" to "anon";

grant update on table "public"."requests" to "anon";

grant delete on table "public"."requests" to "authenticated";

grant insert on table "public"."requests" to "authenticated";

grant references on table "public"."requests" to "authenticated";

grant select on table "public"."requests" to "authenticated";

grant trigger on table "public"."requests" to "authenticated";

grant truncate on table "public"."requests" to "authenticated";

grant update on table "public"."requests" to "authenticated";

grant delete on table "public"."requests" to "service_role";

grant insert on table "public"."requests" to "service_role";

grant references on table "public"."requests" to "service_role";

grant select on table "public"."requests" to "service_role";

grant trigger on table "public"."requests" to "service_role";

grant truncate on table "public"."requests" to "service_role";

grant update on table "public"."requests" to "service_role";

grant delete on table "public"."reviews" to "anon";

grant insert on table "public"."reviews" to "anon";

grant references on table "public"."reviews" to "anon";

grant select on table "public"."reviews" to "anon";

grant trigger on table "public"."reviews" to "anon";

grant truncate on table "public"."reviews" to "anon";

grant update on table "public"."reviews" to "anon";

grant delete on table "public"."reviews" to "authenticated";

grant insert on table "public"."reviews" to "authenticated";

grant references on table "public"."reviews" to "authenticated";

grant select on table "public"."reviews" to "authenticated";

grant trigger on table "public"."reviews" to "authenticated";

grant truncate on table "public"."reviews" to "authenticated";

grant update on table "public"."reviews" to "authenticated";

grant delete on table "public"."reviews" to "service_role";

grant insert on table "public"."reviews" to "service_role";

grant references on table "public"."reviews" to "service_role";

grant select on table "public"."reviews" to "service_role";

grant trigger on table "public"."reviews" to "service_role";

grant truncate on table "public"."reviews" to "service_role";

grant update on table "public"."reviews" to "service_role";

grant delete on table "public"."trucks" to "anon";

grant insert on table "public"."trucks" to "anon";

grant references on table "public"."trucks" to "anon";

grant select on table "public"."trucks" to "anon";

grant trigger on table "public"."trucks" to "anon";

grant truncate on table "public"."trucks" to "anon";

grant update on table "public"."trucks" to "anon";

grant delete on table "public"."trucks" to "authenticated";

grant insert on table "public"."trucks" to "authenticated";

grant references on table "public"."trucks" to "authenticated";

grant select on table "public"."trucks" to "authenticated";

grant trigger on table "public"."trucks" to "authenticated";

grant truncate on table "public"."trucks" to "authenticated";

grant update on table "public"."trucks" to "authenticated";

grant delete on table "public"."trucks" to "service_role";

grant insert on table "public"."trucks" to "service_role";

grant references on table "public"."trucks" to "service_role";

grant select on table "public"."trucks" to "service_role";

grant trigger on table "public"."trucks" to "service_role";

grant truncate on table "public"."trucks" to "service_role";

grant update on table "public"."trucks" to "service_role";

grant delete on table "public"."venues" to "anon";

grant insert on table "public"."venues" to "anon";

grant references on table "public"."venues" to "anon";

grant select on table "public"."venues" to "anon";

grant trigger on table "public"."venues" to "anon";

grant truncate on table "public"."venues" to "anon";

grant update on table "public"."venues" to "anon";

grant delete on table "public"."venues" to "authenticated";

grant insert on table "public"."venues" to "authenticated";

grant references on table "public"."venues" to "authenticated";

grant select on table "public"."venues" to "authenticated";

grant trigger on table "public"."venues" to "authenticated";

grant truncate on table "public"."venues" to "authenticated";

grant update on table "public"."venues" to "authenticated";

grant delete on table "public"."venues" to "service_role";

grant insert on table "public"."venues" to "service_role";

grant references on table "public"."venues" to "service_role";

grant select on table "public"."venues" to "service_role";

grant trigger on table "public"."venues" to "service_role";

grant truncate on table "public"."venues" to "service_role";

grant update on table "public"."venues" to "service_role";

grant delete on table "public"."verification_requests" to "anon";

grant insert on table "public"."verification_requests" to "anon";

grant references on table "public"."verification_requests" to "anon";

grant select on table "public"."verification_requests" to "anon";

grant trigger on table "public"."verification_requests" to "anon";

grant truncate on table "public"."verification_requests" to "anon";

grant update on table "public"."verification_requests" to "anon";

grant delete on table "public"."verification_requests" to "authenticated";

grant insert on table "public"."verification_requests" to "authenticated";

grant references on table "public"."verification_requests" to "authenticated";

grant select on table "public"."verification_requests" to "authenticated";

grant trigger on table "public"."verification_requests" to "authenticated";

grant truncate on table "public"."verification_requests" to "authenticated";

grant update on table "public"."verification_requests" to "authenticated";

grant delete on table "public"."verification_requests" to "service_role";

grant insert on table "public"."verification_requests" to "service_role";

grant references on table "public"."verification_requests" to "service_role";

grant select on table "public"."verification_requests" to "service_role";

grant trigger on table "public"."verification_requests" to "service_role";

grant truncate on table "public"."verification_requests" to "service_role";

grant update on table "public"."verification_requests" to "service_role";

grant delete on table "public"."waitlist" to "anon";

grant insert on table "public"."waitlist" to "anon";

grant references on table "public"."waitlist" to "anon";

grant select on table "public"."waitlist" to "anon";

grant trigger on table "public"."waitlist" to "anon";

grant truncate on table "public"."waitlist" to "anon";

grant update on table "public"."waitlist" to "anon";

grant delete on table "public"."waitlist" to "authenticated";

grant insert on table "public"."waitlist" to "authenticated";

grant references on table "public"."waitlist" to "authenticated";

grant select on table "public"."waitlist" to "authenticated";

grant trigger on table "public"."waitlist" to "authenticated";

grant truncate on table "public"."waitlist" to "authenticated";

grant update on table "public"."waitlist" to "authenticated";

grant delete on table "public"."waitlist" to "service_role";

grant insert on table "public"."waitlist" to "service_role";

grant references on table "public"."waitlist" to "service_role";

grant select on table "public"."waitlist" to "service_role";

grant trigger on table "public"."waitlist" to "service_role";

grant truncate on table "public"."waitlist" to "service_role";

grant update on table "public"."waitlist" to "service_role";


  create policy "Anyone can view active jobs"
  on "public"."jobs"
  as permissive
  for select
  to public
using ((is_active = true));



  create policy "Posters can manage their own jobs"
  on "public"."jobs"
  as permissive
  for all
  to public
using ((auth.uid() = poster_id));



  create policy "Authenticated users can send messages"
  on "public"."messages"
  as permissive
  for insert
  to public
with check ((auth.uid() = sender_id));



  create policy "Participants can view their messages"
  on "public"."messages"
  as permissive
  for select
  to public
using (((auth.uid() = sender_id) OR (auth.uid() = recipient_id)));



  create policy "Recipients can mark messages read"
  on "public"."messages"
  as permissive
  for update
  to public
using ((auth.uid() = recipient_id));



  create policy "Users can update own notifications"
  on "public"."notifications"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own notifications"
  on "public"."notifications"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can update own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view any profile"
  on "public"."profiles"
  as permissive
  for select
  to public
using (true);



  create policy "Anyone can view active approved properties"
  on "public"."properties"
  as permissive
  for select
  to public
using (((is_active = true) AND (is_approved = true)));



  create policy "Owners can insert their own properties"
  on "public"."properties"
  as permissive
  for insert
  to public
with check ((auth.uid() = owner_id));



  create policy "Owners can update their own properties"
  on "public"."properties"
  as permissive
  for update
  to public
using ((auth.uid() = owner_id));



  create policy "Owners can view their own properties"
  on "public"."properties"
  as permissive
  for select
  to public
using ((auth.uid() = owner_id));



  create policy "Authenticated users can create requests"
  on "public"."requests"
  as permissive
  for insert
  to public
with check ((auth.uid() = requester_id));



  create policy "Parties can update their own requests"
  on "public"."requests"
  as permissive
  for update
  to public
using (((auth.uid() = requester_id) OR (auth.uid() = ( SELECT trucks.owner_id
   FROM public.trucks
  WHERE (trucks.id = requests.truck_id))) OR (auth.uid() = ( SELECT venues.owner_id
   FROM public.venues
  WHERE (venues.id = requests.venue_id)))));



  create policy "Parties can view their own requests"
  on "public"."requests"
  as permissive
  for select
  to public
using (((auth.uid() = requester_id) OR (auth.uid() = ( SELECT trucks.owner_id
   FROM public.trucks
  WHERE (trucks.id = requests.truck_id))) OR (auth.uid() = ( SELECT venues.owner_id
   FROM public.venues
  WHERE (venues.id = requests.venue_id))) OR (auth.uid() = ( SELECT properties.owner_id
   FROM public.properties
  WHERE (properties.id = requests.property_id)))));



  create policy "Anyone can view reviews"
  on "public"."reviews"
  as permissive
  for select
  to public
using (true);



  create policy "Authenticated users can write reviews"
  on "public"."reviews"
  as permissive
  for insert
  to public
with check ((auth.uid() = reviewer_id));



  create policy "Anyone can view active approved trucks"
  on "public"."trucks"
  as permissive
  for select
  to public
using (((is_active = true) AND (is_approved = true)));



  create policy "Owners can delete their own trucks"
  on "public"."trucks"
  as permissive
  for delete
  to public
using ((auth.uid() = owner_id));



  create policy "Owners can insert their own trucks"
  on "public"."trucks"
  as permissive
  for insert
  to public
with check ((auth.uid() = owner_id));



  create policy "Owners can update their own trucks"
  on "public"."trucks"
  as permissive
  for update
  to public
using ((auth.uid() = owner_id));



  create policy "Owners can view their own trucks"
  on "public"."trucks"
  as permissive
  for select
  to public
using ((auth.uid() = owner_id));



  create policy "Anyone can view active approved venues"
  on "public"."venues"
  as permissive
  for select
  to public
using (((is_active = true) AND (is_approved = true)));



  create policy "Owners can delete their own venues"
  on "public"."venues"
  as permissive
  for delete
  to public
using ((auth.uid() = owner_id));



  create policy "Owners can insert their own venues"
  on "public"."venues"
  as permissive
  for insert
  to public
with check ((auth.uid() = owner_id));



  create policy "Owners can update their own venues"
  on "public"."venues"
  as permissive
  for update
  to public
using ((auth.uid() = owner_id));



  create policy "Owners can view their own venues"
  on "public"."venues"
  as permissive
  for select
  to public
using ((auth.uid() = owner_id));



  create policy "admins can manage all verification requests"
  on "public"."verification_requests"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "organizers can submit verification requests"
  on "public"."verification_requests"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "organizers can view own requests"
  on "public"."verification_requests"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Admins can view waitlist"
  on "public"."waitlist"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.role = 'admin'::text)))));



  create policy "Anyone can join waitlist"
  on "public"."waitlist"
  as permissive
  for insert
  to public
with check (true);


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_trial_dates_trigger BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_trial_dates();

CREATE TRIGGER set_trial_end_date_trigger BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_trial_end_date();

CREATE TRIGGER set_trial_ends_at_trigger BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_trial_ends_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.requests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.trucks FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.venues FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();



