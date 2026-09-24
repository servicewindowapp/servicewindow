# Nightly SEO Audit — 2026-09-24

Automated audit of the 15 production HTML pages against the standard SEO/metadata checklist (title, meta description length, Open Graph tags, canonical URL, JSON-LD schema, robots directives). Report only — no HTML files were modified.

## Summary

- **Pages audited:** 15
- **Total issues found:** 34
- **Top 3 priority fixes:**
  1. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`** — these pages are indexable (no `noindex`) but ship no canonical URL, the highest-risk gap since it affects pages actively meant to be crawled.
  2. **Fix meta description length on 7 pages** (`auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`) — all fall well under the 120–160 character target, producing truncated/weak SERP snippets.
  3. **Add missing `og:title` / `og:description` / `og:url` to `success.html`, `cancel.html`, `reset-password.html`** — only `og:image` is present, so links to these pages render with no title/description in social previews.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ 163 chars (3 over limit) | ✅ | ✅ | ✅ | Description slightly over 160 chars |
| find-trucks.html | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ 97 chars (below 120) | ✅ | ❌ Missing | ❌ Missing | Description too short; missing canonical; no JSON-LD schema; `robots: noindex, nofollow` set (likely intentional for auth page, flagged per checklist) |
| pricing.html | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ 100 chars (below 120) | ✅ | ✅ | ❌ Missing | Description too short; no JSON-LD schema |
| jobs.html | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ 118 chars (below 120) | ✅ | ❌ Missing | ❌ Missing | Description just under target length; missing canonical; no JSON-LD schema |
| terms.html | ✅ | ⚠️ 94 chars (below 120) | ✅ | ❌ Missing | ❌ Missing | Description too short; missing canonical; no JSON-LD schema |
| success.html | ✅ | ⚠️ 48 chars (below 120) | ❌ Only og:image present | ❌ Missing | ❌ Missing | Description far too short; missing og:title/og:description/og:url; missing canonical; no schema; `robots: noindex, nofollow` set (expected for post-checkout page, flagged per checklist) |
| cancel.html | ✅ | ⚠️ 53 chars (below 120) | ❌ Only og:image present | ❌ Missing | ❌ Missing | Description far too short; missing og:title/og:description/og:url; missing canonical; no schema; `robots: noindex, nofollow` set (expected for post-checkout page, flagged per checklist) |
| reset-password.html | ✅ | ⚠️ 34 chars (below 120) | ❌ Only og:image present | ❌ Missing | ❌ Missing | Description far too short; missing og:title/og:description/og:url; missing canonical; no schema; `robots: noindex, nofollow` set (expected for utility page, flagged per checklist) |

## Notes

- **Schema markup requirement (#8):** Satisfied — `index.html` carries JSON-LD (`Organization`/`WebSite`-type schema). `marketplace.html` and `find-trucks.html` also carry 2 JSON-LD blocks each. `auth.html`, `contact.html`, `privacy.html`, `terms.html`, and the 3 post-action pages carry none.
- **Robots noindex (#9):** 4 pages set `noindex, nofollow` — `auth.html`, `success.html`, `cancel.html`, `reset-password.html`. These are login, post-checkout, and password-reset utility pages, so `noindex` may be intentional to keep them out of search results. Flagged here per the audit checklist ("not set to noindex on any production page") for visibility — not auto-corrected, since a login/checkout page being deliberately noindexed is a plausible design choice, not an obvious bug.
- All 15 pages have a present, descriptive `<title>` — no blanks or placeholders found.
- All 15 pages have `og:image` set to `https://servicewindow.app/og-image.png`.
- No HTML files were modified as part of this audit.
