import Stripe from "https://esm.sh/stripe@13.10.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("Edge Function: create-portal-session starting");

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
    const siteUrl = Deno.env.get("SITE_URL");

    console.log("SUPABASE_URL:", supabaseUrl ? "present" : "MISSING");
    console.log("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceRoleKey ? "present (length: " + supabaseServiceRoleKey.length + ")" : "MISSING");
    console.log("SITE_URL:", siteUrl || "not set");

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
    const { user_id } = await req.json();
    console.log("Request body parsed:", { user_id });

    console.log("Step 6: Getting user's Stripe customer ID from Supabase");
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user_id)
      .single();

    if (profileError) {
      console.error("Profile query error:", profileError.message);
      return new Response(
        JSON.stringify({ error: "Could not find user profile" }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    if (!profile?.stripe_customer_id) {
      console.error("No Stripe customer ID found for user");
      return new Response(
        JSON.stringify({ error: "No active subscription found" }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    console.log("Stripe customer ID:", profile.stripe_customer_id);

    console.log("Step 7: Creating Stripe customer portal session");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${siteUrl || "https://servicewindow.app"}/truck-dashboard.html`,
    });

    console.log("Stripe portal session created:", session.id);

    console.log("Step 8: Returning portal URL");
    return new Response(JSON.stringify({ url: session.url }), {
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
