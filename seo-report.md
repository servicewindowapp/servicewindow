# SEO Audit Report — ServiceWindow

**Date:** 2026-06-08
**Pages audited:** 15
**Total findings:** 53 ❌ failures · 12 ⚠️ warnings

> **Note on noindex pages:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` carry `<meta name="robots" content="noindex, nofollow">`. This is intentional for auth/payment-flow pages. SEO gaps on those four pages are reported for completeness but are lower priority than gaps on indexable pages.

---

## Top 3 Priority Fixes

1. **`og:url` + `og:image` missing from 12 of 15 pages** — Every page except `index.html`, `marketplace.html`, and `find-trucks.html` is missing at least one of these two required Open Graph fields. Social shares from any other page will render broken or generic preview cards on LinkedIn, iMessage, Slack, etc. Batch-add both tags across all remaining pages.

2. **`pricing.html` is missing all four OG tags** — The highest-conversion page on the site (`og:title`, `og:description`, `og:url`, `og:image` all absent). Any pricing link shared in a sales conversation, email, or social post generates a blank preview.

3. **`privacy.html` and `terms.html` missing canonical + all OG tags** — Legal pages without a canonical tag invite duplicate-content signals if a Supabase redirect or alternate URL is ever crawled. Both pages also have short descriptions (116 ch and 92 ch respectively, below the 120-character floor).

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 ch | ✅ all 4 | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 ch | ✅ all 4 | ✅ | ✅ | Description 1 ch over 160-char ceiling |
| `find-trucks.html` | ✅ | ✅ 156 ch | ✅ all 4 | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 ch | ❌ none | ❌ | ❌ | **noindex** set; description under 120 ch; all OG tags missing; no canonical; no schema |
| `pricing.html` | ✅ | ✅ 133 ch | ❌ none | ✅ | ✅ | All 4 OG tags missing (`og:title`, `og:description`, `og:url`, `og:image`) |
| `about.html` | ✅ | ✅ 152 ch | ⚠️ partial | ✅ | ✅ | Missing `og:url` and `og:image`; `og:title` present but very short ("About ServiceWindow") |
| `contact.html` | ✅ | ⚠️ 98 ch | ❌ none | ✅ | ❌ | Description under 120 ch; all OG tags missing; no schema |
| `jobs.html` | ✅ | ✅ 131 ch | ⚠️ partial | ✅ | ✅ | Missing `og:url` and `og:image` |
| `venues.html` | ✅ | ✅ 144 ch | ⚠️ partial | ✅ | ✅ | Missing `og:url` and `og:image` |
| `property.html` | ✅ | ✅ 153 ch | ⚠️ partial | ✅ | ✅ | Missing `og:url` and `og:image` |
| `privacy.html` | ✅ | ⚠️ 116 ch | ❌ none | ❌ | ❌ | Description under 120 ch; all OG tags missing; no canonical; no schema |
| `terms.html` | ✅ | ⚠️ 92 ch | ❌ none | ❌ | ❌ | Description under 120 ch; all OG tags missing; no canonical; no schema |
| `success.html` | ✅ | ⚠️ 48 ch | ❌ none | ❌ | ❌ | **noindex** (intentional); description very short; all OG tags missing; no canonical; no schema |
| `cancel.html` | ✅ | ⚠️ 53 ch | ❌ none | ❌ | ❌ | **noindex** (intentional); description very short; all OG tags missing; no canonical; no schema |
| `reset-password.html` | ✅ | ⚠️ 34 ch | ❌ none | ❌ | ❌ | **noindex** (intentional); description very short; all OG tags missing; no canonical; no schema |

**OG Tags key:** ✅ all 4 present (`og:title`, `og:description`, `og:url`, `og:image`) · ⚠️ partial (has title + description, missing url + image) · ❌ none

---

## Per-Criterion Summary

| Check | ✅ Pass | ⚠️ Warn | ❌ Fail |
|-------|---------|---------|---------|
| `<title>` — present and descriptive | 15 | 0 | 0 |
| `<meta name="description">` — 120–160 ch | 7 | 8 | 0 |
| `<meta property="og:title">` | 7 | 0 | 8 |
| `<meta property="og:description">` | 7 | 0 | 8 |
| `<meta property="og:url">` — servicewindow.app domain | 3 | 0 | 12 |
| `<meta property="og:image">` | 3 | 0 | 12 |
| `<link rel="canonical">` — servicewindow.app domain | 9 | 0 | 6 |
| `<script type="application/ld+json">` — schema present | 8 | 0 | 7 |
| `<meta name="robots">` — not noindex | 11 | 4 ¹ | 0 |

¹ Four pages carry `noindex,nofollow`: auth, success, cancel, reset-password. All four are appropriate for their function (auth flow / post-payment confirmation / password reset).

---

## Pages Fully Clean (0 issues)

- `index.html`
- `find-trucks.html`

## Pages Clean Except og:url + og:image (2 issues each)

- `about.html`
- `jobs.html`
- `venues.html`
- `property.html`
