export const ENDPOINTS = {
  EVENTS: "/events",
  EVENT_BY_ID: (id: string | number) => `/events/${id}`,

  ARTISTS: "/artists",
  ARTIST_BY_ID: (id: string | number) => `/artists/${id}`,
};
