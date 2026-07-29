# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-29
**Pages audited:** 15
**Total issues found:** 15 (plus 4 informational `noindex` flags on transactional/utility pages — see note below)

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all. This is the single biggest structural gap in the audit.
2. **Complete the Open Graph set on `success.html`, `cancel.html`, `reset-password.html`** — each currently ships only `og:image`; `og:title`, `og:description`, and `og:url` are missing, so shared/preview links for these pages render broken or generic.
3. **Fix meta description lengths outside the 120–160 char target** — too short: `auth.html` (95), `contact.html` (98), `terms.html` (92), `reset-password.html` (34); too long: `marketplace.html` (161, 1 char over).

**Note on `robots noindex`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. Per the audit's check #9 this is flagged since these are production pages, but noindexing an auth screen and post-Stripe success/cancel/reset-password pages is standard practice (no unique indexable content, avoids duplicate/thin-content pages in search results). Flagged for visibility, not counted as one of the 15 core issues above.

---

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ | Trim description by 1+ char |
| `find-trucks.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ❌ (95 chars, too short) | ✅ | ❌ Missing | ➖ n/a | Missing canonical; description too short; `noindex` set (expected for auth page) |
| `pricing.html` | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ❌ (98 chars, too short) | ✅ | ✅ | ➖ n/a | Description too short |
| `jobs.html` | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (116 chars, slightly short) | ✅ | ❌ Missing | ➖ n/a | Missing canonical; description a bit short |
| `terms.html` | ✅ | ❌ (92 chars, too short) | ✅ | ❌ Missing | ➖ n/a | Missing canonical; description too short |
| `success.html` | ✅ | ❌ (48 chars, too short) | ❌ Only `og:image` present | ❌ Missing | ➖ n/a | Missing canonical; missing og:title/description/url; `noindex` set (expected) |
| `cancel.html` | ✅ | ❌ (53 chars, too short) | ❌ Only `og:image` present | ❌ Missing | ➖ n/a | Missing canonical; missing og:title/description/url; `noindex` set (expected) |
| `reset-password.html` | ✅ | ❌ (34 chars, too short) | ❌ Only `og:image` present | ❌ Missing | ➖ n/a | Missing canonical; missing og:title/description/url; description very short; `noindex` set (expected) |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail · ➖ not present, not required by this audit (schema markup is only mandated on `index.html` per check #8)

---

## Notes

- All 15 pages have a present, descriptive `<title>` — no blanks or placeholders found.
- No production page uses a domain other than `servicewindow.app` in `og:url` or canonical tags where present.
- Schema (`application/ld+json`) markup is present on `index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` — exceeding the minimum requirement (index.html only). It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html`, which is acceptable per the audit criteria but could be a future enhancement for `contact.html` (e.g. `ContactPage` schema).
- This is a report-only audit — no HTML files were modified.
