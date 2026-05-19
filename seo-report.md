# SEO Audit Report — ServiceWindow
**Date:** 2026-05-19
**Auditor:** Automated metadata audit
**Scope:** 15 production HTML pages

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 6 |
| Pages with issues | 9 |
| Total issues found | 29 |

### Top 3 Priority Fixes

1. **Fix success.html, cancel.html, reset-password.html (18 issues)** — All three transactional/utility pages are missing `og:title`, `og:description`, `og:url`, and `<link rel="canonical">`. Descriptions are severely short (34–53 chars). None carry `<meta name="robots" content="noindex">`, meaning Googlebot can index post-payment and password-reset pages.

2. **Add canonical tags to auth.html, privacy.html, terms.html (3 missing canonicals)** — Three pages with otherwise solid metadata are missing `<link rel="canonical">`, leaving Google to guess the preferred URL for auth and legal pages.

3. **Expand short descriptions on auth.html, contact.html, terms.html (3 under-length)** — All three are below the 120-char minimum (97, 100, and 94 chars respectively), risking Google rewriting the snippet with less-targeted text.

---

## Audit Table

> **Legend:** ✅ Pass · ❌ Fail · ⚠️ Present but needs improvement · N/A Not applicable

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ⚠️ 160 chars (at ceiling) | ✅ | ✅ | ✅ | Description sits exactly at 160-char max; trim 1–2 words to add buffer |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over max) | ✅ | ✅ | ✅ | Description exceeds 160-char limit by 1 char; minor trim needed |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars (min: 120) | ✅ | ❌ | N/A | Missing canonical; description 23 chars under minimum; consider `noindex` |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars (min: 120) | ✅ | ✅ | ❌ | Description 20 chars under minimum; missing ContactPage schema |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (min: 120) | ✅ | ❌ | N/A | Missing canonical; description 2 chars under minimum |
| `terms.html` | ✅ | ⚠️ 94 chars (min: 120) | ✅ | ❌ | N/A | Missing canonical; description 26 chars under minimum |
| `success.html` | ✅ | ❌ 48 chars | ❌ | ❌ | N/A | Missing `og:title`, `og:description`, `og:url`; description 72 chars under min; missing canonical; no `noindex` |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ | ❌ | N/A | Missing `og:title`, `og:description`, `og:url`; description 67 chars under min; missing canonical; no `noindex` |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ | ❌ | N/A | Missing `og:title`, `og:description`, `og:url`; description 86 chars under min; missing canonical; no `noindex` |

---

## Per-Page Detail

### index.html
- **Title:** `ServiceWindow — Where Events Find Their Truck | SWFL Food Truck Marketplace` ✅
- **Description:** 160 chars — `ServiceWindow is the verified food truck marketplace for Southwest Florida. Stop posting in Facebook groups. Book verified trucks for your event, HOA, or venue.` ⚠️
- **og:title:** `ServiceWindow — Where Events Find Their Truck` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/` ✅
- **Schema:** ✅ (static ld+json in `<head>`)
- **Robots:** Not set ✅ (no noindex)

---

### marketplace.html
- **Title:** `Browse Trucks & Marketplace — ServiceWindow SWFL` ✅
- **Description:** 161 chars — over 160-char limit by 1 ⚠️
- **og:title:** `SWFL Food Truck Marketplace — ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/marketplace.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/marketplace.html` ✅
- **Schema:** ✅ (static + dynamic)
- **Robots:** Not set ✅

---

### find-trucks.html
- **Title:** `Find a Food Truck Near You — ServiceWindow SWFL` ✅
- **Description:** 155 chars ✅
- **og:title:** `Find a Food Truck — ServiceWindow SWFL` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/find-trucks.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/find-trucks.html` ✅
- **Schema:** ✅ (`CollectionPage`)
- **Robots:** Not set ✅

---

### auth.html
- **Title:** `Sign Up / Log In — ServiceWindow` ✅
- **Description:** 97 chars — `Sign up or log in to ServiceWindow — the verified food truck marketplace for Southwest Florida.` ⚠️
- **og:title:** `Sign Up or Log In — ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/auth.html` ✅ · **og:image:** ✅
- **Canonical:** ❌ **MISSING**
- **Schema:** N/A
- **Robots:** Not set ⚠️ — auth page may warrant `noindex`

---

### pricing.html
- **Title:** `Pricing — ServiceWindow SWFL Food Truck Marketplace` ✅
- **Description:** 136 chars ✅
- **og:title:** `Pricing — ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/pricing.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/pricing.html` ✅
- **Schema:** ✅
- **Robots:** Not set ✅

---

### about.html
- **Title:** `About | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 155 chars ✅
- **og:title:** `About ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/about.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/about.html` ✅
- **Schema:** ✅
- **Robots:** Not set ✅

---

### contact.html
- **Title:** `Contact | ServiceWindow` ✅
- **Description:** 100 chars — `Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support.` ⚠️
- **og:title:** `Contact ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/contact.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/contact.html` ✅
- **Schema:** ❌ **MISSING** — recommend `ContactPage` or `LocalBusiness` ld+json
- **Robots:** Not set ✅

---

### jobs.html
- **Title:** `Jobs Board | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 133 chars ✅
- **og:title:** `Jobs Board | ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/jobs.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/jobs.html` ✅
- **Schema:** ✅
- **Robots:** Not set ✅

---

