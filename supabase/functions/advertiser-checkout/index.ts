// advertiser-checkout
// Creates a Stripe checkout session for the $19.99/mo service provider plan.
// Only callable by service_provider and property roles.
// Deploy: supabase functions deploy advertiser-checkout

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ADVERTISER_PRICE_ID = 'price_1TWKvdECWjPMf0DxS4VHiCR0'
const VALID_ROLES = ['service_provider', 'property']

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
      .select('role, business_name, email, stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (!profile || !VALID_ROLES.includes(profile.role)) {
      return json({ error: 'Only service providers and property owners can subscribe to the advertiser plan' }, 403)
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
        metadata: { user_id: user.id, role: profile.role },
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

    const dashboardUrl = profile.role === 'service_provider'
      ? 'https://servicewindow.app/service-provider-dashboard.html'
      : 'https://servicewindow.app/property-dashboard.html'

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: ADVERTISER_PRICE_ID, quantity: 1 }],
      success_url: `https://servicewindow.app/success.html?plan=advertiser&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: dashboardUrl,
      metadata: { user_id: user.id, plan: 'advertiser', role: profile.role },
      subscription_data: {
        metadata: { user_id: user.id, plan: 'advertiser', role: profile.role },
      },
    })

    return json({ url: session.url })
  } catch (err) {
    console.error('[advertiser-checkout]', err)
    return json({ error: err instanceof Error ? err.message : 'Internal error' }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
