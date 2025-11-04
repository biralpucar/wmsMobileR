import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../Helpers/ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IGrHeaderService } from '../Interfaces/IGrHeaderService';
import { ApiResponse } from '../Models/ApiResponse';
import { GrHeaderDto, CreateGrHeaderDto, UpdateGrHeaderDto } from '../Models/GrHeaderDtos';
const api = axios.create({
  baseURL: API_BASE_URL + "/GrHeader",
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

export class GrHeaderService implements IGrHeaderService {
  async getAll(): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto>(error);
    }
  }

  async create(createDto: CreateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<GrHeaderDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<GrHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto>(error);
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

  async softDelete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}/soft`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async getByERPDocumentNo(erpDocumentNo: string): Promise<ApiResponse<GrHeaderDto>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto>>(`/by-erp-document/${erpDocumentNo}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto>(error);
    }
  }

  async getActive(): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>('/active');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getByBranchCode(branchCode: string): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>(`/by-branch/${branchCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getByCustomerCode(customerCode: string): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrHeaderDto[]>>(`/by-customer/${customerCode}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<GrHeaderDto[]>> {
    try {
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      const response = await api.get<ApiResponse<GrHeaderDto[]>>(`/by-date-range?${params.toString()}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrHeaderDto[]>(error);
    }
  }
}

