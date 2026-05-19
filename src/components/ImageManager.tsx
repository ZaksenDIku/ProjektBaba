import { useMemo, useState, type ChangeEvent } from "react";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { siteImages } from "@/lib/site-images";

type Slot = {
  label: string;
  src: string;
};

type UploadState = "idle" | "uploading" | "done" | "error";

const slots: Slot[] = [
  { label: "Far - hovedbillede", src: siteImages.father },
  { label: "Kapitel 1 - Kærlighed", src: siteImages.journey.capes },
  { label: "Kapitel 2 - Styrke", src: siteImages.journey.strength },
  { label: "Kapitel 3 - Ofre", src: siteImages.journey.carry },
  { label: "Kapitel 4 - Hjemmet", src: siteImages.journey.home },
  { label: "Kapitel 5 - Familie", src: siteImages.journey.together },
  { label: "Kapitel 6 - Taknemmelighed", src: siteImages.journey.loved },
  { label: "Amal", src: siteImages.family.amal },
  { label: "Siham", src: siteImages.family.siham },
  { label: "Mohammed", src: siteImages.family.mohammed },
  { label: "Jihan", src: siteImages.family.jihan },
  { label: "Ihan", src: siteImages.family.ihan },
  { label: "Zakariya", src: siteImages.family.zakariya },
  ...siteImages.gallery.map((src, index) => ({ label: `Galleri ${index + 1}`, src })),
];

function keyFromSrc(src: string) {
  return src.replace(/^\/api\/images\//, "");
}

export function ImageManager() {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Record<string, UploadState>>({});
  const [message, setMessage] = useState("");

  const hasDoneUpload = useMemo(() => Object.values(status).includes("done"), [status]);

  const uploadImage = (slot: Slot) => async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setMessage("");
    setStatus((prev) => ({ ...prev, [slot.src]: "uploading" }));

    try {
      const response = await fetch(`/api/images/${keyFromSrc(slot.src)}`, {
        method: "PUT",
        headers: {
          "content-type": file.type,
          ...(password ? { "x-upload-password": password } : {}),
        },
        body: file,
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") ?? "";
        const body = contentType.includes("application/json")
          ? ((await response.json().catch(() => null)) as { error?: string } | null)
          : null;
        throw new Error(body?.error ?? `Upload fejlede (${response.status})`);
      }

      setStatus((prev) => ({ ...prev, [slot.src]: "done" }));
      setMessage("Billedet er uploadet. Genindlæs siden for at se det alle steder.");
    } catch (error) {
      setStatus((prev) => ({ ...prev, [slot.src]: "error" }));
      setMessage(error instanceof Error ? error.message : "Upload fejlede");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-background/80 text-gold shadow-deep backdrop-blur-xl transition hover:border-gold"
        aria-label="Upload billeder"
        title="Upload billeder"
      >
        <ImagePlus className="h-5 w-5" strokeWidth={1.6} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] bg-background/80 p-4 backdrop-blur-xl sm:p-6">
          <div className="mx-auto flex max-h-[calc(100svh-2rem)] max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-deep sm:max-h-[calc(100svh-3rem)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div>
                <h2 className="font-display text-2xl italic text-warm">Upload billeder</h2>
                <p className="text-xs text-muted-foreground">Vælg den plads billedet skal vises på.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-gold"
                aria-label="Luk"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="border-b border-border px-4 py-3">
              <label className="block text-xs uppercase tracking-widest text-gold/80" htmlFor="upload-password">
                Upload kode
              </label>
              <input
                id="upload-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Påkrævet for upload"
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-warm outline-none ring-gold/40 placeholder:text-muted-foreground focus:ring-2"
              />
            </div>

            <div className="overflow-y-auto p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {slots.map((slot) => {
                  const slotStatus = status[slot.src] ?? "idle";
                  return (
                    <label
                      key={slot.src}
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-border bg-background/40 px-3 py-3 transition hover:border-gold/50"
                    >
                      <span>
                        <span className="block text-sm text-warm">{slot.label}</span>
                        <span className="block text-[11px] text-muted-foreground">{keyFromSrc(slot.src)}</span>
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-gold">
                        {slotStatus === "uploading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={uploadImage(slot)} />
                    </label>
                  );
                })}
              </div>
            </div>

            {(message || hasDoneUpload) && (
              <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{message}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
