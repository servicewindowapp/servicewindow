# SEO & Metadata Audit — ServiceWindow

**Run date:** 2026-09-02
**Pages audited:** 15
**Method:** Automated check of `<head>` tags in each production HTML file (title, meta description, Open Graph, canonical, JSON-LD schema, robots). Report only — no files were modified.

## Summary

- **Total pages audited:** 15
- **Total issues found:** 20 (12 ❌ fail, 8 ⚠️ needs improvement)
- **Pages fully clean:** 7 of 15 (`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`)

### Top 3 priority fixes

1. **Missing canonical tags on indexable pages** — `auth.html`, `privacy.html`, and `terms.html` have no `<link rel="canonical">`. These pages are indexable (no `noindex`), so this is the highest-impact gap: it leaves duplicate-content resolution to Google's guesswork.
2. **Meta descriptions well under the 120–160 char target** — `auth.html` (95), `contact.html` (98), and `terms.html` (92) are indexable pages with thin descriptions, producing weak/truncated-looking SERP snippets and hurting click-through.
3. **`success.html`, `cancel.html`, `reset-password.html` are missing og:title, og:description, og:url, and canonical entirely** — lower urgency since all three are correctly `noindex`'d, but the missing OG tags mean a shared link (e.g. a confirmation URL pasted into Slack/email) renders a broken preview.

### A note on `noindex`

`auth.html`, `success.html`, `cancel.html`, and `reset-password.html` all carry `<meta name="robots" content="noindex, nofollow">`. Per the audit checklist this reads as a "fail" (robots should not be `noindex` on a production page), but for a login page and post-Stripe redirect/utility pages this is standard, correct practice — these are not indexing candidates and shouldn't rank. Flagged here for visibility, not counted as a real issue, and no change is recommended.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None — fully compliant. |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over max) | ✅ | ✅ | ✅ | Description 1 char over the 160 target; trim slightly. |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None — fully compliant. |
| auth.html | ✅ | ❌ (95 chars, below 120) | ✅ | ❌ missing | ✅ (n/a for login page) | Description too short; no canonical tag. `noindex` present — intentional for a login page, not a bug. |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None — fully compliant. |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None — fully compliant. |
| contact.html | ✅ | ❌ (98 chars, below 120) | ✅ | ✅ | ⚠️ no schema | Description too short. No JSON-LD; a ContactPage/Organization block would be a low-cost add. |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None — fully compliant. |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None — fully compliant. |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None — fully compliant. |
| privacy.html | ✅ | ⚠️ (116 chars, slightly under 120) | ✅ | ❌ missing | ⚠️ no schema | No canonical tag; description a bit short. Schema optional/low priority for a legal page. |
| terms.html | ✅ | ❌ (92 chars, below 120) | ✅ | ❌ missing | ⚠️ no schema | No canonical tag; description too short. Schema optional/low priority for a legal page. |
| success.html | ✅ | ⚠️ (48 chars — short, but acceptable for a post-checkout utility page) | ❌ missing og:title/og:description/og:url (only og:image present) | ❌ missing | ✅ (n/a) | No canonical, no og:title/og:description/og:url. `noindex` present — correct for this page type. |
| cancel.html | ✅ | ⚠️ (53 chars — short, but acceptable for a post-checkout utility page) | ❌ missing og:title/og:description/og:url (only og:image present) | ❌ missing | ✅ (n/a) | No canonical, no og:title/og:description/og:url. `noindex` present — correct for this page type. |
| reset-password.html | ✅ | ⚠️ (34 chars — short, but acceptable for a utility page) | ❌ missing og:title/og:description/og:url (only og:image present) | ❌ missing | ✅ (n/a) | No canonical, no og:title/og:description/og:url. `noindex` present — correct for this page type. |

## Legend

- ✅ Pass
- ⚠️ Present but needs improvement (or intentionally out of spec for the page type)
- ❌ Fail / missing
