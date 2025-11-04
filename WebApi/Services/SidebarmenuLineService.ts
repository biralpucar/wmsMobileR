import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { ISidebarmenuLineService } from '../Interfaces/ISidebarmenuLineService';
import { ApiResponse } from '../Models/ApiResponse';
import { SidebarmenuLineDto, CreateSidebarmenuLineDto, UpdateSidebarmenuLineDto } from '../Models/SidebarmenuLineDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/SidebarmenuLine",
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

export class SidebarmenuLineService implements ISidebarmenuLineService {
  async getAll(): Promise<ApiResponse<SidebarmenuLineDto[]>> {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<SidebarmenuLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SidebarmenuLineDto>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateSidebarmenuLineDto): Promise<ApiResponse<SidebarmenuLineDto>> {
    try {
      const response = await api.post<ApiResponse<SidebarmenuLineDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateSidebarmenuLineDto): Promise<ApiResponse<SidebarmenuLineDto>> {
    try {
      const response = await api.put<ApiResponse<SidebarmenuLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}/soft`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async exists(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.get<ApiResponse<boolean>>(`/${id}/exists`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<SidebarmenuLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuLineDto[]>>(`/by-header-id/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByPage(page: string): Promise<ApiResponse<SidebarmenuLineDto>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuLineDto>>(`/by-page/${encodeURIComponent(page)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }
}



