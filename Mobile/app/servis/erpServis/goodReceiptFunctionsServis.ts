// Good Receipt Functions API Servisi
// WMS depo mal kabul işlemleri için API çağrıları

// Interface'leri class dosyasından import et
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../baseUrl';
import {
  GoodsOpenOrdersHeader,
  GoodsOpenOrdersLine,
  GoodsOpenOrdersHeaderResponse,
  GoodsOpenOrdersLineResponse
} from '../erpClass/goodReceiptFunctionsClass';
import { parseArrayResponse, getApiErrorMessage } from '../utils/apiResponseParser';

/**
 * Müşteri koduna göre açık sipariş başlıklarını getirir
 * API Endpoint: GET /api/GoodReciptFunctions/headers/customer/{customerCode}
 * API Response: ApiResponse<List<GoodsOpenOrdersHeaderDto>>
 * @param customerCode - Müşteri kodu
 * @returns Promise<GoodsOpenOrdersHeaderResponse>
 */
export const getGoodsReceiptHeadersByCustomer = async (
  customerCode: string
): Promise<GoodsOpenOrdersHeaderResponse> => {
  try {
    console.log(`Müşteri kodu "${customerCode}" için açık sipariş başlıkları API'sine istek atılıyor...`);
    
    // Token'ı AsyncStorage'dan al
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.GOOD_RECEIPT_FUNCTIONS.HEADERS_BY_CUSTOMER}/${customerCode}`,
      {
        headers,
        timeout: 10000, // 10 saniye timeout
      }
    );

    console.log('API Response Status:', response.status);
    
    const rawData = response.data;
    console.log('API\'den gelen ham veri:', rawData);
    
    // API response formatı: ApiResponse<List<GoodsOpenOrdersHeaderDto>>
    const data = parseArrayResponse<GoodsOpenOrdersHeader>(rawData);
    
    if (data === null) {
      return {
        success: false,
        data: [],
        error: getApiErrorMessage(rawData)
      };
    }
    
    console.log('İşlenmiş veri sayısı:', data.length);
    
    return {
      success: true,
      data: data,
      message: `"${customerCode}" müşteri kodu için ${data.length} adet açık sipariş başlığı bulundu.`
    };

  } catch (error) {
    console.error('Açık sipariş başlıkları API hatası:', error);

    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
    };
  }
};

/**
 * Sipariş numaralarına göre açık sipariş satırlarını getirir
 * API Endpoint: GET /api/GoodReciptFunctions/lines/orders/{siparisNoCsv}
 * API Response: ApiResponse<List<GoodsOpenOrdersLineDto>>
 * @param siparisNoCsv - Virgülle ayrılmış sipariş numaraları (örn: "1001,1002,1003")
 * @returns Promise<GoodsOpenOrdersLineResponse>
 */
export const getGoodsReceiptLinesByOrders = async (
  siparisNoCsv: string
): Promise<GoodsOpenOrdersLineResponse> => {
  try {
    console.log(`Sipariş numaraları "${siparisNoCsv}" için açık sipariş satırları API'sine istek atılıyor...`);
    
    // Token'ı AsyncStorage'dan al
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(
      `${API_BASE_URL}${API_ENDPOINTS.GOOD_RECEIPT_FUNCTIONS.LINES_BY_ORDERS}/${siparisNoCsv}`,
      {
        headers,
        timeout: 10000, // 10 saniye timeout
      }
    );

    console.log('API Response Status:', response.status);
    
    const rawData = response.data;
    console.log('API\'den gelen ham veri:', rawData);
    
    // API response formatı: ApiResponse<List<GoodsOpenOrdersLineDto>>
    const data = parseArrayResponse<GoodsOpenOrdersLine>(rawData);
    
    if (data === null) {
      return {
        success: false,
        data: [],
        error: getApiErrorMessage(rawData)
      };
    }
    
    console.log('İşlenmiş veri sayısı:', data.length);
    
    return {
      success: true,
      data: data,
      message: `"${siparisNoCsv}" sipariş numaraları için ${data.length} adet açık sipariş satırı bulundu.`
    };

  } catch (error) {
    console.error('Açık sipariş satırları API hatası:', error);

    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
    };
  }
};

// Export default
export default {
  getGoodsReceiptHeadersByCustomer,
  getGoodsReceiptLinesByOrders,
};


