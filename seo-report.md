# SEO Audit Report — 2026-10-19

## Summary
- **Pages audited:** 15
- **Total issues found:** 19 (across 8 pages; 7 pages fully clean)
- **Top 3 priority fixes:**
  1. **Add `og:title`, `og:description`, `og:url` to `success.html`, `cancel.html`, `reset-password.html`** — all three have only `og:image`.
  2. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`.** `privacy.html` and `terms.html` are indexable, so they matter most.
  3. **Review `noindex, nofollow` on `auth.html`, `success.html`, `cancel.html`, `reset-password.html`.** It is probably intentional for the transactional pages, but `auth.html` is a public signup/login page and is excluded from search. Confirm that is what you want. Also lengthen the short meta descriptions (below 120 chars) on these pages and on `contact.html`.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description is 1 char over the 160 limit |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ❌ | Description too short; no canonical; `robots` is `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ❌ | Description too short; no JSON-LD (not required) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ | Description 4 chars short of 120; no canonical |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ❌ | Description too short; no canonical |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ❌ | Description too short; missing og:title/description/url; no canonical; `noindex, nofollow` |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ❌ | Description too short; missing og:title/description/url; no canonical; `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ❌ | Description too short; missing og:title/description/url; no canonical; `noindex, nofollow` |

## Notes
- All present `og:url`, `og:image` and canonical values use the `servicewindow.app` domain.
- JSON-LD is present on `index.html` (the minimum requirement). No `<title>` is blank or a placeholder.
- Issue count by page: marketplace 1, auth 3, contact 1, privacy 1, terms 1, success 4, cancel 4, reset-password 4.
- Report only. No HTML files were modified.
