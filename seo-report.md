# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-08-05
**Pages audited:** 15
**Total issues found:** 21

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 of 15 pages (`auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`). Canonical tags prevent duplicate-content ambiguity and should be added to every page.
2. **Missing Open Graph tags** (`og:title`, `og:description`, `og:url`) on the three transactional pages — `success.html`, `cancel.html`, `reset-password.html`. Only `og:image` is set on these, so shared links render with no title/description in previews.
3. **Meta descriptions outside the 120–160 char target** on 8 pages — one slightly over (`marketplace.html`, 163 chars) and seven under, several far under (`reset-password.html` at 34 chars, `success.html` at 48, `cancel.html` at 53). Short descriptions waste SERP snippet real estate.

*Note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. Flagged per audit criteria since these are production pages, but noindexing account/transactional flows is standard practice and likely intentional — confirm before changing.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163, 3 over) | ✅ | ✅ | ✅ | Description 3 chars over 160 limit |
| find-trucks.html | ✅ | ✅ (157) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97, under 120) | ✅ | ❌ | — | Description too short; missing canonical; robots noindex (likely intentional) |
| pricing.html | ✅ | ✅ (136) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100, under 120) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (133) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118, under 120) | ✅ | ❌ | — | Description slightly short; missing canonical |
| terms.html | ✅ | ⚠️ (94, under 120) | ✅ | ❌ | — | Description too short; missing canonical |
| success.html | ✅ | ⚠️ (48, well under 120) | ❌ | ❌ | — | Description too short; missing og:title/og:description/og:url; missing canonical; robots noindex (likely intentional) |
| cancel.html | ✅ | ⚠️ (53, well under 120) | ❌ | ❌ | — | Description too short; missing og:title/og:description/og:url; missing canonical; robots noindex (likely intentional) |
| reset-password.html | ✅ | ⚠️ (34, well under 120) | ❌ | ❌ | — | Description too short; missing og:title/og:description/og:url; missing canonical; robots noindex (likely intentional) |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail/missing · — not applicable (schema only required on index.html per audit scope)

## Notes

- `og:image` is present and consistent (`https://servicewindow.app/og-image.png`) across all 15 pages.
- Schema markup (`application/ld+json`) is present on `index.html` (meets minimum requirement) and additionally on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. Absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and the three transactional pages — not flagged as failures since schema is only required on `index.html` per audit scope.
- No blank or placeholder `<title>` tags found on any audited page.
- This is a report-only audit — no HTML files were modified.
