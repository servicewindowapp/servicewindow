# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-10
**Pages audited:** 15
**Total issues flagged:** 28 (plus 4 `noindex` flags on auth/checkout/reset pages — likely intentional, see note below)

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` (6 of 15 pages). Canonical tags prevent duplicate-content ambiguity and should be added even to noindex pages for consistency.
2. **Incomplete Open Graph sets on the Stripe post-checkout / reset flow** — `success.html`, `cancel.html`, and `reset-password.html` each have only `og:image`; `og:title`, `og:description`, and `og:url` are all absent. Low priority for search, but these are commonly shared links (e.g., support screenshots) that currently render broken social previews.
3. **Meta description length out of the 120–160 char target** on 7 pages — `auth.html` (97), `contact.html` (100), `privacy.html` (118), `terms.html` (94), `success.html` (48), `cancel.html` (53), `reset-password.html` (34) are all under range; `marketplace.html` (163) is slightly over. Rewrite to hit the target for better SERP snippet control.

**Secondary note (not SEO, flagged during audit):** `jobs.html`'s `og:description` references "21 SWFL cities" — CLAUDE.md states the current canonical coverage count is 22 cities. Data inconsistency, not a metadata defect.

**Note on `robots: noindex, nofollow`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `noindex, nofollow`. This technically fails the literal "no noindex on production pages" check, but is standard practice for auth/checkout/reset-flow pages that shouldn't rank in search. Flagging for confirmation, not counted as a defect above.

---

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ WebSite + Organization | None |
| marketplace.html | ✅ | ⚠️ 163 chars (3 over max) | ✅ | ✅ | ✅ CollectionPage | Description 3 chars over 160 max |
| find-trucks.html | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ | ⚠️ 97 chars (under min) | ⚠️ missing og:url | ❌ absent | ⚠️ none | Missing canonical; missing og:url; description under 120 chars; robots=noindex,nofollow (see note) |
| pricing.html | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ WebPage | None |
| about.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ AboutPage | None |
| contact.html | ✅ | ⚠️ 100 chars (under min) | ✅ | ✅ | ⚠️ none | Description under 120 chars; no schema markup |
| jobs.html | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ CollectionPage | og:description says "21 cities" vs. current 22-city count |
| venues.html | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ WebPage | None |
| privacy.html | ✅ | ⚠️ 118 chars (2 under min) | ✅ | ❌ absent | ⚠️ none | Missing canonical; description 2 chars under 120 min; no schema markup |
| terms.html | ✅ | ⚠️ 94 chars (under min) | ✅ | ❌ absent | ⚠️ none | Missing canonical; description under 120 chars; no schema markup |
| success.html | ✅ | ❌ 48 chars (far under min) | ❌ only og:image present | ❌ absent | ⚠️ none | Missing og:title/og:description/og:url; missing canonical; description far under 120 chars; robots=noindex,nofollow (see note) |
| cancel.html | ✅ | ❌ 53 chars (far under min) | ❌ only og:image present | ❌ absent | ⚠️ none | Missing og:title/og:description/og:url; missing canonical; description far under 120 chars; robots=noindex,nofollow (see note) |
| reset-password.html | ✅ | ❌ 34 chars (far under min) | ❌ only og:image present | ❌ absent | ⚠️ none | Missing og:title/og:description/og:url; missing canonical; description far under 120 chars; robots=noindex,nofollow (see note) |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail/absent

**Scope note:** Schema (`ld+json`) is required only on `index.html` per audit criteria — it passes there and on 6 other pages as a bonus. Its absence on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` is marked ⚠️ (informational) rather than a hard failure.
