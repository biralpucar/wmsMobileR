import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { IPlatformPageGroupService } from '../Interfaces/IPlatformPageGroupService';
import { ApiResponse } from '../Models/ApiResponse';
import { PlatformPageGroupDto, CreatePlatformPageGroupDto, UpdatePlatformPageGroupDto } from '../Models/PlatformPageGroupDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/PlatformPageGroup",
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

export class PlatformPageGroupService implements IPlatformPageGroupService {
  async getAll(): Promise<ApiResponse<PlatformPageGroupDto[]>> {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<PlatformPageGroupDto>> {
    try {
      const response = await api.get<ApiResponse<PlatformPageGroupDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto>(error);
    }
  }

  async create(createDto: CreatePlatformPageGroupDto): Promise<ApiResponse<PlatformPageGroupDto>> {
    try {
      const response = await api.post<ApiResponse<PlatformPageGroupDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto>(error);
    }
  }

  async update(id: number, updateDto: UpdatePlatformPageGroupDto): Promise<ApiResponse<PlatformPageGroupDto>> {
    try {
      const response = await api.put<ApiResponse<PlatformPageGroupDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto>(error);
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

  async exists(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.get<ApiResponse<boolean>>(`/${id}/exists`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

  async getByGroupCode(groupCode: string): Promise<ApiResponse<PlatformPageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<PlatformPageGroupDto[]>>(`/by-group-code/${encodeURIComponent(groupCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto[]>(error);
    }
  }

  async getByMenuHeaderId(menuHeaderId: number): Promise<ApiResponse<PlatformPageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<PlatformPageGroupDto[]>>(`/by-menu-header-id/${menuHeaderId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto[]>(error);
    }
  }

  async getByMenuLineId(menuLineId: number): Promise<ApiResponse<PlatformPageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<PlatformPageGroupDto[]>>(`/by-menu-line-id/${menuLineId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto[]>(error);
    }
  }

  async getPageGroupsGroupByGroupCode(): Promise<ApiResponse<PlatformPageGroupDto[]>> {
    try {
      const response = await api.get<ApiResponse<PlatformPageGroupDto[]>>('/group-by-group-code');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<PlatformPageGroupDto[]>(error);
    }
  }
}


