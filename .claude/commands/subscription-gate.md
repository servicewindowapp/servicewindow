# /subscription-gate — Scaffold Subscription Status Guard

Scaffold the server-side middleware and client-side component patterns that enforce operator subscription status. Handles all 5 states with distinct messaging.

## Invocation
```
/subscription-gate
/subscription-gate [context: api-route | server-component | client-component]
```

With no argument, generates all three patterns.

---

## Rule Before Generating

The subscription gate is the most critical code in this codebase. It must be:
1. Server-side first — the client-side gate is UX only, never the security boundary
2. Tested more than anything else — every state must have an explicit test
3. Never inlined — always call the shared `requireActiveSubscription()` function, never re-implement the check

---

## Generated Files

### `src/lib/auth/subscription.ts` — Core gate logic

```typescript
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export type SubscriptionStatus = 
  | 'active' 
  | 'trialing' 
  | 'past_due' 
  | 'canceled' 
  | 'incomplete'
  | 'none'

export interface SubscriptionState {
  status: SubscriptionStatus
  plan: string | null
  currentPeriodEnd: Date | null
  cancelAtPeriodEnd: boolean
  trialEnd: Date | null
}

export class SubscriptionError extends Error {
  constructor(
    public readonly code: SubscriptionStatus,
    message: string,
    public readonly httpStatus: 403
  ) {
    super(message)
    this.name = 'SubscriptionError'
  }
}

// The single source of truth for access decisions
export function isAccessGranted(status: SubscriptionStatus): boolean {
  return status === 'active' || status === 'trialing'
}

// Human-readable message for each state — used in UI banners and API errors
export function getStatusMessage(status: SubscriptionStatus): string {
  const messages: Record<SubscriptionStatus, string> = {
    active:     '',  // No message — healthy state
    trialing:   'Your free trial is active.',
    past_due:   'Your payment failed. Update your billing to keep responding to requests.',
    canceled:   'Your subscription has ended. Resubscribe to access the marketplace.',
    incomplete: 'Your subscription setup is incomplete. Complete it to access the marketplace.',
    none:       'A subscription is required to respond to requests.',
  }
  return messages[status]
}

// Call this in every API route and Server Action that requires an active operator subscription
export async function requireActiveSubscription(
  operatorId: string
): Promise<SubscriptionState> {
  const supabase = createServerComponentClient({ cookies })

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('operator_id', operatorId)
    .single()

  if (error || !subscription) {
    throw new SubscriptionError('none', getStatusMessage('none'), 403)
  }

  const status = subscription.status as SubscriptionStatus

  if (!isAccessGranted(status)) {
    throw new SubscriptionError(status, getStatusMessage(status), 403)
  }

  return {
    status,
    plan: subscription.plan,
    currentPeriodEnd: subscription.current_period_end
      ? new Date(subscription.current_period_end)
      : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    trialEnd: subscription.trial_end ? new Date(subscription.trial_end) : null,
  }
}

// Fetch subscription state without throwing — for UI display
export async function getSubscriptionState(
  operatorId: string
): Promise<SubscriptionState> {
  const supabase = createServerComponentClient({ cookies })

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('operator_id', operatorId)
    .single()

  if (!subscription) {
    return {
      status: 'none',
      plan: null,
      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,
      trialEnd: null,
    }
  }

  return {
    status: subscription.status as SubscriptionStatus,
    plan: subscription.plan,
    currentPeriodEnd: subscription.current_period_end
      ? new Date(subscription.current_period_end)
      : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    trialEnd: subscription.trial_end ? new Date(subscription.trial_end) : null,
  }
}
```

---

### `src/lib/auth/subscription.test.ts` — Gate logic tests (required)

```typescript
import { isAccessGranted, getStatusMessage, SubscriptionError } from './subscription'

describe('isAccessGranted', () => {
  it('grants access for active status', () => {
    expect(isAccessGranted('active')).toBe(true)
  })

  it('grants access for trialing status', () => {
    expect(isAccessGranted('trialing')).toBe(true)
  })

  it('denies access for past_due status', () => {
    expect(isAccessGranted('past_due')).toBe(false)
  })

  it('denies access for canceled status', () => {
    expect(isAccessGranted('canceled')).toBe(false)
  })

  it('denies access for incomplete status', () => {
    expect(isAccessGranted('incomplete')).toBe(false)
  })

  it('denies access for none status', () => {
    expect(isAccessGranted('none')).toBe(false)
  })
})

describe('getStatusMessage', () => {
  it('returns empty string for active status (no banner needed)', () => {
    expect(getStatusMessage('active')).toBe('')
  })

  it('returns a non-empty message for every restricted state', () => {
    const restrictedStates = ['trialing', 'past_due', 'canceled', 'incomplete', 'none'] as const
    restrictedStates.forEach((status) => {
      expect(getStatusMessage(status)).not.toBe('')
    })
  })
})
```

---

### Pattern 2: API Route Guard

