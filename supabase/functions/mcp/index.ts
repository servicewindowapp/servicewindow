// ServiceWindow MCP Server
// Exposes food truck marketplace data to AI agents via Model Context Protocol (JSON-RPC 2.0)
// Deploy: supabase functions deploy mcp --no-verify-jwt
// Endpoint: https://krmfxedkxoyzkeqnijcd.supabase.co/functions/v1/mcp

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// ─── TOOL DEFINITIONS ───────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'search_trucks',
    description: [
      'Search verified food truck operators on the ServiceWindow marketplace in Southwest Florida (SWFL).',
      'Filter by cuisine type, city, or keyword. Returns truck profiles including name, cuisine,',
      'city, bio, and a direct booking URL.',
      'Coverage: 21 cities across Lee, Collier, Sarasota, Charlotte, and Hendry counties.',
      'All returned trucks are verified operators.',
    ].join(' '),
    inputSchema: {
      type: 'object',
      properties: {
        cuisine: {
          type: 'string',
          description: 'Cuisine type to filter by. Examples: "BBQ", "Mexican", "Italian", "American", "Asian", "Seafood", "Dessert", "Mediterranean", "Caribbean".',
        },
        city: {
          type: 'string',
          description: 'City in Southwest Florida. Examples: "Fort Myers", "Cape Coral", "Naples", "Sarasota", "Bonita Springs", "Estero", "Punta Gorda", "Port Charlotte", "Lehigh Acres".',
        },
        keyword: {
          type: 'string',
          description: 'Free-text search across truck name, cuisine type, and bio description.',
        },
        limit: {
          type: 'number',
          description: 'Maximum results to return. Default: 10. Max: 24.',
        },
      },
    },
  },
  {
    name: 'get_truck',
    description: 'Get full details on a specific verified food truck by its profile ID. Use after search_trucks to get more detail on a specific result.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The truck profile UUID, obtained from a search_trucks result.',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_marketplace',
    description: [
      'Browse active listings on the ServiceWindow marketplace.',
      'Seven boards available: "request" (event organizers/HOAs seeking trucks),',
      '"event" (upcoming events trucks can apply to),',
      '"shift" (trucks posting their available dates),',
      '"venue" (venues seeking recurring food truck partnerships),',
      '"parking" (parking spots and commissary storage for rent),',
      '"vendor" (industry services and suppliers),',
      '"jobs" (food truck industry employment).',
    ].join(' '),
    inputSchema: {
      type: 'object',
      properties: {
        board: {
          type: 'string',
          enum: ['request', 'event', 'shift', 'venue', 'parking', 'vendor', 'jobs'],
          description: 'Which marketplace board to browse.',
        },
        city: {
          type: 'string',
          description: 'Filter listings by city in Southwest Florida.',
        },
        limit: {
          type: 'number',
          description: 'Maximum results to return. Default: 10. Max: 24.',
        },
      },
      required: ['board'],
    },
  },
]

// ─── TOOL HANDLERS ──────────────────────────────────────────────────────────

