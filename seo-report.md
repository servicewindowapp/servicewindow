# ServiceWindow — Nightly SEO Audit (2026-11-25)

## Summary

- **Pages audited:** 15
- **Total issues found:** 25 (9 hard failures ❌, 16 warnings ⚠️)
- **Clean pages (no issues):** find-trucks, pricing, about, venues, property

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** These are indexable pages with full OG tags but no canonical, so they're the only indexable pages missing one. (`auth.html` also has none, but it's noindex.)
2. **Fix "21 cities" in structured data and OG copy. The copy rule says 22.** `jobs.html` has it in og:description (line 14) and in the JSON-LD description (line 21). `marketplace.html` has it in the JSON-LD `about.description` (line 38). Outside the meta tags, the body copy in `property.html` (line 288) says it too. Search engines and social shares currently show the wrong count.
3. **Lengthen short meta descriptions on indexable pages to 120–160 chars:** `contact.html` (98), `terms.html` (92) and `privacy.html` (116). `marketplace.html` is 1 char over at 161; trim it.

> Note on noindex: `auth.html`, `success.html`, `cancel.html` and `reset-password.html` are set to `noindex, nofollow`. These are login and Stripe pages, and noindex is probably the right choice for them, so they're marked ⚠️ rather than ❌. Their missing OG tags, canonical and schema are low priority for the same reason. All 11 content pages are indexable.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 | ✅ | ✅ | ✅ WebSite, Organization | ⚠️ og:url `https://servicewindow.app` doesn't match canonical `https://servicewindow.app/` (trailing slash) |
| marketplace.html | ✅ | ⚠️ 161 (1 over) | ✅ | ✅ | ✅ CollectionPage | Description 161 chars; JSON-LD says "21 cities" (should be 22) |
| find-trucks.html | ✅ | ✅ 155 | ✅ | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ | ⚠️ 95 | ✅ | ❌ missing | ⚠️ none | Description too short; no canonical; `noindex, nofollow` (intentional) |
| pricing.html | ✅ | ✅ 134 | ✅ | ✅ | ✅ WebPage | None |
| about.html | ✅ | ✅ 153 | ✅ | ✅ | ✅ AboutPage | None |
| contact.html | ✅ | ⚠️ 98 | ✅ | ✅ | ⚠️ none | Description too short; no schema (ContactPage recommended) |
| jobs.html | ✅ | ✅ 131 | ⚠️ | ✅ | ✅ CollectionPage | og:description and JSON-LD say "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ 145 | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ | ✅ 154 | ✅ | ✅ | ✅ WebPage | None (body copy line 288 says "21 SWFL cities", outside metadata scope) |
| privacy.html | ✅ | ⚠️ 116 | ✅ | ❌ missing | ➖ n/a | Description slightly short; **no canonical** |
| terms.html | ✅ | ⚠️ 92 | ✅ | ❌ missing | ➖ n/a | Description too short; **no canonical** |
| success.html | ✅ | ⚠️ 48 | ❌ og:title/description/url missing (og:image only) | ❌ missing | ➖ n/a | Short description; OG tags incomplete; no canonical; `noindex, nofollow` (intentional) |
| cancel.html | ✅ | ⚠️ 53 | ❌ og:title/description/url missing (og:image only) | ❌ missing | ➖ n/a | Short description; OG tags incomplete; no canonical; `noindex, nofollow` (intentional) |
| reset-password.html | ✅ | ⚠️ 34 | ❌ og:title/description/url missing (og:image only) | ❌ missing | ➖ n/a | Short description; OG tags incomplete; no canonical; `noindex, nofollow` (intentional) |

**Legend:** ✅ pass · ❌ fail · ⚠️ present but needs improvement · ➖ not applicable. Numbers in the Description column are character counts.

### Checks applied

1. `<title>`: present and not blank. All 15 pass.
2. `<meta name="description">`: present and 120–160 characters.
3–6. `og:title`, `og:description`, `og:url`, `og:image`: all present, and every og:url uses `https://servicewindow.app`. Every og:image is `https://servicewindow.app/og-image.png`, and that file exists in the repo root.
7. `<link rel="canonical">`: present and on the `servicewindow.app` domain.
8. JSON-LD schema: required on index.html (passes, with valid JSON), recommended on content pages.
9. `<meta name="robots">`: no indexable content page is set to noindex.

_This audit only reports. No HTML files were changed._
