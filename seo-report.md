# SEO Audit Report — 2026-10-28

## Summary
- **Pages audited:** 15
- **Total issues found:** 23 (✅ pass · ❌ fail · ⚠️ needs improvement)
- **Top 3 priority fixes:**
  1. **Confirm the `noindex, nofollow` on `auth`, `success`, `cancel`, `reset-password` is intentional.** The audit rule says no production page should be noindex. These are transactional pages, so it is likely deliberate. If so, exempt them from this check.
  2. **Rewrite short meta descriptions (target 120–160 chars):** `reset-password` (34), `success` (48), `cancel` (53), `terms` (92), `auth` (95), `contact` (98), `privacy` (116). `marketplace` is 1 char over (161).
  3. **Add the missing `<link rel="canonical">` and OG title/description/url on the utility pages.** `auth` has no canonical. `success`, `cancel` and `reset-password` have no canonical and only `og:image`.
- Minor: `jobs` og:description says "21 SWFL cities" (project rule: 22). Titles over 60 chars may truncate in search results: `property` (67), `venues` (64), `index` (62).

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ⚠️ | ✅ (160) | ✅ | ✅ | ✅ WebSite, Organization | Title 62 chars, may truncate |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ CollectionPage | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ CollectionPage | — |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | n/a (noindex) | Description too short; no canonical; `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ WebPage | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ AboutPage | — |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ⚠️ none | Description too short; no schema (optional) |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ CollectionPage | og:description says "21 cities" (should be 22) |
| venues.html | ⚠️ | ✅ (145) | ✅ | ✅ | ✅ WebPage | Title 64 chars, may truncate |
| property.html | ⚠️ | ✅ (154) | ✅ | ✅ | ✅ WebPage | Title 67 chars, may truncate |
| privacy.html | ✅ | ❌ (116) | ✅ | ❌ | ⚠️ none | Description 4 chars short; no canonical (optional schema) |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ⚠️ none | Description too short; no canonical (optional schema) |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | n/a (noindex) | Description too short; missing og:title/description/url; no canonical; `noindex, nofollow` |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | n/a (noindex) | Description too short; missing og:title/description/url; no canonical; `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | n/a (noindex) | Description too short; missing og:title/description/url; no canonical; `noindex, nofollow` |

Notes:
- Correction to the table above: `privacy.html` and `terms.html` have **no** `<link rel="canonical">`. The earlier scan showed none, so both are ❌.
- OG Tags covers og:title, og:description, og:url (servicewindow.app) and og:image. All pages have og:image.
- Every present og:url and canonical uses the servicewindow.app domain.
- Schema is required on `index.html` only (present). Absence elsewhere is advisory.
- No HTML files were modified.
