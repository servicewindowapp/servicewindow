# Subscription & Billing Skill
> Subscription gate logic is the most critical code in this codebase. Test it more than anything else.
> Stripe is the only payment processor. No other processor without explicit instruction.

---

## Subscription States — All Must Be Handled Explicitly

| Status | Meaning | Operator capability |
|--------|---------|-------------------|
| `trialing` | In free trial period | Full access — same as active |
| `active` | Paid and current | Full access |
| `past_due` | Payment failed, retrying | **Immediately restricted** — no new responses |
| `incomplete` | Initial payment pending | No access — treat as unsubscribed |
| `canceled` | Subscription ended | No access after `current_period_end` |

**`past_due` is not a grace period.** Operators lose response capability immediately on `past_due`. Do not wait for `canceled`. The subscription status banner must appear and operator-protected actions must return 403.

```typescript
// The single source of truth for operator access
export function isOperatorAccessGranted(status: string): boolean {
  return status === 'active' || status === 'trialing'
}

// Never inline this logic — always call the function
// so it's easy to audit and impossible to get inconsistently
```

---

## Webhook Handler — Required Events

The following Stripe events must be handled. Missing any of them is a business logic bug.

| Event | What it means | Required action |
|-------|--------------|-----------------|
| `invoice.payment_succeeded` | Payment collected | Set `status = 'active'`, update `current_period_end` |
| `invoice.payment_failed` | Payment failed | Set `status = 'past_due'`, trigger notification to operator |
| `customer.subscription.updated` | Any subscription change | Sync all fields: status, plan, period dates, `cancel_at_period_end` |
| `customer.subscription.deleted` | Subscription canceled and ended | Set `status = 'canceled'`, set `cancel_at_period_end = false` |

### Webhook Route Pattern

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const body = await request.text()  // raw text — NOT request.json()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return Response.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // 🔴 Signature verification is mandatory — reject before any processing
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    // Log the error, but never expose details in the response
    console.error('Webhook signature verification failed:', err)
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Idempotency: check if this event has already been processed
  const alreadyProcessed = await checkEventProcessed(event.id)
  if (alreadyProcessed) {
    return Response.json({ received: true })  // 200 — Stripe will retry on non-200
  }

  try {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      default:
        // Log unhandled events but don't fail — Stripe sends many event types
        console.log(`Unhandled Stripe event: ${event.type}`)
    }

    // Mark event as processed for idempotency
    await markEventProcessed(event.id, event.type)

    return Response.json({ received: true })
  } catch (err) {
    console.error(`Error processing Stripe event ${event.type}:`, err)
    // Return 500 so Stripe retries — only return 200 on confirmed success
    return Response.json({ error: 'Processing failed' }, { status: 500 })
  }
}
```

### Handler Implementations

```typescript
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  await db.subscriptions.updateByStripeId(subscriptionId, {
    status: 'active',
    current_period_end: new Date(invoice.period_end * 1000),
    updated_at: new Date(),
  })
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  await db.subscriptions.updateByStripeId(subscriptionId, {
    status: 'past_due',
    updated_at: new Date(),
  })
  // Trigger: notification to operator that payment failed + link to update billing
  await notifyOperatorPaymentFailed(subscriptionId)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await db.subscriptions.updateByStripeId(subscription.id, {
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000),
    current_period_end: new Date(subscription.current_period_end * 1000),
    cancel_at_period_end: subscription.cancel_at_period_end,
    trial_end: subscription.trial_end
      ? new Date(subscription.trial_end * 1000)
      : null,
    updated_at: new Date(),
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await db.subscriptions.updateByStripeId(subscription.id, {
    status: 'canceled',
    cancel_at_period_end: false,
    updated_at: new Date(),
  })
}
```

---

## What Is and Is Not Stored in Your Database

```
✓ Store in your DB:
  - stripe_customer_id (e.g., cus_xxxxx)
  - stripe_subscription_id (e.g., sub_xxxxx)
  - subscription status, plan, period dates (synced from webhooks)

