import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { API_BASE_URL, SIGNALR_HUB_URL, getApiUrl } from '../app/servis/baseUrl';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  deviceId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Benzersiz device ID oluştur
const generateDeviceId = () => {
  return 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceId, setDeviceId] = useState('');
  const hubConnectionRef = useRef<HubConnection | null>(null);
  const router = useRouter();
  const segments = useSegments();
  const { t } = useTranslation();

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      const storedDeviceId = await AsyncStorage.getItem('device_id');
      
      if (token) {
        try {
          // Backend'den kullanıcı bilgilerini ve session durumunu kontrol et
          const response = await fetch(getApiUrl('/auth/user'), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Device-ID': storedDeviceId || deviceId
            }
          });
          
          if (response.ok) {
            const apiResponse = await response.json();
            // API response formatı: { success: true, data: {...} }
            const isSuccess = apiResponse.Success ?? apiResponse.success ?? false;
            
            if (isSuccess) {
              setIsAuthenticated(true);
              // setUser(apiResponse.Data || apiResponse.data); // user state'i varsa
              
              // SignalR hub'a bağlan
              await connectToHub();
            } else {
              // Token geçersiz veya süresi dolmuş
              console.warn('401 Unauthorized - setting authenticated to false');
              setIsAuthenticated(false);
              await AsyncStorage.removeItem('jwt_token');
            }
          } else if (response.status === 401) {
            // Token geçersiz veya başka cihazdan giriş yapılmış
            console.log('401 Unauthorized - setting authenticated to false');
            setIsAuthenticated(false);
            
            try {
              const errorData = await response.json();
              if (errorData.reason === 'device_conflict') {
                Alert.alert(
                  t('sessionTerminated'),
                  t('deviceConflictMessage'),
                  [{ text: t('ok'), onPress: () => logout() }]
                );
              } else {
                // Token geçersiz - storage'ı temizle
                await AsyncStorage.multiRemove(['jwt_token', 'user_data', 'device_id']);
              }
            } catch (jsonError) {
              // JSON parse hatası - storage'ı temizle
              await AsyncStorage.multiRemove(['jwt_token', 'user_data', 'device_id']);
            }
          } else {
            // Diğer hatalar
            console.log('Other error - setting authenticated to false');
            setIsAuthenticated(false);
            await AsyncStorage.multiRemove(['jwt_token', 'user_data', 'device_id']);
          }
        } catch (networkError) {
          console.warn('Network error during auth check:', networkError);
          // Network hatası durumunda local token'a güven
          setIsAuthenticated(true);
        }
      } else {
        // Token yok
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // SignalR Hub bağlantısını kur
  const connectToHub = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (!token) {
        console.warn('SignalR: No token available, skipping connection');
        return;
      }

      // Mevcut bağlantıyı kapat
      if (hubConnectionRef.current) {
        try {
          await hubConnectionRef.current.stop();
        } catch (stopError) {
          console.warn('SignalR: Error stopping previous connection:', stopError);
        }
      }

      // Yeni bağlantı oluştur
      // ASP.NET Core SignalR token'ı query string'de access_token olarak bekliyor (Program.cs line 193)
      // URL'e manuel olarak token ekle
      const hubUrlWithToken = `${SIGNALR_HUB_URL}?access_token=${encodeURIComponent(token)}`;
      console.log('SignalR: Attempting to connect to:', hubUrlWithToken.replace(token, '***'));
      
      const connection = new HubConnectionBuilder()
        .withUrl(hubUrlWithToken)
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // İlk 3 deneme hızlı, sonra daha yavaş
            if (retryContext.previousRetryCount < 3) {
              return 2000; // 2 saniye
            }
            return 10000; // 10 saniye
          }
        })
        .configureLogging(LogLevel.Warning) // Information yerine Warning - daha az log
        .build();

      // ForceLogout event'ini dinle
      connection.on('ForceLogout', (reason: string) => {
        console.log('Force logout received:', reason);
        
        // Önce logout işlemini yap
        logout();
        
        // Sonra kullanıcıya bilgi ver
        setTimeout(() => {
          Alert.alert(
            t('sessionTerminated'),
            reason === 'device_conflict' ? t('deviceConflictMessage') : t('sessionExpired'),
            [{ text: t('ok') }]
          );
        }, 100);
      });

      // Bağlantı hatalarını yakala
      connection.onclose((error) => {
        if (error) {
          console.warn('SignalR connection closed with error:', error);
        } else {
          console.log('SignalR connection closed normally');
        }
      });

      // Bağlantıyı başlat (timeout ile)
      const connectionPromise = connection.start();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('SignalR connection timeout')), 10000)
      );

      await Promise.race([connectionPromise, timeoutPromise]);
      hubConnectionRef.current = connection;
      console.log('✅ SignalR connected successfully');

    } catch (error: any) {
      // SignalR bağlantı hatası uygulamayı durdurmamalı
      console.warn('⚠️ SignalR connection failed (app will continue):', error?.message || error);
      // Uygulama çalışmaya devam edecek - SignalR opsiyonel
    }
  };

  // SignalR bağlantısını kapat
  const disconnectFromHub = async () => {
    try {
      if (hubConnectionRef.current) {
        await hubConnectionRef.current.stop();
        hubConnectionRef.current = null;
        console.log('SignalR disconnected');
      }
    } catch (error) {
      console.error('SignalR disconnect error:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const currentDeviceId = await AsyncStorage.getItem('device_id') || deviceId;
      
      const response = await fetch(getApiUrl('/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Device-ID': currentDeviceId
        },
        body: JSON.stringify({ email, password }),
      });

      const apiResponse = await response.json();
      
      // Debug: API response'u logla
      console.log('🔍 Login API Response:', {
        status: response.status,
        ok: response.ok,
        apiResponse: apiResponse
      });

      // API hem büyük hem küçük harf kullanabilir: Success/success, Data/data
      const isSuccess = apiResponse.Success ?? apiResponse.success ?? false;
      const data = apiResponse.Data ?? apiResponse.data;

      console.log('🔍 Parsed values:', { isSuccess, data, hasData: !!data });

      if (response.ok && isSuccess && data) {
        // API formatı: { success: true, data: { token: "..." } } veya { Success: true, Data: { token: "..." } }
        const token = data.token || data;
        
        console.log('🔑 Token extracted:', { token, isString: typeof token === 'string' });
        
        if (typeof token === 'string') {
          await AsyncStorage.setItem('jwt_token', token);
          await AsyncStorage.setItem('user_data', JSON.stringify(data.user || {}));
          await AsyncStorage.setItem('device_id', currentDeviceId);
          
          setIsAuthenticated(true);
          
          // SignalR hub'a bağlan
          await connectToHub();
          
          return { success: true };
        } else {
          const message = apiResponse.Message ?? apiResponse.message ?? 'Token alınamadı';
          return { success: false, message };
        }
      } else {
        // Hata mesajını hem büyük hem küçük harf formatlarından al
        const message = apiResponse.Message ?? apiResponse.message;
        const exceptionMessage = apiResponse.ExceptionMessage ?? apiResponse.exceptionMessage;
        const statusCode = apiResponse.StatusCode ?? apiResponse.statusCode;
        
        console.log('❌ Login başarısız:', {
          responseOk: response.ok,
          apiSuccess: isSuccess,
          message,
          exceptionMessage,
          statusCode
        });
        return { success: false, message: message || exceptionMessage || 'Giriş başarısız' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Bağlantı hatası' };
    }
  };

  const logout = async () => {
    try {
      // SignalR bağlantısını kapat
      await disconnectFromHub();
      
      const token = await AsyncStorage.getItem('jwt_token');
      const storedDeviceId = await AsyncStorage.getItem('device_id');
      
      if (token) {
        // Sunucuya logout isteği gönder
        try {
          await fetch(getApiUrl('/auth/logout'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              'Device-ID': storedDeviceId || deviceId
            }
          });
        } catch (logoutError) {
          console.warn('Server logout failed:', logoutError);
        }
      }
      
      // Local storage'ı temizle
      await AsyncStorage.multiRemove(['jwt_token', 'user_data', 'device_id']);
      setIsAuthenticated(false);
      
      // Login sayfasına yönlendir
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Hata durumunda da local storage'ı temizle
      await AsyncStorage.multiRemove(['jwt_token', 'user_data', 'device_id']);
      setIsAuthenticated(false);
      
      // Login sayfasına yönlendir
      router.replace('/login');
    }
  };

  useEffect(() => {
    // Device ID'yi başlat
    const initDeviceId = async () => {
      let storedDeviceId = await AsyncStorage.getItem('device_id');
      if (!storedDeviceId) {
        storedDeviceId = generateDeviceId();
        await AsyncStorage.setItem('device_id', storedDeviceId);
      }
      setDeviceId(storedDeviceId);
    };
    
    initDeviceId().then(() => {
      checkAuthStatus();
    });
  }, []);
  
  // Session kontrolü artık backend API çağrılarında yapılacak

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'login';

    if (!isAuthenticated && !inAuthGroup) {
      // Kullanıcı giriş yapmamış ve login sayfasında değil, login'e yönlendir
      router.replace('/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Kullanıcı giriş yapmış ve login sayfasında, home'a yönlendir
      router.replace('/home');
    }
  }, [isAuthenticated, segments, isLoading]);

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuthStatus,
    deviceId,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}