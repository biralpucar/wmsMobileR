import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { GoodsOpenOrdersHeaderDto, GoodsOpenOrdersLineDto } from '../types/GoodsReceipt';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - JWT token ekle
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('GoodsReceipt API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

export const GoodsReceiptService = {
  /**
   * Müşteri koduna göre açık sipariş başlıklarını getirir
   * @param customerCode Müşteri kodu
   */
  async getHeadersByCustomer(customerCode: string): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>> {
    try {
      const endpoint = `/GoodReciptFunctions/headers/customer/${customerCode}`;
      console.log('GoodsReceiptService - Get Headers - Full URL:', `${API_BASE_URL}${endpoint}`);
      
      const response = await apiClient.get<ApiResponse<GoodsOpenOrdersHeaderDto[]>>(endpoint);
      return response.data;
    } catch (error: any) {
      console.error('Get goods receipt headers error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Açık siparişler yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Sipariş numaralarına göre sipariş detaylarını getirir
   * @param orderNumbers Sipariş numaraları (virgülle ayrılmış CSV formatında, örn: "1001,1002,1003")
   */
  async getLinesByOrders(orderNumbers: string): Promise<ApiResponse<GoodsOpenOrdersLineDto[]>> {
    try {
      const endpoint = `/GoodReciptFunctions/lines/orders/${orderNumbers}`;
      console.log('GoodsReceiptService - Get Lines - Full URL:', `${API_BASE_URL}${endpoint}`);
      
      const response = await apiClient.get<ApiResponse<GoodsOpenOrdersLineDto[]>>(endpoint);
      return response.data;
    } catch (error: any) {
      console.error('Get goods receipt lines error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Sipariş detayları yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  }
};
