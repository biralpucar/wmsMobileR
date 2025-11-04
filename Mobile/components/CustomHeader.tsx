import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface CustomHeaderProps {
  title: string;
  subtitle?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  backgroundColor?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showNotificationButton?: boolean;
  onNotificationPress?: () => void;
  notificationCount?: number;
  showChatButton?: boolean;
  onChatPress?: () => void;
  chatMessageCount?: number;
}

export default function CustomHeader({
  title,
  subtitle,
  iconName = 'business-outline',
  iconColor = 'white',
  showBackButton = false,
  onBackPress,
  showNotificationButton = true,
  onNotificationPress,
  notificationCount = 3,
  showChatButton = true,
  onChatPress,
  chatMessageCount = 5
}: CustomHeaderProps) {
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { isDarkMode, setTheme, theme } = useTheme();
  const { changeLanguage, currentLanguage } = useLanguage();
  const router = useRouter();

  // Dil seçenekleri - gelecekte kolayca genişletilebilir
  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    // Gelecekte eklenebilecek diller:
    // { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    // { code: 'fr', name: 'Français', flag: '🇫🇷' },
    // { code: 'es', name: 'Español', flag: '🇪🇸' },
    // { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    // { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  // Tema renklerini al
  const headerBg = useThemeColor({}, 'headerBackground');
  const backgroundColor = useThemeColor({}, 'background');
  const headerText = useThemeColor({}, 'headerText');
  const borderColor = useThemeColor({}, 'border');
  const cardBg = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const surfaceBg = useThemeColor({}, 'surface');
  const colorRed = useThemeColor({}, 'red');
  const colorGreen = useThemeColor({}, 'green');
  const colorBlue = useThemeColor({}, 'blue');
  const colorOrange = useThemeColor({}, 'orange');
  const colorYellow = useThemeColor({}, 'yellow');
  const colorPurple = useThemeColor({}, 'purple');
  const colorPink = useThemeColor({}, 'pink');
  const colorSuccess = useThemeColor({}, 'success');
  const colorIndigo = useThemeColor({}, 'indigo');
  const colorGray = useThemeColor({}, 'gray');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const redBorderColor = useThemeColor({}, 'redBorder');

  // Örnek bildirim verileri
  const notifications = [
    {
      id: 1,
      title: 'Yeni Sevkiyat Emri',
      message: 'SE-2024-001 numaralı sevkiyat emri onayınızı bekliyor.',
      time: '5 dk önce',
      type: 'sevkiyat',
      isRead: false
    },
    {
      id: 2,
      title: 'Stok Uyarısı',
      message: 'ABC123 kodlu ürünün stok seviyesi kritik seviyeye düştü.',
      time: '15 dk önce',
      type: 'stok',
      isRead: false
    },
    {
      id: 3,
      title: 'Transfer Tamamlandı',
      message: 'TR-2024-045 numaralı transfer işlemi başarıyla tamamlandı.',
      time: '1 saat önce',
      type: 'transfer',
      isRead: true
    },
    {
      id: 4,
      title: 'Sayım Hatırlatması',
      message: 'Aylık stok sayımı için son 2 gün kaldı.',
      time: '2 saat önce',
      type: 'sayim',
      isRead: true
    },
    {
      id: 5,
      title: 'Sistem Bakımı',
      message: 'Sistem bakımı 23:00-01:00 saatleri arasında yapılacaktır.',
      time: '1 gün önce',
      type: 'sistem',
      isRead: true
    }
  ];

  const handleNotificationPress = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
    if (onNotificationPress) {
      onNotificationPress();
    }
  };

  const handleChatPress = () => {
    router.push('/chat/Chat');
    if (onChatPress) {
      onChatPress();
    }
  };

  const handleThemeToggle = () => {
    // Tema döngüsü: light -> dark -> light
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const handleLanguageToggle = () => {
    console.log('CustomHeader - Dropdown toggle tıklandı, mevcut durum:', isLanguageDropdownOpen);
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    console.log('CustomHeader - Dropdown yeni durum:', !isLanguageDropdownOpen);
  };

  const handleLanguageSelect = async (languageCode: string) => {
    console.log('CustomHeader - Dil değiştiriliyor:', languageCode);
    console.log('CustomHeader - Mevcut dil:', currentLanguage);

    try {
      await changeLanguage(languageCode);
      console.log('CustomHeader - Dil başarıyla değiştirildi:', languageCode);
    } catch (error) {
      console.error('CustomHeader - Dil değiştirme hatası:', error);
    }

    setIsLanguageDropdownOpen(false);
    console.log('CustomHeader - Dropdown kapatıldı');
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };


  return (
    <View className="relative" style={{ zIndex: 9997 }}>
      {/* Header */}
      <View
        className="shadow-lg border-b"
        style={{
          backgroundColor: headerBg,
          borderBottomColor: borderColor
        }}
      >
        <View className="px-6 py-3 mt-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              {showBackButton && (
                <TouchableOpacity
                  onPress={onBackPress}
                  className=" p-1 "
                  activeOpacity={0.7}
                >
                  <Ionicons name="chevron-back" size={24} color={blueBorderColor} />
                </TouchableOpacity>
              )}
              <View className="flex-1">
                <Text className="text-md font-bold" style={{ color: headerText }}>{title}</Text>
                {subtitle && (
                  <Text className="text-xs mt-1" style={{ color: headerText, opacity: 0.7 }}>{subtitle}</Text>
                )}
              </View>
            </View>
            <View className="flex-row items-center space-x-3">
              {/* Genişletme Butonu */}
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                className="relative mr-2"
                activeOpacity={0.7}
              >
                <View className="w-14 h-14 p-2 bg-transparent rounded-full items-center justify-center">
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={blueBorderColor}
                  />
                </View>
              </TouchableOpacity>


              {/* Ana İkon */}
              <View className="w-14 h-14 bg-blue-500 p-2 rounded-full items-center justify-center">
                <Ionicons name={iconName} size={24} color={iconColor} />
              </View>
            </View>
          </View>
        </View>

        {/* Genişletilmiş Alan */}
        {isExpanded && (
          <View className="px-6" style={{ backgroundColor: headerBg }}>
            {/* <Text className="text-sm text-gray-700 mb-2">Hızlı Erişim Menüsü</Text> */}
            <View className="flex-row flex-wrap gap-3">

              {/* Dil Seçici */}
              <View className="flex-1 min-w-[100px] bg-transparent p-3 items-center justify-center relative">
                <TouchableOpacity
                  onPress={handleLanguageToggle}
                  className="flex-row items-center px-3 py-2 rounded-lg relative"
                  style={{ backgroundColor: surfaceBg }}
                  activeOpacity={0.7}
                >
                  <Text style={{ fontSize: 16, marginRight: 8 }}>
                    {getCurrentLanguage().flag}
                  </Text>
                  <Ionicons
                    name={isLanguageDropdownOpen ? "chevron-up" : "chevron-down"}
                    size={12}
                    color={textColor}
                  />
                </TouchableOpacity>

                {/* Dil Dropdown Menüsü */}
                {isLanguageDropdownOpen && (
                  <View
                    className="absolute top-16 left-0 right-0 rounded-lg shadow-lg border z-50"
                    style={{
                      top: 70,
                      backgroundColor: cardBg,
                      borderColor: borderColor,
                      minWidth: 140
                    }}
                  >
                    {languages.map((language, index) => (
                      <TouchableOpacity
                        key={language.code}
                        onPress={() => handleLanguageSelect(language.code)}
                        className="flex-row items-center px-4 py-3 justify-center"
                        style={{
                          borderBottomWidth: index < languages.length - 1 ? 1 : 0,
                          borderBottomColor: borderColor,
                          backgroundColor: currentLanguage === language.code ? surfaceBg : 'transparent'
                        }}
                        activeOpacity={0.7}
                      >
                        <View className='flex-row w-full' style={{paddingHorizontal:20}}>
                          <Text style={{ fontSize: 16, marginRight: 15 }}>
                            {language.flag}
                          </Text>
                          {currentLanguage === language.code && (
                            <Ionicons name="checkmark" size={16} color={textColor} />
                          )}
                        </View>

                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Tema Değiştirme Butonu */}
              <View className="flex-1 min-w-[100px] bg-transparent p-3 items-center justify-center">
                <TouchableOpacity
                  onPress={handleThemeToggle}
                  className="relative"
                  activeOpacity={0.7}
                >
                  <View className="w-10 h-10 bg-transparent rounded-lg items-center justify-center">
                    <Ionicons
                      name={isDarkMode ? "sunny" : "moon"}
                      size={24}
                      color={isDarkMode ? "#FCD34D" : "#6366F1"}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {showChatButton && (
                <View className="flex-1 min-w-[100px] bg-transparent p-3 items-center justify-center">
                  <View className="bg-transparent absolute" >
                    <View className="flex-row justify-start">
                      <TouchableOpacity
                        onPress={handleChatPress}
                        className="relative"
                        activeOpacity={0.7}
                      >
                        <View className="w-10 h-10 bg-transparent rounded-lg items-center justify-center">
                          <Ionicons name="chatbubble-ellipses" size={24} color="#10B981" />
                        </View>
                        {chatMessageCount > 0 && (
                          <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                            <Text className="text-white text-xs font-bold">
                              {chatMessageCount > 9 ? '9+' : chatMessageCount}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              <View className="flex-1 min-w-[100px] bg-transparent p-3 items-center justify-center">
                {/* Bildirim Butonu */}
                {showNotificationButton && (
                  <TouchableOpacity
                    onPress={handleNotificationPress}
                    className="relative mr-2"
                    activeOpacity={0.7}
                  >
                    <View className="w-14 h-14 p-2 bg-transparent rounded-full items-center justify-center ">
                      <Ionicons name="notifications" size={24} color="gold" />
                    </View>
                    {notificationCount > 0 && (
                      <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                        <Text className="text-white text-xs font-bold">
                          {notificationCount > 9 ? '9+' : notificationCount}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              </View>


              {/* <TouchableOpacity className="flex-1 min-w-[100px] bg-white p-3 rounded-lg border border-blue-200 items-center">
                <Ionicons name="car-outline" size={20} color="#1E88E5" />
                <Text className="text-xs text-gray-600 mt-1">Sevkiyat</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        )}
      </View>

      {/* Notification Modal */}
      <Modal
        visible={isNotificationPanelOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsNotificationPanelOpen(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0)',
          justifyContent: 'flex-start',
          paddingTop: 55,
        }}>
          {/* Modal Overlay - dışına tıklandığında kapatmak için */}
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={() => setIsNotificationPanelOpen(false)}
            activeOpacity={1}
          />

          {/* Notification Panel */}
          <View className="mx-2 rounded-2xl shadow-2xl border"
            style={{
              maxHeight: '80%',
              backgroundColor: cardBg,
              borderColor: borderColor,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              elevation: 30
            }}>

            {/* Header */}
            <View className="px-6 py-4 mb-2 border-b rounded-t-2xl" style={{
              borderBottomColor: borderColor,
              backgroundColor: surfaceBg
            }}>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 rounded-full items-center justify-center mr-3" style={{ backgroundColor: colorBlue }}>
                    <Ionicons name="notifications" size={16} color={textColor} />
                  </View>
                  <Text className="text-xl font-bold" style={{ color: headerText }}>Bildirimler</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setIsNotificationPanelOpen(false)}
                  className="w-8 h-8 rounded-full items-center justify-center"
                  style={{ backgroundColor: colorRed }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={18} color={headerText} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Notifications List */}
            <ScrollView
              style={{ maxHeight: 400 }}
              contentContainerStyle={{ paddingBottom: 10 }}
              showsVerticalScrollIndicator={true}
              bounces={true}
              scrollEventThrottle={16}
            >
              {notifications.map((notification, index) => (
                <TouchableOpacity
                  key={notification.id}
                  className={`mx-2 mb-2 rounded-xl`}
                  activeOpacity={0.8}
                  style={{
                    padding: 2,
                    backgroundColor: !notification.isRead ? colorGreen : colorGray,
                  }}
                >
                  <View className="flex-row items-start rounded-xl py-2" style={{ backgroundColor: surfaceBg }}>
                    {/* Icon Container */}
                    <View className="relative">
                      <View
                        className="w-14 h-14 mr-2 rounded-md items-center justify-center"
                      >
                        <Ionicons
                          name="notifications"
                          size={24}
                          color="gold"
                        />
                        {!notification.isRead && (
                          <View className="absolute ml-3 mb-4 w-4 h-4 bg-red-500 rounded-full border-2 border-white">
                            <View className="w-2 h-2 bg-red-400 rounded-full self-center mt-0.5" />
                          </View>
                        )}
                      </View>

                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <View className="flex-row items-start justify-between mb-2">
                        <Text className={`text-base font-bold flex-1`} style={{ color: textColor }}>
                          {notification.title}
                        </Text>
                      </View>

                      <Text className="text-sm mb-3 leading-5" style={{ color: textColor }}>
                        {notification.message}
                      </Text>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <View className="w-5 h-5 bg-gray-200 rounded-full items-center justify-center mr-2">
                            <Ionicons name="time-outline" size={12} color={textColor} />
                          </View>
                          <Text className="text-xs font-medium" style={{ color: textColor }}>
                            {notification.time}
                          </Text>
                        </View>

                        {!notification.isRead && (
                          <View className="px-3 py-1 rounded-full mr-2" style={{ backgroundColor: colorBlue }}>
                            <Text className="text-xs font-semibold" style={{ color: textColor }}>Yeni</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              {notifications.length === 0 && (
                <View className="px-6 py-12 items-center">
                  <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                    <Ionicons name="notifications-off-outline" size={40} color={textColor} />
                  </View>
                  <Text className="text-base font-medium" style={{ color: textColor }}>Henüz bildirim yok</Text>
                  <Text className="text-sm mt-1" style={{ color: textColor }}>Yeni bildirimler burada görünecek</Text>
                </View>
              )}
            </ScrollView>

            {/* Footer */}
            <View className="px-6 py-4 rounded-b-2xl">
              <TouchableOpacity
                className="flex-row items-center justify-center py-3 rounded-xl"
                activeOpacity={0.8}
                style={{
                  shadowColor: blueBorderColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 5,
                  backgroundColor: colorBlue,
                }}
              >
                <Ionicons name="list-outline" size={18} color={textColor} />
                <Text className="text-base font-semibold ml-2" style={{ color: textColor }}>Tüm Bildirimleri Gör</Text>
                <Ionicons name="chevron-forward" size={18} color={textColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



      {/* Floating Notification Badge - Sağ Alt Köşe */}
      {!isExpanded && (notificationCount > 0 || chatMessageCount > 0) && (
        <View
          className="absolute rounded-full shadow-lg border px-2 py-1"
          style={{
            bottom: -10,
            right: 65,
            zIndex: 9999,
            backgroundColor: cardBg,
            borderColor: borderColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 10,
            alignSelf: 'center',
          }}
        >
          <View className="flex-row items-center">
            {notificationCount > 0 && (
              <View className="flex-row items-center mr-2">
                <Ionicons name="notifications" size={16} color="#EF4444" />
                <Text className="text-xs font-bold ml-1" style={{ color: textColor }}>
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Text>
              </View>
            )}
            {chatMessageCount > 0 && (
              <View className="flex-row items-center">
                <Ionicons name="chatbubble-ellipses" size={16} color="#10B981" />
                <Text className="text-xs font-bold ml-1" style={{ color: textColor }}>
                  {chatMessageCount > 9 ? '9+' : chatMessageCount}
                </Text>
              </View>
            )}
          </View>
        </View>)}




    </View>
  );
}