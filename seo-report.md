# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-08
**Pages audited:** 15
**Total issues found:** 25
**Scope:** Report only — no HTML files were modified.

## Summary

| Metric | Result |
|---|---|
| Pages audited | 15 |
| Pages with zero issues | 7 (index, find-trucks, pricing, about, jobs, venues, property) |
| Pages missing `<link rel="canonical">` | 6 |
| Pages with description length outside 120–160 chars | 8 |
| Pages with incomplete Open Graph tags | 3 |
| Pages set to `noindex` | 4 (auth, success, cancel, reset-password) |
| Pages missing schema markup (`ld+json`) | 7 (not required except on index.html) |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all. This is the most widespread gap and the easiest fix (one line in `<head>`, matching the pattern already used on the other 9 pages).
2. **Fix meta description length on 8 pages** — 7 pages (`auth`, `contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) have descriptions well under the 120-char minimum (as low as 34 chars on `reset-password.html`), and `marketplace.html` is 1 character over the 160-char max. Short descriptions waste SERP snippet space; over-length ones get truncated by Google.
3. **Complete Open Graph tags on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` only have `og:image`; they're missing `og:title`, `og:description`, and `og:url`. Low priority for indexing (these pages are `noindex`) but they still get shared/previewed (e.g. in Slack, iMessage) after checkout.

*Note: `robots noindex` on `auth.html`, `success.html`, `cancel.html`, `reset-password.html` is flagged per the audit checklist but is likely intentional for auth/post-transaction pages — confirm with the team before changing rather than treating as a bug.*

---

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (161 chars — 1 over max) | ✅ | ✅ | ✅ | Description 1 char over 160-char max |
| `find-trucks.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ (95 chars — under min) | ✅ | ❌ Missing | ⚠️ Not present | Missing canonical tag; description only 95 chars (min 120); no schema markup; `robots: noindex, nofollow` (likely intentional — confirm) |
| `pricing.html` | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ (98 chars — under min) | ✅ | ✅ | ⚠️ Not present | Description only 98 chars (min 120); no schema markup |
| `jobs.html` | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (116 chars — under min) | ✅ | ❌ Missing | ⚠️ Not present | Missing canonical tag; description 116 chars (4 short of 120 min); no schema markup |
| `terms.html` | ✅ | ⚠️ (92 chars — under min) | ✅ | ❌ Missing | ⚠️ Not present | Missing canonical tag; description only 92 chars (min 120); no schema markup |
| `success.html` | ✅ | ⚠️ (48 chars — under min) | ❌ Missing og:title/og:description/og:url | ❌ Missing | ⚠️ Not present | Missing canonical tag; only `og:image` present (no og:title/og:description/og:url); description only 48 chars; `robots: noindex, nofollow` (expected for post-checkout page — confirm) |
| `cancel.html` | ✅ | ⚠️ (53 chars — under min) | ❌ Missing og:title/og:description/og:url | ❌ Missing | ⚠️ Not present | Missing canonical tag; only `og:image` present (no og:title/og:description/og:url); description only 53 chars; `robots: noindex, nofollow` (expected for post-checkout page — confirm) |
| `reset-password.html` | ✅ | ⚠️ (34 chars — under min) | ❌ Missing og:title/og:description/og:url | ❌ Missing | ⚠️ Not present | Missing canonical tag; only `og:image` present (no og:title/og:description/og:url); description only 34 chars; `robots: noindex, nofollow` (expected for account page — confirm) |

**Legend:** ✅ Pass · ❌ Fail · ⚠️ Present but needs improvement (or, in the Schema column, not present on a page where it isn't strictly required)

### Notes

- Schema markup (`<script type="application/ld+json">`) is only required on `index.html` per the audit checklist, and is present there (`WebSite` + `Organization` types). It's also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` — a good baseline. It's absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html`, which is acceptable but a low-effort improvement opportunity (e.g. `BreadcrumbList` or `ContactPage` schema on `contact.html`).
- All 15 pages have a non-blank, descriptive `<title>` tag — no placeholders found.
- All canonical URLs that are present correctly use the `https://servicewindow.app` domain — no mismatches or wrong-domain canonicals found.
- All Open Graph tags that are present correctly use the `https://servicewindow.app` domain.
