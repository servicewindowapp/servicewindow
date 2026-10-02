# SEO Audit Report

_Audited 2026-10-02 · report only, no HTML modified_

## Summary
- **Total pages audited:** 15
- **Total issues found:** 23
- **Top 3 priority fixes:**
  1. **Add `<link rel="canonical">`** to auth, privacy, terms, success, cancel, reset-password (6 pages missing).
  2. **Add og:title / og:description / og:url** to success, cancel, reset-password (og:image present only). Also decide on `noindex`: auth, success, cancel, reset-password are `noindex, nofollow` — appropriate for transactional pages, but the audit rule flags noindex on production pages; confirm intent (auth.html is the signup entry point).
  3. **Meta descriptions outside 120-160 chars** on 8 pages (see Issues) and **jobs.html og:description says 21 cities** (should be 22). Contact/legal/transactional pages have no JSON-LD (only index.html required; index passes).

Legend: ✅ pass · ❌ fail · ⚠️ needs improvement · — not required

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ | ✅ | ✅ | ✅ | og:url lacks trailing slash vs canonical |
| marketplace.html | ✅ | ⚠️ | ✅ | ✅ | ✅ | description 161 chars (target 120-160) |
| find-trucks.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ⚠️ | ✅ | ❌ | — | description 95 chars (target 120-160); missing canonical; robots=noindex, nofollow (noindex on listed page) |
| pricing.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ⚠️ | ✅ | ✅ | — | description 98 chars (target 120-160) |
| jobs.html | ✅ | ✅ | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ | ✅ | ❌ | — | description 116 chars (target 120-160); missing canonical |
| terms.html | ✅ | ⚠️ | ✅ | ❌ | — | description 92 chars (target 120-160); missing canonical |
| success.html | ✅ | ⚠️ | ❌ | ❌ | — | description 48 chars (target 120-160); missing og:title, og:description, og:url; missing canonical; robots=noindex, nofollow (noindex on listed page) |
| cancel.html | ✅ | ⚠️ | ❌ | ❌ | — | description 53 chars (target 120-160); missing og:title, og:description, og:url; missing canonical; robots=noindex, nofollow (noindex on listed page) |
| reset-password.html | ✅ | ⚠️ | ❌ | ❌ | — | description 34 chars (target 120-160); missing og:title, og:description, og:url; missing canonical; robots=noindex, nofollow (noindex on listed page) |
