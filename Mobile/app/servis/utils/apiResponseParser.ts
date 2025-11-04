/**
 * API Response Parser Utility
 * Tüm servislerde kullanılacak ortak parse fonksiyonları
 * 
 * API Formatı:
 * {
 *   "Success": true/false,
 *   "Message": "string",
 *   "Data": T,  // List<T> için direkt array, tek obje için obje
 *   "StatusCode": 200,
 *   "ExceptionMessage": "string",
 *   "Errors": ["string"],
 *   "Timestamp": "2025-01-XX...",
 *   "ClassName": "ApiResponse<...>"
 * }
 */

export interface ApiResponse<T> {
  Success: boolean;
  Message: string;
  Data?: T;
  StatusCode: number;
  ExceptionMessage?: string;
  Errors?: string[];
  Timestamp?: string;
  ClassName?: string;
}

/**
 * API'den gelen response'un başarılı olup olmadığını kontrol eder
 */
export function isApiResponseSuccess(rawData: any): boolean {
  return rawData && rawData.Success === true;
}

/**
 * API response'dan hata mesajını alır
 */
export function getApiErrorMessage(rawData: any): string {
  if (!rawData) return 'Bilinmeyen hata';
  
  if (rawData.Message) return rawData.Message;
  if (rawData.ExceptionMessage) return rawData.ExceptionMessage;
  if (rawData.error) return rawData.error;
  if (rawData.Errors && Array.isArray(rawData.Errors) && rawData.Errors.length > 0) {
    return rawData.Errors.join(', ');
  }
  
  return 'Bilinmeyen hata';
}

/**
 * API'den gelen array response'u parse eder
 * API ApiResponse<List<T>> formatında döndürüyor: { Success: true, Data: [...] }
 * @param rawData - API'den gelen ham response
 * @returns Parsed data array veya null
 */
export function parseArrayResponse<T>(rawData: any): T[] | null {
  if (!rawData || typeof rawData !== 'object') {
    console.error('Invalid response format:', rawData);
    return null;
  }

  // ApiResponse<List<T>> formatı - Data direkt array
  if (rawData.Success && rawData.Data !== undefined) {
    // Data direkt array ise (API'nin standart formatı)
    if (Array.isArray(rawData.Data)) {
      return rawData.Data;
    }
    
    // Eski format yedek: Data.Items (artık kullanılmıyor ama yedekte tutuyoruz)
    if (rawData.Data && typeof rawData.Data === 'object' && Array.isArray(rawData.Data.Items)) {
      console.warn('Using deprecated Data.Items format');
      return rawData.Data.Items;
    }
    
    // Data tek obje ise, array'e çevir (nadir durum)
    if (rawData.Data && typeof rawData.Data === 'object' && !Array.isArray(rawData.Data)) {
      console.warn('Single object returned, converting to array');
      return [rawData.Data as T];
    }
  }

  // Direkt array gelmişse (API hatası olabilir ama handle et)
  if (Array.isArray(rawData)) {
    console.warn('Direct array received (non-standard API response)');
    return rawData;
  }

  console.error('Unable to parse array response:', rawData);
  return null;
}

/**
 * API'den gelen tek obje response'unu parse eder
 * API ApiResponse<T> formatında döndürüyor: { Success: true, Data: {...} }
 * @param rawData - API'den gelen ham response
 * @returns Parsed data obje veya null
 */
export function parseObjectResponse<T>(rawData: any): T | null {
  if (!rawData || typeof rawData !== 'object') {
    console.error('Invalid response format:', rawData);
    return null;
  }

  // ApiResponse<T> formatı
  if (rawData.Success && rawData.Data !== undefined) {
    return rawData.Data as T;
  }

  // Direkt obje gelmişse (API hatası olabilir ama handle et)
  if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
    // Success field'ı yoksa direkt obje olarak kabul et
    if (!rawData.Success) {
      console.warn('Direct object received (non-standard API response)');
      return rawData as T;
    }
  }

  console.error('Unable to parse object response:', rawData);
  return null;
}

/**
 * API response'un tamamını parse eder ve standart format döndürür
 */
export function parseApiResponse<T>(rawData: any): {
  success: boolean;
  data: T | null;
  message: string;
  error?: string;
} {
  if (!rawData) {
    return {
      success: false,
      data: null,
      message: 'Empty response received',
      error: 'Empty response'
    };
  }

  const isSuccess = isApiResponseSuccess(rawData);
  const message = rawData.Message || '';
  const error = getApiErrorMessage(rawData);

  // Data'yı parse et
  let data: T | null = null;
  
  if (isSuccess && rawData.Data !== undefined) {
    if (Array.isArray(rawData.Data)) {
      data = rawData.Data as T;
    } else if (rawData.Data && typeof rawData.Data === 'object') {
      data = rawData.Data as T;
    } else {
      data = rawData.Data as T;
    }
  }

  return {
    success: isSuccess,
    data,
    message,
    error: isSuccess ? undefined : error
  };
}

