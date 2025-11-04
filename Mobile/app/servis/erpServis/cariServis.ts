// Cari API Servisi
// localhost:5085/api/Erp/getCari endpoint'ine GET isteği atar

// Interface'leri class dosyasından import et
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../baseUrl';
import {
    CariApiResponse,
    erpCari
} from '../erpClass/cariServisClass';
import { parseArrayResponse, getApiErrorMessage } from '../utils/apiResponseParser';

/**
 * erpCari API'sine GET isteği atar
 * API Endpoint: GET /api/Erp/getCari
 * API Response: ApiResponse<List<CariDto>>
 * @returns Promise<CariApiResponse>
 */
export const getErpCariler = async (): Promise<CariApiResponse> => {
  try {
    console.log('erpCari API\'sine istek atılıyor...');
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ERP.CARI}`, {
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
    const data = parseArrayResponse<erpCari>(rawData);
    
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
      message: `${data.length} adet cari verisi başarıyla alındı.`
    };

  } catch (error) {
    console.error('erpCari API hatası:', error);
    
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
    };
  }
};

/**
 * Belirli bir cari koduna göre cari arar
 * Not: API'de cari kodu ile filtreleme endpoint'i yok, tüm listeyi çekip client-side filtreleme yapıyoruz
 * @param cariKodu - Aranacak cari kodu
 * @returns Promise<CariApiResponse>
 */
export const getCariByKod = async (cariKodu: string): Promise<CariApiResponse> => {
  try {
    console.log(`Cari kodu "${cariKodu}" için tüm listeyi çekip filtreleme yapılıyor...`);
    
    // Tüm carileri çek
    const allCariler = await getErpCariler();
    
    if (!allCariler.success) {
      return allCariler;
    }
    
    // Client-side filtreleme
    const filtered = allCariler.data.filter(cari => 
      cari.CARI_KOD?.toLowerCase().includes(cariKodu.toLowerCase()) ||
      cari.CARI_ISIM?.toLowerCase().includes(cariKodu.toLowerCase())
    );
    
    return {
      success: true,
      data: filtered,
      message: `"${cariKodu}" için ${filtered.length} adet sonuç bulundu.`
    };

  } catch (error) {
    console.error('Cari arama API hatası:', error);
    
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Cari arama sırasında hata oluştu'
    };
  }
};

/**
 * Cari verilerini filtreler
 * @param cariler - Filtrelenecek cari listesi
 * @param searchText - Arama metni
 * @returns erpCari[]
 */
export const filterCariler = (cariler: erpCari[], searchText: string): erpCari[] => {
  if (!searchText || searchText.trim() === '') {
    return cariler;
  }

  const searchLower = searchText.toLowerCase().trim();
  
  return cariler.filter(cari => 
    cari.CARI_KOD?.toLowerCase().includes(searchLower) ||
    cari.CARI_ISIM?.toLowerCase().includes(searchLower) ||
    cari.VERGI_NUMARASI?.toLowerCase().includes(searchLower) ||
    cari.EMAIL?.toLowerCase().includes(searchLower) ||
    cari.CARI_TEL?.toLowerCase().includes(searchLower) ||
    cari.CARI_TEL2?.toLowerCase().includes(searchLower) ||
    cari.GSM1?.toLowerCase().includes(searchLower)
  );
};

// Export default
export default {
  getErpCariler,
  getCariByKod,
  filterCariler
};