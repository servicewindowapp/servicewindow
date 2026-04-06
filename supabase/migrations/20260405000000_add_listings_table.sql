-- ============================================================
-- Marketplace Listings Table
-- Supports event postings (organizers), parking/storage listings
-- (property owners), and job postings (truck operators)
-- ============================================================

create table if not exists "public"."listings" (
  "id"           uuid        not null default gen_random_uuid(),
  "poster_id"    uuid        not null references profiles(id) on delete cascade,
  "board"        text        not null,
  -- 'event' (organizer), 'parking' (property), 'jobs' (truck)
  "title"        text        not null,
  "event_date"   date,
  "location"     text,
  "city"         text,
  "budget_range" text,
  "description"  text,
  "status"       text        not null default 'active',
  -- 'active' | 'paused' | 'expired' | 'completed'
  "created_at"   timestamptz not null default now(),
  "updated_at"   timestamptz not null default now()
);

alter table "public"."listings" enable row level security;

-- Posters can read their own listings
create policy "listings_select_own" on "public"."listings"
  for select using (auth.uid() = poster_id);

-- Any authenticated user can read active listings
create policy "listings_select_active" on "public"."listings"
  for select using (status = 'active');

-- Posters can insert their own listings
create policy "listings_insert_own" on "public"."listings"
  for insert with check (auth.uid() = poster_id);

-- Posters can update (pause/edit) their own listings
create policy "listings_update_own" on "public"."listings"
  for update using (auth.uid() = poster_id);

-- Admins have full access
create policy "listings_admin_all" on "public"."listings"
  for all using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Index for fast active-listing queries
create index if not exists "listings_status_idx" on "public"."listings" (status);
create index if not exists "listings_poster_idx" on "public"."listings" (poster_id);
create index if not exists "listings_board_idx" on "public"."listings" (board);

-- Auto-update updated_at on row change
create or replace function update_listings_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger listings_updated_at
  before update on "public"."listings"
  for each row execute function update_listings_updated_at();
