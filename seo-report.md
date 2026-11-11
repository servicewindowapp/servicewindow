# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-11
**Scope:** 15 production HTML pages (report only — no HTML changed)

## Summary

- **Pages audited:** 15
- **Total issues found:** 29 across 9 pages (6 pages fully clean). 12 of the 29 are on the 3 noindex utility pages.
- **Clean pages:** find-trucks.html, pricing.html, about.html, jobs.html, venues.html, property.html. index.html has only a minor og:url/canonical mismatch.

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to privacy.html and terms.html.** Both are indexable pages with no canonical. auth.html, success.html, cancel.html and reset-password.html also lack one, but they are `noindex`, so it matters less there.
2. **Lengthen short meta descriptions on indexable pages to 120–160 chars:** contact.html (98), terms.html (92), privacy.html (116). Also trim marketplace.html (161) by 1 character.
3. **Fill in the missing OG tags on success.html, cancel.html and reset-password.html.** They have `og:image` but no `og:title`, `og:description` or `og:url`, so link previews are broken when these URLs are shared. Their descriptions (34–53 chars) are also short. They are `noindex`, so this only affects link sharing.

### Note on `noindex`

auth.html, success.html, cancel.html and reset-password.html use `<meta name="robots" content="noindex, nofollow">`. Check 9 flags these as failures, but noindex is the correct setting for login, post-checkout and password-reset pages. **Recommendation: keep it.** They're marked ⚠️ below, not ❌. If this is intended, consider removing them from the audit list or allowlisting them.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 | ⚠️ | ✅ | ✅ | `og:url` is `https://servicewindow.app` but canonical is `https://servicewindow.app/` (trailing slash mismatch) |
| marketplace.html | ✅ | ⚠️ 161 | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ 155 | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ⚠️ 95 | ✅ | ❌ | — | Description short (95); no canonical; robots `noindex, nofollow` (intentional) |
| pricing.html | ✅ | ✅ 134 | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ 153 | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ⚠️ 98 | ✅ | ✅ | — | Description short (98); no JSON-LD (optional) |
| jobs.html | ✅ | ✅ 131 | ✅ | ✅ | ✅ | — |
| venues.html | ✅ | ✅ 145 | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ 154 | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ⚠️ 116 | ✅ | ❌ | — | Description short (116); **no canonical on an indexable page** |
| terms.html | ✅ | ⚠️ 92 | ✅ | ❌ | — | Description short (92); **no canonical on an indexable page** |
| success.html | ✅ | ⚠️ 48 | ❌ | ❌ | — | Description short (48); missing og:title, og:description, og:url (og:image present); no canonical; robots `noindex, nofollow` (intentional) |
| cancel.html | ✅ | ⚠️ 53 | ❌ | ❌ | — | Description short (53); missing og:title, og:description, og:url (og:image present); no canonical; robots `noindex, nofollow` (intentional) |
| reset-password.html | ✅ | ⚠️ 34 | ❌ | ❌ | — | Description short (34); missing og:title, og:description, og:url (og:image present); no canonical; robots `noindex, nofollow` (intentional) |

**Legend:** ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required (schema is only required on index.html)
Numbers in the Description column are character counts (target 120–160).
OG Tags = og:title + og:description + og:url (servicewindow.app domain) + og:image. Every page that has og:url uses the servicewindow.app domain, and every canonical present uses it too.

## Issue count by page

| Page | Issues |
|------|--------|
| index.html | 1 |
| marketplace.html | 1 |
| auth.html | 3 |
| contact.html | 2 |
| privacy.html | 2 |
| terms.html | 2 |
| success.html | 6 |
| cancel.html | 6 |
| reset-password.html | 6 |
| find-trucks, pricing, about, jobs, venues, property | 0 |
| **Total** | **29** |
