# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-08-17
**Pages audited:** 15
**Total issues found:** 28
**Scope:** Production HTML pages listed in the audit request. Report only — no files were modified.

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Canonical tags prevent duplicate-content ambiguity and should be added even on noindex/utility pages for consistency.
2. **Meta descriptions outside the 120–160 character target** on 7 pages — `auth.html` (97), `contact.html` (100), `privacy.html` (118, borderline), `terms.html` (94), `success.html` (48), `cancel.html` (53), `reset-password.html` (34). Short descriptions get overwritten by Google with auto-generated snippets, hurting CTR.
3. **`marketplace.html` description runs 3 characters over the 160 max** (163 chars) — minor truncation risk in SERPs; trim to fit.

**Secondary note:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` carry `<meta name="robots" content="noindex, nofollow">`. This is flagged per the audit checklist (item 9) but is likely intentional for a login/checkout-result/password-reset flow — confirm this is deliberate rather than leftover from testing.

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ 163 chars (3 over max) | ✅ | ✅ | ✅ | Description over 160-char limit |
| find-trucks.html | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ 97 chars (under min) | ✅ | ❌ Missing | ⚠️ None present | Description too short; no canonical; no schema; `noindex` set (verify intentional) |
| pricing.html | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ 100 chars (under min) | ✅ | ✅ | ⚠️ None present | Description too short; no schema markup |
| jobs.html | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ 118 chars (2 under min) | ✅ | ❌ Missing | ⚠️ None present | Description slightly short; no canonical; no schema |
| terms.html | ✅ | ❌ 94 chars (under min) | ✅ | ❌ Missing | ⚠️ None present | Description too short; no canonical; no schema |
| success.html | ✅ | ❌ 48 chars (under min) | ❌ og:title/description/url missing (og:image only) | ❌ Missing | ⚠️ None present | Description far too short; incomplete OG tags; no canonical; no schema; `noindex` set (verify intentional) |
| cancel.html | ✅ | ❌ 53 chars (under min) | ❌ og:title/description/url missing (og:image only) | ❌ Missing | ⚠️ None present | Description far too short; incomplete OG tags; no canonical; no schema; `noindex` set (verify intentional) |
| reset-password.html | ✅ | ❌ 34 chars (under min) | ❌ og:title/description/url missing (og:image only) | ❌ Missing | ⚠️ None present | Description far too short; incomplete OG tags; no canonical; no schema; `noindex` set (verify intentional) |

---

## Notes

- **Title tags**: all 15 pages have a present, descriptive, non-placeholder `<title>`. No issues found.
- **Schema markup (`application/ld+json`)**: present and required on `index.html` (1 block) per audit item 8 — passes. Also present on `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`. Absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` — flagged ⚠️ (not required by the audit spec on these pages, but worth considering for `contact.html` as a `ContactPage`/`Organization` reference).
- **og:url domain check**: every page with an `og:url` tag correctly points to the `servicewindow.app` domain. No mismatches found.
- **Canonical domain check**: every page with a canonical tag correctly uses `servicewindow.app`. No mismatches found.
- **robots noindex**: found on `auth.html`, `success.html`, `cancel.html`, `reset-password.html`. All four are login/checkout-result/password-reset utility pages — plausible by design, but explicitly called out per audit item 9 since they're on the production page list.
