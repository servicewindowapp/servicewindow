# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-09-07
**Scope:** 15 production HTML pages (root-level, static site)
**Method:** Automated check of `<title>`, `<meta name="description">`, Open Graph tags, `<link rel="canonical">`, JSON-LD schema, and `<meta name="robots">`. Report only — no HTML files were modified.

## Summary

- **Pages audited:** 15
- **Total issues found:** 28
- **Legend:** ✅ Pass · ⚠️ Present but needs improvement · ❌ Fail / missing

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` currently have no canonical tag at all. This is the most widespread gap (6 of 15 pages).
2. **Complete Open Graph tags on the 3 post-action pages** — `success.html`, `cancel.html`, and `reset-password.html` only have `og:image`; they're missing `og:title`, `og:description`, and `og:url`. Low SEO impact (these are `noindex`), but they'll render broken/blank previews if ever shared directly (e.g. a support link).
3. **Rewrite out-of-range meta descriptions** — 7 pages have descriptions outside the 120–160 char target: `auth.html` (97), `contact.html` (100), `privacy.html` (118), `terms.html` (94), `success.html` (48), `cancel.html` (53), `reset-password.html` (34). `marketplace.html` (163) is slightly over on the other end.

*Note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are set to `noindex, nofollow`. This is flagged per the audit criteria but is likely intentional for a login/auth flow and post-Stripe transactional pages — confirm with the team before changing.

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (163 chars — 3 over max) | ✅ | ✅ | ✅ | Description slightly over 160 chars; trim |
| `find-trucks.html` | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ (97 chars — too short) | ✅ | ❌ Missing | ⚠️ Not present | Missing canonical; description under 120 chars; no JSON-LD (optional here); `robots: noindex` (likely intentional — auth page) |
| `pricing.html` | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ (100 chars — too short) | ✅ | ✅ | ⚠️ Not present | Description under 120 chars; no JSON-LD (optional here) |
| `jobs.html` | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (118 chars — 2 under min) | ✅ | ❌ Missing | ⚠️ Not present | Missing canonical; description 2 chars short of 120; no JSON-LD (optional here) |
| `terms.html` | ✅ | ⚠️ (94 chars — too short) | ✅ | ❌ Missing | ⚠️ Not present | Missing canonical; description under 120 chars; no JSON-LD (optional here) |
| `success.html` | ✅ | ⚠️ (48 chars — too short) | ❌ Missing og:title/description/url | ❌ Missing | ⚠️ Not present | Missing canonical; incomplete OG tags (only og:image); description far under 120 chars; `robots: noindex` (likely intentional — post-checkout page) |
| `cancel.html` | ✅ | ⚠️ (53 chars — too short) | ❌ Missing og:title/description/url | ❌ Missing | ⚠️ Not present | Missing canonical; incomplete OG tags (only og:image); description far under 120 chars; `robots: noindex` (likely intentional — post-checkout page) |
| `reset-password.html` | ✅ | ⚠️ (34 chars — too short) | ❌ Missing og:title/description/url | ❌ Missing | ⚠️ Not present | Missing canonical; incomplete OG tags (only og:image); description far under 120 chars; `robots: noindex` (likely intentional — auth-flow page) |

---

## Notes

- **Titles:** All 15 pages have a present, descriptive, non-placeholder `<title>`. No issues found.
- **Schema markup:** Required at minimum on `index.html`, which has it (`✅`). It's also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. Its absence on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` is marked ⚠️ (optional) rather than ❌, since schema isn't required on these page types.
- **og:url domain:** All present `og:url` and `<link rel="canonical">` values correctly use the `servicewindow.app` domain — no domain-mismatch issues found on any page.
- This report is diagnostic only; no HTML files were modified as part of this audit.
