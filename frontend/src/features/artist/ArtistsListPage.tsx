import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchArtists } from "./api";
import ArtistCard from "./ArtistCard";
import PageContainer from "../../components/layout/PageContainer";
import { Button, Spinner } from "../../components/ui";

export default function ArtistsListPage() {
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["artists", page],
    queryFn: () => fetchArtists(page, 6),
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
        <p className="text-red-500">Impossible de charger les artistes.</p>
      </PageContainer>
    );

  return (
    <PageContainer>
      <h2 className="text-3xl font-bold mb-6">Artists</h2>

      {data?.content.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
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
