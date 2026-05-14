import { motion } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";
import { Upload } from "lucide-react";

const chapters = [
  { key: "youth", year: "1960s" },
  { key: "father", year: "1985" },
  { key: "family", year: "1990s" },
  { key: "sacrifice", year: "2000s" },
  { key: "memories", year: "2010s" },
  { key: "joy", year: "Today" },
] as const;

function ChapterCard({ idx, chapter }: { idx: number; chapter: (typeof chapters)[number] }) {
  const { t, lang } = useI18n();
  const [img, setImg] = useState<string | null>(null);
  const isLeft = idx % 2 === 0;

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setImg(URL.createObjectURL(f));
  };

  const titleKey = `journey.${chapter.key}.t` as const;
  const descKey = `journey.${chapter.key}.d` as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${
        isLeft ? "" : "md:[direction:rtl]"
      }`}
    >
      {/* Image */}
      <label className="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-border bg-card [direction:ltr]">
        {img ? (
          <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground transition-colors group-hover:text-gold">
            <Upload className="h-7 w-7" strokeWidth={1.2} />
            <span className="text-xs uppercase tracking-widest">Upload</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
        <div className="absolute left-4 top-4 rounded-full border border-gold/40 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
          {chapter.year}
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
      </label>

      {/* Text */}
      <div className="[direction:ltr]">
        <h3 className={`text-3xl ${lang === "ar" ? "font-arabic font-medium" : "font-display font-light italic"}`}>
          <span className="gradient-gold-text">{t(titleKey as Parameters<typeof t>[0])}</span>
        </h3>
        <p className={`mt-4 text-muted-foreground leading-relaxed ${lang === "ar" ? "font-arabic text-lg" : ""}`}>
          {t(descKey as Parameters<typeof t>[0])}
        </p>
      </div>
    </motion.div>
  );
}

export function Journey() {
  const { t } = useI18n();
  return (
    <section id="journey" className="relative px-6 py-32">
      <SectionTitle eyebrow="01" title={t("journey.title")} sub={t("journey.sub")} />
      <div className="relative mx-auto max-w-5xl">
        {/* Center vertical line */}
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent md:block" />
        <div className="space-y-24">
          {chapters.map((c, i) => (
            <ChapterCard key={c.key} idx={i} chapter={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

// satisfy unused import in some configs
export type _L = Lang;
