# SEO & Metadata Audit — 2026-08-12

**Pages audited:** 15
**Total issues found:** 15
**Checks:** `<title>` · meta description (120–160 chars) · og:title · og:description · og:url (domain) · og:image · canonical (domain) · JSON-LD schema · robots (no noindex on production pages)

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on `auth.html`, `privacy.html`, `terms.html`.** These are indexable production pages with no canonical tag at all — highest-impact gap, add immediately.
2. **`success.html`, `cancel.html`, `reset-password.html` are missing `og:title`, `og:description`, and `og:url`** — only `og:image` is set, so any link shared to these pages (e.g. a support/troubleshooting share) renders a broken/empty social card.
3. **Several meta descriptions fall outside the 120–160 char target** — `auth.html` (95), `contact.html` (98), `terms.html` (92), `privacy.html` (116) are under-length; `marketplace.html` (161) is 1 char over. Under-length descriptions waste SERP snippet space.

*Note on robots:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This audit's check #9 flags noindex on any page in the audited list, but for these four (auth/login form, post-Stripe success/cancel, password reset) noindex is standard, intentional practice — flagged below for completeness, not recommended for removal.

---

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ 161 chars (1 over limit) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ 95 chars (under 120) | ✅ | ❌ missing | ⚠️ none | Missing canonical; description too short; `noindex` present (likely intentional for login page) |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ 98 chars (under 120) | ✅ | ✅ | ⚠️ none | Description too short; no schema (optional) |
| jobs.html | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ | Title is 71 chars — risks SERP truncation (not in checklist scope, noted) |
| privacy.html | ✅ | ⚠️ 116 chars (under 120) | ✅ | ❌ missing | ⚠️ none | Missing canonical; description slightly short |
| terms.html | ✅ | ⚠️ 92 chars (under 120) | ✅ | ❌ missing | ⚠️ none | Missing canonical; description too short |
| success.html | ✅ | ⚠️ 48 chars (well under 120) | ❌ og:title/description/url missing | ⚠️ missing (noindex, low priority) | ⚠️ none | Incomplete OG tags; `noindex` present (intentional, post-checkout page) |
| cancel.html | ✅ | ⚠️ 53 chars (well under 120) | ❌ og:title/description/url missing | ⚠️ missing (noindex, low priority) | ⚠️ none | Incomplete OG tags; `noindex` present (intentional) |
| reset-password.html | ✅ | ⚠️ 34 chars (well under 120) | ❌ og:title/description/url missing | ⚠️ missing (noindex, low priority) | ⚠️ none | Incomplete OG tags; `noindex` present (intentional) |

---

### Notes
- `og:image` (`https://servicewindow.app/og-image.png`, 1200×630 PNG) resolves and is set correctly on all 15 pages.
- `og:url` and canonical URLs (where present) consistently use the `servicewindow.app` domain — no domain mismatches found.
- JSON-LD schema requirement (index.html minimum) is met — `index.html` carries `WebSite`, `Organization`, and `OfferCatalog` schema. Several other pages (`marketplace`, `find-trucks`, `pricing`, `jobs`, `venues`, `property`) also carry schema as a bonus; legal/utility pages (`privacy`, `terms`, `contact`, `auth`, `success`, `cancel`, `reset-password`) have none, which is acceptable since schema is only required on `index.html`.
- No production page unexpectedly carries `noindex` — the only pages with `noindex` are `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`, all of which are standard candidates for noindex (auth form / post-transaction / password-reset utility pages).

Report only — no HTML files were modified.
