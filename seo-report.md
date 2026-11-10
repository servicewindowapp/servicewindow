# SEO Audit Report — servicewindow.app

**Date:** 2026-11-10 · **Mode:** report only (no HTML modified)

## Summary
- **Total pages audited:** 15
- **Total issues found:** 23 (across 10 pages; 5 pages clean: find-trucks, pricing, about, venues, property — see table)
- **Schema:** index.html has JSON-LD ✅ (also present on marketplace, find-trucks, pricing, about, jobs, venues, property)

### Top 3 priority fixes
1. **`noindex` on auth, success, cancel, reset-password** — check #9 fails. Likely intentional for the three transactional pages and reset-password, but `auth.html` is a signup/login entry point listed as public; decide whether it should be indexable. If noindex stays, document it as an accepted exception.
2. **Missing `<link rel="canonical">`** on auth, privacy, terms, success, cancel, reset-password (6 pages). Add canonical on privacy.html and terms.html (indexable) first.
3. **Missing OG tags (og:title / og:description / og:url)** on success, cancel, reset-password; plus **short meta descriptions (<120 chars)** on auth (95), contact (98), privacy (116), terms (92), success (48), cancel (53), reset-password (34). Also jobs.html og:description says "21 SWFL cities" — project copy rule is **22**.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | og:url `https://servicewindow.app` lacks trailing slash vs canonical `/`; description at upper limit (160) |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ❌ | Description too short; no canonical; `robots` = noindex, nofollow |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ❌ | Description too short; no schema (optional) |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities" — should be 22 |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ❌ (116) | ✅ | ❌ | ❌ | Description slightly short; no canonical |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ❌ | Description too short; no canonical |
| success.html | ⚠️ | ❌ (48) | ❌ | ❌ | ❌ | Missing og:title/description/url; no canonical; description too short; `robots` = noindex, nofollow; title not descriptive |
| cancel.html | ⚠️ | ❌ (53) | ❌ | ❌ | ❌ | Missing og:title/description/url; no canonical; description too short; `robots` = noindex, nofollow; title not descriptive |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ❌ | Missing og:title/description/url; no canonical; description too short; `robots` = noindex, nofollow |

## Notes
- og:image is present on all 15 pages (`https://servicewindow.app/og-image.png`).
- Schema is only required on index.html; non-index ❌ entries are informational.
- Transactional/auth-flow pages (success, cancel, reset-password) intentionally noindex; their remaining gaps are low priority.
