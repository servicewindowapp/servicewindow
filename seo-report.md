# SEO Audit Report — ServiceWindow

**Date:** 2026-06-02  
**Pages audited:** 15  
**Auditor:** Automated nightly audit

---

## Summary

| Stat | Count |
|------|-------|
| Pages audited | 15 |
| Intentionally noindex (acceptable) | 4 (auth, success, cancel, reset-password) |
| Indexable pages fully clean | 3 (index, find-trucks, jobs) |
| Total ❌ issues (indexable pages) | 7 |
| Total ⚠️ issues (indexable pages) | 13 |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — both indexable pages are missing canonical tags entirely, risking duplicate-content penalties from Cloudflare CDN variants.
2. **Expand meta descriptions on `contact.html` (98ch), `terms.html` (92ch), and `privacy.html` (116ch)** — all three are below the 120-character floor; search engines may auto-generate snippets that underperform.
3. **Move OG `<meta>` tags above the `<style>` block in all affected pages** — 8 pages have OG tags placed after hundreds of lines of embedded CSS, still within `<head>` but non-standard; some social scrapers (Slack, iMessage) stop reading `<head>` early and may miss them.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160ch | ✅ | ✅ | ✅ | — |
| `marketplace.html` | ✅ | ⚠️ 161ch | ✅ | ✅ | ✅ | Description 1ch over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 155ch | ✅ | ✅ | ✅ | — |
| `auth.html` | ✅ | ⚠️ 95ch | ⚠️ | ❌ | ❌ | **noindex** (intentional); no canonical; description short; all OG tags placed after CSS block |
| `pricing.html` | ✅ | ✅ 134ch | ⚠️ | ✅ | ✅ | OG tags placed after CSS block (still in `<head>`) |
| `about.html` | ✅ | ✅ 154ch | ⚠️ | ✅ | ✅ | OG tags split: `og:title`/`og:description` at line 10–11, `og:url`/`og:image` at line 491–492 after CSS |
| `contact.html` | ✅ | ⚠️ 98ch | ⚠️ | ✅ | ❌ | Description short (98ch); no schema markup; OG tags placed after CSS block |
| `jobs.html` | ✅ | ✅ 131ch | ⚠️ | ✅ | ✅ | OG tags split: `og:title`/`og:description` at line 11–12, `og:url`/`og:image` at line 161–162 after CSS |
| `venues.html` | ✅ | ✅ 145ch | ⚠️ | ✅ | ✅ | OG tags split: `og:title`/`og:description` at line 11–12, `og:url`/`og:image` at line 419–420 after CSS |
| `property.html` | ✅ | ✅ 152ch | ⚠️ | ✅ | ✅ | OG tags split: `og:title`/`og:description` at line 11–12, `og:url`/`og:image` at line 188–189 after CSS |
| `privacy.html` | ✅ | ⚠️ 116ch | ⚠️ | ❌ | ❌ | **No canonical**; description slightly short (116ch); all OG tags after CSS block; no schema |
| `terms.html` | ✅ | ⚠️ 92ch | ⚠️ | ❌ | ❌ | **No canonical**; description short (92ch); all OG tags after CSS block; no schema |
| `success.html` | ✅ | ❌ 47ch | ❌ | ❌ | ❌ | **noindex** — by design; only `og:image` present; all gaps acceptable for transaction confirmation page |
| `cancel.html` | ✅ | ❌ 53ch | ❌ | ❌ | ❌ | **noindex** — by design; only `og:image` present; acceptable |
| `reset-password.html` | ✅ | ❌ 34ch | ❌ | ❌ | ❌ | **noindex** — by design; only `og:image` present; acceptable |

---

## Detailed Findings by Check

### 1. `<title>` tag
✅ All 15 pages have descriptive, non-placeholder titles.

### 2. `<meta name="description">` — target 120–160 chars
| Status | Pages |
|--------|-------|
| ✅ 120–160ch | index (160), find-trucks (155), pricing (134), about (154), jobs (131), venues (145), property (152) |
| ⚠️ Slightly off | marketplace (161 — 1 over), auth (95), contact (98), privacy (116), terms (92) |
| ❌ Far too short | success (47), cancel (53), reset-password (34) — all noindex, acceptable |

### 3–6. Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- **All 4 present and correct:** index, marketplace, find-trucks  
- **All 4 present but placed after CSS block (still in `<head>`):** auth, pricing, contact, privacy, terms  
- **Split across `<head>` — title/desc early, url/image after CSS:** about, jobs, venues, property  
- **Only `og:image` present:** success, cancel, reset-password (noindex — acceptable)

No OG tag uses an incorrect domain. All `og:url` values correctly reference `servicewindow.app`.

### 7. `<link rel="canonical">`
| Status | Pages |
|--------|-------|
| ✅ Present, correct domain | index, marketplace, find-trucks, pricing, about, contact, jobs, venues, property |
| ❌ Missing (indexable) | **privacy.html**, **terms.html** |
| ❌ Missing (noindex — lower priority) | auth, success, cancel, reset-password |

### 8. Schema markup (`<script type="application/ld+json">`)
✅ **Required minimum (index.html):** present.  
✅ Also present on: marketplace, find-trucks, pricing, about, jobs, venues, property.  
❌ Missing on indexable pages: contact, privacy, terms (LocalBusiness or WebPage schema would benefit these).  
— Not applicable (noindex): auth, success, cancel, reset-password.

### 9. `<meta name="robots">` — noindex check
| Status | Pages |
|--------|-------|
| ✅ Not set (indexable) | index, marketplace, find-trucks, pricing, about, contact, jobs, venues, property, privacy, terms |
| ✅ `noindex` appropriate | success, cancel, reset-password |
| ⚠️ `noindex` — review | **auth.html**: sign-up page is noindexed; users cannot discover it via search. Consider allowing indexing if organic sign-up acquisition is a goal. |

---

## OG Tag Placement Detail

The following pages have OG `<meta>` tags inside `<head>` but positioned **after** a large embedded `<style>` block. This is technically valid HTML; Googlebot reads the full `<head>`. However, some social scrapers (Slack unfurls, iMessage previews, WhatsApp) use streaming parsers that may stop reading before reaching late-positioned tags.

**Affected pages:** auth, pricing, about, contact, jobs, venues, property, privacy, terms

**Fix:** Move all OG `<meta>` tags immediately after the `<meta charset>` / `<meta viewport>` lines, before any `<style>` block.
