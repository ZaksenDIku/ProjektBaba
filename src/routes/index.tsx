import { createFileRoute } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { I18nProvider } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { FamilyTree } from "@/components/FamilyTree";
import { Quotes } from "@/components/Quotes";
import { Gallery } from "@/components/Gallery";
import { Letter } from "@/components/Letter";
import { ImageManager } from "@/components/ImageManager";

const accessCode = "Yahber11";
const accessSessionKey = "projektbaba:access-granted";

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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsUnlocked(window.sessionStorage.getItem(accessSessionKey) === "true");
  }, []);

  const unlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code === accessCode) {
      window.sessionStorage.setItem(accessSessionKey, "true");
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("Forkert adgangskode");
    setCode("");
  };

  return (
    <I18nProvider>
      <main className="relative min-h-screen bg-background text-foreground">
        {isUnlocked ? (
          <>
            <LanguageToggle />
            <Hero />
            <Journey />
            <FamilyTree />
            <Quotes />
            <Gallery />
            <Letter />
            <ImageManager />
          </>
        ) : (
          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
            <div className="absolute inset-0 arabic-pattern opacity-[0.04]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,oklch(0.82_0.14_82_/_0.18),transparent_42%)]" />

            <form
              onSubmit={unlock}
              className="relative z-10 w-full max-w-sm rounded-xl border border-gold/30 bg-card/85 p-6 text-center shadow-deep backdrop-blur-xl"
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                <LockKeyhole className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-4xl italic text-warm">Projekt Baba</h1>
              <p className="mt-2 text-sm text-muted-foreground">Indtast adgangskoden for at fortsætte.</p>

              <label className="mt-6 block text-left text-xs uppercase tracking-widest text-gold/80" htmlFor="access-code">
                Adgangskode
              </label>
              <input
                id="access-code"
                type="password"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError("");
                }}
                autoFocus
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-3 text-center text-base text-warm outline-none ring-gold/40 transition focus:ring-2"
              />

              {error && <p className="mt-3 text-sm text-red-300">{error}</p>}

              <button
                type="submit"
                className="mt-5 w-full rounded-md bg-gold px-4 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:opacity-90"
              >
                Åbn siden
              </button>
            </form>
          </section>
        )}
      </main>
    </I18nProvider>
  );
}
