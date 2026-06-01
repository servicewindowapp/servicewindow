# ServiceWindow — SEO Audit Report
**Date:** 2026-05-26  
**Pages Audited:** 15  
**Total Issues Found:** 28  

---

## Summary

| Metric | Value |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 7 |
| Pages with issues | 8 |
| Total issues (❌ + ⚠️) | 28 |
| Critical failures (❌) | 18 |
| Warnings (⚠️) | 10 |

### Top 3 Priority Fixes

1. **success.html · cancel.html · reset-password.html** — All three post-flow utility pages are missing `og:title`, `og:description`, `og:url`, and `<link rel="canonical">`. Meta descriptions are also extremely short (34–53 chars). 18 combined issues across these three files.

2. **auth.html** — Missing `<link rel="canonical">`. OG tags are placed at the very bottom of `<head>` (line 611) instead of the top — technically valid but non-standard and may cause crawler issues. Description is 95 chars (below 120 minimum). Page is also marked `noindex`.

3. **privacy.html · terms.html** — Both missing `<link rel="canonical">`. Descriptions are short (92 and 116 chars respectively). Canonical tags are essential here to prevent duplicate-content signals from crawler variations of these URLs.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | — |
| marketplace.html | ✅ | ⚠️ 161 chars (1 over limit) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ⚠️ 95 chars (below 120) | ⚠️ Present but placed at end of `<head>` (line 611) | ❌ Missing | ❌ Missing | `noindex` set; canonical absent; desc short; OG tag placement non-standard |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ⚠️ 98 chars (below 120) | ✅ | ✅ | ❌ Missing | Desc short; no schema (low priority) |
| jobs.html | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ | — |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ 116 chars (below 120) | ✅ | ❌ Missing | ❌ Missing | Canonical absent; desc slightly short |
| terms.html | ✅ | ⚠️ 92 chars (below 120) | ✅ | ❌ Missing | ❌ Missing | Canonical absent; desc short |
| success.html | ✅ | ⚠️ 48 chars (very short) | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | `noindex` set (intentional); 3 OG tags absent; canonical absent; desc very short |
| cancel.html | ✅ | ⚠️ 53 chars (very short) | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | `noindex` set (intentional); 3 OG tags absent; canonical absent; desc very short |
| reset-password.html | ✅ | ⚠️ 34 chars (very short) | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | `noindex` set (intentional); 3 OG tags absent; canonical absent; desc very short |

---

## Per-Page Detail

### index.html ✅ Clean
- **Title:** ServiceWindow — Where Events Find Their Truck | SWFL Food Truck Marketplace
- **Description:** 160 chars — at the maximum, borderline acceptable
- **OG:** All four tags present and correct
- **Canonical:** `https://servicewindow.app/` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set (defaults to index) ✅

---

### marketplace.html ⚠️ 1 issue
- **Title:** Browse Trucks & Marketplace — ServiceWindow SWFL
- **Description:** 161 chars — 1 character over the 160-char guideline
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/marketplace.html` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set ✅

---

### find-trucks.html ✅ Clean
- **Title:** Find a Food Truck Near You — ServiceWindow SWFL
- **Description:** 155 chars ✅
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/find-trucks.html` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set ✅

---

### auth.html ❌ 4 issues
- **Title:** Sign Up / Log In — ServiceWindow
- **Description:** 95 chars — below 120-char minimum
- **OG:** All four tag values are correct but the entire OG block is at line 611, the very end of `<head>`. All prior `<head>` content (styles, scripts) intervenes. Technically valid; crawlers may process it, but early-placement is best practice.
- **Canonical:** **Missing** — no `<link rel="canonical">` found anywhere in the file
- **Schema:** Not present (utility page — low priority)
- **Robots:** `noindex, nofollow` — set intentionally to prevent indexing of login page; flagged per audit criteria as a production page

---

### pricing.html ✅ Clean
- **Title:** Pricing — ServiceWindow SWFL Food Truck Marketplace
- **Description:** 134 chars ✅
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/pricing.html` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set ✅

---

### about.html ✅ Clean
- **Title:** About | ServiceWindow — SWFL Food Truck Marketplace
- **Description:** 153 chars ✅
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/about.html` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set ✅

---

### contact.html ⚠️ 1 issue
- **Title:** Contact | ServiceWindow
- **Description:** 98 chars — below 120-char minimum
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/contact.html` ✅
- **Schema:** Not present — low priority for a contact page
- **Robots:** Not set ✅

---

### jobs.html ✅ Clean
- **Title:** Jobs Board | ServiceWindow — SWFL Food Truck Marketplace
- **Description:** 131 chars ✅
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/jobs.html` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set ✅

---

