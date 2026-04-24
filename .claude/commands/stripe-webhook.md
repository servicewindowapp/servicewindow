# /stripe-webhook — Scaffold Stripe Webhook Handler

Scaffold the complete Stripe webhook route with signature verification, event routing for all 4 required events, idempotency, and error logging.

## Invocation
```
/stripe-webhook
```

---

## Environment Variable Checklist — Verify Before Writing Code

```
🔴 STRIPE WEBHOOK PREREQUISITE CHECK
Before this route will function, the following env vars must be set:

Required in .env.local (development) and Vercel dashboard (production):

STRIPE_SECRET_KEY              sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET          whsec_... (from Stripe Dashboard → Webhooks → Signing secret)
STRIPE_PRICE_FOUNDING          price_... founding plan Stripe price ID
STRIPE_PRICE_STANDARD          price_... standard plan Stripe price ID
STRIPE_PRICE_PRO               price_... pro plan Stripe price ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  pk_live_... or pk_test_...

To get the webhook secret:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: https://[your-domain]/api/webhooks/stripe
3. Select these events:
   ✓ invoice.payment_succeeded
   ✓ invoice.payment_failed
   ✓ customer.subscription.updated
   ✓ customer.subscription.deleted
4. Copy the Signing secret → STRIPE_WEBHOOK_SECRET

For local testing:
  stripe listen --forward-to localhost:3000/api/webhooks/stripe
  The CLI prints a webhook secret starting with whsec_ — use this for local .env.local
```

---

## Generated Files

### `src/app/api/webhooks/stripe/route.ts`

```typescript
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

// Flag: stripe package must be installed — run /dependency-check stripe

if (!process.env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set')
if (!process.env.STRIPE_WEBHOOK_SECRET) throw new Error('STRIPE_WEBHOOK_SECRET is not set')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

// Use service role client for webhook handlers — webhooks are server-to-server
// They don't have a user session, so anon client won't work for updates
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // Flag: add SUPABASE_SERVICE_ROLE_KEY to env vars
)

export async function POST(request: Request) {
  const body = await request.text()  // Must be raw text — NOT .json()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    console.error('[stripe-webhook] Missing stripe-signature header')
    return new Response('Missing signature', { status: 400 })
  }

  // 🔴 Step 1: Verify signature — reject before ANY processing
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[stripe-webhook] Signature verification failed:', message)
    return new Response(`Webhook signature verification failed: ${message}`, { status: 400 })
  }

  // Step 2: Idempotency check — Stripe delivers events at least once
  const { data: existingEvent } = await supabase
    .from('stripe_events')
    .select('stripe_event_id')
    .eq('stripe_event_id', event.id)
    .single()

  if (existingEvent) {
    console.log(`[stripe-webhook] Event ${event.id} already processed — skipping`)
    return new Response(JSON.stringify({ received: true }), { status: 200 })
  }

  // Step 3: Route to handler
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
        // Log but don't fail — Stripe sends many event types
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`)
    }

    // Step 4: Mark as processed after successful handling
    await supabase.from('stripe_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      processed_at: new Date().toISOString(),
    })

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[stripe-webhook] Error processing ${event.type} (${event.id}):`, message)
    // Return 500 so Stripe retries — only return 200 on confirmed success
    return new Response(`Handler error: ${message}`, { status: 500 })
  }
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  if (!subscriptionId) {
    console.log('[stripe-webhook] invoice.payment_succeeded has no subscription ID — skipping')
    return
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      current_period_end: new Date(invoice.period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscriptionId)

  if (error) {
    throw new Error(`Failed to update subscription on payment_succeeded: ${error.message}`)
  }

  console.log(`[stripe-webhook] Subscription ${subscriptionId} activated on successful payment`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  if (!subscriptionId) return

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscriptionId)

  if (error) {
    throw new Error(`Failed to update subscription on payment_failed: ${error.message}`)
  }

  // Get the operator ID to send a notification
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('operator_id')
    .eq('stripe_subscription_id', subscriptionId)
    .single()

  if (sub) {
    await supabase.from('notifications').insert({
      user_id: sub.operator_id,
      type: 'payment_failed',
      message: 'Your payment failed. Update your billing details to keep your listing active.',
    })
    // TODO: Also send email via Resend
  }

  console.log(`[stripe-webhook] Subscription ${subscriptionId} set to past_due`)
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      trial_end: subscription.trial_end
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    throw new Error(`Failed to sync subscription on updated event: ${error.message}`)
  }

  console.log(`[stripe-webhook] Subscription ${subscription.id} synced — status: ${subscription.status}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    throw new Error(`Failed to update subscription on deleted event: ${error.message}`)
  }

  console.log(`[stripe-webhook] Subscription ${subscription.id} canceled`)
}
```

---

### Required Database Migration

```sql
-- stripe_events table for idempotency
CREATE TABLE IF NOT EXISTS stripe_events (
  stripe_event_id  text PRIMARY KEY,
  event_type       text NOT NULL,
  processed_at     timestamptz DEFAULT now()
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_stripe_events_processed_at 
ON stripe_events (processed_at);

-- notifications table (if not yet created)
CREATE TABLE IF NOT EXISTS notifications (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id),
  type        text NOT NULL,
  reference_id uuid,  -- optional: the match/request/subscription this relates to
  message     text NOT NULL,
  is_read     boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);
```

---

### `src/app/api/webhooks/stripe/route.test.ts`

```typescript
import { POST } from './route'

describe('POST /api/webhooks/stripe', () => {
  it('returns 400 when stripe-signature header is missing', async () => {
    const request = new Request('http://localhost/api/webhooks/stripe', {
      method: 'POST',
      body: '{}',
    })
    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('returns 400 when signature verification fails', async () => { /* TODO: mock stripe.webhooks.constructEvent to throw */ })
  it('returns 200 without re-processing a previously handled event', async () => { /* TODO: seed stripe_events with test event ID */ })
  it('sets subscription status to active on invoice.payment_succeeded', async () => { /* TODO */ })
  it('sets subscription status to past_due on invoice.payment_failed', async () => { /* TODO */ })
  it('syncs all fields on customer.subscription.updated', async () => { /* TODO */ })
  it('sets status to canceled on customer.subscription.deleted', async () => { /* TODO */ })
  it('returns 500 (triggering Stripe retry) if the DB update fails', async () => { /* TODO */ })
})
```

---

## Additional Env Var Required

```bash
# Add to .env.example
SUPABASE_SERVICE_ROLE_KEY=   # From Supabase dashboard → Settings → API → service_role key
                              # NEVER expose in NEXT_PUBLIC_ — server-side only
```

This key bypasses RLS and is needed for webhook handlers that run server-to-server with no user session. Keep it strictly server-side.
