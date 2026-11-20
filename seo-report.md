# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-20
**Scope:** 15 production HTML pages (report only — no HTML files were modified)

## Summary

- **Pages audited:** 15
- **Total issues found:** 29 (18 of them are on the three noindexed post-flow pages: `success.html`, `cancel.html`, `reset-password.html`)
- **Pages with no issues:** 5 (`find-trucks.html`, `pricing.html`, `about.html`, `venues.html`, `property.html`)
- **Schema on index.html:** ✅ present and valid JSON-LD (`WebSite` + `Organization`)

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** Both pages can be indexed but have no canonical tag. All other indexable pages have one.
2. **Lengthen the short meta descriptions on indexable pages.** `contact.html` (98 chars), `terms.html` (92) and `privacy.html` (116) are below the 120–160 target, and `marketplace.html` (161) is 1 character over.
3. **Fix the city count in the `jobs.html` og:description.** It says "across **21** SWFL cities", but the copy rule is always 22. Social previews show this text.

> **Policy note (robots):** `auth.html`, `success.html`, `cancel.html` and `reset-password.html` all set `noindex, nofollow`. This fails check #9 as written, but noindex is normally the right choice for auth and post-checkout pages. Recommendation: confirm this is intentional and take these 4 pages out of the "must be indexable" check (and the OG/canonical checks) in future runs. If they are excluded, the real issue count drops to about 8.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · Schema is required only on `index.html`; elsewhere it is marked "—" when absent (not an issue).

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ WebSite, Organization | og:url `https://servicewindow.app` lacks the trailing slash used by the canonical (`https://servicewindow.app/`). Minor inconsistency |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ CollectionPage | Description is 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ CollectionPage | — |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description too short; no canonical; `robots: noindex, nofollow` (likely intentional) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ WebPage | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ AboutPage | — |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ CollectionPage | og:description says "21 SWFL cities". Must be 22 |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ WebPage | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ WebPage | — |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | No canonical; description slightly short |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | No canonical; description too short |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | — | Missing og:title, og:description, og:url (only og:image present); no canonical; description too short; `robots: noindex, nofollow` (likely intentional) |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | — | Missing og:title, og:description, og:url (only og:image present); no canonical; description too short; `robots: noindex, nofollow` (likely intentional) |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | — | Missing og:title, og:description, og:url (only og:image present); no canonical; description too short; `robots: noindex, nofollow` (likely intentional) |

## Check details

- **Titles:** all 15 pages have a descriptive, non-placeholder `<title>`.
- **og:image:** present on all 15 pages (`https://servicewindow.app/og-image.png`).
- **og:url / canonical domain:** every og:url and canonical that is present uses `https://servicewindow.app`. No off-domain values were found.
- **JSON-LD:** all 8 pages that have it parse as valid JSON.
- **robots:** no page that is meant to be indexed is set to noindex. The only noindexed pages are the 4 auth and post-flow pages listed above.
