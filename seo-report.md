# SEO Audit Report — ServiceWindow
**Date:** 2026-06-05  
**Pages audited:** 15  
**Total issues found:** 17 (3 are expected/intentional on utility pages)

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 6 |
| Pages with warnings (⚠️) | 6 |
| Pages with failures (❌) | 3 |
| Utility pages noindex'd intentionally | 3 |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — both are indexed content pages missing canonical tags, creating duplicate-content risk if ever scraped or mirrored. Two-line fix.

2. **Expand short descriptions on `contact.html` (97 chars), `terms.html` (91 chars), and `auth.html` (94 chars)** — all fall below the 120-char minimum. Google rewrites short descriptions from page body content, reducing SERP click-through control.

3. **Fix stale city count "21 cities" → "22 cities"** in `marketplace.html` schema, `jobs.html` OG description, and `jobs.html` schema — contradicts the canonical 22-city count stated everywhere else and in `CLAUDE.md`.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ WebSite + Org | — |
| `marketplace.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ⚠️ CollectionPage | Schema says "21 cities" — should be 22 |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ CollectionPage | — |
| `auth.html` | ✅ | ⚠️ 94 chars | ✅ | ❌ | ❌ | `noindex,nofollow` set (may be intentional); no canonical; description below 120-char minimum |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ OfferCatalog | — |
| `about.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ AboutPage | — |
| `contact.html` | ✅ | ⚠️ 97 chars | ✅ | ✅ | ❌ | Description below 120-char minimum; no schema markup |
| `jobs.html` | ✅ | ✅ 131 chars | ⚠️ | ✅ | ⚠️ CollectionPage | OG description + schema both say "21 SWFL cities" — should be 22 |
| `venues.html` | ✅ | ✅ 144 chars | ✅ | ✅ | ✅ WebPage | — |
| `property.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ WebPage | — |
| `privacy.html` | ✅ | ⚠️ 115 chars | ✅ | ❌ | ❌ | No canonical; no schema; description just below 120-char minimum |
| `terms.html` | ✅ | ⚠️ 91 chars | ✅ | ❌ | ❌ | No canonical; no schema; description below 120-char minimum |
| `success.html` | ✅ | ⚠️ 48 chars | ❌ | ❌ | ❌ | `noindex,nofollow` (intentional — post-Stripe redirect); no OG, canonical, or schema expected |
| `cancel.html` | ✅ | ⚠️ 53 chars | ❌ | ❌ | ❌ | `noindex,nofollow` (intentional — post-Stripe redirect); no OG, canonical, or schema expected |
| `reset-password.html` | ✅ | ⚠️ 34 chars | ❌ | ❌ | ❌ | `noindex,nofollow` (intentional — auth utility page); no OG, canonical, or schema expected |

---

## Issue Detail

### ❌ Missing canonical tags
| Page | Status |
|------|--------|
| `privacy.html` | No `<link rel="canonical">` — indexed content page |
| `terms.html` | No `<link rel="canonical">` — indexed content page |
| `auth.html` | No `<link rel="canonical">` — also noindex'd (see below) |

### ❌ Missing schema markup
| Page | Notes |
|------|-------|
| `contact.html` | No `<script type="application/ld+json">` — ContactPage schema would improve Local SEO signals |
| `privacy.html` | No schema — low priority given page type |
| `terms.html` | No schema — low priority given page type |

### ⚠️ Descriptions below 120-char minimum
| Page | Length | Content |
|------|--------|---------|
| `terms.html` | 91 | "ServiceWindow Terms of Service — the rules governing use of the SWFL food truck marketplace." |
| `auth.html` | 94 | "Sign up or log in to ServiceWindow — the verified food truck marketplace for Southwest Florida." |
| `contact.html` | 97 | "Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support." |
| `privacy.html` | 115 | "ServiceWindow Privacy Policy — how we collect, use, and protect your information on the SWFL food truck marketplace." |

### ⚠️ Stale city count (21 vs 22)
| Page | Location | Current text |
|------|----------|-------------|
| `marketplace.html` | Schema (ld+json) | "21 cities in Southwest Florida" |
| `jobs.html` | Schema (ld+json) | "21 SWFL cities in Lee, Collier…" |
| `jobs.html` | `og:description` | "Operators hiring…across 21 SWFL cities." |

### ⚠️ `noindex` on production pages
| Page | Robots value | Verdict |
|------|-------------|---------|
| `auth.html` | `noindex, nofollow` | Debatable — login pages are often noindex'd intentionally; review if organic discovery of signup flow is desired |
| `success.html` | `noindex, nofollow` | ✅ Correct — post-payment redirect should not be indexed |
| `cancel.html` | `noindex, nofollow` | ✅ Correct — post-payment redirect should not be indexed |
| `reset-password.html` | `noindex, nofollow` | ✅ Correct — auth utility page should not be indexed |

### ℹ️ OG tag placement note (no action required)
Several pages (`pricing.html`, `about.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html`, `privacy.html`, `terms.html`, `auth.html`) have some or all OG meta tags appended after `</style>` near the bottom of `<head>`. This is **valid HTML** — tags remain inside `<head>` and are readable by all major crawlers. No functional impact, but consolidating OG tags to the top of `<head>` (above `<style>`) is a code-cleanliness improvement for future edits.

---

## Checks Performed Per Page

| Check | Rule |
|-------|------|
| `<title>` | Present and descriptive (not blank/placeholder) |
| `<meta name="description">` | Present, 120–160 characters |
| `<meta property="og:title">` | Present |
| `<meta property="og:description">` | Present |
| `<meta property="og:url">` | Present, uses `servicewindow.app` domain |
| `<meta property="og:image">` | Present |
| `<link rel="canonical">` | Present, uses `servicewindow.app` domain |
| Schema `<script type="application/ld+json">` | Present on `index.html` at minimum |
| `<meta name="robots">` | Not set to `noindex` on production pages |

*All OG URLs and canonical hrefs observed use the `https://servicewindow.app` domain. No mixed-domain or HTTP references detected.*
