import { useI18n } from "@/lib/i18n";
import { motion } from "motion/react";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-border bg-background/60 p-1 backdrop-blur-xl">
      {(["da", "ar"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="relative px-4 py-1.5 text-xs font-medium uppercase tracking-widest"
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[oklch(0.88_0.09_85)] to-[oklch(0.62_0.13_70)]"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className={`relative ${lang === l ? "text-primary-foreground" : "text-muted-foreground"}`}>
            {l === "da" ? "DA" : "ع"}
          </span>
        </button>
      ))}
    </div>
  );
}
