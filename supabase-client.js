// ServiceWindow — Supabase Client
// Project: krmfxedkxoyzkeqnijcd
// NOTE: Replace SUPABASE_ANON_KEY with your actual anon key from:
// https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd/settings/api

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://krmfxedkxoyzkeqnijcd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybWZ4ZWRreG95emtlcW5pamNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjg1NDMsImV4cCI6MjA4OTk0NDU0M30._oSoUIyo5vhdYCtQtgZYfbRBHvf1bNisdSJ4yxiE3yo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Role → Dashboard map
export const DASHBOARD_MAP = {
  truck: 'truck-dashboard.html',
  venue: 'venue-dashboard.html',
  organizer: 'planner-dashboard.html',
  property: 'property-dashboard.html',
  service_provider: 'service-provider-dashboard.html',
  job_seeker: 'jobs-dashboard.html',
  admin: 'admin-dashboard.html'
}

// Redirect after login based on role
export async function redirectAfterLogin() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    window.location.href = 'auth.html'
    return
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_verified')
    .eq('id', user.id)
    .single()

  window.location.href = DASHBOARD_MAP[profile?.role] || 'index.html'
}

// Guard: redirect to auth if not logged in
export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = 'auth.html?mode=login'
    return null
  }
  return session
}
