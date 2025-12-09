import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import PageContainer from "../../components/layout/PageContainer";
import Spinner from "../../components/ui/Spinner";

import { fetchArtistById, deleteArtist } from "./api";

import type { Artist } from "./types";

export default function ArtistDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: artist,
    isLoading,
    isError,
  } = useQuery<Artist>({
    queryKey: ["artist", id],
    queryFn: () => fetchArtistById(id!),
    enabled: !!id,
  });

  async function handleDelete() {
    if (!id) return;
    if (!window.confirm("Supprimer définitivement cet artiste ?")) return;

    await deleteArtist(id);
    navigate("/artists", {
      state: { successMessage: "Artiste supprimé avec succès." },
    });
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

  if (isError || !artist) {
    return (
      <PageContainer>
        <div className="py-32 text-center text-neutral-400">
          Artiste introuvable.
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="min-h-screen text-neutral-100">
      <PageContainer>

        {/* ===== HERO ===== */}
        <section
          className="
            relative mb-20 overflow-hidden
            rounded-[36px]
            border border-white/10
            bg-neutral-900/70
            px-16 py-20
            backdrop-blur
          "
        >
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.08),transparent_55%)]
            "
          />

          <div className="relative max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-neutral-400">
              Artiste
            </p>

            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-50">
              {artist.label}
            </h1>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <section className="max-w-4xl space-y-20">

          {/* INFOS */}
          <div>
            <h2 className="mb-6 text-sm uppercase tracking-[0.3em] text-neutral-400">
              Informations
            </h2>

            <p className="text-sm text-neutral-300">
              Aucun détail supplémentaire n’est encore renseigné pour cet
              artiste.
            </p>
          </div>

          {/* ACTIONS */}
          <div
            className="
              flex items-center justify-between
              border-t border-white/10
              pt-10
            "
          >
            <Link
              to="/artists"
              className="text-sm text-neutral-400 transition-colors hover:text-neutral-100"
            >
              ← Retour aux artistes
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to={`/artists/${artist.id}/edit`}
                className="
                  rounded-full
                  border border-white/20
                  px-6 py-2.5
                  text-sm text-white
                  backdrop-blur
                  transition
                  hover:border-white
                "
              >
                Modifier
              </Link>

              <button
                onClick={handleDelete}
                className="
                  rounded-full
                  border border-red-500/40
                  px-6 py-2.5
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
