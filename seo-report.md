# ServiceWindow SEO Audit
**Date:** 2026-06-25
**Scope:** 15 production HTML pages
**Auditor:** Automated nightly audit

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Indexable pages | 11 |
| Utility pages (intentional noindex) | 4 |
| Hard fails (❌) | 29 |
| Warnings (⚠️) | 5 |
| **Total issues** | **34** |

### Top 3 Priority Fixes

1. **Add `og:url` + `og:image` to 4 pages** — `about.html`, `jobs.html`, `venues.html`, `property.html` all have `og:title`/`og:description` but are missing both `og:url` and `og:image`. Affects social sharing previews for 4 high-value pages.

2. **Add complete OG tag suite to `pricing.html`, `contact.html`, `privacy.html`, `terms.html`** — these 4 pages have zero Open Graph tags. `pricing.html` and `contact.html` are conversion-critical; all 4 generate dead or blank social share cards.

3. **Add canonical + schema to `privacy.html` and `terms.html`; expand short descriptions on `contact.html` (98 chars), `terms.html` (92 chars), `privacy.html` (116 chars)** — both policy pages also lack `<link rel="canonical">`, leaving Google to choose the canonical URL itself.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ⚠️ | ✅ | ✅ | ✅ | Description at 160-char upper limit — trim slightly |
| `marketplace.html` | ✅ | ⚠️ | ✅ | ✅ | ✅ | Description 161 chars — 1 char over limit |
| `find-trucks.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ | N/A | N/A | N/A | Correctly noindexed; description 95 chars (acceptable for utility page) |
| `pricing.html` | ✅ | ✅ | ❌ | ✅ | ✅ | Missing `og:title`, `og:description`, `og:url`, `og:image` — conversion page with no social share support |
| `about.html` | ✅ | ✅ | ⚠️ | ✅ | ✅ | Has `og:title` + `og:description`; missing `og:url` and `og:image` |
| `contact.html` | ✅ | ⚠️ | ❌ | ✅ | ❌ | Description 98 chars (<120); missing all OG tags; no schema markup |
| `jobs.html` | ✅ | ✅ | ⚠️ | ✅ | ✅ | Has `og:title` + `og:description`; missing `og:url` and `og:image` |
| `venues.html` | ✅ | ✅ | ⚠️ | ✅ | ✅ | Has `og:title` + `og:description`; missing `og:url` and `og:image` |
| `property.html` | ✅ | ✅ | ⚠️ | ✅ | ✅ | Has `og:title` + `og:description`; missing `og:url` and `og:image` |
| `privacy.html` | ✅ | ⚠️ | ❌ | ❌ | ❌ | Description 116 chars (<120); no canonical; missing all OG tags; no schema |
| `terms.html` | ✅ | ⚠️ | ❌ | ❌ | ❌ | Description 92 chars (<120); no canonical; missing all OG tags; no schema |
| `success.html` | ✅ | N/A | N/A | N/A | N/A | Correctly noindexed (post-payment confirmation) |
| `cancel.html` | ✅ | N/A | N/A | N/A | N/A | Correctly noindexed (post-payment cancel) |
| `reset-password.html` | ✅ | N/A | N/A | N/A | N/A | Correctly noindexed (auth utility page) |

---

## Check Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Pass — present and correct |
| ⚠️ | Present but needs improvement |
| ❌ | Fail — missing or incorrect |
| N/A | Not applicable (page is noindexed by design) |

### Check Definitions

- **Title** — `<title>` present, descriptive, not blank/placeholder
- **Description** — `<meta name="description">` present, 120–160 characters
- **OG Tags** — ✅ = all 4 present (`og:title`, `og:description`, `og:url`, `og:image`); ⚠️ = partial; ❌ = none
- **Canonical** — `<link rel="canonical">` present using `servicewindow.app` domain
- **Schema** — `<script type="application/ld+json">` present
- **Robots** — all indexable pages confirmed not set to `noindex`; all utility pages correctly set to `noindex, nofollow`

---

## Page-by-Page Detail

### index.html
- **Title:** Book Verified Food Trucks in Southwest Florida | ServiceWindow
- **Description:** 160 chars — at upper boundary; consider trimming 1–2 words
- **OG:** Full suite present including `og:image` pointing to `/og-image.png`
- **Schema:** WebSite + Organization — best in class
- **Robots:** Not set (default index) ✅

### marketplace.html
- **Title:** Browse Trucks & Marketplace — ServiceWindow SWFL
- **Description:** 161 chars — 1 char over the 160-char limit
- **OG:** Full suite present ✅
- **Schema:** CollectionPage ✅
- **Robots:** Not set (default index) ✅

### find-trucks.html
- **Title:** Find a Food Truck Near You — ServiceWindow SWFL
- **Description:** ~154 chars ✅
- **OG:** Full suite present ✅
- **Schema:** CollectionPage with SearchAction ✅
- **Robots:** Not set (default index) ✅

### auth.html
- **Robots:** `noindex, nofollow` — correct; auth pages should not be indexed
- **Note:** Missing OG/canonical/schema are N/A for a noindexed page

### pricing.html
- **Title:** Pricing — ServiceWindow SWFL Food Truck Marketplace ✅
- **Description:** 133 chars ✅
- **OG Tags:** ❌ None — this is a key conversion page; missing OG tags means broken social share previews when linked from email/social
- **Canonical:** ✅
- **Schema:** WebPage + OfferCatalog ✅

### about.html
- **OG:** `og:title` and `og:description` present, but `og:url` and `og:image` are missing — social shares will render without a preview image and may use the wrong URL

### contact.html
- **Description:** "Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support." = 98 chars. Below the 120-char minimum.
- **OG:** No tags at all
- **Schema:** No schema markup. A ContactPage schema with a ContactPoint would benefit local SEO

### jobs.html
- **OG:** `og:title` + `og:description` present, but `og:url` and `og:image` missing

### venues.html
- **OG:** `og:title` + `og:description` present, but `og:url` and `og:image` missing
- **Note:** `apple-touch-icon` meta tag absent (present on most other pages) — minor

### property.html
- **OG:** `og:title` + `og:description` present, but `og:url` and `og:image` missing

### privacy.html
- **Description:** 116 chars — 4 chars short of the 120-char minimum
- **Canonical:** ❌ Missing — Google will self-select canonical; could cause duplicate-content signals if the page is linked with query strings
- **OG:** No tags
- **Schema:** No schema — a WebPage schema is low-effort and recommended

### terms.html
- **Description:** "ServiceWindow Terms of Service — the rules governing use of the SWFL food truck marketplace." = 92 chars — well below the 120-char minimum
- **Canonical:** ❌ Missing
- **OG:** No tags
- **Schema:** No schema

### success.html / cancel.html / reset-password.html
- All three correctly set `noindex, nofollow` — no action needed on these pages

---

*Generated by automated nightly SEO audit — report only, no HTML files modified.*
