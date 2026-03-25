/**
 * Cloudflare Worker for R2 Avatar Uploads
 * Handles file uploads to Cloudflare R2 storage
 *
 * Deployment Instructions:
 * 1. Create a new Worker in Cloudflare Dashboard
 * 2. Copy this code into the Worker editor
 * 3. Add R2 bucket binding:
 *    - In wrangler.toml, add:
 *      [[r2_buckets]]
 *      binding = "R2_BUCKET"
 *      bucket_name = "servicewindow-avatars"
 *    - Or in Dashboard: Settings → Bindings → R2 Bucket
 *      Name: R2_BUCKET
 *      Bucket: servicewindow-avatars
 * 4. Add environment variable binding:
 *    - In wrangler.toml, add:
 *      [env.production]
 *      vars = { R2_PUBLIC_URL = "https://pub-09293fd374ea434fa88c4d86285a5167.r2.dev" }
 *    - Or in Dashboard: Settings → Variables
 *      R2_PUBLIC_URL = "https://pub-09293fd374ea434fa88c4d86285a5167.r2.dev"
 * 5. Deploy the worker
 * 6. Get the worker URL (e.g., https://r2-upload.servicewindow.workers.dev)
 * 7. Update avatar-upload.js with the worker URL
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://servicewindow.app',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response("ok", {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    try {
      // Get filename and contentType from query parameters
      const url = new URL(request.url);
      const filename = url.searchParams.get("filename");
      const contentType = url.searchParams.get("contentType");

      // Validate parameters
      if (!filename || !contentType) {
        return new Response(
          JSON.stringify({ error: "Missing filename or contentType" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // Get R2 bucket from environment binding
      const bucket = env.R2_BUCKET;
      if (!bucket) {
        console.error("[r2-upload] R2_BUCKET binding not configured");
        return new Response(
          JSON.stringify({ error: "Server configuration error" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      // Get public URL base from environment variable
      const publicUrlBase = env.R2_PUBLIC_URL;
      if (!publicUrlBase) {
        console.error("[r2-upload] R2_PUBLIC_URL not configured");
        return new Response(
          JSON.stringify({ error: "Server configuration error" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      console.log(`[r2-upload] Uploading ${filename} (${contentType})`);

      // Read file from request body
      const fileBuffer = await request.arrayBuffer();
      console.log(`[r2-upload] File size: ${fileBuffer.byteLength} bytes`);

      // Upload to R2
      console.log(`[r2-upload] Uploading to R2...`);
      await bucket.put(filename, fileBuffer, {
        httpMetadata: {
          contentType: contentType,
        },
      });
      console.log(`[r2-upload] Upload successful`);

      // Construct public URL
      const publicUrl = `${publicUrlBase}/${filename}`;
      console.log(`[r2-upload] Public URL: ${publicUrl}`);

      // Return success response
      return new Response(
        JSON.stringify({
          success: true,
          url: publicUrl,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    } catch (error) {
      console.error("[r2-upload] Error:", error);
      return new Response(
        JSON.stringify({
          error: "Upload failed",
          message: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  },
};
