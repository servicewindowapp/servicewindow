# SEO Audit Report — 2026-09-29

## Summary
- **Pages audited:** 15
- **Total issues found:** 28
- **Pages fully passing:** 6 (index, find-trucks, pricing, about, venues, property)

### Top 3 priority fixes
1. **Add `og:title`, `og:description`, `og:url`, canonical and a 120–160 char description to `success.html`, `cancel.html`, `reset-password.html`** — these three pages are missing 6 checks each (18 of 28 issues). They are `noindex`, so search impact is low, but social/link previews are blank.
2. **Add `<link rel="canonical">` to `auth.html`, `privacy.html`, `terms.html`** — the two legal pages are indexable and have no canonical.
3. **Lengthen short meta descriptions (120–160 chars)** on `terms.html` (94), `auth.html` (97), `contact.html` (100), `privacy.html` (118); shorten `marketplace.html` (163).

### Other notes
- **noindex (check 9):** `auth.html`, `success.html`, `cancel.html`, `reset-password.html` carry `noindex, nofollow`. This is flagged per the audit rule, but is normally correct for transactional/auth pages — confirm intent before removing.
- **Copy error:** `jobs.html` og:description and JSON-LD say "21 SWFL cities"; project rule is 22.
- **Schema:** `index.html` has JSON-LD (passes minimum). Also present on marketplace, find-trucks, pricing, about, jobs, venues, property. Not present on contact, privacy, terms, auth, success, cancel, reset-password (not required).
- All `og:image` tags present (`og-image.png` exists in repo root).

## Legend
✅ pass · ❌ fail · ⚠️ present but needs improvement

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|-------------|---------|-----------|--------|--------|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (163) | ✅ | ✅ | ✅ | Description 3 chars over 160 |
| find-trucks.html | ✅ | ✅ (157) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ⚠️ (97) | ✅ | ❌ | ❌ | Description too short; no canonical; `noindex, nofollow` |
| pricing.html | ✅ | ✅ (136) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ⚠️ (100) | ✅ | ✅ | ❌ | Description too short |
| jobs.html | ✅ | ✅ (133) | ✅ | ✅ | ✅ | Says "21 SWFL cities" (should be 22) in og:description and JSON-LD |
| venues.html | ✅ | ✅ (147) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (156) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (118) | ✅ | ❌ | ❌ | Description 2 chars short; no canonical |
| terms.html | ✅ | ⚠️ (94) | ✅ | ❌ | ❌ | Description too short; no canonical |
| success.html | ✅ | ❌ (48) | ❌ (only og:image) | ❌ | ❌ | Description too short; missing og:title, og:description, og:url; no canonical; `noindex, nofollow` |
| cancel.html | ✅ | ❌ (53) | ❌ (only og:image) | ❌ | ❌ | Description too short; missing og:title, og:description, og:url; no canonical; `noindex, nofollow` |
| reset-password.html | ✅ | ❌ (34) | ❌ (only og:image) | ❌ | ❌ | Description too short; missing og:title, og:description, og:url; no canonical; `noindex, nofollow` |
