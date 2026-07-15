import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEFAULT_ORIGINS = ["https://eltonylfgi-blip.github.io"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function allowedOrigin(origin: string): boolean {
  if (!origin) return true;
  const configured = (Deno.env.get("MEDIA_ALLOWED_ORIGINS") || "")
    .split(",").map((value) => value.trim()).filter(Boolean);
  return [...DEFAULT_ORIGINS, ...configured].includes(origin) ||
    /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function cors(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin || DEFAULT_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "range",
    "Access-Control-Expose-Headers": "accept-ranges, content-length, content-range, content-type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin, Range",
  };
}

function fail(origin: string, status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      ...cors(origin),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function storagePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") || "";
  if (!allowedOrigin(origin)) return fail("", 403, "Origen no permitido.");
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (request.method !== "GET" && request.method !== "HEAD") return fail(origin, 405, "Método no permitido.");

  const assetId = new URL(request.url).searchParams.get("id") || "";
  if (!UUID.test(assetId)) return fail(origin, 404, "Recurso no disponible.");

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return fail(origin, 503, "Archivo temporalmente no disponible.");

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.from("media_assets")
    .select("status,safety_status,rights_status,published_at,file:media_files!media_assets_file_id_fkey(bucket_id,object_path,detected_mime,review_status)")
    .eq("id", assetId)
    .maybeSingle();
  const file = Array.isArray(data?.file) ? data.file[0] : data?.file;
  if (error || !data || data.status !== "approved" || data.safety_status !== "safe" ||
      data.rights_status !== "verified" || !data.published_at || !file ||
      file.bucket_id !== "media-approved" || file.review_status !== "safe") {
    return fail(origin, 404, "Recurso no disponible.");
  }

  const upstreamHeaders: HeadersInit = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
  };
  const range = request.headers.get("range");
  if (range) upstreamHeaders.Range = range;
  const objectUrl = `${supabaseUrl}/storage/v1/object/authenticated/media-approved/${storagePath(file.object_path)}`;
  const upstream = await fetch(objectUrl, { method: request.method, headers: upstreamHeaders });
  if (!upstream.ok && upstream.status !== 206) return fail(origin, 404, "Recurso no disponible.");

  const headers = new Headers(cors(origin));
  ["accept-ranges", "content-length", "content-range", "etag", "last-modified"].forEach((name) => {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  });
  headers.set("Content-Type", file.detected_mime);
  headers.set("Content-Disposition", "inline");
  headers.set("Cache-Control", "no-store");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(request.method === "HEAD" ? null : upstream.body, { status: upstream.status, headers });
});
