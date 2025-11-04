import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { IGrImportLService } from '../Interfaces/IGrImportLService';
import { ApiResponse } from '../Models/ApiResponse';
import { GrImportLDto, CreateGrImportLDto, UpdateGrImportLDto } from '../Models/GrImportLDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrImportL",
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config : AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class GrImportLService implements IGrImportLService {
  
  async getAll(): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrImportLDto>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto>(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>(`/by-header-id/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>(`/by-line-id/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>(`/by-stock-code/${encodeURIComponent(stockCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }

  async create(createDto: CreateGrImportLDto): Promise<ApiResponse<GrImportLDto>> {
    try {
      const response = await api.post<ApiResponse<GrImportLDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrImportLDto): Promise<ApiResponse<GrImportLDto>> {
    try {
      const response = await api.put<ApiResponse<GrImportLDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto>(error);
    }
  }

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}/soft`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    } 
  }

  async getActive(): Promise<ApiResponse<GrImportLDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportLDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportLDto[]>(error);
    }
  }
}


