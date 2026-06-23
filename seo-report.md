# SEO Audit Report — ServiceWindow
**Date:** 2026-05-14  
**Audited by:** Automated nightly audit  
**Scope:** 15 production HTML pages

---

## Summary

| Metric | Value |
|--------|-------|
| Total pages audited | 15 |
| Pages fully clean | 5 |
| Pages with minor issues | 3 |
| Pages with moderate issues | 4 |
| Pages with major issues | 3 |
| **Total issues found** | **28** |

### Top 3 Priority Fixes

1. **Add `noindex` to transactional utility pages** (`success.html`, `cancel.html`, `reset-password.html`) — these post-Stripe and auth-flow pages have no robots directive and are currently indexable. They will waste crawl budget, may confuse users who find them via search, and have thin/near-empty descriptions. Add `<meta name="robots" content="noindex, nofollow">` to all three immediately.

2. **Add missing canonical tags to 7 pages** (`auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`) — canonicals are absent on 47% of the site. This is a link equity and duplicate-content risk. Each page needs `<link rel="canonical" href="https://servicewindow.app/[filename]">` in `<head>`.

3. **Expand short meta descriptions on 6 pages** — `reset-password.html` (34 chars), `success.html` (48 chars), `cancel.html` (53 chars), `terms.html` (94 chars), `auth.html` (97 chars), and `contact.html` (100 chars) all fall below the 120-char minimum. Descriptions directly affect SERP click-through rates; all should reach 130–155 characters.

---

## Full Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ⚠️ | ✅ | ✅ | ✅ | Description at exact 160-char limit (borderline); `<title>` placed at line 82, after the LD+JSON block — move it to line 4 for conventional head order |
| `marketplace.html` | ✅ | ⚠️ | ✅ | ✅ | ✅ | Description 163 chars — 3 over the 160-char max; trim to ≤160 |
| `find-trucks.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 97 chars (min 120); missing canonical; no schema (low priority for auth page) |
| `pricing.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ | ⚠️ | ✅ | ✅ | `og:title` and `og:description` declared at top of `<head>` (lines 8–9); `og:type`, `og:url`, `og:image` split to bottom of `<head>` (lines 485–487) — consolidate into one block |
| `contact.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 100 chars (min 120); missing canonical; no schema (acceptable for contact page) |
| `jobs.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 118 chars (2 under 120 minimum); missing canonical; no schema (acceptable for legal page) |
| `terms.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 94 chars (min 120); missing canonical; no schema (acceptable for legal page) |
| `success.html` | ✅ | ❌ | ❌ | ❌ | ❌ | Description 48 chars; `og:title`, `og:description`, `og:url` all absent (only `og:image` present); missing canonical; **missing `noindex`** — this post-Stripe page should not be indexed |
| `cancel.html` | ✅ | ❌ | ❌ | ❌ | ❌ | Description 53 chars; `og:title`, `og:description`, `og:url` all absent; missing canonical; **missing `noindex`** — this post-Stripe page should not be indexed |
| `reset-password.html` | ✅ | ❌ | ❌ | ❌ | ❌ | Description 34 chars; `og:title`, `og:description`, `og:url` all absent; missing canonical; **missing `noindex`** — auth-flow utility page should not be indexed |

---

## Issue Detail by Category

### Missing Canonical Tags (7 pages)
| Page | Should be |
|------|-----------|
| `auth.html` | `https://servicewindow.app/auth.html` |
| `contact.html` | `https://servicewindow.app/contact.html` |
| `privacy.html` | `https://servicewindow.app/privacy.html` |
| `terms.html` | `https://servicewindow.app/terms.html` |
| `success.html` | `https://servicewindow.app/success.html` |
| `cancel.html` | `https://servicewindow.app/cancel.html` |
| `reset-password.html` | `https://servicewindow.app/reset-password.html` |

### Description Length Violations (7 pages)
| Page | Length | Target | Status |
|------|--------|--------|--------|
| `reset-password.html` | 34 | 120–160 | ❌ Too short |
| `success.html` | 48 | 120–160 | ❌ Too short |
| `cancel.html` | 53 | 120–160 | ❌ Too short |
| `terms.html` | 94 | 120–160 | ❌ Too short |
| `auth.html` | 97 | 120–160 | ❌ Too short |
| `contact.html` | 100 | 120–160 | ❌ Too short |
| `privacy.html` | 118 | 120–160 | ⚠️ 2 chars under |
| `marketplace.html` | 163 | 120–160 | ⚠️ 3 chars over |
| `index.html` | 160 | 120–160 | ⚠️ At hard limit |

### Missing OG Tags (3 pages)
| Page | Missing |
|------|---------|
| `success.html` | `og:title`, `og:description`, `og:url` |
| `cancel.html` | `og:title`, `og:description`, `og:url` |
| `reset-password.html` | `og:title`, `og:description`, `og:url` |

### Missing `noindex` on Utility Pages (3 pages)
| Page | Reason |
|------|--------|
| `success.html` | Post-Stripe checkout page — thin content, not a search destination |
| `cancel.html` | Post-Stripe cancel page — thin content, not a search destination |
| `reset-password.html` | Auth-flow utility page — not a search destination |

### Structural / Minor Issues (2 pages)
| Page | Issue |
|------|-------|
| `index.html` | `<title>` tag located at line 82, after the `<script type="application/ld+json">` block; conventional placement is before all other head content |
| `about.html` | OG block split: `og:title` + `og:description` at head lines 8–9; `og:type` + `og:url` + `og:image` at bottom of `<head>` (lines 485–487); consolidate into one contiguous block |

---

## Pages Passing All Checks

- `find-trucks.html`
- `pricing.html`
- `jobs.html`
- `venues.html`
- `property.html`

---

*Report generated: 2026-05-14. No HTML files were modified — this is a read-only audit.*
