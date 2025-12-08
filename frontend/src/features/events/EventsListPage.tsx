import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import { Button } from "../../components/ui";
import Spinner from "../../components/ui/Spinner";

import { fetchEvents } from "./api";
import EventCard from "./EventCard";
import RevealOnScroll from "../../components/motion/RevealOnScroll";

import type { Event, SpringPage } from "./types";

type SortField = "label" | "startDate";
type SortOrder = "asc" | "desc";

export default function EventsListPage() {
  const [page, setPage] = useState(0);
  const location = useLocation();

  /* =========================
     SUCCESS MESSAGE
     ========================= */
  const [successMessage, setSuccessMessage] = useState<string | null>(
    (location.state as any)?.successMessage ?? null
  );

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(null), 4000);
    return () => clearTimeout(t);
  }, [successMessage]);

  /* =========================
     SEARCH & SORT STATE
     ========================= */
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("startDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

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

  /* =========================
     FILTER + SORT (FRONT)
     ========================= */
  const events = useMemo(() => {
    if (!data?.content) return [];

    let result = [...data.content];

    // 🔎 search
    if (search.trim()) {
      result = result.filter((e) =>
        e.label.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ↕ sort
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, search, sortField, sortOrder]);

  const totalPages = data?.totalPages ?? 1;
  const hasEvents = events.length > 0;

  return (
    <PageContainer>

      {/* ✅ SUCCESS */}
      {successMessage && (
        <div className="mb-16 rounded-[28px] border border-emerald-400/30 bg-emerald-400/10 px-10 py-6 text-sm text-emerald-100 backdrop-blur-xl">
          {successMessage}
        </div>
      )}

      {/* ===== HERO ===== */}
      <section className="relative mb-24 overflow-hidden rounded-[48px] border border-white/20 bg-white/5 px-16 py-24 backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.22),transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto flex items-start justify-between gap-12">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/70">
              Programmation
            </p>

            <h1 className="text-5xl font-medium tracking-tight text-white">
              Les événements à venir
            </h1>

            <p className="mt-8 max-w-xl text-white/80">
              Une sélection d’événements culturels et musicaux conçue comme une
              scène éditoriale. Fluide, immersive, sans distraction.
            </p>
          </div>

          <Link
            to="/events/create"
            className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white hover:text-black"
          >
            + Créer
          </Link>
        </div>
      </section>

      {/* ===== CONTROLS ===== */}
      <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un événement…"
          className="
            w-full sm:w-[360px]
            rounded-full
            border border-white/15
            bg-white/5
            px-6 py-3
            text-sm text-white
            placeholder:text-white/40
            backdrop-blur
            outline-none
          "
        />

        {/* Sort */}
        <div className="flex items-center gap-4">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white backdrop-blur"
          >
            <option value="startDate">Date</option>
            <option value="label">Nom</option>
          </select>

          <button
            onClick={() =>
              setSortOrder((o) => (o === "asc" ? "desc" : "asc"))
            }
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-white backdrop-blur"
          >
            {sortOrder === "asc" ? "↑ Croissant" : "↓ Décroissant"}
          </button>
        </div>
      </div>

      {/* ===== STATE ===== */}
      {isLoading && (
        <div className="flex justify-center py-32">
          <Spinner />
        </div>
      )}

      {isError && (
        <p className="text-center text-red-300">
          Impossible de charger les événements.
        </p>
      )}

      {/* ===== LIST ===== */}
      {hasEvents && (
        <div
          className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3"
          style={{ perspective: "1600px" }}
        >
          {events.map((event, index) => (
            <RevealOnScroll key={event.id} delayMs={index * 120}>
              <EventCard event={event} />
            </RevealOnScroll>
          ))}
        </div>
      )}

      {/* ===== PAGINATION ===== */}
      {hasEvents && (
        <div className="mt-24 flex items-center justify-between border-t border-white/10 pt-10 text-sm text-white/70">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
          >
            Précédent
          </Button>

          <span>
            Page <span className="text-white">{page + 1}</span> /{" "}
            <span className="text-white">{totalPages}</span>
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
