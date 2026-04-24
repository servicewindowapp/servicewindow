# ServiceWindow — Project Reference
> Last updated: 2026-04-17

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
- **Logo**: Place `logo.png` in repo root. Use `filter: brightness(0) invert(1)` on dark nav backgrounds.
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

## Known Issues
1. Photo uploads disabled — deferred until Supabase Pro
2. AVG Secure Browser has display issues — not a priority
3. Public truck map planned (find-trucks.html) — needs live location check-in system
4. Uber Eats / DoorDash links — fields exist in DB, UI not wired yet
