

export type Artist = {
  id: string;
  label: string;      // Nom de l’artiste
  description?: string;
  country?: string;
};

// Pagination Spring Boot
export type SpringPage<T> = {
  content: T[];
  totalPages: number;
  number: number;       // page actuelle
  size: number;
  totalElements: number;
};
