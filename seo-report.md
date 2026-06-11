# SEO Audit Report — ServiceWindow
**Date:** 2026-06-11  
**Pages audited:** 15  
**Scope:** Title, meta description, OG tags, canonical, schema, robots

---

## Summary

| Metric | Value |
|--------|-------|
| Total pages audited | 15 |
| Pages excluded from index (intentional) | 4 — auth, success, cancel, reset-password |
| Indexed pages with issues | 9 of 11 |
| Total individual deficiencies (indexed pages) | 33 |

### Top 3 Priority Fixes

1. **privacy.html + terms.html** — Each is missing all four OG tags, `<link rel="canonical">`, and schema markup. Two high-trust legal pages with no canonical creates a duplicate-content risk. 14 combined deficiencies.
2. **pricing.html** — Key conversion page is missing all four OG tags (`og:title`, `og:description`, `og:url`, `og:image`). Links shared in sales emails, social posts, or Slack will render with no preview card.
3. **contact.html** — Missing all four OG tags, no schema markup, and description is only 98 chars (below 120-char target). Low effort fix with high sharing frequency.

---

## Page-by-Page Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ WebSite + Organization | None |
| marketplace.html | ✅ | ⚠️ 162 chars (2 over limit) | ✅ all 4 | ✅ | ✅ CollectionPage | Description 2 chars over 160 |
| find-trucks.html | ✅ | ✅ 154 chars | ✅ all 4 | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ | ⚠️ 93 chars | ❌ none | ❌ | ❌ | **noindex intentional** — utility page; missing OG/canonical/schema are low priority |
| pricing.html | ✅ | ✅ 136 chars | ❌ none | ✅ | ✅ OfferCatalog | Missing og:title, og:description, og:url, og:image |
| about.html | ✅ | ✅ 152 chars | ⚠️ title + desc only | ✅ | ✅ AboutPage | Missing og:url, og:image |
| contact.html | ✅ | ⚠️ 98 chars | ❌ none | ✅ | ❌ | Missing all 4 OG tags; no schema; description under 120 chars |
| jobs.html | ✅ | ✅ 131 chars | ⚠️ title + desc only | ✅ | ✅ CollectionPage | Missing og:url, og:image |
| venues.html | ✅ | ✅ 143 chars | ⚠️ title + desc only | ✅ | ✅ WebPage + Service | Missing og:url, og:image |
| property.html | ✅ | ✅ 152 chars | ⚠️ title + desc only | ✅ | ✅ WebPage + Service | Missing og:url, og:image |
| privacy.html | ✅ | ⚠️ 116 chars | ❌ none | ❌ | ❌ | Missing all 4 OG tags, canonical, schema; description under 120 chars |
| terms.html | ✅ | ⚠️ 92 chars | ❌ none | ❌ | ❌ | Missing all 4 OG tags, canonical, schema; description under 120 chars |
| success.html | ✅ | ❌ 48 chars | ❌ none | ❌ | ❌ | **noindex intentional** — post-payment utility page |
| cancel.html | ✅ | ❌ 53 chars | ❌ none | ❌ | ❌ | **noindex intentional** — post-payment utility page |
| reset-password.html | ✅ | ❌ 34 chars | ❌ none | ❌ | ❌ | **noindex intentional** — account utility page |

---

## Check Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Pass |
| ⚠️ | Present but needs improvement |
| ❌ | Missing or failing |

**OG Tags** column covers all four required properties: `og:title`, `og:description`, `og:url`, `og:image`.  
**Description** length target: 120–160 characters.  
**noindex intentional**: auth, success, cancel, and reset-password are all correctly set to `noindex, nofollow`. Their missing OG/canonical/schema are not SEO defects.

---

## Issue Detail by Category

### Missing og:url + og:image (partial OG — 4 pages)
- about.html
- jobs.html
- venues.html
- property.html

All four have `og:title` and `og:description` but are missing `og:url` (required for Facebook/LinkedIn deduplication) and `og:image` (required for visual preview cards). Fix: add both tags pointing to `https://servicewindow.app/<page>.html` and `https://servicewindow.app/og-image.png`.

### Missing all OG tags (3 indexed pages)
- pricing.html — has canonical + schema; only OG missing
- contact.html — also missing schema
- privacy.html — also missing canonical + schema
- terms.html — also missing canonical + schema

### Missing canonical (2 pages)
- privacy.html
- terms.html

Without a canonical, Google may treat `http://` vs `https://`, trailing-slash variants, or query-string URLs as separate pages and dilute link equity.

### Missing schema markup (2 indexed pages)
- contact.html — add `ContactPage` schema
- privacy.html — low value but consistent with site pattern
- terms.html — low value but consistent with site pattern

### Short descriptions (under 120 chars, indexed pages)
- contact.html — 98 chars
- privacy.html — 116 chars
- terms.html — 92 chars

### Description slightly over 160 chars
- marketplace.html — 162 chars (trim 2 characters)

---

## Notes

- All 15 pages have a descriptive, non-blank `<title>` tag. ✅
- No production indexed page has `noindex` set incorrectly. ✅
- index.html, marketplace.html, and find-trucks.html are fully compliant. ✅
- The `og:image` referenced across all passing pages (`/og-image.png`) should be verified to exist and render at 1200×630px.
