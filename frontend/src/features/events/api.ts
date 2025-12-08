import { apiClient } from "../../lib/api/apiClient";
import type { Event, SpringPage } from "./types";

/* =========================
   LISTE DES ÉVÉNEMENTS
   ========================= */
export async function fetchEvents(
  page: number,
  size: number
): Promise<SpringPage<Event>> {
  const response = await apiClient.get("/events", {
    params: { page, size },
  });
  return response.data;
}

/* =========================
   DÉTAIL D’UN ÉVÉNEMENT ✅
   ========================= */
export async function fetchEventById(id: string): Promise<Event> {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
}

/* =========================
   CRÉATION
   ========================= */
export async function createEvent(payload: {
  label: string;
  startDate: string;
  endDate: string;
}): Promise<Event> {
  const response = await apiClient.post("/events", payload);
  return response.data;
}

/* =========================
   MODIFICATION
   ========================= */
export async function updateEvent(
  id: string,
  payload: {
    label: string;
    startDate: string;
    endDate: string;
  }
): Promise<Event> {
  const response = await apiClient.put(`/events/${id}`, payload);
  return response.data;
}

/* =========================
   SUPPRESSION
   ========================= */
export async function deleteEvent(id: string): Promise<void> {
  await apiClient.delete(`/events/${id}`);
}
