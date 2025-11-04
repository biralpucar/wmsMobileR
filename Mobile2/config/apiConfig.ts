// API Base URL Configuration
export const API_CONFIG = {
  development: 'https://localhost:7000/api',
  production: 'http://92.205.188.223:5000/api'
};

// Şu anki ortam
export const API_BASE_URL = API_CONFIG.production;

// Endpoint'ler
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    USER: '/auth/user'
  },
  MENU: {
    HEADER_ALL: '/MobilemenuHeader',
    HEADER_ACTIVE: '/MobilemenuHeader/active',
    HEADER_OPEN: '/MobilemenuHeader/open-menus',
    LINE_ALL: '/MobilemenuLine',
    LINE_BY_HEADER: '/MobilemenuLine/by-header',
    USER_GROUP_MATCH_ALL: '/MobileUserGroupMatch',
    USER_GROUP_BY_USER: '/MobileUserGroupMatch/by-user'
  }
};

