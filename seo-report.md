# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-25
**Pages audited:** 15
**Total issues found:** 27

## Top 3 Priority Fixes

1. **Missing canonical tags on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no `<link rel="canonical">`. Add one on every page.
2. **Missing Open Graph tags on the post-checkout/utility pages** — `success.html`, `cancel.html`, and `reset-password.html` are missing `og:title`, `og:description`, and `og:url` (only `og:image` is present). Any link shared to these URLs will render a broken/incomplete preview.
3. **Meta descriptions outside the 120–160 char target on 8 pages** — too short: `auth.html` (95), `contact.html` (98), `privacy.html` (116), `terms.html` (92), `success.html` (48), `cancel.html` (53), `reset-password.html` (34); too long: `marketplace.html` (161, 1 over limit).

*Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are set to `noindex, nofollow`. This is common practice for transactional/auth pages, but is flagged below per audit criteria since these are in the production page list — confirm this is intentional.*

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161, 1 over) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95, too short) | ✅ | ❌ | ➖ | Missing canonical; description too short; `noindex, nofollow` set |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98, too short) | ✅ | ✅ | ➖ | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116, too short) | ✅ | ❌ | ➖ | Missing canonical; description slightly short |
| terms.html | ✅ | ⚠️ (92, too short) | ✅ | ❌ | ➖ | Missing canonical; description too short |
| success.html | ✅ | ⚠️ (48, too short) | ❌ | ❌ | ➖ | Missing canonical; missing og:title/og:description/og:url; description too short; `noindex, nofollow` set |
| cancel.html | ✅ | ⚠️ (53, too short) | ❌ | ❌ | ➖ | Missing canonical; missing og:title/og:description/og:url; description too short; `noindex, nofollow` set |
| reset-password.html | ✅ | ⚠️ (34, too short) | ❌ | ❌ | ➖ | Missing canonical; missing og:title/og:description/og:url; description too short; `noindex, nofollow` set |

**Legend:** ✅ pass · ❌ fail · ⚠️ present but needs improvement · ➖ not required by audit criteria (schema markup is only required on `index.html` at minimum) but absent

### Notes
- Titles: all 15 pages have present, descriptive `<title>` tags — no blanks or placeholders found.
- OG image: present and consistent (`https://servicewindow.app/og-image.png`) across all 15 pages.
- Canonical URLs, where present, correctly use the `servicewindow.app` domain.
- Schema markup (`application/ld+json`) is present on `index.html` (satisfies the minimum requirement) plus 8 other pages; absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` — not a failure per audit scope, listed for completeness.
- No unexpected `noindex` was found outside the 4 transactional/auth pages noted above.

*This is a report only — no HTML files were modified.*
