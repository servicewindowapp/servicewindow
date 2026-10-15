# SEO Audit Report — 2026-10-15

## Summary
- **Pages audited:** 15
- **Total issues found:** 27 (across 9 pages; 6 pages fully clean)
- **Schema:** index.html has JSON-LD ✅. Schema is also present on marketplace, find-trucks, pricing, about, jobs, venues and property.

### Top 3 priority fixes
1. **success.html, cancel.html, reset-password.html** — missing `og:title`, `og:description`, `og:url` and `<link rel="canonical">`, with meta descriptions of only 34–53 chars. These pages are also `noindex` (see note below).
2. **auth.html, privacy.html, terms.html** — missing `<link rel="canonical">`. auth.html is also `noindex, nofollow` and its description is 95 chars. privacy/terms descriptions are 116 and 92 chars (target 120–160).
3. **contact.html (98 chars) and marketplace.html (161 chars)** — meta descriptions outside the 120–160 range.

> **Noindex note:** auth, success, cancel and reset-password are `noindex, nofollow`. That is normally correct for transactional pages. They are flagged ⚠️ because the audit rule says no production page should be noindex. Confirm the intent and drop the rule for these pages if so.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ❌ | Description too short; no canonical; `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ❌ | Description too short; no schema (optional) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ | Description 4 chars short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ❌ | Description too short; no canonical |
| success.html | ✅ | ⚠️ (48) | ❌ (og:image only) | ❌ | ❌ | Description too short; missing og:title, og:description, og:url; no canonical; `noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53) | ❌ (og:image only) | ❌ | ❌ | Description too short; missing og:title, og:description, og:url; no canonical; `noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34) | ❌ (og:image only) | ❌ | ❌ | Description too short; missing og:title, og:description, og:url; no canonical; `noindex, nofollow` |

Notes: `og:image` is present on all 15 pages and points to `https://servicewindow.app/og-image.png`, which exists in the repo. Every `og:url` and canonical that is present uses the servicewindow.app domain. Schema is only required on index.html.
