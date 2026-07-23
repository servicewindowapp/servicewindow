# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-23
**Pages audited:** 15 production pages
**Total issues found:** 20

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on 3 pages** — `auth.html`, `privacy.html`, `terms.html` have no canonical tag at all. This risks duplicate-content signals and is a quick, high-value fix (single line per file).
2. **Meta descriptions outside the 120–160 char target on 8 pages** — `terms.html` (94), `success.html` (48), `reset-password.html` (34), `cancel.html` (53), `auth.html` (97), `contact.html` (100), `privacy.html` (118), and `marketplace.html` (163, slightly over). Short descriptions get rewritten by Google in search results; the transactional pages (success/cancel/reset-password) are lowest priority since they're `noindex`.
3. **Incomplete Open Graph tags on transactional pages** — `success.html`, `cancel.html`, `reset-password.html` only have `og:image`; they're missing `og:title`, `og:description`, and `og:url`. Low SEO impact (all three are `noindex`), but link previews (e.g., in confirmation emails/Slack) will render blank/generic.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars — 3 over max) | ✅ | ✅ | ✅ | Description slightly over 160 char target |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars — under min) | ✅ | ❌ Missing | ⚠️ None found | No canonical tag; description under 120 char target; `robots: noindex` present (appears intentional for a login page, flagging per checklist) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars — under min) | ✅ | ✅ | ⚠️ None found | Description under 120 char target; no JSON-LD schema (other public pages have it) |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars — 2 under min) | ✅ | ❌ Missing | ⚠️ None found | No canonical tag; description just under 120 char target; no schema |
| terms.html | ✅ | ❌ (94 chars — well under min) | ✅ | ❌ Missing | ⚠️ None found | No canonical tag; description too short; no schema |
| success.html | ✅ | ❌ (48 chars) | ⚠️ og:image only | ❌ Missing | ⚠️ None found | Missing og:title/og:description/og:url; no canonical; short description — all low priority, page is `noindex` (intentional, post-checkout) |
| cancel.html | ✅ | ❌ (53 chars) | ⚠️ og:image only | ❌ Missing | ⚠️ None found | Same pattern as success.html — low priority, `noindex` (intentional) |
| reset-password.html | ✅ | ❌ (34 chars) | ⚠️ og:image only | ❌ Missing | ⚠️ None found | Same pattern as success.html — low priority, `noindex` (intentional) |

---

## Notes

- **Robots/noindex:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. These are transactional/utility pages (login, post-Stripe confirmation, password reset) where noindex is standard practice, not a defect — flagged here per the audit checklist, not as a recommended fix.
- **Schema markup:** Present on `index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html`. Absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and the three `noindex` utility pages — acceptable per the checklist's minimum bar (index.html only), but worth aligning `contact.html`/`privacy.html`/`terms.html` with the rest of the site for consistency.
- **OG URL domain:** All `og:url` and canonical values present correctly point to `servicewindow.app` — no domain mismatches found.
- This is a report-only audit. No HTML files were modified.
