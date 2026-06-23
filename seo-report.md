# SEO Audit Report — servicewindow.app
**Date:** 2026-05-15
**Auditor:** Automated — Claude Code
**Branch:** claude/sharp-fermi-4DBNP

---

## Summary

| Metric | Value |
|--------|-------|
| Pages audited | 15 |
| Pages with zero issues | 7 |
| Pages with issues | 8 |
| Total discrete issues | 28 |

### Top 3 Priority Fixes

1. **success.html / cancel.html / reset-password.html** — Three transactional pages are nearly bare: each is missing `og:title`, `og:description`, `og:url`, `<link rel="canonical">`, and should carry `<meta name="robots" content="noindex, nofollow">` to prevent these post-payment URLs from being indexed. Combined: 18 issues across 3 files.

2. **Short meta descriptions on auth / contact / terms / reset-password** — Four pages have descriptions under 95 characters (auth: 95, contact: 98, terms: 92, reset-password: 34). Search engines may rewrite or truncate these unpredictably. Target: 120–160 characters.

3. **Missing canonical tags on 7 utility pages** — auth.html, contact.html, privacy.html, terms.html, success.html, cancel.html, and reset-password.html all lack `<link rel="canonical">`. Without canonicals, any query-string variant or protocol mismatch can create duplicate-content signals.

---

## Audit Table

> **Legend:** ✅ Pass · ❌ Fail · ⚠️ Present but needs improvement · N/A Not applicable

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ 95 chars | ✅ ¹ | ❌ | N/A | ⚠️ ² | Description too short; no canonical; noindex absent |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ 98 chars | ✅ | ❌ | N/A | ✅ | Description too short; no canonical |
| jobs.html | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ 116 chars | ✅ | ❌ | N/A | ✅ | Description 4 chars under 120-char minimum; no canonical |
| terms.html | ✅ | ❌ 92 chars | ✅ | ❌ | N/A | ✅ | Description too short; no canonical |
| success.html | ✅ | ❌ 48 chars | ❌ ³ | ❌ | N/A | ⚠️ ² | Description too short; og:title/og:description/og:url all missing; no canonical; noindex absent |
| cancel.html | ✅ | ❌ 53 chars | ❌ ³ | ❌ | N/A | ⚠️ ² | Description too short; og:title/og:description/og:url all missing; no canonical; noindex absent |
| reset-password.html | ✅ | ❌ 34 chars | ❌ ³ | ❌ | N/A | ⚠️ ² | Description too short; og:title/og:description/og:url all missing; no canonical; noindex absent |

---

## Footnotes

**¹ auth.html OG tags** — All four OG tags (og:title, og:description, og:url, og:image) are present but placed at line 487, well outside `<head>`. Most crawlers and social parsers expect OG tags in `<head>`; placement in `<body>` may cause social share previews to fail.

**² noindex absent on transactional pages** — success.html, cancel.html, reset-password.html, and auth.html do not have `<meta name="robots" content="noindex, nofollow">`. For check #9 ("not set to noindex") all pages technically pass — none actively block indexing. However, success, cancel, and reset-password are transactional dead-ends that provide no value to organic search and should be excluded from the index.

**³ success / cancel / reset-password OG tags** — Only `og:image` is present on these three pages. `og:title`, `og:description`, and `og:url` are entirely absent.

---

## Per-Page Detail

### index.html
- **Title:** `ServiceWindow — Where Events Find Their Truck | SWFL Food Truck Marketplace` ✅
- **Description:** 160 chars — at the upper boundary, acceptable ✅
- **OG:** title ✅ · description ✅ · url `https://servicewindow.app` ✅ · image ✅
- **Canonical:** `https://servicewindow.app/` ✅
- **Schema:** Present (`WebSite`/`Organization`) ✅
- **Robots:** Not set (defaults to index,follow) ✅

### marketplace.html
- **Title:** `Browse Trucks & Marketplace — ServiceWindow SWFL` ✅
- **Description:** 161 chars — trim by 1 character ⚠️
- **OG:** all four present ✅
- **Canonical:** `https://servicewindow.app/marketplace.html` ✅
- **Schema:** Present ✅
- **Robots:** Not set ✅

### find-trucks.html
- **Title:** `Find a Food Truck Near You — ServiceWindow SWFL` ✅
- **Description:** 155 chars ✅
- **OG:** all four present ✅
- **Canonical:** `https://servicewindow.app/find-trucks.html` ✅
- **Schema:** Present ✅
- **Robots:** Not set ✅

### auth.html
- **Title:** `Sign Up / Log In — ServiceWindow` ✅
- **Description:** `"Sign up or log in to ServiceWindow — the verified food truck marketplace for Southwest Florida."` — 95 chars ❌
- **OG:** All four present but placed in `<body>` at line ~487 ⚠️
- **Canonical:** Missing ❌
- **Schema:** N/A
- **Robots:** noindex absent ⚠️

### pricing.html
- **Title:** `Pricing — ServiceWindow SWFL Food Truck Marketplace` ✅
- **Description:** 134 chars ✅
- **OG:** all four present ✅
- **Canonical:** `https://servicewindow.app/pricing.html` ✅
- **Schema:** Present ✅
- **Robots:** Not set ✅

### about.html
- **Title:** `About | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 153 chars ✅
- **OG:** all four present ✅
- **Canonical:** `https://servicewindow.app/about.html` ✅
- **Schema:** Present ✅
- **Robots:** Not set ✅

