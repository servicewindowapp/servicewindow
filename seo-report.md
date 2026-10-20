# SEO Audit Report — 2026-10-20

**Pages audited:** 15 · **Issues found:** 23 · **Report only — no HTML modified**

## Top 3 priority fixes
1. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`** (and `success`/`cancel`/`reset-password` if they are ever indexable). Public pages with no canonical risk duplicate-URL signals.
2. **Complete OG tags on `success.html`, `cancel.html`, `reset-password.html`** (missing og:title, og:description, og:url) and lengthen their descriptions (34–53 chars vs 120–160 target). Also expand short descriptions on `auth` (95), `contact` (98), `terms` (92), `privacy` (116).
3. **Review `noindex, nofollow` on `auth.html`, `success.html`, `cancel.html`, `reset-password.html`.** Likely intentional for transactional pages, but the audit rule says no production page should be noindex. `auth.html` is the signup entry point, so decide deliberately whether it should be indexable. Also fix copy on `jobs.html` ("21 SWFL cities" — project rule is 22).

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | og:url `https://servicewindow.app` lacks trailing slash vs canonical `…/` |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ❌ | Description too short; no canonical; robots `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ❌ | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ❌ (116) | ✅ | ❌ | ❌ | Description 4 chars short; no canonical |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ❌ | Description too short; no canonical |
| success.html | ⚠️ | ❌ (48) | ❌ | ❌ | ❌ | Missing og:title/og:description/og:url; no canonical; short description; robots `noindex, nofollow` |
| cancel.html | ⚠️ | ❌ (53) | ❌ | ❌ | ❌ | Missing og:title/og:description/og:url; no canonical; short description; robots `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ❌ | Missing og:title/og:description/og:url; no canonical; short description; robots `noindex, nofollow` |

Notes:
- Schema is only required on `index.html` (present: 1 JSON-LD block). Other ❌ in the Schema column are informational, not counted as issues.
- All present `og:image` tags use `https://servicewindow.app/og-image.png` (file exists in repo). All present og:url/canonical values use the servicewindow.app domain.
- Titles for success/cancel are marked ⚠️ as short, conversational titles ("You're In", "No Problem") that aren't descriptive.
