# Testing Standards Skill
> Test stubs ship with the code, not after. No PR-ready code without tests.

---

## Core Rule

Every piece of code delivered as "complete" must include its tests. There is no "I'll add tests later." If a component, hook, utility, or API route is delivered without at minimum the test stubs, it is not complete.

---

## Component Tests — Minimum Required

Every new component gets a co-located `ComponentName.test.tsx` with at least three tests:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ComponentName } from './ComponentName'

expect.extend(toHaveNoViolations)

describe('ComponentName', () => {
  // TEST 1 — Render test (required)
  it('renders the [primary visible element] correctly', () => {
    render(<ComponentName prop="value" />)
    expect(screen.getByRole('[role]', { name: '[accessible name]' })).toBeInTheDocument()
    // Assert the key visible content, not implementation details
    // Use getByRole, getByLabelText, getByText — not getByTestId unless necessary
  })

  // TEST 2 — Accessibility (required)
  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName prop="value" />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  // TEST 3 — Snapshot (required)
  it('matches snapshot', () => {
    const { container } = render(<ComponentName prop="value" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  // Additional stubs — mark pending, not skipped
  it.todo('shows an error state when [error condition]')
  it.todo('calls [handler] when [interaction]')
  it.todo('renders correctly in [variant state]')
})
```

**Test description rules:**
- Plain English, readable by a non-engineer
- Pattern: `it('[action or condition] when/if [context]')`
- Good: `it('shows an error message when the email field is empty')`
- Bad: `it('test input validation')`
- Bad: `it('component test 1')`
- No abbreviations in test names

---

## Utility Function Tests — Full Coverage Required

Every utility function gets a test file `utilityName.test.ts` covering three cases:

```typescript
import { utilityName } from './utilityName'

describe('utilityName', () => {
  describe('happy path', () => {
    it('returns [expected output] when given [valid input]', () => {
      expect(utilityName(validInput)).toBe(expectedOutput)
    })

    it('handles [another valid case]', () => {
      expect(utilityName(anotherInput)).toEqual(expectedResult)
    })
  })

  describe('edge cases', () => {
    it('returns [fallback] when given an empty string', () => {
      expect(utilityName('')).toBe(fallback)
    })

    it('handles zero correctly', () => {
      expect(utilityName(0)).toBe(expectedZeroResult)
    })

    it('handles very large input without throwing', () => {
      expect(() => utilityName(largeInput)).not.toThrow()
    })
  })

  describe('failure cases', () => {
    it('throws [ErrorType] when given null', () => {
      expect(() => utilityName(null)).toThrow('[ErrorType]')
    })

    it('returns null/undefined when [invalid condition]', () => {
      expect(utilityName(invalidInput)).toBeNull()
    })
  })
})
```

Coverage target: 80% minimum on utility functions and custom hooks.

---

## Custom Hook Tests

```typescript
import { renderHook, act } from '@testing-library/react'
import { useHookName } from './useHookName'

describe('useHookName', () => {
  it('returns the initial state correctly', () => {
    const { result } = renderHook(() => useHookName())
    expect(result.current.value).toBe(initialValue)
  })

  it('updates state correctly when [action] is called', () => {
    const { result } = renderHook(() => useHookName())

    act(() => {
      result.current.action(newValue)
    })

    expect(result.current.value).toBe(newValue)
  })

  it('cleans up [side effect] on unmount', () => {
    const { unmount } = renderHook(() => useHookName())
    // Setup: verify side effect is active
    unmount()
    // Assert: side effect is cleaned up
  })
})
```

---

## API Route Tests — Integration Stubs Required

Every API route (`app/api/[route]/route.ts`) gets a test file covering three response codes:

```typescript
import { GET, POST } from './route'

describe('API /api/[route]', () => {
  describe('POST', () => {
    it('returns 200 with [expected data] when given valid input', async () => {
      const request = new Request('http://localhost/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validPayload)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toMatchObject({ /* expected shape */ })
    })

    it('returns 400 when required fields are missing', async () => {
      const request = new Request('http://localhost/api/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidPayload)
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('returns 500 when the [dependency] throws an unexpected error', async () => {
      // Mock the dependency to throw
      jest.spyOn(dependency, 'method').mockRejectedValueOnce(new Error('DB error'))

      const request = new Request('http://localhost/api/route', {
        method: 'POST',
        body: JSON.stringify(validPayload)
      })

      const response = await POST(request)
      expect(response.status).toBe(500)
    })
  })
})
```

---

## End-to-End Tests — Playwright Flag

Critical user flows require E2E coverage. When implementing any of the following, output a flag:

```
🎭 E2E TEST REQUIRED — Playwright
Flow: [name of the flow]
File: e2e/[flow-name].spec.ts
Scenarios to cover:
  [ ] Happy path: [user does X, expects Y]
  [ ] Error path: [what happens when Z fails]
  [ ] Edge case: [boundary condition]
Note: E2E stub not included in this code output — flag for test sprint.
```

Critical flows that always require this flag:
- User registration and email verification
- Login / logout / session expiry
- Password reset
- Any checkout or payment flow
- Form submission that writes to a database
- Any multi-step wizard or onboarding flow

---

## Test File Naming and Location

```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx       ← co-located
      index.ts
  lib/
    utils/
      formatDate.ts
      formatDate.test.ts    ← co-located
  hooks/
    useAuth.ts
    useAuth.test.ts         ← co-located
  app/
    api/
      trucks/
        route.ts
        route.test.ts       ← co-located
e2e/
  auth.spec.ts              ← Playwright, top-level
  checkout.spec.ts
```

---

## Coverage Targets

| Code type | Coverage target |
|-----------|----------------|
| Utility functions | 80% minimum |
| Custom hooks | 80% minimum |
| UI components | Render test + axe test on all; 60% branch coverage |
| API routes | 200/400/500 covered on all routes |
| Critical flows | E2E coverage flagged (not measured by unit coverage) |

---

## What "Complete" Means

Code is not complete until:
- [ ] Test file exists co-located with the source file
- [ ] Render test written (components)
- [ ] Axe accessibility test written (components)
- [ ] Snapshot test written (components)
- [ ] Happy path test written (utilities, hooks, API routes)
- [ ] At least one failure/edge case test written
- [ ] E2E flag added if the code is part of a critical user flow
- [ ] All test descriptions are plain English
