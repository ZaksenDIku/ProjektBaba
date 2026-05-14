import { motion, AnimatePresence } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";
import { Upload, X } from "lucide-react";

interface Item {
  id: number;
  src: string;
  caption_da: string;
  caption_ar: string;
  span: string;
}

const initial: Item[] = [
  { id: 1, src: "", caption_da: "", caption_ar: "", span: "row-span-2" },
  { id: 2, src: "", caption_da: "", caption_ar: "", span: "" },
  { id: 3, src: "", caption_da: "", caption_ar: "", span: "" },
  { id: 4, src: "", caption_da: "", caption_ar: "", span: "row-span-2" },
  { id: 5, src: "", caption_da: "", caption_ar: "", span: "" },
  { id: 6, src: "", caption_da: "", caption_ar: "", span: "" },
  { id: 7, src: "", caption_da: "", caption_ar: "", span: "row-span-2" },
  { id: 8, src: "", caption_da: "", caption_ar: "", span: "" },
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

  return (
    <section id="gallery" className="relative px-6 py-32">
      <SectionTitle eyebrow="04" title={t("gallery.title")} sub={t("gallery.sub")} />

      <div className="mx-auto grid max-w-6xl auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 md:grid-cols-4">
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
                  <img src={it.src} alt="" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
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
