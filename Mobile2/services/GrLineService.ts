import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/apiConfig';
import { ApiResponse } from '../types/ApiResponse';
import { GrLineDto, CreateGrLineDto, UpdateGrLineDto } from '../types/GrLine';

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
  console.log('GrLine API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

export const GrLineService = {
  /**
   * Tüm GrLine kayıtlarını getirir
   */
  async getAll(): Promise<ApiResponse<GrLineDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<GrLineDto[]>>('/GrLine');
      return response.data;
    } catch (error: any) {
      console.error('Get all GrLines error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Satırlar yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * ID'ye göre GrLine kaydını getirir
   */
  async getById(id: number): Promise<ApiResponse<GrLineDto | null>> {
    try {
      const response = await apiClient.get<ApiResponse<GrLineDto>>(`/GrLine/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Get GrLine by id error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Satır yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Header ID'ye göre GrLine kayıtlarını getirir
   */
  async getByHeaderId(headerId: number): Promise<ApiResponse<GrLineDto[]>> {
    try {
      const response = await apiClient.get<ApiResponse<GrLineDto[]>>(
        `/GrLine/by-header/${headerId}`
      );
      return response.data;
    } catch (error: any) {
      console.error('Get GrLines by header id error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Satırlar yüklenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Yeni GrLine kaydı oluşturur
   */
  async create(createDto: CreateGrLineDto): Promise<ApiResponse<GrLineDto>> {
    try {
      const response = await apiClient.post<ApiResponse<GrLineDto>>('/GrLine', createDto);
      return response.data;
    } catch (error: any) {
      console.error('Create GrLine error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Satır oluşturulamadı',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * Birden fazla GrLine kaydı oluşturur (batch create)
   */
  async createBatch(createDtos: CreateGrLineDto[]): Promise<ApiResponse<GrLineDto[]>> {
    try {
      const promises = createDtos.map(dto => this.create(dto));
      const results = await Promise.all(promises);
      
      const allSuccess = results.every(r => r.success);
      const createdLines = results
        .filter(r => r.success && r.data)
        .map(r => r.data!) as GrLineDto[];

      if (allSuccess) {
        return {
          success: true,
          message: `${createdLines.length} satır başarıyla oluşturuldu`,
          statusCode: 200,
          data: createdLines
        };
      } else {
        const failedCount = results.filter(r => !r.success).length;
        return {
          success: false,
          message: `${createdLines.length} satır oluşturuldu, ${failedCount} satır oluşturulamadı`,
          statusCode: 207, // Multi-Status
          data: createdLines
        };
      }
    } catch (error: any) {
      console.error('Batch create GrLines error:', error);
      return {
        success: false,
        message: error.message || 'Toplu satır oluşturulamadı',
        statusCode: 500,
        data: undefined
      };
    }
  },

  /**
   * Mevcut GrLine kaydını günceller
   */
  async update(id: number, updateDto: UpdateGrLineDto): Promise<ApiResponse<GrLineDto>> {
    try {
      const response = await apiClient.put<ApiResponse<GrLineDto>>(
        `/GrLine/${id}`,
        updateDto
      );
      return response.data;
    } catch (error: any) {
      console.error('Update GrLine error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Satır güncellenemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  },

  /**
   * GrLine kaydını soft delete yapar
   */
  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await apiClient.delete<ApiResponse<boolean>>(`/GrLine/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Delete GrLine error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Satır silinemedi',
        statusCode: error.response?.status || 500,
        data: undefined
      };
    }
  }
};
