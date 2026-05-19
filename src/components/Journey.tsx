import { motion } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";
import { Upload } from "lucide-react";

const chapters = [
  {
    key: "capes",
    eyebrow: { da: "Kærlighed", ar: "المحبة" },
    da: "Nogle helte bærer ikke kapper — de kalder sig bare far.",
    ar: "بعض الأبطال ما كيلبسوش الكاب — كيتسماو غير بّا.",
  },
  {
    key: "strength",
    eyebrow: { da: "Styrke", ar: "القوة" },
    da: "Du lærte os styrke uden at hæve stemmen.",
    ar: "علمتينا القوة بلا ما ترفع صوتك.",
  },
  {
    key: "carry",
    eyebrow: { da: "Ofre", ar: "التضحيات" },
    da: "Vi forstod først senere, hvor meget du bar for os.",
    ar: "غير من بعد فهمنا شحال حملتي علينا.",
  },
  {
    key: "home",
    eyebrow: { da: "Hjemmet", ar: "الدار" },
    da: "Dit hjerte byggede det hjem, vi stadig vender tilbage til.",
    ar: "قلبك هو اللي بنا الدار اللي مازال كنرجعو ليها.",
  },
  {
    key: "together",
    eyebrow: { da: "Familie", ar: "العائلة" },
    da: "Du holdt sammen på familien, selv når livet blev svært.",
    ar: "شدّيتي العائلة، حتى ملي الحياة ولات صعيبة.",
  },
  {
    key: "loved",
    eyebrow: { da: "Taknemmelighed", ar: "الامتنان" },
    da: "Vi blev aldrig i tvivl om, at vi var elsket.",
    ar: "عمرنا ما شكّينا بلي كنّا محبوبين.",
  },
] as const;

function ChapterCard({ idx, chapter }: { idx: number; chapter: (typeof chapters)[number] }) {
  const { lang } = useI18n();
  const [img, setImg] = useState<string | null>(null);
  const isLeft = idx % 2 === 0;

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setImg(URL.createObjectURL(f));
  };

  const eyebrow = lang === "ar" ? chapter.eyebrow.ar : chapter.eyebrow.da;
  const quote = lang === "ar" ? chapter.ar : chapter.da;

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
        <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
      </label>

      <div className="[direction:ltr]">
        <div className={`text-[10px] uppercase tracking-[0.4em] text-gold/80 ${lang === "ar" ? "font-arabic tracking-normal text-sm" : ""}`}>
          {eyebrow}
        </div>
        <h3 className={`mt-4 text-3xl leading-snug sm:text-4xl ${lang === "ar" ? "font-arabic font-medium" : "font-display font-light italic"}`}>
          <span className="gradient-gold-text">“{quote}”</span>
        </h3>
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
