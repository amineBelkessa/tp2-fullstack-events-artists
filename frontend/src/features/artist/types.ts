export type Artist = {
  id: number;
  label: string;
  description?: string;
};

export type SpringPage<T> = {
  content: T[];
  totalPages: number;
  number: number;
  size: number;
  totalElements: number;
};
