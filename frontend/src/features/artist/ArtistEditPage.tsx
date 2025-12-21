import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import ArtistForm from "./ArtistForm";
import { fetchArtistById, updateArtist, deleteArtist } from "./api";
import type { Artist } from "./types";

import { fetchEvents } from "../events/api";
import type { Event, SpringPage } from "../events/types";

export default function ArtistEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [availableEvents, setAvailableEvents] = useState<Event[]>([]);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);

  // =========================================================
  // LOAD ARTIST + EVENTS
  // =========================================================
  useEffect(() => {
    if (!id) return;

    const artistId = id;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [artistData, eventsPage] = await Promise.all([
          fetchArtistById(artistId),
          fetchEvents(0, 100) as Promise<SpringPage<Event>>,
        ]);

        setArtist(artistData);
        setAvailableEvents(eventsPage.content);

        setSelectedEventIds(
          artistData.events?.map((e) => e.id) ?? []
        );
      } catch {
        setError("Impossible de charger l’artiste.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // =========================================================
  // EVENTS HANDLERS
  // =========================================================
  function handleAddEvent(eventId: string) {
    if (!eventId) return;

    setSelectedEventIds((prev) =>
      prev.includes(eventId) ? prev : [...prev, eventId]
    );
  }

  function handleRemoveEvent(eventId: string) {
    setSelectedEventIds((prev) => prev.filter((id) => id !== eventId));
  }

  // =========================================================
  // UPDATE / DELETE
  // =========================================================
  async function handleUpdate(values: { label: string }) {
    if (!id) return;
    const artistId = id;

    try {
      setSaving(true);
      setError(null);

      await updateArtist(artistId, {
        label: values.label,
        eventIds: selectedEventIds,
      });

      navigate("/artists", {
        state: { successMessage: "Artiste modifié avec succès." },
      });
    } catch {
      setError("Échec de la mise à jour de l’artiste.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;
    const artistId = id;

    if (!window.confirm("Supprimer définitivement cet artiste ?")) return;

    try {
      await deleteArtist(artistId);
      navigate("/artists", {
        state: { successMessage: "Artiste supprimé avec succès." },
      });
    } catch {
      setError("Échec de la suppression de l’artiste.");
    }
  }

  // =========================================================
  // RENDER
  // =========================================================
  if (loading) {
    return (
      <PageContainer>
        <p className="text-white/60">Chargement de l’artiste…</p>
      </PageContainer>
    );
  }

  if (!artist) {
    return (
      <PageContainer>
        <p className="text-red-400">Artiste introuvable.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* ===== HEADER ===== */}
      <div className="mb-20 flex max-w-4xl items-start justify-between gap-10">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/60">
            Administration
          </p>

          <h1 className="text-4xl font-medium tracking-tight text-white">
            Modifier l’artiste
          </h1>

          <p className="mt-6 text-base text-white/70">
            Mettre à jour le nom de l’artiste et gérer ses événements.
          </p>
        </div>

        <button
          onClick={handleDelete}
          className="rounded-full border border-red-500/40 px-6 py-3 text-sm text-red-300 hover:border-red-500"
        >
          Supprimer
        </button>
      </div>

      {error && (
        <div className="mb-12 rounded-[24px] border border-red-400/30 bg-red-400/10 px-8 py-6 text-sm text-red-100">
          {error}
        </div>
      )}

      <ArtistForm
        initialValues={{ label: artist.label }}
        submitLabel="Enregistrer les modifications"
        loading={saving}
        onSubmit={handleUpdate}
      />

      {/* ===== EVENTS ===== */}
      <section className="mt-14 max-w-2xl space-y-6">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/60">
          Événements associés
        </h2>

        <div className="rounded-[28px] border border-white/15 bg-white/5 px-8 py-7 space-y-6">
          <select
            defaultValue=""
            onChange={(e) => {
              handleAddEvent(e.target.value);
              e.target.value = "";
            }}
            className="rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-sm text-white"
          >
            <option value="">Ajouter un événement…</option>
            {availableEvents
              .filter((ev) => !selectedEventIds.includes(ev.id))
              .map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.label}
                </option>
              ))}
          </select>

          {selectedEventIds.length === 0 ? (
            <p className="text-sm text-white/60">
              Aucun événement sélectionné.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-3">
              {selectedEventIds.map((eventId) => {
                const ev = availableEvents.find((e) => e.id === eventId);
                if (!ev) return null;

                return (
                  <li
                    key={eventId}
                    className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-xs text-white"
                  >
                    {ev.label}
                    <button
                      onClick={() => handleRemoveEvent(eventId)}
                      className="hover:text-red-300"
                    >
                      Retirer
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
