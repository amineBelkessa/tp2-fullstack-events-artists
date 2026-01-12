import { useState } from "react";
import { Button, Input } from "../../components/ui";

type EventFormValues = {
  label: string;
  startDate: string;
  endDate: string;
};

type Props = {
  initialValues?: EventFormValues;
  onSubmit: (values: EventFormValues) => Promise<void> | void;
  submitLabel?: string;
  loading?: boolean;
};

export default function EventForm({
  initialValues = {
    label: "",
    startDate: "",
    endDate: "",
  },
  onSubmit,
  submitLabel = "Enregistrer",
  loading = false,
}: Props) {
  const [values, setValues] = useState<EventFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!values.label.trim()) {
      setError("Le nom de l’événement est obligatoire.");
      return;
    }

    if (!values.startDate || !values.endDate) {
      setError("Les dates de début et de fin sont obligatoires.");
      return;
    }

    if (values.endDate < values.startDate) {
      setError("La date de fin doit être postérieure à la date de début.");
      return;
    }

    await onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-10
        rounded-[40px]
        border border-white/15
        bg-white/5
        p-12
        backdrop-blur-2xl
      "
    >
      <div className="space-y-6">
        <Input
          label="Nom de l’événement"
          name="label"
          value={values.label}
          onChange={handleChange}
          placeholder="Hellfest 2025"
          required
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Date de début"
            type="date"
            name="startDate"
            value={values.startDate}
            onChange={handleChange}
            required
          />

          <Input
            label="Date de fin"
            type="date"
            name="endDate"
            value={values.endDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="pt-6 flex items-center justify-end gap-6">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? "Enregistrement…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
