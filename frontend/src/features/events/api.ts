// frontend/src/features/events/api.ts

import { apiClient } from "../../lib/api/apiClient";
import type { Event, SpringPage, EventUpdatePayload } from "./types";

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
   DÉTAIL D’UN ÉVÉNEMENT
========================= */
export async function fetchEventById(id: string): Promise<Event> {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
}

/* =========================
   CRÉATION
========================= */
export type CreateEventPayload = {
  label: string;
  startDate: string;
  endDate: string;
};
export type UpdateEventPayload = {
  label: string;
  startDate: string;
  endDate: string;
  artistIds?: string[]; // ✅ STRING[]
};


export async function createEvent(
  payload: CreateEventPayload
): Promise<Event> {
  const response = await apiClient.post("/events", payload);
  return response.data;
}

/* =========================
   MODIFICATION ✅ (avec artistes)
========================= */
export async function updateEvent(
  id: string,
  payload: EventUpdatePayload // ✅ importé depuis types
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
