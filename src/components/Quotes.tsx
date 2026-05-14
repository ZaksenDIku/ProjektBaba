import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

const quotes: { da: string; ar: string }[] = [
  { da: "Tak fordi du altid var der.", ar: "شكرا حيت دايما كنتي حدانا." },
  { da: "Du er familiens styrke.", ar: "نتا السند ديالنا." },
  { da: "Din kærlighed lyser stadig vejen.", ar: "محبتك بقات كتنور الطريق." },
  { da: "Må Gud beskytte dig, far.", ar: "الله يخليك لينا يا بابا." },
  { da: "Hvert ord du sagde, blev til et fyrtårn.", ar: "كل كلمة قلتيها ولات منارة." },
];

export function Quotes() {
  const { t, lang } = useI18n();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % quotes.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="quotes" className="relative overflow-hidden px-6 py-32">
      <div className="absolute inset-0 arabic-pattern opacity-40" />
      <div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.14 82 / 0.18), transparent 70%)" }}
      />
      <div className="relative">
        <SectionTitle eyebrow="03" title={t("quotes.title")} />

        <div className="relative mx-auto flex h-64 max-w-3xl items-center justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute text-center"
            >
              <span className="block text-6xl text-gold/40 font-display">"</span>
              <p
                className={`mt-2 text-2xl leading-relaxed sm:text-3xl md:text-4xl ${
                  lang === "ar" ? "font-arabic font-medium" : "font-display italic font-light"
                }`}
              >
                <span className="gradient-gold-text">{quotes[i][lang]}</span>
              </p>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2 bg-border"}`}
              aria-label={`Quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
