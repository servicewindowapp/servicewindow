# ServiceWindow SEO Audit — 2026-10-22

## Summary
- **Pages audited:** 15
- **Total issues found:** 23
- **Schema:** `index.html` has JSON-LD (WebSite, Organization, SearchAction) ✅. All other pages are not required to have it.
- **og:image:** present on all 15 pages; `og-image.png` exists in the repo root.

### Top 3 priority fixes
1. **`success.html`, `cancel.html`, `reset-password.html`:** add `og:title`, `og:description`, `og:url` and a canonical, and lengthen the 34–53 character descriptions to 120–160. These pages are `noindex, nofollow`, so this is low urgency unless you want them indexed. If the `noindex` is intentional, the audit rule should exempt them.
2. **`auth.html`, `privacy.html`, `terms.html`:** add `<link rel="canonical">`. Lengthen the descriptions (95, 116 and 92 characters, under the 120 minimum). `auth.html` is also `noindex, nofollow`, which is probably intentional for a login page.
3. **`jobs.html`:** `og:description` says "21 SWFL cities". The project copy rule is always 22. Also trim the `marketplace.html` description (161 characters, 1 over) and lengthen the `contact.html` description (98 characters).

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. Description length is in parentheses.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | `og:url` is `https://servicewindow.app` (no trailing slash) but the canonical is `https://servicewindow.app/` |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description is 1 character over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ❌ | Description under 120; no canonical; `robots` is `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ❌ | Description under 120 (no schema, not required) |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | `og:description` says "21 SWFL cities"; the copy rule is 22 |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ❌ (116) | ✅ | ❌ | ❌ | Description under 120; no canonical (no schema, not required) |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ❌ | Description under 120; no canonical (no schema, not required) |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ❌ | Description under 120; `og:title`, `og:description` and `og:url` missing; no canonical; `noindex, nofollow` |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ❌ | Description under 120; `og:title`, `og:description` and `og:url` missing; no canonical; `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ❌ | Description under 120; `og:title`, `og:description` and `og:url` missing; no canonical; `noindex, nofollow` |

## Notes
- Four pages set `robots` to `noindex, nofollow`: auth, success, cancel and reset-password. Under check 9 these are failures. They are transactional or auth pages, so this is likely deliberate.
- Schema is only required on `index.html`. The ❌ in the Schema column for other pages just means none is present.
- `&amp;` in the `marketplace.html` and `property.html` titles is valid HTML escaping.
- This audit is report-only. No HTML files were modified.
