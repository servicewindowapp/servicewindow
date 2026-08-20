# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-20
**Pages audited:** 15
**Total issues found:** 21

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 of 15 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Canonical tags prevent duplicate-content issues and should be on every page.
2. **Incomplete Open Graph tags on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` each have only `og:image`; they're missing `og:title`, `og:description`, and `og:url`. Low priority for search/social since these are noindex pages, but cheap to fix for consistency.
3. **Meta descriptions outside the 120–160 character target** — `auth.html` (95), `contact.html` (98), `terms.html` (92), `privacy.html` (116, borderline), plus all three transactional pages are well under range; `marketplace.html` is 1 character over (161).

## Findings

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars — 1 over max) | ✅ | ✅ | ✅ | Description 1 char over 160-char max |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95 chars — under 120 min) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; description too short; `robots: noindex, nofollow` set (likely intentional for an auth page, but flagged per checklist) |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98 chars — under 120 min) | ✅ | ✅ | ❌ Missing | Description too short; no schema markup (not required outside index.html, noted for completeness) |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars — 4 under min) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; description slightly short |
| terms.html | ✅ | ❌ (92 chars — under 120 min) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; description too short |
| success.html | ✅ | ❌ (48 chars — under 120 min) | ⚠️ Only `og:image` present | ❌ Missing | ❌ Missing | Missing `og:title`/`og:description`/`og:url`; no canonical tag; description too short; `robots: noindex, nofollow` set (expected for post-checkout page) |
| cancel.html | ✅ | ❌ (53 chars — under 120 min) | ⚠️ Only `og:image` present | ❌ Missing | ❌ Missing | Missing `og:title`/`og:description`/`og:url`; no canonical tag; description too short; `robots: noindex, nofollow` set (expected for post-checkout page) |
| reset-password.html | ✅ | ❌ (34 chars — under 120 min) | ⚠️ Only `og:image` present | ❌ Missing | ❌ Missing | Missing `og:title`/`og:description`/`og:url`; no canonical tag; description too short; `robots: noindex, nofollow` set (expected for account-utility page) |

## Notes

- All 15 pages have a present, non-blank, descriptive `<title>` tag. No issues there.
- Schema markup (`application/ld+json`) is present on `index.html` as required by the checklist, plus `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. It's absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — not required by the checklist beyond index.html, listed here for completeness only.
- `robots: noindex, nofollow` appears on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. These are all auth/transactional/utility pages, so noindex is standard SEO practice and likely intentional rather than a defect — flagged here only because the checklist asks to confirm no production page is noindexed.
- No HTML files were modified as part of this audit — report only.
