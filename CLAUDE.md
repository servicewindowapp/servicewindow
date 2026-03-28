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
- index.html — landing page, Formspree waitlist (endpoint: mbdzyold)
- marketplace.html — public marketplace interactive demo
- truck-dashboard.html — food truck operator dashboard interactive demo
- CNAME — servicewindow.app

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
7 Boards: Request Marketplace, Event Calendar, Shift Marketplace, 
Venue Partnership, Parking & Real Estate, Vendor Services, Jobs Board
User types: Food Trucks, Event Planners, Venues, Property Owners, 
Service Providers, Job Seekers
Pricing (locked):
  Standard $49/mo | Founding $29/life
  Pro $79/mo | Founding $49/life
  Service Providers $39/mo
  Planners, Venues, Job Seekers: Free forever

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

## Current Status
All pages and dashboards live at servicewindow.app.
Auth, Supabase, Stripe, Resend all wired and functional.
Dark theme uniformity pass complete across all dashboards.
shift_posts table + notify-shift-post Edge Function deployed.
post-job.html built. Services dashboard rebranded.

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