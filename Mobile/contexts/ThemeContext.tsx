import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function CustomThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme();
  const [theme, setThemeState] = useState<Theme>('system');
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Etkili tema hesaplama
  const effectiveTheme = theme === 'system' ? (systemColorScheme || 'light') : theme;
  const isDarkMode = effectiveTheme === 'dark';

  // AsyncStorage'dan tema yükleme
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme as Theme);
      }
    } catch (error) {
      console.log('Tema yüklenirken hata:', error);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      // Force re-render to update colors immediately
      setForceUpdate(prev => prev + 1);
    } catch (error) {
      console.log('Tema kaydedilirken hata:', error);
    }
  };

  const value: ThemeContextType = {
    theme,
    effectiveTheme,
    setTheme,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value} key={forceUpdate}>
      {children}
    </ThemeContext.Provider>
  );
}

// Backward compatibility
export const ThemeProvider = CustomThemeProvider;

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}