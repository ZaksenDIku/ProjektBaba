import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "da" | "ar";

type Dict = Record<string, { da: string; ar: string }>;

export const dict: Dict = {
  "nav.journey": { da: "Kapitler", ar: "الفصول" },
  "nav.family": { da: "Børnene", ar: "الأولاد" },
  "nav.quotes": { da: "Ord", ar: "كلمات" },
  "nav.gallery": { da: "Oprindelsen", ar: "البداية" },
  "nav.letter": { da: "Brevet", ar: "الرسالة" },

  "hero.title": { da: "Til verdens bedste far", ar: "إلى أعز أب فالدنيا" },
  "hero.name": { da: "Yahya Berrhili", ar: "يحيى برحيلي" },
  "hero.verse.ref": { da: "Surah An-Nisa 4:36", ar: "سورة النساء ٤:٣٦" },
  "hero.verse.ar": {
    da: "وَٱعْبُدُوا۟ ٱللَّهَ وَلَا تُشْرِكُوا۟ بِهِۦ شَيْـًٔا ۖ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا",
    ar: "وَٱعْبُدُوا۟ ٱللَّهَ وَلَا تُشْرِكُوا۟ بِهِۦ شَيْـًٔا ۖ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا",
  },
  "hero.verse.da": {
    da: "“Tilbed Allah og sæt ingen ved Hans side, og vær gode mod forældre…”",
    ar: "“اعبدوا الله ولا تشركوا به شيئا، وأحسنوا للوالدين…”",
  },
  "hero.scroll": { da: "Rul ned", ar: "كمل لتحت" },

  "journey.title": { da: "Gennem alle vores kapitler", ar: "عبر جميع فصولنا" },
  "journey.sub": {
    da: "Du har været der for alle dine børn — gennem alle deres kapitler.",
    ar: "كنتي حدا ولادك كاملين — فكل فصول حياتهم.",
  },

  "family.title": { da: "Børnene", ar: "الأولاد" },
  "family.sub": { da: "Seks hjerter formet af én far.", ar: "ستة قلوب صاوبهم بّا واحد." },
  "family.father": { da: "Far", ar: "بابا" },
  "family.years": { da: "år", ar: "عام" },

  "child.amal.name": { da: "Amal", ar: "أمل" },
  "child.amal.d": {
    da: "Personen der gjorde dig til far første gang, hvis opdragelse og gode maner har banet vej for alle os andre.",
    ar: "هي اللي ولاتك بّا أول مرة، تربيتها وأخلاقها فتحات الطريق لينا كاملين.",
  },
  "child.siham.name": { da: "Siham", ar: "سهام" },
  "child.siham.d": {
    da: "Din store datter, der lærte kærlighed, styrke og omsorg gennem dig.",
    ar: "بنتك الكبيرة، اللي تعلمات الحب والقوة والحنان منك.",
  },
  "child.mohammed.name": { da: "Mohammed", ar: "محمد" },
  "child.mohammed.d": {
    da: "Ældste søn der lærte og altid fandt tryghed i din stemme, så han kunne være en tryghed for andre.",
    ar: "الولد الكبير اللي دايما لقا الأمان فصوتك، حتى ولا هو الأمان لغيرو.",
  },
  "child.jihan.name": { da: "Jihan", ar: "جيهان" },
  "child.jihan.d": { da: "En datter som stadig bærer dine råd med sig hver eneste dag.", ar: "بنت باقا كتحمل نصائحك معاها كل نهار." },
  "child.ihan.name": { da: "Ihan", ar: "إيهان" },
  "child.ihan.d": { da: "Din yngste datter, du lærte respekt uden nogensinde at kræve frygt.", ar: "بنتك الصغيرة، علمتيها الاحترام بلا ما تطلب منها الخوف." },
  "child.zakariya.name": { da: "Zakariya", ar: "زكرياء" },
  "child.zakariya.d": {
    da: "Din yngste søn, der stadig ser op til dig med samme beundring som da han var lille.",
    ar: "ولدك الصغير، باقي كيشوف ليك بنفس الإعجاب بحال ملي كان صغير.",
  },

  "quotes.title": { da: "Ord fra hjertet", ar: "كلمات من القلب" },

  "gallery.title": { da: "Hvor det hele startede", ar: "من فين بدا كلشي" },
  "gallery.sub": {
    da: "Manden der startede med intet, men gav det hele til sine børn.",
    ar: "الراجل اللي بدا بلا والو، وعطا كلشي لولادو.",
  },
  "gallery.map.label": { da: "Oujda · Marokko", ar: "وجدة · المغرب" },
  "gallery.map.copenhagen": { da: "København · Danmark", ar: "كوبنهاغن · الدنمارك" },

  "letter.title": { da: "Et brev til dig, far", ar: "رسالة ليك يا بابا" },
  "letter.body": {
    da: "Kære far,\n\nDet er svært at sætte ord på et helt livs kærlighed.\n\nDu har været der i alle vores kapitler — i de gode dage, de svære dage og alle de stille øjeblikke imellem. Du har båret familien med styrke, tålmodighed og et hjerte, der altid satte os før dig selv.\n\nSom børn så vi dig bare som far.\nMen jo ældre vi bliver, jo mere forstår vi alt det, du gjorde for os. Alle ofrene. Alle bekymringerne. Alt det ansvar du bar uden nogensinde at klage.\n\nDu gav os tryghed, selv når livet ikke var nemt.\nDu lærte os respekt, kærlighed og hvad det vil sige at være der for dem man elsker.\n\nMåske har vi ikke altid sagt det nok.\nMen alt det gode i os kommer et sted fra.\n\nFra dig.\n\nOg selv når tiden går, og vi alle lever vores egne liv, vil en del af os altid være de børn, der fandt ro i din tilstedeværelse.\n\nTak for hver eneste ting du har gjort for os.\nTak for dit hjerte.\nTak fordi du er vores far.\n\nVi elsker dig mere, end ord nogensinde vil kunne beskrive.\n\n— Dine børn",
    ar: "بابا الغالي،\n\nصعيب نلقاو الكلمات باش نوصفو حب عمر كامل.\n\nكنتي معانا فكل فصول حياتنا — فالنهارات الزوينة، والصعيبة، وكل اللحظات الهادية بيناتهم. حملتي العائلة بالقوة، والصبر، وقلب دايما كيحطنا قبل راسك.\n\nملي كنا صغار شفناك بحال غير بابا.\nولكن كيف ما كنكبرو، كنفهمو أكثر كلشي اللي درتي علينا. كل التضحيات. كل الهموم. كل المسؤولية اللي حملتي بلا ما تشكي.\n\nعطيتنا الأمان، حتى ملي الحياة ماكانتش ساهلة.\nعلمتينا الاحترام، المحبة، وشنو معناها تكون حدا اللي كتبغي.\n\nيمكن ماقلناهاش ليك بزاف.\nولكن كلشي زوين فينا جا من بلاصة.\n\nمنك.\n\nوحتى ملي يدوز الوقت، وكل واحد فينا كيعيش حياتو، غادي تبقى جزء فينا هاديك الأولاد اللي لقاو الهدوء فحضورك.\n\nشكرا على كل حاجة درتيها علينا.\nشكرا على قلبك.\nشكرا حيت نتا بابانا.\n\nكنبغيوك أكثر من ما تقدر تقولو الكلمات.\n\n— ولادك",
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
