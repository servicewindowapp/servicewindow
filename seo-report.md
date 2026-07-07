# SEO & Metadata Audit — ServiceWindow

**Run date:** 2026-07-07
**Pages audited:** 15
**Total issues found:** 23 (plus 4 informational notes on intentional `noindex` usage)

## Top 3 Priority Fixes
1. **Missing `<link rel="canonical">` on `privacy.html` and `terms.html`.** These are real, indexable content pages (not `noindex`), so the missing canonical tag is the highest-impact gap in this audit.
2. **Meta descriptions outside the 120–160 char target on 7 pages** — worst on indexable pages are `contact.html` (100 chars) and `terms.html` (94 chars); expand copy toward the target range to avoid thin SERP snippets.
3. **`marketplace.html` description runs 163 characters** (3 over the 160 cap) — trim slightly to avoid Google truncating the snippet mid-word.

Lower priority: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are missing canonical tags and some Open Graph fields, but all four are already correctly marked `noindex, nofollow` as transactional/auth utility pages, so their real-world SEO exposure is minimal — cleanup here is cosmetic/completeness, not urgent.

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 — 3 over max) | ✅ | ✅ | ✅ | Description 163 chars, trim to ≤160 |
| find-trucks.html | ✅ | ✅ (157) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 — under min) | ✅ | ❌ | — (not required) | Description too short (97 chars); missing canonical tag; `noindex` present (intentional — auth page) |
| pricing.html | ✅ | ✅ (136) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 — under min) | ✅ | ✅ | — (not required) | Description too short (100 chars) |
| jobs.html | ✅ | ✅ (133) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 — 2 under min) | ✅ | ❌ | — (not required) | Description 2 chars short of range; missing canonical tag |
| terms.html | ✅ | ⚠️ (94 — under min) | ✅ | ❌ | — (not required) | Description too short (94 chars); missing canonical tag |
| success.html | ✅ | ❌ (48) | ⚠️ (og:image only) | ❌ | — (not required) | Description far too short (48 chars); missing og:title/og:description/og:url; missing canonical; `noindex` present (intentional — post-checkout page) |
| cancel.html | ✅ | ❌ (53) | ⚠️ (og:image only) | ❌ | — (not required) | Description far too short (53 chars); missing og:title/og:description/og:url; missing canonical; `noindex` present (intentional — post-checkout page) |
| reset-password.html | ✅ | ❌ (34) | ⚠️ (og:image only) | ❌ | — (not required) | Description far too short (34 chars); missing og:title/og:description/og:url; missing canonical; `noindex` present (intentional — auth-flow page) |

## Notes
- Schema (`application/ld+json`) is only required on `index.html` per spec — it's present there, plus as a bonus on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. Not present on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` — not a failure since it's not required there.
- `robots: noindex, nofollow` is present on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. This appears intentional (auth/transactional flow pages that shouldn't rank), not a bug — flagged per the audit checklist for visibility, not counted as a hard defect.
- All 15 pages have descriptive, non-placeholder `<title>` tags.
- All 15 pages that set Open Graph tags use the correct `servicewindow.app` domain in `og:url` (where present).
- This is a report-only audit — no HTML files were modified.
