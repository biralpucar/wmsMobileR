import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { MobilemenuHeaderDto, MobilemenuLineDto, MobileUserGroupMatchDto } from '../types/Menu';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
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
  return config;
});

export const MenuService = {
  async getActiveMenus(): Promise<ApiResponse<MobilemenuHeaderDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<MobilemenuHeaderDto[]>>(
        API_ENDPOINTS.MENU.HEADER_ACTIVE
      );
      return response.data;
    } catch (error: any) {
      console.error('Get active menus error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Get menus failed',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  async getMenuLinesByHeaderId(headerId: number): Promise<ApiResponse<MobilemenuLineDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<MobilemenuLineDto[]>>(
        `${API_ENDPOINTS.MENU.LINE_BY_HEADER}/${headerId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get menu lines error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Get menu lines failed',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  async getUserMenuGroups(userId: number): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<MobileUserGroupMatchDto[]>>(
        `${API_ENDPOINTS.MENU.USER_GROUP_BY_USER}/${userId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get user menu groups error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Get user menu groups failed',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  }
};


