# ServiceWindow SEO Audit — 2026-10-23

## Summary

- **Pages audited:** 15
- **Total issues found:** 28 (across 10 pages; 5 pages fully clean)
- **Report only** — no HTML files were modified.

### Top 3 priority fixes

1. **`robots` set to `noindex, nofollow` on `auth.html`, `success.html`, `cancel.html`, `reset-password.html`.** The checklist requires no production page be noindex. The three post-action/reset pages are likely intentional. `auth.html` is the main signup/login entry point, so confirm that noindex is deliberate. If it is, drop these pages from the audit list.
2. **`privacy.html` and `terms.html` have no `<link rel="canonical">`.** They are indexable, so they are the only real canonical gaps. `auth.html` and the three noindex pages also lack one.
3. **Meta descriptions outside 120–160 characters.** Too short: `contact.html` (98), `auth.html` (95), `terms.html` (92), `privacy.html` (116), plus `success.html`, `cancel.html`, `reset-password.html`. Too long: `marketplace.html` (161). `success.html`, `cancel.html` and `reset-password.html` also lack `og:title`, `og:description` and `og:url`.

Other observations (not counted above):
- `jobs.html` og:description says "21 SWFL cities". The project copy rule is always 22.
- `index.html` has `og:url` = `https://servicewindow.app` (no trailing slash) but canonical = `https://servicewindow.app/`.
- Schema is required on `index.html` only, and it is present. Pages without schema (`auth`, `contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) are marked ❌ for information only and are not counted as issues.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ | `og:url` lacks trailing slash and differs from canonical (1) |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 (1) |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ❌ | Description too short; no canonical; `robots` = noindex, nofollow (3) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ❌ | Description too short (1) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None (copy note: "21 cities" should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ | Description slightly short; no canonical (2) |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ❌ | Description too short; no canonical (2) |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ❌ | Description too short; missing `og:title`, `og:description`, `og:url`; no canonical; `robots` = noindex, nofollow (6) |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ❌ | Description too short; missing `og:title`, `og:description`, `og:url`; no canonical; `robots` = noindex, nofollow (6) |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ❌ | Description too short; missing `og:title`, `og:description`, `og:url`; no canonical; `robots` = noindex, nofollow (6) |

`og:image` is present on all 15 pages (`https://servicewindow.app/og-image.png`). All `og:url` and canonical values that exist use the `servicewindow.app` domain.
