# ServiceWindow — Next Session Plan
> Saved: 2026-04-17

---

## What Was Built This Session

| File | Status | Notes |
|------|--------|-------|
| `CLAUDE.md` | Done | Project reference, persists across sessions |
| `index.html` | Done | Mobile-first landing page, waitlist form (Formspree), 7 board previews, pricing section |
| `auth.html` | Done | 3-step signup (role select → account details → verification), login, Supabase wired |
| `marketplace.html` | Done | 7 board tabs, filter bar, truck cards, listing cards, floating CTA, Supabase live |
| `supabase-client.js` | Done | Shared client with anon key and auth helpers |
| `docs/market-research-summary.md` | Done | 3-week research synthesis |
| `docs/supabase-schema.md` | Done | Full schema reference |
| `docs/monetization.md` | Done | Phase 1 + Phase 2 revenue strategy |

**Supabase anon key:** wired into all three JS files. Backend (schema, RLS, Edge Functions, Stripe) confirmed live from first attempt.

**Deploy status:** Files built and ready. User was given correct PowerShell copy+push command at session end — confirm it ran successfully at start of next session.

**Correct paths:**
- Workspace folder: `C:\Developer\New ServicwWindow Website`
- GitHub repo: `C:\Developer\New ServicwWindow Website`
- Logo: `C:\Developer\New ServicwWindow Website\logo.png` → copies to repo root as `logo.png`

---

## Pages Still To Build (Priority Order)

### Priority 1 — Core funnel (build next)
| File | Why first |
|------|-----------|
| `truck-dashboard.html` | Supply side needs this to operate. Profile management, booking inbox, shift posting. |
| `planner-dashboard.html` | #1 demand segment (HOAs, event planners). Post requests, manage bookings. |
| `admin-dashboard.html` | Needed to verify/approve accounts — nothing goes live without it. |

### Priority 2 — Supporting public pages
| File | Notes |
|------|-------|
| `pricing.html` | SEO page. Reuses pricing section from index.html, expands detail. |
| `reset-password.html` | Required for auth flow to be complete. |
| `success.html` | Post-Stripe payment confirmation. |
| `cancel.html` | Post-Stripe cancel handling. |

### Priority 3 — Remaining public pages
| File | Notes |
|------|-------|
| `venues.html` | Public venue listings |
| `property.html` | Parking/storage listings |
| `jobs.html` | Jobs board public view |
| `about.html` | Brand/trust page |
| `contact.html` | Contact form (Formspree) |
| `privacy.html` | Legal — required before launch |
| `terms.html` | Legal — required before launch |

### Priority 4 — Remaining dashboards
| File | Notes |
|------|-------|
| `venue-dashboard.html` | Venue operators |
| `property-dashboard.html` | Property/parking owners |
| `service-provider-dashboard.html` | Commissaries, suppliers |
| `jobs-dashboard.html` | Job seekers |

---

## Key Decisions Already Made
- Founding rate: **$29/mo locked forever** (not one-time)
- Free forever: event planners, HOAs, venues
- 30-day free trial for trucks, no credit card
- Verification required for all accounts before marketplace access
- No photo uploads until Supabase Pro upgrade
- Stack: static HTML only, no framework, no build step
- All CSS/JS embedded per page (except supabase-client.js)

## Deferred Features (Phase 2 — do not build yet)
- SMS notifications for urgent slots
- Standby/waitlist system for cancellations
- Recurring booking templates
- Multi-truck event requests
- Cuisine-type filtering in UI (DB field exists, UI filter deferred)
- Service radius matching
- Fundraiser partner program
- Featured listing upgrades ($15-25/mo add-on)

---

## Start of Next Session Checklist
1. Confirm files were pushed to GitHub and live at servicewindow.app
2. Test auth flow — create a test account, confirm profile row created in Supabase
3. Test marketplace — confirm Supabase query fires and empty state shows correctly
4. Build `admin-dashboard.html` first — nothing can be approved without it
5. Then `truck-dashboard.html` → `planner-dashboard.html`
