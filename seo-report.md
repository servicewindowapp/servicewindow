# ServiceWindow SEO Audit — 2026-05-22

## Summary

- **Pages audited:** 15
- **Total issues found:** 28
- **Pages fully passing:** 6 (find-trucks, pricing, about, jobs, venues, property)

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — both are indexed public pages with zero duplicate-content protection. This is the highest-impact missing tag on production-indexed content.
2. **Expand short meta descriptions** — `terms.html` (92 chars), `auth.html` (95 chars), `contact.html` (98 chars), and `privacy.html` (116 chars) are all below the 120-char minimum. Short descriptions are frequently rewritten by Google, losing keyword control.
3. **Add schema markup to `contact.html`, `privacy.html`, and `terms.html`** — three indexed pages with no structured data. At minimum, add `Organization` or `WebPage` schema to match the baseline set on other public pages.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ⚠️ | ✅ | ✅ | ✅ | Description is exactly 160 chars — at the hard upper limit; trim 2–3 words to stay safely within range |
| `marketplace.html` | ✅ | ⚠️ | ✅ | ✅ | ✅ | Description is 161 chars — 1 over the 160-char limit |
| `find-trucks.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 95 chars (below 120 minimum); no canonical tag; no schema; `robots: noindex, nofollow` set (intentional for auth pages) |
| `pricing.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ | ✅ | ✅ | ❌ | Description 98 chars (below 120 minimum); no schema markup |
| `jobs.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 116 chars (below 120 minimum); no canonical tag; no schema markup |
| `terms.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 92 chars (below 120 minimum); no canonical tag; no schema markup |
| `success.html` | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | Description 48 chars; `og:title`, `og:description`, `og:url` all missing (only `og:image` present); no canonical; no schema; `robots: noindex` (intentional — post-Stripe utility page) |
| `cancel.html` | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | Description 53 chars; `og:title`, `og:description`, `og:url` all missing (only `og:image` present); no canonical; no schema; `robots: noindex` (intentional — post-Stripe utility page) |
| `reset-password.html` | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | Description 34 chars; `og:title`, `og:description`, `og:url` all missing (only `og:image` present); no canonical; no schema; `robots: noindex` (intentional — auth utility page) |

---

## Check Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Pass — present and within spec |
| ⚠️ | Present but needs improvement (out of range, partial, or intentionally limited) |
| ❌ | Fail — missing entirely |

---

## Detailed Findings by Check

### 1. `<title>` — All 15 pages ✅
Every page has a descriptive, non-placeholder title tag.

### 2. `<meta name="description">` — 6 pages ⚠️, 9 pages ✅

| Page | Char Count | Status |
|------|-----------|--------|
| `index.html` | 160 | ⚠️ At upper limit |
| `marketplace.html` | 161 | ⚠️ 1 over limit |
| `find-trucks.html` | 155 | ✅ |
| `auth.html` | 95 | ⚠️ Below 120 |
| `pricing.html` | 134 | ✅ |
| `about.html` | 153 | ✅ |
| `contact.html` | 98 | ⚠️ Below 120 |
| `jobs.html` | 131 | ✅ |
| `venues.html` | 145 | ✅ |
| `property.html` | 154 | ✅ |
| `privacy.html` | 116 | ⚠️ Below 120 |
| `terms.html` | 92 | ⚠️ Below 120 |
| `success.html` | 48 | ⚠️ Below 120 (noindexed) |
| `cancel.html` | 53 | ⚠️ Below 120 (noindexed) |
| `reset-password.html` | 34 | ⚠️ Below 120 (noindexed) |

### 3–6. OG Tags (`og:title`, `og:description`, `og:url`, `og:image`)
- **12 pages ✅** — all four OG properties present and in `<head>`
- **3 pages ⚠️** — `success.html`, `cancel.html`, `reset-password.html` each have only `og:image`; `og:title`, `og:description`, and `og:url` are absent. Low-priority given `robots: noindex`.

### 7. `<link rel="canonical">` — 4 pages ❌
Missing on: `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`  
Critical gap on `privacy.html` and `terms.html` (both indexed). Lower priority on noindexed utility pages.

### 8. Schema Markup (`application/ld+json`) — 5 pages ❌
- `index.html` ✅ — present (required baseline)
- Missing on: `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`
- High priority: `contact.html`, `privacy.html`, `terms.html` (indexed public pages)
- Low priority: `auth.html`, `success.html`, `cancel.html`, `reset-password.html` (noindexed utility pages)

### 9. `<meta name="robots">` — No production pages blocked ✅
Four pages carry `robots: noindex, nofollow` — all are appropriate utility/auth pages (`auth.html`, `success.html`, `cancel.html`, `reset-password.html`). No indexed content page has a noindex directive.
