import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import ArtistForm from "./ArtistForm";
import { createArtist } from "./api";

export default function ArtistCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(values: { label: string }) {
    try {
      setLoading(true);
      setError(null);

      const created = await createArtist(values);

      navigate("/artists", {
        state: {
          successMessage: "Artiste créé avec succès.",
        },
      });
    } catch {
      setError("Impossible de créer l’artiste.");
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
          Créer un artiste
        </h1>

        <p className="mt-6 text-base leading-relaxed text-white/70">
          Ajoutez un nouvel artiste qui pourra ensuite être associé à des
          événements.
        </p>
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
        submitLabel="Créer l’artiste"
        loading={loading}
        onSubmit={handleCreate}
      />
    </PageContainer>
  );
}
