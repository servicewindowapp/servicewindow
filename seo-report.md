# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-27
**Pages audited:** 15
**Total issues found:** 30 (across title/description/OG/canonical/schema checks) + 4 pages flagged for `noindex` review

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all.
2. **Add JSON-LD schema markup to 7 pages** — `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no `<script type="application/ld+json">`. (Site-wide minimum is met via `index.html`, but coverage is thin.)
3. **Fix meta description lengths** — `marketplace.html` is 161 chars (1 over the 160 max); `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` are all under 120 chars (some far under, e.g. `reset-password.html` at 34 chars).

*Note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This trips check #9 literally, but these are transactional/account pages (login, post-Stripe success/cancel, password reset) that should plausibly stay out of the index — flagged below for a human decision, not treated as a defect to auto-fix.

---

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160c) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (161c, 1 over max) | ✅ | ✅ | ✅ | Trim description by 1+ char |
| `find-trucks.html` | ✅ | ✅ (155c) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ (95c, under min) | ✅ | ❌ | ❌ | No canonical; no schema; description under 120c; `noindex` set (likely intentional — confirm) |
| `pricing.html` | ✅ | ✅ (134c) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (153c) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ (98c, under min) | ✅ | ✅ | ❌ | No schema; description under 120c |
| `jobs.html` | ✅ | ✅ (131c) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (145c) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (154c) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (116c, under min) | ✅ | ❌ | ❌ | No canonical; no schema; description 4c under 120 min |
| `terms.html` | ✅ | ⚠️ (92c, under min) | ✅ | ❌ | ❌ | No canonical; no schema; description under 120c |
| `success.html` | ✅ | ⚠️ (48c, under min) | ⚠️ (og:image only) | ❌ | ❌ | Missing og:title/og:description/og:url; no canonical; no schema; description far under 120c; `noindex` set (likely intentional — confirm) |
| `cancel.html` | ✅ | ⚠️ (53c, under min) | ⚠️ (og:image only) | ❌ | ❌ | Missing og:title/og:description/og:url; no canonical; no schema; description far under 120c; `noindex` set (likely intentional — confirm) |
| `reset-password.html` | ✅ | ⚠️ (34c, under min) | ⚠️ (og:image only) | ❌ | ❌ | Missing og:title/og:description/og:url; no canonical; no schema; description far under 120c; `noindex` set (likely intentional — confirm) |

---

## Detail Notes

- **Titles:** all 15 pages have present, descriptive, non-placeholder `<title>` tags. No issues.
- **OG URL domains:** every `og:url` and `canonical` tag that is present correctly uses the `https://servicewindow.app` domain — no stray localhost/staging URLs found.
- **og:image:** present on all 15 pages (all reuse the shared `/og-image.png`).
- **Schema markup:** present on `index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html` (8/15). Missing on the remaining 7 — worst offenders are the legal pages (`privacy.html`, `terms.html`), which are fully public and indexable but carry zero structured data.
- **Robots/noindex:** 4 pages set `noindex, nofollow` — `auth.html`, `success.html`, `cancel.html`, `reset-password.html`. All 4 are account/transactional flows, so this is plausibly correct by design rather than an SEO bug, but it's called out here since the audit spec explicitly checks for it.

This report is audit-only — no HTML files were modified.
