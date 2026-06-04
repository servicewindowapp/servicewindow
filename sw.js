// ServiceWindow Service Worker
// Cache version — bump this string to force cache refresh on next deploy
const CACHE_VERSION = 'sw-v2';

// Public pages and static assets to precache on install
// Dashboards are intentionally excluded — they load live authenticated data
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/marketplace.html',
  '/find-trucks.html',
  '/pricing.html',
  '/auth.html',
  '/about.html',
  '/contact.html',
  '/venues.html',
  '/jobs.html',
  '/vendor-services.html',
  '/list-your-truck.html',
  '/logo.webp',
  '/favicon.ico',
  '/supabase-client.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Pages that should always go to the network (authenticated/dynamic content)
const NETWORK_ONLY_PATTERNS = [
  /\/truck-dashboard/,
  /\/planner-dashboard/,
  /\/venue-dashboard/,
  /\/property-dashboard/,
  /\/service-provider-dashboard/,
  /\/jobs-dashboard/,
  /\/admin-dashboard/,
  /\/supabase\.co\//,   // all Supabase API calls
  /\/functions\//       // Edge Functions
];

// ── Install: precache public pages ─────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean up old caches ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for precached assets, network-first for everything else
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Always network-only for authenticated dashboards and API calls
  if (NETWORK_ONLY_PATTERNS.some(pattern => pattern.test(event.request.url))) {
    return; // let browser handle it normally
  }

  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Cache-first for same-origin requests
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          // Cache successful responses for HTML and static assets
          if (response.ok && (
            event.request.url.endsWith('.html') ||
            event.request.url.endsWith('.webp') ||
            event.request.url.endsWith('.png') ||
            event.request.url.endsWith('.ico') ||
            event.request.url.endsWith('.js') ||
            event.request.url.endsWith('.json')
          )) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          // Offline fallback — return cached index if available
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
    );
  }
});
