import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ITrLineService } from '../Interfaces/ITrLineService';
import { ApiResponse } from '../Models/ApiResponse';
import { TrLineDto, CreateTrLineDto, UpdateTrLineDto } from '../Models/TrLineDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/TrLine",
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

export class TrLineService implements ITrLineService {
  async getAll(): Promise<ApiResponse<TrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrLineDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<TrLineDto>> {
    try {
      const response = await api.get<ApiResponse<TrLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<TrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrLineDto[]>>(`/by-header-id/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<TrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrLineDto[]>>(`/by-stock-code/${encodeURIComponent(stockCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<TrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrLineDto[]>>(`/by-erp-order-no/${encodeURIComponent(erpOrderNo)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getActive(): Promise<ApiResponse<TrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrLineDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<TrLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrLineDto[]>>(`/by-quantity-range?minQuantity=${minQuantity}&maxQuantity=${maxQuantity}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateTrLineDto): Promise<ApiResponse<TrLineDto>> {
    try {
      const response = await api.post<ApiResponse<TrLineDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateTrLineDto): Promise<ApiResponse<TrLineDto>> {
    try {
      const response = await api.put<ApiResponse<TrLineDto>>(`/${id}`, updateDto);
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

