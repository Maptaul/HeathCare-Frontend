export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta: Meta;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
