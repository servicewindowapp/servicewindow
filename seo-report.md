# SEO Audit Report — ServiceWindow
**Date:** 2026-05-12
**Pages audited:** 15
**Total issues found:** 26 (21 failures ❌, 5 warnings ⚠️)

---

## Top 3 Priority Fixes

1. **Add `noindex` robots tags to utility/transactional pages** — `success.html`, `cancel.html`, `reset-password.html`, and `auth.html` currently have no robots directive. Search engines will crawl and potentially index these pages. Add `<meta name="robots" content="noindex, nofollow">` to all four. Indexing Stripe callback and password-reset pages wastes crawl budget and can surface irrelevant results.

2. **Add missing canonical tags to 7 pages** — `auth.html`, `contact.html`, `privacy.html`, `terms.html`, `success.html`, `cancel.html`, and `reset-password.html` have no `<link rel="canonical">` tag. Without a canonical, search engines may generate duplicate URLs (e.g. with query strings) and split link equity across variants.

3. **Complete OG metadata on transactional pages** — `success.html`, `cancel.html`, and `reset-password.html` are missing `og:title`, `og:description`, and `og:url`. These appear in link previews when shared; the current state leaves those previews broken.

---

## Audit Table

| Page | Title | Description | OG Tags | Canonical | Schema | Issues |
|---|---|---|---|---|---|---|
| `index.html` | ✅ | ⚠️ | ✅ | ✅ | ✅ | Description at exactly 160-char ceiling; no `robots` tag on any page |
| `marketplace.html` | ✅ | ❌ | ✅ | ✅ | ✅ | Description 163 chars — exceeds 160-char limit |
| `find-trucks.html` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| `auth.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 97 chars (below 120 min); missing canonical; no schema; should have `noindex` |
| `pricing.html` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| `about.html` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| `contact.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 100 chars (below 120 min); missing canonical; no schema |
| `jobs.html` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| `venues.html` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| `property.html` | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| `privacy.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 118 chars (2 chars below 120 min); missing canonical; no schema |
| `terms.html` | ✅ | ⚠️ | ✅ | ❌ | ❌ | Description 94 chars (below 120 min); missing canonical; no schema |
| `success.html` | ✅ | ❌ | ❌ | ❌ | ❌ | Description 48 chars; missing `og:title`, `og:description`, `og:url`; missing canonical; no schema; should have `noindex` |
| `cancel.html` | ✅ | ❌ | ❌ | ❌ | ❌ | Description 53 chars; missing `og:title`, `og:description`, `og:url`; missing canonical; no schema; should have `noindex` |
| `reset-password.html` | ✅ | ❌ | ❌ | ❌ | ❌ | Description 34 chars; missing `og:title`, `og:description`, `og:url`; missing canonical; no schema; should have `noindex` |

---

## Per-Check Summary

| Check | Pass ✅ | Warning ⚠️ | Fail ❌ |
|---|---|---|---|
| `<title>` present and descriptive | 15 | 0 | 0 |
| `<meta name="description">` 120–160 chars | 8 | 5 | 2 |
| `<meta property="og:title">` | 12 | 0 | 3 |
| `<meta property="og:description">` | 12 | 0 | 3 |
| `<meta property="og:url">` (servicewindow.app) | 12 | 0 | 3 |
| `<meta property="og:image">` | 15 | 0 | 0 |
| `<link rel="canonical">` (servicewindow.app) | 8 | 0 | 7 |
| Schema markup (`ld+json`) | 8 | 0 | 7 |
| `<meta name="robots">` not set to noindex | 15* | 0 | 0 |

*No page has an explicit `robots` tag at all — neither blocking nor permissive. Utility pages (`auth`, `success`, `cancel`, `reset-password`) should have `noindex, nofollow` added.

---

## Raw Metadata Reference

| Page | Title | Description (chars) | og:url | Canonical | ld+json |
|---|---|---|---|---|---|
| `index.html` | ServiceWindow — Where Events Find Their Truck | 160 | `https://servicewindow.app` | `https://servicewindow.app/` | ✅ |
| `marketplace.html` | Browse Trucks & Marketplace — ServiceWindow SWFL | 163 | `https://servicewindow.app/marketplace.html` | `https://servicewindow.app/marketplace.html` | ✅ |
| `find-trucks.html` | Find a Food Truck Near You — ServiceWindow SWFL | 157 | `https://servicewindow.app/find-trucks.html` | `https://servicewindow.app/find-trucks.html` | ✅ |
| `auth.html` | Sign Up / Log In — ServiceWindow | 97 | `https://servicewindow.app/auth.html` | MISSING | ❌ |
| `pricing.html` | Pricing — ServiceWindow SWFL Food Truck Marketplace | 138 | `https://servicewindow.app/pricing.html` | `https://servicewindow.app/pricing.html` | ✅ |
| `about.html` | About \| ServiceWindow — SWFL Food Truck Marketplace | 155 | `https://servicewindow.app/about.html` | `https://servicewindow.app/about.html` | ✅ |
| `contact.html` | Contact \| ServiceWindow | 100 | `https://servicewindow.app/contact.html` | MISSING | ❌ |
| `jobs.html` | Jobs Board \| ServiceWindow — SWFL Food Truck Marketplace | 133 | `https://servicewindow.app/jobs.html` | `https://servicewindow.app/jobs.html` | ✅ |
| `venues.html` | Venue Partnerships \| ServiceWindow — SWFL Food Truck Marketplace | 147 | `https://servicewindow.app/venues.html` | `https://servicewindow.app/venues.html` | ✅ |
| `property.html` | Parking & Real Estate \| ServiceWindow — SWFL Food Truck Marketplace | 156 | `https://servicewindow.app/property.html` | `https://servicewindow.app/property.html` | ✅ |
| `privacy.html` | Privacy Policy \| ServiceWindow | 118 | `https://servicewindow.app/privacy.html` | MISSING | ❌ |
| `terms.html` | Terms of Service \| ServiceWindow | 94 | `https://servicewindow.app/terms.html` | MISSING | ❌ |
| `success.html` | You're In — ServiceWindow | 48 | MISSING | MISSING | ❌ |
| `cancel.html` | No Problem — ServiceWindow | 53 | MISSING | MISSING | ❌ |
| `reset-password.html` | Reset Password — ServiceWindow | 34 | MISSING | MISSING | ❌ |
