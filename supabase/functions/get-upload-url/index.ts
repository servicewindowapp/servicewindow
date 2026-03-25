import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.175.0/crypto/mod.ts";

const R2_ACCOUNT_ID = Deno.env.get("R2_ACCOUNT_ID");
const R2_ACCESS_KEY_ID = Deno.env.get("R2_ACCESS_KEY_ID");
const R2_SECRET_ACCESS_KEY = Deno.env.get("R2_SECRET_ACCESS_KEY");
const R2_BUCKET_NAME = "servicewindow-avatars";
const R2_PUBLIC_URL_BASE = Deno.env.get("R2_PUBLIC_URL_BASE");

async function signRequest(
  method: string,
  path: string,
  headers: Record<string, string>,
  body: string = ""
): Promise<Record<string, string>> {
  console.log("[signRequest] Starting with method:", method, "path:", path);
  const algorithm = "AWS4-HMAC-SHA256";
  console.log("[signRequest] algorithm:", algorithm);
  const service = "s3";
  console.log("[signRequest] service:", service);
  const region = "auto";
  console.log("[signRequest] region:", region);
  const host = `${R2_ACCOUNT_ID}.r2.googleapis.com`;
  console.log("[signRequest] host:", host);
  const credentialScope = `${new Date().toISOString().split("T")[0]}/${region}/${service}/aws4_request`;
  console.log("[signRequest] credentialScope:", credentialScope);

  const canonicalHeaders = Object.entries(headers)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k.toLowerCase()}:${v.trim()}\n`)
    .join("");
  console.log("[signRequest] canonicalHeaders created, length:", canonicalHeaders.length);

  const signedHeaders = Object.keys(headers)
    .map((k) => k.toLowerCase())
    .sort()
    .join(";");
  console.log("[signRequest] signedHeaders:", signedHeaders);

  console.log("[signRequest] About to call hashSha256 for body");
  const bodyHash = await hashSha256(body);
  console.log("[signRequest] bodyHash:", bodyHash);

  const canonicalRequest = [
    method,
    path,
    "",
    canonicalHeaders,
    signedHeaders,
    bodyHash,
  ].join("\n");
  console.log("[signRequest] canonicalRequest created, length:", canonicalRequest.length);

  const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
  console.log("[signRequest] timestamp:", timestamp);
  const datestamp = timestamp.slice(0, 8);
  console.log("[signRequest] datestamp:", datestamp);

  console.log("[signRequest] About to call hashSha256 for canonicalRequest");
  const canonicalHash = await hashSha256(canonicalRequest);
  console.log("[signRequest] canonicalHash:", canonicalHash);

  const stringToSign = [
    algorithm,
    timestamp,
    credentialScope,
    canonicalHash,
  ].join("\n");
  console.log("[signRequest] stringToSign created, length:", stringToSign.length);

  console.log("[signRequest] Starting HMAC signature calculations");
  console.log("[signRequest] About to call signHmac for kDate");
  const kDate = await signHmac(`AWS4${R2_SECRET_ACCESS_KEY}`, datestamp);
  console.log("[signRequest] kDate generated");

  console.log("[signRequest] About to call signHmac for kRegion");
  const kRegion = await signHmac(kDate, region);
  console.log("[signRequest] kRegion generated");

  console.log("[signRequest] About to call signHmac for kService");
  const kService = await signHmac(kRegion, service);
  console.log("[signRequest] kService generated");

  console.log("[signRequest] About to call signHmac for kSigning");
  const kSigning = await signHmac(kService, "aws4_request");
  console.log("[signRequest] kSigning generated");

  console.log("[signRequest] About to call signHmac for final signature");
  const signature = await signHmac(kSigning, stringToSign);
  console.log("[signRequest] signature generated:", signature.substring(0, 30));

  const credential = `${R2_ACCESS_KEY_ID}/${credentialScope}`;
  console.log("[signRequest] credential created");
  const authHeader = `${algorithm} Credential=${credential}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  console.log("[signRequest] authHeader created, length:", authHeader.length);

  console.log("[signRequest] Returning signed headers");
  return {
    Authorization: authHeader,
    "X-Amz-Date": timestamp,
    ...headers,
  };
}

async function hashSha256(data: string): Promise<string> {
  console.log("[hashSha256] Input length:", data.length);
  const encoder = new TextEncoder();
  console.log("[hashSha256] TextEncoder created");
  const dataBuffer = encoder.encode(data);
  console.log("[hashSha256] dataBuffer encoded, byteLength:", dataBuffer.byteLength);

  console.log("[hashSha256] About to call crypto.subtle.digest");
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  console.log("[hashSha256] digest completed, byteLength:", hashBuffer.byteLength);

  const result = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log("[hashSha256] Returning hash:", result.substring(0, 30));
  return result;
}

async function signHmac(key: string | ArrayBuffer, data: string): Promise<string> {
  console.log("[signHmac] Called with data length:", data.length);
  let keyBuffer: ArrayBuffer;

  if (typeof key === "string") {
    console.log("[signHmac] key is string, encoding");
    keyBuffer = new TextEncoder().encode(key);
    console.log("[signHmac] key encoded, byteLength:", keyBuffer.byteLength);
  } else {
    console.log("[signHmac] key is ArrayBuffer, byteLength:", key.byteLength);
    keyBuffer = key;
  }

  console.log("[signHmac] About to call crypto.subtle.importKey");
  const importedKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  console.log("[signHmac] importKey completed");

  console.log("[signHmac] About to call crypto.subtle.sign");
  const signature = await crypto.subtle.sign(
    "HMAC",
    importedKey,
    new TextEncoder().encode(data)
  );
  console.log("[signHmac] sign completed, signature byteLength:", signature.byteLength);

  const result = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log("[signHmac] Returning signature:", result.substring(0, 30));
  return result;
}

