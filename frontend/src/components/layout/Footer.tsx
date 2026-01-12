import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-48 pb-24">

      <div className="mx-auto max-w-6xl px-12">

        {/* Ligne de séparation */}
        <div className="mb-20 h-px w-full bg-white/15" />

        <div className="grid gap-20 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/50">
              Events & Artists
            </p>

            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Plateforme éditoriale dédiée aux événements culturels,
              artistes et scènes musicales.
            </p>
          </div>

          {/* NAV */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/50">
              Navigation
            </p>

            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="transition-colors hover:text-white"
                >
                  Événements
                </Link>
              </li>
              <li>
                <Link
                  to="/artists"
                  className="transition-colors hover:text-white"
                >
                  Artistes
                </Link>
              </li>
            </ul>
          </div>

          {/* MANIFESTO / SIGNATURE */}
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/50">
              Éditorial
            </p>

            <p className="max-w-sm text-sm leading-relaxed text-white/70 italic">
              Une autre manière de ressentir la musique,
              les lieux et le temps.
            </p>
          </div>

        </div>

        {/* Bas de footer */}
        <div className="mt-20 flex flex-col gap-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Events & Artists</span>
          <span>Conçu par MOUSSAOUI Tarek & BELKESSA Amine</span>
        </div>

      </div>
    </footer>
  );
}
