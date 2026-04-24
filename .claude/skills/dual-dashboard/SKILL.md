# Dual Dashboard Skill
> These are distinct interfaces — no shared dashboard with toggled views.
> Both sides must feel like the product was built specifically for them.

---

## Architecture Rule

There are exactly two authenticated dashboard experiences. They share zero UI structure beyond common components (nav chrome, notification bell, avatar menu). There is no single dashboard that toggles between "requester mode" and "operator mode."

```
app/
  dashboard/
    requester/
      page.tsx           ← Requester dashboard root
      layout.tsx         ← Requester-specific layout and nav
      requests/
        page.tsx         ← Active requests with response counts
        new/
          page.tsx       ← Post new request (primary CTA)
        [id]/
          page.tsx       ← Single request detail + responses
      history/
        page.tsx         ← Completed + expired requests
    operator/
      page.tsx           ← Operator dashboard root
      layout.tsx         ← Operator-specific layout with subscription banner
      feed/
        page.tsx         ← Active request feed for their radius
      responses/
        page.tsx         ← Their submitted responses
      bookings/
        page.tsx         ← Confirmed bookings
      listing/
        page.tsx         ← Profile/truck editor
      billing/
        page.tsx         ← Subscription management
```

---

## Requester Dashboard

### What Must Be Present
- **Post a new request** — primary CTA, always visible at the top of every requester page. Not buried in a menu.
- **Active requests** — list with: event type, date, headcount, response count, and operator names (blurred — see below)
- **Match history** — completed and expired requests with review prompts on completed ones
- **Notification bell** — alerts when operators respond

### Response Visibility — Blurred Until Selection
When an operator submits a response, the requester sees the response count and a partially revealed operator identity. Full operator details (name, photo, truck info) are visible only after the requester clicks to review responses — not in the list view.

```typescript
// In the request list, show:
{ responseCount: 3, firstRespondedAt: '2 hours ago' }
// Not: { operators: ['Fuego Street Kitchen', 'Coastal Eats', ...] }

// In the request detail (requester selected to review), show:
{ operators: [{ name, photo, cuisine, rating, proposedRate, note }] }
```

### What Must NEVER Appear in the Requester Interface
- Subscription UI of any kind
- Pricing or billing information
- "Upgrade" prompts
- Plan names (founding, standard, pro)
- Stripe-related anything

```
🔴 REQUESTER INTERFACE VIOLATION
Found: Subscription/billing UI element in requester dashboard
This element must never appear in the requester interface.
The requester experience is free and must feel completely free.
Remove before proceeding.
```

### Requester Onboarding Target
New requester → email verified → first request posted in **under 3 minutes**.

Onboarding steps:
1. Sign up with email + password (or OAuth)
2. Verify email (single-click link)
3. Name and optional phone number
4. Land on dashboard with "Post your first request" as the single CTA

No billing, no paywall, no upsell during onboarding.

---

## Operator Dashboard

### What Must Be Present

**Subscription Status Banner** — always visible, at the top of every operator page, with varying urgency:

| Status | Banner appearance | Message |
|--------|------------------|---------|
| `trialing` | Subtle info (blue) | "You're on a free trial — [N] days remaining. [Activate subscription]" |
| `active` | Hidden (no banner when healthy) | — |
| `past_due` | High-urgency warning (red) | "Your payment failed. Update your billing to keep responding to requests. [Fix now]" |
| `canceled` | Warning (amber) until period end, then hard block | "Your subscription ends [date]. [Resubscribe]" |
| `incomplete` | Blocking interstitial | "Complete your subscription setup to access the marketplace. [Continue setup]" |

**Active Request Feed** — filtered to their service radius. Cards show:
- Event type, date, approximate location (city/neighborhood, not exact address without subscription)
- Headcount range
- Estimated duration
- Time since posted
- Distance from their base location
- Response button (disabled with message if subscription is not active/trialing)

**Pending Responses** — responses they've submitted awaiting requester selection:
- Request summary
- Their proposed rate and note
- Time pending
- Ability to withdraw (sets match status to 'withdrawn')

**Confirmed Bookings** — matches with status 'accepted':
- Full event details (address unlocked here)
- Requester contact info
- Calendar export option

**Listing/Profile Editor** — truck profile management:
- Completeness indicator (required fields for active status)
- Save draft / publish toggle

**Revenue Summary** — confirmed bookings this month and trailing 90 days. No Stripe revenue — this is booking count × proposed rate from matches table.

**Review History** — reviews received and given.

**Billing** — link to Stripe Customer Portal or in-app subscription management.

### Operator Onboarding — Subscription Before Engagement

New operator must complete before accessing the request feed:
1. Sign up with role='operator'
2. Email verification
3. Listing creation (truck name, cuisine, service radius, at least one photo)
4. Subscription signup (or trial activation)

The request feed is locked behind step 4. An operator who bounces during subscription setup must be re-engaged via email — build the drip from day one.

---

## Server-Level Route Guards

Route guards are enforced at the server, not the client. A requester hitting an operator route gets 403, not a redirect loop.

```typescript
// app/dashboard/operator/layout.tsx
import { redirect } from 'next/navigation'
import { getSession, getUser } from '@/lib/auth'

export default async function OperatorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login?next=/dashboard/operator')
  }

  const user = await getUser(session.user.id)

  if (user.role !== 'operator') {
    // 403 — not a redirect to requester dashboard (that would silently succeed)
    // A requester shouldn't be able to GET to an operator route at all
    return new Response('Forbidden', { status: 403 })
  }

  return <>{children}</>
}

// app/dashboard/requester/layout.tsx — mirror pattern for requester routes
```

For API routes:
```typescript
// lib/auth/guards.ts
export async function requireOperator(request: Request) {
  const session = await getSessionFromRequest(request)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await getUser(session.user.id)
  if (user.role !== 'operator') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
  return user
}

export async function requireRequester(request: Request) {
  const session = await getSessionFromRequest(request)
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await getUser(session.user.id)
  if (user.role !== 'requester') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }
  return user
}
```

---

## Shared Component Rules

Shared components (Button, Card, Input, etc.) are fine. Shared UX **patterns that blur role distinction** are not.

Examples of what IS acceptable:
- A shared `<Button>` component
- A shared `<NotificationBell>` component
- A shared `<AvatarMenu>` component

Examples of what is NOT acceptable:
- A `<Dashboard>` component that renders different content based on `user.role`
- A `<RequestCard>` that looks the same to a requester and an operator (they have different actions and info)
- A single feed component that toggles content by role
- Any component that checks `user.role` inside JSX to decide what to render at a high level

If a component needs to know the user's role to render, it should be two separate components, not one component with role-based branching.
