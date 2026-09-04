# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-09-04
**Pages audited:** 15
**Scope:** `<title>`, meta description (120–160 chars), Open Graph tags, canonical URL, JSON-LD schema, robots directives.
**Report only — no HTML files were modified.**

## Summary

- **Pages audited:** 15
- **Total issues found:** 20
  - ❌ Fail: 8
  - ⚠️ Needs improvement: 12
- **Top 3 priority fixes:**
  1. **Missing Open Graph tags + canonical + schema on `success.html`, `cancel.html`, `reset-password.html`.** These three transactional pages have no `og:title`, `og:description`, `og:url`, or `<link rel="canonical">`, and no JSON-LD. Low SEO risk since they're `noindex`, but broken OG tags mean any shared link (e.g. a Stripe success/cancel redirect pasted into Slack/SMS) renders with no preview text.
  2. **Missing `<link rel="canonical">` on `auth.html`, `privacy.html`, `terms.html`.** These are indexable-by-default pages (no `noindex` on privacy/terms) with no canonical tag, risking duplicate-content ambiguity if the pages are ever reachable via multiple URLs/query strings.
  3. **Meta descriptions out of the 120–160 char target range on 10 of 15 pages** — several are far under (e.g. `reset-password.html` at 34 chars, `success.html` at 48 chars, `cancel.html` at 53 chars, `terms.html` at 92 chars, `auth.html` at 95 chars, `contact.html` at 98 chars, `privacy.html` at 116 chars) and `marketplace.html` is 1 char over at 161. Short descriptions leave SERP snippet space unused; Google will otherwise auto-generate the snippet from page content.

Note on `robots: noindex`: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This is flagged per the audit checklist since these are production/public pages, but is very likely **intentional** (transactional/auth flows with no unique content value for search) rather than a bug — confirm intent rather than treating as a fix-now item.

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ✅ 160 chars | ✅ title/desc/url/image all present | ✅ `https://servicewindow.app/` | ✅ WebSite + Organization | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars (1 over max) | ✅ all present | ✅ `https://servicewindow.app/marketplace.html` | ✅ static + JS-injected LD+JSON | Description 1 char over 160 |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ all present | ✅ `https://servicewindow.app/find-trucks.html` | ✅ static + JS-injected LD+JSON | None |
| `auth.html` | ✅ | ⚠️ 95 chars (under min) | ✅ all present | ❌ missing | ❌ missing | ⚠️ `robots: noindex, nofollow` (likely intentional) · ❌ no canonical · ⚠️ description too short |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ all present | ✅ `https://servicewindow.app/pricing.html` | ✅ present | None |
| `about.html` | ✅ | ✅ 153 chars | ✅ all present | ✅ `https://servicewindow.app/about.html` | ✅ present | None |
| `contact.html` | ✅ | ⚠️ 98 chars (under min) | ✅ all present | ✅ `https://servicewindow.app/contact.html` | ❌ missing | ⚠️ description too short · ❌ no JSON-LD (not required outside index.html, but worth adding — e.g. `ContactPage`) |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ all present | ✅ `https://servicewindow.app/jobs.html` | ✅ present | None |
| `venues.html` | ✅ | ✅ 145 chars | ✅ all present | ✅ `https://servicewindow.app/venues.html` | ✅ present | None |
| `property.html` | ✅ | ✅ 154 chars | ✅ all present | ✅ `https://servicewindow.app/property.html` | ✅ present | None |
| `privacy.html` | ✅ | ⚠️ 116 chars (just under min) | ✅ all present | ❌ missing | ❌ missing | ❌ no canonical · ⚠️ description slightly short · ❌ no JSON-LD (optional for legal pages) |
| `terms.html` | ✅ | ⚠️ 92 chars (under min) | ✅ all present | ❌ missing | ❌ missing | ❌ no canonical · ⚠️ description too short · ❌ no JSON-LD (optional for legal pages) |
| `success.html` | ✅ | ⚠️ 48 chars (well under min) | ❌ og:title/description/url all missing (og:image only) | ❌ missing | ❌ missing | ⚠️ `robots: noindex, nofollow` (likely intentional) · ❌ og:title/desc/url missing · ❌ no canonical · ⚠️ description too short |
| `cancel.html` | ✅ | ⚠️ 53 chars (well under min) | ❌ og:title/description/url all missing (og:image only) | ❌ missing | ❌ missing | ⚠️ `robots: noindex, nofollow` (likely intentional) · ❌ og:title/desc/url missing · ❌ no canonical · ⚠️ description too short |
| `reset-password.html` | ✅ | ❌ 34 chars (far under min) | ❌ og:title/description/url all missing (og:image only) | ❌ missing | ❌ missing | ⚠️ `robots: noindex, nofollow` (likely intentional) · ❌ og:title/desc/url missing · ❌ no canonical · ⚠️ description far too short |

---

## Notes

- All 15 pages have a unique, descriptive `<title>` — no blanks or placeholders found.
- All 15 pages have `og:image` pointing to `https://servicewindow.app/og-image.png`, and the file exists at repo root (64 KB PNG).
- `index.html` carries the site's only required JSON-LD minimum (`WebSite` + `Organization`), satisfying checklist item 8. `marketplace.html` and `find-trucks.html` also carry both a static block and a JS-injected block (likely for dynamic per-listing schema).
- Where present, all `og:url` and `<link rel="canonical">` values correctly use the `https://servicewindow.app` domain — no domain mismatches found.
- This report does not modify any HTML files, per instructions.
