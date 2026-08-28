# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-28
**Pages audited:** 15
**Total issues found:** 20

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on legal pages** — `privacy.html` and `terms.html` are indexable (no noindex) but have no canonical tag at all. These are linked from the footer of every page on the site, so this is the highest real duplicate-content risk in the audit.
2. **Meta descriptions outside the 120–160 char range on indexable pages** — `terms.html` (94 chars), `contact.html` (100 chars), and `privacy.html` (118 chars, borderline) are too short to make full use of the SERP snippet; `auth.html` (97 chars) is lower priority since it's noindexed.
3. **`marketplace.html` description is 3 characters over the 160 max** (163 chars) — minor, but risks truncation in search results. Quick trim.

**Note on robots:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This is intentional and correct — login, post-checkout, and password-reset pages should not appear in search results. It is **not** counted as an issue in the table below, but is noted for visibility.

---

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars — 3 over max) | ✅ | ✅ | ✅ | Trim description to ≤160 chars |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars — under 120 min) | ✅ | ❌ Missing | ❌ Missing | Missing canonical; description too short; no schema (low priority — noindexed). Robots noindex is intentional. |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars — under 120 min) | ✅ | ✅ | ❌ Missing | Description too short; no schema (optional, low priority) |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars — 2 under min) | ✅ | ❌ Missing | ❌ Missing | Missing canonical (indexable page — real risk); description borderline short; no schema (acceptable) |
| terms.html | ✅ | ⚠️ (94 chars — under 120 min) | ✅ | ❌ Missing | ❌ Missing | Missing canonical (indexable page — real risk); description too short; no schema (acceptable) |
| success.html | ✅ | ⚠️ (48 chars — well under min) | ❌ Missing og:title/og:description/og:url | ❌ Missing | ❌ Missing | Missing og:title, og:description, og:url, canonical. Low priority — page is noindexed by design. |
| cancel.html | ✅ | ⚠️ (53 chars — well under min) | ❌ Missing og:title/og:description/og:url | ❌ Missing | ❌ Missing | Missing og:title, og:description, og:url, canonical. Low priority — page is noindexed by design. |
| reset-password.html | ✅ | ⚠️ (34 chars — well under min) | ❌ Missing og:title/og:description/og:url | ❌ Missing | ❌ Missing | Missing og:title, og:description, og:url, canonical. Low priority — page is noindexed by design. |

---

## Detail Notes

- **Title tags:** All 15 pages have a present, descriptive, non-placeholder `<title>`. No issues found.
- **`og:image`:** Present on all 15 pages (shared default `https://servicewindow.app/og-image.png`). No issues found.
- **`og:url` domain:** Everywhere `og:url` is present, it correctly uses the `servicewindow.app` domain.
- **Canonical domain:** Everywhere `<link rel="canonical">` is present, it correctly uses the `servicewindow.app` domain. The gap is pages where the tag is missing entirely (see table).
- **Schema markup:** Present (`application/ld+json`) on index.html (required minimum, met), plus marketplace.html, find-trucks.html, pricing.html, about.html, jobs.html, venues.html, property.html. Absent on auth.html, contact.html, privacy.html, terms.html, success.html, cancel.html, reset-password.html — acceptable for utility/legal/checkout pages, not a hard requirement per the audit criteria.
- **Robots:** No production content page (index, marketplace, find-trucks, pricing, about, contact, jobs, venues, property, privacy, terms) is noindexed. The four noindexed pages (auth, success, cancel, reset-password) are all non-content/transactional pages — correct practice, not a defect.

---

*Report only — no HTML files were modified as part of this audit.*
