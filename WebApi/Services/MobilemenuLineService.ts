import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { ApiResponse } from '../Models/ApiResponse';
import { MobilemenuLineDto, CreateMobilemenuLineDto, UpdateMobilemenuLineDto } from '../Models/MobilemenuLineDtos';
import { IMobilemenuLineService } from '../Interfaces/IMobilemenuLineService';

const api = axios.create({
  baseURL: API_BASE_URL + "/MobilemenuLine",
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

export class MobilemenuLineService implements IMobilemenuLineService {

    async getAll(): Promise<ApiResponse<MobilemenuLineDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilemenuLineDto[]>>('/');
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobilemenuLineDto[]>(error);
        }
    }

    async getById(id: number): Promise<ApiResponse<MobilemenuLineDto>> {
        try {
            const response = await api.get<ApiResponse<MobilemenuLineDto>>(`/${id}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
        }
    }

    async getByItemId(itemId: string): Promise<ApiResponse<MobilemenuLineDto>> {
        try {
            const response = await api.get<ApiResponse<MobilemenuLineDto>>(`/item/${encodeURIComponent(itemId)}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
        }
    }

    async getByHeaderId(headerId: number): Promise<ApiResponse<MobilemenuLineDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilemenuLineDto[]>>(`/header/${headerId}`);
            return response.data;
        } catch (error) {
            console.error('Header ID\'ye g�re mobil men� sat�rlar� getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create<MobilemenuLineDto[]>(error);
        }
    }

    async getByTitle(title: string): Promise<ApiResponse<MobilemenuLineDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilemenuLineDto[]>>(`/title/${encodeURIComponent(title)}`);
            return response.data;
        } catch (error) {
            console.error('Ba�l��a g�re mobil men� sat�rlar� getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create<MobilemenuLineDto[]>(error);
        }
    }

    /**
     * Yeni mobil men� sat�r� olu�turur
     * @param createDto Olu�turulacak mobil men� sat�r� bilgileri
     * @returns Olu�turulan mobil men� sat�r�
     */
    async create(createDto: CreateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>> {
        try {
            const response = await api.post<ApiResponse<MobilemenuLineDto>>('/', createDto);
            return response.data;
        } catch (error) {
            console.error('Mobil men� sat�r� olu�turulurken hata olu�tu:', error);
            return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
        }
    }

    /**
     * Mobil men� sat�r�n� g�nceller
     * @param id G�ncellenecek mobil men� sat�r� ID'si
     * @param updateDto G�ncellenecek bilgiler
     * @returns G�ncellenmi� mobil men� sat�r�
     */
    async update(id: number, updateDto: UpdateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>> {
        try {
            const response = await api.put<ApiResponse<MobilemenuLineDto>>(`/${id}`, updateDto);
            return response.data;
        } catch (error) {
            console.error('Mobil men� sat�r� g�ncellenirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create<MobilemenuLineDto>(error);
        }
    }

    /**
     * Mobil men� sat�r�n� soft delete yapar
     * @param id Silinecek mobil men� sat�r� ID'si
     * @returns Silme i�lemi sonucu
     */
    async softDelete(id: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await api.delete<ApiResponse<boolean>>(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Mobil men� sat�r� silinirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create<boolean>(error);
        }
    }

    /**
     * Aktif mobil men� sat�rlar�n� getirir
     * @returns Aktif mobil men� sat�r� listesi
     */
    async getActive(): Promise<ApiResponse<MobilemenuLineDto[]>> {
        try {
            const response = await api.get<ApiResponse<MobilemenuLineDto[]>>('/active');
            return response.data;
        } catch (error) {
            console.error('Aktif mobil men� sat�rlar� getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create<MobilemenuLineDto[]>(error);
        }
    }

    /**
     * Sayfalama ile mobil men� sat�rlar�n� getirir
     * @param page Sayfa numaras�
     * @param pageSize Sayfa boyutu
     * @param searchTerm Arama terimi (opsiyonel)
     * @returns Sayfalanm�� mobil men� sat�r� listesi
     */
    async getPaginated(page: number = 1, pageSize: number = 10, searchTerm?: string): Promise<ApiResponse<{
        data: MobilemenuLineDto[];
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
            console.error('Sayfalanm�� mobil men� sat�rlar� getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Mobil men� sat�r� var m� kontrol eder
     * @param id Kontrol edilecek mobil men� sat�r� ID'si
     * @returns Varl�k durumu
     */
    async exists(id: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await api.get(`/exists/${id}`);
            return response.data;
        } catch (error) {
            console.error('Mobil men� sat�r� varl��� kontrol edilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Item ID benzersiz mi kontrol eder
     * @param itemId Kontrol edilecek item ID
     * @param excludeId Hari� tutulacak ID (g�ncelleme s�ras�nda)
     * @returns Benzersizlik durumu
     */
    async isItemIdUnique(itemId: string, excludeId?: number): Promise<ApiResponse<boolean>> {
        try {
            const response = await api.get('/check-itemid-unique', {
                params: {
                    itemId,
                    excludeId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Item ID benzersizli�i kontrol edilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Header ID'ye g�re s�ral� mobil men� sat�rlar�n� getirir
     * @param headerId Header ID'si
     * @param orderBy S�ralama y�n�
     * @returns S�ral� mobil men� sat�r� listesi
     */
    async getOrderedBySequence(headerId: number, orderBy: 'asc' | 'desc' = 'asc'): Promise<ApiResponse<MobilemenuLineDto[]>> {
        try {
            const response = await api.get(`/ordered/${headerId}`, {
                params: { orderBy }
            });
            return response.data;
        } catch (error) {
            console.error('S�ral� mobil men� sat�rlar� getirilirken hata olu�tu:', error);
            return ApiResponseErrorHelper.create(error);
        }
    }
}


