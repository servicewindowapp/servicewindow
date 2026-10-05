# ServiceWindow SEO Audit — 2026-10-05

## Summary
- **Pages audited:** 15
- **Issues found:** 22 (across 9 pages; 6 pages clean: index, find-trucks, pricing, about, venues, property)
- **Schema:** `index.html` has JSON-LD ✅

### Top 3 Priority Fixes
1. **Add `<link rel="canonical">` to 6 pages** — auth, privacy, terms, success, cancel, reset-password (all missing).
2. **Resolve `noindex` on 4 pages** — auth, success, cancel, reset-password are `noindex, nofollow`. Likely intentional for transactional pages, but the audit rule forbids noindex on production pages; `auth.html` is the one worth reconsidering (it is the signup entry point).
3. **Fix thin metadata on utility pages** — success, cancel, reset-password have no `og:title`/`og:description`/`og:url` and descriptions of 34–53 chars; auth, contact, privacy, terms descriptions are 92–116 chars (target 120–160).

Also: `jobs.html` og:description says "21 SWFL cities" — project copy rule is 22. `marketplace.html` description is 161 chars (1 over).

## Report

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. Schema is only required on index.html; "—" = none present (not required).

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description too short; canonical missing; robots `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | Description slightly short; canonical missing |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | Description too short; canonical missing |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | — | Description too short; og:title/description/url missing (og:image present); canonical missing; robots `noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | — | Description too short; og:title/description/url missing (og:image present); canonical missing; robots `noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | — | Description too short; og:title/description/url missing (og:image present); canonical missing; robots `noindex, nofollow` |

_Report only — no HTML files were modified._
