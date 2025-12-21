import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import EventForm from "./EventForm";
import { fetchEventById, updateEvent, deleteEvent } from "./api";
import type { Event } from "./types";

import { fetchArtists } from "../artist/api";
import type { Artist } from "./types";
import type { SpringPage } from "../events/types";

export default function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /* ======================
     SÉCURITÉ ID
  ====================== */
  if (!id) {
    return (
      <PageContainer>
        <p className="text-red-400">ID événement manquant.</p>
      </PageContainer>
    );
  }

  const eventId = id;

  const [event, setEvent] = useState<Event | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtistIds, setSelectedArtistIds] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ======================
     LOAD EVENT + ARTISTS
  ====================== */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [eventData, artistsPage] = await Promise.all([
          fetchEventById(eventId),
          fetchArtists(0, 100) as Promise<SpringPage<Artist>>,
        ]);

        setEvent(eventData);
        setArtists(artistsPage.content);

        // ✅ ids artistes déjà associés → number[]
        setSelectedArtistIds(eventData.artists.map(a => a.id));
      } catch {
        setError("Impossible de charger l’événement.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [eventId]);

  /* ======================
     ARTISTS HANDLERS
  ====================== */
  function addArtist(artistId: number) {
    setSelectedArtistIds(prev =>
      prev.includes(artistId) ? prev : [...prev, artistId]
    );
  }

  function removeArtist(artistId: number) {
    setSelectedArtistIds(prev =>
      prev.filter(id => id !== artistId)
    );
  }

  /* ======================
     UPDATE
  ====================== */
  async function handleUpdate(values: {
    label: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      setSaving(true);
      setError(null);

      await updateEvent(eventId, {
        ...values,
        artistIds: selectedArtistIds, // ✅ number[]
      });

      navigate("/events", {
        state: { successMessage: "Modification effectuée avec succès ✅" },
      });
    } catch {
      setError("Échec de la mise à jour de l’événement.");
    } finally {
      setSaving(false);
    }
  }

  /* ======================
     DELETE
  ====================== */
  async function handleDelete() {
    if (!window.confirm("Supprimer définitivement cet événement ?")) return;

    try {
      await deleteEvent(eventId);
      navigate("/events", {
        state: { successMessage: "Événement supprimé avec succès ✅" },
      });
    } catch {
      setError("Échec de la suppression de l’événement.");
    }
  }

  /* ======================
     UI STATES
  ====================== */
  if (loading) {
    return (
      <PageContainer>
        <p className="text-white/60">Chargement de l’événement…</p>
      </PageContainer>
    );
  }

  if (!event) {
    return (
      <PageContainer>
        <p className="text-red-400">Événement introuvable.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* ===== HEADER ===== */}
      <div className="mb-20 flex max-w-4xl justify-between">
        <h1 className="text-4xl text-white">Modifier l’événement</h1>

        <button
          onClick={handleDelete}
          className="rounded-full border border-red-400 px-6 py-2 text-red-300"
        >
          Supprimer
        </button>
      </div>

      {error && <p className="mb-6 text-red-400">{error}</p>}

      {/* ===== FORM ===== */}
      <EventForm
        initialValues={{
          label: event.label,
          startDate: event.startDate,
          endDate: event.endDate,
        }}
        submitLabel="Enregistrer"
        loading={saving}
        onSubmit={handleUpdate}
      />

      {/* ===== ARTISTS ===== */}
      <section className="mt-14 max-w-2xl space-y-6">
        <h2 className="text-sm uppercase text-white/60">
          Artistes associés
        </h2>

        <select
          defaultValue=""
          onChange={e => {
            const artistId = Number(e.target.value);
            if (!Number.isNaN(artistId)) addArtist(artistId);
            e.target.value = "";
          }}
          className="rounded-full border border-white/20 bg-black/30 px-5 py-2 text-white"
        >
          <option value="">Ajouter un artiste…</option>
          {artists
            .filter(a => !selectedArtistIds.includes(a.id))
            .map(a => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
        </select>

        {selectedArtistIds.length === 0 ? (
          <p className="text-white/60">Aucun artiste associé.</p>
        ) : (
          <ul className="flex flex-wrap gap-3">
            {selectedArtistIds.map(artistId => {
              const artist = artists.find(a => a.id === artistId);
              if (!artist) return null;

              return (
                <li
                  key={artistId}
                  className="flex items-center gap-3 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-xs text-white"
                >
                  {artist.label}
                  <button
                    type="button"
                    onClick={() => removeArtist(artistId)}
                    className="hover:text-red-300"
                  >
                    Retirer
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </PageContainer>
  );
}
