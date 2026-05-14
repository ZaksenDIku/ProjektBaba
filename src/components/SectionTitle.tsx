import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

export function SectionTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  const { lang } = useI18n();
  return (
    <div className="mx-auto mb-16 max-w-2xl text-center">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-xs uppercase tracking-[0.4em] text-gold/80"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`text-4xl leading-tight sm:text-5xl md:text-6xl ${
          lang === "ar" ? "font-arabic font-medium" : "font-display font-light italic"
        }`}
      >
        <span className="gradient-gold-text">{title}</span>
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className={`mt-5 text-muted-foreground ${lang === "ar" ? "font-arabic text-lg" : ""}`}
        >
          {sub}
        </motion.p>
      )}
      <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-[oklch(0.82_0.14_82)] to-transparent" />
    </div>
  );
}
