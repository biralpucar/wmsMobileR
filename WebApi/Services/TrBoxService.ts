import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ITrBoxService } from '../Interfaces/ITrBoxService';
import { ApiResponse } from '../Models/ApiResponse';
import { TrBoxDto, CreateTrBoxDto, UpdateTrBoxDto } from '../Models/TrBoxDtos';
const api = axios.create({
  baseURL: API_BASE_URL + "/TrBox",
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

export class TrBoxService implements ITrBoxService {
  async getAll(): Promise<ApiResponse<TrBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrBoxDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<TrBoxDto>> {
    try {
      const response = await api.get<ApiResponse<TrBoxDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByImportLineId(importLineId: number): Promise<ApiResponse<TrBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrBoxDto[]>>(`/by-import-line-id/${importLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByBoxNumber(boxNumber: string): Promise<ApiResponse<TrBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrBoxDto[]>>(`/by-box-number/${encodeURIComponent(boxNumber)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getActive(): Promise<ApiResponse<TrBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrBoxDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByDescription(description: string): Promise<ApiResponse<TrBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrBoxDto[]>>(`/by-description/${encodeURIComponent(description)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateTrBoxDto): Promise<ApiResponse<TrBoxDto>> {
    try {
      const response = await api.post<ApiResponse<TrBoxDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateTrBoxDto): Promise<ApiResponse<TrBoxDto>> {
    try {
      const response = await api.put<ApiResponse<TrBoxDto>>(`/${id}`, updateDto);
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
}


