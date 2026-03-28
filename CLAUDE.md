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
Landing page: Live at servicewindow.app
Formspree: Active (mbdzyold) — verify email confirmation in dashboard
Demos: marketplace.html and truck-dashboard.html need to be built

## Session Task
## Session Task

The two demo files (marketplace.html, truck-dashboard.html) are built. 
Now execute a full quality pass to bring the entire app to production grade.

TARGET STANDARD: Feels like Facebook, DoorDash, or PayPal on mobile. 
Familiar, fast, frictionless. A phone user should open it and immediately 
know how to use it without reading anything.

PRIMARY DEVICE: Mobile phone. 375px is the design target. 
Desktop is secondary. Every decision optimizes for thumb navigation first.

---

## Phase 1 — Audit All Three Files First
Read index.html, marketplace.html, and truck-dashboard.html in full before 
touching anything. Document every inconsistency across the three files:
- Font usage mismatches
- Color token deviations
- Spacing inconsistencies
- Navigation patterns that differ between pages
- Anything that feels unfinished or placeholder
Report the full audit in a list, then begin Phase 2.

---

## Phase 2 — Navigation & Linking
- index.html CTA buttons link to marketplace.html and truck-dashboard.html
- Every page has a consistent top nav bar: logo left, hamburger menu right on mobile
- Hamburger opens a full-screen slide-in menu with links to all pages
- Active page is highlighted in the nav
- Back navigation is always one tap away — no dead ends
- Footer is identical across all three pages

---

## Phase 3 — Mobile UX Overhaul (apply to all three files)
Apply these patterns used by Facebook/DoorDash/PayPal:

BOTTOM NAV BAR (mobile only, hidden on desktop):
  Fixed to bottom of screen, 5 tabs max
  Icons + labels, active tab uses --fire color
  Tabs: Home | Browse | Post | Dashboard | Account

CARDS:
  Full-width on mobile with 16px horizontal padding
  Rounded corners (12px), subtle shadow (0 2px 8px rgba(0,0,0,0.08))
  Clear hierarchy: title bold, meta info smaller and muted
  One primary action button per card, full width, --fire background
  Verified badge on truck listings (checkmark + "Verified" in --fire)

TYPOGRAPHY SCALE (enforce across all files):
  Page title: Sora 24px bold
  Section header: Sora 18px semibold
  Card title: Sora 16px semibold
  Body text: Lora 14px
  Meta/labels: DM Mono 12px, muted color
  CTA buttons: Sora 15px semibold

SPACING SYSTEM:
  Page padding: 16px horizontal
  Card gap: 12px
  Section gap: 32px
  Touch targets minimum 44px height — no exceptions

LOADING STATES:
  Buttons show a subtle pulse animation when tapped
  Use CSS transitions (0.2s ease) on all interactive elements

FORMS:
  Full-width inputs
  Large tap targets (48px height)
  Clear placeholder text
  Visible focus states using --fire outline

---

## Phase 4 — Marketplace.html Specific
- Board selector at top: horizontal scrollable pill tabs (like DoorDash categories)
- Active board tab highlighted with --fire background, white text
- Each listing card shows: truck name, cuisine type, location, verified badge, 
  availability status (Open/Busy/Unavailable — color coded), response time, 
  and one-tap contact button
- Filter bar: sticky below board tabs, shows City and Date filters as tappable chips
- Empty state: if no listings, show a friendly message with a CTA to post a request
- Modal on card tap: full truck profile, gallery placeholder, contact form wired 
  to Formspree mbdzyold

---

## Phase 5 — truck-dashboard.html Specific
- Sidebar collapses to bottom nav on mobile
- Stats row: 4 tiles in a 2x2 grid on mobile (Views, Requests, Bookings, Rating)
- Requests feed: card per request, shows event type, date, location, budget range, 
  Accept/Decline buttons full width stacked
- Messages: conversation list style (like Facebook Messenger preview)
- Profile section: edit form with all truck details, photo upload placeholder
- Subscription status shown prominently: current plan, upgrade CTA if Standard

---

## Phase 6 — index.html Polish
- Hero section: one dominant CTA for trucks, one for planners — visually separated
- Social proof bar: truck count, cities covered, requests posted (use real targets: 
  83 trucks, 16 cities)
- Founding member section: urgency without being pushy — spots remaining counter 
  (hardcoded at 47 remaining)
- All footer links now point to real pages

---

## Phase 7 — Cross-File Consistency Pass
After all three files are updated:
- Load each file mentally at 375px and confirm no horizontal scroll
- Confirm font imports are identical across all three files
- Confirm CSS variable definitions are identical across all three files
- Confirm logo SVG data URI is identical across all three files
- Run wc -l on all three files and report final line counts

---

## Known Issues & Browser Fixes

### Brave Mobile Auth
Brave browser on mobile blocks localStorage and cookies aggressively. The auth system handles this with:
- **supabase-client.js**: Initialized with `detectSessionInUrl: true`, `persistSession: true`, `flowType: 'implicit'`
- **auth.html**: Uses `getSession()` + 800ms delay before redirect to ensure session is persisted
- **Dashboard guards**: Try `getSession()` first (Chrome), then fall back to `onAuthStateChange` listener (Brave extracts session from URL hash), with 5-second hard timeout
- **Do not change** these settings — they ensure auth works across Chrome, Brave, Firefox, and Safari mobile

---

## Delivery
When complete, run:
  git add -A
  git commit -m "Production mobile UX pass — all three files"
  git push origin main

Then report:
- Line count per file
- Any deviations from this spec and why
- Anything that needs a real backend to fully function (note only, do not block on it)