```typescript
// Usage in any operator API route
import { requireActiveSubscription, SubscriptionError } from '@/lib/auth/subscription'
import { requireOperator } from '@/lib/auth/guards'

export async function POST(request: Request) {
  // Step 1: verify role
  const userOrResponse = await requireOperator(request)
  if (userOrResponse instanceof Response) return userOrResponse

  // Step 2: verify subscription — never trust client-side state
  try {
    await requireActiveSubscription(userOrResponse.id)
  } catch (err) {
    if (err instanceof SubscriptionError) {
      return Response.json(
        { error: err.message, code: err.code },
        { status: 403 }
      )
    }
    throw err
  }

  // Step 3: proceed with the protected action
  // ...
}
```

---

### Pattern 3: `SubscriptionBanner` — Client Component

```tsx
// src/components/SubscriptionBanner/SubscriptionBanner.tsx
"use client"

import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import type { SubscriptionStatus } from '@/lib/auth/subscription'

interface SubscriptionBannerProps {
  status: SubscriptionStatus
  currentPeriodEnd?: Date | null
  trialEnd?: Date | null
  daysRemainingInTrial?: number
}

const BANNER_CONFIG: Record<
  Exclude<SubscriptionStatus, 'active'>,
  { variant: 'info' | 'warning' | 'error'; icon: typeof Info; cta: string; ctaHref: string }
> = {
  trialing: {
    variant: 'info',
    icon: Info,
    cta: 'Activate subscription',
    ctaHref: '/dashboard/operator/billing',
  },
  past_due: {
    variant: 'error',
    icon: AlertCircle,
    cta: 'Fix billing now',
    ctaHref: '/dashboard/operator/billing',
  },
  canceled: {
    variant: 'warning',
    icon: AlertTriangle,
    cta: 'Resubscribe',
    ctaHref: '/dashboard/operator/billing',
  },
  incomplete: {
    variant: 'error',
    icon: AlertCircle,
    cta: 'Complete setup',
    ctaHref: '/dashboard/operator/billing',
  },
  none: {
    variant: 'error',
    icon: AlertCircle,
    cta: 'Subscribe now',
    ctaHref: '/dashboard/operator/billing',
  },
}

export function SubscriptionBanner({
  status,
  currentPeriodEnd,
  trialEnd,
  daysRemainingInTrial,
}: SubscriptionBannerProps) {
  // Active subscriptions get no banner
  if (status === 'active') return null

  const config = BANNER_CONFIG[status]
  const { variant, icon: Icon, cta, ctaHref } = config

  const message = {
    trialing: daysRemainingInTrial !== undefined
      ? `You're on a free trial — ${daysRemainingInTrial} day${daysRemainingInTrial !== 1 ? 's' : ''} remaining.`
      : 'Your free trial is active.',
    past_due: 'Your payment failed. Update your billing to keep responding to requests.',
    canceled: currentPeriodEnd
      ? `Your subscription ends ${currentPeriodEnd.toLocaleDateString()}. Resubscribe to keep your listing active.`
      : 'Your subscription has ended.',
    incomplete: 'Complete your subscription setup to access the marketplace.',
    none: 'A subscription is required to post responses.',
  }[status]

  const variantClasses = {
    info:    'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100',
    warning: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-100',
    error:   'bg-red-50 border-red-200 text-red-900 dark:bg-red-950 dark:border-red-800 dark:text-red-100',
  }[variant]

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-center justify-between gap-4 rounded-lg border px-4 py-3 ${variantClasses}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} aria-hidden="true" />
        <span>{message}</span>
      </div>
      <a
        href={ctaHref}
        className="shrink-0 font-semibold underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {cta}
      </a>
    </div>
  )
}
```

---

### `src/components/SubscriptionBanner/SubscriptionBanner.test.tsx`

```tsx
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { SubscriptionBanner } from './SubscriptionBanner'

expect.extend(toHaveNoViolations)

describe('SubscriptionBanner', () => {
  it('renders nothing for active status', () => {
    const { container } = render(<SubscriptionBanner status="active" />)
    expect(container.firstChild).toBeNull()
  })

  it('shows a trial message with days remaining', () => {
    render(<SubscriptionBanner status="trialing" daysRemainingInTrial={12} />)
    expect(screen.getByText(/12 days remaining/i)).toBeInTheDocument()
  })

  it('shows a payment failed message for past_due', () => {
    render(<SubscriptionBanner status="past_due" />)
    expect(screen.getByText(/payment failed/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /fix billing/i })).toBeInTheDocument()
  })

  it('uses role="alert" for all non-active states', () => {
    const statuses = ['trialing', 'past_due', 'canceled', 'incomplete', 'none'] as const
    statuses.forEach((status) => {
      const { container, unmount } = render(<SubscriptionBanner status={status} />)
      expect(container.querySelector('[role="alert"]')).toBeTruthy()
      unmount()
    })
  })

  it('has no accessibility violations for past_due state', async () => {
    const { container } = render(<SubscriptionBanner status="past_due" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it.todo('shows a subscription end date in the canceled message')
  it.todo('handles incomplete status with correct CTA link')
})
```
