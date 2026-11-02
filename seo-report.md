# SEO & Metadata Audit — ServiceWindow

**Run:** 2026-11-02 (nightly) · **Scope:** 15 production pages · report only, no HTML modified

## Summary
- **Total pages audited:** 15
- **Total issues found:** 27 (across 11 pages; index, find-trucks, pricing, about, jobs, venues, property clean)
- **Top 3 priority fixes:**
  1. **`noindex, nofollow` on auth.html, success.html, cancel.html, reset-password.html.** The brief requires no production page to be noindex. Likely intentional for the transactional pages (success/cancel/reset-password), but `auth.html` is the signup/login entry point and is also missing a canonical. Confirm intent and decide.
  2. **Missing `<link rel="canonical">` on auth, privacy, terms, success, cancel, reset-password** (6 pages).
  3. **success/cancel/reset-password lack og:title, og:description and og:url, and their meta descriptions are 34–53 chars.** Also too-short descriptions on auth (95), contact (98), terms (92), privacy (116). Marketplace is 1 char over (161).
- Also noted: `jobs.html` og/meta copy says "21 SWFL cities"; project copy rule is 22.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | — |
| marketplace.html | ✅ | ⚠️ (161, 1 over) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | — |
| auth.html | ✅ | ❌ (95, too short) | ✅ | ❌ | ❌ | `noindex, nofollow`; no canonical; description too short |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | — |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | — |
| contact.html | ✅ | ❌ (98, too short) | ✅ | ✅ | ❌ | Description too short; no schema (optional) |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | Copy says "21 SWFL cities" (should be 22) |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | — |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | — |
| privacy.html | ✅ | ❌ (116, too short) | ✅ | ❌ | ❌ | No canonical; description 4 chars short |
| terms.html | ✅ | ❌ (92, too short) | ✅ | ❌ | ❌ | No canonical; description too short |
| success.html | ✅ | ❌ (48) | ❌ (only og:image) | ❌ | ❌ | `noindex, nofollow`; no og:title/description/url; no canonical; description too short |
| cancel.html | ✅ | ❌ (53) | ❌ (only og:image) | ❌ | ❌ | `noindex, nofollow`; no og:title/description/url; no canonical; description too short |
| reset-password.html | ✅ | ❌ (34) | ❌ (only og:image) | ❌ | ❌ | `noindex, nofollow`; no og:title/description/url; no canonical; description too short |

**Notes:** Schema is required only on index.html (present: WebSite + Organization). All og:url/og:image/canonical values that exist use the servicewindow.app domain. og-image.png exists in the repo. Titles are all descriptive, none blank or placeholder.
