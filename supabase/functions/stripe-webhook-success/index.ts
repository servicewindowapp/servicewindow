import Stripe from "https://esm.sh/stripe@13.10.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Edge Function: stripe-webhook-success starting");

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://servicewindow.app",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  console.log("Request received:", req.method);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight");
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    console.log("Invalid method:", req.method);
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    console.log("Step 1: Checking environment variables");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    console.log("SUPABASE_URL:", supabaseUrl ? "present" : "MISSING");
    console.log("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceRoleKey ? "present (length: " + supabaseServiceRoleKey.length + ")" : "MISSING");
    console.log("STRIPE_SECRET_KEY:", stripeSecretKey ? "present" : "MISSING");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    console.log("Step 2: Creating Supabase client");
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    console.log("Supabase client created");

    console.log("Step 3: Extracting authorization header");
    const authHeader = req.headers.get("authorization");
    console.log("Authorization header:", authHeader ? "present" : "MISSING");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Invalid authorization header format");
      return new Response(
        JSON.stringify({ error: "Missing or invalid authorization header" }),
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    const bearerToken = authHeader.substring(7);
    console.log("Bearer token extracted, length:", bearerToken.length);

    console.log("Step 4: Verifying JWT with Supabase auth");
    const { data: { user }, error: authError } = await supabase.auth.getUser(bearerToken);

    if (authError) {
      console.error("Auth error:", authError.message);
      return new Response(
        JSON.stringify({ error: "Unauthorized: " + authError.message }),
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    if (!user) {
      console.error("No user returned from auth verification");
      return new Response(
        JSON.stringify({ error: "Unauthorized: No user found" }),
        {
          status: 401,
          headers: corsHeaders,
        }
      );
    }

    console.log("Auth verified for user:", user.id);

    console.log("Step 5: Parsing request body");
    const { session_id, user_id } = await req.json();
    console.log("Request body parsed:", { session_id, user_id });

    console.log("Step 6: Retrieving Stripe checkout session");
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("Stripe session retrieved, payment_status:", session.payment_status);

    if (session.payment_status !== "paid") {
      console.error("Payment not completed, status:", session.payment_status);
      return new Response(
        JSON.stringify({ error: "Payment not completed" }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    console.log("Step 7: Processing plan from metadata");
    const planMap = {
      truck_standard: "standard",
      truck_pro: "pro",
      service_provider_standard: "standard",
      advertiser: "advertiser",
    };
    const plan = planMap[session.metadata?.plan_name] || "standard";
    console.log("Plan determined:", plan);

    console.log("Step 8: Updating user profile in Supabase");
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        subscription_tier: plan,
        subscription_status: "active",
        trial_converted: true,
        stripe_customer_id: session.customer,
      })
      .eq("id", user_id);

    if (updateError) {
      console.error("Profile update error:", updateError.message);
      return new Response(
        JSON.stringify({ error: "Failed to update profile: " + updateError.message }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    console.log("Step 9: Getting user role for dashboard redirect");
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user_id)
      .single();

    if (profileError) {
      console.error("Profile query error:", profileError.message);
    }

    const role = profile?.role || "truck";
    console.log("User role:", role);

    console.log("Step 10: Returning success response");
    return new Response(
      JSON.stringify({
        success: true,
        plan,
        role,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Catch block - Error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    return new Response(
      JSON.stringify({ error: "Server error: " + error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
