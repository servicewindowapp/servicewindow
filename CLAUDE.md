# ServiceWindow — Claude Code SYSTEM PROMPT

## Working Directory
- **Windows path**: `C:\Users\wesfi\OneDrive\Desktop\Food Truck App`
- **CRITICAL**: Always use this path. Always quote it — spaces will break commands.
- `cd "C:\Users\wesfi\OneDrive\Desktop\Food Truck App"`

## Project Identity
ServiceWindow (servicewindow.app) — verified two-sided food truck marketplace 
for Southwest Florida. GitHub Pages hosted. Cloudflare DNS. Static HTML/CSS/JS 
only — no backend, no build system, no package.json.

## Repo Structure

### Root (deployed by GitHub Pages / Cloudflare Pages — do NOT move HTML files)
- `*.html` — all 27 active pages served from root
- `CNAME` — servicewindow.app
- `wrangler.jsonc` — Cloudflare Pages config (assets.directory = ".")
- `CLAUDE.md` — this file
- `.env` — local secrets (gitignored)

### assets/
- `assets/js/supabase-client.js` — Supabase auth client (referenced in all HTML pages)
- `assets/js/avatar-upload.js` — avatar upload handler (referenced in 6 dashboard pages)
- `assets/logos/` — all logo variants (logo-final.png, logo-final-nav.png, logo-transparent.png, etc.)
- `assets/images/` — reference/stock images (not directly referenced in deployed HTML)

### supabase/
- `supabase/functions/` — Edge Functions (Stripe, Resend, R2, notifications)
- `supabase/migrations/` — versioned schema migrations
- `supabase/snippets/` — ad-hoc SQL queries (dev use only)
- `supabase/config.toml` — project config

### database/
- `database/schema.sql` — full schema snapshot
- `database/RESEND_EMAIL_TRIGGERS.sql` — email trigger definitions

### workers/
- `workers/r2-upload-worker.js` — Cloudflare R2 upload worker

### docs/
- `docs/README.md` — project readme
- `docs/STRIPE_SETUP.md` — Stripe integration notes

### Market Research/
- Daily automated scrape reports (market-research-YYYY-MM-DD.txt)

### _archive/
- Old drafts and prior landing page versions (not deployed)

## Design System (locked — never deviate)
Fonts: Sora (headings), Lora (body/accent), DM Mono (labels/data)
CSS Variables:
  --fire: #FF6B35
  --navy: #0D1B2A
  --smoke: #F5F0EB
  --charcoal: #2C3E50
  --white: #FFFFFF
Logo: SVG embedded as base64 data URI — trailer silhouette into wordmark
Reference: index.html (extract logo and design tokens from this file)

## Platform Architecture
Two authenticated dashboards + Admin. Everything else is public.

### Side A — Truck Dashboard (supply)
- Food truck operators only
- Manage profile, receive/respond to booking requests
- Post job listings (folded in — no separate jobs dashboard)
- Browse advertiser placements (service providers, parking/storage owners)
- Notifications, messages, booking history

### Side B — Requester Dashboard (demand)
- Unified dashboard for: event planners, venues, property/storage owners
- Role-based tabs show/hide based on what the user does
- Event Planners tab: post events, browse/book trucks, manage bookings
- Venues tab: list venue, set availability, receive truck inquiries
- Property/Storage tab: list parking/storage, set pricing, manage rentals
- Advertisers (service providers + property owners): ad management section lives here

### Admin Dashboard
- Verification approvals, user management, platform metrics — keep as-is

### Dashboard Consolidation (active — Week 1 of launch sprint)
Pages being merged into requester-dashboard.html:
  planner-dashboard.html, venue-dashboard.html, property-dashboard.html,
  service-provider-dashboard.html
Pages being absorbed into truck-dashboard.html:
  jobs-dashboard.html, post-job.html
Old files move to _archive/ — do not delete.

### Auth Routing
- Truck operators → truck-dashboard.html
- All other roles (planner, venue, property, service provider) → requester-dashboard.html

### Pricing (locked)
  Food Trucks:              $49/mo  | Founding $29/lifetime
  Service Providers (ads):  $19/mo
  Property/Storage (ads):   $19/mo
  Event Planners:           Free forever
  Venues:                   Free forever
  30-day free trial for food trucks on signup

## File Writing Protocol (follow exactly — prevents timeouts)
Large files (200+ lines) must be built in sections using str_replace/Edit, 
not written in a single Write tool call.

Order of operations for any new HTML file:
  1. Create the file with just the scaffold: DOCTYPE, head stub, empty body 
     with section comment markers
  2. Fill head + CSS in one Edit call
  3. Fill header/nav in one Edit call
  4. Fill each major content section in separate Edit calls
  5. Fill JavaScript last in one Edit call
  6. Run: wc -l filename.html — confirm line count before moving to next file

Never batch two large file builds in the same response. Finish one, 
confirm it exists on disk, then start the next.

## Execution Rules
1. Read the full target file before touching it.
2. One file at a time. Confirm existence on disk before starting the next.
3. Never break existing functionality. Flag risks in one sentence before acting.
4. Preserve Formspree wiring (endpoint: mbdzyold) on all forms.
5. SVG logos stay embedded as base64 data URIs — no external file refs.
6. Self-contained HTML output only — no external deps except Google Fonts CDN.
7. Mobile-first. Mental model: 375px then desktop.
8. No placeholder content. No Lorem Ipsum. Real ServiceWindow copy only.

## Git Protocol
After completing all files in a session:
  git add -A
  git commit -m "[task description]"
  git push origin main
Do not commit after every single file — batch at end of session.

## Communication Rules
- No preamble. No summaries of what you're about to do.
- Flag breaking risks in one sentence before acting.
- No approval requests between steps.
- If there's a better approach, state it in one sentence and give me both.
- After each file is confirmed on disk, say: "[filename] done — [line count] lines"
  then proceed to the next task.

