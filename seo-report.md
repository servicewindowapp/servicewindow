# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-09-23
**Pages audited:** 15
**Scope:** Report only — no HTML files were modified.

## Summary

- **Total pages audited:** 15
- **Total issues found:** 21 (across 8 of 15 pages; 7 pages pass clean)
- **Top 3 priority fixes:**
  1. **Missing `<link rel="canonical">` on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all, risking duplicate-content ambiguity.
  2. **Missing full OG tag set on `success.html`, `cancel.html`, `reset-password.html`** — no `og:title`, `og:description`, or `og:url`, so shared links to these utility pages render with incomplete previews (og:image only).
  3. **`reset-password.html` meta description is 34 characters** — far short of the 120–160 target; `success.html` (48) and `cancel.html` (53) are also under target. (These are `noindex` pages so lower priority than #1–2, but flagged per spec.)

Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` carry `<meta name="robots" content="noindex, nofollow">`. Check #9 asks that no production page use `noindex`; these are auth/post-transaction/utility pages where `noindex` is plausibly intentional (kept out of search results by design), but they're flagged below since they were in the audited list — confirm intent rather than treat as an automatic fix.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ (servicewindow.app) | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 — 3 over max) | ✅ | ✅ | ✅ | Description 3 chars over 160 |
| find-trucks.html | ✅ | ✅ (157) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ✅ (97 — under 120 target) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; no schema; `robots: noindex, nofollow` (likely intentional for auth) |
| pricing.html | ✅ | ✅ (136) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 — under 120 target) | ✅ | ✅ | ❌ Missing | No JSON-LD schema block |
| jobs.html | ✅ | ✅ (133) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 — 2 under target) | ⚠️ og:url present, no og:image issue noted | ❌ Missing | ❌ Missing | No canonical tag; description 2 chars short of 120 min |
| terms.html | ✅ | ⚠️ (94 — under 120 target) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; description under length target |
| success.html | ✅ | ⚠️ (48 — well under target) | ❌ og:title/description/url missing (og:image only) | ❌ Missing | ❌ Missing | No canonical; incomplete OG set; short description; `noindex` (likely intentional post-payment page) |
| cancel.html | ✅ | ⚠️ (53 — well under target) | ❌ og:title/description/url missing (og:image only) | ❌ Missing | ❌ Missing | No canonical; incomplete OG set; short description; `noindex` (likely intentional) |
| reset-password.html | ✅ | ❌ (34 — well under 120 min) | ❌ og:title/description/url missing (og:image only) | ❌ Missing | ❌ Missing | No canonical; incomplete OG set; very short description; `noindex` (likely intentional) |

## Notes on methodology

- **Title check:** all 15 pages have a non-blank, descriptive `<title>`. Pass on all.
- **Description length:** target is 120–160 characters. Pages under 120 are marked ⚠️ (present but short); `reset-password.html` at 34 chars is marked ❌ as effectively a placeholder-length description. `marketplace.html` is 3 characters over 160 (⚠️).
- **OG tags:** checked for `og:title`, `og:description`, `og:url` (servicewindow.app domain), `og:image`. All present pages use the `servicewindow.app` domain correctly where present.
- **Canonical:** checked for `<link rel="canonical">` pointing to `servicewindow.app`. 6 of 15 pages have none: `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`.
- **Schema:** per spec, required at minimum on `index.html` (present, ✅). Also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`. Absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` — not required by spec except on index, but flagged where a page (like `contact.html`, a public marketing page) would plausibly benefit.
- **Robots:** `auth.html`, `success.html`, `cancel.html`, `reset-password.html` set `noindex, nofollow`. Flagged per check #9 as written; these are transactional/auth pages where exclusion from search results is a reasonable deliberate choice — confirm with the team rather than auto-remove.
