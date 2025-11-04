// API Base URL Configuration 
// TÃ¼m API servislerinde kullanÄ±lacak temel URL 
import i18n from 'i18next'; 

//export const API_BASE_URL: string = "https://api.v3rii.com/api" 
export const API_BASE_URL: string = "http://localhost:5102/api"  
export const DEFAULT_TIMEOUT: number = 10000; 
export const CURRENTLANGUAGE = i18n.language || 'tr'; 

/**
 * Authentication token'Ä±nÄ± localStorage'dan alÄ±r
 * @returns {string | null} JWT token veya null
 */
export const getAuthToken = (): string | null => {
  // Ã–nce localStorage'dan kontrol et
  const token = localStorage.getItem('authToken');
  if (token) {
    return token;
  }
  
  // Alternatif olarak sessionStorage'dan kontrol et
  const sessionToken = sessionStorage.getItem('authToken');
  if (sessionToken) {
    return sessionToken;
  }
  
  // Token bulunamazsa null dÃ¶ndÃ¼r
  return null;
};

/**
 * Authentication token'Ä±nÄ± localStorage'a kaydeder
 * @param {string} token - JWT token
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

/**
 * Authentication token'Ä±nÄ± localStorage'dan siler
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};

/**
 * KullanÄ±cÄ±nÄ±n giriÅŸ yapÄ±p yapmadÄ±ÄŸÄ±nÄ± kontrol eder
 * @returns {boolean} Token varsa true, yoksa false
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