### contact.html
- **Title:** `Contact | ServiceWindow` ✅
- **Description:** `"Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support."` — 98 chars ❌
- **OG:** all four present ✅
- **Canonical:** Missing ❌
- **Schema:** N/A
- **Robots:** Not set ✅

### jobs.html
- **Title:** `Jobs Board | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 131 chars ✅
- **OG:** all four present ✅
- **Canonical:** `https://servicewindow.app/jobs.html` ✅
- **Schema:** Present ✅
- **Robots:** Not set ✅

### venues.html
- **Title:** `Venue Partnerships | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 145 chars ✅
- **OG:** all four present ✅
- **Canonical:** `https://servicewindow.app/venues.html` ✅
- **Schema:** Present ✅
- **Robots:** Not set ✅

### property.html
- **Title:** `Parking & Real Estate | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 154 chars ✅
- **OG:** all four present ✅
- **Canonical:** `https://servicewindow.app/property.html` ✅
- **Schema:** Present ✅
- **Robots:** Not set ✅

### privacy.html
- **Title:** `Privacy Policy | ServiceWindow` ✅
- **Description:** `"ServiceWindow Privacy Policy — how we collect, use, and protect your information on the SWFL food truck marketplace."` — 116 chars ⚠️
- **OG:** all four present ✅
- **Canonical:** Missing ❌
- **Schema:** N/A
- **Robots:** Not set ✅

### terms.html
- **Title:** `Terms of Service | ServiceWindow` ✅
- **Description:** `"ServiceWindow Terms of Service — the rules governing use of the SWFL food truck marketplace."` — 92 chars ❌
- **OG:** all four present ✅
- **Canonical:** Missing ❌
- **Schema:** N/A
- **Robots:** Not set ✅

### success.html
- **Title:** `You're In — ServiceWindow` ✅
- **Description:** `"You're in. ServiceWindow subscription confirmed."` — 48 chars ❌
- **OG:** og:image only; og:title / og:description / og:url missing ❌
- **Canonical:** Missing ❌
- **Schema:** N/A
- **Robots:** noindex absent ⚠️

### cancel.html
- **Title:** `No Problem — ServiceWindow` ✅
- **Description:** `"No problem. Your ServiceWindow trial is still active."` — 53 chars ❌
- **OG:** og:image only; og:title / og:description / og:url missing ❌
- **Canonical:** Missing ❌
- **Schema:** N/A
- **Robots:** noindex absent ⚠️

### reset-password.html
- **Title:** `Reset Password — ServiceWindow` ✅
- **Description:** `"Reset your ServiceWindow password."` — 34 chars ❌
- **OG:** og:image only; og:title / og:description / og:url missing ❌
- **Canonical:** Missing ❌
- **Schema:** N/A
- **Robots:** noindex absent ⚠️

---

## Issue Register

| ID | File | Check | Severity | Detail |
|----|------|-------|----------|--------|
| SEO-01 | marketplace.html | Description length | Low | 161 chars; trim to ≤160 |
| SEO-02 | auth.html | Description length | Medium | 95 chars; expand to 120–160 |
| SEO-03 | auth.html | Canonical | Medium | `<link rel="canonical">` absent |
| SEO-04 | auth.html | OG tag placement | Medium | OG block in `<body>` (~line 487); move to `<head>` |
| SEO-05 | auth.html | Robots noindex | Medium | Auth page should carry noindex |
| SEO-06 | contact.html | Description length | Medium | 98 chars; expand to 120–160 |
| SEO-07 | contact.html | Canonical | Medium | `<link rel="canonical">` absent |
| SEO-08 | privacy.html | Description length | Low | 116 chars; expand by 4+ chars |
| SEO-09 | privacy.html | Canonical | Medium | `<link rel="canonical">` absent |
| SEO-10 | terms.html | Description length | Medium | 92 chars; expand to 120–160 |
| SEO-11 | terms.html | Canonical | Medium | `<link rel="canonical">` absent |
| SEO-12 | success.html | Description length | High | 48 chars; or add noindex to remove from consideration |
| SEO-13 | success.html | og:title | High | Missing |
| SEO-14 | success.html | og:description | High | Missing |
| SEO-15 | success.html | og:url | High | Missing |
| SEO-16 | success.html | Canonical | High | `<link rel="canonical">` absent |
| SEO-17 | success.html | Robots noindex | High | Transactional page; should not be indexed |
| SEO-18 | cancel.html | Description length | High | 53 chars; or add noindex |
| SEO-19 | cancel.html | og:title | High | Missing |
| SEO-20 | cancel.html | og:description | High | Missing |
| SEO-21 | cancel.html | og:url | High | Missing |
| SEO-22 | cancel.html | Canonical | High | `<link rel="canonical">` absent |
| SEO-23 | cancel.html | Robots noindex | High | Transactional page; should not be indexed |
| SEO-24 | reset-password.html | Description length | High | 34 chars; or add noindex |
| SEO-25 | reset-password.html | og:title | High | Missing |
| SEO-26 | reset-password.html | og:description | High | Missing |
| SEO-27 | reset-password.html | og:url | High | Missing |
| SEO-28 | reset-password.html | Canonical | High | `<link rel="canonical">` absent |
| SEO-29 | reset-password.html | Robots noindex | High | Utility page; should not be indexed |

_Total: 29 issues across 8 pages (1 low, 11 medium, 17 high)_
