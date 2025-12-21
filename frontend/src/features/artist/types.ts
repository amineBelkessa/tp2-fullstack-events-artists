import type { Event } from "../events/types";

export type Artist = {
  id: string;          // ✅ STRING
  label: string;
  events?: Event[];
};

export type ArtistUpdatePayload = {
  label: string;
  eventIds?: string[]; // ✅ STRING[]
};

export type SpringPage<T> = {
  content: T[];
  totalPages: number;
  number: number;
  size: number;
  totalElements: number;
};

// (optionnel, si utilisé ailleurs)
export type ArtistEvent = {
  id: string;          // ✅ cohérent avec Event.id
  label: string;
  startDate: string;
  endDate: string;
};

