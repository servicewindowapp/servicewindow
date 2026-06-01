# ServiceWindow SEO Audit Report
**Date:** 2026-05-27  
**Pages audited:** 15  
**Total issues found:** 25  

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 6 |
| Pages with issues | 9 |
| Critical issues (❌) | 21 |
| Warnings (⚠️) | 4 |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — Both are indexable legal pages with OG tags and descriptions but no canonical. Duplicate-content risk if Googlebot encounters them via multiple paths.

2. **Expand `<meta name="description">` on `contact.html` (98 chars) and `terms.html` (92 chars)** — Both fall below the 120-character minimum. Google may auto-generate snippets that pull off-message copy instead.

3. **Add `<link rel="canonical">` and full OG tag set to `auth.html`** — Auth is noindexed but still lacks a canonical and has a too-short description (95 chars). If the noindex is ever lifted (e.g., for social sharing), the page will be bare.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ⚠️ 160 chars (at limit) | ✅ all 4 | ✅ | ✅ | ✅ | Description at 160-char ceiling — at risk of SERP truncation |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over) | ✅ all 4 | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ❌ 95 chars (short) | ✅ all 4 | ❌ missing | ❌ n/a | ⚠️ noindex | Description too short; missing canonical; noindex intentional but verify |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ❌ 98 chars (short) | ✅ all 4 | ✅ | ❌ missing | ✅ | Description too short; no schema markup (ContactPage) |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 145 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars (short) | ✅ all 4 | ❌ missing | ❌ n/a | ✅ | Description 4 chars below 120 minimum; missing canonical |
| `terms.html` | ✅ | ❌ 92 chars (short) | ✅ all 4 | ❌ missing | ❌ n/a | ✅ | Description too short; missing canonical |
| `success.html` | ✅ | ❌ 48 chars (thin) | ❌ og:title/desc/url missing | ❌ missing | ❌ n/a | ⚠️ noindex | Transactional page — thin desc, no OG set, no canonical; noindex appropriate |
| `cancel.html` | ✅ | ❌ 53 chars (thin) | ❌ og:title/desc/url missing | ❌ missing | ❌ n/a | ⚠️ noindex | Transactional page — thin desc, no OG set, no canonical; noindex appropriate |
| `reset-password.html` | ✅ | ❌ 34 chars (thin) | ❌ og:title/desc/url missing | ❌ missing | ❌ n/a | ⚠️ noindex | Utility page — thin desc, no OG set, no canonical; noindex appropriate |

---

## Issue Detail

### ❌ Missing canonicals
| Page | Indexable? | Risk |
|------|-----------|------|
| `auth.html` | No (noindex) | Low — but a canonical is best practice even on noindexed pages |
| `privacy.html` | Yes | High — duplicate-content signal if crawled via multiple URLs |
| `terms.html` | Yes | High — duplicate-content signal if crawled via multiple URLs |
| `success.html` | No (noindex) | Low |
| `cancel.html` | No (noindex) | Low |
| `reset-password.html` | No (noindex) | Low |

### ❌ Descriptions below 120 characters
| Page | Length | Current Copy |
|------|--------|-------------|
| `auth.html` | 95 | "Sign up or log in to ServiceWindow — the verified food truck marketplace for Southwest Florida." |
| `contact.html` | 98 | "Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support." |
| `terms.html` | 92 | "ServiceWindow Terms of Service — the rules governing use of the SWFL food truck marketplace." |
| `success.html` | 48 | "You're in. ServiceWindow subscription confirmed." |
| `cancel.html` | 53 | "No problem. Your ServiceWindow trial is still active." |
| `reset-password.html` | 34 | "Reset your ServiceWindow password." |

### ⚠️ Descriptions at or over 160 characters
| Page | Length | Note |
|------|--------|------|
| `index.html` | 160 | At ceiling — Google may truncate at ~155 chars in mobile SERPs |
| `marketplace.html` | 161 | 1 char over limit |
| `privacy.html` | 116 | 4 chars below 120 minimum |

### ❌ Missing schema markup (indexable pages only)
| Page | Suggested Schema Type |
|------|----------------------|
| `contact.html` | `ContactPage` |

### ❌ Incomplete OG tag sets (noindexed pages — lower priority)
| Page | Missing |
|------|---------|
| `success.html` | og:title, og:description, og:url |
| `cancel.html` | og:title, og:description, og:url |
| `reset-password.html` | og:title, og:description, og:url |

### ⚠️ Pages with noindex (verify intent)
| Page | noindex intentional? |
|------|---------------------|
| `auth.html` | Yes — login pages should not be indexed |
| `success.html` | Yes — transactional confirmation page |
| `cancel.html` | Yes — transactional cancellation page |
| `reset-password.html` | Yes — utility/auth flow page |

All four noindex pages appear intentional. No indexable production page is incorrectly set to noindex.

---

## Pages Passing All Checks
- `find-trucks.html`
- `pricing.html`
- `about.html`
- `jobs.html`
- `venues.html`
- `property.html`

---

*Generated by nightly SEO audit — 2026-05-27*
