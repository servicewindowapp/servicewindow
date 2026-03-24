import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = "noreply@servicewindow.app";

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

function generateEmailHTML(
  type: string,
  data: Record<string, any>
): { subject: string; html: string } {
  const baseStyles = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
      .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 20px 0; }
      .header { background: linear-gradient(135deg, #FF5400 0%, #FF7A33 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
      .button { display: inline-block; background: #FF5400; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
      h2 { color: #1E3A5F; }
      .event-details { background: #f0f0f0; padding: 15px; border-radius: 6px; margin: 10px 0; }
    </style>
  `;

  switch (type) {
    case "new_booking_request":
      return {
        subject: `New Booking Request: ${data.event_name}`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>🎉 New Booking Request</h1>
              </div>
              <h2>Hello ${data.truck_owner_name},</h2>
              <p>You have received a new booking request!</p>
              <div class="event-details">
                <p><strong>Event:</strong> ${data.event_name}</p>
                <p><strong>Date:</strong> ${data.event_date}</p>
                <p><strong>Organizer:</strong> ${data.organizer_name}</p>
                <p><strong>Contact:</strong> ${data.organizer_email}</p>
                ${data.event_description ? `<p><strong>Details:</strong> ${data.event_description}</p>` : ""}
              </div>
              <p>Log in to ServiceWindow to review and accept or decline this request.</p>
              <a href="https://servicewindow.app/truck-dashboard.html" class="button">Review Request</a>
              <div class="footer">
                <p>ServiceWindow - Connecting Food Trucks with Events</p>
              </div>
            </div>
          </div>
        `,
      };

    case "request_accepted":
      return {
        subject: `Your Booking Request for ${data.event_name} was Accepted! 🎊`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>✅ Request Accepted</h1>
              </div>
              <h2>Hello ${data.organizer_name},</h2>
              <p>Great news! Your booking request has been accepted!</p>
              <div class="event-details">
                <p><strong>Event:</strong> ${data.event_name}</p>
                <p><strong>Date:</strong> ${data.event_date}</p>
                <p><strong>Truck:</strong> ${data.truck_name}</p>
                <p><strong>Truck Contact:</strong> ${data.truck_owner_email}</p>
              </div>
              <p>You can now contact the truck operator to finalize the details.</p>
              <a href="https://servicewindow.app/planner-dashboard.html" class="button">View Details</a>
              <div class="footer">
                <p>ServiceWindow - Connecting Food Trucks with Events</p>
              </div>
            </div>
          </div>
        `,
      };

    case "request_declined":
      return {
        subject: `Your Booking Request for ${data.event_name} was Not Accepted`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>Request Update</h1>
              </div>
              <h2>Hello ${data.organizer_name},</h2>
              <p>Unfortunately, your booking request was not accepted.</p>
              <div class="event-details">
                <p><strong>Event:</strong> ${data.event_name}</p>
                <p><strong>Date:</strong> ${data.event_date}</p>
              </div>
              <p>Don't worry! You can browse other available food trucks or submit another request for your event.</p>
              <a href="https://servicewindow.app/find-trucks.html" class="button">Find Another Truck</a>
              <div class="footer">
                <p>ServiceWindow - Connecting Food Trucks with Events</p>
              </div>
            </div>
          </div>
        `,
      };

    case "new_message":
      return {
        subject: `New Message from ${data.sender_name} about ${data.event_name}`,
        html: `
          ${baseStyles}
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>💬 New Message</h1>
              </div>
              <h2>Hello ${data.recipient_name},</h2>
              <p>You have a new message!</p>
              <div class="event-details">
                <p><strong>From:</strong> ${data.sender_name}</p>
                <p><strong>Event:</strong> ${data.event_name}</p>
                <p><strong>Message Preview:</strong></p>
                <p>${data.message_preview || "Check the message in your inbox."}</p>
              </div>
              <a href="https://servicewindow.app/truck-dashboard.html" class="button">View Message</a>
              <div class="footer">
                <p>ServiceWindow - Connecting Food Trucks with Events</p>
              </div>
            </div>
          </div>
        `,
      };

    case "verification_approved":
      return {
        subject: "Your ServiceWindow Account Has Been Verified! ✅",
        html: `
          ${baseStyles}
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>🎉 Account Verified</h1>
              </div>
              <h2>Hello ${data.organizer_name},</h2>
              <p>Congratulations! Your ServiceWindow account has been verified.</p>
              <p>You can now:</p>
              <ul>
                <li>Post unlimited booking requests</li>
                <li>Browse all available food trucks</li>
                <li>Message truck operators directly</li>
                <li>Receive priority support</li>
              </ul>
              <a href="https://servicewindow.app/marketplace.html" class="button">Start Browsing Trucks</a>
              <div class="footer">
                <p>ServiceWindow - Connecting Food Trucks with Events</p>
              </div>
            </div>
          </div>
        `,
      };

    case "welcome_email":
      return {
        subject: "Welcome to ServiceWindow! 🚚",
        html: `
          ${baseStyles}
          <div class="container">
            <div class="card">
              <div class="header">
                <h1>Welcome to ServiceWindow</h1>
              </div>
              <h2>Hello ${data.user_name},</h2>
              <p>Welcome to ServiceWindow! We're excited to have you join our community.</p>
              <p>Here's what you can do:</p>
              <ul>
                <li><strong>Browse Food Trucks:</strong> Find the perfect truck for your event</li>
                <li><strong>Post Requests:</strong> Tell trucks about your event needs</li>
                <li><strong>Message Operators:</strong> Communicate directly with truck owners</li>
                <li><strong>Complete Your Profile:</strong> Add photos and details to stand out</li>
              </ul>
              <a href="https://servicewindow.app/marketplace.html" class="button">Get Started</a>
              <p>If you have any questions, please don't hesitate to contact our support team.</p>
              <div class="footer">
                <p>ServiceWindow - Connecting Food Trucks with Events</p>
              </div>
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
            </div>
          </div>
        `,
      };
  }
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
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const payload = (await req.json()) as EmailPayload;

    console.log(`Sending ${payload.type} email to ${payload.recipient_email}`);

    const { subject, html } = generateEmailHTML(payload.type, payload.data);

    const result = await sendEmail(
      payload.recipient_email,
      subject,
      html
    );

    console.log(`Email sent successfully:`, result);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        id: result.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
