import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IAuthService } from '../Interfaces/IAuthService';
import { ApiResponse } from '../Models/ApiResponse';
import { User } from '../Models/User';
import { LoginDto, RegisterDto, UserDto } from '../Models/AuthTypes';

const api = axios.create({
  baseURL: API_BASE_URL + "/Auth",
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

export class AuthService implements IAuthService {
  async getUserByUsername(username: string): Promise<ApiResponse<User>> {
    try {
      const response = await api.get<ApiResponse<User>>(`/user/${username}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<User>(error);
    }
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    try {
      const response = await api.get<ApiResponse<User>>(`/user/${id}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<User>(error);
    }
  }

  async registerUser(registerDto: RegisterDto): Promise<ApiResponse<User>> {
    try {
      const response = await api.post<ApiResponse<User>>('/register', registerDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<User>(error);
    }
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<string>> {
    try {
      const response = await api.post<ApiResponse<string>>('/login', loginDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<string>(error);
    }
  }

  async getProfile(): Promise<ApiResponse<UserDto>> {
    try {
      const response = await api.get<ApiResponse<UserDto>>('/user');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<UserDto>(error);
    }
  }

  async adminLogin(loginDto: LoginDto): Promise<ApiResponse<string>> {
    try {
      const response = await api.post<ApiResponse<string>>('/admin-login', loginDto);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<string>(error);
    }
  }
}

