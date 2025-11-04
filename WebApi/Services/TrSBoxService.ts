import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { ITrSBoxService } from '../Interfaces/ITrSBoxService';
import { ApiResponse } from '../Models/ApiResponse';
import { TrSBoxDto, CreateTrSBoxDto, UpdateTrSBoxDto } from '../Models/TrSBoxDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/TrSBox",
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

export class TrSBoxService implements ITrSBoxService {
  async getAll(): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrSBoxDto[]>(error, 'TrSBoxService');
    }
  }

  async getById(id: number): Promise<ApiResponse<TrSBoxDto>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByImportLineId(importLineId: number): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto[]>>(`/by-import-line-id/${importLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByBoxId(boxId: number): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto[]>>(`/by-box-id/${boxId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getBySerialNumber(serialNumber: string): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto[]>>(`/by-serial-number/${encodeURIComponent(serialNumber)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto[]>>(`/by-serial-no/${encodeURIComponent(serialNo)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getActive(): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByDescription(description: string): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto[]>>(`/by-description/${encodeURIComponent(description)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async searchByDescription(description: string): Promise<ApiResponse<TrSBoxDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrSBoxDto[]>>(`/search-by-description/${encodeURIComponent(description)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateTrSBoxDto): Promise<ApiResponse<TrSBoxDto>> {
    try {
      const response = await api.post<ApiResponse<TrSBoxDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateTrSBoxDto): Promise<ApiResponse<TrSBoxDto>> {
    try {
      const response = await api.put<ApiResponse<TrSBoxDto>>(`/${id}`, updateDto);
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


