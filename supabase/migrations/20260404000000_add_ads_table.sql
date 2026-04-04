-- ============================================================
-- Advertiser Placement System
-- Creates the ads table for service providers and property
-- owners to run paid placements in the Truck Dashboard.
-- Pricing: $19/mo (service_provider or property role)
-- ============================================================

create table if not exists "public"."ads" (
  "id"         uuid        not null default gen_random_uuid(),
  "poster_id"  uuid        not null references profiles(id) on delete cascade,
  "headline"   text        not null,
  "category"   text,
  "body"       text,
  "contact"    text,
  "status"     text        not null default 'active',
  -- 'active' | 'paused' | 'rejected'
  -- Starts as 'active' for soft launch. Add admin review gate post-launch.
  "impressions" integer    not null default 0,
  "created_at" timestamptz not null default now(),
  "updated_at" timestamptz not null default now()
);

alter table "public"."ads" enable row level security;

-- Advertisers can read their own ads (any status)
create policy "ads_select_own" on "public"."ads"
  for select using (auth.uid() = poster_id);

-- Any authenticated user can read active ads
-- (truck operators need this for the Service Ads panel)
create policy "ads_select_active" on "public"."ads"
  for select using (status = 'active');

-- Advertisers can insert their own ads
create policy "ads_insert_own" on "public"."ads"
  for insert with check (auth.uid() = poster_id);

-- Advertisers can update (pause/edit) their own ads
create policy "ads_update_own" on "public"."ads"
  for update using (auth.uid() = poster_id);

-- Admins have full access
create policy "ads_admin_all" on "public"."ads"
  for all using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Index for fast active-ad queries in the truck dashboard
create index if not exists "ads_status_idx" on "public"."ads" (status);
create index if not exists "ads_poster_idx" on "public"."ads" (poster_id);

-- Batch increment impressions (called by truck dashboard on panel load)
create or replace function increment_ad_impressions(ad_ids uuid[])
returns void language sql security definer as $$
  update "public"."ads"
  set impressions = impressions + 1
  where id = any(ad_ids) and status = 'active';
$$;

-- Auto-update updated_at on row change
create or replace function update_ads_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger ads_updated_at
  before update on "public"."ads"
  for each row execute function update_ads_updated_at();
