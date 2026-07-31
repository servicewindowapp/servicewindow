# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-31
**Pages audited:** 15
**Total issues found:** 27
**Scope:** Report only — no HTML files were modified.

## Top 3 Priority Fixes

1. **Missing canonical + Open Graph tags on transactional/legal pages** — `auth.html`, `success.html`, `cancel.html`, `reset-password.html`, `privacy.html`, and `terms.html` are missing `<link rel="canonical">`. `success.html`, `cancel.html`, and `reset-password.html` are additionally missing `og:title`, `og:description`, and `og:url` entirely (only `og:image`/`twitter:image` are present on these three).
2. **Meta descriptions outside the 120–160 character target on 7 pages** — `auth.html` (95), `contact.html` (98), `privacy.html` (116), `terms.html` (92), `success.html` (48), `cancel.html` (53), and `reset-password.html` (34) are all under 120 characters. `marketplace.html` is 1 character over (161).
3. **`noindex, nofollow` present on 4 in-scope pages** — `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all set `<meta name="robots" content="noindex, nofollow">`. This is common/expected for transactional pages (login, post-Stripe redirects, password reset) but is flagged here since these pages were included in the production audit list — confirm this is intentional rather than left over from staging.

## Findings

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ 161 chars (1 over limit) | ✅ | ✅ | ✅ | Trim description by 1+ char |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ 95 chars (too short) | ✅ | ❌ Missing | ⚠️ None (not required) | `robots: noindex, nofollow` set; no canonical; description too short |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ 98 chars (too short) | ✅ | ✅ | ⚠️ None (not required) | Description too short |
| jobs.html | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ 116 chars (slightly short) | ✅ | ❌ Missing | ⚠️ None (not required) | No canonical; description just under 120 |
| terms.html | ✅ | ❌ 92 chars (too short) | ✅ | ❌ Missing | ⚠️ None (not required) | No canonical; description too short |
| success.html | ✅ | ❌ 48 chars (too short) | ❌ og:title/og:description/og:url missing (og:image only) | ❌ Missing | ⚠️ None (not required) | `robots: noindex, nofollow` set; no canonical; incomplete OG tags; description too short |
| cancel.html | ✅ | ❌ 53 chars (too short) | ❌ og:title/og:description/og:url missing (og:image only) | ❌ Missing | ⚠️ None (not required) | `robots: noindex, nofollow` set; no canonical; incomplete OG tags; description too short |
| reset-password.html | ✅ | ❌ 34 chars (too short) | ❌ og:title/og:description/og:url missing (og:image only) | ❌ Missing | ⚠️ None (not required) | `robots: noindex, nofollow` set; no canonical; incomplete OG tags; description too short |

### Notes

- **Schema markup**: Required only on `index.html` per audit scope, and present there (`✅`). Also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` (bonus, not required). Absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — marked ⚠️ since it isn't required on these page types, not a failure.
- **og:url domain**: Every `og:url` and `<link rel="canonical">` that is present correctly uses the `servicewindow.app` domain. No domain-mismatch issues found.
- **Titles**: All 15 pages have a unique, descriptive `<title>` — no blanks or placeholders found.
- **Twitter cards**: Present on `index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `success.html`, `cancel.html`, and `reset-password.html`. Not present on `auth.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html`, `privacy.html`, `terms.html`. Not part of the required checklist, so not scored, but noted for completeness.
