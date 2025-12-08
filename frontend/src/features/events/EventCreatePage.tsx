import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import EventForm from "./EventForm";
import { createEvent } from "./api";

export default function EventCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(values: {
    label: string;
    startDate: string;
    endDate: string;
  }) {
    try {
      setLoading(true);
      setError(null);

      const created = await createEvent(values);

      // ✅ Redirection vers le détail de l’événement créé
      navigate(`/events/${created.id}`);
    } catch (e) {
      setError("Impossible de créer l’événement.");
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
          Renseignez les informations principales de l’événement.
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
        submitLabel="Créer l’événement"
        loading={loading}
      />

    </PageContainer>
  );
}
