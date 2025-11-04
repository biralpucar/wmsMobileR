import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../Helpers/ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IUserAuthorityService } from '../Interfaces/IUserAuthorityService';
import { ApiResponse } from '../Models/ApiResponse';
import { UserAuthorityDto, CreateUserAuthorityDto, UpdateUserAuthorityDto } from '../Models/UserAuthorityDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/UserAuthority",
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

export class UserAuthorityService implements IUserAuthorityService {
  async getAll(): Promise<ApiResponse<UserAuthorityDto[]>> {
    try {
      const response = await api.get<ApiResponse<UserAuthorityDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<UserAuthorityDto>> {
    try {
      const response = await api.get<ApiResponse<UserAuthorityDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async create(createDto: CreateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>> {
    try {
      const response = await api.post<ApiResponse<UserAuthorityDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }

  async update(id: number, updateDto: UpdateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>> {
    try {
      const response = await api.put<ApiResponse<UserAuthorityDto>>(`/${id}`, updateDto);
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

  async exists(id: number): Promise<ApiResponse<boolean>> {
    try {
      const response = await api.get<ApiResponse<boolean>>(`/${id}/exists`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create(error);
    }
  }
}

