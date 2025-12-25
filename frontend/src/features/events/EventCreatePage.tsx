import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import PageContainer from "../../components/layout/PageContainer";
import EventForm from "./EventForm";
import { createEvent, linkArtistToEvent } from "./api";

import { fetchArtists } from "../artist/api";
import type { Artist } from "./types";

export default function EventCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(true);

  /* ======================
     LOAD ARTISTS
  ====================== */
  useEffect(() => {
    async function load() {
      try {
        setLoadingArtists(true);
        const artistsPage = await fetchArtists(0, 100);
        
        if (artistsPage && Array.isArray(artistsPage.content)) {
          setArtists(artistsPage.content);
        } else if (Array.isArray(artistsPage)) {
          setArtists(artistsPage as unknown as Artist[]);
        }
      } catch (err) {
        console.error("Erreur chargement artistes:", err);
        setError("Impossible de charger les artistes.");
      } finally {
        setLoadingArtists(false);
      }
    }

    load();
  }, []);

  /* ======================
     ARTISTS HANDLERS
  ====================== */
  function addArtist(artistId: string) {
    setSelectedArtistIds(prev =>
      prev.includes(artistId) ? prev : [...prev, artistId]
    );
  }

  function removeArtist(artistId: string) {
    setSelectedArtistIds(prev =>
      prev.filter(id => id !== artistId)
    );
  }

  /* ======================
     CREATE EVENT + LINK ARTISTS
  ====================== */
  async function handleCreate(values: {
    label: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Créer l'événement
      const created = await createEvent(values);

      // 2️⃣ Lier les artistes sélectionnés
      if (selectedArtistIds.length > 0) {
        await Promise.all(
          selectedArtistIds.map(artistId =>
            linkArtistToEvent(created.id, artistId)
          )
        );
      }

      // 3️⃣ Redirection
      navigate(`/events/${created.id}`, {
        state: { successMessage: "Événement créé avec succès ✅" },
      });
    } catch (e) {
      console.error("Erreur création:", e);
      setError("Impossible de créer l'événement.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>

      {/* ===== HEADER ===== */}
      <div className="mb-20 max-w-3xl">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/60">
          Administration
        </p>

        <h1 className="text-4xl font-medium tracking-tight text-white">
          Créer un événement
        </h1>

        <p className="mt-6 text-base leading-relaxed text-white/70">
          Renseignez les informations principales de l'événement et associez des artistes.
        </p>
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
        onSubmit={handleCreate}
        submitLabel="Créer l'événement"
        loading={loading}
      />

      {/* ===== ARTISTS SECTION ===== */}
      <section className="mt-14 max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-[0.35em] text-white/60">
            Artistes associés
          </h2>
          
          <span className="text-xs text-white/40">
            {selectedArtistIds.length} artiste{selectedArtistIds.length !== 1 ? 's' : ''} sélectionné{selectedArtistIds.length !== 1 ? 's' : ''}
          </span>
        </div>

        {loadingArtists ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white"></div>
            <span className="ml-3 text-white/60">Chargement des artistes…</span>
          </div>
        ) : artists.length === 0 ? (
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

      {/* ===== SPACING BEFORE SUBMIT ===== */}
      <div className="h-20"></div>

    </PageContainer>
  );
}