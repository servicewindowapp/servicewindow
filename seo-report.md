# SEO Audit Report — ServiceWindow
**Date:** 2026-05-20  
**Audited by:** Automated SEO audit  
**Scope:** 15 production HTML pages  

---

## Summary

| Stat | Value |
|------|-------|
| Pages audited | 15 |
| Pages fully passing | 6 |
| Pages with issues | 9 |
| Total issues found | 27 |

### Top 3 Priority Fixes

1. **Add `noindex` to transactional/utility pages** — `success.html`, `cancel.html`, and `reset-password.html` have no `<meta name="robots">` tag and will be indexed by crawlers. These pages also lack OG tags and canonical links. Fix: add `<meta name="robots" content="noindex, nofollow">` to all three.

2. **Add canonical tags to `auth.html`, `privacy.html`, and `terms.html`** — Three pages with crawlable, permanent URLs are missing `<link rel="canonical">`. Auth is especially high-traffic for sign-up flows. Fix: add `<link rel="canonical" href="https://servicewindow.app/PAGE.html">` to each.

3. **Expand short descriptions on 5 pages** — `auth.html` (95 chars), `contact.html` (98 chars), `terms.html` (92 chars), `success.html` (48 chars), `cancel.html` (53 chars), and `reset-password.html` (34 chars) all fall below the 120-character minimum. Fix: rewrite to 120–160 chars, incorporating keywords where natural.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over limit) | ✅ | ✅ | ✅ | Trim description by 1 char |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 chars (too short) | ✅ | ❌ Missing | ❌ Missing | No canonical; description too short; no schema |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 98 chars (too short) | ✅ | ✅ | ❌ Missing | Description too short; no schema |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars (slightly short) | ✅ | ❌ Missing | ❌ Missing | No canonical; description slightly short; no schema |
| `terms.html` | ✅ | ⚠️ 92 chars (too short) | ✅ | ❌ Missing | ❌ Missing | No canonical; description too short; no schema |
| `success.html` | ✅ | ❌ 48 chars (far too short) | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | Transactional page lacks noindex; incomplete OG tags; no canonical; no schema; description unusable |
| `cancel.html` | ✅ | ❌ 53 chars (far too short) | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | Transactional page lacks noindex; incomplete OG tags; no canonical; no schema; description unusable |
| `reset-password.html` | ✅ | ❌ 34 chars (far too short) | ❌ Missing og:title, og:description, og:url | ❌ Missing | ❌ Missing | Utility page lacks noindex; incomplete OG tags; no canonical; no schema; description unusable |

---

## Check Definitions

| Check | Pass Condition |
|-------|---------------|
| **Title** | Present, non-blank, descriptive (not a placeholder) |
| **Description** | Present, 120–160 characters |
| **OG Tags** | All four present: `og:title`, `og:description`, `og:url` (servicewindow.app domain), `og:image` |
| **Canonical** | Present, `href` contains `servicewindow.app` domain |
| **Schema** | `<script type="application/ld+json">` present; required on `index.html` at minimum |
| **Robots** | `noindex` not present on production pages; utility/transactional pages should have `noindex` |

---

## Issue Detail by Page

### auth.html
- **Description:** 95 chars — expand to include role-specific keywords (food trucks, event planners, venues)
- **Canonical:** Add `<link rel="canonical" href="https://servicewindow.app/auth.html">`
- **Schema:** Consider adding `WebPage` schema (or omit if noindex is added in future)

### contact.html
- **Description:** 98 chars — expand to mention SWFL region, response time, or support topics
- **Schema:** Add `ContactPage` schema or basic `WebPage` schema

### privacy.html
- **Description:** 116 chars — 4 chars short; add "on the SWFL food truck marketplace" or similar
- **Canonical:** Add `<link rel="canonical" href="https://servicewindow.app/privacy.html">`
- **Schema:** Not required for legal pages, but canonical is

### terms.html
- **Description:** 92 chars — expand to 120–160 chars
- **Canonical:** Add `<link rel="canonical" href="https://servicewindow.app/terms.html">`
- **Schema:** Not required for legal pages, but canonical is

### success.html
- **Priority fix:** Add `<meta name="robots" content="noindex, nofollow">` — this is a post-Stripe redirect page with no organic search value
- **OG Tags:** Missing `og:title`, `og:description`, `og:url` — add if page is ever shared directly
- **Canonical:** Add or suppress with noindex
- **Description:** 48 chars — rewrite to be meaningful if noindex is not added

### cancel.html
- **Priority fix:** Add `<meta name="robots" content="noindex, nofollow">` — post-Stripe cancel page
- **OG Tags:** Missing `og:title`, `og:description`, `og:url`
- **Canonical / Description:** Same as success.html

### reset-password.html
- **Priority fix:** Add `<meta name="robots" content="noindex, nofollow">` — utility auth flow page
- **OG Tags:** Missing `og:title`, `og:description`, `og:url`
- **Canonical / Description:** Same as success.html

### marketplace.html
- **Description:** 161 chars — remove one word or tighten the final clause to land at ≤160

---

## Pages Fully Passing

`find-trucks.html` · `pricing.html` · `about.html` · `jobs.html` · `venues.html` · `property.html` · `index.html`

> Note: `index.html` description is exactly 160 chars (within limit). All other checks pass.
