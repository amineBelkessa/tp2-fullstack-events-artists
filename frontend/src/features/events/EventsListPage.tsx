import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import PageContainer from "../../components/layout/PageContainer";
import { Button } from "../../components/ui";
import Spinner from "../../components/ui/Spinner";

import { fetchEvents } from "./api";
import EventCard from "./EventCard";
import RevealOnScroll from "../../components/motion/RevealOnScroll";

import type { Event, SpringPage } from "./types";

export default function EventsListPage() {
  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useQuery<SpringPage<Event>>({
    queryKey: ["events", page],
    queryFn: () => fetchEvents(page, 6),
    placeholderData: (prev) => prev,
  });

  const hasEvents = !!data?.content?.length;
  const totalPages = data?.totalPages ?? 1;

  return (
    <PageContainer>

      {/* ===== HERO ===== */}
      <section
        className="
          relative mb-32 overflow-hidden
          rounded-[48px]
          border border-white/20
          bg-white/5
          px-20 py-28
          backdrop-blur-2xl
          shadow-[0_40px_120px_rgba(0,0,0,0.6)]
        "
      >
        {/* Frost light */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.22),transparent_60%)]" />

        <div className="relative max-w-3xl">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/70">
            Programmation
          </p>

          <h1 className="text-5xl font-medium leading-tight tracking-tight text-white">
            Les événements à venir
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80">
            Une sélection d’événements culturels et musicaux conçue comme une
            scène éditoriale. Fluide, immersive, sans distraction.
          </p>
        </div>
      </section>

      {/* ===== LOADING ===== */}
      {isLoading && (
        <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="
                h-[320px]
                rounded-[32px]
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                animate-pulse
              "
            />
          ))}
        </div>
      )}

      {/* ===== ERROR ===== */}
      {isError && (
        <div
          className="
            rounded-[32px]
            border border-red-400/30
            bg-red-400/10
            px-20 py-24
            text-center
            backdrop-blur-xl
          "
        >
          <p className="text-sm text-red-100">
            La programmation n’est pas accessible pour le moment.
          </p>
        </div>
      )}

      {/* ===== EMPTY ===== */}
      {!isLoading && !isError && !hasEvents && (
        <div
          className="
            rounded-[32px]
            border border-white/20
            bg-white/5
            px-20 py-24
            text-center
            backdrop-blur-2xl
          "
        >
          <p className="text-base text-white">
            Aucun événement n’est encore programmé.
          </p>
          <p className="mt-4 max-w-md mx-auto text-sm text-white/70">
            Cette page se remplira automatiquement dès la publication côté
            back-office.
          </p>
        </div>
      )}

      {/* ===== LIST ===== */}
      {hasEvents && (
        <>
          {/* Meta */}
          <div className="mb-12 flex items-center justify-between text-xs text-white/70">
            <span>Résultats triés par date</span>
            {isFetching && (
              <span className="inline-flex items-center gap-2">
                <Spinner className="h-3 w-3" />
                actualisation…
              </span>
            )}
          </div>

          {/* Cards — REVEAL CINÉMA */}
          <div
            className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3"
            style={{ perspective: "1600px" }}
          >
            {data!.content.map((event, index) => (
              <RevealOnScroll key={event.id} delayMs={index * 120}>
                <EventCard event={event} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Pagination */}
          <div
            className="
              mt-24 flex items-center justify-between
              border-t border-white/15
              pt-12
              text-sm text-white/70
            "
          >
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
            >
              Précédent
            </Button>

            <span className="tracking-wide">
              Page <span className="text-white">{page + 1}</span> /{" "}
              <span className="text-white">{totalPages}</span>
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() =>
                setPage((p) => (p < totalPages - 1 ? p + 1 : p))
              }
            >
              Suivant
            </Button>
          </div>
        </>
      )}
    </PageContainer>
  );
}
