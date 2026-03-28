-- USERS & PROFILES
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role text not null check (role in ('truck','venue','planner','property','service_provider','job_seeker','admin')),
  full_name text,
  business_name text,
  email text,
  phone text,
  city text,
  state text default 'FL',
  bio text,
  avatar_url text,
  website text,
  subscription_tier text default 'free' check (subscription_tier in ('free','starter','pro','enterprise')),
  subscription_status text default 'inactive' check (subscription_status in ('active','inactive','cancelled','past_due')),
  stripe_customer_id text,
  stripe_subscription_id text,
  is_verified boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- TRUCK LISTINGS
create table public.trucks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  cuisine_type text,
  description text,
  service_radius_miles int default 25,
  min_booking_hours int default 2,
  price_per_hour decimal(10,2),
  flat_event_rate decimal(10,2),
  serves_per_hour int,
  max_capacity int,
  setup_time_minutes int default 30,
  equipment_needs text,
  cities_served text[],
  is_active boolean default true,
  is_approved boolean default false,
  avatar_url text,
  cover_url text,
  rating decimal(3,2) default 0,
  review_count int default 0,
  total_bookings int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- VENUE LISTINGS
create table public.venues (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  venue_type text,
  description text,
  address text,
  city text,
  state text default 'FL',
  capacity int,
  parking_spaces int,
  power_available boolean default false,
  water_available boolean default false,
  price_per_event decimal(10,2),
  price_per_day decimal(10,2),
  is_active boolean default true,
  is_approved boolean default false,
  avatar_url text,
  cover_url text,
  rating decimal(3,2) default 0,
  review_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- PROPERTY LISTINGS
create table public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  property_type text,
  description text,
  address text,
  city text,
  state text default 'FL',
  available_spaces int default 1,
  price_per_day decimal(10,2),
  price_per_month decimal(10,2),
  power_available boolean default false,
  water_available boolean default false,
  is_active boolean default true,
  is_approved boolean default false,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- JOB LISTINGS
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  poster_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  job_type text check (job_type in ('full_time','part_time','gig','seasonal')),
  description text,
  city text,
  state text default 'FL',
  pay_rate decimal(10,2),
  pay_type text check (pay_type in ('hourly','salary','per_event')),
  requirements text,
  is_active boolean default true,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- BOOKING REQUESTS
create table public.requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id) on delete cascade,
  truck_id uuid references public.trucks(id) on delete set null,
  venue_id uuid references public.venues(id) on delete set null,
  property_id uuid references public.properties(id) on delete set null,
  request_type text not null check (request_type in ('truck_booking','venue_booking','property_rental','job_inquiry')),
  status text default 'pending' check (status in ('pending','accepted','declined','cancelled','completed')),
  event_name text,
  event_date date,
  start_time time,
  end_time time,
  guest_count int,
  location text,
  city text,
  notes text,
  budget decimal(10,2),
  quoted_price decimal(10,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- MESSAGES
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.requests(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete cascade,
  recipient_id uuid references public.profiles(id) on delete cascade,
  body text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- REVIEWS
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid references public.profiles(id) on delete cascade,
  truck_id uuid references public.trucks(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  request_id uuid references public.requests(id) on delete set null,
  rating int check (rating between 1 and 5),
  body text,
  created_at timestamptz default now()
);

-- NOTIFICATIONS
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null,
  title text,
  body text,
  is_read boolean default false,
  link text,
  created_at timestamptz default now()
);

-- WAITLIST (from your existing Formspree signups)
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text,
  business_name text,
  city text,
  source text default 'landing',
  converted boolean default false,
  created_at timestamptz default now()
);

-- AUTO-UPDATE updated_at ON ALL TABLES
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at before update on public.profiles for each row execute function public.handle_updated_at();
create trigger handle_updated_at before update on public.trucks for each row execute function public.handle_updated_at();
create trigger handle_updated_at before update on public.venues for each row execute function public.handle_updated_at();
create trigger handle_updated_at before update on public.properties for each row execute function public.handle_updated_at();
create trigger handle_updated_at before update on public.jobs for each row execute function public.handle_updated_at();
create trigger handle_updated_at before update on public.requests for each row execute function public.handle_updated_at();

-- AUTO-CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'role', 'truck'));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();