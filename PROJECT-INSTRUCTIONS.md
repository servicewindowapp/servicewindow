# ServiceWindow — Project Instructions

## What This Is
ServiceWindow (servicewindow.app) is a verified two-sided food truck marketplace for Southwest Florida. It connects food truck operators (supply) with event planners, venues, and property owners (demand). The platform launches in Region 1 (SWFL — 21 cities across Lee, Collier, Sarasota, Charlotte, and Hendry counties) before expanding to other high-density food truck markets.

---

## Architecture: Two Sides, Two Dashboards

The app has exactly two authenticated experiences. Everything else is public-facing.

### Side A — Truck Dashboard (Supply)
**Who:** Food truck operators.
**What they do:**
- Manage their truck profile (cuisine, service radius, pricing, photos, certifications)
- Receive and respond to booking requests from the demand side
- Post job listings ("We're hiring" — folded into the truck dashboard, not a separate board)
- Browse paid advertisements from service providers (commissary kitchens, wrap shops, POS vendors) and property/storage owners (parking spots, commissary space)
- View notifications, messages, and booking history

**Monetization:**
- Standard: $49/mo | Founding: $29/lifetime
- Pro: $79/mo | Founding: $49/lifetime
- 30-day free trial on signup

### Side B — Requester Dashboard (Demand)
**Who:** Event planners, venues, property owners — all in one unified dashboard with role-based tabs/sections that show or hide based on what the user does.
**What they do:**
- **Event Planners tab:** Post events, browse and book trucks, manage bookings
- **Venues tab:** List their venue, set availability, receive truck inquiries
- **Property/Storage tab:** List parking spots or storage, set pricing, manage rentals

**Monetization:**
- Event planners: Free forever
- Venues: Free forever
- Property/storage owners who want to advertise to trucks: small monthly fee (tracked in their dashboard section)

### Advertisers (Within Side A)
Service providers and property/storage owners can pay a monthly fee to place ads visible to truck operators inside the Truck Dashboard. This is a lightweight ad placement — not a full dashboard. Their ad management (create/edit/pause ads, view impressions) lives as a section within the Requester Dashboard.

**Ad pricing (to be finalized):**
- Service Providers: $39/mo
- Property/Storage Advertising: $19-29/mo (TBD based on market testing)

### Admin Dashboard
Stays as-is. One admin view for verification approvals, user management, and platform metrics.

---

## Verification Flow
Both sides go through verified signup:
1. User signs up via auth.html, selects their role (truck operator OR requester type)
2. Completes a verification request form (business name, org type, phone, website, description)
3. Admin reviews and approves/rejects via admin dashboard
4. Approved users get full dashboard access
5. Trucks on free trial get 30 days before paywall

---

## Current State (as of April 2026)

### What's Built and Working
- 27 HTML pages deployed at servicewindow.app (GitHub Pages + Cloudflare DNS)
- Supabase backend: auth, profiles, trucks, venues, properties, requests, messages, notifications, reviews, jobs, waitlist, verification_requests, shift_posts
- 6 Edge Functions: Stripe checkout/portal/webhook, R2 upload, shift post notifications, email notifications
- Stripe payments wired (checkout + customer portal)
- Resend email triggers
- Auth working across Chrome, Brave, Firefox, Safari (including mobile)
- Dark theme applied across all dashboards
- 4 SEO landing pages (Fort Myers, Cape Coral, catering, events)
- Google Search Console + Bing Webmaster verified
- sitemap.xml and robots.txt deployed
- Daily automated market research scraping 3 SWFL Facebook groups

### What Needs to Change
The current 6-dashboard structure (truck, planner, venue, property, service-provider, jobs) is being consolidated into 2 dashboards + admin. This is the primary architectural task.

**Pages to consolidate/retire:**
- `planner-dashboard.html` → merged into new `requester-dashboard.html`
- `venue-dashboard.html` → merged into new `requester-dashboard.html`
- `property-dashboard.html` → merged into new `requester-dashboard.html`
- `service-provider-dashboard.html` → ad management section in `requester-dashboard.html`
- `jobs-dashboard.html` → job posting folded into `truck-dashboard.html`
- `post-job.html` → absorbed into truck dashboard

**Pages to keep:**
- `truck-dashboard.html` — rebuild/refactor as the single supply-side dashboard
- `admin-dashboard.html` — keep as-is
- All public pages (index, marketplace, find-trucks, auth, pricing, about, contact, venues, property, jobs, SEO pages, privacy, terms, success, cancel, reset-password)

### Market Research Pipeline
- 134 leads captured: 53 food trucks, 30 venues, 21 truck requesters, 13 service providers, 17 festivals/events
- Data stored in `Market Research/data/` as JSON files
- Daily automated scrape generates reports in `Market Research/`
- Lead conversion strategy: hybrid (manual outreach for top 20, automated drip for the rest)

---

## Launch Plan — 30-Day Sprint to May 4, 2026

