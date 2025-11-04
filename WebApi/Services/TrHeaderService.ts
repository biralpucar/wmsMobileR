import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ITrHeaderService } from '../Interfaces/ITrHeaderService';
import { ApiResponse } from '../Models/ApiResponse';
import { TrHeaderDto, CreateTrHeaderDto, UpdateTrHeaderDto } from '../Models/TrHeaderDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/TrHeader",
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

export class TrHeaderService implements ITrHeaderService {
  async getAll(): Promise<ApiResponse<TrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrHeaderDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<TrHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<TrHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto>(error);
    }
  }

  async create(createDto: CreateTrHeaderDto): Promise<ApiResponse<TrHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<TrHeaderDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateTrHeaderDto): Promise<ApiResponse<TrHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<TrHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto>(error);
    }
  }

  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<TrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrHeaderDto[]>>(`/by-branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<TrHeaderDto[]>> {
    try {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      const response = await api.get<ApiResponse<TrHeaderDto[]>>(`/by-date-range?${params.toString()}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto[]>(error);
    }
  }

  async getActive(): Promise<ApiResponse<TrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrHeaderDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<TrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrHeaderDto[]>>(`/by-customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto[]>(error);
    }
  }

  async getByDocumentType(documentType: string): Promise<ApiResponse<TrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<TrHeaderDto[]>>(`/by-document-type/${documentType}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TrHeaderDto[]>(error);
    }
  }
}

