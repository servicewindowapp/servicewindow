# Performance Budget Skill
> Performance violations are called out before the code is written, not after.

---

## JavaScript Bundle Budget

**Hard limit: 150kb gzipped per route.**

Before writing any code that adds a significant dependency or duplicates logic:

```
📦 BUNDLE BUDGET CHECK — [route or component]
Current action: [what's being added]
Bundle impact: [estimated size or "unknown — check bundlephobia"]
If this route already has significant JS:
→ Flag for code splitting before adding more
→ Verify dynamic import() is used for non-critical components
→ Confirm tree-shaking is effective on any new imports
```

When code splitting is needed:
```tsx
// ❌ Static import of heavy component loaded on initial render
import { HeavyChart } from '@/components/HeavyChart'

// ✓ Dynamic import — loads only when needed
import dynamic from 'next/dynamic'
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false // only if component requires browser APIs
})
```

Flag any single `import` that adds > 20kb gzipped without justification.

---

## Images — No Raw `<img>` Tags

```
🔴 PERFORMANCE STOP — Raw <img> tag detected
Replace with Next.js <Image> component:
- Automatic WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading by default
- Explicit width/height prevents CLS
```

Required pattern:
```tsx
import Image from 'next/image'

// Local image
<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={800}       // required — prevents CLS
  height={600}      // required — prevents CLS
  priority={true}   // only for LCP / above-the-fold images
/>

// Dynamic/fill usage
<div className="relative h-64 w-full">
  <Image
    src={imageUrl}
    alt="Description"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"  // required with fill
  />
</div>
```

Rules:
- `priority` on above-the-fold images (hero, profile header) — never on below-fold images
- `sizes` required when image width varies by viewport
- Never set `unoptimized={true}` without flagging it

---

## Fonts — Maximum 2 Families, `next/font` Only

```
🔴 PERFORMANCE STOP — External font CDN link detected
Google Fonts CDN links cause render-blocking requests and privacy implications.
Replace with next/font:
```

```typescript
// ❌ Never
// In <head>: <link href="https://fonts.googleapis.com/css2?family=..." />

// ✓ Required
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700'],
})
```

Rules:
- Maximum 2 font families per project — flag if a third is requested
- Load only the weights actually used in the design system — no `weight: ['100', '200', ..., '900']`
- `display: 'swap'` is the default and required
- Local fonts use `next/font/local`

---

## Third-Party Scripts — `next/script` Required

```
🟡 PERFORMANCE FLAG — Third-party script without next/script
Script: [url or description]
```

Required pattern:
```tsx
import Script from 'next/script'

// Analytics, chat widgets, non-critical tools
<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"
  onLoad={() => console.log('loaded')}
/>

// Tools needed after page interaction
<Script
  src="https://example.com/script.js"
  strategy="afterInteractive"
/>

// ⚠️ Only with explicit justification
<Script
  src="https://example.com/critical.js"
  strategy="beforeInteractive"
  // Justification: [required]
/>
```

Flag any script using `strategy="beforeInteractive"` — it blocks page render and must be explicitly justified.

---

## `localStorage` / `sessionStorage` — No Sync Access on Render

```
🟡 PERFORMANCE FLAG — Synchronous storage access during render
localStorage/sessionStorage access during SSR causes hydration mismatch.
```

Required pattern:
```tsx
// ❌ Causes SSR mismatch
const [value, setValue] = useState(localStorage.getItem('key'))

// ✓ Safe pattern — deferred to client
const [value, setValue] = useState<string | null>(null)

useEffect(() => {
  setValue(localStorage.getItem('key'))
}, [])

// ✓ Or use a hook that handles SSR safely
import { useLocalStorage } from '@/hooks/useLocalStorage'
const [value, setValue] = useLocalStorage('key', defaultValue)
```

---

## Data Fetching — SWR or React Query, No Raw `useEffect`

```
🟡 PERFORMANCE FLAG — Raw useEffect fetch pattern detected
useEffect for data fetching causes:
- No caching (every mount re-fetches)
- No request deduplication
- Race conditions on fast navigation
- No background revalidation
```

Required pattern:
```tsx
// ❌ Raw useEffect fetch
useEffect(() => {
  fetch('/api/trucks').then(r => r.json()).then(setTrucks)
}, [])

// ✓ SWR
import useSWR from 'swr'

const { data, error, isLoading } = useSWR('/api/trucks', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 5000,
})

// ✓ React Query
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['trucks'],
  queryFn: fetchTrucks,
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

Server Components that fetch data directly do not need SWR/React Query — this rule applies to Client Components only.

---

## LCP Element — Must Be Identified and Optimized

Before any page is considered complete:

```
⚡ LCP CHECK REQUIRED
Every page must have an identified LCP element before shipping.
Confirm:
  [ ] What is the LCP element? (image, heading, or text block)
  [ ] If image: uses <Image> with priority={true}
  [ ] If text: no render-blocking fonts or scripts delay its paint
  [ ] No Suspense boundary wraps the LCP element
  [ ] LCP element is server-rendered, not deferred to client
```

---

## Imports — Tree Shaking Required

```tsx
// ❌ Barrel import — pulls in entire library
import _ from 'lodash'
import * as Icons from 'lucide-react'

// ✓ Named import — tree-shakeable
import debounce from 'lodash/debounce'
import { ChevronRight, Search } from 'lucide-react'

// ❌ shadcn barrel (if applicable)
import { Button, Card, Input } from '@/components/ui'

// ✓ Direct import
import { Button } from '@/components/ui/button'
```

---

## Performance Budget Summary — Pre-Code Checklist

Before writing any new page or component that has performance implications:

1. **Bundle impact** — will this push any route over 150kb gzipped?
2. **Images** — is `<Image>` used with explicit dimensions?
3. **Fonts** — is this adding a third font family?
4. **Scripts** — does any new script have a defined `strategy`?
5. **LCP** — is the LCP element identified and optimized?
6. **Data fetching** — is SWR or React Query used for client-side fetching?
7. **Storage access** — is localStorage/sessionStorage access deferred past render?

If any item is "unknown," flag it before writing code.
