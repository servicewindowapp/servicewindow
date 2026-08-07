# SEO & Metadata Audit — ServiceWindow

**Audit date:** 2026-08-07
**Pages audited:** 15
**Scope:** Production HTML pages only (report-only — no HTML files were modified)

## Summary

- **Total pages audited:** 15
- **Total issues found:** 27 (15 high, 8 medium, 4 low)
- **Top 3 priority fixes:**
  1. **Add `<link rel="canonical">`** to `auth.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` — 6 of 15 pages are missing this tag entirely.
  2. **Complete Open Graph tags** on `success.html`, `cancel.html`, and `reset-password.html` — only `og:image` is set; `og:title`, `og:description`, and `og:url` are all missing, so shared/unfurled links fall back to generic browser previews.
  3. **Rewrite meta descriptions outside the 120–160 character target** — too short on `auth.html` (97), `contact.html` (100), `terms.html` (94), `privacy.html` (118), and too long on `marketplace.html` (163).

---

## Results

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|------|-------|--------------|---------|-----------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 163 chars (3 over target) | ✅ | ✅ | ✅ (2 ld+json blocks — confirm not duplicated) | Description slightly over 160-char guideline |
| `find-trucks.html` | ✅ | ✅ 157 chars | ✅ | ✅ | ✅ (2 ld+json blocks — confirm not duplicated) | None blocking |
| `auth.html` | ✅ | ⚠️ 97 chars (under target) | ✅ | ❌ missing | ⚠️ not present (optional here) | Canonical tag missing; description short; `robots: noindex, nofollow` set (likely intentional for an auth page, flagging per checklist) |
| `pricing.html` | ✅ | ✅ 136 chars | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | None |
| `contact.html` | ✅ | ⚠️ 100 chars (under target) | ✅ | ✅ | ⚠️ not present (optional here) | Description short — room to expand toward 120–160 |
| `jobs.html` | ✅ | ✅ 133 chars | ✅ | ✅ | ✅ | None |
| `venues.html` | ✅ | ✅ 147 chars | ✅ | ✅ | ✅ | None |
| `property.html` | ✅ | ✅ 156 chars | ✅ | ✅ | ✅ | None |
| `privacy.html` | ✅ | ⚠️ 118 chars (2 under target) | ✅ | ❌ missing | ⚠️ not present (optional here) | Canonical tag missing |
| `terms.html` | ✅ | ⚠️ 94 chars (under target) | ✅ | ❌ missing | ⚠️ not present (optional here) | Canonical tag missing; description short |
| `success.html` | ✅ | ⚠️ 48 chars (under target) | ❌ og:title, og:description, og:url all missing (only og:image present) | ❌ missing | ⚠️ not present (optional here) | Missing canonical + 3 OG tags; description very short; `robots: noindex, nofollow` set (likely intentional — post-checkout utility page) |
| `cancel.html` | ✅ | ⚠️ 53 chars (under target) | ❌ og:title, og:description, og:url all missing (only og:image present) | ❌ missing | ⚠️ not present (optional here) | Missing canonical + 3 OG tags; description very short; `robots: noindex, nofollow` set (likely intentional — post-checkout utility page) |
| `reset-password.html` | ✅ | ⚠️ 34 chars (under target) | ❌ og:title, og:description, og:url all missing (only og:image present) | ❌ missing | ⚠️ not present (optional here) | Missing canonical + 3 OG tags; description very short; `robots: noindex, nofollow` set (likely intentional — utility page) |

---

## Notes

- **Schema markup requirement:** The task spec requires JSON-LD structured data on `index.html` at minimum. That requirement is met — `index.html` has one `<script type="application/ld+json">` block. `marketplace.html`, `find-trucks.html`, `pricing.html`, `about.html`, `jobs.html`, `venues.html`, and `property.html` also carry schema (bonus coverage, not required). `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` have none — acceptable since schema isn't required outside the homepage, but worth adding to `contact.html` (e.g. `ContactPage`) if inbound-search relevance for that page matters.
- **`robots: noindex, nofollow`** appears on `auth.html`, `success.html`, `cancel.html`, and `reset-password.html`. These are almost certainly intentional (login/transactional/utility pages that shouldn't rank), but the audit checklist explicitly asks to flag any `noindex` on a production page, so they're called out above for visibility — no action recommended unless one of these was meant to be indexable.
- **Duplicate `application/ld+json` blocks** on `marketplace.html` and `find-trucks.html` (2 each) are not necessarily wrong (could be two distinct schema types, e.g. `Organization` + `BreadcrumbList`), but worth a quick manual check that they aren't accidentally duplicated/conflicting content.
- All `og:url` and canonical values that are present correctly use the `https://servicewindow.app` domain (no relative or wrong-domain URLs found).
- All 15 pages have a present, descriptive `<title>` — no blanks or placeholders found.
- No HTML files were modified as part of this audit, per instructions.
