// Stok API Servisi
// localhost:5085/api/Erp/getStoks endpoint'ine GET isteği atar

// Interface'leri class dosyasından import et
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../baseUrl';
import {
  erpStok,
  StokApiResponse
} from '../erpClass/stokServisClass';
import { parseArrayResponse, getApiErrorMessage } from '../utils/apiResponseParser';

/**
 * erpStok API'sine GET isteği atar
 * API Endpoint: GET /api/Erp/getStoks
 * API Response: ApiResponse<List<StokDto>>
 * @returns Promise<StokApiResponse>
 */
export const getErpStoklar = async (): Promise<StokApiResponse> => {
  try {
    console.log('erpStok API\'sine istek atılıyor...');
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ERP.STOK}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000, // 10 saniye timeout
    });

    console.log('API Response Status:', response.status);
    
    const rawData = response.data;
    console.log('API\'den gelen ham veri:', rawData);
    
    // API response formatı: { Success: true, Data: [...] }
    const data = parseArrayResponse<erpStok>(rawData);
    
    if (data === null) {
      return {
        success: false,
        data: [],
        error: getApiErrorMessage(rawData)
      };
    }
    
    console.log('İşlenmiş veri sayısı:', data.length);
    
    return {
      success: true,
      data: data,
      message: `${data.length} adet stok verisi başarıyla alındı.`
    };

  } catch (error) {
    console.error('erpStok API hatası:', error);
    
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
    };
  }
};

/**
 * Belirli bir stok koduna göre stok arar
 * Not: API'de stok kodu ile filtreleme endpoint'i yok, tüm listeyi çekip client-side filtreleme yapıyoruz
 * @param stokKodu - Aranacak stok kodu
 * @returns Promise<StokApiResponse>
 */
export const getStokByKod = async (stokKodu: string): Promise<StokApiResponse> => {
  try {
    console.log(`Stok kodu "${stokKodu}" için tüm listeyi çekip filtreleme yapılıyor...`);
    
    // Tüm stokları çek
    const allStoklar = await getErpStoklar();
    
    if (!allStoklar.success) {
      return allStoklar;
    }
    
    // Client-side filtreleme
    const filtered = allStoklar.data.filter(stok => 
      stok.STOK_KODU?.toLowerCase().includes(stokKodu.toLowerCase()) ||
      stok.STOK_ADI?.toLowerCase().includes(stokKodu.toLowerCase()) ||
      stok.BARKOD1?.toLowerCase().includes(stokKodu.toLowerCase())
    );
    
    return {
      success: true,
      data: filtered,
      message: `"${stokKodu}" için ${filtered.length} adet sonuç bulundu.`
    };

  } catch (error) {
    console.error('Stok arama API hatası:', error);
    
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Stok arama sırasında hata oluştu'
    };
  }
};

/**
 * Stok verilerini filtreler
 * @param stoklar - Filtrelenecek stok listesi
 * @param searchText - Arama metni
 * @returns erptok[]
 */
export const filterStoklar = (stoklar: erpStok[], searchText: string): erpStok[] => {
  if (!searchText || searchText.trim() === '') {
    return stoklar;
  }

  const searchLower = searchText.toLowerCase().trim();
  
  return stoklar.filter(stok => 
    stok.STOK_KODU?.toLowerCase().includes(searchLower) ||
    stok.STOK_ADI?.toLowerCase().includes(searchLower) ||
    stok.BARKOD1?.toLowerCase().includes(searchLower) ||
    stok.BARKOD2?.toLowerCase().includes(searchLower) ||
    stok.BARKOD3?.toLowerCase().includes(searchLower) ||
    stok.URETICI_KODU?.toLowerCase().includes(searchLower)
  );
};

// Export default
export default {
  getErpStoklar,
  getStokByKod,
  filterStoklar
};