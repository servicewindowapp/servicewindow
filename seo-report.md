# SEO Audit Report — ServiceWindow
**Date:** 2026-04-29
**Auditor:** Automated nightly audit
**Scope:** 15 production HTML pages

---

## Summary

| Metric | Value |
|--------|-------|
| Total pages audited | 15 |
| Pages fully passing | 6 |
| Pages with at least one issue | 9 |
| Total individual issues found | 32 |

### Top 3 Priority Fixes

1. **Add `noindex` to transactional/utility pages** — `success.html`, `cancel.html`, and `reset-password.html` are indexable by Google right now. These pages should have `<meta name="robots" content="noindex, nofollow">`. They also each lack og:title, og:description, og:url, and a canonical tag — the highest defect density in the audit.

2. **Add missing canonical tags (7 pages)** — `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` all have no `<link rel="canonical">`. Canonicals are the primary signal Google uses to resolve duplicate-content ambiguity, especially when pages are accessed with query strings or from social referrers.

3. **Expand short meta descriptions (6 pages)** — Six pages have descriptions well below the 120-char minimum: `auth.html` (97), `contact.html` (100), `terms.html` (94), `success.html` (48), `cancel.html` (53), `reset-password.html` (34). Short descriptions reduce CTR from SERPs and often cause Google to substitute its own snippet.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars (+3) | ✅ | ✅ | ✅ | Description 3 chars over 160-char limit |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ❌ 97 chars | ✅ | ❌ | ⚠️ | Description under 120 chars; missing canonical; schema absent (add noindex) |
| `pricing.html` | ✅ | ✅ 138 chars | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ❌ 100 chars | ✅ | ❌ | ❌ | Description under 120 chars; missing canonical; missing schema |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (-2) | ✅ | ❌ | ⚠️ | Description 2 chars under 120; missing canonical; schema not present |
| `terms.html` | ✅ | ❌ 94 chars | ✅ | ❌ | ⚠️ | Description under 120 chars; missing canonical; schema not present |
| `success.html` | ✅ | ❌ 48 chars | ❌ | ❌ | ⚠️ | Description way too short; og:title/og:description/og:url all missing; missing canonical; **no `noindex`** |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ | ❌ | ⚠️ | Description way too short; og:title/og:description/og:url all missing; missing canonical; **no `noindex`** |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ | ❌ | ⚠️ | Description way too short; og:title/og:description/og:url all missing; missing canonical; **no `noindex`** |

---

## Column Key

| Symbol | Meaning |
|--------|---------|
| ✅ | Pass — present, correct, within spec |
| ⚠️ | Present but needs improvement (out-of-range length, expected-absent schema) |
| ❌ | Fail — missing or critically deficient |

### Column Definitions

- **Title** — `<title>` tag present, non-blank, descriptive
- **Description** — `<meta name="description">` present; ✅ = 120–160 chars, ⚠️ = within 5 chars of bounds, ❌ = absent or significantly out of range
- **OG Tags** — all four of og:title, og:description, og:url, og:image present in `<head>`
- **Canonical** — `<link rel="canonical">` present and pointing to `servicewindow.app` domain
- **Schema** — `<script type="application/ld+json">` present; required on index.html, expected on content pages; ⚠️ = absent on utility/legal/transactional page (lower severity)
- **Robots** — not a column; any `noindex` violations are called out in Issues

---

## Per-Page Detail

### ✅ Clean Pages (no issues)
`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`

### ⚠️ Minor Issues

**`marketplace.html`**
- Meta description is 163 chars — trim 3 characters to stay within the 120–160 range Google uses for snippet display.

**`privacy.html`**
- Meta description is 118 chars — 2 chars under the 120-char lower bound; extend slightly.
- Missing `<link rel="canonical">` — low-priority but worth adding to prevent duplicate indexing if accessed with query strings.

### ❌ Significant Issues

**`auth.html`**
- Meta description: 97 chars — expand to at least 120. Current text ends abruptly.
- Canonical: missing — add `<link rel="canonical" href="https://servicewindow.app/auth.html">`.
- Schema: absent — consider adding or adding a `noindex` since signup/login pages rarely benefit from organic discovery.

**`contact.html`**
- Meta description: 100 chars — expand by 20+ chars.
- Canonical: missing.
- Schema: missing — a `ContactPage` schema type would be appropriate here.

**`terms.html`**
- Meta description: 94 chars — well under minimum.
- Canonical: missing.

**`success.html`** ← highest priority
- Meta description: 48 chars ("You're in. ServiceWindow subscription confirmed.") — insufficient.
- OG tags: og:title, og:description, og:url all absent; only og:image is present.
- Canonical: missing.
- **No `noindex`** — this page should not appear in Google search results. Add `<meta name="robots" content="noindex, nofollow">`.

**`cancel.html`** ← highest priority
- Meta description: 53 chars.
- OG tags: og:title, og:description, og:url all absent.
- Canonical: missing.
- **No `noindex`** — same as success.html; must be excluded from indexing.

**`reset-password.html`** ← highest priority
- Meta description: 34 chars ("Reset your ServiceWindow password.") — near-blank.
- OG tags: og:title, og:description, og:url all absent.
- Canonical: missing.
- **No `noindex`** — password-reset pages must not be indexed; this also presents a minor security posture issue (Google can discover and cache the page).

---

## Issue Count by Type

| Issue Type | Count | Affected Pages |
|------------|-------|----------------|
| Missing canonical | 7 | auth, contact, privacy, terms, success, cancel, reset-password |
| Description too short (< 120 chars) | 6 | auth, contact, terms, success, cancel, reset-password |
| No `noindex` on transactional/utility page | 3 | success, cancel, reset-password |
| Missing OG tags (og:title/desc/url) | 3 pages × 3 tags = 9 | success, cancel, reset-password |
| Missing schema on content page | 1 | contact |
| Description slightly over 160 chars | 1 | marketplace |
| Description borderline under 120 chars | 1 | privacy |
| **Total** | **28** | |