### venues.html
- **Title:** `Venue Partnerships | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 147 chars ✅
- **og:title:** `Venue Partnerships | ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/venues.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/venues.html` ✅
- **Schema:** ✅
- **Robots:** Not set ✅

---

### property.html
- **Title:** `Parking & Real Estate | ServiceWindow — SWFL Food Truck Marketplace` ✅
- **Description:** 156 chars ✅
- **og:title:** `Parking & Real Estate | ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/property.html` ✅ · **og:image:** ✅
- **Canonical:** `https://servicewindow.app/property.html` ✅
- **Schema:** ✅
- **Robots:** Not set ✅

---

### privacy.html
- **Title:** `Privacy Policy | ServiceWindow` ✅
- **Description:** 118 chars — `ServiceWindow Privacy Policy — how we collect, use, and protect your information on the SWFL food truck marketplace.` ⚠️
- **og:title:** `Privacy Policy — ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/privacy.html` ✅ · **og:image:** ✅
- **Canonical:** ❌ **MISSING**
- **Schema:** N/A
- **Robots:** Not set — legal pages are often `noindex`; evaluate intent

---

### terms.html
- **Title:** `Terms of Service | ServiceWindow` ✅
- **Description:** 94 chars — `ServiceWindow Terms of Service — the rules governing use of the SWFL food truck marketplace.` ⚠️
- **og:title:** `Terms of Service — ServiceWindow` ✅
- **og:description:** Present ✅ · **og:url:** `https://servicewindow.app/terms.html` ✅ · **og:image:** ✅
- **Canonical:** ❌ **MISSING**
- **Schema:** N/A
- **Robots:** Not set — legal pages are often `noindex`; evaluate intent

---

### success.html
- **Title:** `You're In — ServiceWindow` ✅
- **Description:** 48 chars — `You're in. ServiceWindow subscription confirmed.` ❌
- **og:title:** ❌ **MISSING**
- **og:description:** ❌ **MISSING**
- **og:url:** ❌ **MISSING**
- **og:image:** ✅
- **Canonical:** ❌ **MISSING**
- **Schema:** N/A
- **Robots:** Not set ❌ — post-payment page **must be noindex**

---

### cancel.html
- **Title:** `No Problem — ServiceWindow` ✅
- **Description:** 53 chars — `No problem. Your ServiceWindow trial is still active.` ❌
- **og:title:** ❌ **MISSING**
- **og:description:** ❌ **MISSING**
- **og:url:** ❌ **MISSING**
- **og:image:** ✅
- **Canonical:** ❌ **MISSING**
- **Schema:** N/A
- **Robots:** Not set ❌ — post-payment cancellation page **must be noindex**

---

### reset-password.html
- **Title:** `Reset Password — ServiceWindow` ✅
- **Description:** 34 chars — `Reset your ServiceWindow password.` ❌
- **og:title:** ❌ **MISSING**
- **og:description:** ❌ **MISSING**
- **og:url:** ❌ **MISSING**
- **og:image:** ✅
- **Canonical:** ❌ **MISSING**
- **Schema:** N/A
- **Robots:** Not set ❌ — utility/auth page **must be noindex**

---

## Issue Index

| # | File | Category | Detail |
|---|------|----------|--------|
| 1 | index.html | Description length | 160 chars — at 160-char ceiling; trim 1–2 words |
| 2 | marketplace.html | Description length | 161 chars — 1 char over 160-char limit |
| 3 | auth.html | Canonical | Missing `<link rel="canonical">` |
| 4 | auth.html | Description length | 97 chars — 23 below 120-char minimum |
| 5 | auth.html | Robots | No `noindex`; auth page may be crawled and indexed |
| 6 | contact.html | Description length | 100 chars — 20 below 120-char minimum |
| 7 | contact.html | Schema | No ld+json schema on ContactPage |
| 8 | privacy.html | Canonical | Missing `<link rel="canonical">` |
| 9 | privacy.html | Description length | 118 chars — 2 below 120-char minimum |
| 10 | terms.html | Canonical | Missing `<link rel="canonical">` |
| 11 | terms.html | Description length | 94 chars — 26 below 120-char minimum |
| 12 | success.html | Description length | 48 chars — 72 below 120-char minimum |
| 13 | success.html | OG Tags | Missing `og:title` |
| 14 | success.html | OG Tags | Missing `og:description` |
| 15 | success.html | OG Tags | Missing `og:url` |
| 16 | success.html | Canonical | Missing `<link rel="canonical">` |
| 17 | success.html | Robots | No `noindex` — post-payment page must not be indexed |
| 18 | cancel.html | Description length | 53 chars — 67 below 120-char minimum |
| 19 | cancel.html | OG Tags | Missing `og:title` |
| 20 | cancel.html | OG Tags | Missing `og:description` |
| 21 | cancel.html | OG Tags | Missing `og:url` |
| 22 | cancel.html | Canonical | Missing `<link rel="canonical">` |
| 23 | cancel.html | Robots | No `noindex` — post-payment page must not be indexed |
| 24 | reset-password.html | Description length | 34 chars — 86 below 120-char minimum |
| 25 | reset-password.html | OG Tags | Missing `og:title` |
| 26 | reset-password.html | OG Tags | Missing `og:description` |
| 27 | reset-password.html | OG Tags | Missing `og:url` |
| 28 | reset-password.html | Canonical | Missing `<link rel="canonical">` |
| 29 | reset-password.html | Robots | No `noindex` — utility page must not be indexed |
