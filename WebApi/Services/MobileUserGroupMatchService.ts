import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponse } from '../Models/ApiResponse';
import { MobileUserGroupMatchDto, CreateMobileUserGroupMatchDto, UpdateMobileUserGroupMatchDto } from '../Models/MobileUserGroupMatchDtos';

export class MobileUserGroupMatchService {
    private api = axios.create({
        baseURL: API_BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': CURRENTLANGUAGE
        }
    });

    constructor() {
        // Request interceptor to add auth token
        this.api.interceptors.request.use((config: AxiosRequestConfig) => {
            const token = getAuthToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    /**
     * T�m mobil kullan�c� grup e�le�tirmelerini getirir
     * @returns Mobil kullan�c� grup e�le�tirme listesi
     */
    async getAll(): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
        try {
            const response = await this.api.get<ApiResponse<MobileUserGroupMatchDto[]>>('/api/mobileusergroupmatch');
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobileUserGroupMatchDto[]>(error);
        }
    }

    /**
     * ID'ye g�re mobil kullan�c� grup e�le�tirmesi getirir
     * @param id Mobil kullan�c� grup e�le�tirme ID'si
     * @returns Mobil kullan�c� grup e�le�tirmesi
     */
    async getById(id: number): Promise<ApiResponse<MobileUserGroupMatchDto>> {
        try {
            const response = await this.api.get<ApiResponse<MobileUserGroupMatchDto>>(`/api/mobileusergroupmatch/${id}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobileUserGroupMatchDto>(error);
        }
    }

    /**
     * Kullan�c� ID'sine g�re mobil kullan�c� grup e�le�tirmelerini getirir
     * @param userId Kullan�c� ID'si
     * @returns Mobil kullan�c� grup e�le�tirme listesi
     */
    async getByUserId(userId: number): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
        try {
            const response = await this.api.get<ApiResponse<MobileUserGroupMatchDto[]>>(`/api/mobileusergroupmatch/user/${userId}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobileUserGroupMatchDto[]>(error);
        }
    }

    /**
     * Grup koduna g�re mobil kullan�c� grup e�le�tirmelerini getirir
     * @param groupCode Grup kodu
     * @returns Mobil kullan�c� grup e�le�tirme listesi
     */
    async getByGroupCode(groupCode: string): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
        try {
            const response = await this.api.get<ApiResponse<MobileUserGroupMatchDto[]>>(`/api/mobileusergroupmatch/group/${groupCode}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobileUserGroupMatchDto[]>(error);
        }
    }

    /**
     * Yeni mobil kullan�c� grup e�le�tirmesi olu�turur
     * @param createDto Olu�turulacak mobil kullan�c� grup e�le�tirmesi bilgileri
     * @returns Olu�turulan mobil kullan�c� grup e�le�tirmesi
     */
    async create(createDto: CreateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>> {
        try {
            const response = await this.api.post<ApiResponse<MobileUserGroupMatchDto>>('/api/mobileusergroupmatch', createDto);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobileUserGroupMatchDto>(error);
        }
    }

    /**
     * Mobil kullan�c� grup e�le�tirmesini g�nceller
     * @param id G�ncellenecek mobil kullan�c� grup e�le�tirme ID'si
     * @param updateDto G�ncellenecek bilgiler
     * @returns G�ncellenmi� mobil kullan�c� grup e�le�tirmesi
     */
    async update(id: number, updateDto: UpdateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>> {
        try {
            const response = await this.api.put<ApiResponse<MobileUserGroupMatchDto>>(`/api/mobileusergroupmatch/${id}`, updateDto);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobileUserGroupMatchDto>(error);
        }
    }

    /**
     * Mobil kullan�c� grup e�le�tirmesini soft delete yapar
     * @param id Silinecek mobil kullan�c� grup e�le�tirme ID'si
     * @returns Silme i�lemi sonucu
     */
    async softDelete(id: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await this.api.delete<ApiResponse<boolean>>(`/api/mobileusergroupmatch/${id}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<boolean>(error);
        }
    }

    /**
     * Aktif mobil kullan�c� grup e�le�tirmelerini getirir
     * @returns Aktif mobil kullan�c� grup e�le�tirme listesi
     */
    async getActive(): Promise<ApiResponse<MobileUserGroupMatchDto[]>> {
        try {
            const response = await this.api.get<ApiResponse<MobileUserGroupMatchDto[]>>('/api/mobileusergroupmatch/active');
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobileUserGroupMatchDto[]>(error);
        }
    }

    async getPaginated(page: number = 1, pageSize: number = 10, searchTerm?: string): Promise<ApiResponse<{
        data: MobileUserGroupMatchDto[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    }>> {
        try {
            let url = `/api/mobileusergroupmatch/paginated?page=${page}&pageSize=${pageSize}`;
            if (searchTerm) {
                url += `&searchTerm=${encodeURIComponent(searchTerm)}`;
            }

            const response = await this.api.get(url);
            return response.data;
        } catch (error) {
            console.error('Sayfalanm�� mobil kullan�c� grup e�le�tirmeleri getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Mobil kullan�c� grup e�le�tirmesinin var olup olmad���n� kontrol eder
     * @param id Kontrol edilecek mobil kullan�c� grup e�le�tirme ID'si
     * @returns Varl�k durumu
     */
    async exists(id: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await this.api.get(`/api/mobileusergroupmatch/exists/${id}`);
            return response.data;
        } catch (error) {
            console.error('Mobil kullan�c� grup e�le�tirmesi varl�k kontrol� yap�l�rken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Kullan�c�n�n belirli bir gruba eri�imi olup olmad���n� kontrol eder
     * @param userId Kullan�c� ID'si
     * @param groupCode Grup kodu
     * @returns Eri�im durumu
     */
    async hasUserAccessToGroup(userId: number, groupCode: string): Promise<ApiResponse<boolean>> {
        try {
            const response = await this.api.get(`/api/mobileusergroupmatch/access/${userId}/${groupCode}`);
            return response.data;
        } catch (error) {
            console.error('Kullan�c� grup eri�im kontrol� yap�l�rken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Kullan�c�n�n sahip oldu�u grup kodlar�n� getirir
     * @param userId Kullan�c� ID'si
     * @returns Grup kodlar� listesi
     */
    async getUserGroupCodes(userId: number): Promise<ApiResponse<string[]>> {
        try {
            const response = await this.api.get(`/api/mobileusergroupmatch/user/${userId}/groups`);
            return response.data;
        } catch (error) {
            console.error('Kullan�c� grup kodlar� getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Belirli bir gruba ait kullan�c� ID'lerini getirir
     * @param groupCode Grup kodu
     * @returns Kullan�c� ID'leri listesi
     */
    async getGroupUsers(groupCode: string): Promise<ApiResponse<number[]>> {
        try {
            const response = await this.api.get(`/api/mobileusergroupmatch/group/${groupCode}/users`);
            return response.data;
        } catch (error) {
            console.error('Grup kullan�c�lar� getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }
}


