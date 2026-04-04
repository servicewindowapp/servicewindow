-- ============================================================
-- Error Logging
-- Captures unhandled JS errors from dashboards.
-- Written by the client via supabase anon key.
-- Viewable in admin dashboard.
-- ============================================================

create table if not exists "public"."error_logs" (
  "id"         uuid        not null default gen_random_uuid(),
  "user_id"    uuid        references profiles(id) on delete set null,
  "page"       text,
  "message"    text        not null,
  "stack"      text,
  "user_agent" text,
  "created_at" timestamptz not null default now()
);

alter table "public"."error_logs" enable row level security;

-- Any authenticated user can insert their own errors
create policy "error_logs_insert" on "public"."error_logs"
  for insert with check (auth.uid() = user_id or user_id is null);

-- Only admins can read error logs
create policy "error_logs_admin_read" on "public"."error_logs"
  for select using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Index for admin queries
create index if not exists "error_logs_created_idx" on "public"."error_logs" (created_at desc);
create index if not exists "error_logs_user_idx"    on "public"."error_logs" (user_id);
