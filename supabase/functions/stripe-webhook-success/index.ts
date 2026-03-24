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
