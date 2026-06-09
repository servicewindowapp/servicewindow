# SEO Audit Report — ServiceWindow
**Date:** 2026-06-09  
**Auditor:** Automated nightly audit  
**Scope:** 15 production HTML pages

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages with noindex | 4 (auth, success, cancel, reset-password) |
| Indexable pages | 11 |
| Total issues found | 28 |
| Issues on indexable pages | 10 |

### Top 3 Priority Fixes

1. **Add canonical tags to `privacy.html` and `terms.html`** — Both are indexed pages with no `<link rel="canonical">`, creating duplicate-content risk.
2. **Fix factual error in `jobs.html` og:description** — Says "21 SWFL cities"; project rule requires 22. Misinformation in a social share snippet.
3. **Expand short descriptions on `terms.html` (94 chars) and `contact.html` (100 chars)** — Both are well under the 120-char minimum, leaving search snippet value on the table.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | ✅ | — |
| `marketplace.html` | ✅ | ⚠️ 163 chars | ✅ | ✅ | ✅ | ✅ | Description 3 chars over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | ✅ | — |
| `auth.html` | ✅ | ⚠️ 97 chars | ✅ | ❌ | ❌ | ✅ noindex | noindex page — no canonical; description under 120 chars; no schema |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | ✅ | — |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | — |
| `contact.html` | ✅ | ⚠️ 100 chars | ✅ | ✅ | ❌ | ✅ | Description under 120 chars; no schema markup |
| `jobs.html` | ✅ | ✅ 133 chars | ⚠️ | ✅ | ✅ | ✅ | og:description says "21 SWFL cities" — must be 22 per project rules |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | ✅ | — |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | ✅ | — |
| `privacy.html` | ✅ | ⚠️ 118 chars | ✅ | ❌ | ❌ | ✅ | Description 2 chars under 120; no canonical; no schema |
| `terms.html` | ✅ | ❌ 94 chars | ✅ | ❌ | ❌ | ✅ | Description well under 120 chars; no canonical; no schema |
| `success.html` | ✅ | ❌ 48 chars | ❌ | ❌ | ❌ | ✅ noindex | noindex page — short description; missing og:title, og:description, og:url, canonical, schema |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ | ❌ | ❌ | ✅ noindex | noindex page — short description; missing og:title, og:description, og:url, canonical, schema |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ | ❌ | ❌ | ✅ noindex | noindex page — short description; missing og:title, og:description, og:url, canonical, schema |

---

## Check Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Pass |
| ⚠️ | Present but needs improvement |
| ❌ | Missing or failing |

---

## Check Definitions

- **Title** — `<title>` present, descriptive, not blank or placeholder
- **Description** — `<meta name="description">` present; ✅ = 120–160 chars, ⚠️ = present but outside range, ❌ = missing or severely short
- **OG Tags** — all four present: `og:title`, `og:description`, `og:url` (servicewindow.app domain), `og:image`
- **Canonical** — `<link rel="canonical">` present and uses servicewindow.app domain
- **Schema** — `<script type="application/ld+json">` block present with content
- **Robots** — no `noindex` on indexable pages; noindex noted where intentionally set

---

## Full Issue List

### Indexable Pages (10 issues)

| # | Page | Issue | Severity |
|---|------|-------|----------|
| 1 | `marketplace.html` | `<meta name="description">` is 163 chars — 3 chars over the 160-char recommended limit | Low |
| 2 | `contact.html` | `<meta name="description">` is 100 chars — under the 120-char minimum (lost snippet length) | Medium |
| 3 | `contact.html` | No `<script type="application/ld+json">` schema block | Low |
| 4 | `jobs.html` | `og:description` reads "21 SWFL cities" — project rule mandates 22 cities | High |
| 5 | `privacy.html` | `<meta name="description">` is 118 chars — 2 chars under the 120-char minimum | Low |
| 6 | `privacy.html` | No `<link rel="canonical">` — indexed page without canonical risks duplicate content | High |
| 7 | `privacy.html` | No `<script type="application/ld+json">` schema block | Low |
| 8 | `terms.html` | `<meta name="description">` is 94 chars — well under 120-char minimum | Medium |
| 9 | `terms.html` | No `<link rel="canonical">` — indexed page without canonical risks duplicate content | High |
| 10 | `terms.html` | No `<script type="application/ld+json">` schema block | Low |

### Noindex Pages (18 issues — lower priority, pages not crawled)

| # | Page | Issue |
|---|------|-------|
| 11 | `auth.html` | `<meta name="description">` is 97 chars (under 120) |
| 12 | `auth.html` | No `<link rel="canonical">` |
| 13 | `auth.html` | No schema markup |
| 14 | `success.html` | `<meta name="description">` is 48 chars |
| 15 | `success.html` | No `og:title` |
| 16 | `success.html` | No `og:description` |
| 17 | `success.html` | No `og:url` |
| 18 | `success.html` | No `<link rel="canonical">` |
| 19 | `cancel.html` | `<meta name="description">` is 53 chars |
| 20 | `cancel.html` | No `og:title` |
| 21 | `cancel.html` | No `og:description` |
| 22 | `cancel.html` | No `og:url` |
| 23 | `cancel.html` | No `<link rel="canonical">` |
| 24 | `reset-password.html` | `<meta name="description">` is 34 chars |
| 25 | `reset-password.html` | No `og:title` |
| 26 | `reset-password.html` | No `og:description` |
| 27 | `reset-password.html` | No `og:url` |
| 28 | `reset-password.html` | No `<link rel="canonical">` |
