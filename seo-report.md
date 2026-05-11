# ServiceWindow SEO Audit Report
**Date:** 2026-05-11  
**Pages audited:** 15  
**Total issues found:** 25  

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 6 |
| Pages with issues | 9 |
| Total issues | 25 |
| Critical (❌) issues | 19 |
| Warning (⚠️) issues | 6 |

### Top 3 Priority Fixes

1. **`success.html`, `cancel.html`, `reset-password.html` — Add `noindex` + complete metadata.**  
   These post-transaction and utility pages have descriptions under 55 chars, are missing `og:title`, `og:description`, and `og:url`, have no canonical tag, and have no `<meta name="robots" content="noindex, nofollow">`. They will be indexed by search engines in their current state, surfacing post-payment confirmation pages in SERPs.

2. **Missing canonical tags on 7 pages.**  
   `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` all lack `<link rel="canonical">`. Without canonicals, GitHub Pages trailing-slash variants (e.g. `/auth.html` vs `/auth`) can generate duplicate content signals.

3. **Descriptions too short on 7 pages (< 120 chars).**  
   `auth.html` (97), `contact.html` (100), `privacy.html` (118), `terms.html` (94), `reset-password.html` (34), `cancel.html` (53), `success.html` (48). Google will discard these and auto-generate snippets from page body content, losing brand messaging control in SERPs.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ⚠️ 160 chars (at upper boundary) | ✅ | ✅ | ✅ | ✅ | Description at 160-char ceiling — trim by 1+ chars to stay within Google's 120–160 target range |
| `marketplace.html` | ✅ | ⚠️ 163 chars (over limit) | ✅ | ✅ | ✅ | ✅ | Description 3 chars over 160-char limit; may be truncated in SERPs |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ❌ 97 chars (under 120) | ✅ | ❌ Missing | N/A | ✅ | Description too short (97 chars); canonical tag absent |
| `pricing.html` | ✅ | ✅ 138 chars | ✅ | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ❌ 100 chars (under 120) | ✅ | ❌ Missing | N/A | ✅ | Description too short (100 chars); canonical tag absent |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (2 under minimum) | ✅ | ❌ Missing | N/A | ✅ | Description 2 chars under 120-char minimum; canonical tag absent |
| `terms.html` | ✅ | ❌ 94 chars (under 120) | ✅ | ❌ Missing | N/A | ✅ | Description too short (94 chars); canonical tag absent |
| `success.html` | ✅ | ❌ 48 chars | ❌ Missing og:title, og:description, og:url | ❌ Missing | N/A | ⚠️ Should be `noindex` | Description 48 chars (too short); 3 OG properties absent; no canonical; no `noindex` directive — page will be indexed |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ Missing og:title, og:description, og:url | ❌ Missing | N/A | ⚠️ Should be `noindex` | Description 53 chars (too short); 3 OG properties absent; no canonical; no `noindex` directive — page will be indexed |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ Missing og:title, og:description, og:url | ❌ Missing | N/A | ⚠️ Should be `noindex` | Description 34 chars (too short); 3 OG properties absent; no canonical; no `noindex` directive — page will be indexed |

---

## Issue Breakdown by Category

### Description Length
| Page | Length | Status |
|------|--------|--------|
| `index.html` | 160 | ⚠️ At boundary |
| `marketplace.html` | 163 | ⚠️ Over limit |
| `find-trucks.html` | 157 | ✅ |
| `auth.html` | 97 | ❌ Under minimum |
| `pricing.html` | 138 | ✅ |
| `about.html` | 155 | ✅ |
| `contact.html` | 100 | ❌ Under minimum |
| `jobs.html` | 133 | ✅ |
| `venues.html` | 147 | ✅ |
| `property.html` | 156 | ✅ |
| `privacy.html` | 118 | ⚠️ Slightly under |
| `terms.html` | 94 | ❌ Under minimum |
| `success.html` | 48 | ❌ Far under minimum |
| `cancel.html` | 53 | ❌ Far under minimum |
| `reset-password.html` | 34 | ❌ Far under minimum |

### Missing Canonical Tags (7 pages)
- `auth.html`
- `contact.html`
- `privacy.html`
- `terms.html`
- `success.html`
- `cancel.html`
- `reset-password.html`

### Missing / Incomplete OG Tags
| Page | og:title | og:description | og:url | og:image |
|------|----------|----------------|--------|----------|
| `success.html` | ❌ | ❌ | ❌ | ✅ |
| `cancel.html` | ❌ | ❌ | ❌ | ✅ |
| `reset-password.html` | ❌ | ❌ | ❌ | ✅ |

### Robots / Indexability
| Page | robots meta | Verdict |
|------|-------------|---------|
| All 12 content pages | Not set | ✅ Indexable (correct) |
| `success.html` | Not set | ⚠️ Will be indexed — add `noindex, nofollow` |
| `cancel.html` | Not set | ⚠️ Will be indexed — add `noindex, nofollow` |
| `reset-password.html` | Not set | ⚠️ Will be indexed — add `noindex, nofollow` |

### Schema Markup (`application/ld+json`)
| Page | Present | Notes |
|------|---------|-------|
| `index.html` | ✅ | Required — present |
| `marketplace.html` | ✅ | Static + dynamic injection |
| `find-trucks.html` | ✅ | Static + dynamic injection |
| `pricing.html` | ✅ | |
| `about.html` | ✅ | |
| `jobs.html` | ✅ | |
| `venues.html` | ✅ | |
| `property.html` | ✅ | |
| `auth.html` | N/A | Auth page — not required |
| `contact.html` | N/A | No schema — consider LocalBusiness markup |
| `privacy.html` | N/A | Legal page — not required |
| `terms.html` | N/A | Legal page — not required |
| `success.html` | N/A | Post-transaction — not required |
| `cancel.html` | N/A | Post-transaction — not required |
| `reset-password.html` | N/A | Utility page — not required |

---

*Audit performed by Claude Code — report only, no HTML files modified.*
