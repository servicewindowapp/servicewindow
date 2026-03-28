-- Create shift_posts table for Shift Marketplace
CREATE TABLE IF NOT EXISTS public.shift_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  posted_by uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_name text NOT NULL,
  event_date date NOT NULL,
  time_slot text NOT NULL,
  location_city text NOT NULL,
  location_address text,
  cuisine_type text,
  reason text,
  badge_requirements text[],
  notes text,
  contact_phone text,
  contact_email text,
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.shift_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Trucks can insert own shift posts" ON public.shift_posts
  FOR INSERT WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "All authenticated users can view open shift posts" ON public.shift_posts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Trucks can update own shift posts" ON public.shift_posts
  FOR UPDATE USING (auth.uid() = posted_by);

CREATE INDEX idx_shift_posts_date ON public.shift_posts(event_date);
CREATE INDEX idx_shift_posts_city ON public.shift_posts(location_city);
CREATE INDEX idx_shift_posts_status ON public.shift_posts(status);
