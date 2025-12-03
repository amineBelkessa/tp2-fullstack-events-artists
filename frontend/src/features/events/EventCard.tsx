import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import type { Event } from "./types";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{event.label}</h3>

      <p className="text-sm text-gray-400">
        {event.startDate} → {event.endDate}
      </p>

      <div className="mt-2 flex gap-2 flex-wrap">
        {event.artists.map((artist) => (
          <Badge key={artist.id} color="blue">
            {artist.label}
          </Badge>
        ))}
      </div>

      {/* 🔥 Nouveau : lien vers détail */}
      <Link
        to={`/events/${event.id}`}
        className="text-blue-600 mt-3 inline-block hover:underline font-medium"
      >
        Voir détail →
      </Link>
    </Card>
  );
}
