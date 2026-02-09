// Реэкспорт всех типов
export * from './auth.types';
// export * from './game.types';
// export * from './user.types';
// export * from './api.types';

// Общие типы
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}