# /pre-deploy — Pre-Deployment Code Quality Checklist

Run a final code quality sweep before any deployment. Covers the things that slip through code review and break in production. Complements the Engineering plugin's `/deploy-checklist` (which handles CI status, approvals, and rollback — run that one too).

## Invocation
```
/pre-deploy
/pre-deploy [file, directory, or PR description to scope the check]
```

With no argument, scan the full project or staged changes. With an argument, scope the check to that context.

---

## Checklist — Run Every Item

### 1. Debug and Development Artifacts

- [ ] No `console.log`, `console.warn`, `console.error` in production code paths
  - Search: `grep -r "console\." src/ --include="*.tsx" --include="*.ts" | grep -v "\.test\." | grep -v "\/\/"`)
- [ ] No `debugger` statements
- [ ] No TODO/FIXME comments that block shipping (flag them — don't silently remove)
- [ ] No commented-out code blocks that were meant to be deleted
- [ ] No `data-testid` attributes that leak into production HTML unnecessarily

### 2. Environment Variables and Secrets

- [ ] No API keys, tokens, or credentials hardcoded anywhere in source
  - Search patterns: `sk-`, `pk_`, `secret`, `password`, `token` in non-env-var contexts
- [ ] Every environment variable used in the app has an entry in `.env.example` (not `.env.local`)
- [ ] `.env.local` and `.env*.local` are in `.gitignore`
- [ ] All environment variables required by the app are configured in the deployment platform (Vercel dashboard)
- [ ] `NEXT_PUBLIC_` prefix is used only for variables that should be exposed to the browser — verify no secrets have this prefix

### 3. TypeScript

- [ ] No `any` types — run `tsc --noEmit` and confirm zero errors
- [ ] No `@ts-ignore` or `@ts-expect-error` without a comment explaining the reason
- [ ] No `as unknown as SomeType` casts that bypass type safety without justification
- [ ] All new interfaces and types are exported if consumed by other modules

### 4. Hardcoded Strings and Configuration

- [ ] No hardcoded URLs (use environment variables for API endpoints, base URLs)
- [ ] No hardcoded user IDs, org IDs, or environment-specific identifiers
- [ ] No hardcoded copy strings that should be in a constants file or i18n system
- [ ] Dates and currency formatting use locale-aware APIs (`Intl.DateTimeFormat`, `Intl.NumberFormat`)

### 5. Error Handling

- [ ] Every `async`/`await` call in production code paths has error handling (try/catch or `.catch()`)
- [ ] API routes return appropriate HTTP status codes on error — not always 200
- [ ] Error boundaries are in place for components that fetch data
- [ ] Failed data fetches show a user-facing error state, not an empty or broken UI
- [ ] No unhandled promise rejections (check for floating promises — `void` or `await` them)

### 6. Accessibility

- [ ] All images have `alt` text
- [ ] All form inputs have associated labels
- [ ] No `onClick` on non-interactive elements (`<div>`, `<span>`) without `role` and `tabIndex`
- [ ] Focus management is correct after modal open/close and route changes
- [ ] No `outline: none` without a visible focus replacement

### 7. Mobile Layout

- [ ] Test at 375px width — no content overflow, no horizontal scroll
- [ ] Touch targets are minimum 44×44px
- [ ] Text is readable without pinch-zoom (minimum 16px body text)
- [ ] No fixed-position elements that overlap critical content on small screens
- [ ] No hover-only interactions — all functionality is accessible via tap/click

### 8. Links and Navigation

- [ ] No broken internal links — all `href` values resolve to existing routes
- [ ] No `<Link href="">` empty hrefs
- [ ] External links that open in a new tab have `rel="noopener noreferrer"`
- [ ] No links to `localhost`, staging URLs, or development endpoints in production code

### 9. Performance Smoke Check

- [ ] No new `"use client"` directives added to components that have no client-side behavior
- [ ] No images without explicit dimensions that could cause CLS
- [ ] No large imports added without tree-shaking verification
- [ ] Hero / above-fold images use `priority` prop on `<Image>`

### 10. Git and Branch State

- [ ] Feature branch is up to date with `main` (no merge conflicts waiting)
- [ ] PR title follows conventional commit format
- [ ] No unintended files staged (`.env.local`, `node_modules`, build artifacts)
- [ ] `package-lock.json` or `yarn.lock` is committed if `package.json` changed

---

## Output Format

Run all checks. Report as:

**BLOCKERS** — Do not deploy until resolved.
- [Item]: [finding] → [exact fix]

**WARNINGS** — Should fix; acceptable risk to defer with documented reason.
- [Item]: [finding] → [recommended fix]

**PASSED** — Confirmed clean (list category names only, not every item).

End with one of:
- `CLEAR TO DEPLOY` — zero blockers
- `BLOCKED — N items must be resolved` — list the blockers

---

## Relationship to `/deploy-checklist`

This command checks code quality. Run both before any production deployment:

| Command | Checks |
|---------|--------|
| `/pre-deploy` (this) | `console.log`, env vars, TypeScript, hardcoded strings, accessibility, mobile, links |
| `/deploy-checklist` (Engineering plugin) | CI status, PR approvals, migration state, rollback plan, monitoring |
