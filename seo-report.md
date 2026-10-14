# SEO Audit Report — 2026-10-14

**Pages audited:** 15 · **Issues found:** 28 · **Pages with no issues:** 6 (find-trucks, pricing, about, jobs, venues, property)

## Top 3 priority fixes
1. **Remove `noindex` from `auth.html`** — it is a production page and the audit rule forbids noindex; also add a canonical and expand the 95-char description. (`success.html`, `cancel.html`, `reset-password.html` are also `noindex, nofollow`; that is likely intentional for transactional pages, so confirm and treat as an exception if so.)
2. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`** (6 pages missing).
3. **Add `og:title`, `og:description`, `og:url` to `success.html`, `cancel.html`, `reset-password.html`** and lengthen their meta descriptions (34–53 chars, target 120–160). Also lengthen short descriptions on `auth` (95), `contact` (98), `terms` (92), `privacy` (116).

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. Schema is only required on `index.html`; ⚠️ on other pages means no JSON-LD (optional).

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | `og:url` (`https://servicewindow.app`) differs from canonical (`https://servicewindow.app/`) |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ⚠️ | Description too short; no canonical; `robots` = `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ⚠️ | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | — |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ❌ (116) | ✅ | ❌ | ⚠️ | Description under 120; no canonical |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ⚠️ | Description too short; no canonical |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ⚠️ | Description too short; missing `og:title`, `og:description`, `og:url` (only `og:image`); no canonical; `noindex, nofollow` |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ⚠️ | Description too short; missing `og:title`, `og:description`, `og:url` (only `og:image`); no canonical; `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ⚠️ | Description too short; missing `og:title`, `og:description`, `og:url` (only `og:image`); no canonical; `noindex, nofollow` |

_Report only — no HTML files were modified. All pages use `https://servicewindow.app/og-image.png` for `og:image`._
