# ServiceWindow SEO & Metadata Audit

**Date:** 2026-09-08
**Pages audited:** 15
**Total issues found:** 28
**Scope:** `index.html`, `marketplace.html`, `find-trucks.html`, `auth.html`, `pricing.html`, `about.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`

Report only — no HTML files were modified.

## Top 3 Priority Fixes

1. **Add self-referencing `<link rel="canonical">` tags** — missing on 6 pages: `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. One-line fix per page; prevents duplicate-content ambiguity even on noindexed/utility pages.
2. **Add full Open Graph tags** (`og:title`, `og:description`, `og:url`) to `success.html`, `cancel.html`, `reset-password.html` — currently only `og:image` is set on these, so any shared link (e.g. a support or reset link) renders a broken/generic social preview.
3. **Rewrite meta descriptions outside the 120–160 char target** — 7 pages are too short (`auth.html` 97, `contact.html` 100, `privacy.html` 118, `terms.html` 94, `success.html` 48, `cancel.html` 53, `reset-password.html` 34) and `marketplace.html` is 3 chars over (163). Affects SERP snippet quality and CTR.

Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` carry `<meta name="robots" content="noindex, nofollow">`. This is standard practice for gated/transactional pages and is likely intentional, but is flagged below since these pages were in the audited production list — confirm it's deliberate rather than left over from a template.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | `og:url` has no trailing slash (`servicewindow.app`) vs canonical which does (`servicewindow.app/`) — cosmetic mismatch, low priority |
| marketplace.html | ✅ | ⚠️ (163 chars) | ✅ | ✅ | ✅ | Description 3 chars over 160 max — trim slightly |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars) | ✅ | ❌ Missing | N/A | Missing canonical tag; description under 120 min; `robots: noindex, nofollow` present (expected for gated auth page — confirm intentional) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars) | ✅ | ✅ | N/A | Description under 120 min (no schema present — optional `ContactPage` markup would be a nice-to-have, not required) |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars) | ✅ | ❌ Missing | N/A | Missing canonical tag; description 2 chars under 120 min |
| terms.html | ✅ | ⚠️ (94 chars) | ✅ | ❌ Missing | N/A | Missing canonical tag; description under 120 min |
| success.html | ✅ | ❌ (48 chars) | ❌ Partial | ❌ Missing | N/A | Missing canonical; `og:title`/`og:description`/`og:url` all missing (only `og:image` set); description far under target; `robots: noindex, nofollow` present (expected for post-checkout page) |
| cancel.html | ✅ | ❌ (53 chars) | ❌ Partial | ❌ Missing | N/A | Missing canonical; `og:title`/`og:description`/`og:url` all missing (only `og:image` set); description far under target; `robots: noindex, nofollow` present (expected for post-checkout page) |
| reset-password.html | ✅ | ❌ (34 chars) | ❌ Partial | ❌ Missing | N/A | Missing canonical; `og:title`/`og:description`/`og:url` all missing (only `og:image` set); description far under target; `robots: noindex, nofollow` present (expected for password-reset page) |

### Notes

- **Schema markup**: required only on `index.html` at minimum — that requirement is met (`WebSite` + `Organization`). `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html` all also carry appropriate JSON-LD (`CollectionPage`, `WebPage`, `AboutPage`, `Service`, etc.) — no action needed. Utility/legal/transactional pages (`auth`, `contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) have none, which is acceptable (marked N/A).
- **Domain consistency**: every `og:url` and `<link rel="canonical">` that is present correctly uses the `servicewindow.app` production domain — no staging/localhost leaks found.
- **`og:image`**: present and pointing to `https://servicewindow.app/og-image.png` on all 15 pages, including the three that are otherwise missing OG title/description/url. The referenced file exists in the repo root.
- **Robots directives**: no production/marketing page (`index`, `marketplace`, `find-trucks`, `pricing`, `about`, `contact`, `jobs`, `venues`, `property`, `privacy`, `terms`) is set to `noindex`. The four flagged above (`auth`, `success`, `cancel`, `reset-password`) are gated/transactional pages where `noindex` is common practice, not a bug — included here per the audit's page list, not as an urgent fix.
