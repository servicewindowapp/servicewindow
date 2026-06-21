# SEO Audit Report — ServiceWindow
**Audited:** 2026-06-03  
**Pages audited:** 15  
**Total issues found:** 61 distinct failing checks (38 on indexed pages; 23 on intentionally noindex pages)  
**Pages passing all checks:** 1 (find-trucks.html)

---

## Summary

### Top 3 Priority Fixes

1. **Add `og:url` + `og:image` to 6 indexed pages** (pricing, about, contact, jobs, venues, property) — without `og:image`, links shared to Slack, iMessage, LinkedIn, or Facebook generate no preview card. Four of these pages (about, jobs, venues, property) already have `og:title` and `og:description`, so only 2 tags each are missing — minimal effort, high impact.

2. **Add all 4 OG tags to `pricing.html` and `contact.html`** — both are high-intent pages embedded in every nav/CTA path. `pricing.html` is the primary conversion page; `contact.html` is a trust signal. Both currently have zero Open Graph metadata.

3. **Add canonical URL, all OG tags, and schema markup to `privacy.html` and `terms.html`** — both pages are linked from every page footer, are indexed (no noindex directive), and are frequently shared in business contexts. Neither has a canonical URL, any OG tag, or structured data. This creates deduplication risk if content is mirrored or linked with varying URL parameters.

---

## Page-by-Page Audit

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ ~160 chars | ✅ all 4 present | ✅ | ✅ WebSite + Organization | — |
| marketplace.html | ✅ | ⚠️ ~162 chars (2 over limit) | ✅ all 4 present | ✅ | ✅ CollectionPage | Desc slightly over 160; schema says "21 cities" (should be 22) |
| find-trucks.html | ✅ | ✅ ~155 chars | ✅ all 4 present | ✅ | ✅ CollectionPage | Schema says "21 SWFL cities" (should be 22 per brand standard) |
| auth.html | ✅ | ⚠️ ~94 chars (short) | ❌ none | ❌ missing | ❌ missing | **noindex intentional** ✅; missing OG, canonical, schema acceptable given noindex; desc short |
| pricing.html | ✅ | ✅ ~133 chars | ❌ none | ✅ | ✅ WebPage + OfferCatalog | **All 4 OG tags missing** — highest-priority conversion page |
| about.html | ✅ | ✅ ~151 chars | ⚠️ 2 of 4 (missing og:url, og:image) | ✅ | ✅ AboutPage | Missing `og:url`, `og:image` |
| contact.html | ✅ | ⚠️ ~97 chars (short) | ❌ none | ✅ | ❌ missing | **All 4 OG tags missing**; no schema; desc under 120 chars |
| jobs.html | ✅ | ✅ ~131 chars | ⚠️ 2 of 4 (missing og:url, og:image) | ✅ | ✅ CollectionPage | Missing `og:url`, `og:image` |
| venues.html | ✅ | ✅ ~143 chars | ⚠️ 2 of 4 (missing og:url, og:image) | ✅ | ✅ WebPage | Missing `og:url`, `og:image` |
| property.html | ✅ | ✅ ~152 chars | ⚠️ 2 of 4 (missing og:url, og:image) | ✅ | ✅ WebPage | Missing `og:url`, `og:image` |
| privacy.html | ✅ | ⚠️ ~115 chars (short) | ❌ none | ❌ missing | ❌ missing | **All 4 OG tags missing**; no canonical; no schema; desc under 120 chars |
| terms.html | ✅ | ⚠️ ~91 chars (short) | ❌ none | ❌ missing | ❌ missing | **All 4 OG tags missing**; no canonical; no schema; desc under 120 chars |
| success.html | ✅ | ❌ ~48 chars (too short) | ❌ none | ❌ missing | ❌ missing | **noindex intentional** ✅; transactional page — OG/canonical/schema not required; desc is a stub |
| cancel.html | ✅ | ❌ ~53 chars (too short) | ❌ none | ❌ missing | ❌ missing | **noindex intentional** ✅; transactional page — OG/canonical/schema not required; desc is a stub |
| reset-password.html | ✅ | ❌ ~34 chars (too short) | ❌ none | ❌ missing | ❌ missing | **noindex intentional** ✅; auth utility page — OG/canonical/schema not required |

---

## Check-by-Check Breakdown

| Check | Passing | Failing | Notes |
|-------|---------|---------|-------|
| `<title>` — present and descriptive | ✅ 15/15 | 0 | All titles descriptive and unique |
| `<meta name="description">` — 120–160 chars | ✅ 7 | ⚠️ 5 short · ❌ 3 stub | Stubs on noindex pages; contact/terms/privacy/auth short |
| `og:title` | ✅ 6 | ❌ 9 | 4 noindex + pricing, contact, privacy, terms missing |
| `og:description` | ✅ 6 | ❌ 9 | Same 9 pages as og:title |
| `og:url` | ✅ 3 | ❌ 12 | Only index, marketplace, find-trucks have it |
| `og:image` | ✅ 3 | ❌ 12 | Same 3 pages as og:url |
| `<link rel="canonical">` | ✅ 9 | ❌ 6 | auth, privacy, terms, success, cancel, reset missing |
| Schema `<script type="application/ld+json">` | ✅ 8 | ❌ 7 | contact, privacy, terms, auth, success, cancel, reset missing |
| `<meta name="robots">` — not noindex on production | ✅ 4 noindex pages are appropriate | ⚠️ note | auth/success/cancel/reset are intentionally noindex — correct |

---

## Notes

- **Noindex pages (auth, success, cancel, reset-password):** `noindex, nofollow` is correct practice for auth flows and transactional confirmation pages. Missing OG and canonical on these is acceptable and expected. Not counted toward indexed-page issue total.
- **"21 cities" in schema markup:** `marketplace.html` and `find-trucks.html` schema descriptions reference "21 cities" — brand standard per CLAUDE.md is 22 cities. Minor inconsistency in structured data.
- **og:image reuse:** All pages that have `og:image` use `https://servicewindow.app/og-image.png` — this is acceptable for a single-product brand but page-specific OG images (e.g., for pricing, about) would improve click-through on social shares.
- **Twitter Card tags:** Only index, marketplace, and find-trucks have Twitter Card meta tags. Pages that gain OG tags should also receive `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` for X/Twitter preview coverage.
