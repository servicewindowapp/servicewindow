# SEO Audit Report — servicewindow.app
**Generated:** 2026-05-09  
**Auditor:** Automated nightly audit  
**Pages audited:** 15  
**Total issues found:** 30 (9 ❌ failures, 21 ⚠️ warnings)

---

## Summary

| Stat | Count |
|------|-------|
| Pages audited | 15 |
| Pages fully clean | 6 |
| Pages with failures (❌) | 7 |
| Pages with warnings only (⚠️) | 6 |
| Total distinct issues | 30 |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to 7 pages** — `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` are all missing canonical tags. This is the largest SEO risk: without canonicals, Google may treat these URLs as ambiguous or duplicate.

2. **Add `<meta name="robots" content="noindex, nofollow">` to transactional/utility pages** — `success.html`, `cancel.html`, and `reset-password.html` are Stripe callback and account-utility pages that should not appear in search results. `auth.html` should also be noindexed. None have this tag.

3. **Complete the OG tag set on `success.html`, `cancel.html`, `reset-password.html`** — These three pages have only `og:image`; they are missing `og:title`, `og:description`, and `og:url`. If a user shares one of these URLs (e.g., the success page), the social card will be blank.

---

## Audit Table

Legend: ✅ Pass · ❌ Fail (missing or wrong) · ⚠️ Present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ⚠️ 160 chars (at ceiling) | ✅ all 4 | ✅ | ✅ | ✅ | Description exactly at 160-char limit; trim 1–2 words for comfort |
| `marketplace.html` | ✅ | ⚠️ 163 chars (3 over) | ✅ all 4 | ✅ | ✅ | ✅ | Description exceeds 160-char limit by 3 chars; will truncate in SERPs |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars (under 120) | ✅ all 4 | ❌ missing | ❌ missing | ⚠️ should noindex | Short description; missing canonical; missing schema; auth page should have `noindex` |
| `pricing.html` | ✅ | ✅ 138 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars (under 120) | ✅ all 4 | ❌ missing | ❌ missing | ✅ | Short description; missing canonical; missing schema (LocalBusiness opportunity) |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ all 4 | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (2 under) | ✅ all 4 | ❌ missing | ⚠️ absent | ✅ | Description 2 chars below 120 minimum; missing canonical; no schema (low priority for legal page) |
| `terms.html` | ✅ | ⚠️ 94 chars (under 120) | ✅ all 4 | ❌ missing | ⚠️ absent | ✅ | Short description (94 chars); missing canonical; no schema (low priority for legal page) |
| `success.html` | ✅ | ⚠️ 48 chars (very short) | ❌ og:title/description/url missing; og:image only | ❌ missing | ⚠️ absent | ⚠️ should noindex | Very short description; 3 of 4 OG tags missing; missing canonical; Stripe callback page should have `noindex` |
| `cancel.html` | ✅ | ⚠️ 53 chars (very short) | ❌ og:title/description/url missing; og:image only | ❌ missing | ⚠️ absent | ⚠️ should noindex | Very short description; 3 of 4 OG tags missing; missing canonical; Stripe callback page should have `noindex` |
| `reset-password.html` | ✅ | ⚠️ 34 chars (very short) | ❌ og:title/description/url missing; og:image only | ❌ missing | ⚠️ absent | ⚠️ should noindex | Very short description (34 chars); 3 of 4 OG tags missing; missing canonical; utility page should have `noindex` |

---

## Per-Check Rollup

| Check | Pass ✅ | Warning ⚠️ | Fail ❌ |
|-------|--------|-----------|--------|
| `<title>` — present and descriptive | 15 | 0 | 0 |
| `<meta name="description">` — 120–160 chars | 6 | 9 | 0 |
| `og:title` | 12 | 0 | 3 |
| `og:description` | 12 | 0 | 3 |
| `og:url` (servicewindow.app domain) | 12 | 0 | 3 |
| `og:image` | 15 | 0 | 0 |
| `<link rel="canonical">` (servicewindow.app domain) | 8 | 0 | 7 |
| Schema `<script type="application/ld+json">` | 8 | 5 | 2 |
| `<meta name="robots">` — not noindex | 15 | 4 (should add noindex) | 0 |

> Schema ⚠️: `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` have no schema markup — acceptable for legal/transactional pages, but flagged for completeness. Schema ❌: `auth.html` and `contact.html` are content-adjacent pages where schema would provide signal.

---

## Pages With Zero Issues

- `find-trucks.html`
- `pricing.html`
- `about.html`
- `jobs.html`
- `venues.html`
- `property.html`
