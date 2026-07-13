# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-13
**Pages audited:** 15
**Total issues found:** 27

## Top 3 Priority Fixes

1. **`success.html`, `cancel.html`, `reset-password.html` are missing OG title/description/url and canonical tags entirely.** These three pages account for 18 of the 27 issues found. They also carry `noindex, nofollow` — likely intentional for post-checkout/auth flows, but worth an explicit sign-off since it fails audit check #9 as written.
2. **`terms.html` and `privacy.html` have no `<link rel="canonical">` tag** and both meta descriptions fall under the 120-char minimum (94 and 118 chars). Missing canonicals on legal pages is a duplicate-content risk if these are ever reachable via multiple URLs/query params.
3. **`auth.html` has no canonical tag and a meta description of only 97 characters** (below the 120–160 target range), and also carries `noindex, nofollow` — confirm this is deliberate rather than left over from a template.

Secondary, lower-severity: `marketplace.html`'s description is 163 characters (3 over the 160 max); `contact.html`'s description is 100 characters (short of the 120 minimum).

---

## Audit Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ (servicewindow.app) | ✅ (ld+json present) | None |
| `marketplace.html` | ✅ | ⚠️ (163 chars — 3 over max) | ✅ | ✅ | ✅ | Description 3 chars over 160-char max |
| `find-trucks.html` | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ (97 chars — under min) | ✅ | ❌ missing | ⚠️ none (not required, index-only) | Description under 120-char min (97); missing canonical; `robots: noindex, nofollow` set (confirm intentional) |
| `pricing.html` | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ (100 chars — under min) | ✅ | ✅ | ⚠️ none (not required) | Description under 120-char min (100) |
| `jobs.html` | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (118 chars — 2 under min) | ✅ | ❌ missing | ⚠️ none (not required) | Description 2 chars under 120 min; missing canonical |
| `terms.html` | ✅ | ⚠️ (94 chars — under min) | ✅ | ❌ missing | ⚠️ none (not required) | Description under 120-char min (94); missing canonical |
| `success.html` | ✅ | ❌ (48 chars — well under min) | ❌ missing og:title, og:description, og:url (og:image only) | ❌ missing | ⚠️ none (not required) | Description far under 120-char min (48); missing og:title/og:description/og:url; missing canonical; `robots: noindex, nofollow` set (likely intentional — post-checkout page) |
| `cancel.html` | ✅ | ❌ (53 chars — well under min) | ❌ missing og:title, og:description, og:url (og:image only) | ❌ missing | ⚠️ none (not required) | Description far under 120-char min (53); missing og:title/og:description/og:url; missing canonical; `robots: noindex, nofollow` set (likely intentional — post-checkout page) |
| `reset-password.html` | ✅ | ❌ (34 chars — well under min) | ❌ missing og:title, og:description, og:url (og:image only) | ❌ missing | ⚠️ none (not required) | Description far under 120-char min (34); missing og:title/og:description/og:url; missing canonical; `robots: noindex, nofollow` set (likely intentional — auth flow page) |

---

## Notes

- **Schema markup** (check #8) is only required on `index.html` at minimum — that requirement passes (1 `application/ld+json` block found). `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` also carry schema blocks, which is a bonus, not a requirement. Pages marked ⚠️ in the Schema column simply have none, which is not a failure per the audit scope — flagged only as a possible future enhancement.
- **`og:image`** is present and points to `https://servicewindow.app/og-image.png` on all 15 pages — no issues found for this check.
- **Robots noindex** (check #9) was found on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. All four are transactional/auth pages where `noindex` is a defensible, common pattern — flagged here per the literal audit criteria, not necessarily a defect. No canonical/OG fixes were made to these pages; this report is audit-only.
- This report does not modify any HTML files. All findings above require a follow-up change to be resolved.
