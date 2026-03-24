import Stripe from "https://esm.sh/stripe@13.10.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Edge Function: create-checkout-session starting");

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
    const appSupabaseUrl = Deno.env.get("APP_SUPABASE_URL");
    const appServiceRoleKey = Deno.env.get("APP_SERVICE_ROLE_KEY");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const siteUrl = Deno.env.get("SITE_URL");

    console.log("APP_SUPABASE_URL:", appSupabaseUrl ? "present" : "MISSING");
    console.log("APP_SERVICE_ROLE_KEY:", appServiceRoleKey ? "present (length: " + appServiceRoleKey.length + ")" : "MISSING");
    console.log("STRIPE_SECRET_KEY:", stripeSecretKey ? "present" : "MISSING");
    console.log("SITE_URL:", siteUrl || "not set");

    if (!appSupabaseUrl || !appServiceRoleKey) {
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
    const supabase = createClient(appSupabaseUrl, appServiceRoleKey);
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
    const { price_id, plan_name, user_id, user_email } = await req.json();
    console.log("Request body parsed:", { price_id, plan_name, user_id, user_email });

    if (!price_id || !user_id) {
      console.error("Missing required fields in request body");
      return new Response(
        JSON.stringify({ error: "Missing price_id or user_id" }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    console.log("Step 6: Initializing Stripe");
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });
    console.log("Stripe initialized");

    console.log("Step 7: Creating Stripe checkout session");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl || "https://servicewindow.app"}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl || "https://servicewindow.app"}/cancel.html`,
      customer_email: user_email,
      metadata: {
        user_id,
        plan_name,
      },
    });

    console.log("Stripe session created:", session.id);

    console.log("Step 8: Returning checkout session");
    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
