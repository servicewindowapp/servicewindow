# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-03
**Pages audited:** 15 production HTML pages (public-facing + auth/utility)
**Scope:** Code-level metadata only — title, meta description, Open Graph, canonical, JSON-LD schema, robots. No content strategy or keyword research. No HTML files were modified — this is a report only.

Legend: ✅ pass · ⚠️ present but needs improvement · ❌ fail / missing

---

## Summary

- **Total pages audited:** 15
- **Total issues found:** 21 hard failures (❌) + 6 items flagged for review (⚠️)
- **Pages fully clean:** 8 of 15 (`index`, `find-trucks`, `pricing`, `about`, `jobs`, `venues`, `property`, plus `marketplace` with one minor note)

### Top 3 priority fixes

1. **Missing `<link rel="canonical">`** on 6 of 15 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Canonical tags prevent duplicate-content ambiguity and are missing on over a third of the site.
2. **Meta descriptions under the 120-character floor** on 7 pages — `auth.html` (97), `contact.html` (100), `privacy.html` (118), `terms.html` (94), `success.html` (48), `cancel.html` (53), `reset-password.html` (34). Several are placeholder-short one-liners that won't fill a search snippet.
3. **Missing Open Graph tags** (`og:title`, `og:description`, `og:url`) on the three post-auth utility pages — `success.html`, `cancel.html`, `reset-password.html`. Only `og:image` is present on these; shared links will render with no title/description.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (163) | ✅ | ✅ | ✅ | Description 3 chars over 160 max |
| `find-trucks.html` | ✅ | ✅ (157) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ❌ (97) | ✅ | ❌ | — | No canonical tag; description under 120 chars; `robots: noindex, nofollow` present — confirm intentional for signup/login flow |
| `pricing.html` | ✅ | ✅ (136) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ❌ (100) | ✅ | ✅ | — | Description under 120 chars; no JSON-LD schema (not required, but every other content page has one) |
| `jobs.html` | ✅ | ✅ (133) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (147) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (156) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (118) | ✅ | ❌ | — | No canonical tag; description 2 chars short of 120 floor |
| `terms.html` | ✅ | ❌ (94) | ✅ | ❌ | — | No canonical tag; description under 120 chars |
| `success.html` | ✅ | ❌ (48) | ❌ | ❌ | — | Missing og:title/og:description/og:url (only og:image present); no canonical; description far under 120 chars; `robots: noindex, nofollow` present — likely intentional (post-checkout page) |
| `cancel.html` | ✅ | ❌ (53) | ❌ | ❌ | — | Missing og:title/og:description/og:url; no canonical; description far under 120 chars; `robots: noindex, nofollow` present — likely intentional (post-checkout page) |
| `reset-password.html` | ✅ | ❌ (34) | ❌ | ❌ | — | Missing og:title/og:description/og:url; no canonical; description far under 120 chars; `robots: noindex, nofollow` present — likely intentional (auth utility page) |

---

## Detail Notes

**Titles:** All 15 pages have a present, descriptive `<title>` — no blanks or placeholders found.

**Open Graph URLs:** Every `og:url` present across the site correctly uses the `servicewindow.app` domain. No mismatches found.

**Canonical URLs:** Every `og:url`/canonical pair that exists correctly uses `https://servicewindow.app/...` — the issue is absence, not incorrect domain, on the 6 pages listed above.

**Schema markup:** `index.html` carries both `WebSite` and `Organization` JSON-LD — the minimum bar from the checklist is met. `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` all additionally carry page-appropriate schema (`CollectionPage`, `WebPage`, `AboutPage`, `Service`, etc.). `contact.html`, `privacy.html`, `terms.html`, `auth.html`, and the three post-auth utility pages have no JSON-LD — not a checklist requirement beyond the index page, but worth considering for `contact.html` given its role as a primary nav page.

**Robots / noindex:** Four pages carry `<meta name="robots" content="noindex, nofollow">`: `auth.html`, `success.html`, `cancel.html`, `reset-password.html`. All four are transactional/utility pages (signup-login, Stripe success/cancel redirects, password reset) where noindexing is standard practice and very likely intentional rather than a defect — flagged per the checklist's literal criterion, not treated as a priority fix.

---

*Automated nightly SEO audit — report only, no HTML files were modified.*
