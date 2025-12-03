import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchEventById } from "./api";
import PageContainer from "../../components/layout/PageContainer";
import { Spinner, Badge } from "../../components/ui";

export default function EventDetailPage() {
  const { id } = useParams();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id!),
  });

  // LOADING
  if (isLoading)
    return (
      <PageContainer>
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      </PageContainer>
    );

  // ERROR
  if (error || !event)
    return (
      <PageContainer>
        <p className="text-red-500">Impossible de charger l’événement.</p>
      </PageContainer>
    );

  // SUCCESS 🎉 (ici event est garanti défini → PLUS D'ERREUR TYPESCRIPT)
  return (
    <PageContainer>
      <h2 className="text-3xl font-bold mb-4">{event.label}</h2>

      <p className="text-gray-500 mb-4">
        {event.startDate} → {event.endDate}
      </p>

      <h3 className="text-xl font-semibold">🎤 Artists</h3>

      <div className="flex gap-2 mt-2 flex-wrap">
        {event.artists.map((a) => (
          <Badge key={a.id} color="blue">
            {a.label}
          </Badge>
        ))}
      </div>
    </PageContainer>
  );
}
