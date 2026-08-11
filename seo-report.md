# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-11
**Scope:** 15 production HTML pages (index, marketplace, find-trucks, auth, pricing, about, contact, jobs, venues, property, privacy, terms, success, cancel, reset-password)
**Type:** Automated nightly audit — report only, no files modified

## Summary

- **Pages audited:** 15
- **Total issues found:** 24 (4 ❌ hard fails, 20 ⚠️ needs-improvement flags)
- **Top 3 priority fixes:**
  1. **Missing canonical tags** on 6 pages (`auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`) — add self-referencing `<link rel="canonical">` to each.
  2. **Incomplete Open Graph tags** on `success.html`, `cancel.html`, `reset-password.html` — only `og:image` is present; `og:title`, `og:description`, and `og:url` are missing, so social/messenger link previews will render broken or blank.
  3. **Meta descriptions out of the 120–160 char target** on 7 pages — `reset-password.html` (34), `success.html` (48), `cancel.html` (53), `terms.html` (92), `auth.html` (95), `contact.html` (98), and `privacy.html` (116) are all under-length; `marketplace.html` (161) is 1 char over.

Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This is flagged per the audit checklist but is very likely intentional for transactional/auth pages — confirm before treating as a bug.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95 chars, under min) | ✅ | ❌ Missing | ⚠️ Absent (not required) | No canonical tag; description under 120 chars; `robots: noindex` (likely intentional) |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98 chars, under min) | ✅ | ✅ | ⚠️ Absent (not required) | Description under 120 chars; no schema markup |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars, just under min) | ✅ | ❌ Missing | ⚠️ Absent (not required) | No canonical tag; description slightly under 120 chars |
| terms.html | ✅ | ⚠️ (92 chars, under min) | ✅ | ❌ Missing | ⚠️ Absent (not required) | No canonical tag; description under 120 chars |
| success.html | ✅ | ⚠️ (48 chars, under min) | ❌ og:title/description/url missing (only og:image present) | ❌ Missing | ⚠️ Absent (not required) | Incomplete OG tags; no canonical; description very short; `robots: noindex` (likely intentional) |
| cancel.html | ✅ | ⚠️ (53 chars, under min) | ❌ og:title/description/url missing (only og:image present) | ❌ Missing | ⚠️ Absent (not required) | Incomplete OG tags; no canonical; description very short; `robots: noindex` (likely intentional) |
| reset-password.html | ✅ | ⚠️ (34 chars, well under min) | ❌ og:title/description/url missing (only og:image present) | ❌ Missing | ⚠️ Absent (not required) | Incomplete OG tags; no canonical; description very short; `robots: noindex` (likely intentional) |

## Notes

- All 15 pages have a present, descriptive `<title>` tag — no blanks or placeholders found.
- Schema markup (`application/ld+json`) is present on `index.html` (satisfies the minimum requirement) and also on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — not required by the checklist for these pages, but recommended for `contact.html` (LocalBusiness/ContactPage) as a low-priority enhancement.
- `og:image` (`https://servicewindow.app/og-image.png`) is present and consistent across all 15 pages, and the referenced file exists at the repo root.
- All present `og:url` and `<link rel="canonical">` values correctly use the `servicewindow.app` domain.
- This is a report-only audit; no HTML files were modified.
