# ServiceWindow — Project Reference
> Last updated: 2026-05-14

---

## Brain Integration — Session Protocol

Read at session start (in order):
1. `E:\Brain\Claude\ServiceWindow-Context.md` — current state, what's built, what's open
2. `E:\Brain\Claude\Session-Log.md` — recent session history (last 2–3 entries)
3. `E:\Brain\Claude\Open-Issues.md` — active bugs and blockers with IDs

Update at session end (every session that touches tracked files):
1. `ServiceWindow-Context.md` — revise "What's Incomplete / Open" table
2. `Session-Log.md` — prepend new entry (what was done, state, next priorities)
3. `Open-Issues.md` — mark resolved, add new with OI-### IDs
4. `E:\Brain\Daily\YYYY-MM-DD.md` — create/update with sprint status table

---

## Stack
| Layer | Tool | Notes |
|-------|------|-------|
| Frontend | Static HTML/CSS/JS | No framework, no build step |
| Hosting | GitHub Pages | `main` branch root |
| DNS | Cloudflare | servicewindow.app |
| Database/Auth | Supabase | Project ID: `krmfxedkxoyzkeqnijcd` |
| Payments | Stripe | Via Supabase Edge Functions |
| Email | Resend | Via Supabase Edge Functions |
| Forms | Formspree | Endpoint: `mbdzyold` |

### Architecture Rules (never break)
- No build system — no webpack, vite, rollup
- No npm/node_modules — all deps via CDN
- No server-side rendering — static only
- All HTML in repo root — no subdirectories
- CSS/JS embedded in `<style>` and `<script>` — no external files except `supabase-client.js`

---

## Repository & Supabase
- Repo: https://github.com/servicewindowapp/servicewindow — `main` only, direct commits
- Local: `C:\Developer\New ServicwWindow Website` (Windows, PowerShell — always quote paths)
- Deploy: Auto on push via GitHub Actions (1–5 min propagation)
- Supabase URL: `https://krmfxedkxoyzkeqnijcd.supabase.co`
- Dashboard: https://supabase.com/dashboard/project/krmfxedkxoyzkeqnijcd
- Anon key: in `supabase-client.js` — schema: `/docs/supabase-schema.md`

---

## Pricing (current — as of 2026-05-14)
| Role | Rate |
|------|------|
| Food Trucks | $39.99/mo — 30-day free trial, no CC |
| Service Providers | Free (Vendor Directory — vendor-services.html) |
| Event Planners | Free |
| Venues | Free |
| Property/Storage | Free |

No founding rates. No Pro plan. No annual billing. SP $19/mo paywall retired — dormant.

---

## All HTML Pages

### Public
| File | Purpose |
|------|---------|
| `index.html` | Landing page |
| `marketplace.html` | Browse trucks/listings (public) |
| `find-trucks.html` | Truck discovery |
| `list-your-truck.html` | Frictionless truck self-submit (no auth) |
| `vendor-services.html` | Vendor directory (commissary, repair, etc.) |
| `auth.html` | Signup / login — all roles |
| `pricing.html` | Pricing page |
| `about.html` | About |
| `contact.html` | Contact |
| `jobs.html` | Jobs board public view |
| `venues.html` | Venues public view |
| `property.html` | Parking/property listings |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `success.html` | Post-Stripe success |
| `cancel.html` | Post-Stripe cancel |
| `reset-password.html` | Password reset |
| `truck-profile.html` | Public truck profile (`?id=UUID`) |

### SEO Pages
`fort-myers-food-trucks.html` · `cape-coral-food-trucks.html` · `swfl-food-truck-catering.html` · `food-truck-events-fort-myers.html` · `naples-food-trucks.html` · `bonita-springs-food-trucks.html`

### Dashboards
| File | Role |
|------|------|
| `truck-dashboard.html` | Food truck operators |
| `planner-dashboard.html` | Event organizers |
| `venue-dashboard.html` | Venues |
| `property-dashboard.html` | Property/parking owners |
| `service-provider-dashboard.html` | Service providers |
| `jobs-dashboard.html` | Job seekers |
| `admin-dashboard.html` | Admin only |

### Supporting JS
`supabase-client.js` — Supabase client init, shared across all pages

---

## Design System
- **Fonts**: Sora (headings) / Lora (body) / DM Mono (labels/data) — never substitute
- **Colors**: `--fire: #FF6B35` · `--navy: #0D1B2A` · `--smoke: #F5F0EB` · `--charcoal: #2C3E50`
- **Theme**: Dark throughout — navy backgrounds, white text, fire orange CTAs
- **Logo**: `<img src="logo.png" class="nav-logo">` — NO CSS filter. Never add `filter: brightness(0) invert(1)`.
- **No Bootstrap, no Tailwind, no external CSS frameworks**
- Full detail: `/docs/design-system.md`

---

## Git Workflow
```powershell
cd "C:\Developer\New ServicwWindow Website"
git add -A
git commit -m "feat: description"
git push origin main
```
Prefixes: `feat:` `fix:` `style:` `chore:`

---

## Testing
Playwright smoke tests in `tests/` — run before every push.

```powershell
# Run from project root:
.\run-tests.ps1
```

First-time setup: `cd tests && npm install && npx playwright install chromium`

- `smoke/public-pages.spec.js` — all public pages: 200, title, logo, no JS errors
- `smoke/auth-guard.spec.js` — all dashboards: unauthenticated → redirect to auth.html
- New public page: add to `PUBLIC_PAGES` array. New dashboard: add to `DASHBOARD_PAGES` array.

---

## Default Response Standard

Produce complete, ready-to-use work. Finish the task — don't plan it.

- Make reasonable assumptions instead of blocking on minor ambiguity
- Prefer durable solutions over workarounds
- Include tests for code changes
- Resolve obvious edge cases within scope — do not add unrequested features
- Be honest about uncertainty

**Code:** complete + tested + runnable. **Research:** cited, decisive conclusion. **Writing:** polished final version.

---

## Project Development Constitution

1. All code must have passing tests before push.
2. Never implement features beyond what was explicitly asked.
3. Never create abstractions for single-use code.
4. Always read relevant files before editing.
5. Patch first to unblock if urgent — always identify and flag root cause separately.

---

## Change Request Format (UI changes)
- **FILE:** which file
- **SECTION:** which named section
- **CHANGE:** exactly what to do
- **CONSTRAINT:** what must not change
- **VIEWPORT:** desktop / mobile / both
