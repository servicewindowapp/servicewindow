# SEO Audit Report — 2026-10-07

## Summary
- **Pages audited:** 15
- **Total issues found:** 26 (across 8 pages; 7 pages fully clean)
- **Schema:** index.html has valid JSON-LD (requirement met)

### Top 3 priority fixes
1. **Add `<link rel="canonical">` to auth, privacy, terms, success, cancel, reset-password** — 6 pages are missing canonicals. Privacy and terms are indexable, so they matter most.
2. **Add og:title / og:description / og:url to success, cancel, reset-password** — these three pages have only og:image.
3. **Resolve `noindex, nofollow` on auth, success, cancel, reset-password** — the audit rule says no production page should be noindex. These look intentional (transactional pages), so confirm the policy. If intentional, drop the rule for them. If not, remove the tag. Also lengthen the short descriptions (success 48, cancel 53, reset-password 34, terms 92, auth 95, contact 98 chars) and trim marketplace (161) to the 120–160 range.

Legend: ✅ pass · ❌ fail · ⚠️ present but needs improvement. Schema is only required on index.html (— = not required, not present).

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (95) | ✅ | ❌ | — | Description too short; no canonical; robots `noindex, nofollow` |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (98) | ✅ | ✅ | — | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116) | ✅ | ❌ | — | Description slightly short; no canonical |
| terms.html | ✅ | ⚠️ (92) | ✅ | ❌ | — | Description too short; no canonical |
| success.html | ✅ | ⚠️ (48) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; robots `noindex, nofollow` |
| cancel.html | ✅ | ⚠️ (53) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; robots `noindex, nofollow` |
| reset-password.html | ✅ | ⚠️ (34) | ❌ | ❌ | — | Description too short; missing og:title, og:description, og:url; no canonical; robots `noindex, nofollow` |

## Notes
- All pages have a descriptive `<title>`. All 15 have og:image (`https://servicewindow.app/og-image.png`).
- Every og:url and canonical that exists uses the servicewindow.app domain.
- Report only: no HTML files were modified.
