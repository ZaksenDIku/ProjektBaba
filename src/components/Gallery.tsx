import { motion, AnimatePresence } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";
import { SectionTitle } from "./SectionTitle";
import { Upload, X, MapPin } from "lucide-react";

interface Item {
  id: number;
  src: string;
  caption_da: string;
  caption_ar: string;
  span: string;
}

const initial: Item[] = [
  { id: 1, src: siteImages.gallery[0], caption_da: "", caption_ar: "", span: "row-span-2" },
  { id: 2, src: siteImages.gallery[1], caption_da: "", caption_ar: "", span: "" },
  { id: 3, src: siteImages.gallery[2], caption_da: "", caption_ar: "", span: "" },
  { id: 4, src: siteImages.gallery[3], caption_da: "", caption_ar: "", span: "row-span-2" },
  { id: 5, src: siteImages.gallery[4], caption_da: "", caption_ar: "", span: "" },
  { id: 6, src: siteImages.gallery[5], caption_da: "", caption_ar: "", span: "" },
];

export function Gallery() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState<Item | null>(null);

  const onUpload = (id: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, src: url } : it)));
  };

  const updateCaption = (id: number, key: "caption_da" | "caption_ar", val: string) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: val } : it)));

  const maps = [
    {
      label: t("gallery.map.label"),
      title: "Oujda, Morocco",
      src: "https://www.openstreetmap.org/export/embed.html?bbox=-1.95%2C34.65%2C-1.85%2C34.72&layer=mapnik&marker=34.6814%2C-1.9086",
    },
    {
      label: t("gallery.map.copenhagen"),
      title: "Copenhagen, Denmark",
      src: "https://www.openstreetmap.org/export/embed.html?bbox=12.48%2C55.63%2C12.66%2C55.72&layer=mapnik&marker=55.6761%2C12.5683",
    },
  ];

  return (
    <section id="gallery" className="relative px-6 py-32">
      <SectionTitle eyebrow="04" title={t("gallery.title")} sub={t("gallery.sub")} />

      {/* Origin maps */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-16 grid max-w-5xl gap-4 md:grid-cols-2"
      >
        {maps.map((map) => (
          <div key={map.title} className="relative overflow-hidden rounded-2xl border border-gold/30 bg-card shadow-deep">
            <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-gold/40 bg-background/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur-xl">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span className={lang === "ar" ? "font-arabic tracking-normal text-sm" : ""}>{map.label}</span>
            </div>
            <iframe
              title={map.title}
              src={map.src}
              className="h-[320px] w-full grayscale-[0.4] sm:h-[420px]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        ))}
      </motion.div>

      <div className="mx-auto grid max-w-6xl auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-xl border border-border bg-card ${it.span}`}
          >
            {it.src ? (
              <>
                <button onClick={() => setOpen(it)} className="block h-full w-full">
                  <img
                    src={it.src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={() => {
                      if (siteImages.gallery.includes(it.src as (typeof siteImages.gallery)[number])) {
                        setItems((prev) => prev.map((item) => (item.id === it.id ? { ...item, src: "" } : item)));
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
                <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <input
                    value={lang === "da" ? it.caption_da : it.caption_ar}
                    onChange={(e) => updateCaption(it.id, lang === "da" ? "caption_da" : "caption_ar", e.target.value)}
                    placeholder={lang === "da" ? "Tilføj billedtekst..." : "زيد تعليق..."}
                    className={`w-full bg-transparent text-xs text-warm outline-none placeholder:text-muted-foreground/60 ${lang === "ar" ? "font-arabic text-sm text-right" : ""}`}
                  />
                </div>
              </>
            ) : (
              <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-gold">
                <Upload className="h-5 w-5" strokeWidth={1.2} />
                <span className="text-[10px] uppercase tracking-widest">Upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={onUpload(it.id)} />
              </label>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-6 backdrop-blur-xl"
          >
            <motion.button
              onClick={() => setOpen(null)}
              className="absolute right-6 top-6 rounded-full border border-border bg-card/80 p-2 text-warm hover:text-gold"
              whileHover={{ scale: 1.05 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={open.src}
              alt=""
              className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-deep"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
