# ServiceWindow Static Analysis Audit Report
**Generated:** 2026-05-16  
**Scope:** All 34 HTML files in `C:\Developer\New ServicwWindow Website`  
**Canonical source of truth:** CLAUDE.md + ServiceWindow-Context.md  

---

## Executive Summary

| Category | Issues | Critical | High | Medium | Low |
|----------|--------|----------|------|--------|-----|
| Pricing Consistency | 2 | 0 | 1 | 1 | 0 |
| Internal Link Integrity | 0 | — | — | — | — |
| Security Patterns | 1 | 0 | 1 | 0 | 0 |
| Meta Completeness | 3 | 0 | 0 | 1 | 2 |
| Legal Surface | 4 | 0 | 2 | 2 | 0 |
| Undocumented Files | 2 | — | — | — | — |
| **Total** | **12** | **0** | **4** | **4** | **2** |

Zero critical security issues. No broken links. The site is structurally clean. The 12 findings are real and actionable — prioritized below.

---

## File Inventory

**Actual count: 34 HTML files** — CLAUDE.md documents 32. Two files exist that are not listed in the project reference:

| File | Status | Action |
|------|--------|--------|
| `api.html` | Undocumented | Add to CLAUDE.md or delete if unused |
| `swfl-food-truck-report.html` | Undocumented | Add to CLAUDE.md or delete if unused |

---

## Finding Details

### PRICING CONSISTENCY

#### PC-001 — HIGH: `success.html` displays stale `$19/mo` for Advertiser plan

**File:** `success.html`, line 210  
**Finding:** The Advertiser subscription success branch still shows "$19/mo" — a retired price. The SP $19/mo paywall was retired per CLAUDE.md (2026-05-14).

**Evidence:**
```javascript
'Your $19/mo ServiceWindow Advertiser subscription is active. Your ad is now visible...'
```

**Fix:** Update the string to reflect the current service provider/advertiser pricing, or remove the dollar amount entirely if the advertiser pricing is no longer public-facing.

**Impact:** Any user who completes an advertiser checkout sees the wrong price on the confirmation screen.

---

#### PC-002 — MEDIUM: `admin-dashboard.html` trial logic uses implicit 30-day duration

**File:** `admin-dashboard.html`  
**Finding:** The admin manually-grant-trial function computes `Date.now() + 30 * 24 * 60 * 60 * 1000` inline. This matches the canonical 30-day trial but is hardcoded in JS rather than driven by a constant or Edge Function config.

**Fix:** Not urgent — functionally correct. Extract to a named constant `TRIAL_DAYS = 30` so a future change doesn't require hunting inline math. Track as tech debt.

---

### INTERNAL LINK INTEGRITY

#### LI — PASS: Zero broken internal links

All `href` attributes on all 34 pages resolve to existing files. No 404 targets found.

---

### SECURITY PATTERNS

#### SEC-001 — HIGH: `auth.html` and 3 other pages inline Supabase anon key

**Files:** `auth.html`, `find-trucks.html`, `list-your-truck.html`, `marketplace.html`

**Finding:** These 4 pages hardcode `SUPABASE_URL` and `SUPABASE_ANON_KEY` inline instead of importing `supabase-client.js`. The other 30 pages use `supabase-client.js`.

**Clarification on severity:** The Supabase anon key is *intentionally public* — it is designed to be in browser code and is restricted by Row Level Security. This is **not** a credentials exposure vulnerability.

**Why this is still HIGH:** Key rotation requires editing 5 files (4 HTML + supabase-client.js) instead of 1. A mismatch during rotation will silently break the 4 inline pages while the rest of the site works fine. Given auth.html is the main signup gate, silent breakage there is a launch risk.

**Fix:** Migrate the 4 pages to import `supabase-client.js`.

```html
<!-- Replace inline init block in each of the 4 pages with: -->
<script src="supabase-client.js"></script>
```

