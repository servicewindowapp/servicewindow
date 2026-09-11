# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-09-11
**Pages audited:** 15
**Total issues found:** 27
**Scope:** `index.html`, `marketplace.html`, `find-trucks.html`, `auth.html`, `pricing.html`, `about.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`

This is a report-only audit — no HTML files were modified.

## Top 3 Priority Fixes

1. **Missing canonical tags on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no `<link rel="canonical">`. This is the most widespread gap and the cheapest to fix.
2. **Incomplete Open Graph tags on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` only set `og:image`; they're missing `og:title`, `og:description`, and `og:url`. Links to these pages will render broken/generic previews in Slack, iMessage, etc.
3. **Meta descriptions outside the 120–160 char target** — `auth.html` (95), `contact.html` (98), `privacy.html` (116), and `terms.html` (92) are too short; `marketplace.html` (161) is 1 character over. Expanding the short ones improves SERP snippet quality.

**Note on `robots: noindex, nofollow`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are all set to `noindex, nofollow`. This is flagged per the audit checklist, but is very likely intentional — these are functional/transactional pages (login, post-Stripe redirect, password reset) with no SEO value. Flagging here for confirmation, not as a recommended change.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ | Meta description 1 char over 160 max |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95 chars, under min) | ✅ | ❌ | ⚠️ (none; not required) | Description too short (95 chars, min 120); missing canonical tag; robots=noindex,nofollow (likely intentional — auth page) |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98 chars, under min) | ✅ | ✅ | ⚠️ (none; not required) | Description too short (98 chars, min 120) |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars, under min) | ✅ | ❌ | ⚠️ (none; not required) | Description slightly short (116 chars, min 120); missing canonical tag |
| terms.html | ✅ | ⚠️ (92 chars, under min) | ✅ | ❌ | ⚠️ (none; not required) | Description too short (92 chars, min 120); missing canonical tag |
| success.html | ✅ | ⚠️ (48 chars, well under min) | ❌ (only og:image set) | ❌ | ⚠️ (none; not required) | Description far too short (48 chars); missing og:title, og:description, og:url; missing canonical tag; robots=noindex,nofollow (likely intentional — post-checkout page) |
| cancel.html | ✅ | ⚠️ (53 chars, well under min) | ❌ (only og:image set) | ❌ | ⚠️ (none; not required) | Description far too short (53 chars); missing og:title, og:description, og:url; missing canonical tag; robots=noindex,nofollow (likely intentional — post-checkout page) |
| reset-password.html | ✅ | ⚠️ (34 chars, well under min) | ❌ (only og:image set) | ❌ | ⚠️ (none; not required) | Description far too short (34 chars); missing og:title, og:description, og:url; missing canonical tag; robots=noindex,nofollow (likely intentional — auth-flow page) |

---

## Check Definitions

1. **Title** — present, non-blank, non-placeholder.
2. **Description** — `<meta name="description">` present, 120–160 characters. ⚠️ = present but outside range.
3–6. **OG Tags** — `og:title`, `og:description`, `og:url` (servicewindow.app domain), `og:image` all present. ✅ = all four present; ❌ = one or more missing.
7. **Canonical** — `<link rel="canonical">` present, servicewindow.app domain.
8. **Schema** — `application/ld+json` structured data. Required at minimum on `index.html` (present ✅). ⚠️ on other pages means schema is absent but not required by this checklist.
9. **Robots** — flagged separately in the Issues column when `noindex` is set; not scored as a pass/fail column since some of these pages are legitimately non-indexable by design.
