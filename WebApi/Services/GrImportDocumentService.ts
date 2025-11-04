import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { IGrImportDocumentService } from '../Interfaces/IGrImportDocumentService';
import { ApiResponse } from '../Models/ApiResponse';
import { GrImportDocumentDto, CreateGrImportDocumentDto, UpdateGrImportDocumentDto } from '../Models/GrImportDocumentDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/GrImportDocument",
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

export class GrImportDocumentService implements IGrImportDocumentService {
  async getAll(): Promise<ApiResponse<GrImportDocumentDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportDocumentDto[]>>('/');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto[]>(error);
    }
  }

  async getById(id: number): Promise<ApiResponse<GrImportDocumentDto>> {
    try {
      const response = await api.get<ApiResponse<GrImportDocumentDto>>(`/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto>(error);
    } 
  }

  async getByHeaderId(headerId: number): Promise<ApiResponse<GrImportDocumentDto[]>> {
    try {
      const response = await api.get<ApiResponse<GrImportDocumentDto[]>>(`/by-header-id/${headerId}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto[]>(error);
    }   
  }

  async create(createDto: CreateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>> {
    try {
      const response = await api.post<ApiResponse<GrImportDocumentDto>>('/', createDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto>(error);
    }
  }

  async update(id: number, updateDto: UpdateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>> {
    try {
      const response = await api.put<ApiResponse<GrImportDocumentDto>>(`/${id}`, updateDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<GrImportDocumentDto>(error);
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
}


