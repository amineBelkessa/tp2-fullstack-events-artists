import { apiClient } from "../../lib/api/apiClient";
import type { Event, SpringPage } from "./types";

export async function fetchEvents(page: number, size: number) {
  return Promise.resolve({
    content: [
      {
        id: 1,
        label: "Concert Ambient",
        place: "Paris",
        startDate: "2025-06-20",
        endDate: "2025-06-20",
        artists: [
          { id: 1, label: "Nils Frahm" },
          { id: 2, label: "Rival Consoles" },
        ],
      },
      {
        id: 2,
        label: "Live Electronica",
        place: "Berlin",
        startDate: "2025-07-04",
        endDate: "2025-07-04",
        artists: [
          { id: 3, label: "Ben Böhmer" },
        ],
      },
      {
        id: 3,
        label: "Minimal Night",
        place: "Amsterdam",
        startDate: "2025-08-12",
        endDate: "2025-08-12",
        artists: [],
      },
    ],
    totalPages: 1,
    totalElements: 3,
  });
}


// DÉTAIL D’UN ÉVÉNEMENT
export async function fetchEventById(id: string): Promise<Event> {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
}
