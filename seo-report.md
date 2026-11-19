# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-19
**Scope:** 15 production HTML pages (report only — no HTML modified)

## Summary

- **Pages audited:** 15
- **Total issues found:** 23 (14 ❌ fail · 9 ⚠️ needs improvement)
- **Clean pages (no issues):** find-trucks.html, pricing.html, about.html, venues.html, property.html

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** Both are indexable (no `noindex`) yet have no canonical URL. Add `https://servicewindow.app/privacy.html` and `https://servicewindow.app/terms.html`.
2. **Lengthen short meta descriptions on indexable pages to 120–160 chars:** `contact.html` (98), `terms.html` (92), `privacy.html` (116). These pages show up in search, so short snippets matter there.
3. **Fix the city count in `jobs.html`.** `og:description` (line 14) and the JSON-LD `description` (line 21) both say "21 SWFL cities". The copy rule says 22.

**Intentional noindex, not a defect:** `auth.html`, `success.html`, `cancel.html` and `reset-password.html` set `robots: noindex, nofollow`. These are utility and transaction pages, so keeping them out of search is right. They're marked ⚠️ below for visibility only, and their missing canonical, OG and description items are low priority.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ⚠️ | ✅ | ✅ | `og:url` is `https://servicewindow.app` and the canonical is `https://servicewindow.app/`; the trailing slash should match |
| marketplace.html | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ | Description is 1 char over the 160 limit |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ 95 chars | ✅ | ❌ | — | Description too short; no canonical; `noindex, nofollow` (⚠️ intentional) |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ 98 chars | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ 131 chars | ⚠️ | ✅ | ⚠️ | og:description and JSON-LD say "21 SWFL cities"; should be 22 |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ 116 chars | ✅ | ❌ | — | No canonical; description 4 chars under 120 |
| terms.html | ✅ | ❌ 92 chars | ✅ | ❌ | — | No canonical; description too short |
| success.html | ✅ | ❌ 48 chars | ❌ | ❌ | — | Missing og:title, og:description and og:url (og:image present); no canonical; `noindex, nofollow` (⚠️ intentional) |
| cancel.html | ✅ | ❌ 53 chars | ❌ | ❌ | — | Missing og:title, og:description and og:url (og:image present); no canonical; `noindex, nofollow` (⚠️ intentional) |
| reset-password.html | ✅ | ❌ 34 chars | ❌ | ❌ | — | Missing og:title, og:description and og:url (og:image present); no canonical; `noindex, nofollow` (⚠️ intentional) |

**Legend:** ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required (JSON-LD schema is only required on index.html)

## Notes

- **Titles:** all 15 are present and descriptive, with no blanks or placeholders.
- **OG domain:** every `og:url` and `og:image` present uses `https://servicewindow.app`.
- **Canonical domain:** every canonical present uses `https://servicewindow.app`.
- **Schema:** index.html has 1 JSON-LD block. marketplace.html and find-trucks.html have 2 each. pricing, about, jobs, venues and property have 1 each.
- **Robots:** no indexable marketing page sets `noindex`. Only the four utility pages listed above do.
