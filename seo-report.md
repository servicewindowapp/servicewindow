# SEO & Metadata Audit — ServiceWindow

> Automated nightly audit. Report only — no HTML files were modified.
> Audit date: 2026-08-21

## Summary

- **Pages audited:** 15
- **Total issues found:** 21
- **Pages with zero issues:** 8 of 15 (`index.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`)

### Top 3 priority fixes

1. **Missing `<link rel="canonical">`** on `auth.html`, `privacy.html`, `terms.html`. `privacy.html` and `terms.html` are indexable (no `noindex`) yet have no canonical tag at all — add one on each pointing to its own `https://servicewindow.app/...` URL.
2. **Incomplete Open Graph tags** on `success.html`, `cancel.html`, `reset-password.html` — only `og:image` is set on all three; `og:title`, `og:description`, and `og:url` are missing entirely, so any shared link renders with a blank title/description in social previews.
3. **Meta description length out of the 120–160 char target range** on 7 pages — `marketplace.html` is 1 character over (161); `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` are all under 120 (as low as 34 chars on `reset-password.html`).

**Note on `robots: noindex`:** `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are set to `noindex, nofollow`. This trips check #9 literally, but these are transactional/auth pages (login, post-Stripe redirect, password reset) where `noindex` is standard practice, not a bug. Flagged below for visibility — confirm intentional, no fix recommended.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160 chars) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161 chars, 1 over limit) | ✅ | ✅ | ✅ | Description 1 char over 160-char max |
| find-trucks.html | ✅ | ✅ (155 chars) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95 chars, under 120) | ✅ | ❌ Missing | ⚠️ Absent (not required) | Missing canonical link; description short (95 chars); `robots: noindex` present (likely intentional — confirm) |
| pricing.html | ✅ | ✅ (134 chars) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153 chars) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98 chars, under 120) | ✅ | ✅ | ⚠️ Absent (not required) | Description short (98 chars) |
| jobs.html | ✅ | ✅ (131 chars) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145 chars) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154 chars) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116 chars, under 120) | ✅ | ❌ Missing | ⚠️ Absent (not required) | Missing canonical link; description slightly short (116 chars) |
| terms.html | ✅ | ⚠️ (92 chars, under 120) | ✅ | ❌ Missing | ⚠️ Absent (not required) | Missing canonical link; description short (92 chars) |
| success.html | ✅ | ⚠️ (48 chars, well under 120) | ❌ Only og:image set | ❌ Missing | ⚠️ Absent (not required) | Missing og:title/og:description/og:url; missing canonical; description too short (48 chars); `robots: noindex` present (likely intentional — confirm) |
| cancel.html | ✅ | ⚠️ (53 chars, well under 120) | ❌ Only og:image set | ❌ Missing | ⚠️ Absent (not required) | Missing og:title/og:description/og:url; missing canonical; description too short (53 chars); `robots: noindex` present (likely intentional — confirm) |
| reset-password.html | ✅ | ⚠️ (34 chars, well under 120) | ❌ Only og:image set | ❌ Missing | ⚠️ Absent (not required) | Missing og:title/og:description/og:url; missing canonical; description too short (34 chars); `robots: noindex` present (likely intentional — confirm) |

### Legend
- ✅ Pass
- ⚠️ Present but needs improvement
- ❌ Fail / missing

### Notes
- Schema markup (`<script type="application/ld+json">`) is present on `index.html` and 8 other pages (`marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, `property.html`). It is absent on `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html` — not required by the audit checklist outside `index.html`, so marked ⚠️ (optional enhancement) rather than ❌.
- All `og:url` and `<link rel="canonical">` values present in the audit correctly use the `servicewindow.app` production domain.
