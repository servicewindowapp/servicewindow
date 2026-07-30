# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-30
**Scope:** 15 production HTML pages (root)
**Method:** Automated check of `<title>`, meta description, Open Graph tags, canonical link, JSON-LD schema, and robots directives.

## Summary

- **Total pages audited:** 15
- **Total issues found:** 30
- **Legend:** ✅ Pass · ⚠️ Present but needs improvement · ❌ Fail / missing

### Top 3 Priority Fixes

1. **Missing canonical tags on indexable pages** — `privacy.html`, `terms.html`, and `auth.html` have no `<link rel="canonical">`. These are indexable (no noindex on privacy/terms), so this is the highest-value gap to close.
2. **Missing JSON-LD schema on 6 pages** — `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, and `cancel.html` have zero `application/ld+json` blocks. `contact.html` in particular is indexable with no structured data at all.
3. **Incomplete Open Graph tags on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` only set `og:image`; they're missing `og:title`, `og:description`, and `og:url`. Even though these are noindexed, they can still be shared (e.g., a user forwarding a success/cancel link), and incomplete OG data means broken-looking link previews.

*Secondary/lower-priority:* several meta descriptions fall outside the 120–160 char target (`marketplace.html` at 161 is 1 char over; `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and the three transactional pages are under 120, some well under). The `noindex` directive on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` is flagged per the audit checklist but is almost certainly intentional (login/post-checkout/utility pages) — not a real priority fix.

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (161 chars) | ✅ | ✅ | ✅ | Description 1 char over 160 max |
| `find-trucks.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ (95 chars) | ✅ | ❌ | ❌ | Description under 120 chars; missing canonical tag; missing schema markup; `robots: noindex, nofollow` set (likely intentional — login page) |
| `pricing.html` | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ (98 chars) | ✅ | ✅ | ❌ | Description under 120 chars; missing schema markup |
| `jobs.html` | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (116 chars) | ✅ | ❌ | ❌ | Description slightly under 120 chars; missing canonical tag; missing schema markup |
| `terms.html` | ✅ | ⚠️ (92 chars) | ✅ | ❌ | ❌ | Description under 120 chars; missing canonical tag; missing schema markup |
| `success.html` | ✅ | ⚠️ (48 chars) | ❌ | ❌ | ❌ | Description far under 120 chars; missing og:title/og:description/og:url; missing canonical; missing schema; `robots: noindex, nofollow` set (likely intentional — post-checkout page) |
| `cancel.html` | ✅ | ⚠️ (53 chars) | ❌ | ❌ | ❌ | Description far under 120 chars; missing og:title/og:description/og:url; missing canonical; missing schema; `robots: noindex, nofollow` set (likely intentional — post-checkout page) |
| `reset-password.html` | ✅ | ⚠️ (34 chars) | ❌ | ❌ | ❌ | Description far under 120 chars; missing og:title/og:description/og:url; missing canonical; missing schema; `robots: noindex, nofollow` set (likely intentional — utility page) |

---

## Notes

- **Schema markup (item 8)** is present on `index.html` (requirement minimum met) and also on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html`.
- **Canonical domain (item 5/7):** every `og:url` and `<link rel="canonical">` found across all pages correctly points to the `https://servicewindow.app` domain — no mismatches.
- **Titles (item 1):** all 15 pages have a non-blank, descriptive `<title>`. No placeholder titles found.
- **Robots (item 9):** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` set `noindex, nofollow`. All other 11 pages are indexable (no robots meta restricting them).

This is a report-only audit — no HTML files were modified.
