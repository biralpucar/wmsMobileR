import { useCustomAlert } from '@/components/CustomAlert';
import CustomTextInput from '@/components/CustomTextInput';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { login } = useAuth();
  
  // Tema hook'ları
  const { isDarkMode, setTheme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const surfaceColor = useThemeColor({}, 'surface');
  const borderColor = useThemeColor({}, 'border');

  // Dil seçenekleri
  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  // Dil değiştirme fonksiyonu
  const handleLanguageSelect = async (languageCode: string) => {
    console.log('=== LOGIN LANGUAGE SELECT START ===');
    console.log('Login - Dil seçildi:', languageCode);
    console.log('Login - Mevcut dil:', currentLanguage);
    console.log('Login - languages array:', languages);
    console.log('Login - getCurrentLanguage():', getCurrentLanguage());
    
    if (languageCode === currentLanguage) {
      console.log('Login - Aynı dil seçildi, dropdown kapatılıyor');
      setIsLanguageDropdownOpen(false);
      return;
    }
    
    try {
      console.log('Login - changeLanguage çağrılıyor...');
      console.log('Login - changeLanguage fonksiyonu:', typeof changeLanguage);
      
      const result = await changeLanguage(languageCode);
      console.log('Login - changeLanguage result:', result);
      console.log('Login - Dil başarıyla değiştirildi:', languageCode);
      
      // Dropdown'ı kapat
      setIsLanguageDropdownOpen(false);
      console.log('Login - Dropdown kapatıldı');
      
      // Sayfayı yeniden render etmek için state'i zorla güncelle
      setTimeout(() => {
        console.log('Login - Zorla render için state güncelleniyor');
        console.log('Login - Yeni currentLanguage:', currentLanguage);
      }, 100);
      
    } catch (error) {
      console.error('Login - Dil değiştirme hatası:', error);
    }
    console.log('=== LOGIN LANGUAGE SELECT END ===');
  };

  // Mevcut dili getir
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert({
        title: t('error'),
        message: t('fillAllFields'),
        type: 'error',
        buttons: [{ text: t('ok'), onPress: () => {} }]
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // AuthContext'in login metodunu kullan
      const result = await login(email, password);
      
      if (result.success) {
        showAlert({
          title: t('success'),
          message: t('loginSuccessful'),
          type: 'success',
          buttons: [{ 
            text: t('ok'), 
            onPress: () => {
              // AuthContext otomatik olarak home'a yönlendirecek
            }
          }]
        });
      } else {
        // Login başarısız
        showAlert({
          title: t('error'),
          message: result.message || t('loginFailed'),
          type: 'error',
          buttons: [{ text: t('ok'), onPress: () => {} }]
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      showAlert({
        title: t('error'),
        message: t('networkError'),
        type: 'error',
        buttons: [{ text: t('ok'), onPress: () => {} }]
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      


      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={{ flex: 0.3, justifyContent: 'flex-end', alignItems: 'center', paddingTop: 64, minHeight: 200 }}>
          {/* Tema ve Dil Seçimi Butonları */}
          <View style={{ position: 'absolute', top: 50, right: 20, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {/* Dil Seçici */}
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Dil butonu tıklandı, dropdown durumu:', isLanguageDropdownOpen);
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: cardColor,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: borderColor,
                  minWidth: 60
                }}
              >
                <Text style={{ fontSize: 16, marginRight: 8 }}>
                  {getCurrentLanguage().flag}
                </Text>
                <Text style={{ color: textColor, fontSize: 12, fontWeight: '500' }}>
                  {getCurrentLanguage().code.toUpperCase()}
                </Text>
              </TouchableOpacity>
              
              {/* Basit Dropdown Menüsü */}
               {isLanguageDropdownOpen && (
                 <View
                   style={{
                     position: 'absolute',
                     top: 45,
                     right: 0,
                     backgroundColor: cardColor,
                     borderRadius: 8,
                     borderWidth: 1,
                     borderColor: borderColor,
                     shadowColor: '#000',
                     shadowOffset: { width: 0, height: 2 },
                     shadowOpacity: 0.25,
                     shadowRadius: 4,
                     elevation: 5,
                     minWidth: 120,
                     zIndex: 9999
                   }}
                 >
                  <TouchableOpacity
                     onPress={() => {
                       console.log('Türkçe seçildi');
                       handleLanguageSelect('tr');
                     }}
                     style={{
                       flexDirection: 'row',
                       alignItems: 'center',
                       paddingHorizontal: 12,
                       paddingVertical: 10,
                       borderBottomWidth: 1,
                       borderBottomColor: borderColor,
                       backgroundColor: currentLanguage === 'tr' ? surfaceColor : 'transparent'
                     }}
                     activeOpacity={0.7}
                     hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                   >
                    <Text style={{ fontSize: 16, marginRight: 15 }}>🇹🇷</Text>
                    <Text style={{ color: textColor, fontSize: 12, flex: 1 }}>Türkçe</Text>
                    {currentLanguage === 'tr' && (
                      <Text style={{ color: primaryColor, fontSize: 12 }}>✓</Text>
                    )}
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                     onPress={() => {
                       console.log('İngilizce seçildi');
                       handleLanguageSelect('en');
                     }}
                     style={{
                       flexDirection: 'row',
                       alignItems: 'center',
                       paddingHorizontal: 12,
                       paddingVertical: 10,
                       backgroundColor: currentLanguage === 'en' ? surfaceColor : 'transparent'
                     }}
                     activeOpacity={0.7}
                     hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
                   >
                    <Text style={{ fontSize: 16, marginRight: 15 }}>🇺🇸</Text>
                    <Text style={{ color: textColor, fontSize: 12, flex: 1 }}>English</Text>
                    {currentLanguage === 'en' && (
                      <Text style={{ color: primaryColor, fontSize: 12 }}>✓</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Tema Değiştirme Butonu */}
            <TouchableOpacity
              onPress={() => setTheme(isDarkMode ? 'light' : 'dark')}
              style={{
                backgroundColor: cardColor,
                padding: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: borderColor
              }}
            >
              <View className="w-6 h-6 bg-transparent rounded-lg items-center justify-center">
                    <Ionicons
                      name={isDarkMode ? "sunny" : "moon"}
                      size={20}
                      color={isDarkMode ? "#FCD34D" : "#6366F1"}
                    />
                  </View>
            </TouchableOpacity>
          </View>
          
          <Image 
            source={require('../assets/images/v3riiLogo.png')} 
            style={{ 
              width: 400, 
              height: 120,
              alignSelf: 'center',
              resizeMode: 'contain'
            }} 
          />
        </View>

        {/* Login Form */}
        <View style={{ flex: 0.5, paddingHorizontal: 20, justifyContent: 'center', minHeight: 400 }}>
          <View style={{ 
            backgroundColor: cardColor, 
            borderRadius: 16, 
            padding: 32,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: isDarkMode ? 0.3 : 0.15,
            shadowRadius: 16,
            elevation: 12
          }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: textColor, textAlign: 'center', marginBottom: 8 }}>{t('welcome')}</Text>
            <Text style={{ fontSize: 16, color: secondaryColor, textAlign: 'center', marginBottom: 32 }}>{t('pleaseLogin')}</Text>
            
            <CustomTextInput
              label={t('email')}
              icon="mail-outline"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <CustomTextInput
              label={t('password')}
              icon="lock-closed-outline"
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChangeText={setPassword}
              textContentType = "password"
              secureTextEntry
              showPasswordToggle
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 24 }}>
              <Text style={{ color: primaryColor, fontSize: 14, fontWeight: '500' }}>{t('forgotPassword')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{
                borderRadius: 8,
                paddingVertical: 16,
                alignItems: 'center',
                backgroundColor: isLoading ? secondaryColor : primaryColor,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 6
              }}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
                {isLoading ? t('loggingIn') : t('login')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center', paddingBottom: 20, minHeight: 100 }}>
          <Text style={{ color: secondaryColor, fontSize: 12, textAlign: 'center', marginBottom: 4 }}>© 2025 V3rii. Tüm hakları saklıdır.</Text>
          <Text style={{ color: secondaryColor, fontSize: 12, textAlign: 'center' }}>Versiyon 1.0.0</Text>
        </View>
      </ScrollView>
      <AlertComponent />
    </KeyboardAvoidingView>
  );
}