// ServiceWindow REST API
// Simple GET-based REST endpoint for agent frameworks that don't support MCP
// Deploy: supabase functions deploy sw-api --no-verify-jwt
// Endpoint: https://krmfxedkxoyzkeqnijcd.supabase.co/functions/v1/sw-api
//
// Routes (all GET):
//   ?type=trucks              — search trucks (params: cuisine, city, keyword, limit)
//   ?type=truck&id={uuid}     — get specific truck
//   ?type=listings&board=...  — browse marketplace board (params: city, limit)
//   ?type=openapi             — returns OpenAPI 3.0 spec

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

const OPENAPI_SPEC = {
  openapi: '3.0.0',
  info: {
    title: 'ServiceWindow API',
    version: '1.0.0',
    description: 'REST API for the ServiceWindow food truck marketplace in Southwest Florida. Search verified trucks and browse marketplace listings across 21 SWFL cities.',
    contact: { url: 'https://servicewindow.app/api.html' },
  },
  servers: [
    { url: 'https://krmfxedkxoyzkeqnijcd.supabase.co/functions/v1', description: 'Production' },
  ],
  paths: {
    '/sw-api': {
      get: {
        summary: 'ServiceWindow API',
        description: 'Single endpoint with type parameter routing. Supports trucks search, truck detail, and marketplace listing queries.',
        parameters: [
          {
            name: 'type',
            in: 'query',
            required: true,
            schema: { type: 'string', enum: ['trucks', 'truck', 'listings'] },
            description: 'trucks = search verified trucks | truck = get specific truck | listings = browse marketplace board',
          },
          {
            name: 'cuisine',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter trucks by cuisine type. Examples: BBQ, Mexican, Seafood, Asian, Dessert, Italian, American, Mediterranean.',
          },
          {
            name: 'city',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter by city in Southwest Florida. Examples: Fort Myers, Cape Coral, Naples, Sarasota, Bonita Springs, Estero.',
          },
          {
            name: 'keyword',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Free-text search across truck name, cuisine, and bio. Used with type=trucks only.',
          },
          {
            name: 'id',
            in: 'query',
            required: false,
            schema: { type: 'string', format: 'uuid' },
            description: 'Truck profile UUID. Required when type=truck.',
          },
          {
            name: 'board',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              enum: ['request', 'event', 'shift', 'venue', 'parking', 'vendor', 'jobs'],
            },
            description: 'Marketplace board to browse. Required when type=listings. request=organizers seeking trucks, event=upcoming events, shift=truck availability, venue=venue partnerships, parking=parking/storage, vendor=services, jobs=employment.',
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 24, default: 10 },
            description: 'Maximum results to return.',
          },
        ],
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    type: { type: 'string' },
                    total: { type: 'integer' },
                    data: { type: 'array', items: { type: 'object' } },
                    note: { type: 'string' },
                    marketplace_url: { type: 'string', format: 'uri' },
                  },
                },
              },
            },
          },
          '400': { description: 'Bad request — missing or invalid parameters' },
          '404': { description: 'Resource not found' },
        },
      },
    },
  },
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return json({ error: 'GET requests only' }, 405)
  }

  const url = new URL(req.url)
  const type = url.searchParams.get('type')

  // Return OpenAPI spec
  if (type === 'openapi') {
    return json(OPENAPI_SPEC)
  }

  if (!type) {
    return json({
      error: 'Missing required parameter: type',
      valid_types: ['trucks', 'truck', 'listings'],
      docs: 'https://servicewindow.app/api.html',
      mcp_endpoint: 'https://krmfxedkxoyzkeqnijcd.supabase.co/functions/v1/mcp',
    }, 400)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  try {
    // ─── GET TRUCKS ───────────────────────────────────────────────────────────
    if (type === 'trucks') {
      const cuisine = url.searchParams.get('cuisine')
      const city = url.searchParams.get('city')
      const keyword = url.searchParams.get('keyword')
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 24)

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
      if (error) return json({ error: error.message }, 500)

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
        booking_url: 'https://servicewindow.app/marketplace.html',
      }))

      return json({
        type: 'trucks',
        total: trucks.length,
        filters: { cuisine, city, keyword },
        data: trucks,
        note: trucks.length === 0
          ? 'No verified trucks matched. Try removing filters.'
          : `${trucks.length} verified truck${trucks.length !== 1 ? 's' : ''} in Southwest Florida.`,
        marketplace_url: 'https://servicewindow.app/marketplace.html',
      })
    }

    // ─── GET SINGLE TRUCK ────────────────────────────────────────────────────
    if (type === 'truck') {
      const id = url.searchParams.get('id')
      if (!id) return json({ error: 'id parameter is required for type=truck' }, 400)

      const { data, error } = await supabase
        .from('profiles')
        .select('id, business_name, cuisine_type, city, bio, is_fundraiser_friendly, is_veteran_owned, website, service_radius, created_at')
        .eq('id', id)
        .eq('role', 'truck')
        .eq('is_verified', true)
        .single()

      if (error || !data) return json({ error: 'Truck not found' }, 404)

      return json({
        type: 'truck',
        data: {
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
        },
      })
    }

    // ─── GET LISTINGS ────────────────────────────────────────────────────────
    if (type === 'listings') {
      const board = url.searchParams.get('board')
      const city = url.searchParams.get('city')
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '10'), 24)

      if (!board) return json({ error: 'board parameter is required for type=listings', valid_boards: ['request', 'event', 'shift', 'venue', 'parking', 'vendor', 'jobs'] }, 400)

      let query = supabase
        .from('listings')
        .select('id, title, description, location, city, event_date, start_time, guest_count_min, guest_count_max, budget_range, cuisine_type_needed, trucks_needed, is_urgent, board, created_at')
        .eq('board', board)
        .eq('status', 'active')
        .limit(limit)
        .order('created_at', { ascending: false })

      if (city) query = query.eq('city', city)

      const { data, error } = await query
      if (error) return json({ error: error.message }, 500)

      const boardLabels: Record<string, string> = {
        request: 'Event Request — organizers/HOAs seeking trucks',
        event: 'Upcoming Event — trucks can apply',
        shift: 'Available Shift — truck posting open date',
        venue: 'Venue Partnership Opportunity',
        parking: 'Parking / Storage / Commissary',
        vendor: 'Vendor Service Listing',
        jobs: 'Food Truck Industry Job',
      }

      return json({
        type: 'listings',
        board,
        board_description: boardLabels[board] || board,
        total: (data || []).length,
        data: data || [],
        marketplace_url: 'https://servicewindow.app/marketplace.html',
      })
    }

    return json({ error: `Unknown type: ${type}. Valid: trucks, truck, listings` }, 400)

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return json({ error: message }, 500)
  }
})

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
