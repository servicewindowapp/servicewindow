# SEO & Metadata Audit — 2026-10-16

## Summary

- **Pages audited:** 15 (all present)
- **Total issues found:** 22 across 9 pages (6 pages fully clean: index, find-trucks, pricing, about, venues, property)
- **Legend:** ✅ pass · ❌ fail · ⚠️ present but needs improvement

### Top 3 priority fixes

1. **Missing `<link rel="canonical">` on 6 pages** — auth, privacy, terms, success, cancel, reset-password. (Fastest fix, affects indexable pages privacy/terms most.)
2. **`noindex, nofollow` on 4 pages** — auth, success, cancel, reset-password. Noindex is correct for success/cancel/reset-password (transactional). `auth.html` is the signup/login entry point; confirm noindex is intended. If so, the audit rule should exempt these pages.
3. **Incomplete Open Graph tags on success, cancel, reset-password** (only `og:image` present; `og:title`, `og:description`, `og:url` missing) **and short meta descriptions** (<120 chars) on auth (95), contact (98), privacy (116), terms (92), plus success/cancel/reset-password (34–53).

Other: `marketplace.html` description is 161 chars (1 over). `jobs.html` og:description says "21 SWFL cities"; project rule is 22.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ❌ (not required) | `robots` = noindex, nofollow; no canonical; description too short |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ❌ (not required) | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | og:description says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ (not required) | No canonical; description slightly short |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ❌ (not required) | No canonical; description too short |
| success.html | ✅ | ❌ (48) | ❌ (only og:image) | ❌ | ❌ (not required) | `robots` = noindex, nofollow; missing og:title/description/url; no canonical; description too short |
| cancel.html | ✅ | ❌ (53) | ❌ (only og:image) | ❌ | ❌ (not required) | `robots` = noindex, nofollow; missing og:title/description/url; no canonical; description too short |
| reset-password.html | ✅ | ❌ (34) | ❌ (only og:image) | ❌ | ❌ (not required) | `robots` = noindex, nofollow; missing og:title/description/url; no canonical; description too short |

Notes: Report only — no HTML files were modified. Schema is required only on index.html (present, 1 JSON-LD block). Description lengths are character counts after HTML-entity decoding.
