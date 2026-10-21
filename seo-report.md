# SEO Audit Report — 2026-10-21

**Scope:** 15 production pages · **Pages audited:** 15 · **Total issues found:** 29 (across 11 pages; 4 pages fully clean)

## Top 3 Priority Fixes
1. **Remove `noindex` from `auth.html`, `success.html`, `cancel.html`, `reset-password.html`** (4 issues). The audit rule says no production page may be noindex. These are likely intentional for transactional pages, so confirm before changing; `auth.html` is the one worth indexing.
2. **Add `<link rel="canonical">` to `auth`, `privacy`, `terms`, `success`, `cancel`, `reset-password`** (6 issues).
3. **Add `og:title`, `og:description`, `og:url` to `success`, `cancel`, `reset-password`** (9 issues), and lengthen meta descriptions that are under 120 characters (`auth` 95, `contact` 98, `privacy` 116, `terms` 92, `success` 48, `cancel` 53, `reset-password` 34).

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. Description target is 120–160 characters. Schema is required on `index.html` only; other pages show what is present. `og:image` is present on all pages (`og-image.png` exists in the repo root).

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | `og:url` is `https://servicewindow.app` with no trailing slash, but canonical is `https://servicewindow.app/` |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description is 1 character over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ✅ none (not required) | Description too short; canonical missing; `robots` = `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ✅ none (not required) | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | `og:description` says "21 SWFL cities"; copy rule is 22 |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ❌ (116) | ✅ | ❌ | ✅ none (not required) | Description 4 characters short; canonical missing |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ✅ none (not required) | Description too short; canonical missing |
| success.html | ⚠️ | ❌ (48) | ❌ (title, description, url missing; image present) | ❌ | ✅ none (not required) | Description too short; OG title/description/url missing; canonical missing; `robots` = `noindex, nofollow` |
| cancel.html | ⚠️ | ❌ (53) | ❌ (title, description, url missing; image present) | ❌ | ✅ none (not required) | Description too short; OG title/description/url missing; canonical missing; `robots` = `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ (title, description, url missing; image present) | ❌ | ✅ none (not required) | Description too short; OG title/description/url missing; canonical missing; `robots` = `noindex, nofollow` |

## Notes
- `index.html` has JSON-LD schema (1 block), so the minimum schema requirement is met.
- `success.html` and `cancel.html` titles ("You're In", "No Problem") are short and not very descriptive, hence ⚠️.
- Report only: no HTML files were modified.
