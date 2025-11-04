import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';

const LANGUAGE_KEY = 'app_language';

// Platform-specific storage
const getStorageItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await AsyncStorage.getItem(key);
};

const setStorageItem = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await AsyncStorage.setItem(key, value);
  }
};

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'tr');

  useEffect(() => {
    console.log('useLanguage useEffect - i18n.language:', i18n.language);
    console.log('useLanguage useEffect - currentLanguage:', currentLanguage);
    
    const handleLanguageChange = (lng: string) => {
      console.log('useLanguage - languageChanged event:', lng);
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    // İlk yüklemede mevcut dili set et
    if (i18n.language && i18n.language !== currentLanguage) {
      setCurrentLanguage(i18n.language);
    }

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, currentLanguage]);

  const changeLanguage = async (language: string) => {
    try {
      console.log('useLanguage - changeLanguage çağrıldı:', language);
      console.log('useLanguage - Mevcut dil:', currentLanguage);
      console.log('useLanguage - i18n.language:', i18n.language);
      console.log('useLanguage - Platform:', Platform.OS);
      
      // i18n dil değişikliği
      const result = await i18n.changeLanguage(language);
      console.log('useLanguage - i18n.changeLanguage result:', result);
      
      // Storage'a kaydet
      await setStorageItem(LANGUAGE_KEY, language);
      console.log('useLanguage - Storage\'a kaydedildi:', language);
      
      // Web ortamında manuel state güncelleme
      if (Platform.OS === 'web') {
        setCurrentLanguage(language);
        console.log('useLanguage - Web ortamında manuel state güncellendi:', language);
      }
      
      console.log('useLanguage - Dil değiştirildi:', language);
      console.log('useLanguage - Yeni i18n.language:', i18n.language);
    } catch (error) {
      console.error('Dil değiştirme hatası:', error);
    }
  };

  const getCurrentLanguage = () => {
    return currentLanguage;
  };

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await getStorageItem(LANGUAGE_KEY);
      if (savedLanguage) {
        await i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Kaydedilen dil yükleme hatası:', error);
    }
  };

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    loadSavedLanguage,
    currentLanguage,
  };
};