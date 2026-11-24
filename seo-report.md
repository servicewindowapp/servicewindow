# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-24
**Scope:** 15 production pages (report only, no HTML was changed)

## Summary

- **Pages audited:** 15
- **Issues found:** 28 across 9 pages. 6 pages pass every check: index, find-trucks, pricing, about, venues and property.
  - 21 are fixable metadata gaps.
  - 4 are `noindex` on auth, success, cancel and reset-password. These are transactional pages and are also listed under `Disallow` in `robots.txt`, so the `noindex` looks intentional. They fail check #9 as written and are counted here, but they are low priority.
  - 3 are short descriptions on those same transactional pages.

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** These are the only indexable pages without a canonical. They are also missing from `sitemap.xml`, as is `contact.html`.
2. **Lengthen the meta descriptions on indexable pages to 120–160 characters:** `contact.html` (98), `privacy.html` (116), `terms.html` (92). Also trim `marketplace.html` from 161 to 160 or fewer.
3. **Fix the city count in the `og:description` of `jobs.html`.** It says "across **21** SWFL cities". The copy rule says the city count is always **22**. This text appears in every social share preview of the page.

Lower priority: `success.html`, `cancel.html` and `reset-password.html` have no `og:title`, `og:description`, `og:url` or canonical. Because these pages are noindex and disallowed in robots.txt, this mainly affects how links look when shared. `auth.html` has full OG tags but no canonical.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required (schema is required on index.html only)

"OG Tags" covers og:title, og:description, og:url (checked for the servicewindow.app domain) and og:image. Description lengths are character counts with HTML entities decoded.

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ Book Verified Food Trucks in Southwest Florida \| ServiceWindow | ✅ 160 chars | ✅ | ✅ `https://servicewindow.app/` | ✅ WebSite, Organization | None |
| marketplace.html | ✅ Browse Trucks & Marketplace — ServiceWindow SWFL | ⚠️ 161 chars (1 over) | ✅ | ✅ | ✅ CollectionPage | Description 1 char over the 160 limit |
| find-trucks.html | ✅ Find a Food Truck Near You — ServiceWindow SWFL | ✅ 155 chars | ✅ | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ Sign Up / Log In — ServiceWindow | ⚠️ 95 chars | ✅ | ❌ missing | — | Short description; no canonical; `robots: noindex, nofollow` (likely intentional) |
| pricing.html | ✅ Pricing — ServiceWindow SWFL Food Truck Marketplace | ✅ 134 chars | ✅ | ✅ | ✅ WebPage | None |
| about.html | ✅ About \| ServiceWindow — SWFL Food Truck Marketplace | ✅ 153 chars | ✅ | ✅ | ✅ AboutPage | None |
| contact.html | ✅ Contact \| ServiceWindow — SWFL Food Truck Marketplace | ⚠️ 98 chars | ✅ | ✅ | — none | Short description; not in sitemap.xml |
| jobs.html | ✅ Jobs Board \| ServiceWindow — SWFL Food Truck Marketplace | ✅ 131 chars | ⚠️ | ✅ | ✅ CollectionPage | og:description says "21 SWFL cities" (should be 22) |
| venues.html | ✅ Venue Partnerships \| ServiceWindow — SWFL Food Truck Marketplace | ✅ 145 chars | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ Parking & Real Estate \| ServiceWindow — SWFL Food Truck Marketplace | ✅ 154 chars | ✅ | ✅ | ✅ WebPage | None |
| privacy.html | ✅ Privacy Policy \| ServiceWindow | ⚠️ 116 chars | ✅ | ❌ missing | — none | Short description; no canonical; not in sitemap.xml |
| terms.html | ✅ Terms of Service \| ServiceWindow | ⚠️ 92 chars | ✅ | ❌ missing | — none | Short description; no canonical; not in sitemap.xml |
| success.html | ✅ You're In — ServiceWindow | ⚠️ 48 chars | ❌ og:image only | ❌ missing | — | No og:title, og:description or og:url; no canonical; short description; `noindex, nofollow` (likely intentional) |
| cancel.html | ✅ No Problem — ServiceWindow | ⚠️ 53 chars | ❌ og:image only | ❌ missing | — | No og:title, og:description or og:url; no canonical; short description; `noindex, nofollow` (likely intentional) |
| reset-password.html | ✅ Reset Password — ServiceWindow | ⚠️ 34 chars | ❌ og:image only | ❌ missing | — | No og:title, og:description or og:url; no canonical; short description; `noindex, nofollow` (likely intentional) |

## Notes

- Every `og:url` and canonical that exists uses `https://servicewindow.app`. No other domain was found.
- Every page has `og:image` set to `https://servicewindow.app/og-image.png`, and that file exists in the repo root.
- No page has more than one `<title>`, meta description or canonical tag.
- All JSON-LD blocks parse as valid JSON.
- No indexable page has a `robots` meta tag that blocks indexing.
