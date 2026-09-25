# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-09-25
**Pages audited:** 15
**Total issues found:** 21

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 of 15 pages (`auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`) — risks duplicate-content ambiguity for search engines.
2. **Missing Open Graph tags on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` are each missing `og:title`, `og:description`, and `og:url` (only `og:image` is present), so links to these pages render broken/incomplete previews when shared.
3. **Meta description length out of the 120–160 char range** on 8 of 15 pages — `auth.html` (95), `contact.html` (98), `privacy.html` (116), `terms.html` (92), `success.html` (48), `cancel.html` (53), and `reset-password.html` (34) are too short (weak/truncated search snippets); `marketplace.html` (161) is 1 character over.

Note: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` also carry `<meta name="robots" content="noindex, nofollow">`. This appears to be an intentional choice for transactional/auth pages, but is flagged per the audit checklist since these are listed as production pages — confirm this is desired before relying on it.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 — 1 over max) | ✅ | ✅ | ✅ | Description 1 char over 160 max |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95 — too short) | ✅ | ❌ Missing | ➖ (not required) | Description too short; canonical missing; `robots: noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98 — too short) | ✅ | ✅ | ➖ (not required) | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 — too short) | ✅ | ❌ Missing | ➖ (not required) | Description slightly short; canonical missing |
| terms.html | ✅ | ⚠️ (92 — too short) | ✅ | ❌ Missing | ➖ (not required) | Description too short; canonical missing |
| success.html | ✅ | ⚠️ (48 — too short) | ❌ Missing title/desc/url | ❌ Missing | ➖ (not required) | Description too short; OG title/description/url missing; canonical missing; `robots: noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53 — too short) | ❌ Missing title/desc/url | ❌ Missing | ➖ (not required) | Description too short; OG title/description/url missing; canonical missing; `robots: noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34 — too short) | ❌ Missing title/desc/url | ❌ Missing | ➖ (not required) | Description too short; OG title/description/url missing; canonical missing; `robots: noindex, nofollow` |

## Legend
- ✅ Pass
- ⚠️ Present but needs improvement
- ❌ Fail / missing
- ➖ Not required by checklist (schema markup is only mandated on `index.html`; other pages simply don't have it)

## Check Reference
1. `<title>` — present and descriptive
2. `<meta name="description">` — present, 120–160 characters
3. `<meta property="og:title">` — present
4. `<meta property="og:description">` — present
5. `<meta property="og:url">` — present, `servicewindow.app` domain
6. `<meta property="og:image">` — present
7. `<link rel="canonical">` — present, `servicewindow.app` domain
8. Schema markup (`<script type="application/ld+json">`) — required at minimum on `index.html`
9. `<meta name="robots">` — should not be `noindex` on production pages

This is a report only — no HTML files were modified.
