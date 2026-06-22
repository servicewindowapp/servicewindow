# ServiceWindow — SEO Audit Report
**Date:** 2026-06-22  
**Pages audited:** 15  
**Issues found (indexable pages):** 33  
**Issues found (noindex utility pages):** 24 (lower priority)

---

## Summary

### Top 3 Priority Fixes

1. **Add `og:image` to 8 indexable pages** — `pricing`, `about`, `contact`, `jobs`, `venues`, `property`, `privacy`, `terms` are all missing `og:image`. Social shares from these pages render without a preview image, degrading click-through rates across most of the site.

2. **Add full OG tag set to `pricing.html` and `contact.html`** — two core conversion/support pages have zero OG coverage. `pricing.html` is missing all four OG properties despite having schema and a canonical. `contact.html` is missing all four OG properties and has no schema markup either.

3. **Add `<link rel="canonical">` and OG tags to `privacy.html` and `terms.html`** — both legal pages are indexed but have no canonical signal, no OG tags, and no schema. Short descriptions (91–116 chars, below the 120-char floor) compound the issue.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ WebSite + Org | — |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over) | ✅ all 4 | ✅ | ⚠️ Schema says "21 cities" (should be 22) | Desc 1 char over limit; schema city count mismatch |
| `find-trucks.html` | ✅ | ✅ ~155 chars | ✅ all 4 | ✅ | ✅ CollectionPage | — |
| `auth.html` | ✅ | ⚠️ 95 chars | ❌ none | ❌ missing | ❌ missing | `noindex` set (intentional ✅); missing OG ×4, canonical, schema |
| `pricing.html` | ✅ | ✅ ~133 chars | ❌ none | ✅ | ✅ OfferCatalog | Missing `og:title`, `og:description`, `og:url`, `og:image` |
| `about.html` | ✅ | ✅ ~153 chars | ⚠️ partial | ✅ | ✅ AboutPage + Org | Missing `og:url`, `og:image` |
| `contact.html` | ✅ | ⚠️ 98 chars | ❌ none | ✅ | ❌ missing | Short desc (98 chars); missing OG ×4, schema |
| `jobs.html` | ✅ | ✅ ~133 chars | ⚠️ partial | ✅ | ⚠️ Schema says "21 cities" (should be 22) | Missing `og:url`, `og:image`; schema city count mismatch |
| `venues.html` | ✅ | ✅ ~143 chars | ⚠️ partial | ✅ | ✅ WebPage/Service | Missing `og:url`, `og:image` |
| `property.html` | ✅ | ✅ ~153 chars | ⚠️ partial | ✅ | ✅ WebPage/Service | Missing `og:url`, `og:image` |
| `privacy.html` | ✅ | ⚠️ ~116 chars | ❌ none | ❌ missing | ❌ missing | Short desc (116 chars); missing OG ×4, canonical, schema |
| `terms.html` | ✅ | ⚠️ 91 chars | ❌ none | ❌ missing | ❌ missing | Short desc (91 chars); missing OG ×4, canonical, schema |
| `success.html` | ✅ | ⚠️ 47 chars | ❌ none | ❌ missing | ❌ missing | `noindex` set (intentional ✅ — post-Stripe page); utility metadata only |
| `cancel.html` | ✅ | ⚠️ 52 chars | ❌ none | ❌ missing | ❌ missing | `noindex` set (intentional ✅ — post-Stripe page); utility metadata only |
| `reset-password.html` | ✅ | ⚠️ 33 chars | ❌ none | ❌ missing | ❌ missing | `noindex` set (intentional ✅ — utility page); utility metadata only |

---

## Issue Breakdown by Check

| Check | Pass | Warn | Fail |
|-------|------|------|------|
| `<title>` — present and descriptive | 15 | 0 | 0 |
| `<meta name="description">` — 120–160 chars | 7 | 8 | 0 |
| `og:title` | 5 | 0 | 10 |
| `og:description` | 5 | 0 | 10 |
| `og:url` — servicewindow.app domain | 3 | 0 | 12 |
| `og:image` — present | 3 | 0 | 12 |
| `<link rel="canonical">` — servicewindow.app domain | 9 | 0 | 6 |
| Schema `<script type="application/ld+json">` | 8 | 0 | 7 |
| `<meta name="robots">` — not noindex on production | 11 | 4* | 0 |

*`noindex` is set intentionally on `auth`, `success`, `cancel`, and `reset-password`. All four are appropriate — auth pages and post-Stripe transactional pages should not be indexed. No action needed.

---

## Notes

- **Schema city count:** `marketplace.html` and `jobs.html` reference "21 cities" in their `ld+json` descriptions. Per project spec the service area is 22 cities. Minor consistency issue.
- **All 15 titles** are unique, descriptive, and non-placeholder. No title issues found.
- **`og:image`** on passing pages all point to `https://servicewindow.app/og-image.png` — verify this asset exists and is sized to Open Graph spec (1200×630 px minimum).
- **`index.html`** passes all 9 checks and has the richest schema (WebSite + Organization with SearchAction).
