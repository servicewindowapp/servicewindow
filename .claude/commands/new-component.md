# /new-component — Scaffold React Component

Scaffold a new React component with TypeScript interface, Tailwind styling, accessibility attributes, and a co-located test file stub.

## Invocation
```
/new-component <ComponentName> [description of what the component does]
```

## Rules — Apply Before Writing a Single Line

1. If the component name is not PascalCase, correct it before proceeding.
2. If no description is provided, ask: "What does this component do and what are its props?"
3. If the scaffold would exceed 150 lines, stop — decompose into sub-components first and describe the decomposition to the user before writing code.
4. Never use `any` types — not even in the test file.
5. If client state or event handlers are required, add `"use client"` and include a comment explaining why.
6. Never add a third-party dependency without flagging it to the user first.

## Output — Always Generate These Three Files

### 1. `src/components/<ComponentName>/<ComponentName>.tsx`

```tsx
// If this component requires client state or browser APIs, add:
// "use client"

interface <ComponentName>Props {
  // Define all props here with explicit types
  // No optional props without a documented reason
  // No `any` — ever
}

export function <ComponentName>({ ...props }: <ComponentName>Props) {
  return (
    // Use semantic HTML appropriate to the component's role
    // Apply Tailwind classes — mobile-first (unprefixed = mobile, md: = 768px+)
    // Include ARIA attributes only where native semantics are insufficient
    // All interactive elements: keyboard navigable, visible focus state
    // All images: explicit alt text (empty string for decorative)
    // Touch targets: minimum 44×44px
  )
}
```

### 2. `src/components/<ComponentName>/<ComponentName>.test.tsx`

```tsx
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { <ComponentName> } from './<ComponentName>'

expect.extend(toHaveNoViolations)

describe('<ComponentName>', () => {
  it('renders without crashing', () => {
    render(<ComponentName /* required props */ />)
    // Assert at least one visible element is in the document
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName /* required props */ />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it.todo('handles [primary interaction] correctly')
  it.todo('renders correctly in [key variant or state]')
})
```

### 3. `src/components/<ComponentName>/index.ts`

```ts
export { <ComponentName> } from './<ComponentName>'
export type { <ComponentName>Props } from './<ComponentName>'
```

Note: export the Props type only if it will be consumed by parent components.

## Accessibility Checklist — Verify Before Returning

- [ ] Correct semantic element for the component's role (`<button>` not `<div onClick>`, etc.)
- [ ] All images have `alt` text
- [ ] Interactive elements are keyboard navigable
- [ ] Focus state is visible (not suppressed with `outline-none` without a replacement)
- [ ] Form inputs have associated labels
- [ ] Color is not the only means of conveying information
- [ ] ARIA roles/attributes added only where native HTML is insufficient

## After Generating Files

State:
1. What the component does
2. Whether it's a Server or Client Component and why
3. Any props that will need validation or default values
4. Any architectural flag that applies (see `docs/webdev-standards.md`)
