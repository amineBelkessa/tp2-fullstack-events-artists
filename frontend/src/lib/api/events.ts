import { apiClient } from "../../lib/api/apiClient";
import type { Event, SpringPage, EventUpdatePayload } from "../../features/events/types";


/* =========================
   LISTE
========================= */
export async function fetchEvents(
  page: number,
  size: number
): Promise<SpringPage<Event>> {
  const res = await apiClient.get("/events", { params: { page, size } });
  return res.data;
}

/* =========================
   DETAIL
========================= */
export async function fetchEventById(id: string): Promise<Event> {
  const res = await apiClient.get(`/events/${id}`);
  return res.data;
}

/* =========================
   UPDATE ✅
========================= */
export async function updateEvent(
  id: string,
  payload: EventUpdatePayload
): Promise<Event> {
  const res = await apiClient.put(`/events/${id}`, payload);
  return res.data;
}

/* =========================
   DELETE
========================= */
export async function deleteEvent(id: string): Promise<void> {
  await apiClient.delete(`/events/${id}`);
}
