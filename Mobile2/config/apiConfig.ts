// API Configuration
import { Platform } from 'react-native';

const API_CONFIG = {
  development: 'https://localhost:7000/api',  // HTTPS WebAPI
  production: 'http://localhost:5000/api',    // HTTP WebAPI (alternatif)
  'production-http': 'http://localhost:5000/api',  // HTTP WebAPI (Web için)
  'android-emulator': 'http://10.0.2.2:5000/api',  // Android Emulator için (10.0.2.2 = localhost)
  'android-device': 'http://192.168.1.100:5000/api'  // Android cihaz için (bilgisayar IP'si - değiştirin!)
};

// Ortam ayarları: 'development', 'production', 'production-http', 'android-emulator', 'android-device'
// Platform'a göre otomatik seçim yap

let ENVIRONMENT = 'production-http'; // Varsayılan

// Android emulator kontrolü
if (Platform.OS === 'android') {
  // Android emulator için 10.0.2.2 kullan
  ENVIRONMENT = 'android-emulator';
}

// Web için
if (Platform.OS === 'web') {
  ENVIRONMENT = 'production-http';
}

export const API_BASE_URL = API_CONFIG[ENVIRONMENT as keyof typeof API_CONFIG] || API_CONFIG.development;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    USER: '/auth/user',
    LOGOUT: '/auth/logout',
  },
  MENU: {
    HEADERS: '/mobilemenuheader',
    LINES_BY_HEADER: '/mobilemenuline/header',
    USER_GROUPS: '/mobileusergroupmatch/user',
  },
  CUSTOMER: {
    GET_ALL: '/Erp/getCari',
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

console.log('API Base URL:', API_BASE_URL);
