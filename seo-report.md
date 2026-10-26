# SEO Audit Report — 2026-10-26

**Pages audited:** 15 · **Total issues found:** 27 · **Pages fully passing:** 8 of 15

## Top 3 Priority Fixes
1. **`auth.html` is `noindex, nofollow`** and has no canonical; the spec requires no production page to be noindex. Remove noindex (or confirm it is intentional) and add `<link rel="canonical">`. Its description is also only 95 chars.
2. **`success.html`, `cancel.html`, `reset-password.html` lack `og:title`, `og:description`, `og:url`, canonical**, are `noindex`, and have 34–53 char descriptions. noindex is likely intentional for transactional pages, so decide whether to exempt them. If not, add the full OG set and canonical.
3. **`privacy.html`, `terms.html`, `contact.html` have short descriptions (92–116 chars, target 120–160) and `privacy.html`/`terms.html` have no canonical.** `marketplace.html` is 1 char over (161).

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required for this page

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description short; no canonical; robots `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | Description short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | Description short; no canonical |
| success.html | ✅ | ⚠️ (48) | ❌ (og:image only) | ❌ | — | Description short; missing og:title, og:description, og:url; no canonical; robots `noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53) | ❌ (og:image only) | ❌ | — | Description short; missing og:title, og:description, og:url; no canonical; robots `noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34) | ❌ (og:image only) | ❌ | — | Description short; missing og:title, og:description, og:url; no canonical; robots `noindex, nofollow` |

## Notes
- Schema (JSON-LD) is required only on `index.html`; it passes. Other pages without it are marked — and not counted as issues.
- `og:url` and canonical values on all pages that have them use the `servicewindow.app` domain; `og:image` is present on all 15 pages.
- Issue count: marketplace 1, auth 3, contact 1, privacy 2, terms 2, success 6, cancel 6, reset-password 6.
- Report only — no HTML files were modified.
