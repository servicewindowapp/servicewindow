# ServiceWindow SEO Audit Report
**Date:** 2026-06-01  
**Pages audited:** 15  
**Total issues found:** 28 (8 hard failures ❌, 20 warnings ⚠️)  
**Clean pages (no issues):** index.html, find-trucks.html, pricing.html, about.html, jobs.html, venues.html, property.html

---

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Without canonical tags, duplicate-content crawl signals go unresolved on legal and utility pages.
2. **Expand meta descriptions on indexable pages below 120 chars** — `terms.html` (94 chars), `auth.html` (97 chars), `contact.html` (100 chars), `privacy.html` (118 chars). These are the pages search engines will index and may show truncated or auto-generated snippets.
3. **Add `og:title`, `og:description`, `og:url` to `success.html`, `cancel.html`, `reset-password.html`** — All three have only `og:image`. Social shares from deep-linked URLs will render poorly with no OG title or description, even on noindex pages.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars | ✅ all 4 | ✅ | ✅ | Description 3 chars over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ all 4 | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars | ✅ all 4 | ❌ missing | ❌ missing | No canonical; description short (97 chars); schema absent; `noindex` present (likely intentional) |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ all 4 | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ all 4 | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars | ✅ all 4 | ✅ | ❌ missing | Description short (100 chars); no schema markup |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ all 4 | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ all 4 | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ all 4 | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars | ✅ all 4 | ❌ missing | ❌ missing | No canonical; description 2 chars under 120; no schema |
| `terms.html` | ✅ | ❌ 94 chars | ✅ all 4 | ❌ missing | ❌ missing | No canonical; description too short (94 chars); no schema |
| `success.html` | ✅ | ❌ 48 chars | ⚠️ og:image only | ❌ missing | ❌ missing | `noindex` (intentional); no canonical; `og:title`/`og:description`/`og:url` absent; description too short (48 chars) |
| `cancel.html` | ✅ | ❌ 53 chars | ⚠️ og:image only | ❌ missing | ❌ missing | `noindex` (intentional); no canonical; `og:title`/`og:description`/`og:url` absent; description too short (53 chars) |
| `reset-password.html` | ✅ | ❌ 34 chars | ⚠️ og:image only | ❌ missing | ❌ missing | `noindex` (intentional); no canonical; `og:title`/`og:description`/`og:url` absent; description too short (34 chars) |

---

## Check Detail

| Check | Criteria | Failing Pages |
|-------|----------|---------------|
| `<title>` present & descriptive | Non-blank, non-placeholder | None — all 15 pass |
| `<meta name="description">` 120–160 chars | Under 120 = ❌, over 160 = ⚠️ | ❌ terms (94), success (48), cancel (53), reset-password (34) · ⚠️ marketplace (163), auth (97), contact (100), privacy (118) |
| `og:title` present | Present | success, cancel, reset-password |
| `og:description` present | Present | success, cancel, reset-password |
| `og:url` uses servicewindow.app | Present & correct domain | success, cancel, reset-password |
| `og:image` present | Present | All 15 pass |
| `<link rel="canonical">` uses servicewindow.app | Present & correct domain | auth, privacy, terms, success, cancel, reset-password |
| Schema `application/ld+json` | Present on index.html minimum | ✅ index present · absent on auth, contact, privacy, terms, success, cancel, reset-password |
| `<meta name="robots">` not `noindex` | Not set to noindex | ⚠️ auth, success, cancel, reset-password — noindex present (intentional on post-payment/auth utility pages) |

---

## Notes

- **`noindex` on auth/success/cancel/reset-password** — flagged per audit criteria but consistent with best practice; these are flow/utility pages that should not be indexed.
- **Schema on legal pages** — `privacy.html` and `terms.html` have no `ld+json` block. Schema is not required for legal pages, but adding a basic `WebPage` type would be a minor quality improvement.
- **`og:image`** — All 15 pages reference `https://servicewindow.app/og-image.png`. File existence was not verified in this audit; confirm the asset resolves correctly.
- **Dynamically injected schema** — `marketplace.html` and `find-trucks.html` inject `ld+json` via JavaScript (`script.type = 'application/ld+json'`). This is crawlable by Googlebot but may not be picked up by all social/preview scrapers.
