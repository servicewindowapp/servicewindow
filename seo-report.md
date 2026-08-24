# SEO & Metadata Audit — ServiceWindow

**Run date:** 2026-08-24
**Pages audited:** 15 production pages (index, marketplace, find-trucks, auth, pricing, about, contact, jobs, venues, property, privacy, terms, success, cancel, reset-password)
**Total issues found:** 21
**Report-only run — no HTML files were modified.**

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all, risking duplicate-content ambiguity for any page that is indexable.
2. **Missing full Open Graph set on transactional pages** — `success.html`, `cancel.html`, `reset-password.html` only carry `og:image`; they're missing `og:title`, `og:description`, and `og:url`, so any shared link renders a broken/blank social preview.
3. **Meta descriptions outside the 120–160 char target on 8 pages** — most severe on `reset-password.html` (34 chars), `success.html` (48 chars), and `cancel.html` (53 chars); also short on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and slightly over on `marketplace.html` (163 chars).

*Note on `robots noindex`:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This fails audit criterion #9 as written, but for an auth/transactional flow this is likely an intentional choice rather than a bug — flagged here for visibility, not necessarily a fix.

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163, 3 over max) | ✅ | ✅ | ✅ | Description 3 chars over 160 max |
| find-trucks.html | ✅ | ✅ (157) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97, under min) | ✅ | ❌ Missing | ❌ None | Missing canonical; no schema; description under 120 min; robots noindex (see note) |
| pricing.html | ✅ | ✅ (136) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100, under min) | ✅ | ✅ | ❌ None | Description under 120 min; no schema (not required) |
| jobs.html | ✅ | ✅ (133) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118, 2 under min) | ✅ | ❌ Missing | ❌ None | Missing canonical; description 2 chars under 120 min |
| terms.html | ✅ | ⚠️ (94, under min) | ✅ | ❌ Missing | ❌ None | Missing canonical; description under 120 min |
| success.html | ✅ | ⚠️ (48, far under min) | ❌ Missing title/desc/url | ❌ Missing | ❌ None | Missing canonical; missing og:title/og:description/og:url; description far under min; robots noindex (see note) |
| cancel.html | ✅ | ⚠️ (53, far under min) | ❌ Missing title/desc/url | ❌ Missing | ❌ None | Missing canonical; missing og:title/og:description/og:url; description far under min; robots noindex (see note) |
| reset-password.html | ✅ | ⚠️ (34, far under min) | ❌ Missing title/desc/url | ❌ Missing | ❌ None | Missing canonical; missing og:title/og:description/og:url; description far under min; robots noindex (see note) |

### Notes
- All 15 pages have a present, non-placeholder `<title>`.
- All present `og:url` and `<link rel="canonical">` values correctly use the `servicewindow.app` domain.
- All 15 pages have `og:image` set.
- Schema markup (`application/ld+json`) is present on `index.html` (audit minimum requirement, satisfied) and also on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`. It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` — not a required-criteria failure for these pages, but a low-effort opportunity for `contact.html` in particular (public, indexable page).
