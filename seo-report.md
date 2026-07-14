# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-14
**Pages audited:** 15
**Total issues found:** 27
**Legend:** ✅ Pass · ⚠️ Present but needs improvement · ❌ Fail / missing

## Top 3 Priority Fixes

1. **`success.html`, `cancel.html`, `reset-password.html` are missing nearly all social/SEO metadata** — no `og:title`, `og:description`, `og:url`, or `<link rel="canonical">` on any of the three. These account for 18 of the 27 issues found.
2. **Meta descriptions are under the 120-character minimum on 7 pages** (`auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`) — several (`reset-password.html` at 34 chars, `success.html` at 48 chars) are far too short to form a useful search snippet.
3. **Canonical tags are missing on 6 pages** (`auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`), leaving those URLs without a self-referencing canonical.

*Note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are set to `noindex, nofollow`. This is flagged below per the audit checklist since these pages are in the production-pages list, but it may be an intentional choice for transactional/account pages — confirm with the team before changing.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars — 1 over limit) | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95 chars — under 120) | ✅ | ❌ Missing | ❌ Missing | Description too short; canonical missing; `robots: noindex, nofollow` on a listed production page |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98 chars — under 120) | ✅ | ✅ | ❌ Missing | Description too short |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ❌ (116 chars — under 120) | ✅ | ❌ Missing | ❌ Missing | Description too short; canonical missing |
| terms.html | ✅ | ❌ (92 chars — under 120) | ✅ | ❌ Missing | ❌ Missing | Description too short; canonical missing |
| success.html | ✅ | ❌ (48 chars — under 120) | ❌ Missing og:title, og:description, og:url (only og:image present) | ❌ Missing | ❌ Missing | Description too short; og:title/og:description/og:url missing; canonical missing; `robots: noindex, nofollow` on a listed production page |
| cancel.html | ✅ | ❌ (53 chars — under 120) | ❌ Missing og:title, og:description, og:url (only og:image present) | ❌ Missing | ❌ Missing | Description too short; og:title/og:description/og:url missing; canonical missing; `robots: noindex, nofollow` on a listed production page |
| reset-password.html | ✅ | ❌ (34 chars — under 120) | ❌ Missing og:title, og:description, og:url (only og:image present) | ❌ Missing | ❌ Missing | Description too short; og:title/og:description/og:url missing; canonical missing; `robots: noindex, nofollow` on a listed production page |

## Notes

- **Schema markup** (`<script type="application/ld+json">`) is present on `index.html` as required, and also on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — not required by the audit spec for these pages, noted for completeness only.
- All 15 pages have a present and descriptive `<title>` tag.
- All 15 pages have an `og:image` tag pointing to `https://servicewindow.app/og-image.png`.
- Where present, all `og:url` and `<link rel="canonical">` values correctly use the `servicewindow.app` domain.
