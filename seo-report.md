# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-01
**Pages audited:** 15
**Total issues found:** 27

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 of 15 pages: `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. This is the single biggest structural gap in the audit and risks duplicate-content ambiguity for any of these pages that do get crawled.
2. **Missing Open Graph tags (`og:title`, `og:description`, `og:url`)** on `success.html`, `cancel.html`, `reset-password.html` — only `og:image` is present on these. Any social/link-preview share of these post-checkout/reset flows will render with blank or fallback text.
3. **Meta description length out of the 120–160 char target** on 8 pages — most notably `reset-password.html` (34 chars), `success.html` (48), `cancel.html` (53), `terms.html` (92), `auth.html` (95), `contact.html` (98), `privacy.html` (116), and `marketplace.html` (161, 1 char over). Also flagging: `<meta name="robots" content="noindex, nofollow">` is present on `auth.html`, `success.html`, `cancel.html`, `reset-password.html` — likely intentional for these auth/transactional flows, but called out here since they're in-scope production pages per the audit criteria and worth an explicit sign-off.

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160-char max |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ➖ | Description too short (95, need 120–160); canonical missing; `robots: noindex, nofollow` present |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ➖ | Description too short (98, need 120–160) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ➖ | Description too short (116, need 120–160); canonical missing |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ➖ | Description too short (92, need 120–160); canonical missing |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | ➖ | Description too short (48); og:title/description/url missing (og:image only); canonical missing; `robots: noindex, nofollow` present |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | ➖ | Description too short (53); og:title/description/url missing (og:image only); canonical missing; `robots: noindex, nofollow` present |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | ➖ | Description too short (34); og:title/description/url missing (og:image only); canonical missing; `robots: noindex, nofollow` present |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail · ➖ not applicable (schema markup only required on index.html at minimum)

**Notes:**
- Schema (`application/ld+json`) is present on `index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`. It is not required on the remaining pages per the audit spec, so absence there is marked ➖ rather than ❌.
- No production page in this list has `og:image` missing — all 15 pages include it.
- Report only — no HTML files were modified as part of this audit.
