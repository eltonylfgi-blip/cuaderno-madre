import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MAX_FILE_BYTES = 25 * 1024 * 1024;
const MAX_TOTAL_BYTES = 40 * 1024 * 1024;
const MAX_REQUEST_BYTES = MAX_TOTAL_BYTES + 2 * 1024 * 1024;
const MAX_FILES = 3;
const DEFAULT_ORIGINS = [
  "https://eltonylfgi-blip.github.io",
];

const MIME_EXT: Record<string, string> = {
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

function allowedOrigin(origin: string): boolean {
  if (!origin) return true;
  const configured = (Deno.env.get("MEDIA_ALLOWED_ORIGINS") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if ([...DEFAULT_ORIGINS, ...configured].includes(origin)) return true;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

function corsHeaders(origin: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin || DEFAULT_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(origin: string, status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function field(form: FormData, name: string, max: number, required = false): string {
  const value = String(form.get(name) || "").trim();
  if (required && !value) throw new IntakeError(400, `Falta ${name}.`);
  if (value.length > max) throw new IntakeError(400, `${name} es demasiado largo.`);
  return value;
}

class IntakeError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function bytesEqual(bytes: Uint8Array, offset: number, expected: number[]): boolean {
  if (bytes.length < offset + expected.length) return false;
  return expected.every((value, index) => bytes[offset + index] === value);
}

function ascii(bytes: Uint8Array, offset: number, length: number): string {
  return String.fromCharCode(...bytes.slice(offset, offset + length));
}

function detectMime(bytes: Uint8Array): string | null {
  if (bytesEqual(bytes, 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (bytesEqual(bytes, 0, [0xff, 0xd8, 0xff])) return "image/jpeg";
  if (ascii(bytes, 0, 6) === "GIF87a" || ascii(bytes, 0, 6) === "GIF89a") return "image/gif";
  if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WEBP") return "image/webp";
  if (ascii(bytes, 0, 4) === "RIFF" && ascii(bytes, 8, 4) === "WAVE") return "audio/wav";
  if (ascii(bytes, 0, 4) === "OggS") return "audio/ogg";
  if (ascii(bytes, 0, 3) === "ID3" || (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0)) return "audio/mpeg";
  if (ascii(bytes, 4, 4) === "ftyp") return "video/mp4";
  if (bytesEqual(bytes, 0, [0x1a, 0x45, 0xdf, 0xa3])) return "video/webm";
  return null;
}

function kindFor(mime: string): "audio" | "image" | "video" {
  return mime.split("/")[0] as "audio" | "image" | "video";
}

function safeName(name: string): string {
  const cleaned = name.replace(/[\u0000-\u001f\u007f]/g, "").replace(/[\\/]/g, "-").trim();
  return (cleaned || "archivo").slice(0, 220);
}

function clientAddress(request: Request): string {
  const direct = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip");
  if (direct) return direct.trim().slice(0, 96);
  return (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim().slice(0, 96);
}

async function sha256Hex(value: ArrayBuffer | string): Promise<string> {
  const input = typeof value === "string" ? new TextEncoder().encode(value) : value;
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

type PreparedFile = {
  file: File;
  buffer: ArrayBuffer;
  detectedMime: string;
  sha256: string;
};

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") || "";
  if (!allowedOrigin(origin)) return json("", 403, { error: "Origen no permitido." });
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(origin) });
  if (request.method !== "POST") return json(origin, 405, { error: "Método no permitido." });
  if (!origin) return json("", 403, { error: "El envío necesita un origen permitido." });
  if (Deno.env.get("MEDIA_INTAKE_ENABLED") !== "true") {
    return json(origin, 503, { error: "La recepción multimedia todavía no está activada." });
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      throw new IntakeError(415, "Se esperaba multipart/form-data.");
    }
    const lengthHeader = request.headers.get("content-length") || "";
    const declaredLength = Number(lengthHeader);
    if (!/^\d+$/.test(lengthHeader) || !Number.isSafeInteger(declaredLength) || declaredLength <= 0) {
      throw new IntakeError(411, "El envío necesita Content-Length para limitarlo antes de leer archivos.");
    }
    if (declaredLength > MAX_REQUEST_BYTES) {
      throw new IntakeError(413, "El envío completo supera 40 MB.");
    }

    const salt = Deno.env.get("MEDIA_INTAKE_SALT") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.slice(-32);
    if (!salt) throw new Error("MEDIA_INTAKE_SALT no configurado");
    const address = clientAddress(request);
    if (!address || address === "unknown") throw new IntakeError(403, "No se pudo validar el origen de red.");
    const submitterHash = await sha256Hex(`${salt}|${address}`);

    const url = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !serviceKey) throw new Error("Supabase server env incompleto");
    const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

    // El límite se registra ANTES de request.formData(): un multipart grande o chunked no consume
    // memoria primero. El hash no incluye User-Agent, así que cambiarlo no reinicia la cuota.
    const { data: rateAllowed, error: rateError } = await supabase.rpc("media_register_intake", {
      p_submitter_hash: submitterHash,
      p_bytes: declaredLength,
    });
    if (rateError) throw rateError;
    if (!rateAllowed) throw new IntakeError(429, "Demasiados envíos seguidos. Prueba más tarde.");

    const form = await request.formData();
    if (field(form, "website", 200)) throw new IntakeError(400, "No se pudo enviar.");
    if (field(form, "safe_confirmed", 5) !== "true" || field(form, "rights_confirmed", 5) !== "true") {
      throw new IntakeError(400, "Faltan las confirmaciones de seguridad o derechos.");
    }

    const title = field(form, "title", 100, true);
    const description = field(form, "description", 900);
    const intendedUse = field(form, "intended_use", 900, true);
    const author = field(form, "author", 100);
    const categories = new Set(["asmr", "mlg", "ui", "ambient", "illustration", "reaction", "other"]);
    const categoryRaw = field(form, "category", 40) || "other";
    const category = categories.has(categoryRaw) ? categoryRaw : "other";
    const rightsValues = new Set(["own", "cc0", "cc-by", "licensed", "unknown"]);
    const rightsRaw = field(form, "rights", 30) || "unknown";
    let rightsClaim = rightsValues.has(rightsRaw) ? rightsRaw : "unknown";

    const sourceRaw = field(form, "source_url", 700);
    let sourceUrl: string | null = null;
    let sourceHost: string | null = null;
    if (sourceRaw) {
      let parsed: URL;
      try {
        parsed = new URL(sourceRaw);
      } catch {
        throw new IntakeError(400, "La URL de origen no es válida.");
      }
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new IntakeError(400, "La URL debe usar http o https.");
      parsed.hash = "";
      sourceUrl = parsed.toString();
      sourceHost = parsed.hostname.toLowerCase().replace(/^www\./, "");
      // Política de producto de Tony: MyInstants está autorizado para reutilización dentro de MADRE.
      // Conservamos la URL como procedencia y mantenemos intactos seguridad, cuarentena y duplicados.
      if (sourceHost === "myinstants.com" || sourceHost.endsWith(".myinstants.com")) rightsClaim = "licensed";
    }

    const files = form.getAll("files").filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (files.length > MAX_FILES) throw new IntakeError(413, "Solo se permiten 3 archivos por envío.");
    if (!files.length && !sourceUrl) throw new IntakeError(400, "Añade al menos un archivo o una URL.");
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) throw new IntakeError(413, "Los archivos superan 40 MB en total.");

    const declaredAllowed = /^(audio\/(mpeg|wav|x-wav|ogg)|image\/(png|jpeg|webp|gif)|video\/(mp4|webm))$/;
    for (const file of files) {
      if (file.size > MAX_FILE_BYTES) throw new IntakeError(413, `${safeName(file.name)} supera 25 MB.`);
      if (!declaredAllowed.test((file.type || "").toLowerCase())) throw new IntakeError(415, `${safeName(file.name)} no tiene un tipo permitido.`);
    }

    const prepared: PreparedFile[] = [];
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const detectedMime = detectMime(new Uint8Array(buffer.slice(0, 32)));
      if (!detectedMime || !MIME_EXT[detectedMime]) throw new IntakeError(415, `${safeName(file.name)} no coincide con un tipo multimedia permitido.`);
      prepared.push({ file, buffer, detectedMime, sha256: await sha256Hex(buffer) });
    }

    const reviewNote = sourceHost === "myinstants.com" || sourceHost?.endsWith(".myinstants.com")
      ? "Fuente MyInstants: reutilización autorizada por Tony para MADRE; conservar URL/procedencia. Mantener revisión de seguridad y duplicados."
      : "";
    const { data: submission, error: submissionError } = await supabase.from("media_submissions").insert({
      title,
      description,
      intended_use: intendedUse,
      category,
      source_url: sourceUrl,
      source_host: sourceHost,
      author_claim: author,
      rights_claim: rightsClaim,
      file_count: prepared.length,
      submitter_hash: submitterHash,
      review_note: reviewNote,
    }).select("id").single();
    if (submissionError || !submission) throw submissionError || new Error("No se creó la recepción");

    const uploadedPaths: string[] = [];
    try {
      for (const item of prepared) {
        const fileId = crypto.randomUUID();
        const objectPath = `${submission.id}/${fileId}.${MIME_EXT[item.detectedMime]}`;
        const { data: duplicate } = await supabase.from("media_files")
          .select("id")
          .eq("sha256", item.sha256)
          .eq("bytes", item.file.size)
          .limit(1)
          .maybeSingle();
        const { error: uploadError } = await supabase.storage.from("media-quarantine").upload(objectPath, item.buffer, {
          contentType: item.detectedMime,
          cacheControl: "3600",
          upsert: false,
        });
        if (uploadError) throw uploadError;
        uploadedPaths.push(objectPath);
        const { error: fileError } = await supabase.from("media_files").insert({
          id: fileId,
          submission_id: submission.id,
          object_path: objectPath,
          original_name: safeName(item.file.name),
          declared_mime: (item.file.type || "").slice(0, 100),
          detected_mime: item.detectedMime,
          media_kind: kindFor(item.detectedMime),
          bytes: item.file.size,
          sha256: item.sha256,
          review_status: duplicate ? "duplicate" : "pending",
          duplicate_of: duplicate?.id || null,
        });
        if (fileError) throw fileError;
      }
    } catch (error) {
      if (uploadedPaths.length) await supabase.storage.from("media-quarantine").remove(uploadedPaths);
      await supabase.from("media_submissions").delete().eq("id", submission.id);
      throw error;
    }

    console.log(JSON.stringify({ event: "media_intake_accepted", submission_id: submission.id, files: prepared.length, bytes: totalBytes, source_host: sourceHost }));
    return json(origin, 202, {
      ok: true,
      receipt: submission.id,
      status: "quarantined",
      public: false,
      message: "Recibido para revisión. Nada se publica automáticamente.",
    });
  } catch (error) {
    if (error instanceof IntakeError) return json(origin, error.status, { error: error.message });
    console.error(JSON.stringify({ event: "media_intake_error", message: error instanceof Error ? error.message : "unknown" }));
    return json(origin, 500, { error: "No se pudo guardar de forma segura. No se publicó nada." });
  }
});
