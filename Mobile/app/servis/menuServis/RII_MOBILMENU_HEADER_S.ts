// RII_MOBILMENU_HEADER Service Functions
// API çağrıları ve veri işlemleri için servis katmanı

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../baseUrl';
import {
    RII_MOBILMENU_HEADER,
    RII_MOBILMENU_HEADER_CreateRequest,
    RII_MOBILMENU_HEADER_Filter,
    RII_MOBILMENU_HEADER_Response,
    RII_MOBILMENU_HEADER_SingleResponse,
    RII_MOBILMENU_HEADER_UpdateRequest
} from '../menuClass/RII_MOBILMENU_HEADER_C';


class RII_MOBILMENU_HEADER_Service {
  

  // Token'ı AsyncStorage'dan al
  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('jwt_token');
    } catch (error) {
      console.error('Token alınamadı:', error);
      return null;
    }
  }

  // Device ID'yi AsyncStorage'dan al
  private async getDeviceId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('device_id');
    } catch (error) {
      console.error('Device ID alınamadı:', error);
      return null;
    }
  }

  // HTTP Headers oluştur
  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getAuthToken();
    const deviceId = await this.getDeviceId();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (deviceId) {
      headers['Device-ID'] = deviceId;
    }

    return headers;
  }

  // Tüm menü başlıklarını getir
  async getAllMenuHeaders(): Promise<RII_MOBILMENU_HEADER_Response> {
    try {
      const headers = await this.getHeaders();
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/MobilemenuHeader`,
        { headers }
      );

      // API formatı: ApiResponse<IEnumerable<MobilemenuHeaderDto>>
      const apiResponse = response.data;
      
      // API hem büyük hem küçük harf kullanabilir: Success/success, Data/data
      const isSuccess = apiResponse.Success ?? apiResponse.success ?? false;
      const data = apiResponse.Data ?? apiResponse.data;
      
      if (isSuccess && data && Array.isArray(data)) {
        return data;
      }
      
      console.warn('Unexpected response format:', apiResponse);
      return [];
    } catch (error) {
      console.error('Menü başlıkları getirilemedi:', error);
      return [];
    }
  }

  // ID'ye göre menü başlığı getir
  async getMenuHeaderById(id: number): Promise<RII_MOBILMENU_HEADER_SingleResponse> {
    try {
      const headers = await this.getHeaders();
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/MobilemenuHeader/${id}`,
        { headers }
      );

      // API formatı: ApiResponse<MobilemenuHeaderDto?>
      const apiResponse = response.data;
      
      // API hem büyük hem küçük harf kullanabilir
      const isSuccess = apiResponse.Success ?? apiResponse.success ?? false;
      const data = apiResponse.Data ?? apiResponse.data;
      const message = apiResponse.Message ?? apiResponse.message;
      
      if (isSuccess && data) {
        return {
          success: true,
          data: data,
          message: message || 'Menü başlığı getirildi'
        };
      }
      
      return {
        success: false,
        data: {} as RII_MOBILMENU_HEADER,
        message: message || 'Menü başlığı getirilemedi'
      };
    } catch (error) {
      console.error('Menü başlığı getirilemedi:', error);
      return {
        success: false,
        data: {} as RII_MOBILMENU_HEADER,
        message: 'Menü başlığı getirilemedi'
      };
    }
  }

  // MenuId'ye göre menü başlığı getir (local filtreleme)
  async getMenuHeaderByMenuId(menuId: string): Promise<RII_MOBILMENU_HEADER | null> {
    try {
      const allHeaders = await this.getAllMenuHeaders();
      const header = allHeaders.find(h => h.MenuId === menuId);
      return header || null;
    } catch (error) {
      console.error('Menü başlığı getirilemedi:', error);
      return null;
    }
  }

  // ID'ye göre menü başlığı getir (local filtreleme)
  async getMenuHeaderByIdLocal(id: number): Promise<RII_MOBILMENU_HEADER | null> {
    try {
      const allHeaders = await this.getAllMenuHeaders();
      const header = allHeaders.find(h => h.Id === id);
      return header || null;
    } catch (error) {
      console.error('Menü başlığı getirilemedi:', error);
      return null;
    }
  }

  // Filtrelenmiş menü başlıklarını getir (local filtreleme)
  async getFilteredMenuHeaders(filter: RII_MOBILMENU_HEADER_Filter): Promise<RII_MOBILMENU_HEADER[]> {
    try {
      const allHeaders = await this.getAllMenuHeaders();
      let filteredHeaders = allHeaders;

      if (filter.MenuId) {
        filteredHeaders = filteredHeaders.filter(h => h.MenuId.includes(filter.MenuId!));
      }
      if (filter.Title) {
        filteredHeaders = filteredHeaders.filter(h => h.Title.toLowerCase().includes(filter.Title!.toLowerCase()));
      }
      if (filter.IsOpen !== undefined) {
        filteredHeaders = filteredHeaders.filter(h => h.IsOpen === filter.IsOpen);
      }
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        filteredHeaders = filteredHeaders.filter(h => 
          h.Title.toLowerCase().includes(searchLower) ||
          h.MenuId.toLowerCase().includes(searchLower)
        );
      }

      return filteredHeaders;
    } catch (error) {
      console.error('Filtrelenmiş menü başlıkları getirilemedi:', error);
      return [];
    }
  }
}

// Singleton instance
const menuHeaderService = new RII_MOBILMENU_HEADER_Service();
export default menuHeaderService;

// Named export
export { RII_MOBILMENU_HEADER_Service };

