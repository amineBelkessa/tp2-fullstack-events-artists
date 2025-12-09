import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import ArtistForm from "./ArtistForm";
import { fetchArtistById, updateArtist, deleteArtist } from "./api";
import type { Artist } from "./types";

export default function ArtistEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchArtistById(id)
      .then(setArtist)
      .catch(() => setError("Impossible de charger l’artiste."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(values: { label: string }) {
    if (!id) return;

    try {
      setSaving(true);
      setError(null);

      await updateArtist(id, values);

      navigate("/artists", {
        state: {
          successMessage: "Artiste modifié avec succès.",
        },
      });
    } catch {
      setError("Échec de la mise à jour de l’artiste.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) return;

    const confirmed = window.confirm(
      "Supprimer définitivement cet artiste ?"
    );
    if (!confirmed) return;

    try {
      await deleteArtist(id);
      navigate("/artists", {
        state: {
          successMessage: "Artiste supprimé avec succès.",
        },
      });
    } catch {
      setError("Échec de la suppression de l’artiste.");
    }
  }

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
            Mettre à jour le nom de l’artiste ou le supprimer définitivement.
          </p>
        </div>

        {/* DELETE */}
        <button
          onClick={handleDelete}
          className="
            rounded-full
            border border-red-500/40
            px-6 py-3
            text-sm text-red-300
            transition
            hover:border-red-500
            hover:text-red-200
          "
        >
          Supprimer
        </button>
      </div>

      {/* ===== ERROR ===== */}
      {error && (
        <div
          className="
            mb-12
            rounded-[24px]
            border border-red-400/30
            bg-red-400/10
            px-8 py-6
            text-sm text-red-100
            backdrop-blur
          "
        >
          {error}
        </div>
      )}

      {/* ===== FORM ===== */}
      <ArtistForm
        initialValues={{ label: artist.label }}
        submitLabel="Enregistrer les modifications"
        loading={saving}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
}
