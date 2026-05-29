-- ============================================================
-- Delete all test truck accounts
-- Run in: Supabase SQL Editor
-- https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/sql
-- 16 profiles: 2 named test trucks + 14 E2E Taco Truck accounts
-- ============================================================

-- Step 1: Delete any listings posted by test accounts
DELETE FROM public.listings
WHERE poster_id IN (
  SELECT id FROM public.profiles
  WHERE email LIKE '%test%@servicewindow.app'
);

-- Step 2: Delete profiles (must go before auth.users)
DELETE FROM public.profiles
WHERE email LIKE '%test%@servicewindow.app';

-- Step 3: Delete auth users
DELETE FROM auth.users
WHERE email LIKE '%test%@servicewindow.app';

-- Verify: should return 0
SELECT COUNT(*) AS remaining_test_accounts
FROM public.profiles
WHERE email LIKE '%test%@servicewindow.app';
