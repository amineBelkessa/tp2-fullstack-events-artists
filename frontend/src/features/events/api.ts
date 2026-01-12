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
   DÉTAIL D'UN ÉVÉNEMENT
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

export async function createEvent(
  payload: CreateEventPayload
): Promise<Event> {
  const response = await apiClient.post("/events", payload);
  return response.data;
}

/* =========================
   MODIFICATION (sans artistes)
========================= */
export async function updateEvent(
  id: string,
  payload: EventUpdatePayload
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

/* =========================
   GESTION DES ARTISTES
   ✅ CORRIGÉ : artistId doit être un UUID string
========================= */
export async function linkArtistToEvent(
  eventId: string,
  artistId: string
): Promise<void> {
  // ✅ L'API attend : POST /events/{eventId}/artists/{artistId}
  await apiClient.post(`/events/${eventId}/artists/${artistId}`, {});
}

export async function unlinkArtistFromEvent(
  eventId: string,
  artistId: string
): Promise<void> {
  // ✅ L'API attend : DELETE /events/{eventId}/artists/{artistId}
  await apiClient.delete(`/events/${eventId}/artists/${artistId}`);
}