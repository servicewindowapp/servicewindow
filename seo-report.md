# ServiceWindow — SEO & Metadata Audit

**Date:** 2026-07-27
**Pages audited:** 15
**Total issues found:** 30 (28 ❌ fail, 2 ⚠️ needs improvement)

## Top 3 Priority Fixes

1. **Add canonical tags to `privacy.html` and `terms.html`.** These are indexable legal pages (no `noindex`) but ship with no `<link rel="canonical">`, leaving them exposed to duplicate-content ambiguity if crawled via query params or trailing slashes.
2. **Add JSON-LD schema to `contact.html`.** It's the only fully public, indexable page in the audit set with zero structured data — an `Organization`/`ContactPage` block would bring it in line with the rest of the site.
3. **Rewrite out-of-range meta descriptions.** `marketplace.html` is 1 character over the 160 max; `auth.html`, `contact.html`, `terms.html`, `privacy.html` are all under the 120 minimum (as low as 92 chars) — these are truncated or under-optimized in search snippets.

Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` carry `<meta name="robots" content="noindex, nofollow">`. This looks intentional (auth flow and post-Stripe transactional pages shouldn't rank in search) rather than a bug, so their missing OG/canonical/schema tags are flagged below but not treated as launch-blocking.

---

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ | Trim description by 1+ char |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95 chars, below min) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; no JSON-LD; description too short. `noindex` appears intentional |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98 chars, below min) | ✅ | ✅ | ❌ Missing | No JSON-LD schema; description too short |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars, 4 under min) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; no JSON-LD; description slightly short |
| terms.html | ✅ | ❌ (92 chars, below min) | ✅ | ❌ Missing | ❌ Missing | No canonical tag; no JSON-LD; description too short |
| success.html | ✅ | ❌ (48 chars, below min) | ❌ Missing og:title/description/url | ❌ Missing | ❌ Missing | Missing most OG tags, canonical, and schema; description too short. `noindex` appears intentional (post-checkout) |
| cancel.html | ✅ | ❌ (53 chars, below min) | ❌ Missing og:title/description/url | ❌ Missing | ❌ Missing | Same pattern as success.html — intentional `noindex` utility page |
| reset-password.html | ✅ | ❌ (34 chars, below min) | ❌ Missing og:title/description/url | ❌ Missing | ❌ Missing | Same pattern — intentional `noindex` utility page |

---

## Notes

- Every page has a unique, descriptive `<title>` — no placeholders or duplicates found.
- `og:image` is present on all 15 pages (shared `og-image.png`).
- No `<meta name="robots" content="noindex">` was found on any of the primary public/marketing pages (index, marketplace, find-trucks, pricing, about, contact, jobs, venues, property, privacy, terms) — good.
- Schema markup (`application/ld+json`) is present and rich on index.html (WebSite, Organization, City/State, ContactPoint, OfferCatalog), and present with relevant types on marketplace, find-trucks, pricing, about, jobs, venues, and property. It is absent on auth, contact, privacy, terms, success, cancel, and reset-password.
- This is a report only — no HTML files were modified.
