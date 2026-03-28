// supabase-client.js
// Cloud Supabase credentials for production
// Auth configured for Brave mobile + other privacy-focused browsers

const SUPABASE_URL = 'https://krmfxedkxoyzkeqnijcd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vsvnMZz41fPzbybrFrpfuw_THC64Lbq';

// Load Supabase from CDN
const supabaseScript = document.createElement('script');
supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
supabaseScript.onload = () => {
  window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      detectSessionInUrl: true,      // Extract session from URL hash (#access_token=...)
      persistSession: true,           // Save session to storage when available
      autoRefreshToken: true,         // Automatically refresh expiring tokens
      storage: window.localStorage,   // Fallback to localStorage (Brave allows JS access)
      storageKey: 'sw-auth-token',    // Custom storage key
      flowType: 'implicit'            // Use implicit flow for browser auth (no backend needed)
    }
  });
  document.dispatchEvent(new Event('supabase-ready'));
};
document.head.appendChild(supabaseScript);