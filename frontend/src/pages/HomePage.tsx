import { Link } from "react-router-dom";
import RevealOnScroll from "../components/motion/RevealOnScroll";

export default function HomePage() {
  return (
    <main className="relative">

      {/* ========== HERO CINEMA ========== */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="relative mx-auto max-w-6xl px-12">

          <RevealOnScroll>
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/60">
              Editorial music platform
            </p>
          </RevealOnScroll>

          <RevealOnScroll delayMs={120}>
            <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.05] tracking-tight text-white">
              Une nouvelle scène
              <br />
              <span className="text-white/70">pour les événements</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delayMs={240}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70">
              Events & Artists est une expérience éditoriale immersive pour
              découvrir concerts, artistes et scènes culturelles, pensée comme
              un film — fluide, sensible, sans bruit.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delayMs={360}>
            <div className="mt-14 flex items-center gap-6">
              <Link
                to="/events"
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  bg-white px-8 py-4
                  text-sm font-medium text-black
                  transition-all duration-500
                  hover:scale-[1.05]
                  hover:bg-white/90
                "
              >
                Explorer les événements
              </Link>

              <Link
                to="/artists"
                className="
                  text-sm text-white/70
                  transition-colors duration-500
                  hover:text-white
                "
              >
                Découvrir les artistes →
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ========== MANIFESTO ========== */}
      <section className="relative py-40">
        <div className="mx-auto max-w-5xl px-12">

          <RevealOnScroll>
            <div
              className="
                relative overflow-hidden
                rounded-[48px]
                border border-white/15
                bg-white/5
                px-20 py-24
                backdrop-blur-2xl
                shadow-[0_60px_160px_rgba(0,0,0,0.8)]
              "
            >
              <p className="mb-8 text-xs uppercase tracking-[0.4em] text-white/60">
                Manifesto
              </p>

              <p className="text-2xl leading-relaxed text-white/80">
                Pas une plateforme de plus.
                <br />
                Une autre manière de ressentir la musique, les lieux, les dates.
                <br />
                Un espace lent, précis, éditorial.
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* ========== EDITORIAL SPLIT (CLEAN) ========== */}
      <section className="relative pb-48">
        <div className="mx-auto max-w-6xl px-12">

          <div className="grid gap-24 md:grid-cols-2">

            {/* EVENTS */}
            <RevealOnScroll>
              <Link
                to="/events"
                className="
                  group relative
                  border-t border-white/20
                  pt-16
                  transition-colors duration-700
                  hover:border-white/50
                "
              >
                <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/50">
                  Programmation
                </p>

                <h3 className="text-4xl font-medium text-white">
                  Événements
                </h3>

                <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">
                  Un parcours éditorial fluide des événements à venir,
                  pensé par date, par lieu et par énergie.
                </p>

                <span className="mt-10 inline-flex items-center gap-4 text-sm text-white/60 transition-all duration-500 group-hover:text-white">
                  Voir la programmation
                  <span className="h-px w-8 bg-white/40 transition-all duration-500 group-hover:w-14" />
                </span>
              </Link>
            </RevealOnScroll>

            {/* ARTISTS */}
            <RevealOnScroll delayMs={180}>
              <Link
                to="/artists"
                className="
                  group relative
                  border-t border-white/20
                  pt-16
                  transition-colors duration-700
                  hover:border-white/50
                "
              >
                <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/50">
                  Identités
                </p>

                <h3 className="text-4xl font-medium text-white">
                  Artistes
                </h3>

                <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">
                  Portraits et scènes musicales à suivre,
                  sélectionnées pour leur singularité.
                </p>

                <span className="mt-10 inline-flex items-center gap-4 text-sm text-white/60 transition-all duration-500 group-hover:text-white">
                  Explorer les artistes
                  <span className="h-px w-8 bg-white/40 transition-all duration-500 group-hover:w-14" />
                </span>
              </Link>
            </RevealOnScroll>

          </div>
        </div>
      </section>

    </main>
  );
}
