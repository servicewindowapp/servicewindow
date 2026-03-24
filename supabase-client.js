// supabase-client.js
// Cloud Supabase credentials for production

const SUPABASE_URL = 'https://krmfxedkxoyzkeqnijcd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_vsvnMZz41fPzbybrFrpfuw_THC64Lbq';

// Load Supabase from CDN
const supabaseScript = document.createElement('script');
supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
supabaseScript.onload = () => {
  window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  document.dispatchEvent(new Event('supabase-ready'));
};
document.head.appendChild(supabaseScript);