import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../Helpers/ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IMobilePageGroupService } from '../Interfaces/IMobilePageGroupService';
import { ApiResponse } from '../Models/ApiResponse';
import { MobilePageGroupDto, CreateMobilePageGroupDto, UpdateMobilePageGroupDto } from '../Models/MobilePageGroupDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/MobilePageGroup",
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

export class MobilePageGroupService implements IMobilePageGroupService {
    /**
     * Tüm mobil sayfa gruplarını getirir
     * @returns Mobil sayfa grubu listesi
     */
    async getAll(): Promise<ApiResponse<MobilePageGroupDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilePageGroupDto[]>>('/');
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
        }
    }

    /**
     * ID'ye göre mobil sayfa grubu getirir
     * @param id Mobil sayfa grubu ID'si
     * @returns Mobil sayfa grubu
     */
    async getById(id: number): Promise<ApiResponse<MobilePageGroupDto>> {
        try {
            const response = await api.get<ApiResponse<MobilePageGroupDto>>(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Mobil sayfa grubu getirilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto>(error);
        }
    }

    /**
     * Grup koduna göre mobil sayfa gruplarını getirir
     * @param groupCode Grup kodu
     * @returns Mobil sayfa grubu listesi
     */
    async getByGroupCode(groupCode: string): Promise<ApiResponse<MobilePageGroupDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilePageGroupDto[]>>(`/by-group-code/${groupCode}`);
            return response.data;
        } catch (error) {
            console.error('Grup koduna göre mobil sayfa grupları getirilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
        }
    }

    /**
     * Menü header ID'sine göre mobil sayfa gruplarını getirir
     * @param menuHeaderId Menü header ID'si
     * @returns Mobil sayfa grubu listesi
     */
    async getByMenuHeaderId(menuHeaderId: number): Promise<ApiResponse<MobilePageGroupDto[]>> {
        try {
            const response = await api.get(`/menuheader/${menuHeaderId}`);
            return response.data;
        } catch (error) {
            console.error('Menü header ID\'sine göre mobil sayfa grupları getirilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
        }
    }

    /**
     * Menü line ID'sine göre mobil sayfa gruplarını getirir
     * @param menuLineId Menü line ID'si
     * @returns Mobil sayfa grubu listesi
     */
    async getByMenuLineId(menuLineId: number): Promise<ApiResponse<MobilePageGroupDto[]>> {
        try {
            const response = await api.get(`/menuline/${menuLineId}`);
            return response.data;
        } catch (error) {
            console.error('Menü line ID\'sine göre mobil sayfa grupları getirilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
        }
    }

    /**
     * Yeni mobil sayfa grubu oluşturur
     * @param createDto Oluşturulacak mobil sayfa grubu bilgileri
     * @returns Oluşturulan mobil sayfa grubu
     */
    async create(createDto: CreateMobilePageGroupDto): Promise<ApiResponse<MobilePageGroupDto>> {
        try {
            const response = await api.post<ApiResponse<MobilePageGroupDto>>('/', createDto);
            return response.data;
        } catch (error) {
            console.error('Mobil sayfa grubu oluşturulurken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto>(error);
        }
    }

    /**
     * Mobil sayfa grubunu günceller
     * @param id Güncellenecek mobil sayfa grubu ID'si
     * @param updateDto Güncellenecek mobil sayfa grubu bilgileri
     * @returns Güncellenen mobil sayfa grubu
     */
    async update(id: number, updateDto: UpdateMobilePageGroupDto): Promise<ApiResponse<MobilePageGroupDto>> {
        try {
            const response = await api.put<ApiResponse<MobilePageGroupDto>>(`/${id}`, updateDto);
            return response.data;
        } catch (error) {
            console.error('Mobil sayfa grubu güncellenirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto>(error);
        }
    }

    /**
     * Mobil sayfa grubunu soft delete yapar
     * @param id Silinecek mobil sayfa grubu ID'si
     * @returns Silme işlemi sonucu
     */
    async softDelete(id: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await api.delete<ApiResponse<boolean>>(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Mobil sayfa grubu silinirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<boolean>(error);
        }
    }

    /**
     * Aktif mobil sayfa gruplarını getirir
     * @returns Aktif mobil sayfa grubu listesi
     */
    async getActive(): Promise<ApiResponse<MobilePageGroupDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilePageGroupDto[]>>('/active');
            return response.data;
        } catch (error) {
            console.error('Aktif mobil sayfa grupları getirilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
        }
    }

    /**
     * Grup koduna göre gruplandırılmış mobil sayfa gruplarını getirir
     * @returns Gruplandırılmış mobil sayfa grubu listesi
     */
    async getMobilePageGroupsByGroupCode(): Promise<ApiResponse<MobilePageGroupDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilePageGroupDto[]>>('/grouped-by-code');
            return response.data;
        } catch (error) {
            console.error('Gruplandırılmış mobil sayfa grupları getirilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<MobilePageGroupDto[]>(error);
        }
    }

    /**
     * Sayfalama ile mobil sayfa gruplarını getirir
     * @param page Sayfa numarası
     * @param pageSize Sayfa boyutu
     * @param searchTerm Arama terimi (opsiyonel)
     * @returns Sayfalanmış mobil sayfa grubu listesi
     */
    async getPaginated(page: number = 1, pageSize: number = 10, searchTerm?: string): Promise<ApiResponse<{
        data: MobilePageGroupDto[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    }>> {
        try {
            const response = await api.get('/paginated', {
                params: {
                    page,
                    pageSize,
                    searchTerm
                }
            });
            return response.data;
        } catch (error) {
            console.error('Sayfalanmış mobil sayfa grupları getirilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Mobil sayfa grubu var mı kontrol eder
     * @param id Kontrol edilecek mobil sayfa grubu ID'si
     * @returns Varlık durumu
     */
    async exists(id: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await api.get<ApiResponse<boolean>>(`/exists/${id}`);
            return response.data;
        } catch (error) {
            console.error('Mobil sayfa grubu varlığı kontrol edilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<boolean>(error);
        }
    }

    /**
     * Grup kodu benzersiz mi kontrol eder
     * @param groupCode Kontrol edilecek grup kodu
     * @param excludeId Hariç tutulacak ID (güncelleme sırasında)
     * @returns Benzersizlik durumu
     */
    async isGroupCodeUnique(groupCode: string, excludeId?: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await api.get<ApiResponse<boolean>>('/check-groupcode-unique', {
                params: {
                    groupCode,
                    excludeId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Grup kodu benzersizliği kontrol edilirken hata oluştu:', error);
            return ApiResponseErrorHelper.create<boolean>(error);
        }
    }
}


