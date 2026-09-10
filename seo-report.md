# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-09-10
**Pages audited:** 15
**Total issues found:** 27
**Note:** Report only — no HTML files were modified.

## Top 3 Priority Fixes

1. **Missing `<link rel="canonical">`** on 6 pages (`auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, `reset-password.html`). Canonical tags prevent duplicate-content signals and should be added to every production page.
2. **Open Graph tags entirely missing** on `success.html`, `cancel.html`, `reset-password.html` (`og:title`, `og:description`, `og:url` all absent — only `og:image` present). Social shares/link previews for these pages will render blank or fall back to defaults.
3. **Meta description length out of the 120–160 char range** on 8 pages — most are too short: `auth.html` (95), `contact.html` (98), `terms.html` (92), `success.html` (48), `cancel.html` (53), `reset-password.html` (34), `privacy.html` (116, borderline); `marketplace.html` is 1 character over (161).

*Secondary note:* `auth.html`, `success.html`, `cancel.html`, and `reset-password.html` are set to `noindex, nofollow`. This may be intentional for gated/transactional pages, but is flagged per the audit checklist since these are listed production pages — confirm intent rather than treat as an automatic fix.

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| index.html | ✅ | ✅ (160) | ✅ | ✅ | ✅ | None |
| marketplace.html | ✅ | ⚠️ (161, 1 over) | ✅ | ✅ | ✅ | Description 1 char over 160 |
| find-trucks.html | ✅ | ✅ (155) | ✅ | ✅ | ✅ | None |
| auth.html | ✅ | ❌ (95, too short) | ✅ | ❌ missing | — (n/a) | Description too short; canonical missing; `robots: noindex, nofollow` present |
| pricing.html | ✅ | ✅ (134) | ✅ | ✅ | ✅ | None |
| about.html | ✅ | ✅ (153) | ✅ | ✅ | ✅ | None |
| contact.html | ✅ | ❌ (98, too short) | ✅ | ✅ | — (n/a) | Description too short |
| jobs.html | ✅ | ✅ (131) | ✅ | ✅ | ✅ | None |
| venues.html | ✅ | ✅ (145) | ✅ | ✅ | ✅ | None |
| property.html | ✅ | ✅ (154) | ✅ | ✅ | ✅ | None |
| privacy.html | ✅ | ⚠️ (116, borderline) | ✅ | ❌ missing | — (n/a) | Description slightly short; canonical missing |
| terms.html | ✅ | ❌ (92, too short) | ✅ | ❌ missing | — (n/a) | Description too short; canonical missing |
| success.html | ✅ | ❌ (48, too short) | ❌ (og:title/description/url missing) | ❌ missing | — (n/a) | Description too short; OG title/description/url missing; canonical missing; `robots: noindex, nofollow` present |
| cancel.html | ✅ | ❌ (53, too short) | ❌ (og:title/description/url missing) | ❌ missing | — (n/a) | Description too short; OG title/description/url missing; canonical missing; `robots: noindex, nofollow` present |
| reset-password.html | ✅ | ❌ (34, too short) | ❌ (og:title/description/url missing) | ❌ missing | — (n/a) | Description too short; OG title/description/url missing; canonical missing; `robots: noindex, nofollow` present |

### Legend
✅ Pass · ⚠️ Present but needs improvement · ❌ Fail · — Not applicable (schema markup is only required on `index.html` per audit scope; other pages are noted but not penalized for its absence)

### Check reference
1. `<title>` — present and descriptive
2. `<meta name="description">` — present, 120–160 characters
3. `<meta property="og:title">` — present
4. `<meta property="og:description">` — present
5. `<meta property="og:url">` — present, `servicewindow.app` domain
6. `<meta property="og:image">` — present
7. `<link rel="canonical">` — present, `servicewindow.app` domain
8. Schema markup (`<script type="application/ld+json">`) — required at minimum on `index.html`
9. `<meta name="robots">` — should not be `noindex` on production pages
