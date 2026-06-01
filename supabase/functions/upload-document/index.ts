import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const BUCKET = 'truck-documents'
const MAX_SIZE = 10 * 1024 * 1024  // 10 MB
const ALLOWED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
const VALID_DOC_TYPES = [
  'dbpr_mfdv_license',
  'county_health_permit',
  'food_manager_cert',
  'certificate_of_insurance',
  'commissary_agreement',
]

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // ── Auth ──────────────────────────────────────────────
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // ── Verify truck role ────────────────────────────────
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
    if (!profile || profile.role !== 'truck') {
      return new Response(JSON.stringify({ error: 'Only truck operators can upload documents' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // ── Parse multipart ───────────────────────────────────
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const docType = formData.get('doc_type') as string | null

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file in request' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    if (!docType || !VALID_DOC_TYPES.includes(docType)) {
      return new Response(JSON.stringify({ error: 'Invalid doc_type' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    if (!ALLOWED.includes(file.type)) {
      return new Response(JSON.stringify({ error: 'Invalid file type. Use PDF, JPEG, PNG, or WebP.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({ error: 'File too large. Max 10 MB.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // ── Ensure bucket exists ──────────────────────────────
    await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_SIZE,
      allowedMimeTypes: ALLOWED,
    }).catch(() => { /* already exists */ })

    // ── Upload ────────────────────────────────────────────
    const ext = file.type === 'application/pdf' ? 'pdf'
              : file.type === 'image/webp' ? 'webp'
              : file.type === 'image/png'  ? 'png'
              : 'jpg'
    const path = `${user.id}/${docType}-${Date.now()}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, arrayBuffer, { contentType: file.type, upsert: true })

    if (uploadError) {
      return new Response(JSON.stringify({ error: uploadError.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(path)

    // ── Upsert truck_documents row ────────────────────────
    const { error: dbError } = await supabase
      .from('truck_documents')
      .upsert({
        truck_id: user.id,
        document_type: docType,
        file_url: publicUrl,
        file_name: file.name,
        status: 'submitted',
      }, { onConflict: 'truck_id,document_type' })

    if (dbError) {
      return new Response(JSON.stringify({ error: dbError.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ url: publicUrl, doc_type: docType }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
