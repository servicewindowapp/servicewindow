# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-09-16
**Pages audited:** 15 (production HTML pages)
**Total issues found:** 25 (24 metadata issues + 1 content-accuracy flag)

## Top 3 Priority Fixes

1. **Transactional pages are missing nearly all social/canonical metadata.** `success.html`, `cancel.html`, and `reset-password.html` each lack `og:title`, `og:description`, `og:url`, and `<link rel="canonical">`, and their meta descriptions are all under 60 characters (min target: 120).
2. **Canonical tags missing on 6 of 15 pages.** `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` have no `<link rel="canonical">` at all.
3. **City-count data error in search-facing metadata.** `jobs.html` (`og:description` + JSON-LD `description`) and `marketplace.html` (JSON-LD `description`) say **"21 cities/SWFL cities"** — CLAUDE.md fixes this at **22**. `property.html` body copy repeats the same "21 SWFL cities" error. This is inconsistent with the correct "22 cities" copy used on `index.html`, `about.html`, `find-trucks.html`, and `marketplace.html`'s own body text.

*Secondary note:* `robots: noindex, nofollow` is present on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. This fails the literal "no noindex on any production page" check requested, though it is standard practice to keep login/transactional pages out of the index — flagging for awareness rather than as a clear-cut defect.

---

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160 chars) | ⚠️ | ✅ | ✅ | `og:url` (`.../app`) lacks trailing slash used by canonical (`.../app/`) — minor inconsistency |
| marketplace.html | ✅ | ⚠️ (163 chars, 3 over max) | ✅ | ✅ | ⚠️ | Description 3 chars over 160 max; JSON-LD description says "21 cities" while another JSON-LD block on the same page says "22 SWFL cities" |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (97 chars, under 120 min) | ✅ | ❌ Missing | ➖ N/A | No canonical tag; description too short; `robots: noindex, nofollow` set (likely intentional for a login page, but fails check #9 as written) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (100 chars, under 120 min) | ✅ | ✅ | ➖ N/A | Description too short |
| jobs.html | ✅ | ✅ (133 chars) | ⚠️ | ✅ | ⚠️ | `og:description` and JSON-LD `description` both say "21 SWFL cities" — should be 22 per CLAUDE.md |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | Body copy (not meta tags) says "21 SWFL cities" — should be 22 |
| privacy.html | ✅ | ⚠️ (118 chars, 2 under 120 min) | ✅ | ❌ Missing | ➖ N/A | No canonical tag; description borderline short |
| terms.html | ✅ | ❌ (94 chars, under 120 min) | ✅ | ❌ Missing | ➖ N/A | No canonical tag; description too short |
| success.html | ✅ | ❌ (48 chars, under 120 min) | ❌ | ❌ Missing | ➖ N/A | Missing `og:title`, `og:description`, `og:url` (only `og:image` present); no canonical; description far too short; `robots: noindex, nofollow` set |
| cancel.html | ✅ | ❌ (53 chars, under 120 min) | ❌ | ❌ Missing | ➖ N/A | Missing `og:title`, `og:description`, `og:url` (only `og:image` present); no canonical; description far too short; `robots: noindex, nofollow` set |
| reset-password.html | ✅ | ❌ (34 chars, under 120 min) | ❌ | ❌ Missing | ➖ N/A | Missing `og:title`, `og:description`, `og:url` (only `og:image` present); no canonical; description far too short; `robots: noindex, nofollow` set |

---

### Legend
- ✅ Pass
- ⚠️ Present but needs improvement
- ❌ Fail / missing
- ➖ N/A — schema not required on this page type per audit scope (only required at minimum on `index.html`); none present

### Notes
- Schema markup (`application/ld+json`) requirement was satisfied on `index.html` (1 block) as required. `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` also carry schema blocks, which is good practice though not required by this audit's scope.
- No HTML files were modified as part of this audit — report only.
