# SEO Audit Report — 2026-11-06

**Pages audited:** 15 · **Total issues found:** 27

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not applicable (schema is only required on index.html)

## Top 3 Priority Fixes

1. **success.html, cancel.html, reset-password.html — missing `og:title`, `og:description`, `og:url`, and canonical link; descriptions are 34–53 chars.** These three pages account for 18 of 27 issues. They are transactional and `noindex`, so the practical SEO impact is low, but they fail the checklist as written.
2. **`noindex, nofollow` on auth.html, success.html, cancel.html, reset-password.html.** The checklist says no production page should be `noindex`. For login, post-checkout and password-reset pages this is normally intentional and recommended; decide whether to exempt them from this check. auth.html is the one most likely to be worth indexing (it is a public entry point), and it also lacks a canonical.
3. **Missing `<link rel="canonical">` on auth.html, privacy.html, terms.html** (plus the three transactional pages above). Add `https://servicewindow.app/<page>.html`. Also lengthen the short meta descriptions on auth (95), contact (98), privacy (116), and terms (92) to 120–160 chars, and trim marketplace (161) by 1+ char.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description too short; no canonical; `robots` = noindex, nofollow |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | Description too short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | Description too short; no canonical |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; `robots` = noindex, nofollow |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; `robots` = noindex, nofollow |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; `robots` = noindex, nofollow |

## Notes

- index.html has JSON-LD schema (requirement met). Every other page with schema is a bonus.
- All present `og:url`, `og:image`, and canonical values use the `servicewindow.app` domain.
- index.html `og:url` is `https://servicewindow.app` (no trailing slash) while its canonical is `https://servicewindow.app/`; consider aligning them.
- Report only: no HTML files were modified.
