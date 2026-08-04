# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-04
**Pages audited:** 15 (production HTML pages)
**Total issues found:** 24

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. No canonical tag leaves URL variants (trailing slashes, query params) open to duplicate-content ambiguity.
2. **Missing Open Graph title/description/url on transactional pages** — `success.html`, `cancel.html`, `reset-password.html` have `og:image` only. If these URLs are ever shared (e.g. a support link), they'll render with no title/description in the preview card.
3. **Meta descriptions outside the 120–160 char target on 7 pages** — `auth.html` (97), `contact.html` (100), `terms.html` (94), `privacy.html` (118), `success.html` (48), `cancel.html` (53), `reset-password.html` (34) are too short (truncated/unoptimized SERP snippets); `marketplace.html` (163) is slightly over.

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars, 3 over max) | ✅ | ✅ | ✅ | Description 3 chars over 160 max |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (97 chars, below 120 min) | ✅ | ❌ Missing | — (not required) | Missing canonical; description too short; `robots: noindex, nofollow` present (likely intentional for a login page — confirm) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (100 chars, below 120 min) | ✅ | ✅ | — (not required) | Description too short |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | `og:description` says "21 SWFL cities" — CLAUDE.md mandates city count is always 22 |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars, 2 under min) | ✅ | ❌ Missing | — (not required) | Missing canonical; description slightly short |
| terms.html | ✅ | ❌ (94 chars, below 120 min) | ✅ | ❌ Missing | — (not required) | Missing canonical; description too short |
| success.html | ✅ | ❌ (48 chars) | ❌ (og:image only) | ❌ Missing | — (not required) | Missing og:title/og:description/og:url; missing canonical; description too short; `robots: noindex, nofollow` present (likely intentional for post-checkout page — confirm) |
| cancel.html | ✅ | ❌ (53 chars) | ❌ (og:image only) | ❌ Missing | — (not required) | Missing og:title/og:description/og:url; missing canonical; description too short; `robots: noindex, nofollow` present (likely intentional for post-checkout page — confirm) |
| reset-password.html | ✅ | ❌ (34 chars) | ❌ (og:image only) | ❌ Missing | — (not required) | Missing og:title/og:description/og:url; missing canonical; description too short; `robots: noindex, nofollow` present (likely intentional for a utility page — confirm) |

## Notes

- **Schema markup**: required at minimum on `index.html` — present (`WebSite` + `Organization` JSON-LD). Also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`. Absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and the three transactional pages — not a failure per the audit spec (only required on the homepage), listed here for visibility.
- **`robots: noindex`** appears on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. These are login/checkout/utility pages where noindex is standard practice, so this is flagged for confirmation rather than treated as a defect.
- All `og:url` and `<link rel="canonical">` values that are present correctly use the `servicewindow.app` domain.
- This is a report only — no HTML files were modified.
