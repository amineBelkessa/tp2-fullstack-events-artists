import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchEvents } from "./api";
import EventCard from "./EventCard";
import { Button, Spinner } from "../../components/ui";
import PageContainer from "../../components/layout/PageContainer";

export default function EventsListPage() {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", page],
    queryFn: () => fetchEvents(page, 6), // 6 events par page
  });

  if (isLoading)
    return (
      <PageContainer>
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      </PageContainer>
    );

  if (error)
    return (
      <PageContainer>
        <p className="text-red-500">Impossible de charger les événements.</p>
      </PageContainer>
    );

  return (
    <PageContainer>
      <h2 className="text-3xl font-bold mb-6">Events</h2>

      {data?.content.map((ev) => (
        <EventCard key={ev.id} event={ev} />
      ))}

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          disabled={page >= (data?.totalPages ?? 1) - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </PageContainer>
  );
}
