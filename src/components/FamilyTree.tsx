import { motion } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";
import { Upload } from "lucide-react";
import father from "@/assets/father-hero.jpg";

function MemberCard({ idx, isFather = false }: { idx: number; isFather?: boolean }) {
  const { t, lang } = useI18n();
  const [img, setImg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setImg(URL.createObjectURL(f));
  };

  const size = isFather ? "h-40 w-40 sm:h-48 sm:w-48" : "h-24 w-24 sm:h-28 sm:w-28";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 text-center"
    >
      <label className={`group relative cursor-pointer overflow-hidden rounded-full border ${isFather ? "border-gold/60 ring-gold" : "border-border"} ${size}`}>
        {img || isFather ? (
          <img src={img ?? father} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-card text-muted-foreground transition-colors group-hover:text-gold">
            <Upload className="h-5 w-5" strokeWidth={1.2} />
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
      </label>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={isFather ? t("family.father") : t("family.child")}
        className={`w-32 bg-transparent text-center text-sm outline-none placeholder:text-muted-foreground/60 sm:w-40 ${
          isFather ? "text-lg font-display italic text-gold sm:text-xl" : "text-warm"
        } ${lang === "ar" ? "font-arabic text-base" : ""}`}
      />
      {!isFather && (
        <input
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder={t("family.quote")}
          className={`w-32 bg-transparent text-center text-xs italic outline-none text-muted-foreground placeholder:text-muted-foreground/40 sm:w-40 ${
            lang === "ar" ? "font-arabic not-italic text-sm" : ""
          }`}
        />
      )}
    </motion.div>
  );
}

export function FamilyTree() {
  const { t } = useI18n();
  const children = Array.from({ length: 6 });

  return (
    <section id="family" className="relative px-6 py-32">
      <SectionTitle eyebrow="02" title={t("family.title")} sub={t("family.sub")} />

      <div className="relative mx-auto max-w-5xl">
        {/* Father at top */}
        <div className="flex flex-col items-center">
          <MemberCard idx={0} isFather />
        </div>

        {/* Connection lines (SVG) */}
        <div className="relative mt-12">
          <svg
            className="pointer-events-none absolute inset-x-0 -top-12 mx-auto hidden h-24 w-full max-w-4xl md:block"
            viewBox="0 0 800 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.14 82)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="oklch(0.82 0.14 82)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M400 0 L400 50 L66 50 L66 100 M400 50 L200 50 L200 100 M400 50 L333 50 L333 100 M400 50 L466 50 L466 100 M400 50 L600 50 L600 100 M400 50 L733 50 L733 100"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="1"
            />
          </svg>

          {/* Children grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
            {children.map((_, i) => (
              <MemberCard key={i} idx={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
