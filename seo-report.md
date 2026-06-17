# ServiceWindow — SEO & Metadata Audit
**Date:** 2026-05-25  
**Pages audited:** 15  
**Total issues found:** 26 (14 on indexable pages · 12 on intentionally noindexed pages)  
**Audited by:** Automated nightly check

---

## Summary

| Stat | Value |
|------|-------|
| Pages passing all checks | 6 of 15 |
| Pages with ≥1 issue | 9 of 15 |
| Missing canonical tags | 6 pages |
| Missing schema markup | 7 pages |
| Descriptions out of 120–160 char range | 8 pages |
| Content errors (city count) | 1 page |

---

## Top 3 Priority Fixes

**1. jobs.html — City count content error (high impact)**  
Both `og:description` and the `<script type="application/ld+json">` block read "21 SWFL cities." Per site copy rules, the canonical count is **22**. This is incorrect in two places and contradicts every other page on the site.

**2. terms.html + privacy.html — Missing canonical tags (medium impact)**  
Neither policy page has a `<link rel="canonical">`. Duplicate-content risk if pages are ever fetched via HTTP or with query strings. `terms.html` description is also only 92 characters (28 short of the 120-char minimum).

**3. auth.html — noindex on the signup/login page (medium impact)**  
`auth.html` is set to `noindex, nofollow`, making the registration entry point invisible to search engines. If the intent is to exclude it from indexing, this is fine — but it should be a deliberate decision, not an oversight. The page is also missing a canonical tag and its meta description is only 95 characters.

---

## Full Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars (+1 over) | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 chars | ✅ | ❌ Missing | ❌ Missing | `noindex` set ⚠️; description short (95); no canonical; no schema |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 98 chars | ✅ | ✅ | ❌ Missing | Description short (98); no schema |
| `jobs.html` | ✅ | ✅ 131 chars | ⚠️ Content error | ✅ | ⚠️ Content error | og:description + JSON-LD both say "21 SWFL cities" — should be **22** |
| `venues.html` | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars | ✅ | ❌ Missing | ❌ Missing | Description short (116); no canonical; no schema |
| `terms.html` | ✅ | ❌ 92 chars | ✅ | ❌ Missing | ❌ Missing | Description short (92); no canonical; no schema |
| `success.html` †| ✅ | ❌ 48 chars | ❌ og:title · og:description · og:url absent | ❌ Missing | ❌ Missing | Post-transaction page; `noindex` appropriate. OG incomplete if shared. |
| `cancel.html` †| ✅ | ❌ 53 chars | ❌ og:title · og:description · og:url absent | ❌ Missing | ❌ Missing | Post-transaction page; `noindex` appropriate. OG incomplete if shared. |
| `reset-password.html` †| ✅ | ❌ 34 chars | ❌ og:title · og:description · og:url absent | ❌ Missing | ❌ Missing | Utility page; `noindex` appropriate. OG incomplete if shared. |

† Pages marked with † have `<meta name="robots" content="noindex, nofollow">` — this is **appropriate** for post-transaction and utility pages. Issues on these pages are lower priority.

---

## Check Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Pass — present and correct |
| ⚠️ | Present but needs improvement |
| ❌ | Fail — missing or critically incorrect |

---

## Per-Page Detail

### index.html ✅
- Title: `ServiceWindow — Where Events Find Their Truck | SWFL Food Truck Marketplace`
- Description: 160 chars — at limit, acceptable
- All OG tags present with correct `servicewindow.app` domain
- Canonical: `https://servicewindow.app/`
- Schema: ✅ `application/ld+json` in `<head>`
- Robots: not set (indexable)

### marketplace.html ⚠️
- Title: `Browse Trucks & Marketplace — ServiceWindow SWFL`
- Description: 161 chars — 1 over the 160-char limit (minor)
- All OG tags present
- Canonical: `https://servicewindow.app/marketplace.html`
- Schema: ✅

### find-trucks.html ✅
- Title: `Find a Food Truck Near You — ServiceWindow SWFL`
- Description: 155 chars
- All OG tags present
- Canonical: `https://servicewindow.app/find-trucks.html`
- Schema: ✅

### auth.html ❌
- Title: `Sign Up / Log In — ServiceWindow`
- Description: 95 chars — 25 short of minimum
- OG tags: all 4 present (og:title, og:description, og:url, og:image)
- Canonical: **missing**
- Schema: **missing**
- Robots: `noindex, nofollow` — investigate whether intentional

### pricing.html ✅
- Title: `Pricing — ServiceWindow SWFL Food Truck Marketplace`
- Description: 134 chars
- All OG tags present
- Canonical: `https://servicewindow.app/pricing.html`
- Schema: ✅

### about.html ✅
- Title: `About | ServiceWindow — SWFL Food Truck Marketplace`
- Description: 153 chars
- All OG tags present
- Canonical: `https://servicewindow.app/about.html`
- Schema: ✅

### contact.html ❌
- Title: `Contact | ServiceWindow`
- Description: 98 chars — 22 short of minimum
- OG tags: all 4 present
- Canonical: `https://servicewindow.app/contact.html`
- Schema: **missing**

### jobs.html ⚠️
- Title: `Jobs Board | ServiceWindow — SWFL Food Truck Marketplace`
- Description: 131 chars
- OG `og:description`: says **"21 SWFL cities"** — should be **22**
- JSON-LD `description`: also says **"21 SWFL cities"** — should be **22**
- Canonical: `https://servicewindow.app/jobs.html`
- Schema: present but contains city count error

### venues.html ✅
- Title: `Venue Partnerships | ServiceWindow — SWFL Food Truck Marketplace`
- Description: 145 chars
- All OG tags present
- Canonical: `https://servicewindow.app/venues.html`
- Schema: ✅

### property.html ✅
- Title: `Parking & Real Estate | ServiceWindow — SWFL Food Truck Marketplace`
- Description: 154 chars
- All OG tags present
- Canonical: `https://servicewindow.app/property.html`
- Schema: ✅

### privacy.html ❌
- Title: `Privacy Policy | ServiceWindow`
- Description: 116 chars — 4 short of minimum
- OG tags: all 4 present
- Canonical: **missing**
- Schema: **missing** (not critical for a policy page, but noted)

### terms.html ❌
- Title: `Terms of Service | ServiceWindow`
- Description: 92 chars — 28 short of minimum
- OG tags: all 4 present
- Canonical: **missing**
- Schema: **missing** (not critical for a policy page, but noted)

### success.html † ⚠️
- Robots: `noindex, nofollow` — appropriate for post-transaction page
- Description: 48 chars — short, but low priority given noindex
- OG tags: only `og:image` present; `og:title`, `og:description`, `og:url` absent
- Canonical: missing (low priority given noindex)

### cancel.html † ⚠️
- Robots: `noindex, nofollow` — appropriate for post-transaction page
- Description: 53 chars — short, but low priority given noindex
- OG tags: only `og:image` present; `og:title`, `og:description`, `og:url` absent
- Canonical: missing (low priority given noindex)

### reset-password.html † ⚠️
- Robots: `noindex, nofollow` — appropriate for utility page
- Description: 34 chars — short, but low priority given noindex
- OG tags: only `og:image` present; `og:title`, `og:description`, `og:url` absent
- Canonical: missing (low priority given noindex)

