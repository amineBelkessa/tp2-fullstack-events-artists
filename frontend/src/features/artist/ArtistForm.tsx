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
  const [touched, setTouched] = useState(false);

  const trimmedLabel = label.trim();
  const isInvalid =
    touched && (trimmedLabel.length === 0 || trimmedLabel.length < 3);

  const canSubmit = !loading && trimmedLabel.length >= 3;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);

    if (!canSubmit) return;

    await onSubmit({ label: trimmedLabel });
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
      {/* ===== LABEL ===== */}
      <div className="space-y-2">
        <label className="block text-xs uppercase tracking-[0.3em] text-white/60">
          Nom de l’artiste
        </label>

        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Ex : Nils Frahm"
          className={`
            w-full
            rounded-[18px]
            border
            bg-black/30
            px-5 py-4
            text-sm text-white
            outline-none
            transition
            placeholder:text-white/40
            ${
              isInvalid
                ? "border-red-400/60 focus:border-red-400"
                : "border-white/15 focus:border-white/40"
            }
          `}
        />

        <div className="min-h-[1.25rem] text-xs">
          {isInvalid ? (
            <p className="text-red-300">
              Le nom doit contenir au moins 3 caractères.
            </p>
          ) : (
            <p className="text-white/40">
              Utilise le nom de scène officiel.
            </p>
          )}
        </div>
      </div>

      {/* ===== ACTION ===== */}
      <div className="flex justify-end">
        <Button type="submit" disabled={!canSubmit}>
          {loading ? "Enregistrement…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
