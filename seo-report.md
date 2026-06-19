# ServiceWindow — Nightly SEO Audit
**Date:** 2026-06-19  
**Pages audited:** 15  
**Total issues found:** 29 (11 on public indexable pages · 18 expected/intentional on noindex utility pages)

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing | 6 |
| Pages with issues | 9 |
| Critical issues (public pages) | 11 |
| Utility-page issues (noindex, expected) | 18 |

### Top 3 Priority Fixes

1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`** — both are public, indexable pages missing canonical tags, which risks duplicate-content signals if crawlers hit them via alternate URLs.
2. **Extend meta descriptions on `terms.html` (94 chars), `contact.html` (100 chars), and `auth.html` (97 chars)** — all fall below the 120-character minimum, wasting SERP real estate.
3. **Add structured data (`<script type="application/ld+json">`) to `contact.html`, `privacy.html`, and `terms.html`** — these are the only public, indexable pages without any schema markup.

---

## Page-by-Page Audit

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ all 4 present | ✅ servicewindow.app | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars (3 over limit) | ✅ all 4 present | ✅ servicewindow.app | ✅ | Description 3 chars over 160-char max |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ all 4 present | ✅ servicewindow.app | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars (under 120) | ✅ all 4 present | ❌ missing | ❌ none | noindex ⚠️ (intentional for auth); description too short; canonical missing |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ all 4 present | ✅ servicewindow.app | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ all 4 present | ✅ servicewindow.app | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars (under 120) | ✅ all 4 present | ✅ servicewindow.app | ❌ none | Description too short; no schema markup |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ all 4 present | ✅ servicewindow.app | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ all 4 present | ✅ servicewindow.app | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ all 4 present | ✅ servicewindow.app | ✅ | None |
| `privacy.html` | ✅ | ✅ 118 chars | ✅ all 4 present | ❌ missing | ❌ none | Canonical missing; no schema markup |
| `terms.html` | ✅ | ⚠️ 94 chars (under 120) | ✅ all 4 present | ❌ missing | ❌ none | Description too short; canonical missing; no schema markup |
| `success.html` | ✅ | ⚠️ 48 chars | ❌ og:title, og:description, og:url missing | ❌ missing | ❌ none | noindex (intentional post-payment page); OG tags incomplete; description too short |
| `cancel.html` | ✅ | ⚠️ 53 chars | ❌ og:title, og:description, og:url missing | ❌ missing | ❌ none | noindex (intentional post-payment page); OG tags incomplete; description too short |
| `reset-password.html` | ✅ | ⚠️ 34 chars | ❌ og:title, og:description, og:url missing | ❌ missing | ❌ none | noindex (intentional utility page); OG tags incomplete; description too short |

---

## Issue Detail

### Public Indexable Pages — 11 Issues

| # | Page | Check | Detail |
|---|------|-------|--------|
| 1 | `marketplace.html` | Description length | 163 chars — 3 over the 160-char ceiling; trim to ≤ 160 |
| 2 | `auth.html` | Description length | 97 chars — under 120-char floor |
| 3 | `auth.html` | Canonical | Missing `<link rel="canonical">` |
| 4 | `auth.html` | Robots | `noindex, nofollow` — intentional for auth, but worth noting |
| 5 | `contact.html` | Description length | 100 chars — under 120-char floor |
| 6 | `contact.html` | Schema | No `<script type="application/ld+json">` present |
| 7 | `privacy.html` | Canonical | Missing `<link rel="canonical">` |
| 8 | `privacy.html` | Schema | No `<script type="application/ld+json">` present |
| 9 | `terms.html` | Description length | 94 chars — under 120-char floor |
| 10 | `terms.html` | Canonical | Missing `<link rel="canonical">` |
| 11 | `terms.html` | Schema | No `<script type="application/ld+json">` present |

### Utility / Noindex Pages — 18 Issues (Expected)

These pages carry `<meta name="robots" content="noindex, nofollow">`, which is intentional. The missing OG tags, canonicals, and schema are low-priority consequences of that decision.

| Page | Noindex Intentional? | Notes |
|------|---------------------|-------|
| `auth.html` | ✅ Yes | Auth/login pages are conventionally excluded from indexing |
| `success.html` | ✅ Yes | Post-Stripe redirect; should not be indexed or shared |
| `cancel.html` | ✅ Yes | Post-Stripe redirect; should not be indexed or shared |
| `reset-password.html` | ✅ Yes | Password reset utility; should not be indexed |

---

## Passing Pages (No Action Required)

`find-trucks.html` · `pricing.html` · `about.html` · `jobs.html` · `venues.html` · `property.html`

---

*This report was generated automatically. Do not modify HTML files based on this report without review.*
