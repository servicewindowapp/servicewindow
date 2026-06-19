# SEO Audit Report — ServiceWindow

**Date:** 2026-05-29  
**Pages audited:** 15  
**Pages with issues:** 8  
**Total issues found:** 28 (16 failures ❌, 12 warnings ⚠️)

---

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — both are publicly indexed pages (no `noindex`) that currently lack canonical tags, creating a direct duplicate-content risk if Google discovers them via multiple paths (e.g., with/without trailing slash, HTTP vs HTTPS).

2. **Expand meta descriptions below 120 chars on `contact.html` (98 chars) and `privacy.html` (116 chars)** — Google will auto-generate SERP snippets for these indexed pages rather than using the provided description, reducing click-through predictability.

3. **Add full OG tag set to `success.html`, `cancel.html`, and `reset-password.html`** — only `og:image` is present on all three; `og:title`, `og:description`, and `og:url` are all missing. Social shares of these URLs will render broken or empty previews.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars | ✅ all 4 | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 chars | ✅ all 4 | ❌ missing | ❌ missing | ⚠️ noindex | No canonical; no schema; description too short (95); noindex (intentional for auth) |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 98 chars | ✅ all 4 | ✅ | ❌ missing | ✅ | Description too short (98); no schema markup |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 145 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars | ✅ all 4 | ❌ missing | ❌ missing | ✅ | No canonical; no schema; description slightly short (116) |
| `terms.html` | ✅ | ⚠️ 92 chars | ✅ all 4 | ❌ missing | ❌ missing | ✅ | No canonical; no schema; description too short (92) |
| `success.html` | ✅ | ⚠️ 48 chars | ❌ og:image only | ❌ missing | ❌ missing | ⚠️ noindex | og:title/description/url missing; no canonical; no schema; very short desc (48); noindex (intentional) |
| `cancel.html` | ✅ | ⚠️ 53 chars | ❌ og:image only | ❌ missing | ❌ missing | ⚠️ noindex | og:title/description/url missing; no canonical; no schema; very short desc (53); noindex (intentional) |
| `reset-password.html` | ✅ | ⚠️ 34 chars | ❌ og:image only | ❌ missing | ❌ missing | ⚠️ noindex | og:title/description/url missing; no canonical; no schema; very short desc (34); noindex (intentional) |

---

## Column Key

| Column | What was checked |
|--------|-----------------|
| **Title** | `<title>` present and descriptive (not blank/placeholder) |
| **Description** | `<meta name="description">` present; char count shown; ✅ = 120–160, ⚠️ = outside range |
| **OG Tags** | All four: `og:title`, `og:description`, `og:url` (servicewindow.app domain), `og:image` — verified in `<head>` |
| **Canonical** | `<link rel="canonical">` present with servicewindow.app domain |
| **Schema** | `<script type="application/ld+json">` present |
| **Robots** | ✅ = not set (indexable by default); ⚠️ = noindex present |

---

## Findings by Category

### ❌ Missing Canonicals (6 pages)
`auth.html` · `privacy.html` · `terms.html` · `success.html` · `cancel.html` · `reset-password.html`

Priority: **high** for `privacy.html` and `terms.html` (indexed); **low** for noindexed utility pages.

### ❌ Missing Schema Markup (7 pages)
`auth.html` · `contact.html` · `privacy.html` · `terms.html` · `success.html` · `cancel.html` · `reset-password.html`

Priority: **medium** for `contact.html` (a LocalBusiness or ContactPage schema would be beneficial); **low** for utility pages.

### ❌ Incomplete OG Tags (3 pages)
`success.html` · `cancel.html` · `reset-password.html` — only `og:image` present; `og:title`, `og:description`, `og:url` all missing.

### ⚠️ Description Length Issues (8 pages)
| Page | Chars | Status |
|------|-------|--------|
| `marketplace.html` | 161 | 1 over limit |
| `auth.html` | 95 | 25 short |
| `contact.html` | 98 | 22 short |
| `privacy.html` | 116 | 4 short |
| `terms.html` | 92 | 28 short |
| `success.html` | 48 | utility page |
| `cancel.html` | 53 | utility page |
| `reset-password.html` | 34 | utility page |

### ⚠️ Noindex on Production Pages (4 pages)
`auth.html` · `success.html` · `cancel.html` · `reset-password.html`

All four are intentionally noindexed (auth/transactional/utility). No action required unless indexing is desired.

---

## Clean Pages (no issues)

`index.html` · `find-trucks.html` · `pricing.html` · `about.html` · `jobs.html` · `venues.html` · `property.html`
