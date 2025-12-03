import { apiClient } from "../../lib/api/apiClient";
import type { Event, SpringPage } from "./types";

// LISTE PAGINÉE DES ÉVÉNEMENTS
export async function fetchEvents(page: number = 0, size: number = 10): Promise<SpringPage<Event>> {
  const response = await apiClient.get(`/events?page=${page}&size=${size}`);
  return response.data;
}

// DÉTAIL D’UN ÉVÉNEMENT
export async function fetchEventById(id: string): Promise<Event> {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
}
