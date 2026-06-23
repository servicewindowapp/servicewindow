# SEO Audit Report — ServiceWindow
**Audit Date:** 2026-06-23  
**Pages Audited:** 15  
**Total Issues Found:** 17  

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages with zero issues | 6 |
| Critical issues (production pages) | 9 |
| Minor/noindex page issues | 8 |

### Top 3 Priority Fixes

1. **Add canonical tags to `privacy.html` and `terms.html`** — both are indexed production pages missing `<link rel="canonical">`, creating duplicate-content risk if Cloudflare or crawlers hit them with query strings.
2. **Fix description lengths** — `marketplace.html` is 163 chars (3 over limit, will truncate in SERPs); `terms.html` is 94 chars and `contact.html` is 100 chars (both under the 120-char minimum, leaving SERP real estate on the table).
3. **Add schema markup to `contact.html`, `privacy.html`, and `terms.html`** — these are the only indexed production pages without any `application/ld+json` block; at minimum an `Organization` type should be present.

> **Bonus flag — content error:** `jobs.html` `og:description` says "21 SWFL cities" but the project standard is **22 cities** (per CLAUDE.md copy rules).

---

## Audit Table

> **Key:** ✅ Pass · ❌ Fail · ⚠️ Present but needs improvement  
> `noindex` annotation = page intentionally excluded from indexing; missing tags on those pages are low-priority.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ All 4 | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars (3 over) | ✅ All 4 | ✅ | ✅ | Description exceeds 160-char limit |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ All 4 | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars, noindex | ✅ All 4 | ❌ | ❌ | `noindex` intentional; canonical & schema missing but acceptable; description short (low priority) |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ All 4 | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ All 4 | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars (under 120) | ✅ All 4 | ✅ | ❌ | Description under minimum; no schema markup |
| `jobs.html` | ✅ | ✅ 133 chars | ⚠️ All 4, content error | ✅ | ✅ | `og:description` says "21 SWFL cities" — should be 22 |
| `venues.html` | ✅ | ✅ 147 chars | ✅ All 4 | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ All 4 | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (under 120) | ✅ All 4 | ❌ | ❌ | Missing canonical; no schema; description 2 chars under minimum |
| `terms.html` | ✅ | ⚠️ 94 chars (under 120) | ✅ All 4 | ❌ | ❌ | Missing canonical; no schema; description 27 chars under minimum |
| `success.html` | ✅ | ⚠️ 48 chars, noindex | ⚠️ og:image only | ❌ | ❌ | `noindex` intentional (post-Stripe); og:title/description/url missing (low priority) |
| `cancel.html` | ✅ | ⚠️ 53 chars, noindex | ⚠️ og:image only | ❌ | ❌ | `noindex` intentional (post-Stripe); og:title/description/url missing (low priority) |
| `reset-password.html` | ✅ | ⚠️ 34 chars, noindex | ⚠️ og:image only | ❌ | ❌ | `noindex` intentional; og:title/description/url missing (low priority) |

---

## Per-Page Detail

### index.html ✅
- **Title:** "Book Verified Food Trucks in Southwest Florida | ServiceWindow"
- **Description:** 160 chars — at the boundary; acceptable but could trim 1–2 words for safety
- **OG:** All 4 tags present, correct domain
- **Canonical:** `https://servicewindow.app/` ✅
- **Schema:** Present ✅
- **Robots:** Not set (defaults to index) ✅

### marketplace.html ⚠️
- **Title:** "Browse Trucks & Marketplace — ServiceWindow SWFL"
- **Description:** 163 chars — **3 chars over 160-char limit**; Google will auto-truncate
- **OG:** All 4 tags present ✅
- **Canonical:** `https://servicewindow.app/marketplace.html` ✅
- **Schema:** Present ✅

### find-trucks.html ✅
- **Title:** "Find a Food Truck Near You — ServiceWindow SWFL"
- **Description:** 157 chars ✅
- **OG:** All 4 tags present ✅
- **Canonical:** `https://servicewindow.app/find-trucks.html` ✅
- **Schema:** Present ✅

### auth.html ⚠️ (noindex)
- **Title:** "Sign Up / Log In — ServiceWindow"
- **Description:** 97 chars — short, but page is `noindex`
- **OG:** All 4 tags present ✅
- **Canonical:** Missing ❌ (low priority — noindex)
- **Schema:** Missing ❌ (low priority — noindex)
- **Robots:** `noindex, nofollow` — intentional ✅

### pricing.html ✅
- **Title:** "Pricing — ServiceWindow SWFL Food Truck Marketplace"
- **Description:** 136 chars ✅
- **OG:** All 4 tags present ✅
- **Canonical:** `https://servicewindow.app/pricing.html` ✅
- **Schema:** Present ✅

### about.html ✅
- **Title:** "About | ServiceWindow — SWFL Food Truck Marketplace"
- **Description:** 155 chars ✅
- **OG:** All 4 tags present ✅
- **Canonical:** `https://servicewindow.app/about.html` ✅
- **Schema:** Present ✅

