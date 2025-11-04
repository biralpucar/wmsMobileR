// API Base URL Configuration
// Tüm API servislerinde kullanılacak temel URL

// Ortam ayarları: 'development', 'production' veya 'production-https'
const ENVIRONMENT = 'production-http'; // HTTP kullan (HTTPS sertifika sorunu var)

// API Base URL'leri (WebApi/baseUrl.ts'den alındı)
const API_CONFIG = {
  development: 'http://localhost:5000/api', // Yerel geliştirme
  'development-web': 'http://localhost:5102/api', // WebApi'deki localhost adresi
  production: 'https://92.205.188.223:7000/api', // Production sunucu (HTTPS port 7000)
  'production-http': 'http://92.205.188.223:5000/api', // Production sunucu (HTTP port 5000)
  'production-https': 'https://api.v3rii.com/api', // WebApi'deki HTTPS production adresi (yorum satırında)
  // Örnek: 'http://192.168.1.100:5000/api'
};

// Aktif ortama göre base URL'i seç
export const API_BASE_URL = API_CONFIG[ENVIRONMENT] || API_CONFIG.development;

// SignalR Hub URL'i (API base URL'den /api kısmını çıkarıp /authHub ekle)
const BASE_URL_WITHOUT_API = API_BASE_URL.replace('/api', '');
export const SIGNALR_HUB_URL = `${BASE_URL_WITHOUT_API}/authHub`;

// API endpoint'leri için yardımcı fonksiyonlar
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
};

// Güncel API endpoint'leri (Backend API'ye göre)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    USER: '/auth/user',
    // LOGOUT: '/auth/logout' // TODO: API'ye eklenecek
  },
  ERP: {
    CARI: '/Erp/getCari',
    STOK: '/Erp/getStoks',
    DEPO: '/Erp/getDepos',
    PROJE: '/Erp/getProjeler',
    OPEN_GOODS_BY_CUSTOMER: '/Erp/get-open-goods-for-order-by-customer-by-id',
    OPEN_GOODS_DETAILS: '/Erp/get-open-goods-for-order-details-by-order-number',
    ON_HAND_QUANTITY: '/Erp/get-onhand-quantity-by-id',
    HEALTH_CHECK: '/Erp/health-check'
  },
  MOBILE_MENU: {
    HEADER: '/MobilemenuHeader',
    LINE: '/MobilemenuLine',
    PAGE_GROUP: '/MobilePageGroup',
    USER_GROUP_MATCH: '/MobileUserGroupMatch'
  },
  TRANSFER: {
    HEADER: '/TrHeader',
    LINE: '/TrLine',
    ROUTE: '/TrRoute',
    BOX: '/TrBox',
    S_BOX: '/TrSBox',
    IMPORT_LINE: '/TrImportLine',
    TERMINAL_LINE: '/TrTerminalLine'
  },
  GOODS_RECEIPT: {
    HEADER: '/GrHeader',
    LINE: '/GrLine',
    IMPORT_DOCUMENT: '/GrImportDocument',
    IMPORT_L: '/GrImportL',
    IMPORT_SERIAL_LINE: '/GrImportSerialLine'
  },
  GOOD_RECEIPT_FUNCTIONS: {
    HEADERS_BY_CUSTOMER: '/GoodReciptFunctions/headers/customer',
    LINES_BY_ORDERS: '/GoodReciptFunctions/lines/orders'
  }
};