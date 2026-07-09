# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-09
**Pages audited:** 15
**Total issues found:** 27

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` currently have no canonical tag, risking duplicate-content ambiguity for search engines.
2. **Complete Open Graph tags on post-auth/checkout pages** — `success.html`, `cancel.html`, and `reset-password.html` have only `og:image`; they're missing `og:title`, `og:description`, and `og:url`, so social/messenger share previews for these URLs will render blank or fall back to defaults.
3. **Fix meta description lengths** — 8 of 15 pages fall outside the 120–160 character sweet spot (`marketplace.html` slightly over; `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` all under, several drastically so, e.g. `reset-password.html` at 34 characters). Short descriptions waste SERP snippet real estate.

Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` also carry `<meta name="robots" content="noindex, nofollow">`, which fails check #9 ("not set to noindex on any production page") as literally specified. These are transactional/utility pages (login, post-checkout, password reset) where noindex is a common and likely intentional choice — flagged here for the team to confirm rather than treated as an outright defect.

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars — over limit) | ✅ | ✅ | ✅ | Description 3 chars over the 160-char max |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars — under limit) | ✅ | ❌ Missing | ⚠️ Not present (not required off homepage) | Missing canonical; description too short; `robots: noindex, nofollow` set (confirm intentional) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars — under limit) | ✅ | ✅ | ⚠️ Not present (not required off homepage) | Description too short |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars — just under limit) | ✅ | ❌ Missing | ⚠️ Not present (not required off homepage) | Missing canonical; description 2 chars short |
| terms.html | ✅ | ⚠️ (94 chars — under limit) | ✅ | ❌ Missing | ⚠️ Not present (not required off homepage) | Missing canonical; description too short |
| success.html | ✅ | ⚠️ (48 chars — under limit) | ❌ Only og:image present | ❌ Missing | ⚠️ Not present (not required off homepage) | Missing og:title/og:description/og:url; missing canonical; description too short; `noindex` set (confirm intentional) |
| cancel.html | ✅ | ⚠️ (53 chars — under limit) | ❌ Only og:image present | ❌ Missing | ⚠️ Not present (not required off homepage) | Missing og:title/og:description/og:url; missing canonical; description too short; `noindex` set (confirm intentional) |
| reset-password.html | ✅ | ⚠️ (34 chars — under limit) | ❌ Only og:image present | ❌ Missing | ⚠️ Not present (not required off homepage) | Missing og:title/og:description/og:url; missing canonical; description too short; `noindex` set (confirm intentional) |

## Methodology
- Checked `<title>`, `<meta name="description">`, `og:title`/`og:description`/`og:url`/`og:image`, `<link rel="canonical">`, `application/ld+json` schema blocks, and `<meta name="robots">` on each page's raw HTML.
- Description length target: 120–160 characters (Google's typical snippet render width).
- Schema markup is required at minimum on `index.html` per audit scope; its absence elsewhere is flagged as a recommendation (⚠️), not a hard failure.
- This is a report only — no HTML files were modified.
