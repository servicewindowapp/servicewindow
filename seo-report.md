# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-12 · **Branch audited:** `claude/sharp-fermi-viih7j` @ `89d71f1` · **Scope:** report only, no HTML changed

## Summary

- **Pages audited:** 15
- **Issues found:** 29 across 10 pages (5 pages clean: find-trucks, pricing, about, venues, property)
- **Shared OG image:** `og-image.png` exists in repo root and is referenced on all 15 pages ✅

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** These are the only *indexable* pages without a canonical tag. Both pages are fine otherwise. (The 4 noindex pages are also missing canonicals, but that matters less while they stay noindex.)
2. **Fix the "21 SWFL cities" copy in `jobs.html`** (line 14 `og:description` and line 21 JSON-LD `description`). The copy rules say the city count is always **22**. Every social share and every structured-data read of this page currently shows the wrong number.
3. **Lengthen meta descriptions that are under 120 characters** on the indexable pages `contact.html` (98), `terms.html` (92) and `privacy.html` (116). Also trim `marketplace.html` (161) to ≤160. For example, cutting the trailing "ServiceWindow — the SWFL food truck marketplace." clause would fix it.

### Note on `noindex` (check 9)

`auth.html`, `success.html`, `cancel.html` and `reset-password.html` set `<meta name="robots" content="noindex, nofollow">`. Under this audit's rules that fails check 9. However, these are login and post-checkout/transactional pages, and keeping them out of search results is standard practice and almost certainly deliberate. **I recommend leaving the noindex in place** and removing these four pages from the "must be indexable" list in future audits. They are counted as issues below only to follow the audit rules.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. Schema is only required on `index.html`; on other pages, missing schema is marked ⚠️ (optional) and **is not counted** as an issue.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ⚠️ | ✅ | ✅ WebSite, Organization | `og:url` is `https://servicewindow.app` (no trailing slash) but canonical is `https://servicewindow.app/`. Use the same URL in both |
| marketplace.html | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ CollectionPage | Meta description is 1 char over the 160 limit |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ CollectionPage | — |
| auth.html | ✅ | ⚠️ 95 chars | ✅ | ❌ | ⚠️ none (optional) | Description is under 120; no canonical; `noindex, nofollow` (likely intentional, see note) |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ WebPage | — |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ AboutPage | — |
| contact.html | ✅ | ⚠️ 98 chars | ✅ | ✅ | ⚠️ none (optional) | Description is under 120 |
| jobs.html | ✅ | ✅ 131 chars | ⚠️ | ✅ | ⚠️ CollectionPage | `og:description` and JSON-LD `description` say "21 SWFL cities"; the copy rule says 22 |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ WebPage | — |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ WebPage | — |
| privacy.html | ✅ | ⚠️ 116 chars | ✅ | ❌ | ⚠️ none (optional) | No canonical; description is 4 chars under 120 |
| terms.html | ✅ | ⚠️ 92 chars | ✅ | ❌ | ⚠️ none (optional) | No canonical; description is under 120 |
| success.html | ✅ | ⚠️ 48 chars | ❌ only og:image | ❌ | ⚠️ none (optional) | Missing `og:title`, `og:description`, `og:url`; no canonical; description is under 120; `noindex, nofollow` (intentional) |
| cancel.html | ✅ | ⚠️ 53 chars | ❌ only og:image | ❌ | ⚠️ none (optional) | Missing `og:title`, `og:description`, `og:url`; no canonical; description is under 120; `noindex, nofollow` (intentional) |
| reset-password.html | ✅ | ⚠️ 34 chars | ❌ only og:image | ❌ | ⚠️ none (optional) | Missing `og:title`, `og:description`, `og:url`; no canonical; description is under 120; `noindex, nofollow` (intentional) |

## Issue count by page

| Page | Issues |
|------|--------|
| index.html | 1 |
| marketplace.html | 1 |
| auth.html | 3 |
| contact.html | 1 |
| jobs.html | 1 |
| privacy.html | 2 |
| terms.html | 2 |
| success.html | 6 |
| cancel.html | 6 |
| reset-password.html | 6 |
| **Total** | **29** |

## Checks that passed everywhere

- All 15 pages have a descriptive `<title>` with no blanks or placeholders.
- Every `og:url` and canonical tag that exists uses the `https://servicewindow.app` domain.
- All JSON-LD blocks that exist parse as valid JSON.
- No page that should be indexed has `noindex`.
