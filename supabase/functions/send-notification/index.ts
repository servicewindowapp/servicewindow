import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = "ServiceWindow <notifications@servicewindow.app>";

interface EmailPayload {
  type: string;
  recipient_email: string;
  recipient_name: string;
  data: Record<string, any>;
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
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }

  return response.json();
}

function generateEmailHTML(
  type: string,
  data: Record<string, any>
): { subject: string; html: string } {
  const baseStyles = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
      .branded-header { background: white; padding: 20px; text-align: center; border-bottom: 2px solid #FF6B35; }
      .branded-header h1 { color: #FF6B35; font-size: 24px; margin: 0 0 5px 0; font-weight: bold; }
      .branded-header .tagline { color: #666; font-size: 14px; margin: 0; }
      .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; }
      .header { background: linear-gradient(135deg, #FF6B35 0%, #FF8C5A 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .header h1 { margin: 0; font-size: 22px; }
      .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; font-weight: bold; }
      .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
      .footer a { color: #FF6B35; text-decoration: none; }
      h2 { color: #0D1B2A; }
      .event-details { background: #f0f0f0; padding: 15px; border-radius: 6px; margin: 10px 0; }
      ul { padding-left: 20px; }
      ul li { margin-bottom: 8px; }
    </style>
  `;

  const footer = `
    <div class="footer">
      <p><a href="https://servicewindow.app">ServiceWindow — Fort Myers · Cape Coral · Naples · Sarasota and beyond.</a></p>
    </div>
  `;

  switch (type) {
    case "welcome_email": {
      const role = data.user_role || "organizer";

      const roleContent: Record<string, {
        heading: string;
        bullets: string[];
        cta: string;
        ctaUrl: string;
      }> = {
        truck: {
          heading: "Your truck profile is pending review. We'll confirm within 24 hours.",
          bullets: [
            "<strong>Get discovered:</strong> Appear in searches across 22 SWFL cities",
            "<strong>Receive bookings:</strong> Events and venues will request you directly",
            "<strong>Manage your calendar:</strong> Accept or decline from your dashboard",
            "<strong>Complete your profile:</strong> Add cuisine type, service radius, and photos",
          ],
          cta: "Go to Dashboard",
          ctaUrl: "https://servicewindow.app/truck-dashboard.html",
        },
        service_provider: {
          heading: "Your listing is pending review. We'll confirm within 24 hours.",
          bullets: [
            "<strong>Get discovered:</strong> Connect with food truck operators across SWFL",
            "<strong>List your services:</strong> Commissary, repair, supplies, and more",
            "<strong>Build relationships:</strong> Become a go-to resource for local operators",
            "<strong>Complete your profile:</strong> Add service details to stand out",
          ],
          cta: "Go to Dashboard",
          ctaUrl: "https://servicewindow.app/service-provider-dashboard.html",
        },
        venue: {
          heading: "Your venue is pending review. We'll confirm within 24 hours.",
          bullets: [
            "<strong>Attract food trucks:</strong> List your space and available dates",
            "<strong>Get requested:</strong> Truck operators will find and book your venue",
            "<strong>Manage inquiries:</strong> Review and respond from your dashboard",
            "<strong>Complete your profile:</strong> Add capacity, photos, and amenities",
          ],
          cta: "Go to Dashboard",
          ctaUrl: "https://servicewindow.app/venue-dashboard.html",
        },
        property: {
          heading: "Your listing is pending review. We'll confirm within 24 hours.",
          bullets: [
            "<strong>List your space:</strong> Offer parking or storage to food truck operators",
            "<strong>Get found:</strong> Operators looking for spots will discover your listing",
            "<strong>Manage rentals:</strong> Set pricing and availability from your dashboard",
            "<strong>Complete your profile:</strong> Add photos and location details",
          ],
          cta: "Go to Dashboard",
          ctaUrl: "https://servicewindow.app/property-dashboard.html",
        },
        job_seeker: {
          heading: "Your account is pending review. We'll confirm within 24 hours.",
          bullets: [
            "<strong>Browse job listings:</strong> Find openings with food truck operators across SWFL",
            "<strong>Apply directly:</strong> Connect with operators looking for crew",
            "<strong>Get notified:</strong> New jobs posted regularly",
            "<strong>Complete your profile:</strong> Add experience and availability",
          ],
          cta: "Browse Jobs",
          ctaUrl: "https://servicewindow.app/jobs-dashboard.html",
        },
        organizer: {
          heading: "Your account is pending review. We'll confirm within 24 hours.",
          bullets: [
            "<strong>Browse food trucks:</strong> Find the right truck for your event",
            "<strong>Post requests:</strong> Tell operators what you need",
            "<strong>Message operators:</strong> Communicate directly with truck owners",
            "<strong>Complete your profile:</strong> Add event details to stand out",
          ],
          cta: "Browse Trucks",
          ctaUrl: "https://servicewindow.app/find-trucks.html",
        },
      };

      const content = roleContent[role] || roleContent["organizer"];

      return {
        subject: "Welcome to ServiceWindow",
        html: `
          ${baseStyles}
          <div class="container">
            <div class="branded-header">
              <h1>ServiceWindow</h1>
              <p class="tagline">Connecting Food Trucks with Events in SW Florida</p>
            </div>
            <div class="card">
              <div class="header"><h1>Welcome to ServiceWindow</h1></div>
              <h2>Hello ${data.user_name},</h2>
              <p>${content.heading}</p>
              <p>Here's what's coming:</p>
              <ul>
                ${content.bullets.map((b) => `<li>${b}</li>`).join("\n                ")}
              </ul>
              <a href="${content.ctaUrl}" class="button">${content.cta}</a>
              <p style="font-size:13px;color:#888;margin-top:16px">
                Questions? Visit <a href="https://servicewindow.app/contact.html" style="color:#FF6B35">our contact page</a>.
              </p>
              ${footer}
            </div>
          </div>
        `,
      };
    }

    case "new_booking_request":
      return {
        subject: `New Booking Request: ${data.event_name}`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="branded-header">
              <h1>ServiceWindow</h1>
              <p class="tagline">Connecting Food Trucks with Events in SW Florida</p>
            </div>
            <div class="card">
              <div class="header"><h1>New Booking Request</h1></div>
              <h2>Hello ${data.truck_owner_name},</h2>
              <p>You have received a new booking request.</p>
              <div class="event-details">
                <p><strong>Event:</strong> ${data.event_name}</p>
                <p><strong>Date:</strong> ${data.event_date}</p>
                <p><strong>Organizer:</strong> ${data.organizer_name}</p>
                <p><strong>Contact:</strong> ${data.organizer_email}</p>
                ${data.event_description ? `<p><strong>Details:</strong> ${data.event_description}</p>` : ""}
              </div>
              <a href="https://servicewindow.app/truck-dashboard.html" class="button">Review Request</a>
              ${footer}
            </div>
          </div>
        `,
      };

    case "request_accepted":
      return {
        subject: `Booking Confirmed: ${data.event_name}`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="branded-header">
              <h1>ServiceWindow</h1>
              <p class="tagline">Connecting Food Trucks with Events in SW Florida</p>
            </div>
            <div class="card">
              <div class="header"><h1>Booking Confirmed</h1></div>
              <h2>Hello ${data.organizer_name},</h2>
              <p>Your booking request has been accepted.</p>
              <div class="event-details">
                <p><strong>Event:</strong> ${data.event_name}</p>
                <p><strong>Date:</strong> ${data.event_date}</p>
                <p><strong>Truck:</strong> ${data.truck_name}</p>
                <p><strong>Truck Contact:</strong> ${data.truck_owner_email}</p>
              </div>
              <a href="https://servicewindow.app/planner-dashboard.html" class="button">View Details</a>
              ${footer}
            </div>
          </div>
        `,
      };

    case "request_declined":
      return {
        subject: `Booking Update: ${data.event_name}`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="branded-header">
              <h1>ServiceWindow</h1>
              <p class="tagline">Connecting Food Trucks with Events in SW Florida</p>
            </div>
            <div class="card">
              <div class="header"><h1>Booking Update</h1></div>
              <h2>Hello ${data.organizer_name},</h2>
              <p>Your booking request for <strong>${data.event_name}</strong> on ${data.event_date} was not accepted by this operator.</p>
              <p>Browse other available trucks and submit a new request.</p>
              <a href="https://servicewindow.app/find-trucks.html" class="button">Find Another Truck</a>
              ${footer}
            </div>
          </div>
        `,
      };

    case "new_message":
      return {
        subject: `New Message from ${data.sender_name}`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="branded-header">
              <h1>ServiceWindow</h1>
              <p class="tagline">Connecting Food Trucks with Events in SW Florida</p>
            </div>
            <div class="card">
              <div class="header"><h1>New Message</h1></div>
              <h2>Hello ${data.recipient_name},</h2>
              <div class="event-details">
                <p><strong>From:</strong> ${data.sender_name}</p>
                ${data.event_name ? `<p><strong>Re:</strong> ${data.event_name}</p>` : ""}
                <p>${data.message_preview || "Log in to read the full message."}</p>
              </div>
              <a href="https://servicewindow.app/truck-dashboard.html" class="button">View Message</a>
              ${footer}
            </div>
          </div>
        `,
      };

    case "verification_approved":
      return {
        subject: "Your ServiceWindow Account is Verified",
        html: `
          ${baseStyles}
          <div class="container">
            <div class="branded-header">
              <h1>ServiceWindow</h1>
              <p class="tagline">Connecting Food Trucks with Events in SW Florida</p>
            </div>
            <div class="card">
              <div class="header"><h1>Account Verified</h1></div>
              <h2>Hello ${data.user_name || data.organizer_name},</h2>
              <p>Your ServiceWindow account has been verified. You now have full access to your dashboard.</p>
              <a href="https://servicewindow.app/auth.html" class="button">Log In</a>
              ${footer}
            </div>
          </div>
        `,
      };

    default:
      return {
        subject: "Notification from ServiceWindow",
        html: `
          ${baseStyles}
          <div class="container">
            <div class="card">
              <p>You have a notification from ServiceWindow.</p>
              ${footer}
            </div>
          </div>
        `,
      };
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload = (await req.json()) as EmailPayload;
    console.log(`Sending ${payload.type} email to ${payload.recipient_email}`);

    const { subject, html } = generateEmailHTML(payload.type, payload.data);
    const result = await sendEmail(payload.recipient_email, subject, html);

    console.log(`Email sent successfully:`, result);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully", id: result.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email", message: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
