# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-17
**Pages audited:** 15
**Total issues found:** 27

## Top 3 Priority Fixes

1. **`success.html`, `cancel.html`, `reset-password.html` are missing nearly all social/canonical metadata** — no `og:title`, `og:description`, `og:url`, or `<link rel="canonical">`, and meta descriptions are far under the 120-char minimum (34–53 chars). These are `noindex`'d, which is appropriate, but if links to them are ever shared (e.g. post-checkout), they'll render with broken/generic social previews.
2. **`privacy.html` and `terms.html` have no canonical tag and no schema markup**, and their meta descriptions (118 and 94 chars) fall short of the 120–160 char target. Legal pages are commonly crawled and linked from footers site-wide; missing canonicals risk duplicate-content ambiguity.
3. **Meta descriptions are out of the 120–160 char range on 5 pages** — `auth.html` (97), `contact.html` (100), `terms.html` (94), `privacy.html` (118) are too short to use available SERP snippet space; `marketplace.html` (163) is slightly over.

---

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars — 3 over max) | ✅ | ✅ | ✅ | Description slightly over 160-char limit |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars — under min) | ✅ | ❌ | ❌ | Description too short; no canonical tag; no schema markup; `robots: noindex` (likely intentional for a login page) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars — under min) | ✅ | ✅ | ❌ | Description too short; no schema markup |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars — under min) | ✅ | ❌ | ❌ | Description too short; no canonical tag; no schema markup |
| terms.html | ✅ | ⚠️ (94 chars — under min) | ✅ | ❌ | ❌ | Description too short; no canonical tag; no schema markup |
| success.html | ✅ | ❌ (48 chars) | ❌ | ❌ | ❌ | Description far too short; missing og:title/og:description/og:url; no canonical tag; `robots: noindex` (likely intentional — post-checkout page) |
| cancel.html | ✅ | ❌ (53 chars) | ❌ | ❌ | ❌ | Description far too short; missing og:title/og:description/og:url; no canonical tag; `robots: noindex` (likely intentional — post-checkout page) |
| reset-password.html | ✅ | ❌ (34 chars) | ❌ | ❌ | ❌ | Description far too short; missing og:title/og:description/og:url; no canonical tag; `robots: noindex` (likely intentional — utility page) |

---

## Notes

- **Titles**: all 15 pages have a present, descriptive, non-placeholder `<title>`. No issues.
- **OG image**: all 15 pages use `https://servicewindow.app/og-image.png`. No issues.
- **OG URL / canonical domain**: everywhere present, both use the `servicewindow.app` domain correctly. No issues.
- **Schema markup**: present on `index.html` (satisfies the minimum requirement) and also on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`. Missing on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and the three transactional pages.
- **Robots noindex**: found on `auth.html`, `success.html`, `cancel.html`, `reset-password.html`. All four are account/transactional utility pages, not content pages intended to rank — flagged per audit criteria but likely intentional rather than a defect.

*This is a report-only audit. No HTML files were modified.*
