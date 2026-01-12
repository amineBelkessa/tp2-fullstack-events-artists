import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchEventById, deleteEvent } from "./api";
import PageContainer from "../../components/layout/PageContainer";
import Spinner from "../../components/ui/Spinner";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: event,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id!),
    enabled: !!id,
  });

  async function handleDelete() {
    if (!id) return;

    const confirmed = window.confirm(
      "Supprimer définitivement cet événement ?"
    );
    if (!confirmed) return;

    await deleteEvent(id);
    navigate("/events");
  }

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center py-40">
          <Spinner />
        </div>
      </PageContainer>
    );
  }

  if (isError || !event) {
    return (
      <PageContainer>
        <div className="py-32 text-center text-neutral-400">
          Événement introuvable.
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="min-h-screen text-neutral-100">
      <PageContainer>

        {/* HERO */}
        <section className="relative mb-20 overflow-hidden rounded-[36px] border border-white/10 bg-neutral-900/70 px-16 py-20 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.08),transparent_55%)]" />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs tracking-[0.35em] uppercase text-neutral-400">
              {event.place}
            </p>

            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-50">
              {event.label}
            </h1>

            <p className="mt-6 text-sm text-neutral-300">
              {event.startDate} — {event.endDate}
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-4xl space-y-20">

          {/* ARTISTS */}
          <div>
            <h2 className="mb-8 text-sm uppercase tracking-[0.3em] text-neutral-400">
              Artistes
            </h2>

            {event.artists.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Aucun artiste n’est encore associé à cet événement.
              </p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {event.artists.map((artist) => (
                  <span
                    key={artist.id}
                    className="
                      rounded-full
                      border border-white/10
                      bg-neutral-900/70
                      px-5 py-2
                      text-sm
                      text-neutral-300
                      backdrop-blur
                    "
                  >
                    {artist.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-between border-t border-white/10 pt-10">
            <Link
              to="/events"
              className="text-sm text-neutral-400 transition-colors hover:text-neutral-100"
            >
              ← Retour à la programmation
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to={`/events/${event.id}/edit`}
                className="
                  rounded-full
                  border border-white/20
                  px-5 py-2
                  text-sm text-neutral-300
                  transition
                  hover:border-white/40
                  hover:text-white
                "
              >
                Modifier
              </Link>

              <button
                onClick={handleDelete}
                className="
                  rounded-full
                  border border-red-500/40
                  px-5 py-2
                  text-sm text-red-300
                  transition
                  hover:border-red-500
                  hover:text-red-200
                "
              >
                Supprimer
              </button>
            </div>
          </div>

        </section>
      </PageContainer>
    </div>
  );
}
