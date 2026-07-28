# SEO & Metadata Audit — ServiceWindow

**Date:** 2026-07-28
**Pages audited:** 15
**Total issues found:** 28 (across title/description/OG/canonical/schema/robots checks)

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">` on 6 pages** — `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. Legal pages (`privacy.html`, `terms.html`) are indexable and have no canonical at all, which is the most impactful gap since these pages are meant to be crawled.
2. **No JSON-LD schema markup outside the core marketing pages** — missing on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`. `index.html` meets the stated minimum, but `contact.html` in particular is indexable and would benefit from `Organization`/`ContactPage` schema.
3. **Meta descriptions outside the 120–160 char target** — `marketplace.html` (163, slightly long), `contact.html` (100), `terms.html` (94), `privacy.html` (118), and especially the transactional pages `success.html` (48), `cancel.html` (53), `reset-password.html` (34), which are too thin even for utility pages.

Also worth a quick confirm: `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. This is likely intentional (transactional/auth flow pages), but flagged per the audit checklist since it wasn't possible to confirm intent from the markup alone.

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|:-----:|:------------:|:-------:|:---------:|:------:|--------|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163 chars, 3 over) | ✅ | ✅ | ✅ | Description slightly over 160-char target |
| find-trucks.html | ✅ | ✅ (157 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97 chars) | ✅ | ❌ | ⚠️ | No canonical tag; no schema markup; description under 120 chars; `noindex` set (confirm intentional) |
| pricing.html | ✅ | ✅ (136 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100 chars) | ✅ | ✅ | ⚠️ | Description under 120 chars; no schema markup |
| jobs.html | ✅ | ✅ (133 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (147 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118 chars) | ✅ | ❌ | ⚠️ | No canonical tag; no schema markup; description just under 120 chars |
| terms.html | ✅ | ⚠️ (94 chars) | ✅ | ❌ | ⚠️ | No canonical tag; no schema markup; description under 120 chars |
| success.html | ✅ | ❌ (48 chars) | ⚠️ (og:image only) | ❌ | ⚠️ | `noindex` set (confirm intentional); missing og:title/og:description/og:url; no canonical; description far under range; no schema |
| cancel.html | ✅ | ❌ (53 chars) | ⚠️ (og:image only) | ❌ | ⚠️ | `noindex` set (confirm intentional); missing og:title/og:description/og:url; no canonical; description far under range; no schema |
| reset-password.html | ✅ | ❌ (34 chars) | ⚠️ (og:image only) | ❌ | ⚠️ | `noindex` set (confirm intentional); missing og:title/og:description/og:url; no canonical; description far under range; no schema |

### Notes
- All 15 pages have a present, descriptive `<title>` tag.
- All 15 pages have `og:image` pointing to `https://servicewindow.app/og-image.png`.
- All present `og:url` and `<link rel="canonical">` values correctly use the `servicewindow.app` domain — no domain-mismatch issues found where these tags exist.
- `index.html` has JSON-LD schema markup, satisfying the stated minimum requirement.

*Report only — no HTML files were modified as part of this audit.*
