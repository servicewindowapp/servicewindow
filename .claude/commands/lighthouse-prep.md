# /lighthouse-prep — Pre-Lighthouse Checklist

Run before any Lighthouse audit or before flagging a page as production-ready. Targets the categories Lighthouse scores: Performance, Accessibility, Best Practices, and SEO.

## Invocation
```
/lighthouse-prep [page file or URL path]
/lighthouse-prep src/app/page.tsx
/lighthouse-prep /about
```

---

## Checklist — Run Every Category

### PERFORMANCE

#### Image Optimization
- [ ] Every image uses `<Image>` from `next/image` — no raw `<img>` tags
- [ ] LCP candidate image (hero, above-fold) has `priority={true}`
- [ ] All `<Image>` components have explicit `width` and `height` or `fill` with a sized container
- [ ] `sizes` prop is set on responsive images that render at varying widths
- [ ] No images loaded via CSS `background-image` for above-fold content (can't be preloaded effectively)
- [ ] SVG files are inlined or used as `<Image>` where possible — large external SVG loads block rendering

```
IDENTIFIED LCP ELEMENT: [what element is likely the LCP on this page]
LCP optimization status: [optimized / needs attention]
```

#### Font Loading
- [ ] All fonts loaded via `next/font` — no `<link>` to Google Fonts CDN
- [ ] Font subsets are specific (`subsets: ['latin']`) — not loading all character sets
- [ ] Font display strategy: `display: 'swap'` (or `optional` for non-critical)
- [ ] No `@font-face` declarations with `display: block` or no `display` set
- [ ] Maximum 2 font families loaded — flag if more

#### Render-Blocking Resources
- [ ] No `<link rel="stylesheet">` in `<head>` for non-critical CSS — everything is Tailwind (purged) or component-scoped
- [ ] No synchronous `<script>` tags without `async` or `defer`
- [ ] All third-party scripts use `next/script` with an appropriate `strategy`
- [ ] No polyfills loaded for features natively supported in modern browsers

#### JavaScript
- [ ] Large components below the fold use `dynamic()` import
- [ ] Heavy libraries (charting, rich text editors, etc.) are code-split
- [ ] No `"use client"` on Server Components — check all `use client` directives are justified
- [ ] No client-side data fetching with raw `useEffect` — SWR or React Query used

#### Unused CSS/JS
- [ ] Tailwind CSS purge is configured correctly (content paths cover all component files)
- [ ] No entire library imported when only a few utilities are needed (check lodash, date-fns patterns)
- [ ] `next build` output checked — flag any route with unusually large First Load JS

### ACCESSIBILITY

These are the Lighthouse-measurable a11y items (automated checks only):

- [ ] All images have `alt` attributes
- [ ] All form inputs have associated labels
- [ ] `<html>` has a `lang` attribute (`<html lang="en">` in root layout)
- [ ] `<title>` is present and descriptive
- [ ] Links have discernible text (not just icons without labels)
- [ ] Buttons have accessible names
- [ ] Color contrast meets 4.5:1 for normal text
- [ ] No elements with duplicate IDs on the page
- [ ] ARIA attributes are valid and correctly applied
- [ ] `viewport` meta tag does not disable user scaling (`user-scalable=no` fails Lighthouse)

Note: Lighthouse a11y covers ~30% of WCAG criteria. Run `/a11y-full` for comprehensive coverage.

### BEST PRACTICES

- [ ] HTTPS — page loads over HTTPS (Vercel handles this automatically)
- [ ] No `console.log`, `console.error`, or `console.warn` in production code paths
- [ ] No JavaScript errors in the browser console on page load
- [ ] No deprecated APIs used (check for `document.write`, synchronous XHR)
- [ ] Images have correct aspect ratios (no distorted images)
- [ ] `rel="noopener"` or `rel="noreferrer"` on all `target="_blank"` links
- [ ] No browser notification prompts triggered immediately on load
- [ ] No geolocation requests triggered immediately on load
- [ ] No mixed content (HTTPS page loading HTTP resources)
- [ ] `Content-Security-Policy` header configured (flag if not set)

### SEO

- [ ] `<title>` is present, descriptive, and under 60 characters
- [ ] `<meta name="description">` is present and 150–160 characters
- [ ] `<html lang="[locale]">` set in root layout
- [ ] Canonical URL set via `alternates.canonical` in metadata
- [ ] No `<meta name="robots" content="noindex">` on pages that should be indexed
- [ ] Structured data (JSON-LD) is valid — check with https://validator.schema.org
- [ ] Open Graph tags present: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] OG image dimensions: 1200×630px minimum
- [ ] `robots.txt` exists and is correctly configured
- [ ] `sitemap.xml` exists (or `app/sitemap.ts` generates it dynamically)
- [ ] Correct heading hierarchy — single `<h1>`, no skipped levels
- [ ] All links have descriptive anchor text (not "click here")
- [ ] Mobile viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`

### HTTP/2 and Resource Hints (Advanced)

- [ ] Critical resources are preloaded where beneficial: `<link rel="preload">` for critical fonts or images not auto-detected by Next.js
- [ ] DNS prefetch for known third-party domains: `<link rel="dns-prefetch" href="https://cdn.example.com">`
- [ ] Preconnect for critical third-party origins: `<link rel="preconnect" href="https://api.example.com">`
- [ ] No excessive preloading (> 5-6 preload hints negates the benefit)

In Next.js, most of these are handled automatically — flag only if custom `<head>` manipulation is present.

---

## Quick Fixes Before Running Lighthouse

These five fixes produce the highest Lighthouse score gains with the least effort:

1. **LCP image with `priority`** — single biggest Performance gain
2. **`alt` text on all images** — single biggest Accessibility gain  
3. **`<meta name="description">`** — required for SEO score
4. **`lang` on `<html>`** — Lighthouse a11y hard fail without it
5. **No `console.log` in production** — Best Practices deduction

---

## Output Format

Report as four sections (Performance / Accessibility / Best Practices / SEO):

For each section:
- **READY** — items confirmed clean
- **NEEDS FIX** — specific item, what's wrong, exact fix
- **UNKNOWN** — items that require runtime check (can't be verified from static analysis)

End with:
```
LIGHTHOUSE READINESS
Performance: [ready/has blockers]
Accessibility: [ready/has blockers]
Best Practices: [ready/has blockers]
SEO: [ready/has blockers]

Blockers: [N total — list them]
```

If no blockers: `✓ LIGHTHOUSE READY — no pre-flight issues found`
