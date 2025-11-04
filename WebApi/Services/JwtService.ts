import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IJwtService } from '../Interfaces/IJwtService';
import { ApiResponse } from '../Models/ApiResponse';
import { User } from '../Models/User';

const api = axios.create({
  baseURL: API_BASE_URL + "/Jwt",
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

export interface JwtPayload {
    name: string;
    email: string;
    nameid: string;
    firstName: string;
    lastName: string;
    role: string;
    exp: number;
    iss: string;
    aud: string;
}

export class JwtService implements IJwtService {
    private readonly TOKEN_KEY = 'jwt_token';
    private readonly REFRESH_TOKEN_KEY = 'refresh_token';


    async generateToken(user: User): Promise<ApiResponse<string>> {
        try {
            const response = await api.post<ApiResponse<string>>('/generate-token', user);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<string>(error, 'JwtService');
        }
    }

    /**
     * JWT token'ı localStorage'a kaydeder
     * @param token JWT token
     */
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    /**
     * localStorage'dan JWT token'ı alır
     * @returns JWT token veya null
     */
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    /**
     * Refresh token'ı localStorage'a kaydeder
     * @param refreshToken Refresh token
     */
    setRefreshToken(refreshToken: string): void {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }

    /**
     * localStorage'dan refresh token'ı alır
     * @returns Refresh token veya null
     */
    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    /**
     * JWT token'ı localStorage'dan siler
     */
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    /**
     * JWT token'ı decode eder (client-side validation için)
     * @param token JWT token
     * @returns Decode edilmiş payload
     */
    decodeToken(token?: string): JwtPayload | null {
        try {
            const tokenToUse = token || this.getToken();
            if (!tokenToUse) return null;

            const base64Url = tokenToUse.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            return JSON.parse(jsonPayload) as JwtPayload;
        } catch (error) {
            console.error('Token decode edilirken hata oluştu:', error);
            return null;
        }
    }

    /**
     * JWT token'ın geçerli olup olmadığını kontrol eder
     * @param token JWT token (opsiyonel, verilmezse localStorage'dan alır)
     * @returns Token geçerli mi?
     */
    isTokenValid(token?: string): boolean {
        try {
            const payload = this.decodeToken(token);
            if (!payload) return false;

            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        } catch (error) {
            return false;
        }
    }

    /**
     * Token'ın süresinin dolmasına kalan zamanı saniye cinsinden döner
     * @param token JWT token (opsiyonel)
     * @returns Kalan süre (saniye)
     */
    getTokenExpirationTime(token?: string): number {
        try {
            const payload = this.decodeToken(token);
            if (!payload) return 0;

            const currentTime = Math.floor(Date.now() / 1000);
            return Math.max(0, payload.exp - currentTime);
        } catch (error) {
            return 0;
        }
    }

    /**
     * Kullanıcının oturum açmış olup olmadığını kontrol eder
     * @returns Oturum açık mı?
     */
    isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null && this.isTokenValid(token);
    }

    /**
     * Token'dan kullanıcı bilgilerini çıkarır
     * @returns Kullanıcı bilgileri veya null
     */
    getCurrentUser(): Partial<User> | null {
        try {
            const payload = this.decodeToken();
            if (!payload) return null;

            return {
                id: parseInt(payload.nameid),
                username: payload.name,
                email: payload.email,
                firstName: payload.firstName,
                lastName: payload.lastName
            };
        } catch (error) {
            console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
            return null;
        }
    }

    /**
     * Token yenileme isteği gönderir
     * @returns Yeni token
     */
    async refreshToken(): Promise<ApiResponse<string>> {
        try {
            const refreshToken = this.getRefreshToken();
            if (!refreshToken) {
                throw new Error('Refresh token bulunamadı');
            }

            const response = await api.post<ApiResponse<string>>('/refresh-token', { refreshToken });
            
            if (response.data.success && response.data.data) {
                this.setToken(response.data.data);
            }

            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<string>(error, 'JwtService');
        }
    }

    /**
     * Oturumu sonlandırır
     */
    logout(): void {
        this.removeToken();
    }
}

