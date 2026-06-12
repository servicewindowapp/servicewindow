# SEO Audit Report — ServiceWindow

**Audit Date:** 2026-06-12
**Pages Audited:** 15
**Total Issues Found:** 29 (12 critical ❌, 17 warnings ⚠️)
**Production/indexable pages with issues:** 8 of 11
**Noindex utility pages with issues:** 4 of 4

---

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — two production pages with no canonical tag; without it, any syndicated or duplicate URL variant risks splitting link equity and confusing crawlers.

2. **Add schema markup + fix missing canonicals on legal/utility pages** — `contact.html`, `privacy.html`, and `terms.html` have no `<script type="application/ld+json">`. At minimum, `contact.html` warrants `ContactPage` schema and the two legal pages should have `WebPage` schema.

3. **Fix short descriptions and the city-count error in `jobs.html`** — `contact.html` (100 chars), `auth.html` (97 chars), and `terms.html` (94 chars) are all below the 120-char minimum. Separately, `jobs.html`'s `og:description` reads "across 21 SWFL cities" but the platform covers **22** cities per product spec.

---

## Audit Table

> Legend: ✅ Pass · ⚠️ Present but needs improvement · ❌ Missing or failing · N/A Not applicable (noindex page)

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars | ✅ | ✅ | ✅ | ✅ | Description 3 chars over 160-char max |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars | ✅ | ❌ Missing | N/A | ✅ noindex | Canonical absent; description under 120 chars (noindex page) |
| `pricing.html` | ✅ | ✅ 136 chars | ⚠️ Late placement | ✅ | ✅ | ✅ | All 5 OG tags placed at bottom of `<head>`; technically valid but non-standard |
| `about.html` | ✅ | ✅ 155 chars | ⚠️ Split placement | ✅ | ✅ | ✅ | `og:title`/`og:description` at top of `<head>`; `og:type`/`og:url`/`og:image` at bottom — inconsistent grouping |
| `contact.html` | ✅ | ⚠️ 100 chars | ⚠️ Late placement | ✅ | ❌ Missing | ✅ | Description under 120 chars; schema absent; OG tags at bottom of `<head>` |
| `jobs.html` | ✅ | ✅ 133 chars | ⚠️ Split + content error | ✅ | ✅ | ✅ | OG tags split across `<head>`; `og:description` says "21 SWFL cities" — should be 22 |
| `venues.html` | ✅ | ✅ 147 chars | ⚠️ Split placement | ✅ | ✅ | ✅ | `og:type`/`og:url`/`og:image` placed at bottom of `<head>` separately from `og:title`/`og:description` |
| `property.html` | ✅ | ✅ 156 chars | ⚠️ Split placement | ✅ | ✅ | ✅ | Same split OG pattern as `venues.html` |
| `privacy.html` | ✅ | ⚠️ 118 chars | ⚠️ Late placement | ❌ Missing | ❌ Missing | ✅ | Canonical absent; description 2 chars under 120; schema absent; OG tags at bottom of `<head>` |
| `terms.html` | ✅ | ⚠️ 94 chars | ⚠️ Late placement | ❌ Missing | ❌ Missing | ✅ | Canonical absent; description under 120 chars; schema absent; OG tags at bottom of `<head>` |
| `success.html` | ✅ | ⚠️ 48 chars | ❌ `og:title`/`og:description`/`og:url` absent | ❌ Missing | N/A | ✅ noindex | Noindex page — OG tags incomplete (only `og:image` present); canonical absent; description very short |
| `cancel.html` | ✅ | ⚠️ 53 chars | ❌ `og:title`/`og:description`/`og:url` absent | ❌ Missing | N/A | ✅ noindex | Same as `success.html` — noindex utility page |
| `reset-password.html` | ✅ | ⚠️ 34 chars | ❌ `og:title`/`og:description`/`og:url` absent | ❌ Missing | N/A | ✅ noindex | Same as `success.html` — noindex utility page |

---

## Issue Breakdown by Category

### Critical ❌ (12 total)
| Issue | Affected Pages |
|-------|----------------|
| `<link rel="canonical">` missing | `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` |
| Schema markup (`application/ld+json`) missing | `contact.html`, `privacy.html`, `terms.html` |
| OG tags incomplete (missing `og:title`, `og:description`, `og:url`) | `success.html`, `cancel.html`, `reset-password.html` |

### Warnings ⚠️ (17 total)
| Issue | Affected Pages |
|-------|----------------|
| Description length below 120 chars | `auth.html` (97), `contact.html` (100), `terms.html` (94), `privacy.html` (118), `success.html` (48), `cancel.html` (53), `reset-password.html` (34) |
| Description length above 160 chars | `marketplace.html` (163) |
| OG tags split or placed at bottom of `<head>` | `pricing.html`, `about.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html`, `privacy.html`, `terms.html` |
| `og:description` city count incorrect (21 vs. 22) | `jobs.html` |

---

## Notes

- All `<title>` tags across all 15 pages are present and descriptive — no blanks or placeholders found.
- `<meta name="robots" content="noindex">` is correctly applied to the four utility pages (`auth.html`, `success.html`, `cancel.html`, `reset-password.html`) and is absent on all 11 production pages — no accidental noindex found.
- All canonical and OG URLs that are present correctly reference the `servicewindow.app` domain.
- The OG tag placement issues (split/late `<head>`) are technically valid — browsers and crawlers parse the full `<head>` regardless of order — but consolidating them early in `<head>` is best practice and easier to maintain.
- Schema markup is present on the highest-priority pages: `index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`. The gap is `contact.html`, `privacy.html`, and `terms.html`.
