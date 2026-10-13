# SEO Audit Report — 2026-10-13

## Summary
- **Pages audited:** 15
- **Total issues found:** 29 (across 9 pages; 6 pages fully clean or only minor)
- **Pages with no issues:** find-trucks, pricing, about, jobs, venues, property

### Top 3 priority fixes
1. **success.html, cancel.html, reset-password.html** — missing `og:title`, `og:description`, `og:url`, and `<link rel="canonical">`; meta descriptions are 3 / 53 / 34 chars (target 120–160). These three also carry `noindex, nofollow` (likely intentional for transactional pages — confirm; the audit rule says no production page should be noindex).
2. **auth.html** — `noindex, nofollow` (blocks the signup/login page from search), no canonical, and a 95-char description.
3. **privacy.html, terms.html, contact.html** — no canonical link; descriptions are short (116 / 92 / 98 chars). contact.html also has no schema markup.

Also minor: marketplace.html description is 161 chars (1 over); index.html `og:url` lacks trailing slash vs. canonical `https://servicewindow.app/`.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required for this page

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | `og:url` is `https://servicewindow.app` (no trailing slash) but canonical has one |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description too short; no canonical; `robots` = `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (143) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description too short; no JSON-LD (not required) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | Description slightly short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | Description too short; no canonical |
| success.html | ✅ | ❌ (3) | ❌ | ❌ | — | Description is 3 chars; missing `og:title`, `og:description`, `og:url`; no canonical; `noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | — | Description too short; missing `og:title`, `og:description`, `og:url`; no canonical; `noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | — | Description too short; missing `og:title`, `og:description`, `og:url`; no canonical; `noindex, nofollow` |

`og:image` is present on all 15 pages (`https://servicewindow.app/og-image.png`). All present `og:url` / canonical values use the servicewindow.app domain.

_Report only — no HTML files were modified._
