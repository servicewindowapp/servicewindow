-- SEED DEMO DATA FOR SERVICEWINDOW
-- Creates realistic SW Florida data for all user types

-- DEMO USERS (these mirror auth users we'll create next)
insert into public.profiles (id, role, full_name, business_name, email, phone, city, state, bio, subscription_tier, subscription_status, is_verified, is_active) values
  ('a1000000-0000-0000-0000-000000000001', 'truck', 'Marcus Rivera', 'Fuego Latin Grill', 'marcus@fuegogrill.com', '239-555-0101', 'Cape Coral', 'FL', 'Authentic Latin street food serving SW Florida since 2019. Tacos, arepas, and elotes.', 'pro', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000002', 'truck', 'Dana Kowalski', 'Gulf Coast Smash Burgers', 'dana@gulfcoastsmash.com', '239-555-0102', 'Fort Myers', 'FL', 'Smash burgers, loaded fries, and craft shakes. Available for events 50-500 guests.', 'pro', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000003', 'truck', 'Priya Nair', 'Spice Route', 'priya@spiceroute.com', '239-555-0103', 'Naples', 'FL', 'Modern Indian street food. Butter chicken wraps, samosa chaat, mango lassi.', 'starter', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000004', 'venue', 'Tom Harrington', 'Harrington Event Barn', 'tom@harringtonbarn.com', '239-555-0201', 'Cape Coral', 'FL', 'Rustic 5-acre venue with covered pavilion. Perfect for weddings, corporate events, festivals.', 'pro', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000005', 'venue', 'Sandra Mejia', 'Riverside Plaza Events', 'sandra@riversideplaza.com', '239-555-0202', 'Fort Myers', 'FL', 'Downtown riverfront event space. 200 person capacity with full AV and catering hookups.', 'pro', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000006', 'planner', 'Jessica Walsh', 'Walsh Events Co.', 'jessica@walshevents.com', '239-555-0301', 'Naples', 'FL', 'Full-service event planning for corporate, weddings, and private events across SW Florida.', 'pro', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000007', 'planner', 'Derek Odom', 'Odom Corporate Events', 'derek@odomevents.com', '239-555-0302', 'Cape Coral', 'FL', 'Specializing in corporate retreats, team events, and trade show catering coordination.', 'starter', 'active', false, true),
  ('a1000000-0000-0000-0000-000000000008', 'property', 'Bill Tran', 'Tran Properties LLC', 'bill@tranproperties.com', '239-555-0401', 'Fort Myers', 'FL', 'Commercial parking and lot rental for food truck operators. Multiple locations available.', 'starter', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000009', 'service_provider', 'Angela Cruz', 'Cruz Mobile Generator Rental', 'angela@cruzgenerators.com', '239-555-0501', 'Cape Coral', 'FL', 'Generator rental, power hookup, and electrical support for food trucks and outdoor events.', 'starter', 'active', true, true),
  ('a1000000-0000-0000-0000-000000000010', 'job_seeker', 'Ryan Moss', NULL, 'ryan@email.com', '239-555-0601', 'Fort Myers', 'FL', 'Experienced line cook and food truck operator assistant. Available weekends and evenings.', 'free', 'inactive', false, true);

-- TRUCKS
insert into public.trucks (id, owner_id, name, cuisine_type, description, service_radius_miles, min_booking_hours, price_per_hour, flat_event_rate, serves_per_hour, max_capacity, cities_served, is_active, is_approved, rating, review_count, total_bookings) values
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Fuego Latin Grill', 'Latin / Mexican', 'Authentic tacos, arepas, elotes, and agua frescas. Full setup in 20 minutes.', 30, 2, 150.00, 800.00, 80, 300, array['Cape Coral','Fort Myers','Naples','Bonita Springs'], true, true, 4.9, 47, 83),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'Gulf Coast Smash Burgers', 'American', 'Smash burgers, loaded fries, craft shakes. Generator self-sufficient.', 25, 3, 175.00, 950.00, 60, 250, array['Fort Myers','Cape Coral','Lehigh Acres'], true, true, 4.7, 31, 54),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 'Spice Route', 'Indian', 'Modern Indian street food. Butter chicken wraps, samosa chaat, mango lassi.', 20, 2, 125.00, 700.00, 70, 200, array['Naples','Marco Island','Bonita Springs'], true, true, 4.8, 22, 38);

-- VENUES
insert into public.venues (id, owner_id, name, venue_type, description, address, city, capacity, parking_spaces, power_available, water_available, price_per_event, is_active, is_approved, rating, review_count) values
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', 'Harrington Event Barn', 'outdoor', 'Rustic 5-acre venue with covered pavilion, string lights, and full catering hookups.', '4821 Pine Island Rd', 'Cape Coral', 400, 120, true, true, 1200.00, true, true, 4.8, 19),
  ('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000005', 'Riverside Plaza Events', 'indoor_outdoor', 'Downtown riverfront space with covered deck, AV system, and bar setup.', '2200 First St', 'Fort Myers', 200, 60, true, true, 900.00, true, true, 4.6, 14);

-- PROPERTIES
insert into public.properties (id, owner_id, name, property_type, description, address, city, available_spaces, price_per_day, price_per_month, power_available, water_available, is_active, is_approved) values
  ('d1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000008', 'Colonial Blvd Lot B', 'parking_lot', 'High-traffic commercial lot near Home Depot. Consistent lunch and dinner foot traffic.', '3200 Colonial Blvd', 'Fort Myers', 3, 45.00, 900.00, true, false, true, true),
  ('d1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000008', 'Cape Coral Business Park', 'commercial', 'Office park with 800 employees. Ideal for weekday lunch service.', '1100 SE 47th Ter', 'Cape Coral', 2, 40.00, 800.00, true, true, true, true);

-- JOBS
insert into public.jobs (id, poster_id, title, job_type, description, city, pay_rate, pay_type, requirements, is_active) values
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Weekend Food Truck Assistant', 'part_time', 'Help with prep, service window, and cleanup at events. Must be reliable and fast.', 'Cape Coral', 15.00, 'hourly', 'Food handler cert preferred. Weekend availability required.', true),
  ('e1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'Event Day Cook', 'gig', 'Experienced cook needed for high-volume burger events. 6-8 hour shifts.', 'Fort Myers', 18.00, 'hourly', 'Minimum 1 year grill experience. Own transportation required.', true),
  ('e1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000006', 'Event Coordinator Assistant', 'full_time', 'Support lead planners on corporate and wedding events. Scheduling, vendor coordination, day-of logistics.', 'Naples', 42000.00, 'salary', 'Event planning experience preferred. Strong organizational skills. Valid FL drivers license.', true);

-- BOOKING REQUESTS
insert into public.requests (id, requester_id, truck_id, request_type, status, event_name, event_date, start_time, end_time, guest_count, location, city, notes, budget) values
  ('f1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000001', 'truck_booking', 'pending', 'Walsh Corporate Luncheon', '2026-04-15', '11:00', '14:00', 120, 'Pelican Bay Office Park', 'Naples', 'Need full taco setup. Client is Fortune 500, presentation matters.', 600.00),
  ('f1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000002', 'truck_booking', 'accepted', 'Odom Team Appreciation Day', '2026-04-22', '12:00', '15:00', 85, 'Cape Coral Tech Campus', 'Cape Coral', 'Burgers and shakes for the whole team. Setup by 11:30.', 750.00),
  ('f1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000003', 'truck_booking', 'completed', 'Spring Festival Food Court', '2026-03-01', '10:00', '18:00', 400, 'Harrington Event Barn', 'Cape Coral', 'Full day festival slot. Went great.', 1200.00);

-- MESSAGES
insert into public.messages (request_id, sender_id, recipient_id, body, is_read, created_at) values
  ('f1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000001', 'Hi Marcus — we have a corporate luncheon April 15th, 120 guests. Can you do full taco setup at Pelican Bay?', true, now() - interval '2 days'),
  ('f1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000006', 'Absolutely, that date works. I can do full setup by 10:45. My flat rate for 120 guests is $750. Want to lock it in?', false, now() - interval '1 day'),
  ('f1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000002', 'Dana, confirmed for April 22nd. Please plan for 85 people, setup by 11:30.', true, now() - interval '3 days'),
  ('f1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000007', 'Confirmed. See you April 22nd. I will bring extra shake mix just in case.', true, now() - interval '2 days');

-- WAITLIST
insert into public.waitlist (email, role, business_name, city, source) values
  ('john@naplesbbq.com', 'truck', 'Naples BBQ Co', 'Naples', 'landing'),
  ('events@suncoastcatering.com', 'planner', 'Suncoast Catering', 'Fort Myers', 'landing'),
  ('info@islandtacos.com', 'truck', 'Island Tacos', 'Marco Island', 'landing'),
  ('hello@capecoralbrew.com', 'venue', 'Cape Coral Brewing', 'Cape Coral', 'landing'),
  ('manager@ftmyersfair.com', 'venue', 'Fort Myers Fairgrounds', 'Fort Myers', 'landing');