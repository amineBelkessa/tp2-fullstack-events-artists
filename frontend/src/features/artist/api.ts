import { apiClient } from "../../lib/api/apiClient";
import type { Artist, SpringPage } from "./types";

export async function fetchArtists(page = 0, size = 10): Promise<SpringPage<Artist>> {
  const res = await apiClient.get(`/artists?page=${page}&size=${size}`);
  return res.data;
}
