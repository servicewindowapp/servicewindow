# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-07-20
**Pages audited:** 15 (production HTML pages listed below)
**Total issues found:** 28
**Scope:** Report only — no HTML files were modified.

## Summary

| Metric | Result |
|---|---|
| Pages audited | 15 |
| Pages fully clean (no issues) | 7 (`index`, `find-trucks`, `pricing`, `about`, `jobs`, `venues`, `property`) |
| Pages missing canonical tag | 6 (`auth`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) |
| Pages with meta description outside 120–160 char range | 8 |
| Pages missing one or more OG tags | 4 (`success`, `cancel`, `reset-password`, plus minor overage on `marketplace`) |
| Pages with `noindex` set | 4 (`auth`, `success`, `cancel`, `reset-password`) — likely intentional, flagged per checklist item 9 |

### Top 3 Priority Fixes

1. **Meta descriptions on transactional pages are far too short.** `success.html` (48 chars), `cancel.html` (53 chars), and `reset-password.html` (34 chars) are all well under the 120-char floor, along with `terms.html` (92), `auth.html` (95), and `contact.html` (98). These render as thin, auto-truncated snippets in search results.
2. **6 of 15 pages have no `<link rel="canonical">` tag**: `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Missing canonicals risk duplicate-content ambiguity, especially since several of these pages have query-string or redirect variants.
3. **Post-checkout pages have no Open Graph title/description/url.** `success.html`, `cancel.html`, and `reset-password.html` only set `og:image` — any link preview (Slack, iMessage, etc.) to these pages will show no title or description text.

*Note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This fails checklist item 9 (no production page should be noindexed) but is very likely intentional — these are private/transactional pages with no SEO value. Flagged for confirmation, not treated as a top-3 fix.

---

## Full Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ (161 chars — 1 over max) | ✅ | ✅ | ✅ | Description 1 char over the 160 max |
| `find-trucks.html` | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ❌ (95 chars — under 120 min) | ✅ | ❌ Missing | ⚠️ None (not required off-index) | Description too short; missing canonical; `robots: noindex, nofollow` set (item 9 — confirm intentional) |
| `pricing.html` | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ❌ (98 chars — under 120 min) | ✅ | ✅ | ⚠️ None (not required off-index) | Description too short |
| `jobs.html` | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ (116 chars — 4 under min) | ✅ | ❌ Missing | ⚠️ None (not required off-index) | Description slightly short; missing canonical |
| `terms.html` | ✅ | ❌ (92 chars — under 120 min) | ✅ | ❌ Missing | ⚠️ None (not required off-index) | Description too short; missing canonical |
| `success.html` | ✅ | ❌ (48 chars — under 120 min) | ❌ Missing og:title, og:description, og:url (only og:image present) | ❌ Missing | ⚠️ None (not required off-index) | Description too short; missing og:title/description/url; missing canonical; `robots: noindex, nofollow` (item 9 — likely intentional, post-checkout) |
| `cancel.html` | ✅ | ❌ (53 chars — under 120 min) | ❌ Missing og:title, og:description, og:url (only og:image present) | ❌ Missing | ⚠️ None (not required off-index) | Description too short; missing og:title/description/url; missing canonical; `robots: noindex, nofollow` (item 9 — likely intentional, post-checkout) |
| `reset-password.html` | ✅ | ❌ (34 chars — under 120 min) | ❌ Missing og:title, og:description, og:url (only og:image present) | ❌ Missing | ⚠️ None (not required off-index) | Description too short; missing og:title/description/url; missing canonical; `robots: noindex, nofollow` (item 9 — likely intentional, auth-adjacent page) |

---

## Notes

- **Item 8 (Schema markup)** is only required on `index.html` at minimum per the audit spec — `index.html` has valid `application/ld+json` schema (✅). Seven other pages (`marketplace`, `find-trucks`, `pricing`, `about`, `jobs`, `venues`, `property`) already carry schema markup as a bonus. The remaining pages (`auth`, `contact`, `privacy`, `terms`, `success`, `cancel`, `reset-password`) have none, which is acceptable per the spec but marked ⚠️ as a nice-to-have rather than a failure.
- **Item 9 (robots noindex)** flags four pages (`auth`, `success`, `cancel`, `reset-password`). These are transactional/account pages that plausibly should stay out of the index — confirm intent with the team rather than removing the tag reflexively.
- No HTML files were modified as part of this audit.
