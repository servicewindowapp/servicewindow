// advertiser-verify
// Called from success.html after Stripe redirects back.
// Retrieves the checkout session, confirms payment, and activates the advertiser subscription.
// Deploy: supabase functions deploy advertiser-verify

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Missing authorization header' }, 401)

    const { session_id } = await req.json()
    if (!session_id) return json({ error: 'Missing session_id' }, 400)

    // Verify caller
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user } } = await userClient.auth.getUser()
    if (!user) return json({ error: 'Unauthorized' }, 401)

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
      apiVersion: '2023-10-16',
    })

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id)

    // Must be paid and match the calling user
    if (session.payment_status !== 'paid') {
      return json({ error: 'Payment not completed' }, 402)
    }
    if (session.metadata?.user_id !== user.id) {
      return json({ error: 'Session does not belong to this user' }, 403)
    }
    if (session.metadata?.plan !== 'advertiser') {
      return json({ error: 'Not an advertiser session' }, 400)
    }

    // Activate subscription using service role
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const { error: updateError } = await adminClient
      .from('profiles')
      .update({
        subscription_plan:   'advertiser',
        subscription_status: 'active',
        stripe_subscription_id: typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription?.id ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('[advertiser-verify] profile update error:', updateError)
      return json({ error: 'Failed to activate subscription' }, 500)
    }

    const role = session.metadata?.role || 'service_provider'
    const dashboard = role === 'property'
      ? 'property-dashboard.html'
      : 'service-provider-dashboard.html'

    return json({ success: true, dashboard })
  } catch (err) {
    console.error('[advertiser-verify]', err)
    return json({ error: err instanceof Error ? err.message : 'Internal error' }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
