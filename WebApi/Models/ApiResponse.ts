export interface ApiResponse<T> {
  success: boolean;
  message: string;
  exceptionMessage: string;
  data?: T;
  errors: string[];
  timestamp: string;
  statusCode: number;
  className: string;
}

export interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Helper functions for creating API responses
export class ApiResponseHelper {
  static successResult<T>(data: T, message: string): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      statusCode: 200,
      className: `ApiResponse<${typeof data}>`,
      exceptionMessage: '',
      errors: [],
      timestamp: new Date().toISOString()
    };
  }

  static errorResult<T>(
    message: string, 
    errors?: string[], 
    statusCode: number = 500, 
    exceptionMessage?: string
  ): ApiResponse<T> {
    return {
      success: false,
      message,
      errors: errors || [],
      exceptionMessage: exceptionMessage || '',
      statusCode,
      className: `ApiResponse<T>`,
      data: undefined,
      timestamp: new Date().toISOString()
    };
  }
}