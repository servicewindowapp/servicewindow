# Stripe Billing Setup Guide

This guide walks you through integrating Stripe billing into ServiceWindow. The setup has three parts: Stripe configuration, Supabase Edge Functions, and environment variables.

---

## Step 1: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Copy your **Secret Key** (starts with `sk_test_` or `sk_live_`)

**⚠️ IMPORTANT:** Never expose your Secret Key in the frontend. It must only be used in backend code (Edge Functions).

---

## Step 2: Create Stripe Products & Prices

In Stripe Dashboard:

### Truck Operator - Standard Plan
1. **Products** → **Create Product**
   - Name: `Truck Operator Standard`
   - Description: `$29/month access to 5 boards, marketplace, messaging`
2. **Pricing**
   - Price: **$29.00 USD**
   - Billing Period: **Monthly**
   - Copy the **Price ID** (looks like `price_1234567890abcdef`)

### Truck Operator - Pro Plan
1. Create another product: `Truck Operator Pro`
2. Price: **$49.00 USD** (Monthly)
3. Copy the **Price ID**

### Service Provider - Standard Plan
1. Create product: `Service Provider Standard`
2. Price: **$29.00 USD** (Monthly)
3. Copy the **Price ID**

---

## Step 3: Update pricing.html with Price IDs

Edit `pricing.html` around line 385 and replace the placeholder Price IDs:

```javascript
const PRICE_IDS = {
  truck_standard: 'price_1234567890abcdef',    // Your actual Stripe Price ID
  truck_pro: 'price_0987654321fedcba',         // Your actual Stripe Price ID
  service_provider_standard: 'price_abcdef1234567890' // Your actual Stripe Price ID
};
```

Also update the Stripe Publishable Key around line 378:

```javascript
const STRIPE_PUBLIC_KEY = 'pk_test_your_key_here'; // Replace with your publishable key
```

---

## Step 4: Update .env File

Edit `.env` in the project root:

```
STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY
```

---

## Step 5: Create Supabase Edge Functions

You need two Edge Functions to handle checkout sessions and the Stripe Customer Portal.

### Function 1: `create-checkout-session`

This creates a Stripe checkout session and saves the session ID to the database.

**Path:** `supabase/functions/create-checkout-session/index.ts`

```typescript
import Stripe from "https://esm.sh/stripe@13.10.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { price_id, plan_name, user_id, user_email } = await req.json();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      success_url: `${Deno.env.get("SITE_URL")}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get("SITE_URL")}/cancel.html`,
      customer_email: user_email,
      metadata: {
        user_id,
        plan_name,
      },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

### Function 2: `create-portal-session`

This creates a Stripe Customer Portal session for users to manage their subscription.

**Path:** `supabase/functions/create-portal-session/index.ts`

```typescript
import Stripe from "https://esm.sh/stripe@13.10.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { user_id } = await req.json();

    // Get user's Stripe customer ID from Supabase
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user_id)
      .single();

    if (error || !profile?.stripe_customer_id) {
      return new Response(
        JSON.stringify({ error: "No active subscription found" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${Deno.env.get("SITE_URL")}/truck-dashboard.html`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

### Function 3: `stripe-webhook-success`

This processes successful payment and updates the user's profile.

**Path:** `supabase/functions/stripe-webhook-success/index.ts`

```typescript
import Stripe from "https://esm.sh/stripe@13.10.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { session_id, user_id } = await req.json();

    // Retrieve the Checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Payment not completed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Extract plan info from metadata
    const planMap = {
      truck_standard: "standard",
      truck_pro: "pro",
      service_provider_standard: "standard",
    };
    const plan = planMap[session.metadata.plan_name] || "standard";

    // Update user's profile in Supabase
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_tier: plan,
        subscription_status: "active",
        trial_converted: true,
        stripe_customer_id: session.customer,
      })
      .eq("id", user_id);

    if (error) {
      throw error;
    }

    // Get user's role for dashboard redirect
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user_id)
      .single();

    return new Response(
      JSON.stringify({
        success: true,
        plan,
        role: profile?.role || "truck",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

---

## Step 6: Deploy Edge Functions to Supabase

```bash
supabase functions deploy create-checkout-session
supabase functions deploy create-portal-session
supabase functions deploy stripe-webhook-success
```

---

## Step 7: Add Required Columns to Profiles Table

Run this SQL in Supabase Studio:

```sql
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription_tier TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS trial_converted BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS trial_started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
```

---

## Step 8: Set Supabase Secrets (for Edge Functions)

In Supabase Dashboard → Edge Functions → Secrets:

```
STRIPE_SECRET_KEY = sk_test_YOUR_KEY
SITE_URL = http://localhost:3000  (or your production URL)
```

---

## Step 9: Update Stripe Webhook (Optional but Recommended)

For production, set up a webhook in Stripe to handle subscription updates:

1. **Stripe Dashboard** → **Webhooks** → **Add Endpoint**
2. Endpoint URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
3. Events: `payment_intent.succeeded`, `customer.subscription.updated`, `customer.subscription.deleted`

This ensures subscription status stays in sync if a user cancels outside your app.

---

## Testing Checklist

- [ ] Stripe test keys added to `.env`
- [ ] Price IDs from Stripe added to `pricing.html`
- [ ] Edge Functions deployed and tested
- [ ] Database columns created
- [ ] Click "Start Free — Join Now" on pricing page
- [ ] Redirected to Stripe Checkout
- [ ] Use test card: `4242 4242 4242 4242` with any future date
- [ ] After payment, redirected to `success.html`
- [ ] Check Supabase: user's `subscription_tier` and `stripe_customer_id` are set
- [ ] "Manage" button in dashboard opens Stripe Customer Portal

---

## Production Checklist

- [ ] Switch to live Stripe keys (`pk_live_`, `sk_live_`)
- [ ] Update `.env` with production keys
- [ ] Update Edge Function secrets with live keys
- [ ] Set `SITE_URL` to your production domain
- [ ] Test full payment flow
- [ ] Set up Stripe webhook for event handling
- [ ] Monitor Stripe Dashboard for payment issues

---

## Troubleshooting

**Issue:** "sessionId is undefined" error
- **Fix:** Verify `PRICE_IDS` in `pricing.html` are valid Stripe price IDs

**Issue:** Edge Function returns 403 error
- **Fix:** Check that `STRIPE_SECRET_KEY` is set in Supabase Secrets
- **Fix:** Verify user has active session before calling function

**Issue:** Checkout redirects to blank page
- **Fix:** Ensure Stripe publishable key is valid and matches environment (test vs. live)

**Issue:** Success page doesn't update profile
- **Fix:** Verify `stripe-webhook-success` function is deployed
- **Fix:** Check Supabase logs for errors

---

## File Reference

| File | Purpose |
|------|---------|
| `.env` | Stripe API keys (do not commit to git) |
| `pricing.html` | Frontend checkout buttons |
| `success.html` | Page after successful payment |
| `cancel.html` | Page if user cancels checkout |
| `truck-dashboard.html` | "Manage Subscription" button |
| `service-provider-dashboard.html` | "Manage Subscription" button |

---

## Security Notes

✅ **DO:**
- Store secret keys only in Supabase Secrets
- Use environment variables for public keys
- Validate webhook signatures in production
- Never expose `STRIPE_SECRET_KEY` in frontend code

❌ **DON'T:**
- Commit `.env` with real keys to Git
- Hardcode keys in HTML/JS
- Trust client-side validation for payment amounts
- Skip webhook verification in production

---

For questions, see [Stripe Docs](https://stripe.com/docs) and [Supabase Edge Functions](https://supabase.com/docs/guides/functions).
