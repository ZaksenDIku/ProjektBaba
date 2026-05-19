import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionTitle } from "./SectionTitle";

const quotes: { da: string; ar: string }[] = [
  { da: "En far for mange — men for os var du hele verden.", ar: "بّا لبزاف — ولكن لينا حنا كنتي الدنيا كاملة." },
  { da: "Vi så ikke alt det du ofrede dengang. Det gør vi nu.", ar: "ما شفناش كل اللي ضحّيتي بيه دوك الوقت. دابا كنشوفوه." },
  { da: "Du gav os et hjem fyldt med kærlighed, selv på de svære dage.", ar: "عطيتنا دار عامرة بالمحبة، حتى فالنهارات الصعيبة." },
  { da: "Din styrke blev fundamentet for vores liv.", ar: "قوتك ولات الأساس ديال حياتنا." },
  { da: "Du var aldrig bare far — du var tryghed.", ar: "عمرك ما كنتي غير بّا — كنتي الأمان." },
  { da: "En mand med rolige hænder og et stort hjerte.", ar: "راجل بيدين هادية وقلب كبير." },
  { da: "Du lærte os at stå stærkt uden at miste vores godhed.", ar: "علمتينا نوقفو بقوة بلا ما نتلفو طيبتنا." },
  { da: "Din kærlighed lå i handlingerne, ikke i de store ord.", ar: "محبتك كانت فالأفعال، ماشي فالكلام الكبير." },
  { da: "Du har båret mere for familien, end vi nogensinde helt kommer til at forstå.", ar: "حملتي على العائلة أكثر من ما غادي نفهموه يوما." },
  { da: "Bag vores smil findes der altid lidt af dig.", ar: "ورا ضحكتنا دايما كاينة شوية منك." },
  { da: "Du gjorde plads til alle os børn i dit hjerte.", ar: "دّيرتي بلاصة لينا كاملين فقلبك." },
  { da: "Dit nærvær gjorde selv de almindelige dage specielle.", ar: "حضورك خلّى حتى النهارات العادية مميزة." },
  { da: "Du gav os styrke, når livet blev tungt.", ar: "عطيتنا القوة ملي الحياة ولات ثقيلة." },
  { da: "For verden er du én mand — for os er du fundamentet.", ar: "للدنيا نتا راجل واحد — لينا حنا نتا الأساس." },
  { da: "En fars kærlighed ses tydeligst i de børn, han har opdraget.", ar: "محبة الباب كتبان واضحة فالأولاد اللي ربّا." },
  { da: "Du byggede ikke bare en familie — du holdt den sammen.", ar: "ما بنيتيش غير عائلة — شدّيتيها بيدّيك." },
  { da: "Manden der lærte os, at ansvar også er kærlighed.", ar: "الراجل اللي علمنا بلي المسؤولية هي تاني محبة." },
  { da: "Du var der for os i største bekymringer, første ofre og største kærlighed.", ar: "كنتي معانا فأكبر الهموم، أول التضحيات وأكبر محبة." },
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
