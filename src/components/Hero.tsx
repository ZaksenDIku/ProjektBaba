import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import father from "@/assets/father-hero.jpg";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Glowing background */}
      <div className="absolute inset-0 arabic-pattern opacity-60" />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full animate-glow"
        style={{
          background: "radial-gradient(circle, oklch(0.82 0.14 82 / 0.35), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 gradient-veil" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale }}
          className="relative mb-10"
        >
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-[oklch(0.88_0.09_85)]/40 to-transparent blur-2xl" />
          <div className="relative h-44 w-44 overflow-hidden rounded-full border border-[oklch(0.82_0.14_82_/_0.4)] ring-gold sm:h-56 sm:w-56">
            <img src={father} alt="" className="h-full w-full object-cover" width={1536} height={1536} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="shimmer-line h-px w-24 bg-clip-text"
        />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-8 max-w-4xl text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-8xl ${
            lang === "ar" ? "font-arabic font-medium" : "font-display font-light italic"
          }`}
        >
          <span className="gradient-gold-text">{t("hero.title")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.45em] text-gold/70">— Yahya Berrhili —</span>
        </motion.div>

        {/* Quran verse */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 max-w-2xl rounded-2xl border border-gold/20 bg-background/30 px-6 py-7 backdrop-blur-xl sm:px-10"
        >
          <p dir="rtl" className="font-arabic text-2xl leading-[2.1] text-warm sm:text-3xl">
            {t("hero.verse.ar")}
          </p>
          <div className="mx-auto my-5 h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          <p
            className={`text-sm italic leading-relaxed text-muted-foreground sm:text-base ${
              lang === "ar" ? "font-arabic not-italic text-base" : "font-display"
            }`}
          >
            {t("hero.verse.da")}
          </p>
          <figcaption className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gold/70">
            {t("hero.verse.ref")}
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            {t("hero.scroll")} ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
