# SEO & Metadata Audit — ServiceWindow

**Run date:** 2026-09-22
**Pages audited:** 15
**Total issues found:** 27

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 of 15 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. No self-referencing canonical means these pages have no explicit signal to search engines about their preferred URL.
2. **Missing Open Graph tags** (`og:title`, `og:description`, `og:url`) on the three post-action pages — `success.html`, `cancel.html`, `reset-password.html`. Only `og:image` is present on these; shared links to them will render with no title/description in previews.
3. **Meta descriptions outside the 120–160 character target** on 8 pages — `auth.html` (95), `contact.html` (98), `privacy.html` (116), `terms.html` (92), `marketplace.html` (161, 1 over), `success.html` (48), `cancel.html` (53), `reset-password.html` (34). The three post-action pages are far under the range.

Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` carry `<meta name="robots" content="noindex, nofollow">`. This is flagged per the audit checklist (production pages should not be noindexed) but may be an intentional choice for transactional/auth pages that shouldn't rank — confirm intent before treating as a fix.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95 chars, under min) | ✅ | ❌ | ❌ (n/a) | Missing canonical; description too short (95<120); `robots: noindex` set |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98 chars, under min) | ✅ | ✅ | — (n/a) | Description too short (98<120) |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars, under min) | ✅ | ❌ | — (n/a) | Missing canonical; description slightly short (116<120) |
| terms.html | ✅ | ⚠️ (92 chars, under min) | ✅ | ❌ | — (n/a) | Missing canonical; description too short (92<120) |
| success.html | ✅ | ⚠️ (48 chars, under min) | ❌ | ❌ | — (n/a) | Missing og:title/og:description/og:url; missing canonical; description too short; `robots: noindex` set |
| cancel.html | ✅ | ⚠️ (53 chars, under min) | ❌ | ❌ | — (n/a) | Missing og:title/og:description/og:url; missing canonical; description too short; `robots: noindex` set |
| reset-password.html | ✅ | ⚠️ (34 chars, under min) | ❌ | ❌ | — (n/a) | Missing og:title/og:description/og:url; missing canonical; description too short; `robots: noindex` set |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail/missing · — not required for this page (schema markup is only required on `index.html` per the audit spec)

**Scope note:** This is a report only — no HTML files were modified.
