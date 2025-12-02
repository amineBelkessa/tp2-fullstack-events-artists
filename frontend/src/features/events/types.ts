export type Event = {
  id: number;
  label: string;
  startDate: string;
  endDate: string;
  artists: {
    id: string;
    label: string;
  }[];
};

// Pagination Spring Boot
export type SpringPage<T> = {
  content: T[];
  totalPages: number;
  number: number; // page actuelle
  size: number;
  totalElements: number;
};