## Current Status — April 4, 2026
30-day launch sprint to May 4, 2026. Week 1 is architecture consolidation.

### What's Built and Functional
- 27 HTML pages deployed at servicewindow.app
- Supabase: auth, profiles, trucks, venues, properties, requests, messages,
  notifications, reviews, jobs, waitlist, verification_requests, shift_posts
- 6 Edge Functions: Stripe checkout/portal/webhook, R2 upload,
  shift-post notifications, email notifications
- Stripe wired (checkout + customer portal)
- Resend email triggers active
- Auth verified across Chrome, Brave, Firefox, Safari (including mobile)
- Dark theme applied across all dashboards
- 4 SEO landing pages: fort-myers, cape-coral, catering, events
- Google Search Console + Bing Webmaster verified
- sitemap.xml and robots.txt deployed
- Daily automated market research scraping 3 SWFL Facebook groups
- 134 leads captured: 53 food trucks, 30 venues, 21 requesters,
  13 service providers, 17 festivals/events

### Active Sprint — Week 1 (Apr 4–10): Architecture Consolidation
- [ ] Build requester-dashboard.html (planner + venue + property + advertiser tabs)
- [ ] Refactor truck-dashboard.html (add job posting section + ad display area)
- [ ] Update auth.html routing: truck → truck-dashboard, all else → requester-dashboard
- [ ] Update Supabase role logic if needed (keep granular roles in DB, route to 2 dashboards)
- [ ] Archive old dashboard files (planner, venue, property, service-provider, jobs dashboards)

### Week 2 (Apr 11–17): Core Flow Polish
- [ ] End-to-end test: signup → verify → dashboard → post → book → message → complete
- [ ] Analytics (Plausible or Cloudflare Web Analytics — no Google Analytics)
- [ ] Error tracking (Sentry free tier or Supabase error logging)
- [ ] Advertiser placement system (service provider + property ads visible in truck dashboard)
- [ ] Wire ad payment tier in Stripe ($19/mo)

### Week 3 (Apr 18–24): Supply Seeding & Outreach
- [ ] Personal outreach to top 20 leads (Nicole Evans, The Pearl, RAD Winery, Kevin Rueda, etc.)
- [ ] Email drip templates for remaining 114 leads
- [ ] Submit sitemap, request indexing for all 4 SEO pages in Search Console
- [ ] Directory submissions: Yelp, Alignable, Fort Myers Chamber, Cape Coral Chamber
- [ ] 3–5 testimonials or early user logos for landing page

### Week 4 (Apr 25–May 1): Launch Hardening
- [ ] Stress test auth on all mobile browsers
- [ ] Tighten all RLS policies
- [ ] Cloudflare cache rules + performance tuning
- [ ] Naples and Bonita Springs SEO landing pages
- [ ] Press outreach: News-Press, Gulfshore Business
- [ ] Soft launch announcement in the 3 Facebook groups being scraped

### SEO Status (as of March 31 2026)
Google Search Console verified. Bing Webmaster verified via msvalidate.01 on index.html.
sitemap.xml and robots.txt live at repo root.

SEO pages built (canonical, OG tags, FAQPage schema, dark theme, internal links):
- fort-myers-food-trucks.html — "food trucks Fort Myers FL"
- cape-coral-food-trucks.html — "food trucks Cape Coral FL"
- swfl-food-truck-catering.html — "food truck catering Fort Myers / SWFL"
- food-truck-events-fort-myers.html — "food truck events Fort Myers"

OG tags on: find-trucks.html, marketplace.html, all 4 SEO pages.
ItemList schema enriched on find-trucks.html and marketplace.html.

SEO backlog:
- Directory submissions: Yelp, Alignable, Fort Myers Chamber, Cape Coral Chamber, Lee County EDC
- Press outreach: News-Press, Gulfshore Business
- Future pages: naples-food-trucks.html, bonita-springs-food-trucks.html

---

## Launch Region — Region 1 (Southwest Florida)
ServiceWindow launches in Region 1 only. After successful adoption,
the region model repeats in other high food-truck-density markets.

### Region 1 Cities (21 total):
Cape Coral, Fort Myers, Lehigh Acres, Bonita Springs, North Fort Myers,
Estero, Sanibel, Fort Myers Beach, Naples, Immokalee, Marco Island,
Golden Gate, Lely Resort, Ave Maria, Naples Manor, Naples Park,
Sarasota, Punta Gorda, Port Charlotte, Englewood, LaBelle

### Counties covered:
Lee | Collier | Sarasota | Charlotte | Hendry

### Copy guidelines for city/region references:
- Short form: "SWFL" or "Southwest Florida"
- City stat: 21 cities
- Footer tagline: "Fort Myers · Cape Coral · Naples · Sarasota and beyond."
- Service area description: "Lee, Collier, Sarasota, Charlotte, and Hendry counties"
- Never say "16 cities" — that is outdated. Always use 21.
- Expansion strategy: region model — SWFL first, then repeat in other markets

---

## Known Issues & Browser Fixes

### Brave Mobile Auth
Brave browser on mobile blocks localStorage and cookies aggressively. The auth system handles this with:
- **supabase-client.js**: Initialized with `detectSessionInUrl: true`, `persistSession: true`, `flowType: 'implicit'`
- **auth.html**: Uses `getSession()` + 800ms delay before redirect to ensure session is persisted
- **Dashboard guards**: Try `getSession()` first (Chrome), then fall back to `onAuthStateChange` listener (Brave extracts session from URL hash), with 5-second hard timeout
- **Do not change** these settings — they ensure auth works across Chrome, Brave, Firefox, and Safari mobile