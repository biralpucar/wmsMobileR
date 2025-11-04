// ApiResponse tipi - Backend ile uyumlu (camelCase serialization)
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
  exceptionMessage?: string;
  errors?: string[];
  timestamp?: string;
  className?: string;
}

