# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-16
**Scope:** 15 production HTML pages. Report only; no HTML files were changed.

## Summary

| Metric | Value |
|--------|-------|
| Pages audited | 15 |
| Pages with no issues | 5 (find-trucks, pricing, about, venues, property) |
| Total issues found | 29 |
| `<title>` present and descriptive | 15 / 15 |
| Meta description 120–160 chars | 7 / 15 |
| Complete OG set (title, description, url, image) | 12 / 15 |
| Canonical on servicewindow.app | 8 / 15 |
| JSON-LD on index.html | ✅ (WebSite + Organization) |
| Pages set to `noindex` | 4 (auth, success, cancel, reset-password) |

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html`, `terms.html` and `auth.html`.** These are the only pages missing a canonical that are indexable, or would be if the `noindex` on auth were removed. Every other public content page has one.
2. **Rewrite the short meta descriptions on indexable pages to 120–160 characters:** `contact.html` (98), `privacy.html` (116), `terms.html` (92). Also trim `marketplace.html`, which is 1 character over (161).
3. **Fix the city count in the `jobs.html` og:description.** It says "across 21 SWFL cities"; the copy rule says 22. This text appears on every social share of the Jobs page.

> **About `noindex`:** `auth.html`, `success.html`, `cancel.html` and `reset-password.html` all have `<meta name="robots" content="noindex, nofollow">`. That fails check 9 as written. However, `noindex` is normal practice for post-checkout and password-reset pages, and it is probably deliberate here. Each one is flagged ⚠️ below rather than treated as an urgent fix. The one worth deciding on is `auth.html`: decide whether the signup page should appear in search results.

---

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement
OG Tags = og:title, og:description, og:url (servicewindow.app), og:image. JSON-LD schema is required only on `index.html`. On other pages ❌ in the Schema column means "none present" and is not counted as an issue.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ | ⚠️ | ✅ | ✅ | og:url `https://servicewindow.app` (no trailing slash) does not match canonical `https://servicewindow.app/` |
| marketplace.html | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ | Description is 1 character over the 160 limit |
| find-trucks.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ⚠️ 95 chars | ✅ | ❌ | ❌ | No canonical; description too short; robots `noindex, nofollow` ⚠️ |
| pricing.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ⚠️ 98 chars | ✅ | ✅ | ❌ | Description too short |
| jobs.html | ✅ | ✅ | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities"; should be 22 |
| venues.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ 116 chars | ✅ | ❌ | ❌ | No canonical; description too short |
| terms.html | ✅ | ⚠️ 92 chars | ✅ | ❌ | ❌ | No canonical; description too short |
| success.html | ✅ | ⚠️ 48 chars | ❌ | ❌ | ❌ | Missing og:title, og:description, og:url; no canonical; description too short; robots `noindex, nofollow` ⚠️ (likely intentional) |
| cancel.html | ✅ | ⚠️ 53 chars | ❌ | ❌ | ❌ | Missing og:title, og:description, og:url; no canonical; description too short; robots `noindex, nofollow` ⚠️ (likely intentional) |
| reset-password.html | ✅ | ⚠️ 34 chars | ❌ | ❌ | ❌ | Missing og:title, og:description, og:url; no canonical; description too short; robots `noindex, nofollow` ⚠️ (likely intentional) |

### Issue count by page

| Page | Issues |
|------|--------|
| success.html | 6 |
| cancel.html | 6 |
| reset-password.html | 6 |
| auth.html | 3 |
| privacy.html | 2 |
| terms.html | 2 |
| index.html | 1 |
| marketplace.html | 1 |
| contact.html | 1 |
| jobs.html | 1 |
| find-trucks, pricing, about, venues, property | 0 |
| **Total** | **29** |

---

## Notes

- **Titles:** all 15 are present, descriptive and branded. None are blank or placeholders.
- **og:image:** all 15 pages point to `https://servicewindow.app/og-image.png`, and that file exists in the repo root.
- **og:url and canonical domains:** every one that is present uses `https://servicewindow.app`. No staging or github.io URLs were found.
- **Tag placement:** on most pages the OG tags sit late in `<head>`, after large inline `<style>` blocks (for example, privacy.html line 242 and auth.html line 615). They are still inside `<head>`, so crawlers read them. No action needed.
- **index.html JSON-LD** has `WebSite` with a `SearchAction` and `Organization` with `areaServed`, `contactPoint` and `hasOfferCatalog`. Its logo URL `logo.webp` exists in the repo. Its `areaServed` lists 5 of the 22 cities, which is valid but could be expanded.
- **Description lengths** are character counts of the `content` attribute, with the em dash counted as 1 character.
