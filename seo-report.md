# ServiceWindow SEO & Metadata Audit

**Date:** 2026-09-01
**Pages audited:** 15
**Total issues found:** 21 (metadata) + 1 content-accuracy flag

## Summary

| Metric | Result |
|---|---|
| Pages with 0 issues | 6 of 15 (index, find-trucks, pricing, about, venues, property) |
| Pages missing `<link rel="canonical">` | 6 (auth, privacy, terms, success, cancel, reset-password) |
| Pages missing OG title/description/url | 3 (success, cancel, reset-password — image only) |
| Pages with description outside 120–160 chars | 8 (7 too short, 1 too long) |
| Pages with `robots: noindex` | 4 (auth, success, cancel, reset-password) |

### Top 3 priority fixes

1. **Add canonical tags** to `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Six of fifteen pages have no canonical URL at all — the largest single gap in this audit.
2. **Add `og:title`, `og:description`, `og:url`** to `success.html`, `cancel.html`, `reset-password.html`. Only `og:image` is set on these — any share of these URLs (Slack, iMessage, Facebook) will render a blank title/description.
3. **Rewrite meta descriptions outside the 120–160 char range** — `auth.html` (97), `contact.html` (100), `privacy.html` (118), `terms.html` (94), `success.html` (48), `cancel.html` (53), `reset-password.html` (34) are all too short; `marketplace.html` (163) is slightly too long. Short descriptions leave SERP snippet space unused; Google will otherwise auto-generate the snippet from page content.

**Additional flag (outside the 9-point checklist):** `jobs.html`'s `og:description` reads "across 21 SWFL cities" — CLAUDE.md fixes the city count at 22. This is a content-accuracy issue, not a metadata-completeness one, so it's noted here rather than counted in the totals above.

> Note on `robots: noindex` — `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are utility/transactional pages (login, post-checkout, password reset). Noindexing them is standard practice and likely intentional; flagged per the checklist for visibility, not necessarily a bug.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ `servicewindow.app/` | ✅ (required, present) | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars (3 over) | ✅ | ✅ | ✅ | Description slightly too long |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 97 chars (too short) | ✅ | ❌ missing | ➖ not required | Missing canonical; description too short; `noindex, nofollow` set (likely intentional — login page) |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars (too short) | ✅ | ✅ | ➖ not present | Description too short; no schema markup (optional, but would help) |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | og:description states "21 SWFL cities" — should be 22 per CLAUDE.md (content flag, not counted above) |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (2 short) | ✅ | ❌ missing | ➖ not required | Missing canonical; description just under the 120 floor |
| `terms.html` | ✅ | ⚠️ 94 chars (too short) | ✅ | ❌ missing | ➖ not required | Missing canonical; description too short |
| `success.html` | ✅ | ⚠️ 48 chars (too short) | ❌ title/desc/url missing (image only) | ❌ missing | ➖ not required | Missing og:title/description/url, missing canonical, description short, `noindex` set (likely intentional — post-checkout page) |
| `cancel.html` | ✅ | ⚠️ 53 chars (too short) | ❌ title/desc/url missing (image only) | ❌ missing | ➖ not required | Missing og:title/description/url, missing canonical, description short, `noindex` set (likely intentional — post-checkout page) |
| `reset-password.html` | ✅ | ⚠️ 34 chars (too short) | ❌ title/desc/url missing (image only) | ❌ missing | ➖ not required | Missing og:title/description/url, missing canonical, description short, `noindex` set (likely intentional — password-reset page) |

---

## Legend
- ✅ Pass
- ⚠️ Present but needs improvement
- ❌ Missing / fails check
- ➖ Not required by the checklist for this page (schema is only mandated on `index.html`), but noting presence/absence for completeness

## Methodology
Checked against: `<title>`, `<meta name="description">` (120–160 chars), `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:url">` (must use `servicewindow.app`), `<meta property="og:image">`, `<link rel="canonical">` (must use `servicewindow.app`), `<script type="application/ld+json">` schema markup (required minimum on `index.html`), and `<meta name="robots">` (flagged if `noindex` on any audited page). Report only — no HTML files were modified.
