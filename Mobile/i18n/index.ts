import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';

// Dil dosyalarını import et
import en from './locales/en.json';
import tr from './locales/tr.json';

const LANGUAGE_KEY = 'app_language';

// Platform-specific storage
const getStorageItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.warn('localStorage erişim hatası:', error);
    }
    return null;
  }
  return await AsyncStorage.getItem(key);
};

const setStorageItem = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('localStorage yazma hatası:', error);
    }
  } else {
    await AsyncStorage.setItem(key, value);
  }
};

const resources = {
  tr: {
    translation: tr,
  },
  en: {
    translation: en,
  },
};

// Kaydedilen dili yükle
const loadLanguage = async () => {
  try {
    const savedLanguage = await getStorageItem(LANGUAGE_KEY);
    return savedLanguage || 'tr'; // Varsayılan Türkçe
  } catch (error) {
    console.error('Dil yükleme hatası:', error);
    return 'tr';
  }
};

// Dil kaydetme fonksiyonu
export const saveLanguage = async (language: string) => {
  try {
    await setStorageItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Dil kaydetme hatası:', error);
  }
};

// i18n'i initialize et
const initializeI18n = async () => {
  // Varsayılan dil
  let defaultLanguage = 'tr';
  
  // Platform bağımsız dil yükleme
  try {
    const savedLanguage = await loadLanguage();
    if (savedLanguage) {
      defaultLanguage = savedLanguage;
    }
  } catch (error) {
    console.error('Dil yükleme hatası:', error);
  }
  
  console.log('i18n başlatılıyor, varsayılan dil:', defaultLanguage);
  
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
      fallbackLng: 'en',
      debug: true, // Debug modunu aç
      interpolation: {
        escapeValue: false,
      },
      compatibilityJSON: 'v4',
    });
    
  console.log('i18n başlatıldı, mevcut dil:', i18n.language);
};

// Initialize et
initializeI18n().catch(console.error);

// Web ortamı için ek konfigürasyon
if (Platform.OS === 'web') {
  // Web'de dil değişikliği için event listener ekle
  i18n.on('languageChanged', (lng) => {
    console.log('i18n languageChanged event:', lng);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(LANGUAGE_KEY, lng);
      }
    } catch (error) {
      console.warn('localStorage event yazma hatası:', error);
    }
  });
}

export default i18n;