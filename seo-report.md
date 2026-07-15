# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-15
**Pages audited:** 15
**Issues found:** 22
**Scope:** Report only — no HTML files were modified.

## Summary

| Metric | Result |
|---|---|
| Pages audited | 15 |
| Pages with zero issues | 6 (`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `venues.html`, `property.html`) |
| Total issues found | 22 |
| Pages missing `<link rel="canonical">` | 5 (`auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` — 6 total) |
| Pages with meta description out of 120–160 range | 8 |
| Pages missing OG title/description/url | 3 (`success.html`, `cancel.html`, `reset-password.html`) |

### Top 3 Priority Fixes

1. **Add canonical tags** to `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html`. `privacy.html` and `terms.html` are indexable, public legal pages with no canonical — highest risk of duplicate-content ambiguity.
2. **Fix the city-count error on `jobs.html`** — both `og:description` and the JSON-LD `description` say "21 SWFL cities," but the project's current coverage (per `CLAUDE.md`) is 22 cities. This is a factual error shipping in metadata parsed by search engines and social platforms.
3. **Add OG title/description/url tags to the transactional pages** (`success.html`, `cancel.html`, `reset-password.html`) and lengthen their meta descriptions (34–53 chars, well under the 120 minimum). These are `noindex`-tagged so search impact is low, but broken/absent OG tags mean broken link previews if these URLs are ever shared directly.

---

## Full Audit

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (163) | ✅ | ✅ | ✅ | Description 3 chars over the 160 max |
| `find-trucks.html` | ✅ | ✅ (157) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ (97) | ✅ | ❌ | ❌* | Missing canonical tag; description 97 chars (below 120 min); `robots` set to `noindex, nofollow` (flagged per audit criterion 9 — confirm this is intentional for a login/signup page) |
| `pricing.html` | ✅ | ✅ (136) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ (100) | ✅ | ✅ | ❌* | Description 100 chars (below 120 min) |
| `jobs.html` | ✅ | ✅ (133) | ✅ | ✅ | ✅ | `og:description` and JSON-LD `description` both say "21 SWFL cities" — should be 22 per current documented coverage |
| `venues.html` | ✅ | ✅ (147) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (156) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (118) | ✅ | ❌ | ❌* | Missing canonical tag; description 118 chars (2 under 120 min, borderline) |
| `terms.html` | ✅ | ⚠️ (94) | ✅ | ❌ | ❌* | Missing canonical tag; description 94 chars (below 120 min) |
| `success.html` | ✅ | ⚠️ (48) | ❌ | ❌ | ❌* | Missing `og:title`, `og:description`, `og:url` (only `og:image` present); description 48 chars (well below 120 min); missing canonical; `robots` set to `noindex, nofollow` (flagged per criterion 9 — likely intentional for post-checkout page) |
| `cancel.html` | ✅ | ⚠️ (53) | ❌ | ❌ | ❌* | Missing `og:title`, `og:description`, `og:url` (only `og:image` present); description 53 chars (well below 120 min); missing canonical; `robots` set to `noindex, nofollow` (flagged per criterion 9 — likely intentional for post-checkout page) |
| `reset-password.html` | ✅ | ⚠️ (34) | ❌ | ❌ | ❌* | Missing `og:title`, `og:description`, `og:url` (only `og:image` present); description 34 chars (well below 120 min); missing canonical; `robots` set to `noindex, nofollow` (flagged per criterion 9 — likely intentional for password-reset page) |

`*` Schema markup (JSON-LD) is only required on `index.html` per audit criterion 8, where it **is** present (✅). The ❌ on other pages means no JSON-LD block was found there — not a required fix, listed for completeness. `index.html`, `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` all also carry JSON-LD.

## Notes

- All pages reference a shared `og-image.png`, confirmed present in the repo root.
- Robots `noindex, nofollow` appears on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. Per audit criterion 9 ("robots not set to noindex on any production page"), these are flagged literally since they're in the audited list — but functionally these are auth/transactional flows, not content pages meant to rank, so the `noindex` is plausibly intentional. Flagging for confirmation rather than recommending removal.
