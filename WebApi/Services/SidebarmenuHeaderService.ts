import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ISidebarmenuHeaderService } from '../Interfaces/ISidebarmenuHeaderService';
import { ApiResponse } from '../Models/ApiResponse';
import { SidebarmenuHeaderDto, CreateSidebarmenuHeaderDto, UpdateSidebarmenuHeaderDto } from '../Models/SidebarmenuHeaderDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/SidebarmenuHeader",
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

export class SidebarmenuHeaderService implements ISidebarmenuHeaderService {
  async getAll(): Promise<ApiResponse<SidebarmenuHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuHeaderDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<SidebarmenuHeaderDto | null>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuHeaderDto | null>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateSidebarmenuHeaderDto): Promise<ApiResponse<SidebarmenuHeaderDto>> {
    try {
      const response = await api.post<ApiResponse<SidebarmenuHeaderDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateSidebarmenuHeaderDto): Promise<ApiResponse<SidebarmenuHeaderDto>> {
    try {
      const response = await api.put<ApiResponse<SidebarmenuHeaderDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async delete(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.delete<ApiResponse<boolean>>(`/${id}`);
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

  async getByMenuKey(menuKey: string): Promise<ApiResponse<SidebarmenuHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuHeaderDto[]>>(`/by-menu-key/${menuKey}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getByRoleLevel(roleLevel: number): Promise<ApiResponse<SidebarmenuHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuHeaderDto[]>>(`/by-role-level/${roleLevel}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getSidebarmenuHeadersByUserId(userId: number): Promise<ApiResponse<SidebarmenuHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<SidebarmenuHeaderDto[]>>(`/by-user/${userId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }
}