### venues.html ✅ Clean
- **Title:** Venue Partnerships | ServiceWindow — SWFL Food Truck Marketplace
- **Description:** 145 chars ✅
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/venues.html` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set ✅

---

### property.html ✅ Clean
- **Title:** Parking & Real Estate | ServiceWindow — SWFL Food Truck Marketplace
- **Description:** 154 chars ✅
- **OG:** All four tags present ✅
- **Canonical:** `https://servicewindow.app/property.html` ✅
- **Schema:** `application/ld+json` present ✅
- **Robots:** Not set ✅

---

### privacy.html ❌ 2 issues
- **Title:** Privacy Policy | ServiceWindow
- **Description:** 116 chars — 4 chars below 120-char minimum
- **OG:** All four tags present ✅
- **Canonical:** **Missing** — no `<link rel="canonical">` found
- **Schema:** Not present (legal page — acceptable)
- **Robots:** Not set ✅

---

### terms.html ❌ 2 issues
- **Title:** Terms of Service | ServiceWindow
- **Description:** 92 chars — below 120-char minimum
- **OG:** All four tags present ✅
- **Canonical:** **Missing** — no `<link rel="canonical">` found
- **Schema:** Not present (legal page — acceptable)
- **Robots:** Not set ✅

---

### success.html ❌ 6 issues
- **Title:** You're In — ServiceWindow
- **Description:** 48 chars — far below 120-char minimum
- **OG:** `og:image` present; `og:title`, `og:description`, `og:url` all **missing**
- **Canonical:** **Missing**
- **Schema:** Not present (post-payment page — acceptable)
- **Robots:** `noindex, nofollow` — intentional for post-Stripe success page; flagged per audit criteria

---

### cancel.html ❌ 6 issues
- **Title:** No Problem — ServiceWindow
- **Description:** 53 chars — far below 120-char minimum
- **OG:** `og:image` present; `og:title`, `og:description`, `og:url` all **missing**
- **Canonical:** **Missing**
- **Schema:** Not present (post-payment page — acceptable)
- **Robots:** `noindex, nofollow` — intentional for post-Stripe cancel page; flagged per audit criteria

---

### reset-password.html ❌ 6 issues
- **Title:** Reset Password — ServiceWindow
- **Description:** 34 chars — far below 120-char minimum
- **OG:** `og:image` present; `og:title`, `og:description`, `og:url` all **missing**
- **Canonical:** **Missing**
- **Schema:** Not present (utility page — acceptable)
- **Robots:** `noindex, nofollow` — intentional for password-reset utility page; flagged per audit criteria

---

## Issue Index

| # | File | Tag | Status | Detail |
|---|------|-----|--------|--------|
| 1 | marketplace.html | `<meta description>` | ⚠️ | 161 chars — 1 over limit |
| 2 | auth.html | `<meta name="robots">` | ❌ | noindex set on production page |
| 3 | auth.html | `<meta description>` | ⚠️ | 95 chars — below 120 |
| 4 | auth.html | OG tags | ⚠️ | All present but placed at end of `<head>` (line 611) |
| 5 | auth.html | `<link rel="canonical">` | ❌ | Missing |
| 6 | contact.html | `<meta description>` | ⚠️ | 98 chars — below 120 |
| 7 | privacy.html | `<meta description>` | ⚠️ | 116 chars — below 120 |
| 8 | privacy.html | `<link rel="canonical">` | ❌ | Missing |
| 9 | terms.html | `<meta description>` | ⚠️ | 92 chars — below 120 |
| 10 | terms.html | `<link rel="canonical">` | ❌ | Missing |
| 11 | success.html | `<meta name="robots">` | ❌ | noindex set on production page |
| 12 | success.html | `<meta description>` | ⚠️ | 48 chars — far below 120 |
| 13 | success.html | `og:title` | ❌ | Missing |
| 14 | success.html | `og:description` | ❌ | Missing |
| 15 | success.html | `og:url` | ❌ | Missing |
| 16 | success.html | `<link rel="canonical">` | ❌ | Missing |
| 17 | cancel.html | `<meta name="robots">` | ❌ | noindex set on production page |
| 18 | cancel.html | `<meta description>` | ⚠️ | 53 chars — far below 120 |
| 19 | cancel.html | `og:title` | ❌ | Missing |
| 20 | cancel.html | `og:description` | ❌ | Missing |
| 21 | cancel.html | `og:url` | ❌ | Missing |
| 22 | cancel.html | `<link rel="canonical">` | ❌ | Missing |
| 23 | reset-password.html | `<meta name="robots">` | ❌ | noindex set on production page |
| 24 | reset-password.html | `<meta description>` | ⚠️ | 34 chars — far below 120 |
| 25 | reset-password.html | `og:title` | ❌ | Missing |
| 26 | reset-password.html | `og:description` | ❌ | Missing |
| 27 | reset-password.html | `og:url` | ❌ | Missing |
| 28 | reset-password.html | `<link rel="canonical">` | ❌ | Missing |

---

*Generated by automated SEO audit · 2026-05-26*
