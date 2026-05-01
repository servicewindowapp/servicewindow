# ServiceWindow — Project Reference
> Last updated: 2026-05-01

---

## Brain Integration — Session Protocol

Claude maintains a persistent context layer in the Obsidian vault at `E:\Brain\Claude\`. This is mandatory — not optional.

### Session Start (do this before any other work)
Read these three files in order:
1. `E:\Brain\Claude\ServiceWindow-Context.md` — current project state, what's built, what's open
2. `E:\Brain\Claude\Session-Log.md` — recent session history (read last 2–3 entries)
3. `E:\Brain\Claude\Open-Issues.md` — active bugs and blockers with IDs

Use this context to orient before touching any code. Do not rely on CLAUDE.md alone — the Brain files are the living state.

### Session End (do this after every session that touches tracked files)
1. **Update** `E:\Brain\Claude\ServiceWindow-Context.md` — revise "What's Incomplete / Open" table to reflect current state
2. **Prepend** a new entry to `E:\Brain\Claude\Session-Log.md` — what was done, state at end, next priorities, flagged issues
3. **Update** `E:\Brain\Claude\Open-Issues.md` — mark resolved issues, add new ones with IDs (OI-### format)
4. **Create or update** today's daily note at `E:\Brain\Daily\YYYY-MM-DD.md` — use the sprint status table format established in 2026-05-01.md

### Daily Note Format
Follow the template in `E:\Brain\Templates\Daily Note.md`, and append a ServiceWindow sprint status table below the Notes section when there is active sprint work. Link to previous day's note at the bottom.

### File Structure Summary
```
E:\Brain\
├── Claude\
│   ├── ServiceWindow-Context.md   ← current state (rewrite each session)
│   ├── Session-Log.md             ← append-only history
│   └── Open-Issues.md             ← bug/blocker tracker with IDs
├── Daily\
│   └── YYYY-MM-DD.md              ← daily notes (create each session)
├── Areas\
│   └── ServiceWindow.md           ← area overview (update monthly or on major shifts)
├── Projects\
│   └── ServiceWindow Website.md   ← sprint tracker (update when sprint milestones change)
└── Templates\
    └── Daily Note.md              ← base template
```

---

## What This Is
ServiceWindow (servicewindow.app) is a verified two-sided food truck marketplace for Southwest Florida.
- **Supply side**: Food truck operators
- **Demand side**: Event planners, HOA/gated community managers, venue operators, property/storage owners
- **Region 1**: SWFL — 21 cities across Lee, Collier, Sarasota, Charlotte, and Hendry counties

---

## Stack
| Layer | Tool | Notes |
|-------|------|-------|
| Frontend | Static HTML/CSS/JS | No framework, no build step |
| Hosting | GitHub Pages | Serves from `main` branch root |
| DNS | Cloudflare | Domain: servicewindow.app |
| Database/Auth | Supabase | Project ID: `krmfxedkxoyzkeqnijcd` |
| Payments | Stripe | Via Supabase Edge Functions |
| Email | Resend | Via Supabase Edge Functions |
| Forms (waitlist) | Formspree | Endpoint: `mbdzyold` |

### Architecture Rules (never break these)
- No build system — no webpack, vite, rollup
- No npm/node_modules — all deps via CDN
- No server-side rendering — static only
- No subdirectories for HTML — all HTML in repo root
- CSS/JS embedded in `<style>` and `<script>` tags — no external `.css` or `.js` except `supabase-client.js`

---

## Repository
- URL: https://github.com/servicewindowapp/servicewindow
- Branch: `main` (only branch — direct commits, no PRs)
- Deploy: Auto on push (GitHub Actions, 1-5 min propagation)
- Local path: `C:\Developer\New ServicwWindow Website` (Windows, PowerShell — always quote paths)

---

## Supabase
- Project URL: `https://krmfxedkxoyzkeqnijcd.supabase.co`
- Dashboard: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd
- Anon key: in `supabase-client.js`
- Local Studio: http://localhost:54323 (requires Docker + `supabase start`)
- See `/docs/supabase-schema.md` for full schema

---

