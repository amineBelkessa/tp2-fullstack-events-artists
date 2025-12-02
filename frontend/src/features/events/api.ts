import { apiClient } from "../../lib/api/apiClient";
import type { Event, SpringPage } from "./types";


export async function fetchEvents(page: number = 0, size: number = 10): Promise<SpringPage<Event>> {
  const response = await apiClient.get(`/events?page=${page}&size=${size}`);
  return response.data;
}
