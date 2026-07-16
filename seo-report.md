# ServiceWindow SEO & Metadata Audit

**Audit date:** 2026-07-16
**Pages audited:** 15
**Total issues found:** 27

## Summary

Core marketing/landing pages (`index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`) are in good shape — full title/description/OG/canonical/schema coverage, no `noindex`. Weak spots cluster on legal and utility pages.

**Top 3 priority fixes:**

1. **Missing `<link rel="canonical">`** on 6 of 15 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Canonical tags prevent duplicate-content ambiguity; `privacy.html` and `terms.html` in particular are indexable pages that should have one.
2. **Broken Open Graph previews** on `success.html`, `cancel.html`, `reset-password.html` — each has only `og:image`, missing `og:title`, `og:description`, and `og:url`. Any shared link to these URLs (e.g. a post-checkout link) will render a blank/broken social card.
3. **No JSON-LD schema** on `contact.html`, `privacy.html`, `terms.html` (plus `auth.html` and the 3 utility pages above) — these are otherwise-indexable pages with no structured data. Schema is only strictly required on `index.html` (which passes), but adding basic `WebPage`/`Organization` schema to `contact.html` would help rich-result eligibility.

Minor/cosmetic: `marketplace.html` description is 163 characters (3 over the 160 max); `auth.html`, `contact.html`, `terms.html`, `privacy.html` descriptions run short of the 120 minimum (94–118 chars).

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars, 3 over max) | ✅ | ✅ | ✅ | Description slightly over 160-char max |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars, under min) | ✅ | ❌ | ❌ | `robots: noindex, nofollow` set; no canonical tag; no schema markup; description under 120 chars |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars, under min) | ✅ | ✅ | ❌ | No schema markup; description under 120 chars |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars, just under min) | ✅ | ❌ | ❌ | No canonical tag; no schema markup; description 2 chars under min |
| terms.html | ✅ | ⚠️ (94 chars, under min) | ✅ | ❌ | ❌ | No canonical tag; no schema markup; description under 120 chars |
| success.html | ✅ | ❌ (48 chars, far under min) | ❌ (og:image only) | ❌ | ❌ | `robots: noindex, nofollow` (expected for post-checkout page); missing og:title/og:description/og:url; no canonical; no schema; description far under 120 chars |
| cancel.html | ✅ | ❌ (53 chars, far under min) | ❌ (og:image only) | ❌ | ❌ | `robots: noindex, nofollow` (expected for post-checkout page); missing og:title/og:description/og:url; no canonical; no schema; description far under 120 chars |
| reset-password.html | ✅ | ❌ (34 chars, far under min) | ❌ (og:image only) | ❌ | ❌ | Missing og:title/og:description/og:url; no canonical; no schema; description far under 120 chars |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ missing/fail

**Notes on scope:**
- Robots check: production pages should not be `noindex`. Four pages carry `noindex, nofollow` — `auth.html`, `success.html`, `cancel.html`, `reset-password.html`. This is very likely intentional (auth/checkout/password-reset flows are typically kept out of the search index), but is flagged per the audit criteria since these pages were included in the production page list.
- Schema markup is only required at minimum on `index.html` per audit spec — confirmed present there (`WebSite` + `Organization`, 2 objects in one `<script>` block).
- All present `og:url` and `<link rel="canonical">` values correctly use the `servicewindow.app` domain.
- This is a report only — no HTML files were modified.
