# ServiceWindow — Nightly SEO Audit

**Date:** 2026-08-18
**Scope:** 15 production HTML pages (root-level, static site — no build step)
**Method:** Direct inspection of `<head>` tags per page. Read-only audit — no HTML files were modified.

## Summary

- **Pages audited:** 15
- **Total issues found:** 28
- **Fully clean (all 9 checks pass, no noindex):** 7 of 15 — `index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`

### Top 3 priority fixes

1. **Add `<link rel="canonical">` and JSON-LD schema to `privacy.html` and `terms.html`.** Both are indexed, production-facing legal pages with zero canonical URL and zero structured data — every other content page on the site has both.
2. **Add JSON-LD structured data to `contact.html`.** It's the only indexed content page (of `about`, `pricing`, `jobs`, `venues`, `property`, `contact`) missing a `<script type="application/ld+json">` block.
3. **Trim the meta description on `marketplace.html` to ≤160 characters.** It currently runs 161 characters, the only indexed page over the limit.

Secondary note: `auth.html` carries `noindex, nofollow` plus a missing canonical and missing schema. If deindexing the signup/login page is intentional, no fix is needed there — but confirm that's deliberate rather than an oversight, since it's inconsistent with `success.html`/`cancel.html`/`reset-password.html`, which are also `noindex` but that's clearly correct for post-checkout transactional pages.

Also flagged outside the 9-item metadata checklist: `jobs.html`'s meta/og description text says **"21 SWFL cities"**, but CLAUDE.md fixes the documented city count at **22** — a copy accuracy issue, not a metadata defect, left for the content owner (not fixed here per "report only" scope).

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ WebSite + Organization | og:url has no trailing slash vs. canonical's trailing slash (minor) |
| marketplace.html | ✅ | ⚠️ 161 chars (1 over limit) | ✅ | ✅ | ✅ CollectionPage | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ | ⚠️ 95 chars | ✅ | ❌ absent | ❌ absent | `noindex, nofollow` set; no canonical; no schema; og tags placed at end of `<head>`, separated from primary meta block |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ WebPage | og:title/description split from rest of og block (cosmetic) |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ AboutPage | og:url/image split from og:title/description (cosmetic) |
| contact.html | ✅ | ⚠️ 98 chars | ✅ | ✅ | ❌ absent | Missing structured data — only indexed content page without it |
| jobs.html | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ CollectionPage | Copy says "21 SWFL cities," docs specify 22 (content issue, not metadata) |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ WebPage | None |
| privacy.html | ✅ | ⚠️ 116 chars | ✅ | ❌ absent | ❌ absent | No canonical; no schema |
| terms.html | ✅ | ⚠️ 92 chars | ✅ | ❌ absent | ❌ absent | No canonical; no schema |
| success.html | ✅ | ❌ 48 chars | ❌ og:title/description/url absent | ❌ absent | ❌ absent | `noindex, nofollow` (likely intentional — post-Stripe success page); og/canonical/schema missing |
| cancel.html | ✅ | ❌ 53 chars | ❌ og:title/description/url absent | ❌ absent | ❌ absent | `noindex, nofollow` (likely intentional — post-Stripe cancel page); og/canonical/schema missing |
| reset-password.html | ✅ | ❌ 34 chars | ❌ og:title/description/url absent | ❌ absent | ❌ absent | `noindex, nofollow` (likely intentional — account-flow utility page); og/canonical/schema missing |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail / missing
