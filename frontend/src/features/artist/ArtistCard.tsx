import Card from "../../components/ui/Card";
import type { Artist } from "./types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="mb-4">
      <h3 className="text-lg font-semibold">{artist.label}</h3>
      {artist.description && (
        <p className="text-gray-400 mt-2">{artist.description}</p>
      )}
    </Card>
  );
}
