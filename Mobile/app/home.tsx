import { RII_MOBILMENU_HEADER } from '@/app/servis/menuClass/RII_MOBILMENU_HEADER_C';
import { RII_MOBILMENU_LINE } from '@/app/servis/menuClass/RII_MOBILMENU_LINE_C';
import menuHeaderService from '@/app/servis/menuServis/RII_MOBILMENU_HEADER_S';
import CustomHeader from '@/components/CustomHeader';
import { useTheme } from '@/contexts/ThemeContext';
import { DropdownItem, DropdownSection } from '@/datas/HomeDropdownData';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


type RootStackParamList = {
  'malkabulislemleri/IrsaliyeFaturaGirisi': undefined;
  'genelbilgi/StokDetayEkrani': undefined;
  'transfer/depotransferi/DepoTransferi': { selectedDepo: string };
  'transfer/planlidepotransferi/PlanliDepoTransferleri': { selectedDepo: string };
  'transfer/ambargiris/AmbarGiris': { selectedDepo: string };
  'transfer/ambarcikis/AmbarCikis': { selectedDepo: string };
  'transfer/planliambarcikis/PlanliAmbarCikis': { selectedDepo: string };
  'hucretakibi/planlihucretransferi/PlanliHucreTransferi': { selectedDepo: string };
  'sevkiyat/sevkiyatemri/SevkiyatEmri': { selectedDepo: string };
  'sevkiyat/sevkiyatkontrol/SevkiyatKontrol': { selectedDepo: string };
  'uretim/uretimsonukaydi/UretimSonuKaydi': { selectedDepo: string };
  'home': { updatedSelectedDepo?: string };
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [selectedDepo, setSelectedDepo] = useState<string>('');
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [dropdownSections, setDropdownSections] = useState<DropdownSection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Dil hook'u
  const { t, changeLanguage, getCurrentLanguage } = useLanguage();
  
  // Tema renklerini al
  const { isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  // Depo seçenekleri
  const depoOptions = [
    { label: 'Ana Depo', value: 'D001' },
    { label: 'Yedek Depo', value: 'D002' },
    { label: 'Satış Deposu', value: 'D003' },
    { label: 'İade Deposu', value: 'D004' },
  ];

  // API'den menü verilerini getir
  const loadMenuData = async () => {
    try {
      setIsLoading(true);
      const menuHeaders = await menuHeaderService.getAllMenuHeaders();
      
      // Her header için Lines'ı ayrı çek
      const menuLineService = (await import('@/app/servis/menuServis/RII_MOBILMENU_LINE_S')).default;
      
      const sections: DropdownSection[] = await Promise.all(
        menuHeaders.map(async (header: RII_MOBILMENU_HEADER) => {
          // Header'a ait Lines'ı çek
          let lines: RII_MOBILMENU_LINE[] = [];
          try {
            // API endpoint by-header/{id} bekliyor - Id (number) kullan
            const headerId = header.Id || 0;
            if (headerId > 0) {
              lines = await menuLineService.getMenuLinesByHeaderId(headerId);
            }
          } catch (error) {
            console.warn(`Header ${header.Id} (${header.Title}) için Lines çekilemedi:`, error);
          }
          
          const items: DropdownItem[] = (lines || []).map((line: RII_MOBILMENU_LINE) => ({
            id: line.ItemId,
            title: line.Title,
            icon: (line.Icon as keyof typeof Ionicons.glyphMap) || 'ellipse-outline',
            description: line.Description || ''
          }));

          return {
            id: header.MenuId,
            title: header.Title,
            icon: (header.Icon as keyof typeof Ionicons.glyphMap) || 'menu-outline',
            items,
            isOpen: header.IsOpen
          };
        })
      );

      setDropdownSections(sections);
    } catch (error) {
      console.error('Menü verileri yüklenirken hata:', error);
      // Hata durumunda boş array set et
      setDropdownSections([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Component mount olduğunda menü verilerini yükle
  useEffect(() => {
    loadMenuData();
  }, []);

  // Sayfa odaklandığında navigation state'ini kontrol et
  useFocusEffect(
    useCallback(() => {
      // Route params'tan gelen updatedSelectedDepo değerini kontrol et
      const params = route.params as { updatedSelectedDepo?: string } | undefined;
      
      if (params?.updatedSelectedDepo && params.updatedSelectedDepo !== selectedDepo) {
        setSelectedDepo(params.updatedSelectedDepo);
        // Parametreyi temizle
        navigation.setParams({ updatedSelectedDepo: undefined } as never);
      }
    }, [route.params, selectedDepo, navigation])
  );


  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleItemPress = (sectionId: string, itemId: string) => {
    console.log(`Pressed: ${sectionId} - ${itemId}`);
    // Burada navigation veya modal açma işlemleri yapılabilir
    if (sectionId === 'mal-kabul' && itemId === 'irsaliye-fatura') {
      navigation.navigate('malkabulislemleri/IrsaliyeFaturaGirisi');
    }
    if (sectionId === 'genel-bilgi' && itemId === 'stok-detay-ekrani') {
      navigation.navigate('genelbilgi/StokDetayEkrani');
    }
    if (sectionId === 'transfer' && itemId === 'depo-transferi') {
      navigation.navigate('transfer/depotransferi/DepoTransferi', { selectedDepo });
    }
    if (sectionId === 'transfer' && itemId === 'planli-depo-transferi') {
      navigation.navigate('transfer/planlidepotransferi/PlanliDepoTransferleri', { selectedDepo });
    }
    if (sectionId === 'transfer' && itemId === 'ambar-giris') {
      navigation.navigate('transfer/ambargiris/AmbarGiris', { selectedDepo });
    }
    if (sectionId === 'transfer' && itemId === 'ambar-cikis') {
      navigation.navigate('transfer/ambarcikis/AmbarCikis', { selectedDepo });
    }
    if (sectionId === 'transfer' && itemId === 'planli-ambar-cikis') {
      navigation.navigate('transfer/planliambarcikis/PlanliAmbarCikis', { selectedDepo });
    }
    if (sectionId === 'sayim' && itemId === 'sayim-girisi') {
      (navigation as any).navigate('sayim/Sayim', { selectedDepo });
    }
    if (sectionId === 'hucre-takibi' && itemId === 'hucre-transferi') {
      (navigation as any).navigate('hucretakibi/hucretakibi/HucreTakibi', { selectedDepo });
      return;
    }
    if (sectionId === 'hucre-takibi' && itemId === 'hucreler-arasi-transfer') {
      (navigation as any).navigate('hucretakibi/hucrelerarasitransfer/HucrelerArasiTransfer', { selectedDepo });
      return;
    }
    if (sectionId === 'hucre-takibi' && itemId === 'planli-hucre-transferi') {
      (navigation as any).navigate('hucretakibi/planlihucretransferi/PlanliHucreTransferi', { selectedDepo });
      return;
    }
    if (sectionId === 'sevkiyat' && itemId === 'sevkiyat-emri') {
      navigation.navigate('sevkiyat/sevkiyatemri/SevkiyatEmri', { selectedDepo });
    }
    if (sectionId === 'sevkiyat' && itemId === 'sevkiyat-kontrol') {
      navigation.navigate('sevkiyat/sevkiyatkontrol/SevkiyatKontrol', { selectedDepo });
    }
    if (sectionId === 'uretim' && itemId === 'uretim-sonu-kaydi') {
      navigation.navigate('uretim/uretimsonukaydi/UretimSonuKaydi', { selectedDepo });
    }
    if (sectionId === 'sesli-komut' && itemId === 'sesli-komut-test') {
      (navigation as any).navigate('seslikomut/SesliKomut');
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      {/* Header */}
      <CustomHeader 
        title={t('home')} 
        subtitle="Kurumsal Yönetim Paneli"
        iconName="business-outline"
      />

      <ScrollView className="flex-1 px-6 py-3">
        
        {/* Welcome Card */}
        {/* <View className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-6 shadow-lg">
          <View className="flex-row items-center">
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold mb-2">Hoş Geldiniz!</Text>
              <Text className="text-blue-100 text-sm">Lojistik operasyonlarınızı yönetmek için aşağıdaki menüleri kullanabilirsiniz.</Text>
            </View>
            <Ionicons name="checkmark-circle" size={48} color="rgba(255,255,255,0.8)" />
          </View>
        </View> */}

          {/* Depo Seçimi */}
        {/* <View className="mt-8 mb-2">
          <CustomDropdown
            label={t('settings')}
            icon="business-outline"
            iconColor="#3B82F6"
            placeholder="Depo seçiniz..."
            options={depoOptions}
            value={selectedDepo}
            onSelect={(option) => setSelectedDepo(option.value)}
          />
        </View> */}



        {/* Quick Stats */}
        <View className="mb-6 mt-4">
          {/* <Text className="text-lg font-semibold mb-4" style={{ color: textColor }}>{t('welcome')}</Text> */}
          <View className="relative">
            {/* Sol kaydırma ikonu */}
            <View className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-md">
              <Ionicons name="chevron-back" size={12} color="#9CA3AF" />
            </View>
            
            {/* Sağ kaydırma ikonu */}
            <View className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-md">
              <Ionicons name="chevron-forward" size={12} color="#9CA3AF" />
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4 }}
              className="-mx-2"
              pagingEnabled
              snapToInterval={168}
              decelerationRate="fast"
              snapToAlignment="start"
            >
            <View key="stat-pending" className="w-40 rounded-xl p-2 shadow-sm mx-2" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor }}>
              <View className="flex-row items-center justify-center mb-1">
                <View>
                  <Text className="text-2xl font-bold mr-3" style={{ color: textColor }}>24</Text>
                </View>
                <View className="w-10 h-10 bg-orange-100 rounded-lg items-center justify-center">
                  <Ionicons name="time-outline" size={20} color="#F59E0B" />
                </View>
              </View>
              <View className="flex-row items-center justify-center">
                <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('pendingOperations')}</Text>
              </View>
            </View>
            <View key="stat-completed" className="w-40 rounded-xl p-2 shadow-sm mx-2" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor }}>
              <View className="flex-row items-center justify-center mb-1">
                <View>
                  <Text className="text-2xl font-bold mr-3" style={{ color: textColor }}>156</Text>
                </View>
                <View className="w-10 h-10 bg-green-100 rounded-lg items-center justify-center">
                  <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
                </View>
              </View>
              <View className="flex-row items-center justify-center">
                <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('completed')}</Text>
              </View>
            </View>
            <View key="stat-stock" className="w-40 rounded-xl p-2 shadow-sm mx-2" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor }}>
              <View className="flex-row items-center justify-center mb-1">
                <View>
                  <Text className="text-2xl font-bold mr-3" style={{ color: textColor }}>89</Text>
                </View>
                <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center">
                  <Ionicons name="cube-outline" size={20} color="#3B82F6" />
                </View>
              </View>
              <View className="flex-row items-center justify-center">
                <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('totalStock')}</Text>
              </View>
            </View>
            <View key="stat-critical" className="w-40 rounded-xl p-2 shadow-sm mx-2" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor }}>
              <View className="flex-row items-center justify-center mb-1">
                <View>
                  <Text className="text-2xl font-bold mr-3" style={{ color: textColor }}>12</Text>
                </View>
                <View className="w-10 h-10 bg-red-100 rounded-lg items-center justify-center">
                  <Ionicons name="warning-outline" size={20} color="#EF4444" />
                </View>
              </View>
              <View className="flex-row items-center justify-center">
                <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('criticalLevel')}</Text>
              </View>
            </View>
            <View key="stat-revenue" className="w-40 rounded-xl p-2 shadow-sm mx-2" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor }}>
              <View className="flex-row items-center justify-center mb-1">
                <View>
                  <Text className="text-2xl font-bold mr-3" style={{ color: textColor }}>₺45K</Text>
                </View>
                <View className="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center">
                  <Ionicons name="trending-up-outline" size={20} color="#8B5CF6" />
                </View>
              </View>
              <View className="flex-row items-center justify-center">
                <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('monthlyRevenue')}</Text>
              </View>
            </View>
            <View key="stat-vehicles" className="w-40 rounded-xl p-2 shadow-sm mx-2" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor }}>
              <View className="flex-row items-center justify-center mb-1">
                <View>
                  <Text className="text-2xl font-bold mr-3" style={{ color: textColor }}>7</Text>
                </View>
                <View className="w-10 h-10 bg-indigo-100 rounded-lg items-center justify-center">
                  <Ionicons name="car-outline" size={20} color="#6366F1" />
                </View>
              </View>
              <View className="flex-row items-center justify-center">
                <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('vehicles')}</Text>
              </View>
            </View>
          </ScrollView>
        </View>


      </View>
        {/* Dropdown Sections */}
        <View className="pb-20">
          {isLoading ? (
            <View className="flex-1 justify-center items-center py-20">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="mt-4 text-base" style={{ color: textColor, opacity: 0.7 }}>
                {t('loadingMenus') || 'Menüler yükleniyor...'}
              </Text>
            </View>
          ) : (
            dropdownSections.map((section) => (
            <View key={section.id} className="rounded-xl shadow-md overflow-hidden my-1" style={{ backgroundColor: cardBg, borderWidth: 1, borderColor }}>
              {/* Section Header */}
              <TouchableOpacity
                className="flex-row items-center justify-between p-4"
                style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }}
                onPress={() => toggleSection(section.id)}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-3">
                    <Ionicons name={section.icon} size={20} color="#3B82F6" />
                  </View>
                  <Text className="text-lg font-semibold" style={{ color: textColor }}>{t(section.title)}</Text>
                </View>
                <Ionicons 
                  name={openSections[section.id] ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={isDarkMode ? "#9CA3AF" : "#6B7280"} 
                />
              </TouchableOpacity>

              {/* Section Items */}
              {openSections[section.id] && (
                <View style={{ borderTopWidth: 1, borderTopColor: borderColor }}>
                  {section.items.map((item, index) => (
                    <TouchableOpacity
                      key={`${section.id}-${item.id}-${index}`}
                      className="p-4 flex-row items-center"
                      style={index < section.items.length - 1 ? { borderBottomWidth: 1, borderBottomColor: borderColor } : {}}
                      onPress={() => handleItemPress(section.id, item.id)}
                      activeOpacity={0.7}
                    >
                      <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
                        <Ionicons name={item.icon} size={16} color="#10B981" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-medium mb-1" style={{ color: textColor }}>{t(item.title)}</Text>
                        <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t(item.description)}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={isDarkMode ? "#9CA3AF" : "#9CA3AF"} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}