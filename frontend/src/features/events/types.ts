export type Artist = {
  id: number;
  label: string;
};

export type Event = {
  id: string; // 
  label: string;
  startDate: string;
  place: string;
  endDate: string;
  artists: {
    id: string;
    label: string;
  }[];
};

// Pagination Spring Boot (version minimale et correcte)
export type SpringPage<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
};
