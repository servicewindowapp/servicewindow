# SEO Audit Report — ServiceWindow
**Date:** 2026-06-04  
**Scope:** 15 production HTML pages  
**Auditor:** Automated — Claude Code

---

## Summary

| Metric | Count |
|--------|-------|
| Pages audited | 15 |
| Pages fully passing (all checks ✅) | 5 |
| Hard failures ❌ | 20 |
| Warnings ⚠️ | 11 |

> **Note:** 4 pages (`auth.html`, `success.html`, `cancel.html`, `reset-password.html`) carry `noindex, nofollow` — intentional for utility/transaction pages. Their SEO gaps are low-priority and listed for completeness only. Priority fixes below focus on the 11 indexable pages.

---

## Top 3 Priority Fixes

**1. Add `<link rel="canonical">` to `privacy.html` and `terms.html`**  
Both pages are linked from the footer of every page on the site and are fully indexed. Without a canonical tag, Google generates its own canonical — often inconsistently when query strings are appended. Two-line fix per file.

**2. Expand meta descriptions on `terms.html` (91 chars) and `contact.html` (97 chars)**  
Both fall well below the 120-character floor. Google rewrites short descriptions with arbitrary page text in SERPs, reducing click-through relevance. Target: 140–155 chars each.

**3. Add schema markup to `contact.html`, `privacy.html`, and `terms.html`**  
Three of 11 indexable pages have no `<script type="application/ld+json">`. At minimum, a `WebPage` or `Organization` block should be present. `contact.html` is the highest-value target since it's a direct conversion touchpoint.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Robots | Issues |
|------|-------|-------------|---------|-----------|--------|--------|--------|
| `index.html` | ✅ | ✅ 160 chars | ✅ | ✅ | ✅ | ✅ | None |
| `marketplace.html` | ✅ | ⚠️ 161 chars | ✅ | ✅ | ✅ | ✅ | Description 1 char over 160 |
| `find-trucks.html` | ✅ | ✅ 155 chars | ✅ | ✅ | ✅ | ✅ | None |
| `auth.html` | ✅ | ⚠️ 95 chars | ✅ | ❌ | ❌ | ⚠️ noindex | **noindex page** — low priority; missing canonical; description short (95 chars); no schema |
| `pricing.html` | ✅ | ✅ 134 chars | ✅ | ✅ | ✅ | ✅ | None |
| `about.html` | ✅ | ✅ 152 chars | ✅ | ✅ | ✅ | ✅ | OG tags split across head (og:title/desc near top, og:url/image after `</style>`) — functionally valid |
| `contact.html` | ✅ | ⚠️ 97 chars | ✅ | ✅ | ❌ | ✅ | **Description short (97 chars, target 120–160)**; no schema markup |
| `jobs.html` | ✅ | ✅ 131 chars | ✅ | ✅ | ✅ | ✅ | OG tags split across head — functionally valid |
| `venues.html` | ✅ | ✅ 144 chars | ✅ | ✅ | ✅ | ✅ | OG tags split across head — functionally valid |
| `property.html` | ✅ | ✅ 153 chars | ✅ | ✅ | ✅ | ✅ | OG tags split across head — functionally valid |
| `privacy.html` | ✅ | ⚠️ 116 chars | ✅ | ❌ | ❌ | ✅ | **Missing canonical**; description slightly short (116 chars); no schema |
| `terms.html` | ✅ | ❌ 91 chars | ✅ | ❌ | ❌ | ✅ | **Missing canonical**; **description too short (91 chars)**; no schema |
| `success.html` | ✅ | ❌ 48 chars | ❌ | ❌ | ❌ | ⚠️ noindex | **noindex page** — low priority; missing og:title, og:description, og:url; description too short (48 chars); no canonical; no schema |
| `cancel.html` | ✅ | ❌ 53 chars | ❌ | ❌ | ❌ | ⚠️ noindex | **noindex page** — low priority; missing og:title, og:description, og:url; description too short (53 chars); no canonical; no schema |
| `reset-password.html` | ✅ | ❌ 34 chars | ❌ | ❌ | ❌ | ⚠️ noindex | **noindex page** — low priority; missing og:title, og:description, og:url; description too short (34 chars); no canonical; no schema |

---

## Check Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Passes check |
| ⚠️ | Present but needs improvement |
| ❌ | Fails check |

**Checks performed per page:**
1. `<title>` — present and descriptive
2. `<meta name="description">` — present, 120–160 characters
3. OG Tags — all four present: `og:title`, `og:description`, `og:url` (servicewindow.app domain), `og:image`
4. `<link rel="canonical">` — present, servicewindow.app domain
5. `<script type="application/ld+json">` — present (required on index.html at minimum)
6. `<meta name="robots">` — not set to noindex on indexable production pages

---

## Findings Detail

### Indexable Pages With Issues

**`terms.html`** — 3 issues (highest priority)
- No `<link rel="canonical">` — add `<link rel="canonical" href="https://servicewindow.app/terms.html">`
- Description is 91 characters — expand to 130–155 chars covering governing jurisdiction, last-updated date, and key policy scope
- No schema markup — add a `WebPage` block

**`privacy.html`** — 3 issues
- No `<link rel="canonical">` — add `<link rel="canonical" href="https://servicewindow.app/privacy.html">`
- Description is 116 characters — expand slightly (target 130+ chars)
- No schema markup — add a `WebPage` block

**`contact.html`** — 2 issues
- Description is 97 characters — expand with specifics (response time, SWFL focus, support topics)
- No schema markup — add an `Organization` or `ContactPage` block

### Indexable Pages — Cosmetic Notes (Not Failures)

**`about.html`, `jobs.html`, `venues.html`, `property.html`** — OG tags are split: `og:title` and `og:description` appear near the top of `<head>`, while `og:url` and `og:image` appear after the embedded `<style>` block. All four tags are within `<head>` and are correctly parsed by all major crawlers and social platforms. No action required, but consolidating them would improve maintainability.

**`marketplace.html`** — description is 161 characters (1 over target). Minor; Google's threshold is not a hard cutoff.

### Noindex Utility Pages (auth, success, cancel, reset-password)

These pages carry `<meta name="robots" content="noindex, nofollow">` — intentionally excluded from search indexes. Their SEO metadata gaps (missing canonical, short descriptions, incomplete OG sets) are low priority. The missing `og:title`, `og:description`, and `og:url` on `success.html` and `cancel.html` would only matter if users share these URLs on social media; `og:image` is already present, providing a minimum fallback.

---

*Generated by Claude Code — servicewindow.app SEO audit, 2026-06-04*
