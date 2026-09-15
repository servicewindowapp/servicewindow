# ServiceWindow — SEO & Metadata Audit

**Run date:** 2026-09-15
**Pages audited:** 15
**Total issues found:** 29 (across description length, canonical tags, Open Graph tags, schema markup, and robots/index directives)

## Top 3 Priority Fixes

1. **Add missing canonical tags** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` (6 of 15 pages) have no `<link rel="canonical">` at all. Cheapest fix with the broadest duplicate-content protection.
2. **Rewrite under-length meta descriptions** — 7 pages sit well below the 120-char floor: `reset-password.html` (34), `success.html` (48), `cancel.html` (53), `terms.html` (92), `auth.html` (95), `contact.html` (98), `privacy.html` (116). These render as thin, low-CTR snippets in search results.
3. **Fix "21 SWFL cities" copy error on `jobs.html`** — the meta description/og:description and JSON-LD both say the jobs board covers "21 SWFL cities," but `CLAUDE.md`'s copy rules fix the city count at 22 everywhere else on the site. This is a factual/SEO-copy inconsistency, not just a style nit.

*(Secondary, lower priority: `marketplace.html`'s description is 161 characters — 1 over the 160 cap. `success.html`, `cancel.html`, and `reset-password.html` are missing og:title/og:description/og:url — low priority since these three pages are already `noindex`ed.)*

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None — og:url (`.../` no trailing path) and canonical are both correctly the root domain; minor cosmetic mismatch only (canonical has trailing `/`, og:url doesn't). |
| marketplace.html | ✅ | ⚠️ (161 chars — 1 over 160 cap) | ✅ | ✅ | ✅ | Trim description by 1+ characters. |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None. |
| auth.html | ✅ | ⚠️ (95 chars — under 120 floor) | ✅ | ❌ Missing | ⚠️ Missing (optional) | No canonical tag; description too short; `<meta name="robots" content="noindex, nofollow">` present — likely intentional for an auth flow, but confirm intent. |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None. |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None. |
| contact.html | ✅ | ⚠️ (98 chars — under 120 floor) | ✅ | ✅ | ⚠️ Missing (optional) | Description too short; no JSON-LD schema (not required off index.html, but a low-cost win here). |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | og:description and JSON-LD both say "21 SWFL cities" — should be 22 per site-wide copy standard. |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None. |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None. |
| privacy.html | ✅ | ⚠️ (116 chars — just under 120 floor) | ✅ | ❌ Missing | ⚠️ Missing (optional) | No canonical tag; description 4 chars short of the floor. |
| terms.html | ✅ | ⚠️ (92 chars — under 120 floor) | ✅ | ❌ Missing | ⚠️ Missing (optional) | No canonical tag; description too short. |
| success.html | ✅ | ⚠️ (48 chars — well under 120 floor) | ⚠️ og:image only (title/description/url missing) | ❌ Missing | ⚠️ Missing (optional) | Missing canonical, og:title, og:description, og:url; description far too short. `robots: noindex, nofollow` present — appropriate for a post-checkout confirmation page. |
| cancel.html | ✅ | ⚠️ (53 chars — well under 120 floor) | ⚠️ og:image only (title/description/url missing) | ❌ Missing | ⚠️ Missing (optional) | Missing canonical, og:title, og:description, og:url; description far too short. `robots: noindex, nofollow` present — appropriate for a post-checkout cancel page. |
| reset-password.html | ✅ | ⚠️ (34 chars — well under 120 floor) | ⚠️ og:image only (title/description/url missing) | ❌ Missing | ⚠️ Missing (optional) | Missing canonical, og:title, og:description, og:url; description far too short. `robots: noindex, nofollow` present — appropriate for an account-utility page. |

## Notes

- **Titles:** All 15 pages have a present, descriptive, non-placeholder `<title>`. No failures on this check.
- **Schema markup:** Required only on `index.html` at minimum per the audit spec — it's present there (`WebSite` + `Organization`). 7 of the other 14 pages also carry JSON-LD (`marketplace`, `find-trucks`, `pricing`, `about`, `jobs`, `venues`, `property`); the rest (`auth`, `contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) have none. Marked ⚠️ rather than ❌ since it's optional outside index.html.
- **robots/noindex (check 9):** 4 of 15 pages — `auth.html`, `success.html`, `cancel.html`, `reset-password.html` — carry `noindex, nofollow`. All four are auth/checkout-flow utility pages, so this is very likely intentional (keeps thin, duplicate-per-session pages out of the index) rather than an oversight, but it's flagged here since the checklist calls for zero noindex on production pages — worth an explicit sign-off rather than a silent pass.
- No HTML files were modified as part of this audit — report only.
