import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { MobilemenuHeaderDto, MobilemenuLineDto } from '../types/Menu';

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
  console.log('Menu API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

export const MenuService = {
  async getActiveMenus(): Promise<ApiResponse<MobilemenuHeaderDto[]>> {
    try {
      // Backend route: api/[controller] = api/MobilemenuHeader, endpoint: /active
      const endpoint = '/MobilemenuHeader/active';
      console.log('MenuService - Full URL:', `${API_BASE_URL}${endpoint}`);
      
      const response = await apiClient.get<ApiResponse<MobilemenuHeaderDto[]>>(endpoint);
      return response.data;
    } catch (error: any) {
      console.error('Get active menus error:', error);
      console.error('Error details:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        fullURL: `${error.config?.baseURL}${error.config?.url}`,
        status: error.response?.status
      });
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Menü yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  async getMenuLinesByHeaderId(headerId: number): Promise<ApiResponse<MobilemenuLineDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<MobilemenuLineDto[]>>(
        `/MobilemenuLine/by-header/${headerId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get menu lines error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Menü satırları yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  async getUserMenuGroups(userId: number): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiClient.get<ApiResponse<any[]>>(
        `/MobileUserGroupMatch/by-user/${userId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get user menu groups error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Kullanıcı menü grupları yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  }
};
