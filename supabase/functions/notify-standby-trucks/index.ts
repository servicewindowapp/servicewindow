// notify-standby-trucks
// Called by planner-dashboard immediately after posting an emergency/urgent listing.
// Queries all verified standby truck operators and sends them a Resend email alert.
//
// Deploy: supabase functions deploy notify-standby-trucks
// Secrets required: RESEND_API_KEY (already set if email-notifications is deployed)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_ADDRESS   = 'ServiceWindow <alerts@servicewindow.app>'
const MARKETPLACE_URL = 'https://servicewindow.app/marketplace.html'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // Verify caller is an authenticated user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Missing authorization header' }, 401)

    const userClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )
    const { data: { user }, error: authError } = await userClient.auth.getUser()
    if (authError || !user) return json({ error: 'Unauthorized' }, 401)

    // Parse body
    const body = await req.json().catch(() => ({}))
    const { listing_id, title, event_type, event_date, city } = body

    // Use service role to query standby trucks (bypasses RLS)
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: standbyTrucks, error: queryError } = await admin
      .from('profiles')
      .select('id, business_name, email')
      .eq('role', 'truck')
      .eq('is_verified', true)
      .eq('is_standby', true)

    if (queryError) {
      console.error('[notify-standby] profile query failed:', queryError)
      return json({ error: 'Failed to query standby trucks' }, 500)
    }

    if (!standbyTrucks || standbyTrucks.length === 0) {
      return json({ sent: 0, message: 'No standby trucks found — no emails sent' })
    }

    // Build email content
    const dateStr    = event_date  ? new Date(event_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'TBD'
    const cityStr    = city        ? ` in ${city}`         : ''
    const typeStr    = event_type  ? ` — ${event_type}`    : ''
    const subject    = `🚨 Emergency Coverage Needed${typeStr}${cityStr}`

    const htmlBody = `
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#0D1B2A;color:#ffffff;border-radius:12px;overflow:hidden;">
        <div style="background:#FF6B35;padding:20px 28px;">
          <p style="margin:0;font-size:13px;font-weight:600;color:#fff;letter-spacing:0.05em;text-transform:uppercase;">ServiceWindow · Emergency Alert</p>
        </div>
        <div style="padding:32px 28px;">
          <h1 style="font-size:22px;font-weight:700;margin:0 0 8px;color:#ffffff;">Emergency Coverage Needed</h1>
          <p style="font-size:15px;color:rgba(255,255,255,0.75);margin:0 0 24px;line-height:1.5;">
            A planner in your area needs an emergency food truck replacement.
          </p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:13px;color:rgba(255,255,255,0.5);width:110px;">Event type</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:14px;color:#fff;">${event_type || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:13px;color:rgba(255,255,255,0.5);">Date</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:14px;color:#fff;">${dateStr}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:13px;color:rgba(255,255,255,0.5);">Location</td>
              <td style="padding:10px 0;font-size:14px;color:#fff;">${city || 'SWFL'}</td>
            </tr>
          </table>
          <a href="${MARKETPLACE_URL}" style="display:inline-block;background:#FF6B35;color:#fff;text-decoration:none;padding:13px 24px;border-radius:8px;font-size:15px;font-weight:600;">View Request &amp; Respond →</a>
          <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:28px 0 0;line-height:1.6;">
            You're receiving this because you've enabled standby availability in your truck dashboard.
            To stop receiving these alerts, uncheck "Available for last-minute bookings" in your
            <a href="https://servicewindow.app/truck-dashboard.html" style="color:rgba(255,107,53,0.7);">profile settings</a>.
          </p>
        </div>
      </div>`

    // Fire emails — parallel, best-effort
    const results = await Promise.allSettled(
      standbyTrucks.map(async (truck) => {
        const toEmail = truck.email
        if (!toEmail) return { skipped: truck.id, reason: 'no email' }

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from:    FROM_ADDRESS,
            to:      [toEmail],
            subject,
            html:    htmlBody,
          }),
        })

        if (!res.ok) {
          const err = await res.text()
          console.error(`[notify-standby] Resend failed for ${truck.id}:`, err)
          return { failed: truck.id, status: res.status }
        }

        return { sent: truck.id }
      })
    )

    const sent    = results.filter(r => r.status === 'fulfilled' && (r.value as any).sent).length
    const failed  = results.filter(r => r.status === 'rejected'  || (r.value as any).failed).length
    const skipped = results.filter(r => r.status === 'fulfilled' && (r.value as any).skipped).length

    console.log(`[notify-standby] listing=${listing_id} sent=${sent} failed=${failed} skipped=${skipped}`)
    return json({ sent, failed, skipped, total: standbyTrucks.length })

  } catch (err) {
    console.error('[notify-standby] unhandled error:', err)
    return json({ error: err instanceof Error ? err.message : 'Internal error' }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
