---
name: sw-stack
description: "ServiceWindow full-stack reference: repo structure, deployment pipeline, GitHub Pages, Cloudflare DNS, file conventions, git workflow, and all 18 HTML pages. Use when deploying, adding files, debugging routing issues, or working with the project structure."
---

# ServiceWindow — Stack & Deployment Reference

---

## The Stack (Simple on Purpose)
- **Frontend**: Static HTML/CSS/JS — no framework, no build step, no package.json
- **Hosting**: GitHub Pages (free tier)
- **DNS**: Cloudflare (domain: servicewindow.app)
- **Database**: Supabase (PostgreSQL + Auth + Realtime)
- **Payments**: Stripe (via Supabase Edge Functions)
- **Email**: Resend (via Supabase Edge Functions)
- **Forms (waitlist)**: Formspree endpoint `mbdzyold`
- **Custom domain**: CNAME file in repo root contains `servicewindow.app`

---

## Repository
- **URL**: https://github.com/servicewindowapp/servicewindow
- **Branch**: `main` (only branch — direct commits, no PRs)
- **GitHub Pages**: Serves from `main` branch root
- **Deploy**: Automatic on push to main — GitHub Actions handles it (takes 1-5 min to propagate)

---

## Local Environment
- **OS**: Windows
- **Shell**: PowerShell
- **Project location**: `C:\Users\wesfi\OneDrive\Desktop\Food Truck App`
- **CRITICAL**: Always quote the path — `cd "C:\Users\wesfi\OneDrive\Desktop\Food Truck App"` — spaces will break commands
- **Git**: Standard git CLI
- **Supabase CLI**: Installed globally

### Starting local dev
```powershell
cd "C:\Users\wesfi\OneDrive\Desktop\Food Truck App"
# Start Docker Desktop first (must be running)
supabase start
# Local Studio available at http://localhost:54323
```

---

## All HTML Files (18 total)

### Production pages (user-facing)
| File | Purpose |
|------|---------|
| `index.html` | Landing page — primary entry point, waitlist form |
| `marketplace.html` | Public marketplace — browse trucks (no login required) |
| `find-trucks.html` | Public truck discovery — consumer-facing, map view planned |
| `auth.html` | Signup / login — all 7 roles |
| `pricing.html` | Pricing page |
| `about.html` | About page |
| `contact.html` | Contact page |
| `jobs.html` | Jobs board public view |
| `venues.html` | Venues public view |
| `property.html` | Parking/property listings public view |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `success.html` | Post-Stripe-payment success page |
| `cancel.html` | Post-Stripe-payment cancel page |
| `reset-password.html` | Password reset flow |

### Authenticated dashboards
| File | Role |
|------|------|
| `truck-dashboard.html` | Food truck operators |
| `planner-dashboard.html` | Event organizers (role: `organizer`) |
| `venue-dashboard.html` | Venues |
| `property-dashboard.html` | Property/parking owners |
| `service-provider-dashboard.html` | Service providers |
| `jobs-dashboard.html` | Job seekers |
| `admin-dashboard.html` | Admin only |

### Supporting JS files
| File | Purpose |
|------|---------|
| `supabase-client.js` | Supabase client initialization |
| `avatar-upload.js` | Avatar upload handler (photo uploads currently disabled) |
| `r2-upload-worker.js` | Cloudflare R2 worker (deprecated — do not use) |

### Legacy/draft files (do not edit or delete)
- `Demo v.1.html`
- `Landing orig.html`
- `rollcall-landing.html`
- `servicewindow-landing.html`
- `servicewindow-landing (1).html`

---

## Git Workflow

### Standard commit sequence
```powershell
cd "C:\Users\wesfi\OneDrive\Desktop\Food Truck App"
git add -A
git commit -m "feat: description of change"
git push origin main
```

### Commit message conventions
- `feat:` — new feature or page
- `fix:` — bug fix
- `style:` — visual/CSS changes only
- `chore:` — cleanup, config, non-functional

### After pushing
- GitHub Pages propagates in 1-5 minutes
- Hard refresh (`Ctrl+Shift+R`) to bust cache
- GitHub Actions shows deploy status at: https://github.com/servicewindowapp/servicewindow/actions

---

## Cloudflare DNS
- Proxied A/CNAME records pointing to GitHub Pages IPs
- SSL handled by Cloudflare
- Cloudflare caching can cause stale deploys — if live site doesn't update after 10 min, purge Cloudflare cache manually
- Do NOT use Cloudflare Workers for anything in this project (R2 Worker had CORS issues — abandoned)

---

## Architecture Constraints
These are intentional — do not work around them:

1. **No build system** — no webpack, vite, rollup. Everything must work as a raw `.html` file opened in a browser or served by GitHub Pages static hosting.

2. **No npm/node_modules** — all dependencies via CDN only. Supabase client loads from `https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm`

3. **No server-side rendering** — GitHub Pages is static only. All dynamic behavior via Supabase client-side JS.

4. **No subdirectories for HTML** — all HTML files are in repo root. Routing is flat.

5. **CSS and JS embedded** — no external `.css` or `.js` files except `supabase-client.js` and `avatar-upload.js`. All page-specific CSS is in `<style>` tags, all JS in `<script>` tags.

---

## Supabase Edge Functions Deploy
```powershell
cd "C:\Users\wesfi\OneDrive\Desktop\Food Truck App"
supabase functions deploy function-name --no-verify-jwt
```
Always `--no-verify-jwt`. Always from the project directory.

---

## Stripe
- Checkout and portal sessions handled by Edge Functions
- `create-checkout-session` — initiates payment
- `create-portal-session` — billing management
- `stripe-webhook-success` — activates subscription on payment success
- Webhook endpoint registered in Stripe dashboard pointing to Edge Function URL

---

## Pricing (for reference in UI copy)
| Plan | Founding Rate | Standard Rate | Who |
|------|--------------|---------------|-----|
| Standard | $29/mo (locked) | $49/mo | Food trucks |
| Pro | $49/mo (locked) | $79/mo | Food trucks |
| Service Provider | $39/mo | $39/mo | Service providers |
| Planner/Venue/Property | Free | Free forever | Event side |

---

## 7 Marketplace Boards
1. Request Marketplace — organizers post events seeking trucks
2. Event Calendar — upcoming events trucks can apply to
3. Shift Marketplace — trucks post available dates
4. Venue Partnership — venues seeking food truck relationships
5. Parking & Real Estate — property owners offering spots
6. Vendor Services — commissaries, suppliers, service providers
7. Jobs Board — industry jobs

---

## Browser Compatibility
- Chrome: ✅ Fully supported
- Brave: ✅ Fully supported
- AVG Secure Browser: ❌ Known issues — not worth fixing (niche browser, not target market)
- Safari/Firefox: Target but not formally tested

---

## Known Issues / Deferred Work
1. **Photo uploads** — disabled until Supabase Pro upgrade. Upload button hidden in UI. Do not attempt to re-implement with R2 or Workers.
2. **AVG Secure Browser** — has display issues. Not a priority.
3. **Public truck map** — planned feature (find-trucks.html). Needs live location check-in system from truck owners.
4. **Uber Eats / DoorDash links** — profile fields exist (`uber_eats_url`, `doordash_url`). UI buttons not yet wired on public-facing truck profiles.
