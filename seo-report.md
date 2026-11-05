# SEO & Metadata Audit — servicewindow.app

**Date:** 2026-11-05 · **Pages audited:** 15 · **Total issues found:** 23 (14 ❌/noindex-or-missing, 9 ⚠️)

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. "OG Tags" covers og:title, og:description, og:url, og:image. Report only — no HTML modified.

## Top 3 priority fixes
1. **Add `<link rel="canonical">` to 6 pages** — auth, privacy, terms, success, cancel, reset-password have none.
2. **Add og:title / og:description / og:url to success, cancel, reset-password** — only og:image is present on these three.
3. **Fix `noindex` and short meta descriptions** — auth, success, cancel and reset-password are `noindex, nofollow` (the audit rule says no production page should be noindex; likely intentional for utility pages, so confirm the policy). Meta descriptions under 120 chars: auth (95), contact (98), privacy (116), terms (92), success (48), cancel (53), reset-password (34).

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ (Organization, WebSite+SearchAction) | og:url `https://servicewindow.app` lacks trailing slash vs canonical `/` |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ❌ | Missing canonical; `robots: noindex, nofollow`; description too short |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ❌ | Description too short; no schema (not required) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | Copy says "21 SWFL cities" (rule: always 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ | Missing canonical; description slightly short |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ❌ | Missing canonical; description too short |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | ❌ | Missing og:title/description/url; missing canonical; `noindex, nofollow`; description too short |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | ❌ | Missing og:title/description/url; missing canonical; `noindex, nofollow`; description too short |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | ❌ | Missing og:title/description/url; missing canonical; `noindex, nofollow`; description too short |

## Notes
- All present og:url / og:image / canonical values use the `servicewindow.app` domain; `og-image.png` exists in the repo root.
- Schema is required only on index.html (passes). Other pages without schema are marked ❌ for information only and are not counted as issues.
- Out of scope but spotted: the "21 cities" copy also appears in api.html, marketplace.html, property.html, swfl-food-truck-catering.html and swfl-food-truck-report.html.
