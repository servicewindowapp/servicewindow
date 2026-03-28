-- ENABLE RLS ON ALL TABLES
alter table public.profiles enable row level security;
alter table public.trucks enable row level security;
alter table public.venues enable row level security;
alter table public.properties enable row level security;
alter table public.jobs enable row level security;
alter table public.requests enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;
alter table public.waitlist enable row level security;

-- PROFILES
create policy "Users can view any profile" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- TRUCKS
create policy "Anyone can view active approved trucks" on public.trucks
  for select using (is_active = true and is_approved = true);

create policy "Owners can view their own trucks" on public.trucks
  for select using (auth.uid() = owner_id);

create policy "Owners can insert their own trucks" on public.trucks
  for insert with check (auth.uid() = owner_id);

create policy "Owners can update their own trucks" on public.trucks
  for update using (auth.uid() = owner_id);

create policy "Owners can delete their own trucks" on public.trucks
  for delete using (auth.uid() = owner_id);

-- VENUES
create policy "Anyone can view active approved venues" on public.venues
  for select using (is_active = true and is_approved = true);

create policy "Owners can view their own venues" on public.venues
  for select using (auth.uid() = owner_id);

create policy "Owners can insert their own venues" on public.venues
  for insert with check (auth.uid() = owner_id);

create policy "Owners can update their own venues" on public.venues
  for update using (auth.uid() = owner_id);

create policy "Owners can delete their own venues" on public.venues
  for delete using (auth.uid() = owner_id);

-- PROPERTIES
create policy "Anyone can view active approved properties" on public.properties
  for select using (is_active = true and is_approved = true);

create policy "Owners can view their own properties" on public.properties
  for select using (auth.uid() = owner_id);

create policy "Owners can insert their own properties" on public.properties
  for insert with check (auth.uid() = owner_id);

create policy "Owners can update their own properties" on public.properties
  for update using (auth.uid() = owner_id);

-- JOBS
create policy "Anyone can view active jobs" on public.jobs
  for select using (is_active = true);

create policy "Posters can manage their own jobs" on public.jobs
  for all using (auth.uid() = poster_id);

-- REQUESTS
create policy "Parties can view their own requests" on public.requests
  for select using (
    auth.uid() = requester_id or
    auth.uid() = (select owner_id from public.trucks where id = truck_id) or
    auth.uid() = (select owner_id from public.venues where id = venue_id) or
    auth.uid() = (select owner_id from public.properties where id = property_id)
  );

create policy "Authenticated users can create requests" on public.requests
  for insert with check (auth.uid() = requester_id);

create policy "Parties can update their own requests" on public.requests
  for update using (
    auth.uid() = requester_id or
    auth.uid() = (select owner_id from public.trucks where id = truck_id) or
    auth.uid() = (select owner_id from public.venues where id = venue_id)
  );

-- MESSAGES
create policy "Participants can view their messages" on public.messages
  for select using (
    auth.uid() = sender_id or auth.uid() = recipient_id
  );

create policy "Authenticated users can send messages" on public.messages
  for insert with check (auth.uid() = sender_id);

create policy "Recipients can mark messages read" on public.messages
  for update using (auth.uid() = recipient_id);

-- REVIEWS
create policy "Anyone can view reviews" on public.reviews
  for select using (true);

create policy "Authenticated users can write reviews" on public.reviews
  for insert with check (auth.uid() = reviewer_id);

-- NOTIFICATIONS
create policy "Users can view own notifications" on public.notifications
  for select using (auth.uid() = user_id);

create policy "Users can update own notifications" on public.notifications
  for update using (auth.uid() = user_id);

-- WAITLIST (open insert, no auth required)
create policy "Anyone can join waitlist" on public.waitlist
  for insert with check (true);

create policy "Admins can view waitlist" on public.waitlist
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );