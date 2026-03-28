import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = "ServiceWindow <notifications@servicewindow.app>";

interface ShiftPostData {
  id: string;
  event_name: string;
  event_date: string;
  time_slot: string;
  location_city: string;
  location_address?: string;
  cuisine_type?: string;
  reason?: string;
  badge_requirements?: string[];
  notes?: string;
  contact_phone: string;
  contact_email: string;
  posted_by: string;
}

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<any> {
  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: to,
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return response.json();
}

function generateShiftEmailHTML(data: ShiftPostData): { subject: string; html: string } {
  const baseStyles = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
      .branded-header { background: white; padding: 20px; text-align: center; border-bottom: 2px solid #FF5400; }
      .branded-header h1 { color: #FF5400; font-size: 24px; margin: 0 0 5px 0; font-weight: bold; }
      .branded-header .tagline { color: #666; font-size: 14px; margin: 0; }
      .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; }
      .header { background: linear-gradient(135deg, #FF5400 0%, #FF7A33 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .button { display: inline-block; background: #FF5400; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
      .footer a { color: #FF5400; text-decoration: none; }
      .footer a:hover { text-decoration: underline; }
      h2 { color: #1E3A5F; }
      .event-details { background: #f0f0f0; padding: 15px; border-radius: 6px; margin: 10px 0; }
      .event-details p { margin: 5px 0; }
    </style>
  `;

  return {
    subject: `Shift Available — ${data.event_name} on ${data.event_date} in ${data.location_city}`,
    html: `
      ${baseStyles}
      <div class="container">
        <div class="branded-header">
          <h1>ServiceWindow</h1>
          <p class="tagline">Connecting Food Trucks with Events in SW Florida</p>
        </div>
        <div class="card">
          <div class="header">
            <h1>📅 Shift Available</h1>
          </div>
          <h2>A truck needs coverage — can you fill this shift?</h2>
          <div class="event-details">
            <p><strong>Event:</strong> ${data.event_name}</p>
            <p><strong>Date:</strong> ${data.event_date}</p>
            <p><strong>Time:</strong> ${data.time_slot}</p>
            <p><strong>Location:</strong> ${data.location_city}${data.location_address ? ` — ${data.location_address}` : ""}</p>
            ${data.cuisine_type ? `<p><strong>Cuisine:</strong> ${data.cuisine_type}</p>` : ""}
            ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ""}
            ${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}
          </div>
          <h3>Contact Details</h3>
          <p><strong>Phone:</strong> ${data.contact_phone}</p>
          <p><strong>Email:</strong> ${data.contact_email}</p>
          <p><strong>Contact this truck directly to claim the shift.</strong></p>
          <div class="footer">
            <p>You received this because you're an active ServiceWindow member matching their criteria.</p>
            <p><a href="https://servicewindow.app">ServiceWindow - Connecting Food Trucks with Events</a></p>
          </div>
        </div>
      </div>
    `,
  };
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ error: "Service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const shiftData = (await req.json()) as ShiftPostData;

    // Create Supabase client with service role key for admin access
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Query for matching trucks (active subscription, optional cuisine match, optional badge requirements)
    let query = supabase
      .from("profiles")
      .select("id, email, full_name, business_name")
      .eq("role", "truck")
      .in("subscription_status", ["active", "founding"])
      .eq("city", shiftData.location_city);

    // If cuisine_type is provided, filter by it (or trucks with no cuisine set)
    if (shiftData.cuisine_type && shiftData.cuisine_type.trim()) {
      // This would need a text search - for now we'll skip this filter
      // In production, use full-text search on truck_cuisine field
    }

    const { data: matchingTrucks, error: queryError } = await query;

    if (queryError) {
      console.error("Database query error:", queryError);
      return new Response(
        JSON.stringify({ error: "Failed to find matching trucks", details: queryError.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!matchingTrucks || matchingTrucks.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Shift posted but no matching trucks found in this area",
          emailsSent: 0,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Send emails to all matching trucks
    const emailPromises = matchingTrucks
      .filter((truck) => truck.id !== shiftData.posted_by) // Don't email the posting truck
      .map(async (truck) => {
        try {
          const { subject, html } = generateShiftEmailHTML(shiftData);
          const result = await sendEmail(truck.email, subject, html);
          console.log(`Email sent to ${truck.email}:`, result.id);
          return { success: true, email: truck.email, id: result.id };
        } catch (error) {
          console.error(`Failed to send email to ${truck.email}:`, error.message);
          return { success: false, email: truck.email, error: error.message };
        }
      });

    const emailResults = await Promise.all(emailPromises);
    const successCount = emailResults.filter((r) => r.success).length;
    const failureCount = emailResults.filter((r) => !r.success).length;

    console.log(`Sent ${successCount} emails, ${failureCount} failures`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Shift posted. Notifications sent to ${successCount} trucks.`,
        emailsSent: successCount,
        emailsFailed: failureCount,
        results: emailResults,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in notify-shift-post:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to process shift notification",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
