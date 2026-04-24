# /perf-check — Core Web Vitals Performance Review

Review a file or component for Core Web Vitals impact. Focused on LCP, CLS, and INP. Produces specific, actionable findings — not a generic performance lecture.

## Invocation
```
/perf-check [file path or paste file contents]
/perf-check src/app/page.tsx
/perf-check src/components/Hero/Hero.tsx
```

If no file is specified, review the most recently discussed or edited file.

## Audit Checklist

### LCP — Largest Contentful Paint (target: < 2.5s)

**Images:**
- [ ] Hero image uses `<Image>` from `next/image` with `priority` prop (prevents lazy load for LCP element)
- [ ] No hero image loaded via CSS `background-image` — CSS backgrounds are not LCP candidates and can't be preloaded effectively
- [ ] Image dimensions match the rendered size at the largest viewport (no over-fetching)
- [ ] Image format is WebP or AVIF (Next.js `<Image>` handles this automatically — verify `unoptimized` is not set)
- [ ] `sizes` prop is set on `<Image>` components that render at varying widths

**Fonts:**
- [ ] Custom fonts use `next/font` (auto-optimized, no FOUT/FOIT)
- [ ] No `@import` of Google Fonts in CSS — use `next/font/google` instead
- [ ] Font `display: swap` or `display: optional` is set

**Server components:**
- [ ] LCP content is rendered server-side — not deferred to a client `useEffect` fetch
- [ ] No data fetching in a `useEffect` for above-the-fold content (causes late paint)
- [ ] `Suspense` boundaries don't wrap the LCP element — place boundaries below the fold

**Resource loading:**
- [ ] No render-blocking scripts in `<head>` without `async`/`defer`/`type="module"`
- [ ] Third-party scripts loaded via `next/script` with `strategy="lazyOnload"` or `strategy="afterInteractive"`

---

### CLS — Cumulative Layout Shift (target: < 0.1)

**Images and media:**
- [ ] Every `<Image>` has explicit `width` and `height` props, or `fill` with a sized container
- [ ] Every `<img>` has explicit `width` and `height` attributes
- [ ] `<video>` and `<iframe>` elements have explicit dimensions or use `aspect-ratio` CSS
- [ ] No images or embeds without reserved space

**Dynamic content:**
- [ ] No content is injected above existing content after initial load (ads, banners, cookie notices)
- [ ] Skeleton loaders reserve the same space as the final content
- [ ] Fonts don't cause layout shift — using `next/font` with `display: swap` limits CLS to the initial paint
- [ ] No CSS `top`/`left` animations that cause reflow — use `transform` instead

**Fonts:**
- [ ] `size-adjust` or `ascent-override` configured on font fallbacks to minimize shift (Next.js handles this automatically with `next/font`)

---

### INP — Interaction to Next Paint (target: < 200ms)

**Event handlers:**
- [ ] Click handlers don't trigger synchronous heavy computation (loops over large arrays, DOM queries, etc.)
- [ ] `useTransition` wraps non-urgent state updates that would cause a slow re-render
- [ ] `useDeferredValue` used for expensive derived state (filtering, sorting large lists)
- [ ] No state update triggers a full page re-render when a partial update would suffice

**Component structure:**
- [ ] Components that re-render on interaction are not unnecessarily large
- [ ] Lists over 50 items use virtualization (e.g., `@tanstack/virtual`) — flag this before implementing
- [ ] Heavy child components are memoized with `React.memo` where re-render is purely prop-driven

**Bundle size:**
- [ ] No large libraries imported without tree-shaking (e.g., `import _ from 'lodash'` vs `import debounce from 'lodash/debounce'`)
- [ ] Dynamic `import()` used for components not needed on initial render (modals, off-screen tabs, etc.)
- [ ] Third-party components from shadcn/ui are imported individually, not from a barrel export that imports everything

---

### Bundle and Load

- [ ] No `"use client"` on components that have no client-side behavior
- [ ] Server Components are used for data fetching — no client-side `fetch` in `useEffect` for initial data
- [ ] Images outside the viewport (below fold) are lazy loaded — `<Image>` does this automatically; confirm `loading="eager"` is not set incorrectly
- [ ] No inline SVGs with hundreds of paths that could be externalized and cached

---

## Output Format

Report findings as:

**CRITICAL** — Will fail Core Web Vitals threshold. Fix before shipping.
- Finding: [description]
- File/line: [location]
- Fix: [exact code change or pattern]

**HIGH** — Likely to degrade score, especially on slower connections or mobile.
- Same format as CRITICAL

**MEDIUM** — Won't fail thresholds but leaves performance on the table.

**LOW / INFO** — Best practice gaps, minor improvements.

End with: `LCP risk: [low/medium/high] | CLS risk: [low/medium/high] | INP risk: [low/medium/high]`

If a finding requires a new dependency or an architectural change, flag it explicitly before recommending it.
