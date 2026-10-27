# SEO & Metadata Audit — 2026-10-27

## Summary
- **Pages audited:** 15 (all present)
- **Total issues found:** 24 (across 10 pages; 5 pages clean: find-trucks, pricing, about, venues, property)
- **Top 3 priority fixes:**
  1. **Add `<link rel="canonical">` to auth, privacy, terms, success, cancel, reset-password** (6 pages missing it).
  2. **Add `og:title`, `og:description`, `og:url` to success, cancel, reset-password** (only `og:image` present); also lengthen their meta descriptions (34–53 chars vs. 120–160 target).
  3. **Lengthen short meta descriptions** on auth (95), contact (98), privacy (116), terms (92); trim marketplace (161) to ≤160. Also fix jobs.html `og:description` saying "21 SWFL cities" (should be 22).
- **Noindex note:** auth, success, cancel, reset-password are `noindex, nofollow`. The audit rule flags this; it is almost certainly intentional for utility/transactional pages, so verify before changing. They are marked ⚠️ rather than ❌.
- **Schema note:** index.html has JSON-LD (`WebSite` only). Consider adding `Organization`/`LocalBusiness` with logo and sameAs.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ⚠️ | og:url `https://servicewindow.app` lacks trailing slash vs canonical `https://servicewindow.app/`; JSON-LD is `WebSite` only (no Organization) |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ✅ n/a | Description too short; no canonical; `noindex, nofollow` (likely intentional) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ✅ n/a | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | `og:description` says "21 SWFL cities" — copy rule is 22 |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ✅ n/a | Description 4 chars short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ✅ n/a | Description too short; no canonical |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | ✅ n/a | Missing og:title/description/url; description too short; no canonical; `noindex, nofollow` (likely intentional) |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | ✅ n/a | Missing og:title/description/url; description too short; no canonical; `noindex, nofollow` (likely intentional) |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | ✅ n/a | Missing og:title/description/url; description too short; no canonical; `noindex, nofollow` (likely intentional) |
