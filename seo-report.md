# SEO Audit Report — ServiceWindow
**Date:** 2026-05-13  
**Pages audited:** 15  
**Total issues found:** 28 (19 ❌ failures · 9 ⚠️ warnings)

---

## Summary

| Metric | Result |
|--------|--------|
| Pages audited | 15 |
| Pages fully passing | 5 |
| Pages with failures (❌) | 10 |
| Pages with warnings only (⚠️) | 5 |
| Total failures (❌) | 19 |
| Total warnings (⚠️) | 9 |

### Top 3 Priority Fixes

1. **`success.html`, `cancel.html`, `reset-password.html`** — All three post-Stripe/auth pages are missing `og:title`, `og:description`, `og:url`, and `<link rel="canonical">`. Descriptions are critically short (34–53 chars). These pages should also have `<meta name="robots" content="noindex">` added to prevent indexing of transactional dead-ends. *(13 failures + 3 warnings across 3 pages)*

2. **Missing `<link rel="canonical">`** on `auth.html`, `contact.html`, `privacy.html`, `terms.html` — Four production pages with no canonical tag create duplicate-content risk and dilute link equity. *(4 failures)*

3. **Short meta descriptions** on `auth.html` (97 chars), `contact.html` (100 chars), `terms.html` (94 chars), `privacy.html` (118 chars) — All fall under the 120-character minimum; Google may auto-generate replacements. *(4 warnings)*

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ⚠️ 160 chars (at limit) | ✅ | ✅ | ✅ | ✅ | Description exactly at 160-char boundary; trim by 1+ chars |
| `marketplace.html` | ✅ | ⚠️ 163 chars (over) | ✅ | ✅ | ✅ | ✅ | Description 3 chars over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars | ✅ | ❌ | N/A | ✅ | Missing canonical; description under 120 chars |
| `pricing.html` | ✅ | ✅ 138 chars | ✅ | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars | ✅ | ❌ | N/A | ✅ | Missing canonical; description under 120 chars |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars | ✅ | ❌ | N/A | ✅ | Missing canonical; description 2 chars under 120 |
| `terms.html` | ✅ | ⚠️ 94 chars | ✅ | ❌ | N/A | ✅ | Missing canonical; description under 120 chars |
| `success.html` | ✅ | ❌ 48 chars | ❌ missing og:title, og:description, og:url | ❌ | N/A | ⚠️ | Missing og:title/description/url; missing canonical; description 48 chars; add `noindex` |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ missing og:title, og:description, og:url | ❌ | N/A | ⚠️ | Missing og:title/description/url; missing canonical; description 53 chars; add `noindex` |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ missing og:title, og:description, og:url | ❌ | N/A | ⚠️ | Missing og:title/description/url; missing canonical; description 34 chars; add `noindex` |

---

## Check Definitions

| Check | Pass Criteria |
|-------|--------------|
| Title | `<title>` present, non-blank, descriptive |
| Description | `<meta name="description">` present, 120–160 characters |
| OG Tags | `og:title`, `og:description`, `og:url` (servicewindow.app), `og:image` all present |
| Canonical | `<link rel="canonical">` present, uses servicewindow.app domain |
| Schema | `<script type="application/ld+json">` present (required on index.html; N/A for auth/utility pages) |
| Robots | `<meta name="robots">` not set to `noindex` on production content pages; ⚠️ = transactional page missing `noindex` |

---

## Detailed Failures by Page

### `success.html`
- ❌ `og:title` — missing
- ❌ `og:description` — missing
- ❌ `og:url` — missing
- ❌ `<link rel="canonical">` — missing
- ❌ Description: "You're in. ServiceWindow subscription confirmed." (48 chars — needs 120–160)
- ⚠️ `<meta name="robots" content="noindex">` — absent; post-payment confirmation pages should not be indexed

### `cancel.html`
- ❌ `og:title` — missing
- ❌ `og:description` — missing
- ❌ `og:url` — missing
- ❌ `<link rel="canonical">` — missing
- ❌ Description: "No problem. Your ServiceWindow trial is still active." (53 chars — needs 120–160)
- ⚠️ `<meta name="robots" content="noindex">` — absent; post-payment cancel pages should not be indexed

### `reset-password.html`
- ❌ `og:title` — missing
- ❌ `og:description` — missing
- ❌ `og:url` — missing
- ❌ `<link rel="canonical">` — missing
- ❌ Description: "Reset your ServiceWindow password." (34 chars — needs 120–160)
- ⚠️ `<meta name="robots" content="noindex">` — absent; password reset pages should not be indexed

### `auth.html`
- ❌ `<link rel="canonical">` — missing
- ⚠️ Description: 97 chars (needs 120–160) — "Sign up or log in to ServiceWindow — the verified food truck marketplace for Southwest Florida."

### `contact.html`
- ❌ `<link rel="canonical">` — missing
- ⚠️ Description: 100 chars (needs 120–160) — "Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support."

### `privacy.html`
- ❌ `<link rel="canonical">` — missing
- ⚠️ Description: 118 chars (needs 120–160) — "ServiceWindow Privacy Policy — how we collect, use, and protect your information on the SWFL food truck marketplace."

### `terms.html`
- ❌ `<link rel="canonical">` — missing
- ⚠️ Description: 94 chars (needs 120–160) — "ServiceWindow Terms of Service — the rules governing use of the SWFL food truck marketplace."

### `marketplace.html`
- ⚠️ Description: 163 chars (needs 120–160) — "Browse verified food trucks in Southwest Florida. Find trucks for HOA events, venues, private parties, and more. ServiceWindow — the SWFL food truck marketplace."

### `index.html`
- ⚠️ Description: 160 chars (at boundary; trim 1+ chars for margin) — "ServiceWindow is the verified food truck marketplace for Southwest Florida. Stop posting in Facebook groups. Book verified trucks for your event, HOA, or venue."

---

*Generated by nightly SEO audit — 2026-05-13*
