# SEO Audit Report

_Run: 2026-10-30 (nightly, report only — no HTML modified)_

## Summary
- **Pages audited:** 15
- **Total issues found:** 22
- **Top 3 priority fixes:**
  1. **Add `<link rel="canonical">` to `auth`, `privacy`, `terms`, `success`, `cancel`, `reset-password`** (6 pages; auth/success/cancel/reset-password are noindex, so `privacy` and `terms` are the indexable ones that matter most).
  2. **Add og:title / og:description / og:url to `success`, `cancel`, `reset-password`** — only og:image is set, so social shares render poorly.
  3. **Review noindex on `auth`, `success`, `cancel`, `reset-password`** — flagged per audit rule 9; probably intentional for utility pages, but `auth.html` is a primary signup entry point, so confirm. Also fix "21 SWFL cities" in `jobs.html` og:description (should be 22) and any description length misses.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ | ✅ | ✅ | ✅ | description 161 chars (target 120-160) |
| find-trucks.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ | ✅ | ❌ | — | description 95 chars (target 120-160); canonical missing; robots noindex (likely intentional for utility page) |
| pricing.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ | ✅ | ✅ | — | description 98 chars (target 120-160) |
| jobs.html | ✅ | ✅ | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ | ✅ | ❌ | — | description 116 chars (target 120-160); canonical missing |
| terms.html | ✅ | ⚠️ | ✅ | ❌ | — | description 92 chars (target 120-160); canonical missing |
| success.html | ✅ | ⚠️ | ❌ | ❌ | — | description 48 chars (target 120-160); missing og:title, og:description, og:url; canonical missing; robots noindex (likely intentional for utility page) |
| cancel.html | ✅ | ⚠️ | ❌ | ❌ | — | description 53 chars (target 120-160); missing og:title, og:description, og:url; canonical missing; robots noindex (likely intentional for utility page) |
| reset-password.html | ✅ | ⚠️ | ❌ | ❌ | — | description 34 chars (target 120-160); missing og:title, og:description, og:url; canonical missing; robots noindex (likely intentional for utility page) |
