import { apiClient } from "../../lib/api/apiClient";
import type { Artist, SpringPage } from "./types";

/* =========================
   LISTE DES ARTISTES
   ========================= */
export async function fetchArtists(
  page: number,
  size: number
): Promise<SpringPage<Artist>> {
  const response = await apiClient.get("/artists", {
    params: { page, size },
  });

  return response.data;
}

/* =========================
   DÉTAIL D’UN ARTISTE
   ========================= */
export async function fetchArtistById(id: string): Promise<Artist> {
  const response = await apiClient.get(`/artists/${id}`);
  return response.data;
}

/* =========================
   CRÉATION
   ========================= */
export async function createArtist(payload: {
  label: string;
  description?: string;
  country?: string;
}): Promise<Artist> {
  const response = await apiClient.post("/artists", payload);
  return response.data;
}

/* =========================
   MODIFICATION
   ========================= */
export async function updateArtist(
  id: string,
  payload: {
    label: string;
    description?: string;
    country?: string;
  }
): Promise<Artist> {
  const response = await apiClient.put(`/artists/${id}`, payload);
  return response.data;
}

/* =========================
   SUPPRESSION
   ========================= */
export async function deleteArtist(id: string): Promise<void> {
  await apiClient.delete(`/artists/${id}`);
}