Then remove the inline `const SUPABASE_URL = ...` / `const SUPABASE_ANON_KEY = ...` / `createClient(...)` block from each page and use the globally-initialized `supabase` client from `supabase-client.js`.

**Note:** `find-trucks.html` is binary-flagged by git (UTF-8 with non-standard chars) — worth running through a text normalization pass while editing.

---

#### SEC-002 — PASS: All dashboard pages have auth guards

All 7 dashboards correctly call `supabase.auth.getSession()` and redirect unauthenticated users:

| Dashboard | Auth Pattern | Redirect |
|-----------|-------------|---------|
| truck-dashboard | `getSession()` + `is_verified` check | `auth.html` |
| planner-dashboard | `getSession()` | `auth.html?mode=login` |
| venue-dashboard | `getSession()` | `auth.html` |
| property-dashboard | `getSession()` | `auth.html` |
| service-provider-dashboard | `getSession()` | `auth.html` |
| jobs-dashboard | `getSession()` — soft (hybrid public/private) | Shows locked CTAs |
| admin-dashboard | `getSession()` + `role !== 'admin'` check | Error bar |

Admin dashboard correctly enforces role-based access on top of session check.

---

#### SEC-003 — PASS: No service_role keys exposed

All JWT tokens found in HTML files decode to `"role": "anon"`. No service_role keys are exposed in any public-facing file. Edge Functions correctly hold the service_role key server-side.

---

#### SEC-004 — PASS: All Formspree forms use canonical endpoint

All three Formspree forms (contact.html, index.html waitlist, vendor-services.html) correctly target `https://formspree.io/f/mbdzyold`.

---

### META COMPLETENESS

#### META-001 — MEDIUM: `contact.html` missing `<link rel="canonical">`

**File:** `contact.html`  
**Finding:** Has description, title, and all OG tags (`og:title`, `og:description`, `og:url`, `og:image`) but is missing the `<link rel="canonical">` element.

**Fix:** Add inside `<head>`:
```html
<link rel="canonical" href="https://servicewindow.app/contact.html">
```

---

#### META-002 — LOW: `list-your-truck.html` missing `og:image`

**File:** `list-your-truck.html`  
**Finding:** Has description, canonical, og:title, og:description but no `og:image`. Social shares will render without an image preview.

**Fix:**
```html
<meta property="og:image" content="https://servicewindow.app/og-image.png">
```

---

#### META-003 — LOW: `vendor-services.html` missing `og:image`

**File:** `vendor-services.html`  
**Finding:** Same as META-002.

**Fix:**
```html
<meta property="og:image" content="https://servicewindow.app/og-image.png">
```

---

### LEGAL SURFACE

#### LEGAL-001 — HIGH: `auth.html` has zero privacy policy or terms links

**File:** `auth.html`  
**Finding:** The main signup and login page has no links to `privacy.html` or `terms.html` anywhere on the page. Every user who creates an account passes through this page. Presenting a "Create Account" button without a privacy policy acknowledgement creates legal exposure under CCPA and general best practice.

**Fix:** Add a consent line under the submit button in the signup flow:
```html
<p class="legal-consent">
  By creating an account you agree to our 
  <a href="terms.html">Terms of Service</a> and 
  <a href="privacy.html">Privacy Policy</a>.
</p>
```

This is the highest-priority finding in the legal category.

---

#### LEGAL-002 — HIGH: `list-your-truck.html` has no privacy or terms links

**File:** `list-your-truck.html`  
**Finding:** This is a public-facing form that collects business name, contact, phone, city, and description from unauthenticated food truck operators. No privacy policy or terms link appears anywhere on the page — not in the form, not in the footer.

**Fix:** Add to the form's submit section:
```html
<p class="legal-consent" style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:12px;">
  By submitting you agree to our 
  <a href="terms.html">Terms</a> and 
  <a href="privacy.html">Privacy Policy</a>.
</p>
```

Also add `privacy.html` and `terms.html` links to the footer (currently the footer shows only "All rights reserved" and the city list).

---

