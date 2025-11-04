import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { LoginRequest, LoginResponse, UserDto } from '../types/Auth';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 saniye timeout
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

export const AuthService = {
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      const request: LoginRequest = { Email: email, Password: password };
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        API_ENDPOINTS.AUTH.LOGIN,
        request
      );
      
      // Token'ı kaydet
      if (response.data.data?.token) {
        await AsyncStorage.setItem('jwt_token', response.data.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        config: { url: error.config?.url, method: error.config?.method }
      });
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },
  
  async logout(): Promise<void> {
    await AsyncStorage.removeItem('jwt_token');
    await AsyncStorage.removeItem('user');
  },
  
  async getStoredUser(): Promise<UserDto | null> {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async getProfile(): Promise<ApiResponse<UserDto>> {
    try {
      const response = await apiClient.get<ApiResponse<UserDto>>(API_ENDPOINTS.AUTH.USER);
      
      // User bilgisini kaydet
      if (response.data.data) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Profile get failed',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  }
};

