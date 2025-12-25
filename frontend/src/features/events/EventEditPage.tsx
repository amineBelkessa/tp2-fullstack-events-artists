import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import EventForm from "./EventForm";
import { 
  fetchEventById, 
  updateEvent, 
  deleteEvent,
  linkArtistToEvent,
  unlinkArtistFromEvent 
} from "./api";
import type { Event } from "./types";

import { fetchArtists } from "../artist/api";
import type { Artist } from "./types";

export default function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /* ======================
     SÉCURITÉ ID
  ====================== */
  if (!id) {
    return (
      <PageContainer>
        <div className="
          rounded-[24px]
          border border-red-400/30
          bg-red-400/10
          px-8 py-6
          text-sm text-red-100
          backdrop-blur
        ">
          ID événement manquant.
        </div>
      </PageContainer>
    );
  }

  const eventId = id;

  const [event, setEvent] = useState<Event | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);

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
          fetchArtists(0, 100),
        ]);

        setEvent(eventData);
        
        if (artistsPage && Array.isArray(artistsPage.content)) {
          setArtists(artistsPage.content);
        } else if (Array.isArray(artistsPage)) {
          setArtists(artistsPage as unknown as Artist[]);
        }

        // ✅ ids artistes déjà associés
        setSelectedArtistIds(eventData.artists.map(a => a.id));
      } catch (err) {
        console.error("Erreur chargement:", err);
        setError("Impossible de charger l'événement.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [eventId]);

  /* ======================
     ARTISTS HANDLERS
  ====================== */
  async function addArtist(artistId: string) {
    if (selectedArtistIds.includes(artistId)) return;

    try {
      await linkArtistToEvent(eventId, artistId);
      setSelectedArtistIds(prev => [...prev, artistId]);
      setError(null);
      
      // ✅ Recharger l'événement pour avoir les données à jour
      const updatedEvent = await fetchEventById(eventId);
      setEvent(updatedEvent);
    } catch (err) {
      console.error("Erreur ajout artiste:", err);
      setError("Échec de l'ajout de l'artiste.");
    }
  }

  async function removeArtist(artistId: string) {
    try {
      await unlinkArtistFromEvent(eventId, artistId);
      setSelectedArtistIds(prev => prev.filter(id => id !== artistId));
      setError(null);
      
      // ✅ Recharger l'événement pour avoir les données à jour
      const updatedEvent = await fetchEventById(eventId);
      setEvent(updatedEvent);
    } catch (err) {
      console.error("Erreur suppression artiste:", err);
      setError("Échec de la suppression de l'artiste.");
    }
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

      await updateEvent(eventId, values);

      navigate("/events", {
        state: { successMessage: "Modification effectuée avec succès" },
      });
    } catch (err) {
      console.error("Erreur update:", err);
      setError("Échec de la mise à jour de l'événement.");
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
    } catch (err) {
      console.error("Erreur suppression:", err);
      setError("Échec de la suppression de l'événement.");
    }
  }

  /* ======================
     UI STATES
  ====================== */
  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center py-32">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          <span className="ml-4 text-white/60">Chargement de l'événement…</span>
        </div>
      </PageContainer>
    );
  }

  if (!event) {
    return (
      <PageContainer>
        <div className="
          rounded-[24px]
          border border-red-400/30
          bg-red-400/10
          px-8 py-6
          text-sm text-red-100
          backdrop-blur
        ">
          Événement introuvable.
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      
      {/* ===== HEADER ===== */}
      <div className="mb-20 flex max-w-3xl items-start justify-between gap-8">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/60">
            Administration
          </p>

          <h1 className="text-4xl font-medium tracking-tight text-white">
            Modifier l'événement
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/70">
            Mettez à jour les informations et gérez les artistes associés.
          </p>
        </div>

        {/* DELETE BUTTON */}
        <button
          onClick={handleDelete}
          className="
            flex-shrink-0
            rounded-full
            border border-red-400/40
            bg-red-400/10
            px-6 py-3
            text-sm font-medium text-red-300
            backdrop-blur
            transition-all
            hover:border-red-400
            hover:bg-red-400/20
            hover:text-red-200
            focus:outline-none
            focus:ring-2
            focus:ring-red-400/50
          "
        >
          🗑️ Supprimer
        </button>
      </div>

      {/* ===== ERROR ===== */}
      {error && (
        <div className="
          mb-12
          rounded-[24px]
          border border-red-400/30
          bg-red-400/10
          px-8 py-6
          text-sm text-red-100
          backdrop-blur
        ">
          {error}
        </div>
      )}

      {/* ===== FORM ===== */}
      <EventForm
        initialValues={{
          label: event.label,
          startDate: event.startDate,
          endDate: event.endDate,
        }}
        submitLabel="Enregistrer les modifications"
        loading={saving}
        onSubmit={handleUpdate}
      />

      {/* ===== ARTISTS SECTION ===== */}
      <section className="mt-14 max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.35em] text-white/60">
            Artistes associés
          </h2>
          
          <span className="text-xs text-white/40">
            {selectedArtistIds.length} artiste{selectedArtistIds.length !== 1 ? 's' : ''} associé{selectedArtistIds.length !== 1 ? 's' : ''}
          </span>
        </div>

        {artists.length === 0 ? (
          <div className="
            rounded-[24px]
            border border-white/10
            bg-white/5
            px-8 py-12
            text-center
            backdrop-blur
          ">
            <p className="text-white/60">Aucun artiste disponible.</p>
            <p className="mt-2 text-sm text-white/40">
              Créez d'abord des artistes pour pouvoir les associer à des événements.
            </p>
          </div>
        ) : (
          <>
            {/* SELECT DROPDOWN */}
            <div className="relative">
              <select
                value=""
                onChange={e => {
                  const artistId = e.target.value;
                  if (artistId) {
                    addArtist(artistId);
                  }
                }}
                className="
                  w-full
                  appearance-none
                  rounded-full
                  border border-white/20
                  bg-black/30
                  px-6 py-3
                  pr-12
                  text-sm text-white
                  backdrop-blur
                  transition-all
                  hover:border-white/30
                  focus:border-white/40
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white/10
                "
              >
                <option value="">➕ Ajouter un artiste…</option>
                {artists
                  .filter(a => !selectedArtistIds.includes(a.id))
                  .map(a => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
              </select>
              
              {/* Dropdown Icon */}
              <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                <svg 
                  className="h-4 w-4 text-white/40" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            {/* SELECTED ARTISTS LIST */}
            {selectedArtistIds.length === 0 ? (
              <div className="
                rounded-[20px]
                border border-dashed border-white/10
                bg-white/[0.02]
                px-8 py-8
                text-center
                backdrop-blur
              ">
                <p className="text-sm text-white/50">
                  Aucun artiste associé pour le moment.
                </p>
              </div>
            ) : (
              <div className="
                rounded-[24px]
                border border-white/10
                bg-white/5
                p-6
                backdrop-blur
              ">
                <ul className="flex flex-wrap gap-3">
                  {selectedArtistIds.map(artistId => {
                    const artist = artists.find(a => a.id === artistId);
                    if (!artist) return null;

                    return (
                      <li
                        key={artistId}
                        className="
                          group
                          flex items-center gap-3
                          rounded-full
                          border border-white/25
                          bg-black/40
                          px-5 py-2.5
                          text-sm text-white
                          backdrop-blur
                          transition-all
                          hover:border-white/40
                          hover:bg-black/60
                        "
                      >
                        <span className="font-medium">{artist.label}</span>
                        
                        <button
                          type="button"
                          onClick={() => removeArtist(artistId)}
                          className="
                            flex h-5 w-5 items-center justify-center
                            rounded-full
                            text-white/50
                            transition-all
                            hover:bg-red-500/20
                            hover:text-red-300
                            focus:outline-none
                            focus:ring-2
                            focus:ring-red-400/50
                          "
                          aria-label={`Retirer ${artist.label}`}
                        >
                          <svg 
                            className="h-3.5 w-3.5" 
                            fill="none" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2.5" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

           
          </>
        )}
      </section>

      {/* ===== SPACING BEFORE BOTTOM ===== */}
      <div className="h-20"></div>

    </PageContainer>
  );
}