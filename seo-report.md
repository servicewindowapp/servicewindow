# SEO Audit Report — 2026-10-29

## Summary

- **Pages audited:** 15
- **Total issues found:** 21 (across 8 pages; 7 pages are fully clean: index, find-trucks, pricing, about, jobs, venues, property)
- **Schema:** `index.html` has JSON-LD ✅ (minimum requirement met)

### Top 3 priority fixes
1. **Remove `noindex, nofollow` from `auth.html`** (and decide on `success.html`, `cancel.html`, `reset-password.html`). The audit rule is that no production page is noindex. `auth.html` is the main signup entry point and is the most likely to be intentionally indexable; the other three are transactional pages where noindex may be deliberate — confirm and, if so, drop them from the audit list.
2. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`** (6 pages missing).
3. **Add `og:title`, `og:description`, `og:url` to `success.html`, `cancel.html`, `reset-password.html`** (only `og:image` is present), and lengthen the too-short meta descriptions (auth 95, contact 98, privacy 116, terms 92, success 48, cancel 53, reset-password 34 chars; target 120–160). `marketplace.html` is 161 chars — trim by 1.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not applicable

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | — | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | — | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description too short; no canonical; `robots` = noindex, nofollow |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | — | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | — | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | — | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | — | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | — | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | Description too short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | Description too short; no canonical |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; `robots` = noindex, nofollow |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; `robots` = noindex, nofollow |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; `robots` = noindex, nofollow |

## Notes

- All present `og:url`, `og:image`, and canonical values use the `servicewindow.app` domain.
- `index.html` `og:url` is `https://servicewindow.app` while its canonical is `https://servicewindow.app/` (trailing slash) — harmless but inconsistent.
- Several pages (marketplace, find-trucks, pricing, about, jobs, venues, property) carry JSON-LD as well; schema is only required on `index.html`.
- Report only — no HTML files were modified.
