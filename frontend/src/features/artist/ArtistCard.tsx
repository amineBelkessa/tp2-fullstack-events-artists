import { Link } from "react-router-dom";
import type { Artist } from "./types";

type Props = {
  artist: Artist;
};

export default function ArtistCard({ artist }: Props) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-neutral-900/70
        px-10 py-10
        backdrop-blur-xl
        transition
        hover:border-white/20
        hover:bg-neutral-900/80
      "
    >
      {/* HIGHLIGHT */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-0
          transition-opacity
          group-hover:opacity-100
          bg-[radial-gradient(140%_140%_at_0%_0%,rgba(255,255,255,0.08),transparent_55%)]
        "
      />

      <div className="relative flex h-full flex-col justify-between gap-8">
        {/* HEADER */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
            Artiste
          </p>

          <h3 className="text-xl font-medium tracking-tight text-neutral-50">
            {artist.label}
          </h3>

          {artist.country && (
            <p className="mt-3 text-sm text-neutral-400">
              {artist.country}
            </p>
          )}
        </div>

        {/* ACTION */}
        <div className="flex items-center justify-between pt-6 text-sm text-neutral-400">
          <Link
            to={`/artists/${artist.id}`}
            className="
              inline-flex items-center gap-2
              transition-colors
              hover:text-neutral-100
            "
          >
            Voir le détail
            <span className="transition-transform group-hover:translate-x-1">
              —
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
