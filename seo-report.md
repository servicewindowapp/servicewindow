# SEO Audit Report — ServiceWindow

**Date:** 2026-06-29
**Pages audited:** 15
**Total issues found:** 29 (16 failures ❌, 13 warnings ⚠️)

---

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to privacy.html, terms.html, and auth.html** — 3 indexable pages are missing canonical tags entirely, leaving them exposed to duplicate-content penalties. This is a one-line fix per file.

2. **Fix city count in jobs.html `og:description`** — the OG description reads "across 21 SWFL cities" but the correct count is 22. This factual error appears in every social share of the jobs page.

3. **Expand short meta descriptions on terms.html (92 chars), auth.html (95 chars), and contact.html (98 chars)** — all three fall below the 120-character floor, leaving Google to generate its own (often worse) snippet. Target 130–155 characters for each.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ | ✅ | Description 1 char over 160-char limit |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ 95 chars | ✅ | ❌ | — | ⚠️ noindex | Missing canonical; description short (95/120); noindex set (intentional but flagged) |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ 98 chars | ✅ | ✅ | ❌ | ✅ | Description short (98/120); no schema markup |
| jobs.html | ✅ | ✅ 131 chars | ⚠️ | ✅ | ✅ | ✅ | `og:description` says "21 SWFL cities" — correct count is 22 |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ 116 chars | ✅ | ❌ | — | ✅ | Missing canonical; description 4 chars short (116/120) |
| terms.html | ✅ | ⚠️ 92 chars | ✅ | ❌ | — | ✅ | Missing canonical; description short (92/120) |
| success.html | ✅ | ⚠️ 48 chars | ❌ | ❌ | — | ⚠️ noindex | Noindexed (intentional); missing `og:title`, `og:description`, `og:url`; missing canonical; description very thin (48 chars) |
| cancel.html | ✅ | ⚠️ 53 chars | ❌ | ❌ | — | ⚠️ noindex | Noindexed (intentional); missing `og:title`, `og:description`, `og:url`; missing canonical; description very thin (53 chars) |
| reset-password.html | ✅ | ⚠️ 34 chars | ❌ | ❌ | — | ⚠️ noindex | Noindexed (intentional); missing `og:title`, `og:description`, `og:url`; missing canonical; description very thin (34 chars) |

**Column key:** ✅ Pass · ⚠️ Present but needs improvement · ❌ Fail · — Not applicable for page type

---

## Issue Detail by Page

### marketplace.html
- **Description (161 chars):** Trim 1 character to stay within the 160-char limit. Remove "." at end or shorten "Southwest Florida" to "SWFL".

### auth.html
- **Canonical missing:** Add `<link rel="canonical" href="https://servicewindow.app/auth.html">`.
- **Description short (95 chars):** Expand to 120–155 chars. The current copy leaves room to add role-specific callouts (food trucks, planners, venues).
- **noindex:** `content="noindex, nofollow"` is set. This suppresses search indexing of the signup/login page. Intentional suppression is fine, but note that it also means the page cannot receive organic traffic for brand + login queries.

### contact.html
- **Schema missing:** A `ContactPage` or `LocalBusiness` schema would reinforce the business identity for Google's knowledge graph.
- **Description short (98 chars):** Current copy is "Contact ServiceWindow — questions about the SWFL food truck marketplace, partnerships, or support." Expand to include response time or contact methods.

### jobs.html
- **OG description city count:** `og:description` states "across 21 SWFL cities" — the correct count per project documentation is 22. This appears in every social share and link preview.

### privacy.html
- **Canonical missing:** Add `<link rel="canonical" href="https://servicewindow.app/privacy.html">`.
- **Description short (116 chars):** 4 chars under the 120-char floor. Minor expansion fixes it.

### terms.html
- **Canonical missing:** Add `<link rel="canonical" href="https://servicewindow.app/terms.html">`.
- **Description short (92 chars):** Expand the description to cover what the ToS governs (platform use, bookings, payments).

### success.html / cancel.html / reset-password.html
- All three are correctly marked `noindex, nofollow`. The missing OG tags and canonical are low priority given the noindex treatment, but the OG image is present — adding at minimum `og:title` and `og:url` would complete the tags if these pages are ever shared directly.

---

## Pages with No Issues
index.html · find-trucks.html · pricing.html · about.html · venues.html · property.html
