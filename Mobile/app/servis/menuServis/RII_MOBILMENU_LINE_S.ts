// RII_MOBILMENU_LINE Service Functions
// API çağrıları ve veri işlemleri için servis katmanı

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../baseUrl';
import {
    RII_MOBILMENU_LINE,
    RII_MOBILMENU_LINE_CreateRequest,
    RII_MOBILMENU_LINE_Filter,
    RII_MOBILMENU_LINE_Pagination,
    RII_MOBILMENU_LINE_Response,
    RII_MOBILMENU_LINE_SingleResponse,
    RII_MOBILMENU_LINE_SortBy,
    RII_MOBILMENU_LINE_UpdateRequest,
    SortDirection
} from '../menuClass/RII_MOBILMENU_LINE_C';
import { RII_MOBILMENU_HEADER } from '../menuClass/RII_MOBILMENU_HEADER_C';
import menuHeaderService from './RII_MOBILMENU_HEADER_S';
import { parseArrayResponse, parseObjectResponse } from '../utils/apiResponseParser';

class RII_MOBILMENU_LINE_Service {

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

  // Tüm menü satırlarını getir (API'den direkt çekme)
  async getAllMenuLines(): Promise<RII_MOBILMENU_LINE[]> {
    try {
      const headers = await this.getHeaders();
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/MobilemenuLine`,
        { headers }
      );

      // API formatı: ApiResponse<IEnumerable<MobilemenuLineDto>>
      const apiResponse = response.data;
      const data = parseArrayResponse<RII_MOBILMENU_LINE>(apiResponse);
      
      return data || [];
    } catch (error) {
      console.error('Menü satırları getirilemedi:', error);
      // Fallback: Header'lardan çekmeyi dene
      try {
        const allHeaders = await menuHeaderService.getAllMenuHeaders();
        const allLines: RII_MOBILMENU_LINE[] = [];
        
        allHeaders.forEach(header => {
          if (header.Lines && header.Lines.length > 0) {
            allLines.push(...header.Lines);
          }
        });

        return allLines;
      } catch (fallbackError) {
        console.error('Fallback de başarısız:', fallbackError);
        return [];
      }
    }
  }

  // ID'ye göre menü satırı getir
  async getMenuLineById(lineId: number): Promise<RII_MOBILMENU_LINE | null> {
    try {
      const allLines = await this.getAllMenuLines();
      const line = allLines.find(l => l.Id === lineId);
      return line || null;
    } catch (error) {
      console.error('Menü satırı getirilemedi:', error);
      return null;
    }
  }

  // Header ID'ye göre menü satırlarını getir
  async getMenuLinesByHeaderId(headerId: number): Promise<RII_MOBILMENU_LINE[]> {
    try {
      // API endpoint kullan: GET /api/MobilemenuLine/by-header/{headerId}
      const headers = await this.getHeaders();
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/MobilemenuLine/by-header/${headerId}`,
        { headers }
      );

      // API formatı: ApiResponse<IEnumerable<MobilemenuLineDto>>
      const apiResponse = response.data;
      const data = parseArrayResponse<RII_MOBILMENU_LINE>(apiResponse);
      
      return data || [];
    } catch (error) {
      console.error('Header menü satırları getirilemedi:', error);
      // Fallback: Header'dan çekmeyi dene
      try {
        const header = await menuHeaderService.getMenuHeaderByIdLocal(headerId);
        return header?.Lines || [];
      } catch (fallbackError) {
        return [];
      }
    }
  }

  // Item ID'ye göre menü satırı getir
  async getMenuLineByItemId(itemId: string): Promise<RII_MOBILMENU_LINE | null> {
    try {
      // API endpoint kullan: GET /api/MobilemenuLine/by-item-id/{itemId}
      const headers = await this.getHeaders();
      const response: AxiosResponse<any> = await axios.get(
        `${API_BASE_URL}/MobilemenuLine/by-item-id/${itemId}`,
        { headers }
      );

      // API formatı: ApiResponse<MobilemenuLineDto>
      const apiResponse = response.data;
      const data = parseObjectResponse<RII_MOBILMENU_LINE>(apiResponse);
      
      return data || null;
    } catch (error) {
      console.error('Item menü satırı getirilemedi:', error);
      // Fallback: Tüm listeyi çekip bulmaya çalış
      try {
        const allLines = await this.getAllMenuLines();
        const line = allLines.find(l => l.ItemId === itemId);
        return line || null;
      } catch (fallbackError) {
        return null;
      }
    }
  }

  // Filtrelenmiş menü satırlarını getir
  async getFilteredMenuLines(filter: RII_MOBILMENU_LINE_Filter): Promise<RII_MOBILMENU_LINE[]> {
    try {
      const allLines = await this.getAllMenuLines();
      let filteredLines = allLines;

      if (filter.HeaderId !== undefined) {
        filteredLines = filteredLines.filter(l => l.HeaderId === filter.HeaderId);
      }
      if (filter.ItemId) {
        filteredLines = filteredLines.filter(l => l.ItemId.includes(filter.ItemId!));
      }
      if (filter.Title) {
        filteredLines = filteredLines.filter(l => l.Title.toLowerCase().includes(filter.Title!.toLowerCase()));
      }
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        filteredLines = filteredLines.filter(l => 
          l.Title.toLowerCase().includes(searchLower) ||
          l.ItemId.toLowerCase().includes(searchLower) ||
          l.Description.toLowerCase().includes(searchLower)
        );
      }

      return filteredLines;
    } catch (error) {
      console.error('Filtrelenmiş menü satırları getirilemedi:', error);
      return [];
    }
  }
}

// Singleton instance
const menuLineService = new RII_MOBILMENU_LINE_Service();
export default menuLineService;

// Named export
export { RII_MOBILMENU_LINE_Service };