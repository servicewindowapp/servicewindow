# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-19
**Pages audited:** 15
**Scope:** `<title>`, meta description, Open Graph tags, canonical URL, JSON-LD schema, robots meta

## Summary

- **Total pages audited:** 15
- **Total checklist-item issues found:** 31 (across 8 pages with at least one issue; 7 pages fully clean)
- **Pages with zero issues:** index.html, find-trucks.html, pricing.html, about.html, jobs.html, venues.html, property.html

### Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Every other production page has one; these are the gap. Highest priority since it's a one-line fix with direct duplicate-content/indexing impact.
2. **Meta description length outside the 120–160 char target on 8 pages** — `marketplace.html` (163, slightly over), `auth.html` (97), `contact.html` (100), `privacy.html` (118), `terms.html` (94), `success.html` (48), `cancel.html` (53), `reset-password.html` (34). The three transactional pages (success/cancel/reset-password) are the most undersized — even a boilerplate one-sentence rewrite would fix them.
3. **Open Graph tags incomplete on transactional pages** — `success.html`, `cancel.html`, `reset-password.html` each have only `og:image`; `og:title`, `og:description`, and `og:url` are all missing. Low real-world impact (these pages aren't meant to be shared) but inconsistent with the rest of the site.

**Note on `robots noindex`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. Per the audit checklist this is flagged as a fail on every "production page" in scope, but for these four pages (login/signup and post-Stripe redirect/reset flows) noindexing is very likely intentional — flagging for confirmation, not proposing a change.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ 163 chars (3 over limit) | ✅ | ✅ | ✅ | Description slightly over 160 chars |
| find-trucks.html | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ 97 chars (too short) | ✅ | ❌ Missing | ⚠️ Missing | Description too short; missing canonical; missing schema; `robots: noindex` present (likely intentional for auth page — confirm) |
| pricing.html | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ 100 chars (too short) | ✅ | ✅ | ⚠️ Missing | Description too short; missing schema |
| jobs.html | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ 118 chars (2 short of range) | ✅ | ❌ Missing | ⚠️ Missing | Description just under 120 chars; missing canonical; missing schema |
| terms.html | ✅ | ⚠️ 94 chars (too short) | ✅ | ❌ Missing | ⚠️ Missing | Description too short; missing canonical; missing schema |
| success.html | ✅ | ⚠️ 48 chars (too short) | ❌ og:title/og:description/og:url missing | ❌ Missing | ⚠️ Missing (not required) | Description too short; missing og:title/og:description/og:url; missing canonical; `robots: noindex` present (likely intentional — confirm) |
| cancel.html | ✅ | ⚠️ 53 chars (too short) | ❌ og:title/og:description/og:url missing | ❌ Missing | ⚠️ Missing (not required) | Description too short; missing og:title/og:description/og:url; missing canonical; `robots: noindex` present (likely intentional — confirm) |
| reset-password.html | ✅ | ⚠️ 34 chars (too short) | ❌ og:title/og:description/og:url missing | ❌ Missing | ⚠️ Missing (not required) | Description too short; missing og:title/og:description/og:url; missing canonical; `robots: noindex` present (likely intentional — confirm) |

## Notes

- Schema markup (`<script type="application/ld+json">`) is only strictly required on `index.html` per the audit spec; it's present there. It's also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`, so its absence on `auth.html`, `contact.html`, `privacy.html`, and `terms.html` is flagged for consistency, not as a hard requirement.
- All `og:url` and canonical values that are present correctly use the `servicewindow.app` domain — no domain-mismatch issues found.
- All `og:image` tags are present across all 15 pages.
- This is a report only — no HTML files were modified.
