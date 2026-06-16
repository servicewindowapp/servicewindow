# SEO Audit Report — ServiceWindow
**Generated:** 2026-06-16  
**Auditor:** Automated nightly audit  
**Scope:** 15 production HTML pages

---

## Summary

| Metric | Value |
|--------|-------|
| Pages audited | 15 |
| Pages with zero issues | 6 |
| Total issues found | 32 |
| Critical (❌) | 19 |
| Needs improvement (⚠️) | 13 |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to auth.html, privacy.html, and terms.html** — three indexed pages are completely missing canonical tags, creating duplicate-content risk if crawlers hit these URLs via multiple paths.
2. **Expand short meta descriptions** on `terms.html` (92 chars), `auth.html` (95 chars), `contact.html` (98 chars), and `privacy.html` (116 chars) — all fall below the 120-char minimum, leaving Google to auto-generate snippets.
3. **Fix city count in jobs.html** — both `og:description` and the JSON-LD schema say "21 SWFL cities" but the correct count is **22**. This contradicts every other page and brand copy.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over) | ✅ | ✅ | ✅ | ✅ | Description 1 char over 160 limit |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 chars (short) | ✅ | ❌ missing | ❌ missing | ❌ noindex,nofollow | Short description; no canonical; no schema; noindex on a production auth page |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 98 chars (short) | ✅ | ✅ | ❌ missing | ✅ | Short description; no schema |
| `jobs.html` | ✅ | ✅ 131 chars | ⚠️ "21 SWFL cities" | ✅ | ⚠️ "21 SWFL cities" | ✅ | og:description and schema both say 21 cities — should be 22 |
| `venues.html` | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars (short) | ✅ | ❌ missing | ❌ missing | ✅ | Short description; no canonical; no schema |
| `terms.html` | ✅ | ⚠️ 92 chars (short) | ✅ | ❌ missing | ❌ missing | ✅ | Short description; no canonical; no schema |
| `success.html` | ✅ | ⚠️ 48 chars (short) | ❌ og:title/desc/url missing | ❌ missing | ❌ missing | ⚠️ noindex (appropriate for transaction page) | Utility page — noindex intentional; short desc, no OG block, no canonical, no schema |
| `cancel.html` | ✅ | ⚠️ 53 chars (short) | ❌ og:title/desc/url missing | ❌ missing | ❌ missing | ⚠️ noindex (appropriate for transaction page) | Utility page — noindex intentional; short desc, no OG block, no canonical, no schema |
| `reset-password.html` | ✅ | ⚠️ 34 chars (short) | ❌ og:title/desc/url missing | ❌ missing | ❌ missing | ⚠️ noindex (appropriate for utility page) | Utility page — noindex intentional; short desc, no OG block, no canonical, no schema |

---

## Issue Detail by Page

### `auth.html` — 4 issues
- **Description short:** 95 chars (minimum 120). Expand to cover food trucks, event planners, venues, and property owners.
- **No canonical:** Missing `<link rel="canonical" href="https://servicewindow.app/auth.html">`.
- **No schema:** No `<script type="application/ld+json">` — a `WebPage` schema would suffice.
- **noindex,nofollow:** Auth pages are debated, but this blocks Googlebot entirely. Evaluate whether `/auth.html` should appear in search results for branded queries like "ServiceWindow login".

### `contact.html` — 2 issues
- **Description short:** 98 chars (minimum 120). Current: "Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support."
- **No schema:** Missing structured data. A `ContactPage` schema would add rich result eligibility.

### `jobs.html` — 1 issue
- **Wrong city count:** `og:description` reads "…across 21 SWFL cities" and JSON-LD schema also says 21. Per brand spec the count is **22**. Both should read "22 SWFL cities".

### `marketplace.html` — 1 issue
- **Description 1 char over:** 161 chars vs 160 limit. Trim one character to avoid truncation risk.

### `privacy.html` — 3 issues
- **Description short:** 116 chars (minimum 120). Expand slightly.
- **No canonical:** Missing `<link rel="canonical" href="https://servicewindow.app/privacy.html">`.
- **No schema:** A `WebPage` schema type would suffice.

### `terms.html` — 3 issues
- **Description short:** 92 chars (minimum 120). Expand to include what the terms cover.
- **No canonical:** Missing `<link rel="canonical" href="https://servicewindow.app/terms.html">`.
- **No schema:** A `WebPage` schema type would suffice.

### `success.html`, `cancel.html`, `reset-password.html` — 6 issues each (low priority)
These are post-transaction utility pages with `noindex,nofollow` already set, which is correct. The missing OG tags, canonical, schema, and short descriptions are **lower priority** given they will not be indexed or shared. Recommended: add bare-minimum OG tags and canonical for defense-in-depth (e.g., if `noindex` is ever inadvertently removed).

---

## Pass/Fail Reference Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Passes check |
| ⚠️ | Present but needs improvement |
| ❌ | Missing or failing |

---

## Checks Performed

1. `<title>` — present and descriptive (not blank, not a placeholder)
2. `<meta name="description">` — present, 120–160 characters
3. `<meta property="og:title">` — present
4. `<meta property="og:description">` — present
5. `<meta property="og:url">` — present and uses `servicewindow.app` domain
6. `<meta property="og:image">` — present
7. `<link rel="canonical">` — present and uses `servicewindow.app` domain
8. `<script type="application/ld+json">` — present (required on `index.html` minimum)
9. `<meta name="robots">` — not set to `noindex` on any production page
