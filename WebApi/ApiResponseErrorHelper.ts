import { ApiResponse } from './Models/ApiResponse';

export class ApiResponseErrorHelper {
  static create<T>(error: any): ApiResponse<T> {
    return {
      success: false,
      message: error?.response?.data?.message || error?.message || 'Beklenmeyen bir hata oluştu',
      exceptionMessage: error?.message || '',
      data: undefined,
      errors: error?.response?.data?.errors || [],
      timestamp: new Date().toISOString(),
      statusCode: error?.response?.status || 500,
      className: 'ApiResponse'
    };
  }
}