#### LEGAL-003 — MEDIUM: Dashboard footers missing privacy/terms links

**Files:** All 7 dashboards  
**Finding:** No dashboard footer includes links to privacy.html or terms.html. Authenticated users who want to review the privacy policy or ToS have no in-app path to reach them.

**Fix:** Add to each dashboard footer:
```html
<a href="privacy.html">Privacy Policy</a> · <a href="terms.html">Terms of Service</a>
```

Lower priority than LEGAL-001/002 since users agreed at signup, but should be done before public launch.

---

#### LEGAL-004 — MEDIUM: `contact.html` form has privacy/terms links in footer, not inline

**Finding:** `contact.html` does have `<a href="privacy.html">` and `<a href="terms.html">` in its footer — ✓. However they're at the bottom of the page, not inline with the form submission. For CCPA compliance, a consent acknowledgement near the submit button is stronger than a distant footer link. Low urgency but cleaner to add.

---

## Auth Page Pricing Audit Summary

All pricing on user-facing pages was verified against the canonical `$39.99/mo / 30-day free trial / no founding rates / no Pro plan`:

| Page | Status | Notes |
|------|--------|-------|
| `pricing.html` | ✓ Clean | Correct $39.99, 30-day trial, no stale amounts |
| `index.html` | ✓ Clean | $39.99 present in pricing section |
| `auth.html` | ✓ Clean | No price displayed |
| `success.html` | ✗ **FAIL** | $19/mo on Advertiser branch — see PC-001 |
| All SEO pages | ✓ Clean | No pricing content |
| All other public pages | ✓ Clean | Non-subscription prices (wages, bids) are context-appropriate |

---

## Extended Playwright Test Suite

**File:** `tests/smoke/extended-audit.spec.js`

Adds 7 test suites (48 individual tests) on top of the existing smoke tests:

| Suite | Tests | Guards Against |
|-------|-------|----------------|
| `[console]` | 34 | Uncaught JS errors on every page |
| `[forms]` | 5 | Formspree endpoint, HTTP action, form rendering |
| `[meta]` | 25 | Missing description/canonical/og:title on all public pages |
| `[pricing]` | 8 | Stale prices on surface pages; canonical price present |
| `[legal]` | 5 | Missing privacy/terms on auth.html, list-your-truck.html, contact.html |
| `[structure]` | 5 | HTTP 200 for all pages, supabase-client.js, sitemap, robots.txt |
| `[consistency]` | 1 | No new pages hardcoding inline Supabase keys |

Run with existing test runner:
```powershell
cd "C:\Developer\New ServicwWindow Website"
.\run-tests.ps1
```

---

## Prioritized Fix Queue

| Priority | ID | File | Effort |
|----------|-----|------|--------|
| 1 | LEGAL-001 | `auth.html` — add privacy + terms links | 5 min |
| 2 | PC-001 | `success.html` — fix stale $19/mo string | 2 min |
| 3 | LEGAL-002 | `list-your-truck.html` — add privacy + terms to form and footer | 10 min |
| 4 | SEC-001 | Migrate 4 inline-key pages to `supabase-client.js` | 30 min |
| 5 | META-001 | `contact.html` — add canonical link | 2 min |
| 6 | META-002/003 | `list-your-truck.html`, `vendor-services.html` — add og:image | 4 min |
| 7 | LEGAL-003 | All dashboards — add privacy + terms to footer | 20 min |
| 8 | (doc) | Add `api.html` and `swfl-food-truck-report.html` to CLAUDE.md | 2 min |

Total estimated effort: ~75 minutes.

---

## What This Audit Did NOT Check

- **Live Supabase RLS enforcement** — requires authenticated test users (covered by auth-e2e.spec.js separately)
- **Stripe webhook endpoint integrity** — server-side, requires Edge Function logs
- **Mobile rendering** — OI-001 is still the open gate for this
- **Performance / Core Web Vitals** — out of scope
- **Accessibility (WCAG)** — not audited here
