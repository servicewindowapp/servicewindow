// stripe-webhook-success
// Handles Stripe subscription lifecycle events.
// Registered events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
// Deploy: supabase functions deploy stripe-webhook-success --no-verify-jwt
// Stripe webhook endpoint: https://api.servicewindow.app/functions/v1/stripe-webhook-success

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@13";

const SEND_NOTIFICATION_URL =
  "https://api.servicewindow.app/functions/v1/send-notification";
const ADMIN_EMAIL = "servicewindowapp@gmail.com";

serve(async (req) => {
  // Stripe sends POST only — no OPTIONS preflight needed, but handle gracefully
  if (req.method === "OPTIONS") return new Response("ok", { status: 200 });

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
    apiVersion: "2023-10-16",
  });

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const adminClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  console.log(`Processing Stripe event: ${event.type}`);

  // ─── checkout.session.completed ────────────────────────────────────────────
  // Fires when a truck operator completes Stripe checkout (becomes paying sub).
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.CheckoutSession;
    const userId = session.metadata?.user_id;

    if (!userId) {
      console.error("checkout.session.completed: no user_id in metadata");
      return new Response("ok", { status: 200 });
    }

    // Activate subscription in profiles
    const { error: updateError } = await adminClient
      .from("profiles")
      .update({
        subscription_status: "active",
        subscription_plan: "standard",
        stripe_customer_id: session.customer as string,
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Profile update failed:", updateError.message);
    } else {
      console.log(`Subscription activated for user ${userId}`);
    }

    // Fetch profile for admin notification
    const { data: profile } = await adminClient
      .from("profiles")
      .select("business_name, email, stripe_customer_id")
      .eq("id", userId)
      .single();

    if (profile) {
      try {
        const res = await fetch(SEND_NOTIFICATION_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
          },
          body: JSON.stringify({
            type: "admin_new_paid_sub",
            recipient_email: ADMIN_EMAIL,
            recipient_name: "Admin",
            data: {
              business_name: profile.business_name,
              email: profile.email,
              stripe_customer_id: profile.stripe_customer_id,
            },
          }),
        });
        if (!res.ok) console.error("Admin email failed:", await res.text());
        else console.log("Admin paid-sub email sent");
      } catch (e) {
        console.error("Admin email fetch error:", e.message);
      }
    }
  }

  // ─── customer.subscription.updated ─────────────────────────────────────────
  // Fires on renewals, cancellation scheduling, past_due, etc.
  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;
    const userId = sub.metadata?.user_id;

    if (!userId) {
      console.log("customer.subscription.updated: no user_id in metadata, skipping");
      return new Response("ok", { status: 200 });
    }

    const statusMap: Record<string, string> = {
      active: "active",
      canceled: "cancelled",
      past_due: "past_due",
      unpaid: "past_due",
      trialing: "trial",
      incomplete: "pending",
      incomplete_expired: "cancelled",
    };
    const newStatus = statusMap[sub.status] ?? sub.status;

    const { error } = await adminClient
      .from("profiles")
      .update({ subscription_status: newStatus })
      .eq("id", userId);

    if (error) console.error("Subscription status update failed:", error.message);
    else console.log(`User ${userId} subscription_status → ${newStatus}`);
  }

  // ─── customer.subscription.deleted ─────────────────────────────────────────
  // Fires when a subscription is fully cancelled (end of billing period).
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;
    const userId = sub.metadata?.user_id;

    if (userId) {
      const { error } = await adminClient
        .from("profiles")
        .update({ subscription_status: "cancelled" })
        .eq("id", userId);

      if (error) console.error("Cancellation update failed:", error.message);
      else console.log(`User ${userId} subscription cancelled`);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
