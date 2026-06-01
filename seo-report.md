# SEO Audit Report — ServiceWindow
> **Date:** 2026-05-28
> **Auditor:** Automated metadata audit (15 production HTML pages)

---

## Summary

| Metric | Value |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 6 |
| Pages with issues | 9 |
| Total issues found | 27 |
| Pages correctly noindexed (utility) | 3 (success, cancel, reset-password) |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — both are indexable, publicly linked legal pages with no canonical tag, creating a duplicate-content risk if ever syndicated or accessed via multiple paths.
2. **Expand meta descriptions on `contact.html` (98 chars), `terms.html` (92 chars), and `privacy.html` (116 chars)** — all fall below the 120-char floor; Google will auto-generate substitutes, losing keyword control on these pages.
3. **Add schema markup to `contact.html`** — it is a public, indexable page with no structured data; a `ContactPage` or `LocalBusiness` JSON-LD block would improve rich-result eligibility.

---

## Full Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 chars | ✅ | ❌ Missing | ❌ Missing | Description short (95 chars, floor 120); no canonical; no schema. Robots: noindex ✅ (appropriate) |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 98 chars | ✅ | ✅ | ❌ Missing | Description short (98 chars); no schema markup |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars | ✅ | ❌ Missing | ❌ Missing | Description slightly short (116 chars); no canonical; no schema |
| `terms.html` | ✅ | ⚠️ 92 chars | ✅ | ❌ Missing | ❌ Missing | Description short (92 chars); no canonical; no schema |
| `success.html` | ✅ | ⚠️ 48 chars | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | Noindex ✅ (appropriate). OG tags incomplete (only og:image present); short description; no canonical; no schema |
| `cancel.html` | ✅ | ⚠️ 53 chars | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | Noindex ✅ (appropriate). OG tags incomplete (only og:image present); short description; no canonical; no schema |
| `reset-password.html` | ✅ | ⚠️ 34 chars | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | Noindex ✅ (appropriate). OG tags incomplete (only og:image present); short description; no canonical; no schema |

---

## Detailed Findings by Check

### 1. `<title>` Tag
All 15 pages: **✅ Pass** — titles are present, descriptive, and include the ServiceWindow brand.

### 2. Meta Description (120–160 chars)
| Status | Pages |
|--------|-------|
| ✅ Pass (120–160) | index.html, find-trucks.html, pricing.html, about.html, jobs.html, venues.html, property.html |
| ⚠️ 1 char over (161) | marketplace.html |
| ⚠️ Slightly short (116) | privacy.html |
| ⚠️ Short (<120) | auth.html (95), contact.html (98), terms.html (92) |
| ⚠️ Very short (noindex pages) | success.html (48), cancel.html (53), reset-password.html (34) |

### 3. OG Tags (og:title, og:description, og:url, og:image)
All 4 OG tags are present and in `<head>` for 12 pages.  
`success.html`, `cancel.html`, `reset-password.html` only carry `og:image` — og:title, og:description, og:url are missing on all three. Low SEO priority (noindex), but social share previews will be broken if anyone shares these URLs.

### 4. `<link rel="canonical">`
| Status | Pages |
|--------|-------|
| ✅ Present, correct domain | index.html, marketplace.html, find-trucks.html, pricing.html, about.html, contact.html, jobs.html, venues.html, property.html |
| ❌ Missing | auth.html, privacy.html, terms.html, success.html, cancel.html, reset-password.html |

Missing on noindex pages (success/cancel/reset-password) is low-impact. Missing on **privacy.html** and **terms.html** (indexable) is a real gap.

### 5. Schema Markup (`<script type="application/ld+json">`)
| Status | Pages |
|--------|-------|
| ✅ Present in `<head>` | index.html, marketplace.html, find-trucks.html, pricing.html, about.html, jobs.html, venues.html, property.html |
| ❌ Missing | contact.html, auth.html, privacy.html, terms.html, success.html, cancel.html, reset-password.html |

Schema is required on index.html ✅ (confirmed). Missing on `contact.html` is the most actionable gap among indexable pages.

### 6. `<meta name="robots">` — noindex check
No production page is incorrectly noindexed.  
Three utility pages correctly carry `noindex, nofollow`: `auth.html`, `success.html`, `cancel.html`, `reset-password.html`.  
Wait — `auth.html` is noindex: this is appropriate (login/signup pages should not be indexed).

---

## Issue Count by Page

| Page | Issue Count | Indexable? |
|------|-------------|------------|
| index.html | 0 | ✅ |
| marketplace.html | 1 | ✅ |
| find-trucks.html | 0 | ✅ |
| auth.html | 3 | noindex |
| pricing.html | 0 | ✅ |
| about.html | 0 | ✅ |
| contact.html | 2 | ✅ |
| jobs.html | 0 | ✅ |
| venues.html | 0 | ✅ |
| property.html | 0 | ✅ |
| privacy.html | 3 | ✅ |
| terms.html | 3 | ✅ |
| success.html | 5 | noindex |
| cancel.html | 5 | noindex |
| reset-password.html | 5 | noindex |
| **Total** | **27** | |
