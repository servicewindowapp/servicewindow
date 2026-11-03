# SEO Audit Report — 2026-11-03

## Summary
- **Pages audited:** 15
- **Total issues found:** 23 (across 10 pages; 5 pages fully clean: index, find-trucks, pricing, about, venues)
- **Top 3 priority fixes:**
  1. **Add full OG tags + canonical to `success.html`, `cancel.html`, `reset-password.html`** — all three lack `og:title`, `og:description`, `og:url`, and canonical (12 issues). Also all are `noindex` (see #3).
  2. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`** — missing on all three.
  3. **Decide on `noindex` for `auth`, `success`, `cancel`, `reset-password`** — audit rule says no production page should be noindex. `noindex` is generally correct for transactional/auth pages, so consider removing them from the audit list rather than the tag. Also lengthen too-short descriptions (auth 95, contact 98, privacy 116, terms 92, success 48, cancel 53, reset-password 34 chars; target 120–160).

Legend: ✅ pass · ❌ fail · ⚠️ present, needs improvement · — not required

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161, 1 over) | ✅ | ✅ | — (present) | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | — (present) | None |
| auth.html | ✅ | ⚠️ (95, too short) | ✅ | ❌ | — | `noindex, nofollow` set; description too short; canonical missing |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | — (present) | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | — (present) | None |
| contact.html | ✅ | ⚠️ (98, too short) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | — (present) | `og:description` says "21 SWFL cities" — should be 22 (copy rule) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | — (present) | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | — (present) | Unescaped `&` in meta description (use `&amp;`) |
| privacy.html | ✅ | ⚠️ (116, slightly short) | ✅ | ❌ | — | Canonical missing; description short |
| terms.html | ✅ | ⚠️ (92, too short) | ✅ | ❌ | — | Canonical missing; description too short |
| success.html | ✅ | ❌ (48, too short) | ❌ (only og:image) | ❌ | — | `noindex`; description too short; og:title/description/url missing; canonical missing |
| cancel.html | ✅ | ❌ (53, too short) | ❌ (only og:image) | ❌ | — | `noindex`; description too short; og:title/description/url missing; canonical missing |
| reset-password.html | ✅ | ❌ (34, too short) | ❌ (only og:image) | ❌ | — | `noindex`; description too short; og:title/description/url missing; canonical missing |

## Notes
- All `og:url` / canonical values present use the `servicewindow.app` domain. `og-image.png` exists in the repo root.
- index.html has JSON-LD schema (requirement met). Other pages' schema is optional.
- Report only — no HTML files were modified.
