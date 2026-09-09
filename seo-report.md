# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-09-09
**Pages audited:** 15 production pages (`index.html`, `marketplace.html`, `find-trucks.html`, `auth.html`, `pricing.html`, `about.html`, `contact.html`, `jobs.html`, `venues.html`, `property.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`)

## Summary

- **Total pages audited:** 15
- **Total issues found:** 27
- **Pages fully clean:** 8 (`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`, plus `marketplace.html` with 1 minor warning)

### Top 3 Priority Fixes

1. **`success.html`, `cancel.html`, `reset-password.html` are missing `og:title`, `og:description`, and `<link rel="canonical">`, and have meta descriptions far under the 120-char minimum (34–53 chars).** These three pages account for 18 of the 27 issues found — the biggest concentration of gaps in the audit.
2. **Missing `<link rel="canonical">` on `auth.html`, `privacy.html`, and `terms.html`.** Canonical tags are absent on 6 of the 15 pages total (the three above plus the three in priority #1), leaving those pages without a clear self-referencing canonical signal.
3. **Meta descriptions outside the 120–160 char target on `auth.html` (95), `contact.html` (98), `terms.html` (92), `privacy.html` (116, borderline), and `marketplace.html` (161, 1 over max).** Tightening these to the target range improves SERP snippet control.

**Note:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. Per audit check #9 this is flagged as a fail on every page in the production list, though it may be an intentional choice for these transactional/utility pages (login, post-checkout, password reset) rather than a bug — flagging for review, not assuming it's wrong.

Schema markup (`application/ld+json`) is present on `index.html` as required. It is also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` (bonus, not required by the checklist). It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — not a failure per the audit spec (only required on `index.html` at minimum), marked `➖` below.

## Full Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ `servicewindow.app/` | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over max) | ✅ | ✅ `servicewindow.app/marketplace.html` | ✅ | Description 1 char over 160-char max |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ `servicewindow.app/find-trucks.html` | ✅ | None |
| `auth.html` | ✅ | ❌ 95 chars (under 120) | ✅ | ❌ Missing | ➖ N/A | Description too short; canonical missing; `robots` set to `noindex, nofollow` |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ `servicewindow.app/pricing.html` | ✅ | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ | ✅ `servicewindow.app/about.html` | ✅ | None |
| `contact.html` | ✅ | ❌ 98 chars (under 120) | ✅ | ✅ `servicewindow.app/contact.html` | ➖ N/A | Description too short |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ | ✅ `servicewindow.app/jobs.html` | ✅ | None |
| `venues.html` | ✅ | ✅ 145 chars | ✅ | ✅ `servicewindow.app/venues.html` | ✅ | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ | ✅ `servicewindow.app/property.html` | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 116 chars (4 under min) | ✅ | ❌ Missing | ➖ N/A | Canonical missing; description slightly short |
| `terms.html` | ✅ | ❌ 92 chars (under 120) | ✅ | ❌ Missing | ➖ N/A | Description too short; canonical missing |
| `success.html` | ✅ | ❌ 48 chars (far under 120) | ❌ Missing `og:title`/`og:description`/`og:url` (only `og:image` present) | ❌ Missing | ➖ N/A | Description far too short; OG title/description/url missing; canonical missing; `robots` set to `noindex, nofollow` |
| `cancel.html` | ✅ | ❌ 53 chars (far under 120) | ❌ Missing `og:title`/`og:description`/`og:url` (only `og:image` present) | ❌ Missing | ➖ N/A | Description far too short; OG title/description/url missing; canonical missing; `robots` set to `noindex, nofollow` |
| `reset-password.html` | ✅ | ❌ 34 chars (far under 120) | ❌ Missing `og:title`/`og:description`/`og:url` (only `og:image` present) | ❌ Missing | ➖ N/A | Description far too short; OG title/description/url missing; canonical missing; `robots` set to `noindex, nofollow` |

### Legend
✅ Pass · ⚠️ Present but needs improvement · ❌ Fail · ➖ Not required by checklist (only required on `index.html` at minimum)

---
*This is a report-only audit. No HTML files were modified.*
