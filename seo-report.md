# ServiceWindow — Nightly SEO Audit

**Date:** 2026-11-13
**Scope:** 15 production HTML pages (report only — no HTML files modified)

## Summary

- **Pages audited:** 15
- **Total issues found:** 29 (4 of these are intentional `noindex` on auth/transactional pages; 25 actionable)
- **Clean pages (all checks pass):** find-trucks.html, pricing.html, about.html, venues.html, property.html
- **Schema on index.html:** ✅ valid JSON-LD (`WebSite` + `Organization`). All 8 JSON-LD blocks found across the site parse as valid JSON.
- **og:image:** ✅ present on all 15 pages (`https://servicewindow.app/og-image.png`, file exists in repo)

### Top 3 priority fixes

1. **Add `<link rel="canonical">` to indexable pages missing it** — `privacy.html` and `terms.html` are indexable (no `noindex`) but have no canonical. Add `https://servicewindow.app/privacy.html` and `https://servicewindow.app/terms.html`.
2. **Fix meta description lengths on indexable pages** — `contact.html` (98 chars), `terms.html` (92), `privacy.html` (116) are under 120; `marketplace.html` (161) is 1 char over 160 and will be truncated.
3. **Fix copy-rule violation + URL mismatch** — `jobs.html` `og:description` says "across **21** SWFL cities" (copy rule: always 22). `index.html` `og:url` is `https://servicewindow.app` while canonical is `https://servicewindow.app/` — make them identical (use the trailing slash).

Lower priority: `success.html`, `cancel.html`, `reset-password.html` lack `og:title` / `og:description` / `og:url` / canonical and have short descriptions. They are correctly `noindex`, so search impact is nil — only link-preview quality is affected if someone shares the URL.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 chars | ⚠️ | ✅ | ✅ WebSite, Organization | `og:url` (`https://servicewindow.app`) doesn't match canonical (`https://servicewindow.app/`) |
| marketplace.html | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ CollectionPage | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ CollectionPage | — |
| auth.html | ✅ | ⚠️ 95 chars | ✅ | ❌ | — (not required) | Description under 120; no canonical; `robots: noindex, nofollow` (intentional — login page) |
| pricing.html | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ WebPage | — |
| about.html | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ AboutPage | — |
| contact.html | ✅ | ⚠️ 98 chars | ✅ | ✅ | — (not required) | Description under 120 |
| jobs.html | ✅ | ✅ 131 chars | ⚠️ | ✅ | ✅ CollectionPage | `og:description` says "21 SWFL cities" — copy rule requires 22 |
| venues.html | ✅ | ✅ 145 chars | ✅ | ✅ | ✅ WebPage | — |
| property.html | ✅ | ✅ 154 chars | ✅ | ✅ | ✅ WebPage | — |
| privacy.html | ✅ | ⚠️ 116 chars | ✅ | ❌ | — (not required) | Description under 120; no canonical |
| terms.html | ✅ | ⚠️ 92 chars | ✅ | ❌ | — (not required) | Description under 120; no canonical |
| success.html | ✅ | ⚠️ 48 chars | ❌ | ❌ | — (not required) | Description under 120; missing `og:title`, `og:description`, `og:url` (only `og:image`); no canonical; `robots: noindex, nofollow` (intentional — post-Stripe page) |
| cancel.html | ✅ | ⚠️ 53 chars | ❌ | ❌ | — (not required) | Description under 120; missing `og:title`, `og:description`, `og:url` (only `og:image`); no canonical; `robots: noindex, nofollow` (intentional — post-Stripe page) |
| reset-password.html | ✅ | ⚠️ 34 chars | ❌ | ❌ | — (not required) | Description under 120; missing `og:title`, `og:description`, `og:url` (only `og:image`); no canonical; `robots: noindex, nofollow` (intentional — utility page) |

## Notes

- **OG Tags column** covers `og:title`, `og:description`, `og:url` (servicewindow.app domain), and `og:image`. ✅ = all four present and correct.
- **Canonical:** every canonical found uses `https://servicewindow.app`.
- **Robots:** no indexable marketing page is `noindex`. The 4 `noindex` pages (auth, success, cancel, reset-password) are login/transactional pages where `noindex` is the right setting; they're counted per the audit rule but no change is recommended.
- **Not scored, FYI:** `twitter:card` is missing on auth, about, contact, jobs, venues, property, privacy, terms.
