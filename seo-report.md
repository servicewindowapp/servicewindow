# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-09-03
**Pages audited:** 15 (production HTML pages)
**Total issues found:** 28 (across 8 of 15 pages — 7 pages pass clean)

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Canonical tags prevent duplicate-content ambiguity and should be added to every page, indexed or not.
2. **Incomplete Open Graph tags on transactional pages** — `success.html`, `cancel.html`, `reset-password.html` only ship `og:image`; `og:title`, `og:description`, and `og:url` are missing, so links to these pages render blank/generic previews when shared.
3. **Meta descriptions outside the 120–160 character range** on 8 pages — `auth.html` (95), `contact.html` (98), `privacy.html` (116), `terms.html` (92), `success.html` (48), `cancel.html` (53), `reset-password.html` (34) are all too short; `marketplace.html` (161) is 1 character over. Short descriptions get auto-rewritten by Google in SERPs, losing message control.

*Secondary note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` carry `<meta name="robots" content="noindex, nofollow">`. This is flagged per the audit's literal pass/fail criteria, but is very likely intentional — these are transactional/auth flow pages that shouldn't rank in search. Confirm intent before "fixing."

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | — |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ | Description 1 char over 160-char max |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95 chars, too short) | ✅ | ❌ | ❌ | Description too short; missing canonical; missing schema; `robots: noindex, nofollow` (likely intentional) |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98 chars, too short) | ✅ | ✅ | ❌ | Description too short; missing schema markup |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | — |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ (116 chars, 4 short of min) | ✅ | ❌ | ❌ | Description slightly short; missing canonical; missing schema |
| terms.html | ✅ | ❌ (92 chars, too short) | ✅ | ❌ | ❌ | Description too short; missing canonical; missing schema |
| success.html | ✅ | ❌ (48 chars, too short) | ❌ (only og:image) | ❌ | ❌ | Description too short; og:title/description/url missing; missing canonical; missing schema; `robots: noindex, nofollow` (likely intentional) |
| cancel.html | ✅ | ❌ (53 chars, too short) | ❌ (only og:image) | ❌ | ❌ | Description too short; og:title/description/url missing; missing canonical; missing schema; `robots: noindex, nofollow` (likely intentional) |
| reset-password.html | ✅ | ❌ (34 chars, too short) | ❌ (only og:image) | ❌ | ❌ | Description too short; og:title/description/url missing; missing canonical; missing schema; `robots: noindex, nofollow` (likely intentional) |

---

## Notes

- **Title tags**: all 15 pages have a present, descriptive, non-placeholder `<title>`. No issues.
- **og:url domain**: every `og:url` and `<link rel="canonical">` found across the site correctly uses `https://servicewindow.app/...` — no domain mismatches.
- **Schema markup**: present on `index.html` (WebSite + Organization, satisfies the minimum requirement) and on 6 other content pages (CollectionPage / WebPage / AboutPage types). Missing entirely on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`.
- **Tag placement**: on several pages (`about.html`, `jobs.html`, `venues.html`, `property.html`, `pricing.html`, `contact.html`, `privacy.html`, `terms.html`, `auth.html`, `success.html`, `cancel.html`, `reset-password.html`) the `og:type`/`og:url`/`og:image` tags are split off from `og:title`/`og:description` and placed hundreds of lines later, immediately before `</head>` (after the full `<style>` block) rather than grouped with the other meta tags near the top. All tags are still validly inside `<head>` and functional, but this is worth tidying for maintainability.
- This is a report only — no HTML files were modified.
