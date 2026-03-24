import Stripe from "https://esm.sh/stripe@13.10.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://servicewindow.app",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
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
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
