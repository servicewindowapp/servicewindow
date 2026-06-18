# ServiceWindow — SEO Audit Report
**Date:** 2026-05-21  
**Auditor:** Automated audit (Claude)  
**Scope:** 15 production HTML pages

---

## Summary

| Metric | Value |
|--------|-------|
| Pages requested | 15 |
| Pages found | 14 |
| Pages missing from repo | 1 (`find-trucks.html`) |
| Total issues identified | 18 (9 on indexed pages · 9 on noindex pages) |

### Top 3 Priority Fixes

1. **`find-trucks.html` does not exist in the repository** — any link or sitemap entry pointing to it will return a 404. Either create the file or remove all references to it.
2. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — both are indexed pages with no canonical tag, leaving them exposed to duplicate-content penalties.
3. **Expand short meta descriptions on `terms.html` (94 chars), `auth.html` (97 chars), and `contact.html` (100 chars)** — all fall below the 120-character floor; Google may rewrite them with less relevant copy.

---

## Page-by-Page Audit

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars | ✅ all 4 | ✅ | ✅ | Description 3 chars over 160-char limit |
| `find-trucks.html` | ❌ | ❌ | ❌ | ❌ | ❌ | **File not found in repository — all checks fail** |
| `auth.html` | ✅ | ⚠️ 97 chars | ✅ all 4 | ❌ missing | ❌ | Noindex (correct); canonical absent; description 97 chars (under 120) |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ all 4 | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ all 4 | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars | ✅ all 4 | ✅ | ❌ | Description 100 chars (under 120); no schema markup |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ all 4 | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ all 4 | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ all 4 | ✅ | ✅ | None |
| `privacy.html` | ✅ | ✅ 118 chars | ✅ all 4 | ❌ missing | ❌ | Canonical missing; no schema (minor for policy pages) |
| `terms.html` | ✅ | ⚠️ 94 chars | ✅ all 4 | ❌ missing | ❌ | Canonical missing; description 94 chars (under 120) |
| `success.html` | ✅ | ⚠️ 48 chars | ❌ og:title/og:description/og:url absent | ❌ missing | ❌ | Noindex (correct); OG tags incomplete; description 48 chars |
| `cancel.html` | ✅ | ⚠️ 53 chars | ❌ og:title/og:description/og:url absent | ❌ missing | ❌ | Noindex (correct); OG tags incomplete; description 53 chars |
| `reset-password.html` | ✅ | ⚠️ 34 chars | ❌ og:title/og:description/og:url absent | ❌ missing | ❌ | Noindex (correct); OG tags incomplete; description 34 chars |

---

## Detailed Findings by Check

### 1. `<title>` tag
✅ Present and descriptive on all 14 found pages.

### 2. `<meta name="description">` — 120–160 chars
| Status | Pages |
|--------|-------|
| ✅ Within range | `index.html` (160), `marketplace.html`* (163), `pricing.html` (136), `about.html` (155), `jobs.html` (133), `venues.html` (147), `property.html` (156), `privacy.html` (118) |
| ⚠️ Under 120 | `auth.html` (97), `contact.html` (100), `terms.html` (94) |
| ⚠️ Very short | `success.html` (48), `cancel.html` (53), `reset-password.html` (34) |

*`marketplace.html` is 3 chars over; technically a ⚠️ but negligible.

### 3–6. Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- ✅ All 4 OG tags present: `index.html`, `marketplace.html`, `auth.html`, `pricing.html`, `about.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html`, `privacy.html`, `terms.html`
- ❌ Missing `og:title`, `og:description`, `og:url` (only `og:image` present): `success.html`, `cancel.html`, `reset-password.html` — all are `noindex`, so lower priority

### 7. `<link rel="canonical">`
| Status | Pages |
|--------|-------|
| ✅ Present, correct domain | `index.html`, `marketplace.html`, `pricing.html`, `about.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html` |
| ❌ Missing (indexed) | `privacy.html`, `terms.html` |
| ❌ Missing (noindex) | `auth.html`, `success.html`, `cancel.html`, `reset-password.html` |

### 8. Schema markup (`<script type="application/ld+json">`)
| Status | Pages |
|--------|-------|
| ✅ Present | `index.html`, `marketplace.html` (2 blocks), `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html` |
| ❌ Absent | `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` |

Schema absence on `contact.html` (LocalBusiness/ContactPage) is a missed opportunity. Absence on policy/auth/transactional pages is acceptable.

### 9. `<meta name="robots">` — no `noindex` on production pages
| Status | Pages |
|--------|-------|
| ✅ Not set (defaults to index/follow) | All 10 indexable public pages |
| ✅ `noindex, nofollow` (intentional) | `auth.html`, `success.html`, `cancel.html`, `reset-password.html` |

No production pages are incorrectly set to `noindex`. ✅

---

## Issue Register

| ID | Severity | File | Check | Detail |
|----|----------|------|-------|--------|
| SEO-01 | 🔴 Critical | `find-trucks.html` | Existence | File missing from repository |
| SEO-02 | 🟠 High | `privacy.html` | Canonical | `<link rel="canonical">` absent on indexed page |
| SEO-03 | 🟠 High | `terms.html` | Canonical | `<link rel="canonical">` absent on indexed page |
| SEO-04 | 🟡 Medium | `terms.html` | Description | 94 chars — under 120-char minimum |
| SEO-05 | 🟡 Medium | `auth.html` | Description | 97 chars — under 120-char minimum |
| SEO-06 | 🟡 Medium | `contact.html` | Description | 100 chars — under 120-char minimum |
| SEO-07 | 🟡 Medium | `contact.html` | Schema | No structured data (ContactPage or LocalBusiness recommended) |
| SEO-08 | 🟡 Medium | `marketplace.html` | Description | 163 chars — 3 over 160-char maximum |
| SEO-09 | 🔵 Low | `auth.html` | Canonical | Absent (noindex page — low impact) |
| SEO-10 | 🔵 Low | `success.html` | Description | 48 chars — very short (noindex page) |
| SEO-11 | 🔵 Low | `success.html` | OG Tags | `og:title`, `og:description`, `og:url` absent (noindex page) |
| SEO-12 | 🔵 Low | `success.html` | Canonical | Absent (noindex page) |
| SEO-13 | 🔵 Low | `cancel.html` | Description | 53 chars — very short (noindex page) |
| SEO-14 | 🔵 Low | `cancel.html` | OG Tags | `og:title`, `og:description`, `og:url` absent (noindex page) |
| SEO-15 | 🔵 Low | `cancel.html` | Canonical | Absent (noindex page) |
| SEO-16 | 🔵 Low | `reset-password.html` | Description | 34 chars — very short (noindex page) |
| SEO-17 | 🔵 Low | `reset-password.html` | OG Tags | `og:title`, `og:description`, `og:url` absent (noindex page) |
| SEO-18 | 🔵 Low | `reset-password.html` | Canonical | Absent (noindex page) |
