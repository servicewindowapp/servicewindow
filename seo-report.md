# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-09-18
**Pages audited:** 15 (production pages: index, marketplace, find-trucks, auth, pricing, about, contact, jobs, venues, property, privacy, terms, success, cancel, reset-password)
**Total issues found:** 21
**Report type:** Automated nightly audit — findings only, no fixes applied.

## Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no canonical tag at all.
2. **Fix meta description length on 8 pages** — `marketplace.html` is 3 chars over the 160 max; `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` are well under the 120 min (several under 100 chars, `reset-password.html` is only 34).
3. **Add `og:title` / `og:description` / `og:url` to `success.html`, `cancel.html`, `reset-password.html`** — these three only set `og:image`, so any social share of a checkout/reset link renders with no title or description.

*Secondary note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. Per the audit's own item 9 this reads as a fail, but these are login/checkout/reset flow pages — noindex is very likely intentional to keep transactional URLs out of search results. Flagged for confirmation, not treated as a bug.

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars — 3 over max) | ✅ | ✅ | ✅ | Description 3 chars over 160-char limit |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars — under min) | ✅ | ❌ | ➖ (not required) | No canonical tag; description under 120 chars; `robots: noindex, nofollow` present (likely intentional for a login page — confirm) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars — under min) | ✅ | ✅ | ➖ (not required) | Description under 120 chars |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars — 2 under min) | ✅ | ❌ | ➖ (not required) | No canonical tag; description 2 chars short of 120 min |
| terms.html | ✅ | ⚠️ (94 chars — well under min) | ✅ | ❌ | ➖ (not required) | No canonical tag; description well under 120 chars |
| success.html | ✅ | ⚠️ (48 chars — well under min) | ❌ (only og:image set) | ❌ | ➖ (not required) | Missing og:title/og:description/og:url; no canonical; description far under 120 chars; `robots: noindex` present (likely intentional post-checkout page — confirm) |
| cancel.html | ✅ | ⚠️ (53 chars — well under min) | ❌ (only og:image set) | ❌ | ➖ (not required) | Missing og:title/og:description/og:url; no canonical; description far under 120 chars; `robots: noindex` present (likely intentional post-checkout page — confirm) |
| reset-password.html | ✅ | ⚠️ (34 chars — well under min) | ❌ (only og:image set) | ❌ | ➖ (not required) | Missing og:title/og:description/og:url; no canonical; description far under 120 chars; `robots: noindex` present (likely intentional for a reset-password page — confirm) |

**Legend:** ✅ pass · ⚠️ present but needs improvement · ❌ fail · ➖ not applicable / not required by spec (schema.org markup is only required on `index.html` per this audit's checklist)

**Notes:**
- All `og:url` and `<link rel="canonical">` values that are present correctly use the `servicewindow.app` domain — no domain-mismatch issues found.
- `index.html` carries `application/ld+json` structured data as required; `marketplace.html` and `find-trucks.html` each carry two JSON-LD blocks.
- No production page in scope sets `<meta name="robots" content="noindex">` unintentionally as far as can be determined from content — the four noindex pages found (`auth`, `success`, `cancel`, `reset-password`) are all transactional/account flow pages, not content pages meant to rank.
