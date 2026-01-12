// frontend/src/features/events/types.ts

/* ========= ARTIST ========= */
export type Artist = {
  id: number;        // ✅ CORRIGÉ : number (cohérent partout)
  label: string;
};

/* ========= EVENT ========= */
export type Event = {
  id: string;        // ✅ Event reste string (UUID / String backend)
  label: string;
  startDate: string;
  endDate: string;
  place: string;
  artists: Artist[]; // ✅ artistes avec id:number
};

/* ========= UPDATE PAYLOAD ========= */
export type EventUpdatePayload = {
  label: string;
  startDate: string;
  endDate: string;
  artistIds?: number[];
};

/* ========= PAGINATION ========= */
export type SpringPage<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
};