async function searchTrucks(supabase: ReturnType<typeof createClient>, args: Record<string, unknown>) {
  const cuisine = args.cuisine as string | undefined
  const city = args.city as string | undefined
  const keyword = args.keyword as string | undefined
  const limit = Math.min(Number(args.limit) || 10, 24)

  let query = supabase
    .from('profiles')
    .select('id, business_name, cuisine_type, city, bio, is_fundraiser_friendly, is_veteran_owned, website, service_radius')
    .eq('role', 'truck')
    .eq('is_verified', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (city) query = query.eq('city', city)
  if (cuisine) query = query.ilike('cuisine_type', `%${cuisine}%`)
  if (keyword) query = query.or(`business_name.ilike.%${keyword}%,cuisine_type.ilike.%${keyword}%,bio.ilike.%${keyword}%`)

  const { data, error } = await query
  if (error) throw new Error(error.message)

  const trucks = (data || []).map((t) => ({
    id: t.id,
    name: t.business_name,
    cuisine: t.cuisine_type,
    city: t.city,
    bio: t.bio || null,
    fundraiser_friendly: t.is_fundraiser_friendly,
    veteran_owned: t.is_veteran_owned,
    website: t.website || null,
    service_radius_miles: t.service_radius || null,
    booking_url: `https://servicewindow.app/marketplace.html`,
    profile_url: `https://servicewindow.app/find-trucks.html`,
  }))

  return {
    total: trucks.length,
    trucks,
    filters_applied: { cuisine, city, keyword },
    marketplace_url: 'https://servicewindow.app/marketplace.html',
    note: trucks.length === 0
      ? 'No verified trucks matched your filters. Try broadening the search — remove city or cuisine filters.'
      : `Found ${trucks.length} verified truck${trucks.length !== 1 ? 's' : ''} in Southwest Florida.`,
  }
}

async function getTruck(supabase: ReturnType<typeof createClient>, args: Record<string, unknown>) {
  const id = args.id as string
  if (!id) throw new Error('id is required')

  const { data, error } = await supabase
    .from('profiles')
    .select('id, business_name, cuisine_type, city, bio, is_fundraiser_friendly, is_veteran_owned, website, service_radius, created_at')
    .eq('id', id)
    .eq('role', 'truck')
    .eq('is_verified', true)
    .single()

  if (error || !data) throw new Error('Truck not found. Confirm the ID came from a search_trucks result.')

  return {
    id: data.id,
    name: data.business_name,
    cuisine: data.cuisine_type,
    city: data.city,
    bio: data.bio || null,
    fundraiser_friendly: data.is_fundraiser_friendly,
    veteran_owned: data.is_veteran_owned,
    website: data.website || null,
    service_radius_miles: data.service_radius || null,
    verified: true,
    member_since: data.created_at,
    booking_url: 'https://servicewindow.app/marketplace.html',
    note: 'To book this truck, visit the booking URL or post a request on the Request board via list_marketplace.',
  }
}

async function listMarketplace(supabase: ReturnType<typeof createClient>, args: Record<string, unknown>) {
  const board = args.board as string
  const city = args.city as string | undefined
  const limit = Math.min(Number(args.limit) || 10, 24)

  if (!board) throw new Error('board is required')

  let query = supabase
    .from('listings')
    .select('id, title, description, location, city, event_date, start_time, guest_count_min, guest_count_max, budget_range, cuisine_type_needed, trucks_needed, is_urgent, board, created_at')
    .eq('board', board)
    .eq('status', 'active')
    .limit(limit)
    .order('created_at', { ascending: false })

  if (city) query = query.eq('city', city)

  const { data, error } = await query
  if (error) throw new Error(error.message)

  const boardLabels: Record<string, string> = {
    request: 'Event Request (organizers/HOAs seeking trucks)',
    event: 'Upcoming Event (trucks can apply)',
    shift: 'Available Shift (truck posting open date)',
    venue: 'Venue Partnership Opportunity',
    parking: 'Parking / Storage / Commissary',
    vendor: 'Vendor Service Listing',
    jobs: 'Food Truck Industry Job',
  }

  return {
    board,
    board_description: boardLabels[board] || board,
    total: (data || []).length,
    listings: data || [],
    marketplace_url: 'https://servicewindow.app/marketplace.html',
    note: (data || []).length === 0
      ? `No active listings on the ${board} board right now.`
      : `Showing ${(data || []).length} active listing${(data || []).length !== 1 ? 's' : ''}.`,
  }
}

// ─── JSON-RPC DISPATCH ──────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST required' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({
      jsonrpc: '2.0', id: null,
      error: { code: -32700, message: 'Parse error — invalid JSON' },
    }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  const { id, method, params } = body as {
    jsonrpc: string
    id: unknown
    method: string
    params: Record<string, unknown>
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  try {
    let result: unknown

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          serverInfo: { name: 'servicewindow-mcp', version: '1.0.0' },
          capabilities: { tools: {} },
        }
        break

      case 'notifications/initialized':
        // Client notification — no response body needed
        return new Response(null, { status: 204, headers: corsHeaders })

      case 'tools/list':
        result = { tools: TOOLS }
        break

      case 'tools/call': {
        const { name, arguments: args = {} } = params as { name: string; arguments: Record<string, unknown> }
        let data: unknown

        switch (name) {
          case 'search_trucks':
            data = await searchTrucks(supabase, args)
            break
          case 'get_truck':
            data = await getTruck(supabase, args)
            break
          case 'list_marketplace':
            data = await listMarketplace(supabase, args)
            break
          default:
            return new Response(JSON.stringify({
              jsonrpc: '2.0', id,
              error: { code: -32601, message: `Unknown tool: ${name}` },
            }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        }

        result = {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
        }
        break
      }

      default:
        return new Response(JSON.stringify({
          jsonrpc: '2.0', id,
          error: { code: -32601, message: `Method not found: ${method}` },
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ jsonrpc: '2.0', id, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return new Response(JSON.stringify({
      jsonrpc: '2.0', id,
      error: { code: -32603, message },
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})
