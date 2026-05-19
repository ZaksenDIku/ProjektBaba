import { motion } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useI18n, dict } from "@/lib/i18n";
import { siteImages } from "@/lib/site-images";
import { SectionTitle } from "./SectionTitle";
import { Upload } from "lucide-react";
import fatherFallback from "@/assets/father-hero.jpg";

const children = [
  { key: "amal", age: 43 },
  { key: "siham", age: 40 },
  { key: "mohammed", age: 36 },
  { key: "jihan", age: 31 },
  { key: "ihan", age: 28 },
  { key: "zakariya", age: 26 },
] as const;

function FatherCard() {
  const { t, lang } = useI18n();
  const [father, setFather] = useState(siteImages.father);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 text-center"
    >
      <div className="relative h-40 w-40 overflow-hidden rounded-full border border-gold/60 ring-gold sm:h-48 sm:w-48">
        <img
          src={father}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFather(fatherFallback)}
        />
      </div>
      <div className={`text-lg italic text-gold sm:text-xl ${lang === "ar" ? "font-arabic not-italic font-medium" : "font-display"}`}>
        {t("hero.name")}
      </div>
      <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{t("family.father")}</div>
    </motion.div>
  );
}

function ChildCard({ child, idx }: { child: (typeof children)[number]; idx: number }) {
  const { t, lang } = useI18n();
  const defaultImg = siteImages.family[child.key];
  const [img, setImg] = useState<string | null>(defaultImg);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setImg(URL.createObjectURL(f));
  };

  const nameKey = `child.${child.key}.name` as keyof typeof dict;
  const descKey = `child.${child.key}.d` as keyof typeof dict;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/40 p-5 text-center backdrop-blur-sm transition-colors hover:border-gold/40"
    >
      <label className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border border-border sm:h-32 sm:w-32">
        {img ? (
          <img
            src={img}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => {
              if (img === defaultImg) setImg(null);
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-card text-muted-foreground transition-colors group-hover:text-gold">
            <Upload className="h-5 w-5" strokeWidth={1.2} />
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
      </label>

      <div className="flex items-baseline gap-2">
        <span className={`text-lg ${lang === "ar" ? "font-arabic font-medium text-warm" : "font-display italic text-warm"}`}>
          {t(nameKey)}
        </span>
        <span className="text-xs text-gold/80">
          {child.age} {t("family.years")}
        </span>
      </div>

      <p className={`text-xs leading-relaxed text-muted-foreground ${lang === "ar" ? "font-arabic text-sm" : "italic"}`}>
        “{t(descKey)}”
      </p>
    </motion.div>
  );
}

export function FamilyTree() {
  const { t } = useI18n();

  return (
    <section id="family" className="relative px-6 py-32">
      <SectionTitle eyebrow="02" title={t("family.title")} sub={t("family.sub")} />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center">
          <FatherCard />
        </div>

        <div className="relative mt-12">
          <svg
            className="pointer-events-none absolute inset-x-0 -top-12 mx-auto hidden h-24 w-full max-w-5xl md:block"
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((c, i) => (
              <ChildCard key={c.key} child={c} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
