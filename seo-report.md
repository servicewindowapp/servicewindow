# ServiceWindow — Nightly SEO Audit

**Date:** 2026-09-28
**Pages audited:** 15
**Total issues found:** 28
**Report only — no HTML files were modified.**

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag, leaving them without an explicit self-referencing URL signal for search engines.
2. **Meta descriptions out of the 120–160 char range on 8 pages** — `marketplace.html` (161, slightly over) and `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` (all under 120, several far under) are under-optimized for SERP snippet length.
3. **Open Graph title/description/url missing on 3 transactional pages** — `success.html`, `cancel.html`, `reset-password.html` only carry `og:image`; social/link-preview shares of these pages will show no title or description.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | `og:url` (`https://servicewindow.app`) lacks trailing slash present on canonical (`https://servicewindow.app/`) — minor inconsistency |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 max |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ⚠️ | Description below 120 min; canonical tag missing; `robots: noindex, nofollow` set (likely intentional for an auth page, but flagged per checklist) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ⚠️ | Description below 120 min; no JSON-LD schema (optional — only required on index.html) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ⚠️ | Description below 120 min (close); canonical tag missing; no schema (optional) |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ⚠️ | Description below 120 min; canonical tag missing; no schema (optional) |
| success.html | ✅ | ⚠️ (48) | ⚠️ | ❌ | ⚠️ | Description far below 120 min; `og:title`/`og:description`/`og:url` missing (only `og:image` present); canonical missing; `robots: noindex, nofollow` set (likely intentional post-checkout page); no schema (optional) |
| cancel.html | ✅ | ⚠️ (53) | ⚠️ | ❌ | ⚠️ | Description far below 120 min; `og:title`/`og:description`/`og:url` missing (only `og:image` present); canonical missing; `robots: noindex, nofollow` set (likely intentional); no schema (optional) |
| reset-password.html | ✅ | ⚠️ (34) | ⚠️ | ❌ | ⚠️ | Description far below 120 min; `og:title`/`og:description`/`og:url` missing (only `og:image` present); canonical missing; `robots: noindex, nofollow` set (likely intentional); no schema (optional) |

---

## Checklist Legend
- ✅ Pass
- ⚠️ Present but needs improvement / optional item missing
- ❌ Fail / missing

## Notes
- **Schema markup**: The checklist only requires JSON-LD structured data on `index.html` at minimum. That requirement is met — `index.html` has valid `application/ld+json`. Schema is also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. It's absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — flagged as optional/⚠️ since not required by the checklist.
- **`robots: noindex, nofollow`** appears on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. These are account/transactional utility pages, so noindexing them is standard SEO practice and likely intentional — flagged here only because the checklist item explicitly asks to confirm no production page in the audited list carries `noindex`.
- All 15 pages have a present, non-blank, non-placeholder `<title>` tag.
- All 15 pages have an `og:image` tag pointing to `https://servicewindow.app/og-image.png`.
