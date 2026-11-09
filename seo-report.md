# SEO & Metadata Audit — servicewindow.app

**Audit date:** 2026-11-09 · Report only — no HTML files were modified.

## Summary

- **Pages audited:** 15
- **Total issues found:** 29 (❌ 15 fail · ⚠️ 14 needs improvement)
- **Clean pages (0 issues):** find-trucks, pricing, about, venues, property
- **Schema:** index.html has `WebSite` + `Organization` JSON-LD ✅ (minimum requirement met)
- **Noindex:** `auth`, `success`, `cancel`, `reset-password` are `noindex, nofollow`. Probably intentional for transactional pages, but it technically fails check #9. `auth.html` is listed as a production page and is where signups start. Confirm that excluding it is deliberate.

### Top 3 priority fixes

1. **`success.html`, `cancel.html`, `reset-password.html` have no `og:title`, `og:description` or `og:url`, and no canonical.** They only have `og:image`. Add all four tags. Their descriptions are also 34–53 characters.
2. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`** (and to the three pages above). Seven of 15 pages have none.
3. **Lengthen short meta descriptions to 120–160 characters** on `auth` (95), `contact` (98), `privacy` (116), `terms` (92). Trim `marketplace` (161) by one character or more.

Also found while auditing (copy, not SEO structure): `jobs.html` (og:description, JSON-LD) and `marketplace.html` (JSON-LD) say **"21 cities"**. Project copy rules say the count is always **22**. `property.html:288` and `api.html:599` have the same error.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ⚠️ | ✅ | ✅ WebSite, Organization | `og:url` is `https://servicewindow.app` (no trailing slash) but canonical is `https://servicewindow.app/`. Make them match. |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ CollectionPage | Description is 1 character over 160. Title differs from `og:title`. JSON-LD says "21 cities" (should be 22). |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | ❌ none | Canonical missing. Description too short. `robots` is `noindex, nofollow` (confirm intent). |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ WebPage | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ AboutPage | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | ❌ none | Description too short. No JSON-LD (e.g. `ContactPage`; optional). |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ CollectionPage | `og:description` and JSON-LD say "21 SWFL cities" (should be 22). |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ WebPage | None. Body copy line 288 says "21 SWFL cities". |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | ❌ none | Canonical missing. Description 4 characters under 120. |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | ❌ none | Canonical missing. Description too short. |
| success.html | ⚠️ | ⚠️ (48) | ❌ | ❌ | ❌ none | `og:title`, `og:description` and `og:url` missing (only `og:image` present). Canonical missing. Description too short. Title "You're In" is not descriptive. `robots` is `noindex, nofollow`. |
| cancel.html | ⚠️ | ⚠️ (53) | ❌ | ❌ | ❌ none | `og:title`, `og:description` and `og:url` missing (only `og:image` present). Canonical missing. Description too short. Title "No Problem" is not descriptive. `robots` is `noindex, nofollow`. |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | ❌ none | `og:title`, `og:description` and `og:url` missing (only `og:image` present). Canonical missing. Description too short. `robots` is `noindex, nofollow`. |

## Notes

- `og:image` is present on all 15 pages and points to `https://servicewindow.app/og-image.png`. The file exists in the repo root (64 KB).
- All `og:url` and canonical values that exist use the `servicewindow.app` domain.
- Schema is only required on index.html. Pages marked ❌ in the Schema column are informational and are not counted as issues, except where noted.
- Issue count per page: index 1, marketplace 1, auth 3, contact 1, jobs 1, privacy 2, terms 2, success 6, cancel 6, reset-password 6.
