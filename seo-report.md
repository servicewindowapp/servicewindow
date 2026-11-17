# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-17
**Scope:** 15 production HTML pages (report only, no HTML modified)

## Summary

- **Pages audited:** 15
- **Total issues found:** 29 (12 on indexable pages, 17 on utility pages that are intentionally `noindex`)
- **Pages fully clean:** 5 (`find-trucks.html`, `pricing.html`, `about.html`, `venues.html`, `property.html`)

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** These are indexable but have no canonical, so they're the only public, indexable pages in this audit without one.
2. **Lengthen meta descriptions that are under 120 characters on indexable pages:** `contact.html` (98), `privacy.html` (116), `terms.html` (92). `marketplace.html` is 161 characters, 1 over the limit, so trim it slightly.
3. **Fix the city count on `jobs.html`.** The `og:description` (line 14) and the JSON-LD `description` (line 21) both say "21 SWFL cities". The copy rule is 22 cities.

### Notes

- `auth.html`, `success.html`, `cancel.html` and `reset-password.html` set `noindex, nofollow`. Under check #9 that counts as a failure, but on login, password-reset and post-Stripe pages it is almost certainly deliberate. Confirm it is intended, then exclude these pages from the noindex check in later audits. Their missing OG tags and canonicals are low priority for the same reason.
- `index.html`: `og:url` is `https://servicewindow.app` (no trailing slash), while the canonical is `https://servicewindow.app/`. This is a minor mismatch; make them identical.
- Every page uses `https://servicewindow.app/og-image.png` for `og:image` ✅. All `og:url` and canonical values that exist use the servicewindow.app domain ✅.
- Only `index.html` requires schema. It has it: Organization, WebSite + SearchAction, OfferCatalog and areaServed ✅.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement (or optional and missing)

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | og:url has no trailing slash and doesn't match the canonical (`/`) |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description is 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ⚠️ none | Description too short; no canonical; `robots: noindex, nofollow` (likely intentional) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ⚠️ none | Description too short; ContactPage schema optional |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ⚠️ | og:description and JSON-LD say "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ❌ (116) | ✅ | ❌ | ⚠️ none | Description too short; no canonical |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ⚠️ none | Description too short; no canonical |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ⚠️ none | Description too short; no og:title, og:description or og:url (og:image only); no canonical; `noindex` (likely intentional) |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ⚠️ none | Description too short; no og:title, og:description or og:url (og:image only); no canonical; `noindex` (likely intentional) |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ⚠️ none | Description too short; no og:title, og:description or og:url (og:image only); no canonical; `noindex` (likely intentional) |

### Per-check detail

| Check | Pass | Fail |
|-------|------|------|
| 1. `<title>` present and descriptive | 15 | 0 |
| 2. Meta description 120–160 chars | 8 | 7 (+ marketplace at 161) |
| 3. og:title | 12 | 3 (success, cancel, reset-password) |
| 4. og:description | 12 | 3 (success, cancel, reset-password) |
| 5. og:url on servicewindow.app | 12 | 3 (success, cancel, reset-password) |
| 6. og:image | 15 | 0 |
| 7. Canonical on servicewindow.app | 9 | 6 (auth, privacy, terms, success, cancel, reset-password) |
| 8. JSON-LD on index.html | ✅ | — |
| 9. No `noindex` | 11 | 4 (auth, success, cancel, reset-password; likely intentional) |
