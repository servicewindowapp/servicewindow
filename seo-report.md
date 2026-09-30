# SEO Audit Report — 2026-09-30

## Summary
- **Pages audited:** 15
- **Total issues found:** 22
- **Schema:** `index.html` has JSON-LD (Organization, WebSite/SearchAction, OfferCatalog). Also present on marketplace, pricing, about, jobs, venues, property, and find-trucks.

### Top 3 priority fixes
1. **Add `<link rel="canonical">` to auth, privacy, terms, success, cancel, reset-password.** Six pages have none. Privacy and terms are indexable, so they matter most.
2. **Add missing OG tags to success, cancel, reset-password.** These pages have only `og:image`, with no `og:title`, `og:description`, or `og:url`.
3. **Fix meta descriptions outside 120–160 characters.**
   - Too short: reset-password (34), success (48), cancel (53), terms (92), auth (95), contact (98), privacy (116).
   - Too long: marketplace (161).

Other notes:
- `jobs.html` `og:description` says "21 SWFL cities". The copy rule is 22.
- `auth`, `success`, `cancel`, and `reset-password` use `noindex, nofollow`. This is likely intentional for transactional pages, but it fails criterion 9 as written, so it is flagged.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ❌ (not required) | Description too short; no canonical; `noindex, nofollow` (likely intentional) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ❌ (not required) | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | `og:description` says "21 cities" (should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ (not required) | Description slightly short; no canonical |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ❌ (not required) | Description too short; no canonical |
| success.html | ✅ | ❌ (48) | ❌ (only og:image) | ❌ | ❌ (not required) | Description too short; missing og:title, og:description, og:url; no canonical; `noindex` (likely intentional) |
| cancel.html | ✅ | ❌ (53) | ❌ (only og:image) | ❌ | ❌ (not required) | Description too short; missing og:title, og:description, og:url; no canonical; `noindex` (likely intentional) |
| reset-password.html | ✅ | ❌ (34) | ❌ (only og:image) | ❌ | ❌ (not required) | Description too short; missing og:title, og:description, og:url; no canonical; `noindex` (likely intentional) |
