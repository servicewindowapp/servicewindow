# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-23
**Scope:** 15 production HTML pages (report only — no HTML files modified)

## Summary

- **Pages audited:** 15
- **Issues found:** 28 across 9 pages (6 pages are clean: index, find-trucks, pricing, about, venues, property)
  - 4 of these are `noindex` on auth/utility pages (`auth`, `success`, `cancel`, `reset-password`). They fail the check as written, but `noindex` is almost certainly intentional and correct for these pages — **recommend keeping it**.
  - 15 are missing OG/canonical/description issues on the three noindexed post-flow pages (`success`, `cancel`, `reset-password`) — low impact since they are not indexed.
- **Schema on index.html:** ✅ present and valid (`WebSite` + `Organization`). All JSON-LD blocks found parse as valid JSON.
- **og:image:** present on all 15 pages; `og-image.png` exists in the repo root.

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** They are indexable public pages, have a correct `og:url`, but no canonical.
2. **Fix meta description lengths on indexable pages** (target 120–160 chars): `terms.html` (92), `contact.html` (98), `privacy.html` (116) are too short; `marketplace.html` (161) is one character over.
3. **Fix city count in `jobs.html`:** `og:description` (line 14) and the JSON-LD `description` (line 21) say "21 SWFL cities". The copy rule says 22.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement (or optional schema missing). Description length is in parentheses. OG Tags = og:title, og:description, og:url (servicewindow.app), og:image.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ WebSite, Organization | None. Note: `og:url` is `https://servicewindow.app` and canonical is `https://servicewindow.app/` (trailing slash) — harmless, but could be aligned. |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ CollectionPage ×2 | Description 1 char over the 160 limit. |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ CollectionPage ×2 | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ⚠️ none | No canonical; description short; `robots: noindex, nofollow` (likely intentional). |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ WebPage | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ AboutPage | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ⚠️ none | Description short. Optional: add `ContactPage` schema. |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ⚠️ CollectionPage | og:description and JSON-LD say "21 SWFL cities" — should be 22. |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ WebPage | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ⚠️ none | No canonical; description short. |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ⚠️ none | No canonical; description short. |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | ⚠️ none | Only og:image present (no og:title, og:description, og:url); no canonical; description short; `noindex` (likely intentional). |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | ⚠️ none | Only og:image present (no og:title, og:description, og:url); no canonical; description short; `noindex` (likely intentional). |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | ⚠️ none | Only og:image present (no og:title, og:description, og:url); no canonical; description short; `noindex` (likely intentional). |

## Robots check

| Page | `<meta name="robots">` |
|------|------------------------|
| auth.html | `noindex, nofollow` |
| success.html | `noindex, nofollow` |
| cancel.html | `noindex, nofollow` |
| reset-password.html | `noindex, nofollow` |
| All other 11 pages | Not set (indexable) ✅ |

None of the main marketing or discovery pages are noindexed.
