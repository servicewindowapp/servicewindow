# SEO & Metadata Audit — ServiceWindow

**Generated:** 2026-08-26 (automated nightly audit)
**Scope:** 15 production HTML pages
**Report only — no HTML files were modified.**

## Summary

- **Pages audited:** 15
- **Total issues found:** 21 (❌ failures across all pages/checks)
- **Pages with zero issues:** 7 (`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`)

### Top 3 priority fixes

1. **Missing `<link rel="canonical">`** on 6 pages — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. No canonical tag increases duplicate-content risk and is the single most common failure in this audit.
2. **Missing Open Graph tags** (`og:title`, `og:description`, `og:url`) on `success.html`, `cancel.html`, `reset-password.html` — only `og:image` is present on these three. Social shares/link previews of these pages will render with no title or description.
3. **Meta description length out of range** on 7 pages — too short (<120 chars) on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`, and too long (163 chars) on `marketplace.html`. Short descriptions get auto-expanded by Google (unpredictable snippet); long ones get truncated.

**Note on `robots noindex`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This fails check #9 literally (these are in the audited production-page list), but noindexing transactional/utility pages (login, post-Stripe redirects, password reset) is standard SEO practice to keep thin/duplicate content out of search results. Flagged for visibility, not necessarily a bug — confirm intent before changing.

---

## Detail

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ⚠️ (160/160 — at max limit) | ✅ | ✅ `servicewindow.app` | ✅ (ld+json present) | Description is exactly at the 160-char ceiling — no margin before Google truncates. |
| `marketplace.html` | ✅ | ❌ (163 chars — over limit) | ✅ | ✅ | ✅ | Meta description exceeds 160 chars by 3 — trim. |
| `find-trucks.html` | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None. |
| `auth.html` | ✅ | ❌ (97 chars — under limit) | ✅ | ❌ Missing | ⚠️ Not present (not required off index) | Description too short (97 chars); no canonical tag; `robots: noindex, nofollow` set (likely intentional). |
| `pricing.html` | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None. |
| `about.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None. |
| `contact.html` | ✅ | ❌ (100 chars — under limit) | ✅ | ✅ | ⚠️ Not present | Description too short (100 chars). |
| `jobs.html` | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None. |
| `venues.html` | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None. |
| `property.html` | ⚠️ (73 chars — long, may truncate in SERPs) | ✅ (156 chars) | ✅ | ✅ | ✅ | Title runs long (73 chars); consider shortening for SERP display. |
| `privacy.html` | ✅ | ❌ (118 chars — 2 under limit) | ✅ | ❌ Missing | ⚠️ Not present | Description 2 chars short of 120 minimum; no canonical tag. |
| `terms.html` | ✅ | ❌ (94 chars — under limit) | ✅ | ❌ Missing | ⚠️ Not present | Description too short (94 chars); no canonical tag. |
| `success.html` | ✅ | ❌ (48 chars — well under limit) | ❌ Missing `og:title`/`og:description`/`og:url` (only `og:image` present) | ❌ Missing | ⚠️ Not present | Description far too short; OG title/description/url missing; no canonical; `robots: noindex, nofollow` set (likely intentional). |
| `cancel.html` | ✅ | ❌ (53 chars — well under limit) | ❌ Missing `og:title`/`og:description`/`og:url` (only `og:image` present) | ❌ Missing | ⚠️ Not present | Description far too short; OG title/description/url missing; no canonical; `robots: noindex, nofollow` set (likely intentional). |
| `reset-password.html` | ✅ | ❌ (34 chars — well under limit) | ❌ Missing `og:title`/`og:description`/`og:url` (only `og:image` present) | ❌ Missing | ⚠️ Not present | Description far too short; OG title/description/url missing; no canonical; `robots: noindex, nofollow` set (likely intentional). |

---

## Check methodology

1. `<title>` — checked for presence and non-placeholder content.
2. `<meta name="description">` — checked for presence and 120–160 character length.
3. `og:title`, `og:description`, `og:url` (checked for `servicewindow.app` domain), `og:image` — checked for presence.
4. `<link rel="canonical">` — checked for presence and `servicewindow.app` domain.
5. `<script type="application/ld+json">` — checked for presence (required minimum on `index.html`; nice-to-have elsewhere).
6. `<meta name="robots">` — checked for `noindex` on any of the 15 audited pages.
