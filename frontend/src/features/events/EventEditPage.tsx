import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import EventForm from "./EventForm";
import { fetchEventById, updateEvent, deleteEvent } from "./api";
import type { Event } from "./types";

export default function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchEventById(id)
      .then(setEvent)
      .catch(() => setError("Impossible de charger l’événement."))
      .finally(() => setLoading(false));
  }, [id]);

  /* ======================
     UPDATE
     ====================== */
  async function handleUpdate(values: {
    label: string;
    startDate: string;
    endDate: string;
  }) {
    if (!id) return;

    try {
      setSaving(true);
      setError(null);

      await updateEvent(id, values);

      // ✅ Redirection + message succès
      navigate("/events", {
        state: {
          successMessage: "Modification effectuée avec succès ✅",
        },
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
    if (!id) return;

    const confirmed = window.confirm(
      "Supprimer définitivement cet événement ?"
    );
    if (!confirmed) return;

    try {
      await deleteEvent(id);

      navigate("/events", {
        state: {
          successMessage: "Événement supprimé avec succès ✅",
        },
      });
    } catch {
      setError("Échec de la suppression de l’événement.");
    }
  }

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
      <div className="mb-20 flex max-w-4xl items-start justify-between gap-10">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/60">
            Administration
          </p>

          <h1 className="text-4xl font-medium tracking-tight text-white">
            Modifier l’événement
          </h1>

          <p className="mt-6 text-base text-white/70">
            Mettre à jour les informations principales ou supprimer l’événement.
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
    </PageContainer>
  );
}
