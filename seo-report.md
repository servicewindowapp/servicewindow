# SEO Audit Report — 2026-10-06

## Summary

- **Pages audited:** 15
- **Total issues found:** 28 (across 9 pages; 6 pages fully clean: find-trucks, pricing, about, jobs, venues, property)
- **Schema on index.html:** ✅ present (`WebSite` + `Organization`)
- **og:image:** present on all 15 pages; `og-image.png` exists in repo root.

### Top 3 priority fixes

1. **success.html, cancel.html, reset-password.html — missing OG tags and canonical, very short descriptions (34–53 chars).** All three lack `og:title`, `og:description`, `og:url` and `<link rel="canonical">`. They are `noindex` so this is low SEO impact; if intentional, only the noindex flag needs documenting. 18 of the 28 issues come from these pages.
2. **auth.html — `noindex, nofollow`, no canonical, 95-char description.** Per audit rule 9 no production page should be noindex. If the login page is deliberately hidden from search, treat this as an accepted exception; otherwise remove noindex and add a canonical.
3. **privacy.html and terms.html — no canonical, descriptions under 120 chars (116 / 92).** These are indexable pages, so a missing canonical risks duplicate-URL signals (`/privacy` vs `/privacy.html`).

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ WebSite, Organization | `og:url` is `https://servicewindow.app` (no trailing slash) but canonical is `https://servicewindow.app/` — align them |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ CollectionPage | Description 1 char over 160 limit |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ⚠️ none | Description under 120 chars; no canonical; `robots: noindex, nofollow` (fails rule 9 — may be intentional) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ WebPage | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ AboutPage | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ⚠️ none | Description under 120 chars; no JSON-LD (only required on index) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ CollectionPage | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ WebPage | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ⚠️ none | Description under 120 chars; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ⚠️ none | Description under 120 chars; no canonical |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ⚠️ none | Description far under 120; missing `og:title`, `og:description`, `og:url`; no canonical; `robots: noindex, nofollow` |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ⚠️ none | Description far under 120; missing `og:title`, `og:description`, `og:url`; no canonical; `robots: noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ⚠️ none | Description far under 120; missing `og:title`, `og:description`, `og:url`; no canonical; `robots: noindex, nofollow` |

## Notes

- Issue count per page: index 1, marketplace 1, auth 3, contact 1, privacy 2, terms 2, success 6, cancel 6, reset-password 6 (total 28). Missing schema on non-index pages is flagged ⚠️ but not counted as an issue.
- `<meta name="robots">` is `noindex, nofollow` on auth, success, cancel and reset-password. Every other audited page has no robots tag (indexable by default).
- Titles on all pages are descriptive; no placeholders found. `&amp;` entities in titles/og:title are valid HTML.
- This audit is report-only; no HTML files were modified.
