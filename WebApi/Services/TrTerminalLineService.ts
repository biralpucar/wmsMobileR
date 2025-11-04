import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { ITrTerminalLineService } from '../Interfaces/ITrTerminalLineService';
import { ApiResponse } from '../Models/ApiResponse';
import { TrTerminalLineDto, CreateTrTerminalLineDto, UpdateTrTerminalLineDto } from '../Models/TrTerminalLineDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/TrTerminalLine",
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

export class TrTerminalLineService implements ITrTerminalLineService {
  async getAll(): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrTerminalLineDto[]>(error, 'TrTerminalLineService');
    }
  }

  async getById(id: number): Promise<ApiResponse<TrTerminalLineDto>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByLineId(lineId: number): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto[]>>(`/by-line-id/${lineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByRouteId(routeId: number): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto[]>>(`/by-route-id/${routeId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByUserId(userId: string): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto[]>>(`/by-user-id/${encodeURIComponent(userId)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByTerminalCode(terminalCode: string): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto[]>>(`/by-terminal-code/${encodeURIComponent(terminalCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto[]>>(`/by-date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByStatus(status: string): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto[]>>(`/by-status/${encodeURIComponent(status)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getActive(): Promise<ApiResponse<TrTerminalLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrTerminalLineDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateTrTerminalLineDto): Promise<ApiResponse<TrTerminalLineDto>> {
    try {
      const response = await api.post<ApiResponse<TrTerminalLineDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateTrTerminalLineDto): Promise<ApiResponse<TrTerminalLineDto>> {
    try {
      const response = await api.put<ApiResponse<TrTerminalLineDto>>(`/${id}`, updateDto);
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


