# ServiceWindow — Nightly SEO Audit
**Date:** 2026-11-18 · **Scope:** 15 production pages · **Mode:** report only (no HTML changed)

## Summary
- **Pages audited:** 15
- **Total issues found:** 23 (in 10 pages; 5 pages pass every check)
- **Clean pages:** find-trucks.html, pricing.html, about.html, venues.html, property.html

### Top 3 priority fixes
1. **Add `<link rel="canonical">` to `privacy.html` and `terms.html`.** They are the only indexable pages without one.
2. **Fix meta description lengths on indexable pages.** Target 120–160 chars: `contact.html` (98), `terms.html` (92), `privacy.html` (116) are too short; `marketplace.html` (161) is 1 char over.
3. **Fix the copy and URL mismatches.** `jobs.html` og:description says "**21** SWFL cities", but the copy rule says 22. On `index.html`, `og:url` is `https://servicewindow.app` and the canonical is `https://servicewindow.app/`. Make them match by adding the trailing slash to og:url.

> **About noindex:** `auth.html`, `success.html`, `cancel.html` and `reset-password.html` set `<meta name="robots" content="noindex, nofollow">`. That breaks check #9 as written, so each one is counted as an issue. These are login and transaction pages, though, so noindex is probably intentional and correct. **Recommendation:** keep noindex on them and take them off this audit list. If you do that, the canonical, OG and description issues on those 4 pages stop mattering too, and the real issue count falls to 10.

## Results

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement · — not required (schema is only required on index.html)

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ 160 | ⚠️ | ✅ | ✅ WebSite + Organization | og:url `https://servicewindow.app` has no trailing slash, so it doesn't match the canonical `https://servicewindow.app/` |
| marketplace.html | ✅ | ⚠️ 161 | ✅ | ✅ | ✅ CollectionPage | Description is 1 char over the 160 max |
| find-trucks.html | ✅ | ✅ 155 | ✅ | ✅ | ✅ CollectionPage | None |
| auth.html | ✅ | ⚠️ 95 | ✅ | ❌ | — | Description too short; no canonical; robots = `noindex, nofollow` (probably intentional) |
| pricing.html | ✅ | ✅ 134 | ✅ | ✅ | ✅ WebPage | None |
| about.html | ✅ | ✅ 153 | ✅ | ✅ | ✅ AboutPage | None |
| contact.html | ✅ | ⚠️ 98 | ✅ | ✅ | — | Description too short (98 chars) |
| jobs.html | ✅ | ✅ 131 | ⚠️ | ✅ | ✅ CollectionPage | og:description says "21 SWFL cities"; copy rule says 22 |
| venues.html | ✅ | ✅ 145 | ✅ | ✅ | ✅ WebPage | None |
| property.html | ✅ | ✅ 154 | ✅ | ✅ | ✅ WebPage | None |
| privacy.html | ✅ | ⚠️ 116 | ✅ | ❌ | — | Description too short (116 chars); no canonical |
| terms.html | ✅ | ⚠️ 92 | ✅ | ❌ | — | Description too short (92 chars); no canonical |
| success.html | ✅ | ⚠️ 48 | ❌ | ❌ | — | No og:title, og:description or og:url (only og:image); no canonical; description too short; robots = `noindex, nofollow` (probably intentional) |
| cancel.html | ✅ | ⚠️ 53 | ❌ | ❌ | — | No og:title, og:description or og:url (only og:image); no canonical; description too short; robots = `noindex, nofollow` (probably intentional) |
| reset-password.html | ✅ | ⚠️ 34 | ❌ | ❌ | — | No og:title, og:description or og:url (only og:image); no canonical; description too short; robots = `noindex, nofollow` (probably intentional) |

Numbers in the Description column are character counts, measured after decoding HTML entities.

## Check details
- **Titles:** all 15 are present and descriptive. None are blank or placeholders.
- **og:image:** all 15 use `https://servicewindow.app/og-image.png`.
- **og:url and canonical domains:** every og:url and canonical present uses `https://servicewindow.app`. No off-domain URLs.
- **JSON-LD:** index.html has WebSite + Organization schema. The JSON-LD blocks on all 8 pages that have one parse as valid JSON.
- **robots:** 11 pages have no robots meta tag (indexable by default). The 4 pages listed above have `noindex, nofollow`.
