# SEO Audit Report — ServiceWindow
**Date:** 2026-06-17
**Pages audited:** 15
**Total issues found:** 18

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 5 |
| Pages with critical issues | 6 |
| Pages with warnings only | 4 |
| Total distinct issues | 18 |

### Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on indexable pages** — `privacy.html` and `terms.html` are publicly crawled but have no canonical tag. This risks duplicate-content penalties if either page is linked under alternate URLs. `auth.html` also lacks a canonical; lower priority since it is noindexed.

2. **Meta descriptions below 120 characters on crawlable pages** — `terms.html` (94 chars), `auth.html` (97 chars), and `contact.html` (100 chars) are well under the recommended 120–160 range. Google typically rewrites short descriptions with pulled body text, which is less predictable.

3. **Incomplete OG tags on utility pages** — `success.html`, `cancel.html`, and `reset-password.html` each have only `og:image`; they are missing `og:title`, `og:description`, `og:url`, and `og:type`. While all three are noindexed, a shared URL still renders a broken social-preview card.

**Bonus issue (content accuracy):** `jobs.html` OG description reads "21 SWFL cities" but the platform covers 22 cities per the project spec.

---

## Full Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars (+3 over limit) | ✅ | ✅ | ✅ | ✅ | Description 3 chars over 160 |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ❌ 97 chars (min 120) | ✅ | ❌ Missing | — | ⚠️ noindex | Missing canonical; description too short (97); noindex on auth page (intentional?) |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars (min 120) | ✅ | ✅ | — | ✅ | Description too short (100 chars) |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | ✅ | OG description says "21 SWFL cities" — should be 22 |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (min 120) | ✅ | ❌ Missing | — | ✅ | Missing canonical; description 2 chars under 120 |
| `terms.html` | ✅ | ❌ 94 chars (min 120) | ✅ | ❌ Missing | — | ✅ | Missing canonical; description too short (94 chars) |
| `success.html` | ✅ | ❌ 48 chars | ❌ og:title, og:description, og:url, og:type missing | ❌ Missing | — | ⚠️ noindex | Noindexed utility page — 4 OG tags missing, no canonical, very short description |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ og:title, og:description, og:url, og:type missing | ❌ Missing | — | ⚠️ noindex | Noindexed utility page — 4 OG tags missing, no canonical, very short description |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ og:title, og:description, og:url, og:type missing | ❌ Missing | — | ⚠️ noindex | Noindexed utility page — 4 OG tags missing, no canonical, very short description |

### Column key
- **Title** — `<title>` present and descriptive
- **Description** — `<meta name="description">` present; ✅ = 120–160 chars, ⚠️ = present but outside range, ❌ = missing or severely short
- **OG Tags** — all five (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`) present in `<head>`
- **Canonical** — `<link rel="canonical">` present with `servicewindow.app` domain
- **Schema** — `<script type="application/ld+json">` present (marked `—` for pages where schema is not expected)
- **Robots** — ✅ = indexable or no tag; ⚠️ = noindex present (flagged regardless of intent)

---

## Issue Breakdown by Category

### Missing Canonical (6 pages)
| Page | Indexable? | Priority |
|------|-----------|----------|
| `privacy.html` | Yes | High |
| `terms.html` | Yes | High |
| `auth.html` | No (noindex) | Medium |
| `success.html` | No (noindex) | Low |
| `cancel.html` | No (noindex) | Low |
| `reset-password.html` | No (noindex) | Low |

### Meta Description Length Issues (7 pages)
| Page | Length | Issue |
|------|--------|-------|
| `reset-password.html` | 34 | Too short (utility page, noindexed) |
| `success.html` | 48 | Too short (utility page, noindexed) |
| `cancel.html` | 53 | Too short (utility page, noindexed) |
| `terms.html` | 94 | Too short — **indexable page** |
| `auth.html` | 97 | Too short (noindexed) |
| `contact.html` | 100 | Too short — **indexable page** |
| `privacy.html` | 118 | 2 chars under minimum — **indexable page** |
| `marketplace.html` | 163 | 3 chars over maximum |

### Incomplete OG Tags (3 pages)
All three are noindexed utility pages. Social share links from these pages will render broken preview cards (no title, no description).

- `success.html` — missing `og:title`, `og:description`, `og:url`, `og:type`
- `cancel.html` — missing `og:title`, `og:description`, `og:url`, `og:type`
- `reset-password.html` — missing `og:title`, `og:description`, `og:url`, `og:type`

### noindex Present (4 pages)
These pages intentionally suppress indexing. Flagged per audit rules; all appear intentional for utility/auth flows.

- `auth.html` — sign-in/sign-up flow
- `success.html` — post-Stripe success page
- `cancel.html` — post-Stripe cancel page
- `reset-password.html` — password reset flow

### Content Accuracy (1 page)
- `jobs.html` — `og:description` reads *"across 21 SWFL cities"*; the platform covers **22 cities** per spec.

---

## Schema Coverage

Schema markup (`application/ld+json`) present on:
✅ `index.html` · `marketplace.html` · `find-trucks.html` · `pricing.html` · `about.html` · `jobs.html` · `venues.html` · `property.html`

Not present (expected — legal, auth, utility pages):
`auth.html` · `contact.html` · `privacy.html` · `terms.html` · `success.html` · `cancel.html` · `reset-password.html`
