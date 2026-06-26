# SEO Audit Report — ServiceWindow
**Date:** 2026-06-26  
**Pages audited:** 15  
**Scope:** Production HTML pages in repo root

---

## Summary

| Metric | Value |
|--------|-------|
| Total pages audited | 15 |
| Indexable pages | 11 |
| Intentionally noindexed pages | 4 (auth, success, cancel, reset-password) |
| Total issues on indexable pages | 33 |
| Pages with all checks passing | 1 (`find-trucks.html`) |

### Top 3 Priority Fixes

1. **`pricing.html` — Add all 4 OG tags.** The highest-intent commercial page (the pricing/conversion target) has zero OG metadata. Any social link share renders as a bare URL with no image or description.

2. **`privacy.html` & `terms.html` — Add canonical links, OG tags, and schema.** Both legal pages are missing `<link rel="canonical">` (duplicate-content risk) and have no OG tags or structured data at all.

3. **`contact.html` — Add OG tags and schema.** Missing all 4 OG social tags, no schema markup, and description is under the 120-char minimum (98 chars).

---

## Audit Table

> **Key:** ✅ Pass · ⚠️ Present but needs improvement · ❌ Fail  
> **OG Tags column** checks for all four: `og:title`, `og:description`, `og:url`, `og:image`  
> **🔒** = intentionally noindexed — missing metadata is low-priority for these pages

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ WebSite + Org | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars | ✅ all 4 | ✅ | ✅ CollectionPage | Description 1 char over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 158 chars | ✅ all 4 | ✅ | ✅ CollectionPage | None |
| `auth.html` 🔒 | ✅ | ⚠️ 95 chars | ❌ none | ❌ | ❌ | noindex — low priority; missing OG, canonical, schema |
| `pricing.html` | ✅ | ✅ 137 chars | ❌ none | ✅ | ✅ OfferCatalog | **Missing all 4 OG tags** |
| `about.html` | ✅ | ✅ 153 chars | ⚠️ title + desc only | ✅ | ✅ AboutPage | Missing `og:url`, `og:image` |
| `contact.html` | ✅ | ⚠️ 98 chars | ❌ none | ✅ | ❌ | Missing all 4 OG tags; no schema; description under 120 chars |
| `jobs.html` | ✅ | ✅ 131 chars | ⚠️ title + desc only | ✅ | ✅ CollectionPage | Missing `og:url`, `og:image` |
| `venues.html` | ✅ | ✅ 145 chars | ⚠️ title + desc only | ✅ | ✅ WebPage | Missing `og:url`, `og:image` |
| `property.html` | ✅ | ✅ 153 chars | ⚠️ title + desc only | ✅ | ✅ WebPage | Missing `og:url`, `og:image` |
| `privacy.html` | ✅ | ✅ 116 chars | ❌ none | ❌ | ❌ | **Missing canonical, all 4 OG tags, schema** |
| `terms.html` | ✅ | ⚠️ 92 chars | ❌ none | ❌ | ❌ | Missing canonical, all 4 OG tags, schema; description short |
| `success.html` 🔒 | ✅ | ⚠️ 48 chars | ❌ none | ❌ | ❌ | noindex — low priority; transactional page |
| `cancel.html` 🔒 | ✅ | ⚠️ 53 chars | ❌ none | ❌ | ❌ | noindex — low priority; transactional page |
| `reset-password.html` 🔒 | ✅ | ⚠️ 34 chars | ❌ none | ❌ | ❌ | noindex — low priority; utility page |

---

## Issue Breakdown by Category

### Missing `og:url` + `og:image` (partial OG — 4 pages)
`about.html`, `jobs.html`, `venues.html`, `property.html` all have `og:title` and `og:description` but are missing `og:url` and `og:image`. Social sharing will work but without the brand image preview.

### Missing all OG tags (3 indexable pages)
`pricing.html`, `contact.html`, `privacy.html`, `terms.html` have zero OG metadata. Social shares will render as bare links.

### Missing canonical (2 indexable pages)
`privacy.html` and `terms.html` have no `<link rel="canonical">`. This creates duplicate-content risk if either page is ever scraped or linked with query parameters.

### Missing schema (3 indexable pages)
`contact.html`, `privacy.html`, `terms.html` have no `<script type="application/ld+json">`.

### Short descriptions (below 120-char minimum)
| Page | Length | Value |
|------|--------|-------|
| `contact.html` | 98 chars | "Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support." |
| `terms.html` | 92 chars | "ServiceWindow Terms of Service — the rules governing use of the SWFL food truck marketplace." |

---

## Notes

- **Noindex pages are correct.** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This is intentional and appropriate — none of these should be indexed. Their missing OG/canonical/schema is acceptable.
- **No indexable page has a noindex tag.** All 11 indexable pages are clean on the robots check.
- **`og:image` target.** Where present, all pages correctly point to `https://servicewindow.app/og-image.png`. Verify this image exists and is at least 1200×630 px for optimal Facebook/Twitter rendering.
- **Twitter/X cards.** `index.html`, `marketplace.html`, and `find-trucks.html` include `twitter:card` tags. The other pages do not — acceptable once the base OG issues are resolved, since most platforms fall back to OG tags.
- **Schema coverage.** 8 of 11 indexable pages have structured data. The minimum requirement (schema on `index.html`) is met.
