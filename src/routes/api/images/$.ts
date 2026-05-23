import { createFileRoute } from "@tanstack/react-router";

type WorkerEnv = {
  IMAGE_BUCKET?: R2Bucket;
  UPLOAD_PASSWORD?: string;
};

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxUploadBytes = 8 * 1024 * 1024;
const localImageRoot = "public/images";

function json(body: unknown, init?: ResponseInit) {
  return Response.json(body, init);
}

async function getWorkerEnv(): Promise<WorkerEnv> {
  try {
    const workers = await import("cloudflare:workers");
    return workers.env ?? {};
  } catch {
    return {};
  }
}

async function getImageBucket() {
  const env = await getWorkerEnv();
  return env.IMAGE_BUCKET ?? null;
}

function getContentType(key: string) {
  if (/\.png$/i.test(key)) return "image/png";
  if (/\.webp$/i.test(key)) return "image/webp";
  if (/\.gif$/i.test(key)) return "image/gif";
  return "image/jpeg";
}

async function getLocalImagePath(key: string) {
  const [{ default: path }, { cwd }] = await Promise.all([import("node:path"), import("node:process")]);
  return path.join(cwd(), localImageRoot, key);
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

async function isAuthorized(request: Request) {
  const env = await getWorkerEnv();
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
        const bucket = await getImageBucket();

        if (!key) return new Response("Invalid image key", { status: 400 });

        if (!bucket) {
          try {
            const [{ readFile }, filePath] = await Promise.all([
              import("node:fs/promises"),
              getLocalImagePath(key),
            ]);
            const bytes = await readFile(filePath);
            return new Response(bytes, {
              headers: {
                "content-type": getContentType(key),
                "cache-control": "no-store",
              },
            });
          } catch {
            return new Response("Image not found", {
              status: 404,
              headers: { "cache-control": "no-store" },
            });
          }
        }

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
        const env = await getWorkerEnv();
        const key = getImageKey(params);
        const bucket = await getImageBucket();

        if (bucket && !env.UPLOAD_PASSWORD) {
          return json({ error: "UPLOAD_PASSWORD is not configured" }, { status: 500 });
        }

        if (bucket && !(await isAuthorized(request))) {
          return json({ error: "Wrong upload password" }, { status: 401 });
        }

        if (!key) {
          return json({ error: "Invalid image key" }, { status: 400 });
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

        if (!bucket) {
          const [{ mkdir, writeFile }, { default: path }, filePath] = await Promise.all([
            import("node:fs/promises"),
            import("node:path"),
            getLocalImagePath(key),
          ]);

          await mkdir(path.dirname(filePath), { recursive: true });
          await writeFile(filePath, new Uint8Array(bytes));

          return json({ ok: true, src: `/api/images/${key}?v=${Date.now()}` });
        }

        await bucket.put(key, bytes, {
          httpMetadata: { contentType },
        });

        return json({ ok: true, src: `/api/images/${key}?v=${Date.now()}` });
      },
    },
  },
});
