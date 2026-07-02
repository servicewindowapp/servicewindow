# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-02
**Pages audited:** 15
**Total issues found:** 24 (across 8 of 15 pages)

## Top 3 Priority Fixes

1. **Missing canonical tags on 5 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` have no `<link rel="canonical">`. Legal pages (`privacy.html`, `terms.html`) are indexable and public — this is the highest-impact gap since it creates duplicate-content risk with no canonical signal.
2. **Meta descriptions outside the 120–160 char range on 7 pages** — `auth.html` (95), `contact.html` (98), `terms.html` (92), `success.html` (48), `cancel.html` (53), `reset-password.html` (34) are too short; `marketplace.html` (161) is one character over. Rewrite the short ones to use the full snippet width for CTR; trim `marketplace.html` by one character.
3. **No schema markup on `auth.html`, `contact.html`, `privacy.html`, `terms.html`** — these four pages have zero `<script type="application/ld+json">` blocks, missing an opportunity for rich results (e.g. `ContactPage`, `WebPage`).

Secondary note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are set to `noindex, nofollow`. This is standard practice for post-auth/post-checkout utility pages and is not flagged as a defect, but is called out per audit item 9 since these pages are on the production list.

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ (WebSite + Organization) | None |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ (CollectionPage) | Description 1 char over 160-char limit |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95 chars, too short) | ✅ | ❌ Missing | ❌ Missing | Description too short; no canonical; no schema; `robots: noindex` (intentional but flagged) |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98 chars, too short) | ✅ | ✅ | ❌ Missing | Description too short; no schema markup |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars, slightly short) | ✅ | ❌ Missing | ❌ Missing | No canonical; no schema; description slightly under 120-char min |
| terms.html | ✅ | ❌ (92 chars, too short) | ✅ | ❌ Missing | ❌ Missing | No canonical; no schema; description too short |
| success.html | ✅ | ❌ (48 chars, too short) | ⚠️ Incomplete (og:image only) | ❌ Missing | ❌ Missing | OG title/description/url missing; no canonical; no schema; `robots: noindex` (intentional) |
| cancel.html | ✅ | ❌ (53 chars, too short) | ⚠️ Incomplete (og:image only) | ❌ Missing | ❌ Missing | OG title/description/url missing; no canonical; no schema; `robots: noindex` (intentional) |
| reset-password.html | ✅ | ❌ (34 chars, too short) | ⚠️ Incomplete (og:image only) | ❌ Missing | ❌ Missing | OG title/description/url missing; no canonical; no schema; `robots: noindex` (intentional) |

## Notes
- All 15 pages have a present, descriptive `<title>` tag — no failures on that check.
- `index.html` schema markup includes `WebSite` and `Organization` types with `hasOfferCatalog` — the only page carrying full structured data depth; this satisfies the minimum requirement (schema present on `index.html`).
- No production page uses `noindex` unintentionally — the 4 flagged pages (`auth.html`, `success.html`, `cancel.html`, `reset-password.html`) are auth/post-transaction utility pages where `noindex` is standard practice, not a bug.
- Report-only audit — no HTML files were modified.
