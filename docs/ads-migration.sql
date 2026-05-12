-- ============================================================
-- ServiceWindow Ads Table Migration
-- OI-005: Advertiser placement system
-- Run in Supabase SQL Editor BEFORE deploying ad UI changes
-- Date: 2026-05-12
-- ============================================================

-- 1. Create ads table
CREATE TABLE IF NOT EXISTS ads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  advertiser_id   uuid REFERENCES profiles(id) ON DELETE CASCADE,
  ad_type         text NOT NULL CHECK (ad_type IN ('service_provider', 'property')),
  headline        text NOT NULL,
  body            text,
  cta_label       text NOT NULL DEFAULT 'Learn More',
  cta_url         text,
  contact_phone   text,
  contact_email   text,
  status          text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'active', 'paused', 'rejected')),
  admin_notes     text,
  reviewed_by     uuid REFERENCES profiles(id),
  reviewed_at     timestamptz,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- Advertisers can read and manage their own ads
CREATE POLICY "ads_select_own"
  ON ads FOR SELECT
  USING (auth.uid() = advertiser_id);

-- Trucks can see active ads (for display in truck-dashboard)
CREATE POLICY "ads_select_active"
  ON ads FOR SELECT
  USING (status = 'active');

-- Advertisers can insert their own ads
CREATE POLICY "ads_insert_own"
  ON ads FOR INSERT
  WITH CHECK (auth.uid() = advertiser_id);

-- Advertisers can update their own pending or paused ads
CREATE POLICY "ads_update_own"
  ON ads FOR UPDATE
  USING (auth.uid() = advertiser_id AND status IN ('pending', 'paused'))
  WITH CHECK (auth.uid() = advertiser_id);

-- Admins can do everything
CREATE POLICY "ads_admin_all"
  ON ads FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
