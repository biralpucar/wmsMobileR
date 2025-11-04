import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { ITrImportLineService } from '../Interfaces/ITrImportLineService';
import { ApiResponse } from '../Models/ApiResponse';
import { TrImportLineDto, CreateTrImportLineDto, UpdateTrImportLineDto } from '../Models/TrImportLineDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/TrImportLine",
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

export class TrImportLineService implements ITrImportLineService {
  async getAll(): Promise<ApiResponse<TrImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto[]>> ('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<TrImportLineDto>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto>(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<TrImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto[]>>(`/by-line-id/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto[]>(error);
    }
  }

  async getByRouteId(routeId: number): Promise<ApiResponse<TrImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto[]>>(`/by-route-id/${routeId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto[]>(error);
    }
  }

  async getByStockCode(stockCode: string): Promise<ApiResponse<TrImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto[]>>(`/by-stock-code/${encodeURIComponent(stockCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto[]>(error);
    }
  }

  async getByCellCode(cellCode: string): Promise<ApiResponse<TrImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto[]>>(`/by-cell-code/${encodeURIComponent(cellCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto[]>(error);
    }
  }

  async getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<TrImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto[]>>(`/by-erp-order-no/${encodeURIComponent(erpOrderNo)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto[]>(error);
    }
  }

  async getActive(): Promise<ApiResponse<TrImportLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrImportLineDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto[]>(error);
    }
  }

  async create(createDto: CreateTrImportLineDto): Promise<ApiResponse<TrImportLineDto>> {
    try {
      const response = await api.post<ApiResponse<TrImportLineDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateTrImportLineDto): Promise<ApiResponse<TrImportLineDto>> {
    try {
      const response = await api.put<ApiResponse<TrImportLineDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrImportLineDto>(error);
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
}


