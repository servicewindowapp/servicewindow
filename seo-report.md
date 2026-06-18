# SEO Audit Report — ServiceWindow

**Date:** 2026-06-18  
**Pages audited:** 15  
**Indexable pages audited:** 11 (4 pages intentionally noindex)  
**Total issues found:** 33 on indexable pages (+ 28 on noindex pages, noted separately)

---

## Summary — Top 3 Priority Fixes

1. **`pricing.html` — Add all 4 OG tags.** The pricing page is the highest-intent page on the site and currently has zero social sharing metadata (`og:title`, `og:description`, `og:url`, `og:image` all missing). Any social share renders as a bare URL.

2. **`about.html`, `jobs.html`, `venues.html`, `property.html` — Add `og:url` and `og:image`.** These 4 pages each have `og:title` and `og:description` but are missing `og:url` and `og:image`, leaving Open Graph incomplete. A single pass across all 4 closes 8 issues.

3. **`privacy.html` and `terms.html` — Add canonical tags.** These are the only two indexable pages without `<link rel="canonical">`, creating a duplicate-content risk. Both also need OG tags and schema added.

---

## Audit Table

> **Robots note:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are intentionally set to `noindex, nofollow`. Missing OG tags, canonical, and schema on those pages are expected and not flagged as errors — they appear in the table for completeness.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ WebSite + Org | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over limit) | ✅ all 4 | ✅ | ✅ CollectionPage | Description 1 char over 160 |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ all 4 | ✅ | ✅ CollectionPage | None |
| `auth.html` | ✅ | ⚠️ 94 chars (short) | ❌ none | ❌ | ❌ | **noindex** — OG/canonical/schema omissions expected; description short but low impact |
| `pricing.html` | ✅ | ✅ 134 chars | ❌ none | ✅ | ✅ OfferCatalog | **Missing all 4 OG tags** (og:title, og:description, og:url, og:image) |
| `about.html` | ✅ | ✅ 152 chars | ⚠️ partial | ✅ | ✅ AboutPage | Missing `og:url` and `og:image` (og:title and og:description present) |
| `contact.html` | ✅ | ⚠️ 97 chars (short) | ❌ none | ✅ | ❌ | Missing all 4 OG tags; no schema; description under 120 chars |
| `jobs.html` | ✅ | ✅ 132 chars | ⚠️ partial | ✅ | ✅ CollectionPage | Missing `og:url` and `og:image` (og:title and og:description present) |
| `venues.html` | ✅ | ✅ 144 chars | ⚠️ partial | ✅ | ✅ WebPage/Service | Missing `og:url` and `og:image` (og:title and og:description present) |
| `property.html` | ✅ | ✅ 153 chars | ⚠️ partial | ✅ | ✅ WebPage/Service | Missing `og:url` and `og:image` (og:title and og:description present) |
| `privacy.html` | ✅ | ⚠️ 115 chars (short) | ❌ none | ❌ | ❌ | **Missing canonical**; missing all 4 OG tags; no schema; description under 120 chars |
| `terms.html` | ✅ | ⚠️ 90 chars (short) | ❌ none | ❌ | ❌ | **Missing canonical**; missing all 4 OG tags; no schema; description under 120 chars |
| `success.html` | ✅ | ⚠️ 47 chars (very short) | ❌ none | ❌ | ❌ | **noindex** — all omissions expected; description is a stub |
| `cancel.html` | ✅ | ⚠️ 52 chars (very short) | ❌ none | ❌ | ❌ | **noindex** — all omissions expected; description is a stub |
| `reset-password.html` | ✅ | ⚠️ 33 chars (very short) | ❌ none | ❌ | ❌ | **noindex** — all omissions expected; description is a stub |

---

## Issue Breakdown by Category

### Missing OG Tags (indexable pages)
| Page | og:title | og:description | og:url | og:image |
|------|----------|----------------|--------|----------|
| `pricing.html` | ❌ | ❌ | ❌ | ❌ |
| `about.html` | ✅ | ✅ | ❌ | ❌ |
| `contact.html` | ❌ | ❌ | ❌ | ❌ |
| `jobs.html` | ✅ | ✅ | ❌ | ❌ |
| `venues.html` | ✅ | ✅ | ❌ | ❌ |
| `property.html` | ✅ | ✅ | ❌ | ❌ |
| `privacy.html` | ❌ | ❌ | ❌ | ❌ |
| `terms.html` | ❌ | ❌ | ❌ | ❌ |

### Missing Canonical (indexable pages)
| Page | Note |
|------|------|
| `privacy.html` | No `<link rel="canonical">` |
| `terms.html` | No `<link rel="canonical">` |

### Missing Schema (indexable pages)
| Page | Note |
|------|------|
| `contact.html` | No `<script type="application/ld+json">` |
| `privacy.html` | No `<script type="application/ld+json">` |
| `terms.html` | No `<script type="application/ld+json">` |

### Short Meta Descriptions (indexable pages — target: 120–160 chars)
| Page | Length | Content |
|------|--------|---------|
| `marketplace.html` | 161 chars | 1 char over limit — trim trailing period or shorten |
| `contact.html` | 97 chars | Expand to describe what visitors can ask about |
| `privacy.html` | 115 chars | Expand slightly to reach 120-char floor |
| `terms.html` | 90 chars | Expand to describe scope of terms |

### Robots Check
All indexable pages pass. No production page that should be crawlable carries `noindex`.  
The 4 noindex pages (`auth`, `success`, `cancel`, `reset-password`) are appropriately excluded.

---

## Fully Compliant Pages
- `index.html` — all checks pass
- `find-trucks.html` — all checks pass
- `marketplace.html` — passes all structural checks; description is 1 char over 160 (minor)
