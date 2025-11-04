import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { CustomerDto } from '../types/Customer';

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
  console.log('Customer API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

export const CustomerService = {
  /**
   * Tüm carileri getirir
   */
  async getCustomers(): Promise<ApiResponse<CustomerDto[]>> {
    try {
      const endpoint = '/Erp/getCari';
      console.log('CustomerService - Full URL:', `${API_BASE_URL}${endpoint}`);
      
      const response = await apiClient.get<ApiResponse<CustomerDto[]>>(endpoint);
      return response.data;
    } catch (error: any) {
      console.error('Get customers error:', error);
      console.error('Error details:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: `${error.config?.baseURL}${error.config?.url}`,
        status: error.response?.status
      });
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Cariler yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  }
};