### Week 1 (Apr 4-10): Architecture Consolidation
- [ ] Design the new `requester-dashboard.html` with role-based tabs (planner, venue, property, advertiser)
- [ ] Refactor `truck-dashboard.html` to include job posting section and ad display area
- [ ] Update auth.html signup flow to map to two dashboard destinations (truck → truck-dashboard, everything else → requester-dashboard)
- [ ] Update Supabase role logic if needed (may keep granular roles in DB but route to 2 dashboards)
- [ ] Retire old dashboard files (archive, don't delete)

### Week 2 (Apr 11-17): Core Flow Polish
- [ ] End-to-end test: signup → verification → dashboard access → post listing → receive booking → message → complete
- [ ] Add analytics (Plausible or Cloudflare Web Analytics — no Google Analytics, keep it lightweight)
- [ ] Add error tracking (Sentry free tier or simple error logging to Supabase)
- [ ] Build the advertiser placement system (service providers + property owners → ads visible in truck dashboard)
- [ ] Wire ad payment tier in Stripe ($39/mo service providers, TBD property)

### Week 3 (Apr 18-24): Supply Seeding & Outreach
- [ ] Personally contact top 20 leads from market research (Nicole Evans, The Pearl, RAD Winery, Kevin Rueda, etc.)
- [ ] Build email drip templates for remaining 114 leads
- [ ] Submit sitemap to Google Search Console, request indexing for all pages
- [ ] Directory submissions: Yelp, Alignable, Fort Myers Chamber, Cape Coral Chamber
- [ ] Social proof: get 3-5 testimonials or early user logos for the landing page

### Week 4 (Apr 25-May 1): Launch Hardening
- [ ] Stress test auth flow on all mobile browsers
- [ ] Review and tighten all RLS policies
- [ ] Cloudflare cache rules + performance tuning
- [ ] SEO backlog: Naples and Bonita Springs landing pages
- [ ] Press outreach: News-Press, Gulfshore Business
- [ ] Soft launch announcement in the 3 Facebook groups being scraped

---

## Technical Standards

### Stack
- Frontend: Static HTML/CSS/JS — no framework, no build step, no package.json
- Hosting: GitHub Pages → Cloudflare DNS (servicewindow.app)
- Database: Supabase (PostgreSQL + Auth + Realtime + Edge Functions)
- Payments: Stripe (via Supabase Edge Functions)
- Email: Resend (via Supabase Edge Functions)
- File uploads: Cloudflare R2 (via worker)
- Forms: Formspree (endpoint: mbdzyold)

### Design System (locked — never deviate)
- Fonts: Sora (headings), Lora (body/accent), DM Mono (labels/data)
- Colors: --fire: #FF6B35, --navy: #0D1B2A, --smoke: #F5F0EB, --charcoal: #2C3E50, --white: #FFFFFF
- Dark theme across all dashboards
- Mobile-first (375px baseline, then desktop)
- SVG logos embedded as base64 data URIs
- Self-contained HTML — no external deps except Google Fonts CDN

### File Writing Protocol
Large files (200+ lines) must be built in sections using Edit, not a single Write call.
1. Create scaffold (DOCTYPE, head stub, empty body with section markers)
2. Fill head + CSS
3. Fill header/nav
4. Fill each content section separately
5. Fill JavaScript last
6. Confirm line count before moving to next file

### Git Protocol
- Single branch: main (direct commits, no PRs)
- Batch commits at end of session, not after every file
- Format: `git commit -m "[task description]"`
- Push to origin/main after commit batch

### Code Quality Rules
1. Read the full target file before editing
2. One file at a time — confirm on disk before starting next
3. Never break existing functionality
4. Preserve Formspree wiring on all forms
5. No placeholder content — real ServiceWindow copy only
6. No Lorem Ipsum ever

---

## Pricing (locked)

| Role | Standard | Founding (lifetime) |
|------|----------|-------------------|
| Food Trucks | $49/mo | $29/lifetime |
| Food Trucks Pro | $79/mo | $49/lifetime |
| Service Providers (ads) | $39/mo | — |
| Property/Storage (ads) | $19-29/mo (TBD) | — |
| Event Planners | Free | Free |
| Venues | Free | Free |

30-day free trial for trucks and service providers.

---

## Region 1 — Southwest Florida

### 21 Cities
Cape Coral, Fort Myers, Lehigh Acres, Bonita Springs, North Fort Myers, Estero, Sanibel, Fort Myers Beach, Naples, Immokalee, Marco Island, Golden Gate, Lely Resort, Ave Maria, Naples Manor, Naples Park, Sarasota, Punta Gorda, Port Charlotte, Englewood, LaBelle

### 5 Counties
Lee, Collier, Sarasota, Charlotte, Hendry

### Copy Rules
- Short form: "SWFL" or "Southwest Florida"
- City count: always 21 (never 16 — that's outdated)
- Footer: "Fort Myers · Cape Coral · Naples · Sarasota and beyond."
- Service area: "Lee, Collier, Sarasota, Charlotte, and Hendry counties"

---

## Success Metrics (Launch)
- 20 verified truck profiles within 30 days
- 10 verified requester accounts (planners + venues) within 30 days
- 5 completed bookings through the platform
- 3 paying advertisers (service providers or property owners)
- Google indexing all SEO pages
- Zero auth failures on mobile browsers

---

## What NOT to Build (Scope Control)
- No mobile app — responsive web only
- No real-time chat — async messaging is sufficient
- No map view yet — table/card listings only
- No multi-region support — SWFL only
- No payment processing between users — Stripe handles platform subscriptions only
- No AI features — manual matching and browsing
- No social features (likes, follows, feeds)
