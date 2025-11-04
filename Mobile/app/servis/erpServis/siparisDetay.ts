// Sipariş Detay API Servisi
// {API_BASE_URL}/Erp/get-open-goods-for-order-details-by-order-number/{orderNumber} endpoint'ine GET isteği atar

// Interface'leri class dosyasından import et
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../baseUrl';
import {
    erpSiparisDetay,
    SiparisDetayApiResponse
} from '../erpClass/siparisDetayServisClass';
import { parseArrayResponse, getApiErrorMessage } from '../utils/apiResponseParser';

/**
 * Belirli bir sipariş numarasına göre sipariş detaylarını getirir
 * API Endpoint: GET /api/Erp/get-open-goods-for-order-details-by-order-number/{orderNumber}
 * API Response: ApiResponse<List<OpenGoodsForOrderDetailDto>>
 * @param siparisListesi - Sipariş numarası (virgülle ayrılmış sipariş numaraları da olabilir)
 * @returns Promise<SiparisDetayApiResponse>
 */
export const getSiparisDetayBySiparisListesi = async (siparisListesi: string): Promise<SiparisDetayApiResponse> => {
  try {
    console.log(`Sipariş listesi "${siparisListesi}" için API'ye istek atılıyor...`);
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ERP.OPEN_GOODS_DETAILS}/${siparisListesi}`, {
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
    const data = parseArrayResponse<erpSiparisDetay>(rawData);
    
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
      message: `${data.length} adet sipariş detayı başarıyla alındı.`
    };

  } catch (error) {
    console.error('Sipariş detay API hatası:', error);

    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
    };
  }
};

/**
 * Tüm sipariş detaylarını getirir
 * Not: API'de tüm sipariş detaylarını getiren bir endpoint yok,
 * sipariş numarasına göre getiriliyor sadece
 * @returns Promise<SiparisDetayApiResponse>
 */
export const getAllSiparisDetaylar = async (): Promise<SiparisDetayApiResponse> => {
  try {
    console.log('Tüm sipariş detayları için API endpoint\'i bulunamadı...');
    
    // API'de tüm sipariş detaylarını getiren bir endpoint yok
    // Sipariş numarasına göre getiriliyor sadece
    return {
      success: false,
      data: [],
      error: 'API\'de tüm sipariş detaylarını getiren endpoint bulunamadı. Lütfen sipariş numarasına göre arama yapın.'
    };

  } catch (error) {
    console.error('Sipariş detay API hatası:', error);
    
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Sipariş detay alma sırasında hata oluştu'
    };
  }
};

/**
 * Sipariş detay verilerini filtreler
 * @param siparisDetaylar - Filtrelenecek sipariş detay listesi
 * @param searchText - Arama metni
 * @returns erpSiparisDetay[]
 */


// Export default
export default {
  getSiparisDetayBySiparisListesi,
  getAllSiparisDetaylar,
};