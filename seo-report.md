# SEO Audit Report — 2026-10-01

**Pages audited:** 15  
**Total issues found:** 25 (19 ❌, 6 ⚠️)  
**Scope:** `<title>`, meta description (120–160 chars), Open Graph tags, canonical, JSON-LD schema, robots. Report only — no HTML modified.

## Top 3 Priority Fixes
1. **Indexability of `auth.html`, `success.html`, `cancel.html`, `reset-password.html`** — all set `noindex, nofollow`. This is likely intentional for transactional pages, but the audit rule says no production page should be noindex. `auth.html` is the signup/login entry point and is the one most worth reconsidering; the other three are normally best left noindex (confirm intent).
2. **Missing `<link rel="canonical">`** on `auth`, `privacy`, `terms`, `success`, `cancel`, `reset-password`. `privacy.html` and `terms.html` are indexable and are the most important to fix.
3. **Missing/short meta descriptions and OG tags** — `success`, `cancel`, `reset-password` have no `og:title`/`og:description`/`og:url` and descriptions of 34–53 chars; `auth` (95), `contact` (98), `terms` (92) and `privacy` (116) are under the 120-char minimum.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | `og:url` is `https://servicewindow.app` but canonical is `https://servicewindow.app/` (trailing slash mismatch) |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ❌ | Description under 120; no canonical; `robots` = `noindex, nofollow`; no JSON-LD (not required) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ❌ | Description under 120; no JSON-LD (not required) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | — |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ | Description slightly under 120; no canonical; no JSON-LD (not required) |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ❌ | Description under 120; no canonical; no JSON-LD (not required) |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ❌ | Description under 120; missing `og:title`, `og:description`, `og:url` (has `og:image` only); no canonical; `robots` = `noindex, nofollow` |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ❌ | Description under 120; missing `og:title`, `og:description`, `og:url` (has `og:image` only); no canonical; `robots` = `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ❌ | Description under 120; missing `og:title`, `og:description`, `og:url` (has `og:image` only); no canonical; `robots` = `noindex, nofollow` |

## Notes
- All pages have a descriptive, non-placeholder `<title>`.
- All pages have `og:image` pointing at `https://servicewindow.app/og-image.png`; all present `og:url` values use the servicewindow.app domain.
- `index.html` has JSON-LD schema (minimum requirement met); `marketplace`, `find-trucks`, `pricing`, `about`, `jobs`, `venues`, `property` also have it.
