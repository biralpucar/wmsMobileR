import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ITrRouteService } from '../Interfaces/ITrRouteService';
import { ApiResponse } from '../Models/ApiResponse';
import { TrRouteDto, CreateTrRouteDto, UpdateTrRouteDto } from '../Models/TrRouteDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/TrRoute",
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

export class TrRouteService implements ITrRouteService {
  async getAll(): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<TrRouteDto>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>(`/by-line-id/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>(`/by-stock-code/${encodeURIComponent(stockCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getBySerialNo(serialNo: string): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>(`/by-serial-no/${encodeURIComponent(serialNo)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getBySourceWarehouse(sourceWarehouse: string): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>(`/by-source-warehouse/${encodeURIComponent(sourceWarehouse)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByTargetWarehouse(targetWarehouse: string): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>(`/by-target-warehouse/${encodeURIComponent(targetWarehouse)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getActive(): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<TrRouteDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrRouteDto[]>>(`/by-quantity-range?minQuantity=${minQuantity}&maxQuantity=${maxQuantity}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateTrRouteDto): Promise<ApiResponse<TrRouteDto>> {
    try {
      const response = await api.post<ApiResponse<TrRouteDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateTrRouteDto): Promise<ApiResponse<TrRouteDto>> {
    try {
      const response = await api.put<ApiResponse<TrRouteDto>>(`/${id}`, updateDto);
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

