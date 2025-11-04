import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { LoginRequest, LoginResponse, UserDto } from '../types/Auth';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 saniye timeout (artırıldı)
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
  console.log('API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Response interceptor - hata loglama
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.message);
    return Promise.reject(error);
  }
);

export const AuthService = {
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      console.log('Login attempt:', { email, url: `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}` });
      
      const request: LoginRequest = { Email: email, Password: password };
      const response = await apiClient.post<ApiResponse<LoginResponse>>(
        API_ENDPOINTS.AUTH.LOGIN,
        request
      );
      
      console.log('Login response:', response.status);
      
      // Token'ı kaydet
      if (response.data.data?.token) {
        await AsyncStorage.setItem('jwt_token', response.data.data.token);
        if (response.data.data.user) {
          await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
        }
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Timeout hatası için özel mesaj
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        return {
          success: false,
          message: 'Bağlantı zaman aşımına uğradı. API sunucusunun çalıştığından emin olun.',
          statusCode: 408,
          data: undefined
        };
      }
      
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
    try {
      const userStr = await AsyncStorage.getItem('user');
      if (!userStr || userStr === 'undefined' || userStr === 'null') {
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
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
