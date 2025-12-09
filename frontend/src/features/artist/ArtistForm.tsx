import { useState } from "react";
import { Button } from "../../components/ui";

type ArtistFormValues = {
  label: string;
};

type ArtistFormProps = {
  initialValues?: ArtistFormValues;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: ArtistFormValues) => void | Promise<void>;
};

export default function ArtistForm({
  initialValues,
  submitLabel,
  loading = false,
  onSubmit,
}: ArtistFormProps) {
  const [label, setLabel] = useState(initialValues?.label ?? "");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!label.trim()) {
      setError("Le nom de l’artiste est obligatoire.");
      return;
    }

    setError(null);
    await onSubmit({ label });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        max-w-2xl
        space-y-10
        rounded-[32px]
        border border-white/10
        bg-white/5
        px-10 py-12
        backdrop-blur-xl
      "
    >
      {/* ===== ERROR ===== */}
      {error && (
        <div
          className="
            rounded-[20px]
            border border-red-400/30
            bg-red-400/10
            px-6 py-4
            text-sm text-red-100
          "
        >
          {error}
        </div>
      )}

      {/* ===== LABEL ===== */}
      <div>
        <label className="mb-3 block text-xs uppercase tracking-[0.3em] text-white/60">
          Nom de l’artiste
        </label>

        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Ex : Nils Frahm"
          className="
            w-full
            rounded-[18px]
            border border-white/15
            bg-black/30
            px-5 py-4
            text-sm text-white
            outline-none
            transition
            placeholder:text-white/40
            focus:border-white/40
          "
        />
      </div>

      {/* ===== ACTION ===== */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
