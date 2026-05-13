// create-checkout-session
// Creates a Stripe checkout session for the food truck operator plan ($39.99/mo).
// Only callable by authenticated users with role = 'truck'.
// Deploy: supabase functions deploy create-checkout-session

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const TRUCK_PRICE_ID = 'price_1TWigOECWjPMf0DxEKA2iHpU'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Missing authorization header' }, 401)

    // Verify caller identity
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user }, error: authError } = await userClient.auth.getUser()
    if (authError || !user) return json({ error: 'Unauthorized' }, 401)

    // Fetch profile
    const { data: profile } = await userClient
      .from('profiles')
      .select('role, business_name, email, stripe_customer_id, subscription_status')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'truck') {
      return json({ error: 'Only truck operators can subscribe to this plan' }, 403)
    }

    // Already active — don't create a duplicate session
    if (profile.subscription_status === 'active') {
      return json({ error: 'Subscription already active. Manage billing from your dashboard.' }, 400)
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
    })

    // Get or create Stripe customer
    let customerId = profile.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: profile.email || user.email!,
        name: profile.business_name || undefined,
        metadata: { user_id: user.id, role: 'truck' },
      })
      customerId = customer.id

      // Store the customer ID using service role (bypasses RLS)
      const adminClient = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      )
      await adminClient
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: TRUCK_PRICE_ID, quantity: 1 }],
      success_url: `https://servicewindow.app/success.html?plan=standard&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://servicewindow.app/cancel.html`,
      metadata: { user_id: user.id, plan: 'standard', role: 'truck' },
      subscription_data: {
        metadata: { user_id: user.id, plan: 'standard', role: 'truck' },
      },
    })

    return json({ url: session.url })
  } catch (err) {
    console.error('[create-checkout-session]', err)
    return json({ error: err instanceof Error ? err.message : 'Internal error' }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
