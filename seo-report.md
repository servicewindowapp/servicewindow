# SEO Audit Report

_Generated 2026-10-08 — report only, no HTML modified._

## Summary
- **Total pages audited:** 15
- **Total issues found:** 23
- **Top 3 priority fixes:**
  1. **Add canonical links** to auth, privacy, terms, success, cancel, reset-password (6 pages missing `<link rel="canonical">`).
  2. **Add og:title / og:description / og:url** to success.html, cancel.html, reset-password.html (only og:image present).
  3. **Review `noindex, nofollow`** on auth, success, cancel, reset-password. Utility/transactional pages are usually intentionally noindex, but the audit spec flags it; confirm intent. Also fix descriptions outside 120–160 chars (e.g. auth, contact, privacy, terms, success, cancel, reset-password too short; marketplace 161 long).

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ | ✅ | ✅ | ✅ | description length 161 |
| find-trucks.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ | ✅ | ❌ | — | description length 95; missing canonical; robots noindex (noindex, nofollow) |
| pricing.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ | ✅ | ✅ | — | description length 98 |
| jobs.html | ✅ | ✅ | ✅ | ✅ | ✅ | copy: says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| property.html | ⚠️ | ✅ | ✅ | ✅ | ✅ | title length 71 |
| privacy.html | ✅ | ⚠️ | ✅ | ❌ | — | description length 116; missing canonical |
| terms.html | ✅ | ⚠️ | ✅ | ❌ | — | description length 92; missing canonical |
| success.html | ✅ | ⚠️ | ❌ | ❌ | — | description length 48; missing og:title, og:description, og:url; missing canonical; robots noindex (noindex, nofollow) |
| cancel.html | ✅ | ⚠️ | ❌ | ❌ | — | description length 53; missing og:title, og:description, og:url; missing canonical; robots noindex (noindex, nofollow) |
| reset-password.html | ✅ | ⚠️ | ❌ | ❌ | — | description length 34; missing og:title, og:description, og:url; missing canonical; robots noindex (noindex, nofollow) |