## Pricing
| Role | Founding Rate | Standard Rate |
|------|--------------|---------------|
| Food Trucks | $29/mo (locked forever) | $49/mo |
| Food Trucks Pro | $49/mo (locked forever) | $79/mo |
| Service Providers | $39/mo | $39/mo |
| Event Planners | Free | Free forever |
| Venues | Free | Free forever |
| Property/Storage | Free browse | Small monthly fee to advertise to trucks |

30-day free trial for trucks (no credit card required).

---

## 7 Marketplace Boards
1. **Request Marketplace** — organizers post events seeking trucks
2. **Event Calendar** — upcoming events trucks can apply to
3. **Shift Marketplace** — trucks post available dates
4. **Venue Partnership** — venues seeking food truck relationships
5. **Parking & Real Estate** — property owners offering spots
6. **Vendor Services** — commissaries, suppliers, service providers
7. **Jobs Board** — industry jobs

---

## All HTML Pages

### Public Pages
| File | Purpose |
|------|---------|
| `index.html` | Landing page — primary entry point, waitlist/signup |
| `marketplace.html` | Public marketplace — browse trucks (no login required) |
| `find-trucks.html` | Public truck discovery — consumer-facing |
| `auth.html` | Signup / login — all roles |
| `pricing.html` | Pricing page |
| `about.html` | About page |
| `contact.html` | Contact page |
| `jobs.html` | Jobs board public view |
| `venues.html` | Venues public view |
| `property.html` | Parking/property listings public view |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `success.html` | Post-Stripe success page |
| `cancel.html` | Post-Stripe cancel page |
| `reset-password.html` | Password reset flow |

### Authenticated Dashboards
| File | Role |
|------|------|
| `truck-dashboard.html` | Food truck operators |
| `planner-dashboard.html` | Event organizers (`role: organizer`) |
| `venue-dashboard.html` | Venues |
| `property-dashboard.html` | Property/parking owners |
| `service-provider-dashboard.html` | Service providers |
| `jobs-dashboard.html` | Job seekers |
| `admin-dashboard.html` | Admin only |

### Supporting JS
| File | Purpose |
|------|---------|
| `supabase-client.js` | Supabase client init (shared across all pages) |

---

## Design System (quick reference — full detail in /docs/design-system.md)
- **Fonts**: Sora (headings) / Lora (body) / DM Mono (labels/data) — never substitute
- **Colors**: `--fire: #FF6B35` / `--navy: #0D1B2A` / `--smoke: #F5F0EB` / `--charcoal: #2C3E50`
- **Theme**: Dark throughout — navy backgrounds, white text, fire orange CTAs
- **Logo**: Place `logo.png` in repo root. Use `<img src="logo.png" class="nav-logo">` with NO CSS filter. The logo renders correctly on dark backgrounds as-is. NEVER add `filter: brightness(0) invert(1)` — this washes it out to solid white.
- **No Bootstrap, no Tailwind, no external CSS frameworks**

---

## Region 1 — Southwest Florida
### 21 Cities
Cape Coral, Fort Myers, Lehigh Acres, Bonita Springs, North Fort Myers, Estero, Sanibel, Fort Myers Beach, Naples, Immokalee, Marco Island, Golden Gate, Lely Resort, Ave Maria, Naples Manor, Naples Park, Sarasota, Punta Gorda, Port Charlotte, Englewood, LaBelle

### Copy Rules
- Short form: "SWFL" or "Southwest Florida"
- City count: always **21**
- Footer: "Fort Myers · Cape Coral · Naples · Sarasota and beyond."
- Service area: "Lee, Collier, Sarasota, Charlotte, and Hendry counties"

---

## Scope Control — What NOT to Build
- No mobile app — responsive web only
- No real-time chat — async messaging only
- No map view yet — card/table listings only
- No multi-region — SWFL only
- No payment between users — Stripe for platform subscriptions only
- No AI features
- No social features (likes, follows, feeds)
- No photo uploads until Supabase Pro upgrade

---

## Launch Success Metrics
- 20 verified truck profiles within 30 days
- 10 verified requester accounts within 30 days
- 5 completed bookings through the platform
- 3 paying advertisers
- Google indexing all SEO pages
- Zero auth failures on mobile browsers

---

