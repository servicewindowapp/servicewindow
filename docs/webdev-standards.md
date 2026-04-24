# Web App Development Standards
> **Scope:** Applies to Next.js / TypeScript / React web app work in this workspace.
> **Does NOT apply to:** ServiceWindow static HTML files — see `CLAUDE.md` for those rules.
> Last updated: 2026-04-18

---

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 14+ (App Router) | Use `app/` directory, not `pages/` |
| Language | TypeScript — strict mode | `"strict": true` in tsconfig, no exceptions |
| Styling | Tailwind CSS + shadcn/ui | No external CSS frameworks, no inline styles |
| Testing | Vitest + React Testing Library | Co-located test files, `jest-axe` for a11y |

---

## Architecture Rules

- **Default to Server Components.** Add `"use client"` only when client state, browser APIs, or event handlers are required. Document why in a comment at the top of the file.
- **Components under 200 lines.** Extract business logic to custom hooks (`useXxx`). If scaffolding a component exceeds 150 lines, stop and decompose before writing code.
- **No `any` types.** Use `unknown` and narrow with type guards, or define explicit interfaces. TypeScript errors are not ignored with `@ts-ignore` without a documented reason.
- **No unused imports.** ESLint enforced. Remove before commit.
- **Props interfaces are named, not inline.** `interface ComponentNameProps { ... }` — never anonymous types in JSX signatures.

---

## Code Quality — Hard Rules

- **No `console.log` in committed code.** Use a logger utility or strip before commit.
- **No hardcoded strings in UI.** Use constants or i18n keys.
- **No secrets in code.** All API keys and credentials via `.env.local` / environment variables. Never committed to git.
- **Error handling is not optional.** Every async function has a try/catch or is wrapped in an error boundary. Unhandled promise rejections are a bug.
- **No `any` in TypeScript** — not even temporarily during development.
- **Every new dependency must be flagged.** Don't add a third-party package without telling the user. State: what it does, bundle size impact, and whether a native alternative exists.

---

## Accessibility — WCAG 2.1 AA

Every component must meet these minimums:

- All interactive elements have visible focus states (not just `outline: none`)
- All `<img>` elements require `alt` text — empty string `alt=""` for decorative images only
- Form inputs require associated `<label>` elements (via `htmlFor` or wrapping)
- Color contrast: 4.5:1 minimum for normal text, 3:1 for large text and UI components
- Keyboard navigation works for all interactive elements — no mouse-only interactions
- ARIA attributes only when native HTML semantics are insufficient — prefer semantic HTML first
- Test with `axe` in every component test file

---

## Core Web Vitals Targets

| Metric | Target | Primary levers |
|--------|--------|----------------|
| LCP | < 2.5s | `priority` prop on hero images, preload critical fonts, minimize render-blocking resources |
| CLS | < 0.1 | Explicit `width`/`height` on all images and embeds, avoid injecting content above the fold dynamically |
| INP | < 200ms | Avoid heavy main-thread work on interaction, use `useTransition` for non-urgent state updates |

---

## SEO — Required on Every Page

Every page must export a `metadata` object (or use `generateMetadata`) containing:

```typescript
export const metadata: Metadata = {
  title: 'Page Title | Site Name',
  description: 'Page description — 150–160 characters',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://example.com/page',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://example.com/page',
  },
}
```

Structured data (JSON-LD) is required where applicable:
- Home / About → `Organization`
- Product / Service pages → `Product`
- Blog posts → `Article`
- Any multi-level navigation → `BreadcrumbList`

Heading hierarchy: single `<h1>` per page, logical `<h2>`/`<h3>` nesting, no skipped levels.

---

## Git Discipline

- **No direct commits to `main`.** Feature branches only. PRs required for all changes.
- **Conventional commits:**
  - `feat:` — new feature
  - `fix:` — bug fix
  - `chore:` — tooling, deps, config
  - `refactor:` — code change with no behavior change
  - `docs:` — documentation only
  - `style:` — formatting, whitespace
  - `test:` — adding or updating tests
- PR titles must match conventional commit format
- Squash merge PRs — clean linear history on `main`

---

## Mobile-First Responsive Design

- Write Tailwind classes mobile-first: unprefixed = mobile, `md:` = 768px+, `lg:` = 1024px+
- Test all UI at 375px, 768px, and 1280px minimum before marking complete
- Touch targets minimum 44×44px — no smaller interactive elements
- No horizontal scroll at any viewport width

---

## Component Scaffold Pattern

Every new component includes:

1. Named `interface ComponentNameProps` for props
2. Named function export (not anonymous default export)
3. Accessibility attributes appropriate to the semantic role
4. Co-located test file: `ComponentName.test.tsx`
5. Barrel export via `index.ts` in the component folder

**File structure:**
```
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.test.tsx
  index.ts
```

---

## Deployment

- **Platform:** Vercel (primary) — preview deployments on every PR, production on `main` merge
- All environment variables must be configured in the Vercel dashboard before deploying
- Run `/pre-deploy` checklist before any production push
- No `console.log`, no hardcoded strings, no `any` types merge to `main`

---

## Architectural Flags — Stop and Notify User Before Proceeding

Flag and get explicit approval before implementing any of the following:

- A decision that affects the database schema or data model
- A decision that creates vendor lock-in (platform, SDK, proprietary format)
- Disabling TypeScript strict mode — even temporarily
- Adding a new third-party npm dependency
- A URL structure change that affects existing SEO routes
- Switching from Server Component to Client Component in a high-traffic route
- Any pattern that will be difficult or costly to reverse

---

## Standing Instructions for All Web App Work

Apply these to every task without being told:

1. Never generate placeholder or lorem ipsum content — use realistic copy
2. Never skip error handling
3. Never use `any` in TypeScript
4. Default to Server Components unless client state is required
5. Flag architectural decisions that are hard to reverse before implementing
6. If a better approach exists than what was asked, say so and provide both options
