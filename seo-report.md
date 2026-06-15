# SEO Audit Report — ServiceWindow

**Date:** 2026-06-15
**Pages audited:** 15
**Total issues found:** 22 hard fails (❌), 7 warnings (⚠️)

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully clean | 7 |
| Pages with ≥1 hard fail | 8 |
| Hard fails (❌) | 22 |
| Warnings (⚠️) | 7 |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` all lack canonical tags. Missing canonicals are a direct duplicate-content risk and are trivial to add.

2. **Add schema markup (`<script type="application/ld+json">`) to 5 pages** — `contact.html`, `auth.html`, `privacy.html`, `terms.html` are indexed public/semi-public pages with no structured data. Even minimal `WebPage` schema improves entity understanding. (`success.html`, `cancel.html`, `reset-password.html` are noindex, lower urgency.)

3. **Complete OG tag sets on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` each have only `og:image` and are missing `og:title`, `og:description`, and `og:url`. If these URLs are ever shared or scraped, social previews will be blank.

---

## Per-Page Audit

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over limit) | ✅ all 4 | ✅ | ✅ | ✅ | Description 1 char over 160 |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 chars (under 120) | ✅ all 4 | ❌ missing | ❌ missing | ⚠️ noindex | No canonical; no schema; description too short; noindex on a production page |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 98 chars (under 120) | ✅ all 4 | ✅ | ❌ missing | ✅ | No schema; description too short |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 145 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars (under 120) | ✅ all 4 | ❌ missing | ❌ missing | ✅ | No canonical; no schema; description slightly short |
| `terms.html` | ✅ | ⚠️ 92 chars (under 120) | ✅ all 4 | ❌ missing | ❌ missing | ✅ | No canonical; no schema; description too short |
| `success.html` | ✅ | ⚠️ 48 chars (transactional) | ⚠️ only og:image | ❌ missing | ❌ missing | ✅ noindex | Missing og:title/description/url; no canonical; no schema (noindex reduces crawl risk) |
| `cancel.html` | ✅ | ⚠️ 53 chars (transactional) | ⚠️ only og:image | ❌ missing | ❌ missing | ✅ noindex | Missing og:title/description/url; no canonical; no schema (noindex reduces crawl risk) |
| `reset-password.html` | ✅ | ⚠️ 34 chars (transactional) | ⚠️ only og:image | ❌ missing | ❌ missing | ✅ noindex | Missing og:title/description/url; no canonical; no schema (noindex reduces crawl risk) |

---

## Findings Detail

### Description Length (target: 120–160 chars)

| Page | Length | Status |
|------|--------|--------|
| `index.html` | 160 | ✅ |
| `marketplace.html` | 161 | ⚠️ 1 over |
| `find-trucks.html` | 155 | ✅ |
| `auth.html` | 95 | ⚠️ short |
| `pricing.html` | 134 | ✅ |
| `about.html` | 153 | ✅ |
| `contact.html` | 98 | ⚠️ short |
| `jobs.html` | 131 | ✅ |
| `venues.html` | 145 | ✅ |
| `property.html` | 154 | ✅ |
| `privacy.html` | 116 | ⚠️ short |
| `terms.html` | 92 | ⚠️ short |
| `success.html` | 48 | ⚠️ short (transactional, noindex) |
| `cancel.html` | 53 | ⚠️ short (transactional, noindex) |
| `reset-password.html` | 34 | ⚠️ short (transactional, noindex) |

### Missing Canonical Tags

Pages with no `<link rel="canonical">`: `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`

### Missing Schema Markup

Pages with no `<script type="application/ld+json">`: `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`

### Robots / noindex

- `auth.html` — `noindex, nofollow` — login page; intentional but worth reviewing if organic traffic to /auth is desired
- `success.html` — `noindex, nofollow` — ✅ correct for post-payment landing
- `cancel.html` — `noindex, nofollow` — ✅ correct for post-payment landing
- `reset-password.html` — `noindex, nofollow` — ✅ correct for transactional utility page

### OG Tag Notes

All OG tags on all pages are correctly placed inside `<head>` (verified by comparing tag line numbers against each file's `<body>` opening line). No OG tags found in `<body>`.

Incomplete OG sets (missing `og:title`, `og:description`, `og:url`): `success.html`, `cancel.html`, `reset-password.html`.

### Clean Pages (no issues)

`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`
