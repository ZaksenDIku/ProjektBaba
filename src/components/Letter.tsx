import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Particles } from "./Particles";
import { Music, VolumeX } from "lucide-react";

export function Letter() {
  const { t, lang } = useI18n();
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      // Soft ambient — silent fallback if missing
      const a = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-145038.mp3",
      );
      a.loop = true;
      a.volume = 0.35;
      audioRef.current = a;
    }
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <section id="letter" className="relative min-h-screen overflow-hidden px-6 py-32">
      <div className="absolute inset-0 arabic-pattern opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.82 0.14 82 / 0.12), transparent 70%)",
        }}
      />
      <Particles count={40} />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-6 text-xs uppercase tracking-[0.5em] text-gold/70"
        >
          ✦ Finale ✦
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className={`text-4xl leading-tight sm:text-6xl ${lang === "ar" ? "font-arabic font-medium" : "font-display font-light italic"}`}
        >
          <span className="gradient-gold-text">{t("letter.title")}</span>
        </motion.h2>

        <div className="mx-auto my-10 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className={`whitespace-pre-line text-lg leading-loose text-warm/90 sm:text-xl ${
            lang === "ar" ? "font-arabic text-2xl leading-[2.2]" : "font-display italic"
          }`}
        >
          {t("letter.body")}
        </motion.div>

        <motion.button
          onClick={toggle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          whileHover={{ scale: 1.03 }}
          className="mt-14 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-background/40 px-6 py-3 text-sm uppercase tracking-[0.25em] text-gold backdrop-blur-xl transition-colors hover:bg-gold/10"
        >
          {playing ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
          <span className={lang === "ar" ? "font-arabic tracking-normal text-base" : ""}>
            {playing ? t("letter.music.off") : t("letter.music")}
          </span>
        </motion.button>

        <div className="mt-20 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          {t("footer.made")} ♡
        </div>
      </div>
    </section>
  );
}
