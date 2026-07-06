# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-06
**Pages audited:** 15 (production HTML pages)
**Scope:** Report only — no HTML files were modified.

---

## Summary

- **Total pages audited:** 15
- **Pages with at least one issue:** 8 of 15 (`auth.html`, `marketplace.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`)
- **Total failed/flagged checks:** 27 across all pages (see per-page Issues column)

### Top 3 priority fixes

1. **Missing `<link rel="canonical">` on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all. This is the highest-impact gap since canonical URLs prevent duplicate-content ambiguity for every one of these pages.
2. **Incomplete Open Graph tags on 3 pages** — `success.html`, `cancel.html`, `reset-password.html` only have `og:image`; `og:title`, `og:description`, and `og:url` are all absent. Any link share of the post-checkout or password-reset flow renders with no title/description in social previews.
3. **Meta descriptions outside the 120–160 char target on 8 pages** — most are far too short (`reset-password.html` at 34 chars, `success.html` at 48, `cancel.html` at 53, `terms.html` at 92, `auth.html` at 95, `contact.html` at 98, `privacy.html` at 116), and `marketplace.html` is 1 character over at 161. Short descriptions waste SERP snippet space; Google will otherwise auto-generate one.

**Secondary note (check #9):** `robots: noindex, nofollow` is present on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. These are transactional/gated pages (login, post-Stripe redirect, password reset), so noindex is likely intentional rather than a defect — flagged here per the audit criteria for confirmation, not treated as a hard failure.

---

## Findings

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ `https://servicewindow.app/` | ✅ | None. |
| `marketplace.html` | ✅ | ⚠️ (161 chars — 1 over max) | ✅ | ✅ | ✅ | Description 1 char over the 160 limit; trim slightly. |
| `find-trucks.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None. |
| `auth.html` | ✅ | ⚠️ (95 chars — under 120) | ✅ | ❌ missing | ❌ (optional, index-only requirement) | No canonical tag; description short (95 vs. 120–160 target); `robots: noindex, nofollow` present (likely intentional for a login page — confirm). |
| `pricing.html` | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None. |
| `about.html` | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None. |
| `contact.html` | ✅ | ⚠️ (98 chars — under 120) | ✅ | ✅ | ❌ (optional) | Description short (98 vs. 120–160 target); no schema markup (not required outside index.html). |
| `jobs.html` | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None. |
| `venues.html` | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None. |
| `property.html` | ⚠️ (71 chars — may truncate in SERPs) | ✅ (154 chars) | ✅ | ✅ | ✅ | Title runs 71 chars; recommend ≤60 to avoid SERP truncation (not a hard fail per spec, just a heads-up). |
| `privacy.html` | ✅ | ⚠️ (116 chars — just under 120) | ✅ | ❌ missing | ❌ (optional) | No canonical tag; description slightly short (116 vs. 120 min). |
| `terms.html` | ✅ | ⚠️ (92 chars — under 120) | ✅ | ❌ missing | ❌ (optional) | No canonical tag; description short (92 vs. 120–160 target). |
| `success.html` | ✅ | ⚠️ (48 chars — well under 120) | ❌ (og:title, og:description, og:url all missing; only og:image present) | ❌ missing | ❌ (optional) | Missing canonical; missing og:title/og:description/og:url; description far too short (48 chars); `robots: noindex, nofollow` present (likely intentional for post-checkout page — confirm). |
| `cancel.html` | ✅ | ⚠️ (53 chars — well under 120) | ❌ (og:title, og:description, og:url all missing; only og:image present) | ❌ missing | ❌ (optional) | Missing canonical; missing og:title/og:description/og:url; description far too short (53 chars); `robots: noindex, nofollow` present (likely intentional — confirm). |
| `reset-password.html` | ✅ | ⚠️ (34 chars — well under 120) | ❌ (og:title, og:description, og:url all missing; only og:image present) | ❌ missing | ❌ (optional) | Missing canonical; missing og:title/og:description/og:url; description far too short (34 chars); `robots: noindex, nofollow` present (likely intentional — confirm). |

---

## Check reference

1. `<title>` — present and descriptive (not blank/placeholder)
2. `<meta name="description">` — present, target 120–160 characters
3. `<meta property="og:title">` — present
4. `<meta property="og:description">` — present
5. `<meta property="og:url">` — present, `servicewindow.app` domain
6. `<meta property="og:image">` — present
7. `<link rel="canonical">` — present, `servicewindow.app` domain
8. Schema markup (`<script type="application/ld+json">`) — required on `index.html` at minimum; present there. Absence on other pages is noted but not scored as a required-check failure.
9. `<meta name="robots">` — flagged if set to `noindex` on any of the 15 audited pages