serve(async (req) => {
  console.log("[get-upload-url] Starting request");
  console.log("[get-upload-url] R2_ACCOUNT_ID exists:", !!Deno.env.get("R2_ACCOUNT_ID"));
  console.log("[get-upload-url] R2_ACCESS_KEY_ID exists:", !!Deno.env.get("R2_ACCESS_KEY_ID"));
  console.log("[get-upload-url] R2_SECRET_ACCESS_KEY exists:", !!Deno.env.get("R2_SECRET_ACCESS_KEY"));
  console.log("[get-upload-url] R2_PUBLIC_URL_BASE exists:", !!Deno.env.get("R2_PUBLIC_URL_BASE"));

  try {
    if (req.method === "OPTIONS") {
      console.log("[get-upload-url] Handling CORS preflight");
      return new Response("ok", {
        headers: {
          "Access-Control-Allow-Origin": "https://servicewindow.app",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      });
    }

    if (req.method !== "POST") {
      console.log("[get-upload-url] Invalid method:", req.method);
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://servicewindow.app",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      });
    }

    if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_PUBLIC_URL_BASE) {
      console.log("[get-upload-url] Missing R2 credentials");
      return new Response(
        JSON.stringify({ error: "R2 credentials not configured" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://servicewindow.app",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
          },
        }
      );
    }

    console.log("[get-upload-url] About to parse request JSON");
    const { filename, contentType } = await req.json();
    console.log("[get-upload-url] Parsed request - filename:", filename, "contentType:", contentType);

    if (!filename || !contentType) {
      console.log("[get-upload-url] Missing filename or contentType");
      return new Response(
        JSON.stringify({ error: "Missing filename or contentType" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://servicewindow.app",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
          },
        }
      );
    }

    console.log("[get-upload-url] Generating presigned URL");
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    console.log("[get-upload-url] expirationTime:", expirationTime);
    const path = `/${R2_BUCKET_NAME}/${filename}`;
    console.log("[get-upload-url] path:", path);
    const host = `${R2_ACCOUNT_ID}.r2.googleapis.com`;
    console.log("[get-upload-url] host:", host);

    const headers: Record<string, string> = {
      Host: host,
      "Content-Type": contentType,
      "X-Amz-Expires": "3600",
    };
    console.log("[get-upload-url] headers object created");

    console.log("[get-upload-url] About to call signRequest");
    const signedHeaders = await signRequest("PUT", path, headers, "");
    console.log("[get-upload-url] signRequest completed");
    console.log("[get-upload-url] signedHeaders keys:", Object.keys(signedHeaders));

    console.log("[get-upload-url] Building presigned URL");
    const url = new URL(`https://${host}${path}`);
    console.log("[get-upload-url] URL object created");

    url.searchParams.set("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
    console.log("[get-upload-url] Set X-Amz-Algorithm");

    url.searchParams.set(
      "X-Amz-Credential",
      `${R2_ACCESS_KEY_ID}/${new Date().toISOString().split("T")[0]}/auto/s3/aws4_request`
    );
    console.log("[get-upload-url] Set X-Amz-Credential");

    url.searchParams.set(
      "X-Amz-Date",
      signedHeaders["X-Amz-Date"] || new Date().toISOString()
    );
    console.log("[get-upload-url] Set X-Amz-Date");

    url.searchParams.set("X-Amz-Expires", "3600");
    console.log("[get-upload-url] Set X-Amz-Expires");

    url.searchParams.set(
      "X-Amz-SignedHeaders",
      Object.keys(headers).map((k) => k.toLowerCase()).sort().join(";")
    );
    console.log("[get-upload-url] Set X-Amz-SignedHeaders");

    console.log("[get-upload-url] Extracting signature from Authorization header");
    const authHeader = signedHeaders.Authorization || "";
    console.log("[get-upload-url] authHeader length:", authHeader.length);
    const signatureMatch = authHeader.match(/Signature=([^,\s]+)/);
    console.log("[get-upload-url] signatureMatch found:", !!signatureMatch);

    if (signatureMatch) {
      console.log("[get-upload-url] Setting X-Amz-Signature");
      url.searchParams.set("X-Amz-Signature", signatureMatch[1]);
      console.log("[get-upload-url] X-Amz-Signature set");
    } else {
      console.log("[get-upload-url] WARNING: No signature match in authHeader");
    }

    const uploadUrl = url.toString();
    console.log("[get-upload-url] uploadUrl created, length:", uploadUrl.length);
    const publicUrl = `${R2_PUBLIC_URL_BASE}/${filename}`;
    console.log("[get-upload-url] publicUrl:", publicUrl);

    console.log("[get-upload-url] Creating response JSON");
    const responseBody = { uploadUrl, publicUrl };
    console.log("[get-upload-url] responseBody created");
    const responseJson = JSON.stringify(responseBody);
    console.log("[get-upload-url] JSON.stringify completed, length:", responseJson.length);

    console.log("[get-upload-url] Returning success response");
    return new Response(responseJson, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://servicewindow.app",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  } catch (error) {
    console.error("[get-upload-url] Caught error:", error);
    console.error("[get-upload-url] Error message:", error instanceof Error ? error.message : String(error));
    console.error("[get-upload-url] Error stack:", error instanceof Error ? error.stack : "No stack");
    return new Response(
      JSON.stringify({
        error: "Failed to generate presigned URL",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://servicewindow.app",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        },
      }
    );
  }
});
