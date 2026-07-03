# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-03
**Pages audited:** 15
**Total issues found:** 27 (strict criteria failures; does not include optional schema gaps on non-index pages — see notes)

## Top 3 Priority Fixes

1. **Add Open Graph tags to `success.html`, `cancel.html`, `reset-password.html`.** All three are missing `og:title`, `og:description`, and `og:url` entirely (only `og:image` is present). Any link shared to these pages renders a blank/broken social preview.
2. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. 40% of audited pages have no self-referencing canonical, risking duplicate-content ambiguity.
3. **Fix out-of-range meta descriptions on 8 pages.** `marketplace.html` is 1 character over the 160 max; `auth.html` (95), `contact.html` (98), `privacy.html` (116), `terms.html` (92), `success.html` (48), `cancel.html` (53), and `reset-password.html` (34) are all under the 120 minimum, leaving Google to auto-generate snippets.

**Also flagged:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. Per audit criterion #9 this fails on a "production page," though it is likely intentional for auth/post-checkout flows — confirm intent rather than treating as a blind fix.

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161, 1 over max) | ✅ | ✅ | ✅ | Trim description by 1+ char |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95, under min) | ✅ | ❌ Missing | ⚠️ Absent (optional) | Missing canonical; description under 120 chars; `robots: noindex, nofollow` present |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98, under min) | ✅ | ✅ | ⚠️ Absent (optional) | Description under 120 chars |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116, under min) | ✅ | ❌ Missing | ⚠️ Absent (optional) | Missing canonical; description under 120 chars |
| terms.html | ✅ | ❌ (92, well under min) | ✅ | ❌ Missing | ⚠️ Absent (optional) | Missing canonical; description too short |
| success.html | ✅ | ❌ (48, well under min) | ❌ Missing title/desc/url | ❌ Missing | ⚠️ Absent (optional) | Missing og:title, og:description, og:url; missing canonical; description too short; `robots: noindex, nofollow` present |
| cancel.html | ✅ | ❌ (53, well under min) | ❌ Missing title/desc/url | ❌ Missing | ⚠️ Absent (optional) | Missing og:title, og:description, og:url; missing canonical; description too short; `robots: noindex, nofollow` present |
| reset-password.html | ✅ | ❌ (34, well under min) | ❌ Missing title/desc/url | ❌ Missing | ⚠️ Absent (optional) | Missing og:title, og:description, og:url; missing canonical; description too short; `robots: noindex, nofollow` present |

## Notes

- **Titles:** all 15 pages have present, descriptive, non-placeholder `<title>` tags. No failures.
- **OG tag domain check:** every `og:url` that is present correctly points to the `https://servicewindow.app` domain. No mismatches found.
- **Schema markup:** required only on `index.html` per audit criteria, and it is present there (JSON-LD `application/ld+json`). Schema is also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — not a criteria failure, but worth adding `Organization`/`WebPage` schema to `contact.html`/`privacy.html`/`terms.html` for consistency.
- **Robots:** no page uses `noindex` unexpectedly for a marketing/content page. The 4 flagged pages (`auth.html`, `success.html`, `cancel.html`, `reset-password.html`) are all transactional/account flows where `noindex` is standard practice — flagged per the literal audit criterion but likely by design.

*Report only — no HTML files were modified as part of this audit.*
