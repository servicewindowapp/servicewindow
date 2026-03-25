import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.175.0/crypto/mod.ts";

const R2_ACCOUNT_ID = Deno.env.get("R2_ACCOUNT_ID");
const R2_ACCESS_KEY_ID = Deno.env.get("R2_ACCESS_KEY_ID");
const R2_SECRET_ACCESS_KEY = Deno.env.get("R2_SECRET_ACCESS_KEY");
const R2_BUCKET_NAME = "servicewindow-avatars";
const R2_PUBLIC_URL_BASE = Deno.env.get("R2_PUBLIC_URL_BASE"); // e.g., https://pub-xxxxx.r2.dev

// AWS Signature V4 signing implementation
async function signRequest(
  method: string,
  path: string,
  headers: Record<string, string>,
  body: string = ""
): Promise<Record<string, string>> {
  const algorithm = "AWS4-HMAC-SHA256";
  const service = "s3";
  const region = "auto";
  const host = `${R2_ACCOUNT_ID}.r2.googleapis.com`;
  const credentialScope = `${new Date().toISOString().split("T")[0]}/${region}/${service}/aws4_request`;

  // Create canonical request
  const canonicalHeaders = Object.entries(headers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k.toLowerCase()}:${v.trim()}\n`)
    .join("");

  const signedHeaders = Object.keys(headers)
    .map((k) => k.toLowerCase())
    .sort()
    .join(";");

  const bodyHash = await hashSha256(body);
  const canonicalRequest = [
    method,
    path,
    "",
    canonicalHeaders,
    signedHeaders,
    bodyHash,
  ].join("\n");

  // Create string to sign
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
  const datestamp = timestamp.slice(0, 8);
  const canonicalHash = await hashSha256(canonicalRequest);
  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    canonicalHash,
  ].join("\n");

  // Calculate signature
  const kDate = await signHmac(
    `AWS4${R2_SECRET_ACCESS_KEY}`,
    datestamp
  );
  const kRegion = await signHmac(kDate, region);
  const kService = await signHmac(kRegion, service);
  const kSigning = await signHmac(kService, "aws4_request");
  const signature = await signHmac(kSigning, stringToSign);

  // Create authorization header
  const credential = `${R2_ACCESS_KEY_ID}/${credentialScope}`;
  const authHeader = `${algorithm} Credential=${credential}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return {
    Authorization: authHeader,
    "X-Amz-Date": timestamp,
    ...headers,
  };
}

async function hashSha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signHmac(key: string | ArrayBuffer, data: string): Promise<string> {
  let keyBuffer: ArrayBuffer;

  if (typeof key === "string") {
    keyBuffer = new TextEncoder().encode(key);
  } else {
    keyBuffer = key;
  }

  const importedKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    importedKey,
    new TextEncoder().encode(data)
  );

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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
    if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_PUBLIC_URL_BASE) {
      return new Response(
        JSON.stringify({
          error: "R2 credentials not configured",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { filename, contentType } = await req.json();

    if (!filename || !contentType) {
      return new Response(
        JSON.stringify({
          error: "Missing filename or contentType",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate presigned URL valid for 1 hour
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const path = `/${R2_BUCKET_NAME}/${filename}`;
    const host = `${R2_ACCOUNT_ID}.r2.googleapis.com`;

    const headers: Record<string, string> = {
      Host: host,
      "Content-Type": contentType,
      "X-Amz-Expires": "3600",
    };

    // Sign the request
    const signedHeaders = await signRequest("PUT", path, headers, "");

    // Build presigned URL
    const url = new URL(`https://${host}${path}`);
    url.searchParams.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
    url.searchParams.set(
      "X-Amz-Credential",
      `${R2_ACCESS_KEY_ID}/${new Date()
        .toISOString()
        .split("T")[0]}/auto/s3/aws4_request`
    );
    url.searchParams.set(
      "X-Amz-Date",
      signedHeaders["X-Amz-Date"] || new Date().toISOString()
    );
    url.searchParams.set("X-Amz-Expires", "3600");
    url.searchParams.set(
      "X-Amz-SignedHeaders",
      Object.keys(headers)
        .map((k) => k.toLowerCase())
        .sort()
        .join(";")
    );

    // Extract signature from Authorization header
    const authHeader = signedHeaders.Authorization || "";
    const signatureMatch = authHeader.match(/Signature=([^,\s]+)/);
    if (signatureMatch) {
      url.searchParams.set("X-Amz-Signature", signatureMatch[1]);
    }

    const uploadUrl = url.toString();
    const publicUrl = `${R2_PUBLIC_URL_BASE}/${filename}`;

    return new Response(
      JSON.stringify({
        uploadUrl,
        publicUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate presigned URL",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
