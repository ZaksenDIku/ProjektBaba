import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { FamilyTree } from "@/components/FamilyTree";
import { Quotes } from "@/components/Quotes";
import { Gallery } from "@/components/Gallery";
import { Letter } from "@/components/Letter";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Til verdens bedste far · إلى أعز أب فالدنيا" },
      {
        name: "description",
        content:
          "En cinematisk og emotionel digital hyldest til en elsket far — en rejse gennem liv, familie og kærlighed.",
      },
    ],
  }),
});

function Index() {
  return (
    <I18nProvider>
      <main className="relative min-h-screen bg-background text-foreground">
        <LanguageToggle />
        <Hero />
        <Journey />
        <FamilyTree />
        <Quotes />
        <Gallery />
        <Letter />
      </main>
    </I18nProvider>
  );
}
