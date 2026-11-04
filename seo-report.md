# SEO Audit Report — 2026-11-04

**Pages audited:** 15 · **Issues found:** 23 (of which 4 are `noindex` flags that are probably intentional)

## Top 3 priority fixes
1. **Add `<link rel="canonical">` to 6 pages** — auth, privacy, terms, success, cancel, reset-password. Privacy and terms are indexable, so they matter most.
2. **Add `og:title`, `og:description` and `og:url` to success, cancel and reset-password.** Only `og:image` exists on these pages.
3. **Review `noindex, nofollow` on auth, success, cancel and reset-password.** It is correct for the post-checkout and reset pages. `auth.html` is the sign-up entry point and is linked from everywhere, so decide whether it should be indexable. Also lengthen the short meta descriptions (below 120 characters) on 9 pages.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | `og:url` has no trailing slash (`https://servicewindow.app`) but canonical does (`https://servicewindow.app/`) |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 character over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description too short; no canonical; `robots` is `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | `og:description` says "21 SWFL cities". The copy rule says 22. |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | Description too short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | Description too short; no canonical |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | — | No `og:title`, `og:description` or `og:url`; no canonical; description too short; `robots` is `noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | — | No `og:title`, `og:description` or `og:url`; no canonical; description too short; `robots` is `noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | — | No `og:title`, `og:description` or `og:url`; no canonical; description too short; `robots` is `noindex, nofollow` |

Notes:
- Schema is only required on `index.html`. It is present, with WebSite, Organization and SearchAction types.
- All `og:image` tags are present and use servicewindow.app.
- Report only. No HTML files were modified.
