// Mal Kabul Sipariş API Servisi
// ⚠️ DEPRECATED: Bu servis ERP veritabanını kullanıyor. Yeni kodlarda goodReceiptFunctionsServis.ts kullanın!
// localhost:5085/api/Erp/get-open-goods-for-order-by-customer-by-id/{cariKodu} endpoint'ine GET isteği atar

// Interface'leri class dosyasından import et
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../baseUrl';
import {
    erpMalKabulSiparis,
    MalKabulSiparisApiResponse
} from '../erpClass/malKabulSiparisServisClass';
import { parseObjectResponse, parseArrayResponse, getApiErrorMessage } from '../utils/apiResponseParser';

/**
 * Belirli bir cari koduna göre açık siparişleri getirir
 * ⚠️ DEPRECATED: Yeni kodlarda getGoodsReceiptHeadersByCustomer kullanın!
 * API Endpoint: GET /api/Erp/get-open-goods-for-order-by-customer-by-id/{cariKodu}
 * API Response: ApiResponse<OpenGoodsForOrderByCustomerDto?>
 * Not: Bu endpoint tek obje döndürüyor, obje içinde sipariş listesi olabilir
 * @param cariKodu - Cari kodu
 * @returns Promise<MalKabulSiparisApiResponse>
 */
export const getMalKabulSiparisByCariKod = async (cariKodu: string): Promise<MalKabulSiparisApiResponse> => {
  try {
    console.log(`Cari kodu "${cariKodu}" için açık siparişler API'sine istek atılıyor...`);
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.ERP.OPEN_GOODS_BY_CUSTOMER}/${cariKodu}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000, // 10 saniye timeout
    });

    console.log('API Response Status:', response.status);
    
    const rawData = response.data;
    console.log('API\'den gelen ham veri:', rawData);
    
    // API tek obje döndürüyor: ApiResponse<OpenGoodsForOrderByCustomerDto?>
    const dataObj = parseObjectResponse<any>(rawData);
    
    if (dataObj === null) {
      return {
        success: false,
        data: [],
        error: getApiErrorMessage(rawData)
      };
    }
    
    // Obje içinde array varsa onu al, yoksa boş array döndür
    let data: erpMalKabulSiparis[] = [];
    
    if (Array.isArray(dataObj)) {
      data = dataObj;
    } else if (dataObj && typeof dataObj === 'object') {
      // Obje içinde Orders, Items, veya benzeri bir array field olabilir
      if (dataObj.Orders && Array.isArray(dataObj.Orders)) {
        data = dataObj.Orders;
      } else if (dataObj.Items && Array.isArray(dataObj.Items)) {
        data = dataObj.Items;
      } else if (dataObj.data && Array.isArray(dataObj.data)) {
        data = dataObj.data;
      } else {
        // Tek obje döndüyse array'e çevir
        data = [dataObj as erpMalKabulSiparis];
      }
    }
    
    console.log('İşlenmiş veri sayısı:', data.length);
    
    return {
      success: true,
      data: data,
      message: `"${cariKodu}" cari kodu için ${data.length} adet açık sipariş bulundu.`
    };

  } catch (error) {
    console.error('Mal kabul sipariş API hatası:', error);

    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu'
    };
  }
};

/**
 * Tüm açık siparişleri getirir
 * Not: API'de tüm açık siparişleri getiren bir endpoint yok,
 * bu yüzden bu fonksiyon şu an için boş array döndürüyor
 * @returns Promise<MalKabulSiparisApiResponse>
 */
export const getAllMalKabulSiparisler = async (): Promise<MalKabulSiparisApiResponse> => {
  try {
    console.log('Tüm açık siparişler için API endpoint\'i bulunamadı...');
    
    // API'de tüm siparişleri getiren bir endpoint yok
    // Cari koduna göre getiriliyor sadece
    return {
      success: false,
      data: [],
      error: 'API\'de tüm açık siparişleri getiren endpoint bulunamadı. Lütfen cari koduna göre arama yapın.'
    };

  } catch (error) {
    console.error('Tüm açık siparişler API hatası:', error);
    
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Açık siparişler alınırken hata oluştu'
    };
  }
};

/**
 * Açık sipariş verilerini filtreler
 * @param siparisler - Filtrelenecek sipariş listesi
 * @param searchText - Arama metni
 * @returns erpMalKabulSiparis[]
 */


// Export default
export default {
  getMalKabulSiparisByCariKod,
  getAllMalKabulSiparisler,
};