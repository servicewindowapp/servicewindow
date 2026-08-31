# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-31
**Pages audited:** 15
**Scope:** `<title>`, meta description, Open Graph tags, canonical link, JSON-LD schema, robots directive
**Note:** Report only — no HTML files were modified.

---

## Summary

- **Total pages audited:** 15
- **Pages with zero issues:** 7 (`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`)
- **Pages with at least one issue:** 8 (`marketplace.html`, `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`)
- **Total individual issues flagged:** 28

### Top 3 priority fixes

1. **Missing `<link rel="canonical">` on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all, risking duplicate-content ambiguity.
2. **Broken Open Graph previews on `success.html`, `cancel.html`, `reset-password.html`** — each has only `og:image`; `og:title`, `og:description`, and `og:url` are all missing, so any shared link to these pages renders a blank/broken social card.
3. **Meta descriptions under the 120-char minimum on 7 pages** — `reset-password.html` (34), `success.html` (48), `cancel.html` (53), `terms.html` (92), `auth.html` (95), `contact.html` (98), `privacy.html` (116) — all need expansion into the 120–160 char target range.

**Also worth confirming:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This is common practice for transactional/gated pages, but since these 4 files are in the production-page audit list, flagging for confirmation that it's intentional and not left over from staging.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ `servicewindow.app/` | ✅ (WebSite + Organization) | — |
| `marketplace.html` | ✅ | ⚠️ (161 chars — 1 over limit) | ✅ | ✅ | ✅ (CollectionPage) | Description 1 char over the 160 max |
| `find-trucks.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ (CollectionPage) | — |
| `auth.html` | ✅ | ⚠️ (95 chars — under 120) | ✅ | ❌ missing | ❌ missing | `robots: noindex, nofollow` (confirm intentional); no canonical; no JSON-LD; description under 120 chars |
| `pricing.html` | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ (WebPage + OfferCatalog) | — |
| `about.html` | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ (AboutPage) | — |
| `contact.html` | ✅ | ⚠️ (98 chars — under 120) | ✅ | ✅ | ❌ missing | No JSON-LD schema; description under 120 chars |
| `jobs.html` | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ (CollectionPage) | — |
| `venues.html` | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ (WebPage) | — |
| `property.html` | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ (WebPage) | — |
| `privacy.html` | ✅ | ⚠️ (116 chars — under 120) | ✅ | ❌ missing | ❌ missing | No canonical; no JSON-LD; description under 120 chars |
| `terms.html` | ✅ | ❌ (92 chars — well under 120) | ✅ | ❌ missing | ❌ missing | No canonical; no JSON-LD; description well under 120 chars |
| `success.html` | ✅ | ❌ (48 chars — well under 120) | ❌ (only `og:image` present) | ❌ missing | ❌ missing | `robots: noindex, nofollow` (confirm intentional); no canonical; no JSON-LD; `og:title`/`og:description`/`og:url` all missing; description far under 120 chars |
| `cancel.html` | ✅ | ❌ (53 chars — well under 120) | ❌ (only `og:image` present) | ❌ missing | ❌ missing | Same pattern as `success.html`: noindex set, no canonical, no schema, incomplete OG, description too short |
| `reset-password.html` | ✅ | ❌ (34 chars — well under 120) | ❌ (only `og:image` present) | ❌ missing | ❌ missing | Same pattern as `success.html`: noindex set, no canonical, no schema, incomplete OG, description too short |

---

## Notes

- Schema markup (`application/ld+json`) is only strictly required on `index.html` per the audit checklist, but 9 of the other 14 pages already carry page-appropriate schema as a site convention (WebPage, CollectionPage, AboutPage, etc.). The 6 pages without it (`auth`, `contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) are inconsistent with that established pattern.
- All 15 pages have a non-blank, descriptive `<title>` — no placeholder titles found.
- All 15 pages have at least a base `og:image` pointing to `https://servicewindow.app/og-image.png`.
- On `contact.html`, `privacy.html`, and `terms.html`, the OG tag cluster is positioned near the end of `<head>` (separate from the top meta cluster) rather than grouped with the primary `<meta name="description">` block — functionally fine (still inside `<head>`), but inconsistent with the other pages' head structure.
