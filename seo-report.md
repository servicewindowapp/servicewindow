# SEO & Metadata Audit — 2026-10-09

## Summary
- **Pages audited:** 15 (all present)
- **Total issues found:** 23 across 10 pages (5 pages fully clean: find-trucks, pricing, about, venues, property)
- **Top 3 priority fixes:**
  1. **`robots` is `noindex, nofollow` on auth, success, cancel, reset-password.** Likely intentional for utility pages, but it fails the "no noindex on production pages" check. Confirm intent; if intentional, drop these from the audit list.
  2. **Add `<link rel="canonical">` to auth, privacy, terms, success, cancel, reset-password** (6 pages missing).
  3. **Add `og:title` / `og:description` / `og:url` to success, cancel, reset-password** (only `og:image` present), and **lengthen short meta descriptions** on those three plus auth (95), contact (98), privacy (116), terms (92) to 120–160 chars.

Other notes: `index.html` `og:url` (`https://servicewindow.app`) lacks the trailing slash used by its canonical (`https://servicewindow.app/`). `jobs.html` og:description says "21 SWFL cities" — project copy rule is 22. `marketplace.html` description is 161 chars (1 over). Schema is present on index, marketplace, find-trucks, pricing, about, jobs, venues, property; absent (optional) on the rest.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. Description length in parentheses.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ⚠️ | ✅ | og:url lacks trailing slash vs canonical |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95) | ✅ | ❌ | ⚠️ none | Description too short; no canonical; robots noindex, nofollow |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98) | ✅ | ✅ | ⚠️ none | Description too short |
| jobs.html | ✅ | ✅ (131) | ⚠️ | ✅ | ✅ | og:description says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ⚠️ none | Description slightly short; no canonical |
| terms.html | ✅ | ❌ (92) | ✅ | ❌ | ⚠️ none | Description too short; no canonical |
| success.html | ✅ | ❌ (48) | ❌ | ❌ | ⚠️ none | Description too short; og:title/description/url missing; no canonical; robots noindex |
| cancel.html | ✅ | ❌ (53) | ❌ | ❌ | ⚠️ none | Description too short; og:title/description/url missing; no canonical; robots noindex |
| reset-password.html | ✅ | ❌ (34) | ❌ | ❌ | ⚠️ none | Description too short; og:title/description/url missing; no canonical; robots noindex |
