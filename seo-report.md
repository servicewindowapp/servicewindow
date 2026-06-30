# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-06-30
**Pages audited:** 15
**Total issues found:** 27 (across 8 of 15 pages)

## Top 3 Priority Fixes

1. **Add missing `<link rel="canonical">` tags** — absent on 6 pages (`auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`). `privacy.html` and `terms.html` are indexable production pages, so this is the most urgent gap — without it, Google has no signal for the preferred URL on legal pages that can be reached via multiple paths.
2. **Fix meta description lengths** — 8 pages fall outside the 120–160 character target: `terms.html` (92), `contact.html` (98), `auth.html` (95), `privacy.html` (116, borderline), and `marketplace.html` (161, one character over). Short descriptions get auto-rewritten by Google in search results, hurting CTR.
3. **Complete Open Graph tag sets on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` each have only `og:image`; `og:title`, `og:description`, and `og:url` are all missing, so any link share of these post-checkout/reset URLs renders with no title or summary.

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ servicewindow.app | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over limit) | ✅ | ✅ servicewindow.app | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ servicewindow.app | ✅ | None |
| auth.html | ✅ | ❌ (95 chars, too short) | ✅ | ❌ missing | — (not required) | Missing canonical; description too short; `robots: noindex` (likely intentional — auth page) |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ servicewindow.app | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ servicewindow.app | ✅ | None |
| contact.html | ✅ | ❌ (98 chars, too short) | ✅ | ✅ servicewindow.app | — (not required) | Description too short |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ servicewindow.app | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ servicewindow.app | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ servicewindow.app | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars, slightly short) | ✅ | ❌ missing | — (not required) | Missing canonical; description slightly short |
| terms.html | ✅ | ❌ (92 chars, too short) | ✅ | ❌ missing | — (not required) | Missing canonical; description too short |
| success.html | ✅ | ❌ (48 chars, too short) | ⚠️ og:image only | ❌ missing | — (not required) | Missing canonical; missing og:title/og:description/og:url; description too short; `robots: noindex` (likely intentional — post-checkout page) |
| cancel.html | ✅ | ❌ (53 chars, too short) | ⚠️ og:image only | ❌ missing | — (not required) | Missing canonical; missing og:title/og:description/og:url; description too short; `robots: noindex` (likely intentional — post-checkout page) |
| reset-password.html | ✅ | ❌ (34 chars, too short) | ⚠️ og:image only | ❌ missing | — (not required) | Missing canonical; missing og:title/og:description/og:url; description too short; `robots: noindex` (likely intentional — auth-flow page) |

## Notes

- Schema (`application/ld+json`) is only required on `index.html` per audit scope; it is present there (and as a bonus on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`). It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and the three transactional pages — not flagged as a failure since not required on those pages.
- `robots: noindex` appears on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. These are account/transactional flows, so `noindex` is plausibly intentional rather than a bug — flagged here per the audit checklist for visibility, not as a recommended fix.
- All present canonical and `og:url` tags correctly point to the `servicewindow.app` domain — no domain mismatches found.
- This is a report-only audit. No HTML files were modified.
