import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ILocalizationService } from '../Interfaces/ILocalizationService';
import { ApiResponse } from '../Models/ApiResponse';
import { ApiResponseErrorHelper } from '../Helpers/ApiResponseErrorHelper';

const api = axios.create({
  baseURL: API_BASE_URL + "/Localization",
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config : AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LocalizationResource {
    [key: string]: string;
}

export interface SupportedLanguage {
    code: string;
    name: string;
    nativeName: string;
}

export class LocalizationService implements ILocalizationService {
    private currentLanguage: string;
    private resources: { [language: string]: LocalizationResource } = {};
    private readonly LANGUAGE_KEY = 'selected_language';
    private readonly DEFAULT_LANGUAGE = 'tr-TR';

    // Desteklenen diller
    private readonly supportedLanguages: SupportedLanguage[] = [
        { code: 'tr-TR', name: 'Turkish', nativeName: 'Türkçe' },
        { code: 'en-US', name: 'English', nativeName: 'English' },
        { code: 'de-DE', name: 'German', nativeName: 'Deutsch' },
        { code: 'fr-FR', name: 'French', nativeName: 'Français' },
        { code: 'es-ES', name: 'Spanish', nativeName: 'Español' },
        { code: 'it-IT', name: 'Italian', nativeName: 'Italiano' },
        { code: 'ru-RU', name: 'Russian', nativeName: 'Русский' },
        { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
        { code: 'ja-JP', name: 'Japanese', nativeName: '日本語' },
        { code: 'ko-KR', name: 'Korean', nativeName: '한국어' }
    ];

    constructor() {
        this.currentLanguage = this.getStoredLanguage() || this.getBrowserLanguage() || this.DEFAULT_LANGUAGE;
        this.loadLanguageResources(this.currentLanguage);
    }

    /**
     * Tarayıcının varsayılan dilini alır
     */
    private getBrowserLanguage(): string {
        const browserLang = navigator.language || (navigator as any).userLanguage;
        
        // Desteklenen diller arasında tam eşleşme ara
        const exactMatch = this.supportedLanguages.find(lang => lang.code === browserLang);
        if (exactMatch) return exactMatch.code;

        // Dil kodunun ilk kısmına göre eşleşme ara (örn: 'en-GB' -> 'en-US')
        const langPrefix = browserLang.split('-')[0];
        const prefixMatch = this.supportedLanguages.find(lang => lang.code.startsWith(langPrefix));
        if (prefixMatch) return prefixMatch.code;

        return this.DEFAULT_LANGUAGE;
    }

    /**
     * Yerel depolamadan dil tercihini alır
     */
    private getStoredLanguage(): string | null {
        return localStorage.getItem(this.LANGUAGE_KEY);
    }

    /**
     * Dil tercihini yerel depolamaya kaydeder
     */
    private setStoredLanguage(language: string): void {
        localStorage.setItem(this.LANGUAGE_KEY, language);
    }

    /**
     * Mevcut dili döner
     */
    getCurrentLanguage(): string {
        return this.currentLanguage;
    }

    /**
     * Desteklenen dilleri döner
     */
    getSupportedLanguages(): SupportedLanguage[] {
        return [...this.supportedLanguages];
    }

    /**
     * Dili değiştirir
     */
    async setLanguage(language: string): Promise<void> {
        try {
            if (!this.supportedLanguages.some(lang => lang.code === language)) {
                throw new Error(`Desteklenmeyen dil: ${language}`);
            }

            this.currentLanguage = language;
            this.setStoredLanguage(language);
            await this.loadLanguageResources(language);
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Dil kaynaklarını server'dan yükler
     */
    private async loadLanguageResources(language: string): Promise<void> {
        try {
            const response = await api.get<ApiResponse<LocalizationResource>>(`/resources/${language}`);
            this.resources[language] = response.data.data || {};
        } catch (error) {
            console.warn(`Dil kaynakları yüklenemedi (${language}):`, error);
            
            // Fallback olarak varsayılan dil kaynaklarını yükle
            if (language !== this.DEFAULT_LANGUAGE) {
                await this.loadLanguageResources(this.DEFAULT_LANGUAGE);
            } else {
                // Varsayılan kaynakları da yükleyemezse, boş kaynak seti oluştur
                this.resources[language] = {};
            }
        }
    }

    /**
     * Yerelleştirilmiş string döner
     */
    getLocalizedString(key: string, fallback?: string): string {
        const currentResources = this.resources[this.currentLanguage] || {};
        const defaultResources = this.resources[this.DEFAULT_LANGUAGE] || {};
        
        // Önce mevcut dilde ara
        if (currentResources[key]) {
            return currentResources[key];
        }
        
        // Sonra varsayılan dilde ara
        if (defaultResources[key]) {
            return defaultResources[key];
        }
        
        // Fallback veya key'in kendisini döner
        return fallback || key;
    }

    /**
     * Parametreli yerelleştirilmiş string döner
     */
    getLocalizedStringWithParams(key: string, params: { [key: string]: any }, fallback?: string): string {
        let localizedString = this.getLocalizedString(key, fallback);
        
        // Parametreleri string içinde değiştir
        Object.keys(params).forEach(paramKey => {
            const placeholder = `{${paramKey}}`;
            localizedString = localizedString.replace(new RegExp(placeholder, 'g'), params[paramKey]);
        });
        
        return localizedString;
    }

    /**
     * Çoklu parametreli yerelleştirilmiş string döner (index tabanlı)
     */
    getLocalizedStringWithArgs(key: string, args: any[], fallback?: string): string {
        let localizedString = this.getLocalizedString(key, fallback);
        
        // Index tabanlı parametreleri değiştir ({0}, {1}, vb.)
        args.forEach((arg, index) => {
            const placeholder = `{${index}}`;
            localizedString = localizedString.replace(new RegExp(placeholder, 'g'), arg);
        });
        
        return localizedString;
    }

    /**
     * Tüm dil kaynaklarını yeniden yükler
     */
    async reloadResources(): Promise<void> {
        try {
            this.resources = {};
            await this.loadLanguageResources(this.currentLanguage);
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Belirli bir dil için kaynakları önceden yükler
     */
    async preloadLanguage(language: string): Promise<void> {
        try {
            if (!this.resources[language]) {
                await this.loadLanguageResources(language);
            }
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Mevcut dilin RTL (sağdan sola) olup olmadığını kontrol eder
     */
    isRTL(): boolean {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        const langPrefix = this.currentLanguage.split('-')[0];
        return rtlLanguages.includes(langPrefix);
    }

    /**
     * Tarih formatını mevcut dile göre döner
     */
    getDateFormat(): string {
        const dateFormats: { [key: string]: string } = {
            'tr-TR': 'DD.MM.YYYY',
            'en-US': 'MM/DD/YYYY',
            'en-GB': 'DD/MM/YYYY',
            'de-DE': 'DD.MM.YYYY',
            'fr-FR': 'DD/MM/YYYY',
            'es-ES': 'DD/MM/YYYY',
            'it-IT': 'DD/MM/YYYY',
            'ru-RU': 'DD.MM.YYYY',
            'zh-CN': 'YYYY/MM/DD',
            'ja-JP': 'YYYY/MM/DD',
            'ko-KR': 'YYYY.MM.DD'
        };

        return dateFormats[this.currentLanguage] || dateFormats[this.DEFAULT_LANGUAGE];
    }

    /**
     * Sayı formatını mevcut dile göre döner
     */
    formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
        return new Intl.NumberFormat(this.currentLanguage, options).format(value);
    }

    /**
     * Para birimi formatını mevcut dile göre döner
     */
    formatCurrency(value: number, currency: string = 'TRY'): string {
        return new Intl.NumberFormat(this.currentLanguage, {
            style: 'currency',
            currency: currency
        }).format(value);
    }

    /**
     * Tarih formatını mevcut dile göre döner
     */
    formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
        return new Intl.DateTimeFormat(this.currentLanguage, options).format(date);
    }
}

