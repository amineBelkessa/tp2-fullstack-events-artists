import { Link } from "react-router-dom";
import type { Event } from "./types";

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="
        group relative block
        will-change-transform
        hover-lift
      "
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rx = ((y / rect.height) - 0.5) * -12;
        const ry = ((x / rect.width) - 0.5) * 12;

        el.style.transform = `
          perspective(1200px)
          rotateX(${rx}deg)
          rotateY(${ry}deg)
          translateZ(16px)
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
      }}
    >
      {/* GLASS CARD */}
      <div
        className="
          card-glass
          relative isolate
          h-full
          rounded-[36px]
          border border-white/10
          bg-neutral-900/65
          p-8
          backdrop-blur-xl
          transition-all duration-700
          group-hover:border-white/20
          group-hover:shadow-[0_80px_160px_rgba(0,0,0,0.75)]
        "
      >
        {/* HALO EXTERNE */}
        <div className="
          pointer-events-none
          absolute -inset-6 -z-10
          rounded-[44px]
          bg-neutral-800/50
          blur-3xl
          opacity-0
          transition-opacity duration-700
          group-hover:opacity-100
        " />

        {/* REFLECTION ANIMÉE */}
        <div className="card-reflection pointer-events-none absolute inset-0 rounded-[36px]" />

        {/* GRAIN INTERNE */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[36px] opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* CONTENT */}
        <div className="relative flex h-full flex-col justify-between gap-10">

          {/* META */}
          <div className="space-y-5">
            <span className="block text-[11px] tracking-[0.45em] uppercase text-neutral-400">
              {(event as any).place ?? "—"}
            </span>

            <h3 className="text-[1.35rem] font-medium leading-snug text-neutral-50">
              {event.label}
            </h3>

            <time className="block text-sm text-neutral-400">
              {event.startDate}
            </time>
          </div>

          {/* ARTISTS */}
          {event.artists.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.artists.slice(0, 3).map((artist) => (
                <span
                  key={artist.id}
                  className="
                    rounded-full
                    border border-white/15
                    bg-neutral-900/70
                    px-4 py-1.5
                    text-[11px]
                    text-neutral-300
                    backdrop-blur-md
                  "
                >
                  {artist.label}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="pt-6">
            <span className="
              inline-flex items-center gap-4
              text-sm text-neutral-400
              transition-colors duration-500
              group-hover:text-neutral-100
            ">
              Voir le détail
              <span className="
                h-px w-8
                bg-neutral-500
                transition-all duration-700
                group-hover:w-14
                group-hover:bg-neutral-100
              " />
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}
