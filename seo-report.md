# SEO Audit Report — ServiceWindow
**Date:** 2026-05-18  
**Pages audited:** 15  
**Total issues found:** 32  
**Pages fully passing:** 5 (find-trucks, pricing, about, venues, property)

---

## Summary

### Top 3 Priority Fixes

1. **success.html / cancel.html / reset-password.html** — These post-transaction and utility pages each have 6 failures: description too short, og:title/og:description/og:url all missing, no canonical, no schema. They are also currently crawlable with no `noindex` directive, meaning Google may index pages like "You're In" and "No Problem." Add `noindex,nofollow` robots meta plus all missing tags.

2. **auth.html** — Missing canonical link and schema markup; description is only 95 chars (minimum is 120). High-traffic page with partial OG coverage.

3. **terms.html + privacy.html** — Both missing canonical and schema; terms description is 92 chars and privacy is 116 chars (both below 120-char minimum). Legal pages that should be fully indexed deserve complete metadata.

---

## Audit Table

Checks: **Title** = present and descriptive | **Description** = 120–160 chars | **OG Tags** = og:title + og:description + og:url + og:image all present | **Canonical** = present with servicewindow.app domain | **Schema** = `<script type="application/ld+json">` present | **Robots** = not set to noindex

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ⚠️ 160 chars (at ceiling) | ✅ | ✅ | ✅ | Description is exactly at the 160-char limit — trim 1–2 words to give crawlers headroom |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over) | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | — |
| `auth.html` | ✅ | ❌ 95 chars | ✅ | ❌ Missing | ❌ Missing | Description too short (min 120); no canonical; no schema |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | — |
| `about.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | — |
| `contact.html` | ✅ | ❌ 98 chars | ✅ | ✅ | ❌ Missing | Description too short (min 120); no schema |
| `jobs.html` | ✅ | ✅ 131 chars | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities" — current count is 22; update to match |
| `venues.html` | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | — |
| `property.html` | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | — |
| `privacy.html` | ✅ | ⚠️ 116 chars (4 short) | ✅ | ❌ Missing | ❌ Missing | Description 4 chars under 120-char minimum; no canonical; no schema |
| `terms.html` | ✅ | ❌ 92 chars | ✅ | ❌ Missing | ❌ Missing | Description too short (min 120); no canonical; no schema |
| `success.html` | ✅ | ❌ 48 chars | ❌ og:title, og:description, og:url missing | ❌ Missing | ❌ Missing | 6 failures — post-transaction page; add `noindex,nofollow` robots meta; add all OG tags + canonical |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ og:title, og:description, og:url missing | ❌ Missing | ❌ Missing | 6 failures — post-transaction page; add `noindex,nofollow` robots meta; add all OG tags + canonical |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ og:title, og:description, og:url missing | ❌ Missing | ❌ Missing | 6 failures — utility page; add `noindex,nofollow` robots meta; add all OG tags + canonical |

---

## Check-by-Check Summary

| Check | Pass | Warn | Fail |
|-------|------|------|------|
| `<title>` present and descriptive | 15 | 0 | 0 |
| `<meta name="description">` 120–160 chars | 8 | 3 | 4 |
| `<meta property="og:title">` present | 12 | 0 | 3 |
| `<meta property="og:description">` present | 12 | 0 | 3 |
| `<meta property="og:url">` present | 12 | 0 | 3 |
| `<meta property="og:image">` present | 15 | 0 | 0 |
| `<link rel="canonical">` with servicewindow.app | 9 | 0 | 6 |
| Schema markup (`application/ld+json`) | 9 | 0 | 6 |
| `<meta name="robots">` not set to noindex | 15 | 0 | 0 |

> **Robots note:** No page is currently blocking indexing (pass for the noindex check). However, `success.html`, `cancel.html`, and `reset-password.html` are post-transaction/utility pages that should have `<meta name="robots" content="noindex, nofollow">` added to prevent them from appearing in search results.

---

## Detailed Issue Inventory

| # | File | Check | Status | Detail |
|---|------|-------|--------|--------|
| 1 | `index.html` | Description length | ⚠️ | 160 chars — at ceiling of recommended range |
| 2 | `marketplace.html` | Description length | ⚠️ | 161 chars — 1 over the 160-char limit |
| 3 | `auth.html` | Description length | ❌ | 95 chars — below 120-char minimum |
| 4 | `auth.html` | Canonical | ❌ | Missing `<link rel="canonical">` |
| 5 | `auth.html` | Schema | ❌ | No `application/ld+json` block |
| 6 | `contact.html` | Description length | ❌ | 98 chars — below 120-char minimum |
| 7 | `contact.html` | Schema | ❌ | No `application/ld+json` block |
| 8 | `jobs.html` | OG description content | ⚠️ | og:description says "21 SWFL cities"; current count is 22 |
| 9 | `privacy.html` | Description length | ⚠️ | 116 chars — 4 chars below 120-char minimum |
| 10 | `privacy.html` | Canonical | ❌ | Missing `<link rel="canonical">` |
| 11 | `privacy.html` | Schema | ❌ | No `application/ld+json` block |
| 12 | `terms.html` | Description length | ❌ | 92 chars — below 120-char minimum |
| 13 | `terms.html` | Canonical | ❌ | Missing `<link rel="canonical">` |
| 14 | `terms.html` | Schema | ❌ | No `application/ld+json` block |
| 15 | `success.html` | Description length | ❌ | 48 chars — well below 120-char minimum |
| 16 | `success.html` | og:title | ❌ | Missing |
| 17 | `success.html` | og:description | ❌ | Missing |
| 18 | `success.html` | og:url | ❌ | Missing |
| 19 | `success.html` | Canonical | ❌ | Missing `<link rel="canonical">` |
| 20 | `success.html` | Schema | ❌ | No `application/ld+json` block |
| 21 | `success.html` | Robots | ⚠️ | Post-transaction page; recommend `noindex,nofollow` |
| 22 | `cancel.html` | Description length | ❌ | 53 chars — well below 120-char minimum |
| 23 | `cancel.html` | og:title | ❌ | Missing |
| 24 | `cancel.html` | og:description | ❌ | Missing |
| 25 | `cancel.html` | og:url | ❌ | Missing |
| 26 | `cancel.html` | Canonical | ❌ | Missing `<link rel="canonical">` |
| 27 | `cancel.html` | Schema | ❌ | No `application/ld+json` block |
| 28 | `cancel.html` | Robots | ⚠️ | Post-transaction page; recommend `noindex,nofollow` |
| 29 | `reset-password.html` | Description length | ❌ | 34 chars — well below 120-char minimum |
| 30 | `reset-password.html` | og:title | ❌ | Missing |
| 31 | `reset-password.html` | og:description | ❌ | Missing |
| 32 | `reset-password.html` | og:url | ❌ | Missing |
| 33 | `reset-password.html` | Canonical | ❌ | Missing `<link rel="canonical">` |
| 34 | `reset-password.html` | Schema | ❌ | No `application/ld+json` block |
| 35 | `reset-password.html` | Robots | ⚠️ | Utility page; recommend `noindex,nofollow` |
