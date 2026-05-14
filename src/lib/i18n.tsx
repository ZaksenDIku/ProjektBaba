import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "da" | "ar";

type Dict = Record<string, { da: string; ar: string }>;

export const dict: Dict = {
  "nav.journey": { da: "Rejsen", ar: "الرحلة" },
  "nav.family": { da: "Familie", ar: "العائلة" },
  "nav.quotes": { da: "Ord", ar: "كلمات" },
  "nav.gallery": { da: "Minder", ar: "ذكريات" },
  "nav.letter": { da: "Brevet", ar: "الرسالة" },

  "hero.title": { da: "Til verdens bedste far", ar: "إلى أعز أب فالدنيا" },
  "hero.sub": {
    da: "En lille rejse gennem et stort liv — fyldt med kærlighed, ofre og minder vi aldrig glemmer.",
    ar: "رحلة صغيرة فحياة كبيرة — عامرة بالحب والتضحية وذكريات ما كنغلسوهاش.",
  },
  "hero.scroll": { da: "Rul ned", ar: "كمل لتحت" },

  "journey.title": { da: "Et liv i kapitler", ar: "حياة فالفصول" },
  "journey.sub": { da: "Fra en ung drøm til familiens hjerte.", ar: "من حلم صغير حتى قلب العائلة." },
  "journey.youth.t": { da: "Ungdom", ar: "الشبيبة" },
  "journey.youth.d": { da: "Drømmene begyndte tidligt — en ung mand med et stort hjerte.", ar: "الأحلام بداو بكري — شاب بقلب كبير." },
  "journey.father.t": { da: "Bliver far", ar: "أصبح أب" },
  "journey.father.d": { da: "Den dag livet fik en ny mening.", ar: "النهار اللي الحياة تبدلات معناها." },
  "journey.family.t": { da: "Familielivet", ar: "الحياة العائلية" },
  "journey.family.d": { da: "Et hjem bygget på kærlighed, latter og varme måltider.", ar: "دار مبنية على المحبة، الضحك والماكلة سخونة." },
  "journey.sacrifice.t": { da: "Ofrene", ar: "التضحيات" },
  "journey.sacrifice.d": { da: "Du gav alt, så vi kunne få verden.", ar: "عطيتي كلشي باش حنا نلقاو الدنيا." },
  "journey.memories.t": { da: "Minderne", ar: "الذكريات" },
  "journey.memories.d": { da: "Små øjeblikke der blev til evighed.", ar: "لحظات صغار ولاو دائمين فقلوبنا." },
  "journey.joy.t": { da: "Glæden", ar: "الفرحة" },
  "journey.joy.d": { da: "At se dig le er familiens største skat.", ar: "كنشوفوك كتضحك هي أحلى كنز." },

  "family.title": { da: "Familietræet", ar: "شجرة العائلة" },
  "family.sub": { da: "Roden vi alle vokser fra.", ar: "العرق اللي حنا كلنا كنطلعو منه." },
  "family.father": { da: "Far", ar: "بابا" },
  "family.child": { da: "Barn", ar: "ولد" },
  "family.quote": { da: "Et lille citat…", ar: "كلمة صغيرة…" },

  "quotes.title": { da: "Ord fra hjertet", ar: "كلمات من القلب" },

  "gallery.title": { da: "Minder", ar: "ذكريات" },
  "gallery.sub": { da: "Øjeblikke fanget i tid.", ar: "لحظات مشدودة فالوقت." },

  "letter.title": { da: "Et brev til dig, far", ar: "رسالة ليك يا بابا" },
  "letter.body": {
    da: "Kære far,\n\nDu lærte os, hvad det vil sige at elske uden betingelser. Du var vores første helt, vores stille styrke, vores trygge havn. Hver dag bærer vi din kærlighed videre — i vores grin, i vores valg, i vores hjerter.\n\nTak fordi du er dig.\n\nVi elsker dig højere, end ord nogensinde kan sige.",
    ar: "بابا الغالي،\n\nعلمتينا شنو معناها الحب بلا شروط. كنتي العروة لينا، السند ديالنا، والمرسى الآمن. كل نهار كنحملو حبك معانا — فضحكتنا، فاختياراتنا، فقلوبنا.\n\nشكرا حيت نتا هو نتا.\n\nكنبغيوك بزاف، أكثر من ما تقدر تقولو الكلمات.",
  },
  "letter.music": { da: "Spil musik", ar: "شغل الموسيقى" },
  "letter.music.off": { da: "Stop musik", ar: "وقف الموسيقى" },

  "footer.made": { da: "Lavet med kærlighed", ar: "مصنوع بالحب" },
};

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: keyof typeof dict) => string;
  dir: "ltr" | "rtl";
}

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("da");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("lang") as Lang | null;
    if (saved === "da" || saved === "ar") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("lang", l);
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const t = (k: keyof typeof dict) => dict[k]?.[lang] ?? String(k);

  return <I18nCtx.Provider value={{ lang, setLang, t, dir }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
}
