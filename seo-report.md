# SEO Audit Report — 2026-10-12

## Summary
- **Pages audited:** 15
- **Total issues found:** 24
- **Top 3 priority fixes:**
  1. **Add `<link rel="canonical">`** to privacy.html, terms.html, auth.html, success.html, cancel.html, reset-password.html (all missing).
  2. **Add og:title / og:description / og:url** to success.html, cancel.html, reset-password.html (only og:image present).
  3. **Review `noindex` on auth, success, cancel, reset-password**: these are flagged per audit rule 9; noindex is likely intentional for transactional pages, but auth.html is a signup entry point worth indexing. Also fix jobs.html og:description ("21 cities", should be 22).

Legend: ✅ pass · ❌ fail · ⚠️ needs improvement · ➖ not required (schema only required on index.html). Report only; no HTML modified.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ | ✅ | ✅ | ✅ | og:url lacks trailing slash vs canonical |
| marketplace.html | ✅ | ⚠️ | ✅ | ✅ | ✅ | description 161 chars (target 120-160) |
| find-trucks.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ | ✅ | ❌ | ➖ | description 95 chars (target 120-160); missing canonical; robots=noindex, nofollow |
| pricing.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ | ✅ | ✅ | ➖ | description 98 chars (target 120-160) |
| jobs.html | ✅ | ✅ | ✅ | ✅ | ✅ | og:description says 21 cities (rule: 22) |
| venues.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| property.html | ⚠️ | ✅ | ✅ | ✅ | ✅ | title >65 chars |
| privacy.html | ✅ | ⚠️ | ✅ | ❌ | ➖ | description 116 chars (target 120-160); missing canonical |
| terms.html | ✅ | ⚠️ | ✅ | ❌ | ➖ | description 92 chars (target 120-160); missing canonical |
| success.html | ✅ | ⚠️ | ❌ | ❌ | ➖ | description 48 chars (target 120-160); missing og:title, og:description, og:url; missing canonical; robots=noindex, nofollow |
| cancel.html | ✅ | ⚠️ | ❌ | ❌ | ➖ | description 53 chars (target 120-160); missing og:title, og:description, og:url; missing canonical; robots=noindex, nofollow |
| reset-password.html | ✅ | ⚠️ | ❌ | ❌ | ➖ | description 34 chars (target 120-160); missing og:title, og:description, og:url; missing canonical; robots=noindex, nofollow |
