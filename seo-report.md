# SEO & Metadata Audit — ServiceWindow

**Run date:** 2026-09-17
**Scope:** 15 production HTML pages (see list below)
**Method:** Automated check of `<title>`, `<meta name="description">`, Open Graph tags, `<link rel="canonical">`, JSON-LD schema, and `<meta name="robots">`. Report only — no HTML files were modified.

## Summary

- **Pages audited:** 15
- **Total issues found:** 14
- **Top 3 priority fixes:**
  1. **Missing canonical tags** on `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` (6 pages) — risk of duplicate-content ambiguity for search engines.
  2. **Missing Open Graph tags** (`og:title`, `og:description`, `og:url`) on `success.html`, `cancel.html`, `reset-password.html` — links to these pages will render with no preview data when shared.
  3. **`noindex, nofollow` set on 4 of the 15 listed production pages** (`auth.html`, `success.html`, `cancel.html`, `reset-password.html`) — likely intentional for transactional/auth pages, but flagged per audit spec since these were included in the production page list. Confirm this is deliberate.

Secondary issues: `about.html` meta description is truncated to 143 characters mid-sentence (cuts off "where we're going" → "where we"), and JSON-LD schema markup is absent from 4 pages (`auth.html`, `contact.html`, `privacy.html`, `terms.html`).

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 — 1 char over) | ✅ | ✅ | ✅ | Description 1 char over 160-char target |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ✅ (95) | ✅ | ❌ | ❌ | No canonical tag; no JSON-LD; `robots: noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ⚠️ (143, truncated mid-word) | ✅ | ✅ | ✅ | Description cuts off ("where we" instead of "where we're going") |
| contact.html | ✅ | ✅ (98) | ✅ | ✅ | ❌ | No JSON-LD schema |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 — under 120 target) | ✅ | ❌ | ❌ | No canonical tag; no JSON-LD; description under 120-char target |
| terms.html | ✅ | ⚠️ (92 — under 120 target) | ✅ | ❌ | ❌ | No canonical tag; no JSON-LD; description under 120-char target |
| success.html | ✅ | ⚠️ (48 — under 120 target) | ❌ | ❌ | ❌ | No canonical, no og:title/og:description/og:url, no JSON-LD, description short; `robots: noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53 — under 120 target) | ❌ | ❌ | ❌ | No canonical, no og:title/og:description/og:url, no JSON-LD, description short; `robots: noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34 — under 120 target) | ❌ | ❌ | ❌ | No canonical, no og:title/og:description/og:url, no JSON-LD, description short; `robots: noindex, nofollow` |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail/missing

## Notes

- **Title tags:** all 15 pages pass — every page has a present, descriptive, non-placeholder `<title>`.
- **og:image:** present on all 15 pages (all reference `https://servicewindow.app/og-image.png`).
- **Schema markup:** present on `index.html` (required minimum met — `WebSite` type) and also on `marketplace.html`, `find-trucks.html`, `pricing.html`, `jobs.html`, `venues.html`, `property.html`. Absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`.
- **robots noindex:** 4 of the 15 audited pages (`auth.html`, `success.html`, `cancel.html`, `reset-password.html`) set `noindex, nofollow`. These are transactional/utility pages, so this is likely correct behavior — but the audit spec asks that no *production* page carry `noindex`, so it's listed here for confirmation rather than silently passed.
- No HTML files were modified as part of this audit.
