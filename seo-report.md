# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-06
**Pages audited:** 15 (production pages, per audit scope)
**Total issues found:** 27
**Method:** Automated check of `<title>`, `<meta name="description">`, Open Graph tags, `<link rel="canonical">`, JSON-LD schema, and `<meta name="robots">` across each page's `<head>`.

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag. `privacy.html` and `terms.html` are indexable (no noindex) and carry real duplicate-content risk without one.
2. **Fix meta description lengths on 8 pages** — several are well under the 120–160 char target (`terms.html` 92, `auth.html` 95, `contact.html` 98, `privacy.html` 116) or slightly over (`marketplace.html` 161). Legal/utility pages (`privacy`, `terms`, `contact`, `auth`) are the most impactful to expand since they're indexable.
3. **Add `og:title` / `og:description` / `og:url` to `success.html`, `cancel.html`, `reset-password.html`** — these three only have `og:image`, so links shared to these post-checkout/auth pages render incomplete social previews.

**Note on `noindex`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This fails audit check #9 as written, but is very likely intentional — these are a login gate and post-Stripe/utility pages that shouldn't rank. Flagged for confirmation, not necessarily a fix.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 limit — trim |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ⚠️ | Missing canonical; description under 120 min; `noindex` set (likely intentional — confirm) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ⚠️ | Description under 120 min; no JSON-LD schema (optional) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ⚠️ | Missing canonical; description slightly under 120 min; no schema (optional) |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ⚠️ | Missing canonical; description under 120 min; no schema (optional) |
| success.html | ✅ | ⚠️ (48) | ⚠️ | ❌ | ⚠️ | Missing og:title/og:description/og:url; missing canonical; description far under min; `noindex` set (likely intentional — post-checkout page) |
| cancel.html | ✅ | ⚠️ (53) | ⚠️ | ❌ | ⚠️ | Missing og:title/og:description/og:url; missing canonical; description far under min; `noindex` set (likely intentional — post-checkout page) |
| reset-password.html | ✅ | ⚠️ (34) | ⚠️ | ❌ | ⚠️ | Missing og:title/og:description/og:url; missing canonical; description far under min; `noindex` set (likely intentional — utility page) |

**Legend:** ✅ Pass · ⚠️ Present but needs improvement · ❌ Fail/missing

**Checks not required site-wide:** JSON-LD schema is only mandated on `index.html` by audit scope (present, ✅). Its absence on other pages is marked ⚠️ as a recommendation, not a hard fail.
