import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { GrHeaderDto, CreateGrHeaderDto, UpdateGrHeaderDto } from '../types/GrHeader';

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
  console.log('GrHeader API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

export const GrHeaderService = {
  /**
   * Tüm GrHeader kayıtlarını getirir
   */
  async getAll(): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<GrHeaderDto[]>>('/GrHeader');
      return response.data;
    } catch (error: any) {
      console.error('Get all GrHeaders error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Başlıklar yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * ID'ye göre GrHeader kaydını getirir
   */
  async getById(id: number): Promise<ApiResponse<GrHeaderDto | null>> {
    try {
      const response = await apiClient.get<ApiResponse<GrHeaderDto>>(`/GrHeader/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Get GrHeader by id error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Başlık yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Müşteri koduna göre GrHeader kayıtlarını getirir
   */
  async getByCustomerCode(customerCode: string): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<GrHeaderDto[]>>(
        `/GrHeader/by-customer/${customerCode}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get GrHeaders by customer code error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Başlıklar yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Aktif GrHeader kayıtlarını getirir
   */
  async getActive(): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<GrHeaderDto[]>>('/GrHeader/active');
      return response.data;
    } catch (error: any) {
      console.error('Get active GrHeaders error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Başlıklar yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Yeni GrHeader kaydı oluşturur
   */
  async create(createDto: CreateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await apiClient.post<ApiResponse<GrHeaderDto>>('/GrHeader', createDto);
      return response.data;
    } catch (error: any) {
      console.error('Create GrHeader error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Başlık oluşturulamadı',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Mevcut GrHeader kaydını günceller
   */
  async update(id: number, updateDto: UpdateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await apiClient.put<ApiResponse<GrHeaderDto>>(
        `/GrHeader/${id}`,
        updateDto
      );
      return response.data;
    } catch (error: any) {
      console.error('Update GrHeader error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Başlık güncellenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * GrHeader kaydını soft delete yapar
   */
  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await apiClient.delete<ApiResponse<boolean>>(`/GrHeader/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete GrHeader error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Başlık silinemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  }
};