### contact.html ❌
- **Title:** "Contact | ServiceWindow — SWFL Food Truck Marketplace"
- **Description:** 100 chars — **under 120-char minimum**
- **OG:** All 4 tags present ✅
- **Canonical:** `https://servicewindow.app/contact.html` ✅
- **Schema:** Missing ❌ — add at minimum `{"@type": "ContactPage"}`

### jobs.html ⚠️
- **Title:** "Jobs Board | ServiceWindow — SWFL Food Truck Marketplace"
- **Description:** 133 chars ✅
- **OG:** All 4 tags present; `og:description` contains copy error: says **"21 SWFL cities"** — project standard is **22 cities**
- **Canonical:** `https://servicewindow.app/jobs.html` ✅
- **Schema:** Present ✅

### venues.html ✅
- **Title:** "Venue Partnerships | ServiceWindow — SWFL Food Truck Marketplace"
- **Description:** 147 chars ✅
- **OG:** All 4 tags present ✅
- **Canonical:** `https://servicewindow.app/venues.html` ✅
- **Schema:** Present ✅

### property.html ✅
- **Title:** "Parking & Real Estate | ServiceWindow — SWFL Food Truck Marketplace"
- **Description:** 156 chars ✅
- **OG:** All 4 tags present ✅
- **Canonical:** `https://servicewindow.app/property.html` ✅
- **Schema:** Present ✅

### privacy.html ❌
- **Title:** "Privacy Policy | ServiceWindow"
- **Description:** 118 chars — **2 chars under 120-char minimum**
- **OG:** All 4 tags present ✅
- **Canonical:** Missing ❌ — production indexed page; canonical required
- **Schema:** Missing ❌

### terms.html ❌
- **Title:** "Terms of Service | ServiceWindow"
- **Description:** 94 chars — **27 chars under 120-char minimum**
- **OG:** All 4 tags present ✅
- **Canonical:** Missing ❌ — production indexed page; canonical required
- **Schema:** Missing ❌

### success.html ⚠️ (noindex)
- **Title:** "You're In — ServiceWindow"
- **Description:** 48 chars — very short, but page is `noindex`
- **OG:** Only `og:image` present; `og:title`, `og:description`, `og:url` missing ❌
- **Canonical:** Missing ❌ (low priority — noindex)
- **Schema:** Missing ❌ (low priority — noindex)
- **Robots:** `noindex, nofollow` — intentional ✅

### cancel.html ⚠️ (noindex)
- **Title:** "No Problem — ServiceWindow"
- **Description:** 53 chars — very short, but page is `noindex`
- **OG:** Only `og:image` present; `og:title`, `og:description`, `og:url` missing ❌
- **Canonical:** Missing ❌ (low priority — noindex)
- **Schema:** Missing ❌ (low priority — noindex)
- **Robots:** `noindex, nofollow` — intentional ✅

### reset-password.html ⚠️ (noindex)
- **Title:** "Reset Password — ServiceWindow"
- **Description:** 34 chars — very short, but page is `noindex`
- **OG:** Only `og:image` present; `og:title`, `og:description`, `og:url` missing ❌
- **Canonical:** Missing ❌ (low priority — noindex)
- **Schema:** Missing ❌ (low priority — noindex)
- **Robots:** `noindex, nofollow` — intentional ✅

---

## Issue Index

| # | File | Severity | Issue |
|---|------|----------|-------|
| 1 | `privacy.html` | High | Missing `<link rel="canonical">` on indexed page |
| 2 | `terms.html` | High | Missing `<link rel="canonical">` on indexed page |
| 3 | `terms.html` | Medium | Description only 94 chars (minimum 120) |
| 4 | `contact.html` | Medium | Description only 100 chars (minimum 120) |
| 5 | `privacy.html` | Medium | Description only 118 chars (2 under minimum) |
| 6 | `marketplace.html` | Medium | Description 163 chars (3 over 160-char limit — will truncate) |
| 7 | `contact.html` | Medium | Missing schema markup |
| 8 | `privacy.html` | Medium | Missing schema markup |
| 9 | `terms.html` | Medium | Missing schema markup |
| 10 | `jobs.html` | Low | `og:description` says "21 SWFL cities" — copy standard is 22 |
| 11 | `auth.html` | Low (noindex) | Description only 97 chars |
| 12 | `success.html` | Low (noindex) | Missing `og:title`, `og:description`, `og:url` |
| 13 | `cancel.html` | Low (noindex) | Missing `og:title`, `og:description`, `og:url` |
| 14 | `reset-password.html` | Low (noindex) | Missing `og:title`, `og:description`, `og:url` |
| 15 | `success.html` | Low (noindex) | Description only 48 chars |
| 16 | `cancel.html` | Low (noindex) | Description only 53 chars |
| 17 | `reset-password.html` | Low (noindex) | Description only 34 chars |
