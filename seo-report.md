# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-24
**Pages audited:** 15 production HTML pages
**Total issues found:** 17
**Scope note:** Report only — no HTML files were modified.

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` currently have no canonical tag at all. This is the single most common gap across the audit.
2. **Restore full Open Graph tags on the 3 checkout/utility pages** — `success.html`, `cancel.html`, and `reset-password.html` only emit `og:image`; `og:title`, `og:description`, and `og:url` are missing, so any shared link (e.g. a post-checkout screenshot or support link) renders a broken preview.
3. **Expand thin meta descriptions to the 120–160 char range** — 7 pages (`auth`, `contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) are under 120 characters, several drastically so (`reset-password.html` is 34 chars). `marketplace.html` is 1 character over 160 (161) — trivial trim.

## Findings

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | og:url (`servicewindow.app`) and canonical (`servicewindow.app/`) differ by trailing slash — cosmetic |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160-char max |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ Missing | N/A | No canonical tag; description under 120 chars; `robots: noindex, nofollow` set (appears intentional for a login/signup page — confirm) |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ❌ Not present | Description under 120 chars; no JSON-LD (not required outside index.html, but a low-effort `ContactPage`/`Organization` block would help) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ Missing | N/A | No canonical tag; description under 120 chars |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ Missing | N/A | No canonical tag; description under 120 chars |
| success.html | ✅ | ❌ (48) | ❌ Missing (only og:image) | ❌ Missing | N/A | Missing og:title/og:description/og:url; no canonical; description far under 120 chars. `robots: noindex, nofollow` present (intentional post-checkout page) |
| cancel.html | ✅ | ❌ (53) | ❌ Missing (only og:image) | ❌ Missing | N/A | Same gaps as success.html; `robots: noindex, nofollow` present (intentional) |
| reset-password.html | ✅ | ❌ (34) | ❌ Missing (only og:image) | ❌ Missing | N/A | Same gaps as success.html; `robots: noindex, nofollow` present (intentional) |

## Notes

- **Titles:** all 15 pages have unique, descriptive, non-placeholder `<title>` tags. No issues.
- **Robots:** `auth.html`, `success.html`, `cancel.html`, `reset-password.html` are set to `noindex, nofollow`. These are transactional/utility pages (login, post-Stripe redirects, password reset) — this is standard practice and likely intentional, not a defect, but flagged per audit checklist item 9 for confirmation since they're in the production page list.
- **Schema markup:** required minimum (index.html) is met — both `WebSite` and `Organization` JSON-LD are present and populated. `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html` also carry their own JSON-LD. Policy/utility pages (`contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`, `auth`) have none — not required by the checklist, listed as N/A.
- **Domain consistency:** every `og:url` and `canonical` tag that is present correctly uses the `servicewindow.app` production domain — no staging/localhost leaks found.
