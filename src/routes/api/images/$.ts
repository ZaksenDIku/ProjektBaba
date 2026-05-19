import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxUploadBytes = 8 * 1024 * 1024;

function json(body: unknown, init?: ResponseInit) {
  return Response.json(body, init);
}

function getImageBucket() {
  return env.IMAGE_BUCKET ?? null;
}

function getImageKey(params: { _splat?: string }) {
  const key = params._splat?.replace(/^\/+/, "") ?? "";

  if (
    !key ||
    key.includes("..") ||
    key.startsWith("/") ||
    !/\.(jpe?g|png|webp|gif)$/i.test(key)
  ) {
    return null;
  }

  return key;
}

function isAuthorized(request: Request) {
  if (!env.UPLOAD_PASSWORD) {
    return false;
  }
  return request.headers.get("x-upload-password") === env.UPLOAD_PASSWORD;
}

export const Route = createFileRoute("/api/images/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const key = getImageKey(params);
        const bucket = getImageBucket();

        if (!key) return new Response("Invalid image key", { status: 400 });
        if (!bucket) return new Response("IMAGE_BUCKET is not configured", { status: 500 });

        const object = await bucket.get(key);

        if (!object) {
          return new Response("Image not found", {
            status: 404,
            headers: { "cache-control": "no-store" },
          });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", `"${key}"`);
        headers.set("cache-control", "public, max-age=60");

        return new Response(object.body, { headers });
      },

      PUT: async ({ request, params }) => {
        if (!env.UPLOAD_PASSWORD) {
          return json({ error: "UPLOAD_PASSWORD is not configured" }, { status: 500 });
        }

        if (!isAuthorized(request)) {
          return json({ error: "Wrong upload password" }, { status: 401 });
        }

        const key = getImageKey(params);
        const bucket = getImageBucket();

        if (!key) {
          return json({ error: "Invalid image key" }, { status: 400 });
        }

        if (!bucket) {
          return json({ error: "IMAGE_BUCKET is not configured" }, { status: 500 });
        }

        const contentType = request.headers.get("content-type")?.split(";")[0] ?? "";

        if (!allowedImageTypes.has(contentType)) {
          return json({ error: "Only JPG, PNG, WebP and GIF images are allowed" }, { status: 415 });
        }

        const contentLength = Number(request.headers.get("content-length") ?? 0);
        if (contentLength > maxUploadBytes) {
          return json({ error: "Image is too large. Max size is 8 MB." }, { status: 413 });
        }

        const bytes = await request.arrayBuffer();
        if (bytes.byteLength > maxUploadBytes) {
          return json({ error: "Image is too large. Max size is 8 MB." }, { status: 413 });
        }

        await bucket.put(key, bytes, {
          httpMetadata: { contentType },
        });

        return json({ ok: true, src: `/api/images/${key}?v=${Date.now()}` });
      },
    },
  },
});
