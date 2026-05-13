# ServiceWindow — Build Status
> Last updated: 2026-04-18

---

## Pages Built ✅

| File | Status | Notes |
|------|--------|-------|
| `index.html` | ✅ Built | Landing page, 1502 lines |
| `marketplace.html` | ✅ Built | Public browse, 1435 lines |
| `auth.html` | ✅ Built | Sign up / login all roles, 1029 lines |
| `truck-dashboard.html` | ✅ Built | Truck operator dashboard, 869 lines |
| `planner-dashboard.html` | ✅ Built | Event planner/organizer dashboard, 706 lines |
| `admin-dashboard.html` | ✅ Built | Admin review/approval dashboard, 753 lines |
| `supabase-client.js` | ✅ Built | Shared Supabase client init, 48 lines |
| `logo.png` | ✅ Present | In repo root |

---

## Pages Added ✅ (2026-04-18 session)

| File | Status |
|------|--------|
| `pricing.html` | ✅ Built |
| `reset-password.html` | ✅ Built |
| `success.html` | ✅ Built |
| `cancel.html` | ✅ Built |
| `privacy.html` | ✅ Built |
| `terms.html` | ✅ Built |
| `about.html` | ✅ Built |
| `contact.html` | ✅ Built |
| `venues.html` | ✅ Built |
| `property.html` | ✅ Built |
| `jobs.html` | ✅ Built |

## Pages Still Missing ❌

### Public Pages
| File | Purpose | Priority |
|------|---------|---------|
| `find-trucks.html` | Consumer-facing truck discovery | P1 |

### Authenticated Dashboards
| File | Role | Priority |
|------|------|---------|
| `venue-dashboard.html` | Venue operators | P2 |
| `property-dashboard.html` | Property/parking owners | P3 |
| `service-provider-dashboard.html` | Service providers | P3 |
| `jobs-dashboard.html` | Job seekers | P3 |

---

## Infrastructure Status

| Component | Status | Notes |
|-----------|--------|-------|
| GitHub Pages | ❓ Confirm | Repo: github.com/servicewindowapp/servicewindow |
| Cloudflare DNS | ❓ Confirm | servicewindow.app → GitHub Pages |
| CNAME file | ❓ Confirm | Should exist in repo root |
| Supabase schema | ❓ Confirm | Tables deployed to production? |
| Supabase Edge Functions | ❓ Confirm | Stripe, email deployed? |
| Stripe products/prices | ⚠️ TODO | New products needed: $39.99/mo truck, $19.99/mo SP. Old price IDs in Edge Functions must be updated. |
| Resend email | ❓ Confirm | Domain verified, API key set? |

---

## Known Issues
1. Photo uploads disabled — deferred until Supabase Pro upgrade
2. `NEXT-SESSION-PLAN.md` and `supabase-schema.md` in `/docs` have Windows filesystem permission issues — not readable via Linux mount (recreate if needed)
3. `supabase/` folder exists in repo root but appears empty — confirm migration files location
4. `New ServiceWindow website/` subfolder exists — confirm if legacy and safe to delete
