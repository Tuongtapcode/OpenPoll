// Global shared types

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface IBaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