## Key Intel From Market Research
- HOA/gated communities are #1 demand segment (recurring monthly slots, 700-950+ home communities)
- Scam warnings in every major Facebook group — verification is primary trust wedge
- Last-minute cancellations are a common pain point (no current solution)
- Beer/wine venues (Brookside Beer Market, RAD Winery, Millennial Brewing) want recurring truck relationships
- "Orderup Apps" joined Group 1 on 2026-04-17 — monitor as potential competitor

## Deferred Features (high value, build in Phase 2)
- SMS/push notifications for urgent slot fills
- Standby/waitlist system for cancellations
- Recurring booking templates for HOAs
- Multi-truck event requests
- Cuisine-type filtering
- Service radius matching in UI
- Fundraiser partner program with badge

---

## Git Workflow
```powershell
cd "C:\Developer\New ServicwWindow Website"
git add -A
git commit -m "feat: description"
git push origin main
```
Commit prefixes: `feat:` `fix:` `style:` `chore:`

---

## Testing

Playwright smoke tests live in `tests/`. They are the quality gate — run before every push.

### First-time setup (once)
```powershell
cd "C:\Developer\New ServicwWindow Website\tests"
npm install
npx playwright install chromium
```

### Run tests (before every push)
```powershell
# From project root — preferred:
.\run-tests.ps1

# Or manually from tests/:
cd "C:\Developer\New ServicwWindow Website\tests"
npx playwright test
```

### What the tests cover
- **`smoke/public-pages.spec.js`** — all 12 public pages: HTTP 200, title contains "ServiceWindow", nav logo visible, no fatal JS errors
- **`smoke/auth-guard.spec.js`** — all 7 dashboard pages: unauthenticated users redirect to `auth.html`

### Adding tests for a new page
1. Add public pages to the `PUBLIC_PAGES` array in `public-pages.spec.js`
2. Add dashboard pages to the `DASHBOARD_PAGES` array in `auth-guard.spec.js`
3. Write feature-specific assertions in a new `smoke/*.spec.js` file if needed

### Constitution rule
Per the Project Development Constitution: **all code must have passing tests before merging.**
If `run-tests.ps1` exits non-zero, do not push.

---

## Known Issues
1. Photo uploads disabled — deferred until Supabase Pro
2. AVG Secure Browser has display issues — not a priority
3. Public truck map planned (find-trucks.html) — needs live location check-in system
4. Uber Eats / DoorDash links — fields exist in DB, UI not wired yet

---

# Default Response Standard

Produce complete, ready-to-use work. Do not provide only a plan unless explicitly asked. When the task is feasible within the current response, finish it.

**Core rules:**
1. Make reasonable assumptions instead of blocking on minor ambiguity.
2. Use current research when facts may have changed.
3. Prefer durable solutions over temporary workarounds.
4. Include tests or validation for code, calculations, workflows, and data transformations.
5. Include concise documentation or usage notes when needed.
6. Resolve obvious edge cases within the scope of the task. Do not add features or capabilities beyond what was explicitly requested.
7. Be honest about uncertainty, limits, and anything that could not be verified.
8. End with the final deliverable, not a promise to continue later.
9. Do not sacrifice correctness, safety, or honesty for completeness.

**For code:** deliver complete working code · include tests · include run instructions · include dependencies · handle errors · avoid unnecessary shortcuts.

**For research:** cite reputable sources · verify against multiple sources where appropriate · separate facts from assumptions · provide a decisive conclusion.

**For writing:** deliver the polished final version · match the requested format and audience · remove filler.

Do not say "I can do this," "here is how you might," or "we can come back to this later" when you can simply complete the task. The target is a finished, high-confidence result.

---

# Project Development Constitution

## 1. Non-Negotiable Quality Gates
- All code must first have passing tests.
- Every change must pass through a dedicated `code-review` agent before merging.
- Results must be compared to pre-computed expectations, never to the function's own output.
- Follow all existing lint, type-safety, and style rules (Prettier, ESLint).

## 2. Operational Rules
- **NEVER implement features beyond what was explicitly asked.**
- **NEVER create abstractions for single-use code.**
- **ALWAYS** state your assumptions before implementing any solution.
- **ALWAYS** read relevant files before making edits.

## 3. Instructions for this Session
- Use a fresh session for each new task.
- Use the `Claude Devtools` suite for systematic workflows that enforce quality gates.
- Use `Claude-Smart` to learn from my corrections and avoid repeating future mistakes.