🔴 Never store:
  - Card numbers (PAN)
  - CVV / CVC
  - Expiration dates
  - Bank account numbers
  - Billing address (unless needed for tax — use Stripe Tax instead)
  - Any raw payment instrument data
```

---

## Trial Period — Defined in Config, Not Hardcoded

```typescript
// config/billing.ts — the single place to change trial length
export const BILLING_CONFIG = {
  trialDays: 30,
  plans: {
    founding: { priceId: process.env.STRIPE_PRICE_FOUNDING! },
    standard: { priceId: process.env.STRIPE_PRICE_STANDARD! },
    pro:      { priceId: process.env.STRIPE_PRICE_PRO! },
  },
} as const

// When creating a subscription:
await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: BILLING_CONFIG.plans[plan].priceId }],
  trial_period_days: BILLING_CONFIG.trialDays,  // from config, never a literal number
})
```

---

## Cancellation — End of Period, Not Immediate

```typescript
// Cancellation sets cancel_at_period_end = true — access continues until period ends
await stripe.subscriptions.update(subscriptionId, {
  cancel_at_period_end: true,
})

// In your DB, set cancel_at_period_end = true — status remains 'active'
// The webhook customer.subscription.deleted fires when the period actually ends

// UI: show "Your subscription ends on [current_period_end]" — not "canceled immediately"
```

---

## Pricing Changes — Grandfathering Required Flag

```
🟡 PRICING CHANGE FLAG
You are modifying subscription pricing or plan structure.
Before proceeding:
  [ ] Confirm: are existing subscribers grandfathered at their current rate?
  [ ] If yes: use Stripe price IDs that are plan-specific and unchanging for existing subs
  [ ] If no (migration): explicitly enumerate which subscriptions are affected
  [ ] Never call stripe.subscriptions.update() on active subscriptions to change price
      without confirming this is an intentional migration, not an accidental overwrite
  [ ] Document the migration in a migration log
```

---

## Server-Side Re-Validation — Every Protected Action

Never trust client-side subscription state. On every operator-protected API route or Server Action:

```typescript
// lib/auth/subscription.ts
export async function requireActiveSubscription(operatorId: string) {
  const subscription = await db.subscriptions.findByOperatorId(operatorId)

  if (!subscription) {
    throw new SubscriptionError('NO_SUBSCRIPTION', 'Subscription required', 403)
  }

  if (!isOperatorAccessGranted(subscription.status)) {
    throw new SubscriptionError(
      subscription.status.toUpperCase(),
      getSubscriptionMessage(subscription.status),
      403
    )
  }

  return subscription
}

function getSubscriptionMessage(status: string): string {
  const messages: Record<string, string> = {
    past_due: 'Your payment failed. Update your billing to continue.',
    canceled: 'Your subscription has ended. Resubscribe to continue.',
    incomplete: 'Complete your subscription setup to continue.',
  }
  return messages[status] ?? 'Your subscription is not active.'
}
```

---

## Required Environment Variables

```bash
# .env.example — all required for billing to function
STRIPE_SECRET_KEY=          # sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=      # whsec_... from Stripe dashboard
STRIPE_PRICE_FOUNDING=      # price_... founding plan price ID
STRIPE_PRICE_STANDARD=      # price_... standard plan price ID
STRIPE_PRICE_PRO=           # price_... pro plan price ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # pk_live_... or pk_test_...
```

If any of these are missing at runtime, throw at startup — do not silently proceed with broken billing.

---

## Idempotency — Webhook Events Are Delivered at Least Once

Stripe may deliver the same webhook event multiple times. Every webhook handler must be idempotent:

```sql
-- stripe_events table for idempotency tracking
CREATE TABLE stripe_events (
  stripe_event_id  text PRIMARY KEY,
  event_type       text NOT NULL,
  processed_at     timestamptz DEFAULT now()
);
```

Before processing any event, check if `stripe_event_id` already exists. If it does, return 200 without re-processing.
