# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-21
**Scope:** 15 production HTML pages (root-level, GitHub Pages)

## Summary

- **Pages audited:** 15
- **Total issues found:** 21 (excludes optional schema-markup gaps, listed separately below)
- **Pages with zero issues:** 7 (`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`)

### Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Canonical tags prevent duplicate-content ambiguity and should be added even on noindexed/utility pages for consistency.
2. **Incomplete Open Graph tags on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` are all missing `og:title`, `og:description`, and `og:url` (only `og:image` is present). Any shared link to these pages will render a broken/generic social preview.
3. **Meta description length out of the 120–160 char target** on 8 pages — most notably `terms.html` (92), `success.html` (48), `reset-password.html` (34), and `cancel.html` (53) are far under the minimum; `auth.html` (95) and `contact.html` (98) are moderately short; `privacy.html` (116) is slightly short; `marketplace.html` (161) is 1 character over.

**Note on `robots noindex`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This is flagged per the audit checklist (item 9) but is very likely intentional — these are account/transactional pages with no standalone SEO value. Flagged for confirmation, not treated as a required fix.

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (161 chars, 1 over) | ✅ | ✅ | ✅ | Description 1 char over 160 max — trim slightly |
| `find-trucks.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ (95 chars, under 120) | ✅ | ❌ Missing | ⚠️ Absent (optional) | Missing canonical tag; description under 120-char minimum; `robots: noindex, nofollow` present (verify intentional) |
| `pricing.html` | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ (98 chars, under 120) | ✅ | ✅ | ⚠️ Absent (optional) | Description under 120-char minimum |
| `jobs.html` | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (116 chars, under 120) | ✅ | ❌ Missing | ⚠️ Absent (optional) | Missing canonical tag; description slightly under 120-char minimum |
| `terms.html` | ✅ | ❌ (92 chars, well under 120) | ✅ | ❌ Missing | ⚠️ Absent (optional) | Missing canonical tag; description well under 120-char minimum |
| `success.html` | ✅ | ❌ (48 chars, well under 120) | ❌ Missing og:title/description/url | ❌ Missing | ⚠️ Absent (optional) | Missing canonical; missing og:title, og:description, og:url; description far under minimum; `robots: noindex, nofollow` present (verify intentional) |
| `cancel.html` | ✅ | ❌ (53 chars, well under 120) | ❌ Missing og:title/description/url | ❌ Missing | ⚠️ Absent (optional) | Missing canonical; missing og:title, og:description, og:url; description far under minimum; `robots: noindex, nofollow` present (verify intentional) |
| `reset-password.html` | ✅ | ❌ (34 chars, well under 120) | ❌ Missing og:title/description/url | ❌ Missing | ⚠️ Absent (optional) | Missing canonical; missing og:title, og:description, og:url; description far under minimum; `robots: noindex, nofollow` present (verify intentional) |

---

## Notes

- **Schema markup** (`<script type="application/ld+json">`) is only required on `index.html` per the audit spec — that requirement is met. It's also present (bonus) on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — not a hard requirement on these pages, but adding basic `WebPage`/`Organization` schema would be a low-cost improvement.
- All present `og:url` and `<link rel="canonical">` tags correctly use the `servicewindow.app` domain.
- No page in scope had a blank or placeholder `<title>`.
- This is a report-only audit — no HTML files were modified.
