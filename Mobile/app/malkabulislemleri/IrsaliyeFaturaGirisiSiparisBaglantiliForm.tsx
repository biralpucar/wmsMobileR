import { erpMalKabulSiparis } from '@/app/servis/erpClass/malKabulSiparisServisClass';
import { erpSiparisDetay } from '@/app/servis/erpClass/siparisDetayServisClass';
import { getMalKabulSiparisByCariKod } from '@/app/servis/erpServis/malKabulSiparisServis';
import { getSiparisDetayBySiparisListesi } from '@/app/servis/erpServis/siparisDetay';
import CustomAlert from '@/components/CustomAlert';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
interface IrsaliyeFaturaGirisiSiparisBaglantiliFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  irsaliyeNo: string;
  cariKod: string;
  selectedDate: string;
  irsaliyeTipi?: string;
}

export default function IrsaliyeFaturaGirisiSiparisBaglantiliForm({ 
  onNext, 
  onBack, 
  irsaliyeNo, 
  cariKod,
  selectedDate,
  irsaliyeTipi 
}: IrsaliyeFaturaGirisiSiparisBaglantiliFormProps) {
  const navigation = useNavigation();
  const router = useRouter();
  
  // Dil hook'u
  const { t } = useLanguage();
  
  // Tema hook'ları
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const surfaceColor = useThemeColor({}, 'surface');
  const redColor = useThemeColor({}, 'red');
  const orangeColor = useThemeColor({}, 'orange');
  const yellowColor = useThemeColor({}, 'yellow');
  const greenColor = useThemeColor({}, 'green');
  const blueColor = useThemeColor({}, 'blue');
  const indigoColor = useThemeColor({}, 'indigo');
  const purpleColor = useThemeColor({}, 'purple');
  const pinkColor = useThemeColor({}, 'pink');
  const grayColor = useThemeColor({}, 'gray');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  const [selectedCategories, setSelectedCategories] = useState<{[key: string]: boolean}>({});
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'error' as const });
  const [malKabulSiparisler, setMalKabulSiparisler] = useState<erpMalKabulSiparis[]>([]);
  const [siparisDetaylar, setSiparisDetaylar] = useState<{[key: string]: erpSiparisDetay[]}>({});

  // API'den mal kabul siparişlerini çek
  useEffect(() => {
    const fetchMalKabulSiparisler = async () => {
      if (!cariKod) return;
      
      setIsLoading(true);
      try {
        const response = await getMalKabulSiparisByCariKod(cariKod);
        if (response.success && response.data) {
          setMalKabulSiparisler(response.data);
        } else {
          setAlertConfig({
            title: 'Hata',
            message: response.message || 'Sipariş verileri alınamadı',
            type: 'error'
          });
          setAlertVisible(true);
        }
      } catch (error) {
        console.error('Mal kabul siparişleri yüklenirken hata:', error);
        setAlertConfig({
          title: 'Hata',
          message: 'Sipariş verileri yüklenirken bir hata oluştu',
          type: 'error'
        });
        setAlertVisible(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMalKabulSiparisler();
  }, [cariKod]);

  const toggleSection = async (sectionId: string) => {
    const isCurrentlyOpen = openSections[sectionId];
    
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));

    // Eğer section açılıyorsa ve henüz veri yüklenmemişse API'den veri çek
    if (!isCurrentlyOpen && !siparisDetaylar[sectionId]) {
      try {
        setIsLoading(true);
        const response = await getSiparisDetayBySiparisListesi(sectionId);
        if (response.success && response.data) {
          setSiparisDetaylar(prev => ({
            ...prev,
            [sectionId]: response.data
          }));
        } else {
          setAlertConfig({
            title: t('hata'),
            message: response.message || t('siparis-detaylari-alinamadi'),
            type: 'error'
          });
          setAlertVisible(true);
        }
      } catch (error) {
        console.error('Sipariş detayları yüklenirken hata:', error);
        setAlertConfig({
          title: t('hata'),
          message: t('siparis-detaylari-yuklenirken-hata'),
          type: 'error'
        });
        setAlertVisible(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleInfoSection = () => {
    setIsInfoExpanded(prev => !prev);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCategorySelection = async (faturaNo: string) => {
    // Önce sipariş detaylarını yükle (eğer yüklenmemişse)
    if (!siparisDetaylar[faturaNo]) {
      try {
        setIsLoading(true);
        const response = await getSiparisDetayBySiparisListesi(faturaNo);
        if (response.success && response.data) {
          setSiparisDetaylar(prev => ({
            ...prev,
            [faturaNo]: response.data
          }));
        } else {
          setAlertConfig({
            title: 'Hata',
            message: response.message || 'Sipariş detayları alınamadı',
            type: 'error'
          });
          setAlertVisible(true);
          return;
        }
      } catch (error) {
        console.error('Sipariş detayları yüklenirken hata:', error);
        setAlertConfig({
          title: 'Hata',
          message: 'Sipariş detayları yüklenirken bir hata oluştu',
          type: 'error'
        });
        setAlertVisible(true);
        return;
      } finally {
        setIsLoading(false);
      }
    }

    setSelectedCategories(prev => {
      const newState = {
        ...prev,
        [faturaNo]: !prev[faturaNo]
      };
      console.log("Kategori seçimi değişti:", newState[faturaNo]);
      
      // Sipariş seçildiğinde/seçimi kaldırıldığında ürünleri de güncelle
      const siparis = malKabulSiparisler.find(s => s.FATIRS_NO === faturaNo);
      if (siparis) {
        const siparisDetaylari = siparisDetaylar[faturaNo] || [];
        console.log("Sipariş detayları:", siparisDetaylari);
        
        if (newState[faturaNo]) {
          // Sipariş seçildi - tüm ürünlerini ekle
          const productIds = siparisDetaylari.map(detay => detay.STOK_KODU);
          setSelectedProducts(prev => {
            const newProducts = [...prev];
            productIds.forEach(productId => {
              if (!newProducts.includes(productId)) {
                newProducts.push(productId);
              }
            });
            console.log("Seçili ürünler:", newProducts);
            return newProducts;
          });
        } else {
          // Sipariş seçimi kaldırıldı - tüm ürünlerini çıkar
          const productIds = siparisDetaylari.map(detay => detay.STOK_KODU);
          setSelectedProducts(prev => prev.filter(productId => !productIds.includes(productId)));
        }
      }
    
      return newState;
     });
   };

  const handleSubmit = async () => {
    // Seçili kategorileri kontrol et
    const hasSelectedCategory = Object.values(selectedCategories).some(selected => selected);
    if (!hasSelectedCategory) {
      setAlertConfig({ title: t('hata'), message: t('lutfen-en-az-bir-kategori-seciniz'), type: 'error' });
      setAlertVisible(true);
      return;
    }

    setIsLoading(true);
    
    // Simulated validation
    setTimeout(() => {
      setIsLoading(false);
      
      // Seçili siparişlerdeki tüm ürünleri al
      const selectedProductsData = malKabulSiparisler
        .filter(siparis => selectedCategories[siparis.FATIRS_NO])
        .flatMap(siparis => {
          const detaylar = siparisDetaylar[siparis.FATIRS_NO] || [];
          return detaylar.map(detay => ({
            name: detay.STOK_ADI,
            stokKodu: detay.STOK_KODU,
            miktar: detay.KALAN_MIKTAR,
            depoKodu: detay.DEPO_KODU,
            depoIsmi: detay.DEPO_ISMI,
            girisSeri: detay.GIRIS_SERI,
            seriMik: detay.SERI_MIK
          }));
        });
      
      // Seçili siparişlerin detaylarını al
      const selectedCategoryDetails = malKabulSiparisler
        .filter(siparis => selectedCategories[siparis.FATIRS_NO])
        .map(siparis => ({
          faturaNo: siparis.FATIRS_NO,
          name: siparis.FATIRS_NO,
          siparisNo: siparis.FATIRS_NO,
          tarih: siparis.TARIH,
          brutTutar: siparis.BRUTTUTAR,
          products: siparisDetaylar[siparis.FATIRS_NO] || [],
          detaylar: siparisDetaylar[siparis.FATIRS_NO] || []
        }));
      
      // Cari adını kullan
      const cariAdi = 'Cari Firma'; // Bu değer başka bir yerden gelebilir
      
      // Form verilerini hazırla
      const formData = {
        irsaliyeNo,
        cariKod,
        cariAdi,
        selectedDate,
        selectedProducts: selectedProductsData,
        selectedCategoryDetails,
        // Dinamik olarak oluşturulan veriler
        siparisNo: `SIP${Date.now().toString().slice(-6)}`,
        urunKod: selectedProductsData.length > 0 ? selectedProductsData.map(p => p.stokKodu).join(', ') : 'Seçili ürün yok',
        miktar: selectedProductsData.length,
        birimFiyat: selectedProductsData.length * 150 // Örnek hesaplama
      };
      
      // onNext prop'unu çağır
      onNext(formData);
    }, 500);
  };

  return (
    <View className="rounded-2xl shadow-sm p-6" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
      {/* Başlık */}
      <View className="flex-row items-center mb-6">
        <Ionicons name="link" size={24} color={textColor} />
        <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('irsaliye-fatura-girisi')}</Text>
      </View>
      {/* Mevcut Bilgiler Card */}
      <View className="rounded-xl p-6 mb-6 shadow-sm" style={{ backgroundColor: backgroundColor, borderColor: greenBorderColor, borderWidth: 1 }}>
        <TouchableOpacity
          className="flex-row items-center justify-between mb-4"
          onPress={toggleInfoSection}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
              <Ionicons name="information-circle" size={20} color={textColor} />
            </View>
            <Text className="text-lg font-bold" style={{ color: textColor }}>{t('mevcut-bilgiler')}</Text>
          </View>
          <Ionicons
            name={isInfoExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={textColor}
          />
        </TouchableOpacity>

        {isInfoExpanded && (
          <View className="space-y-3">
            <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('irsaliye-tipi')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{irsaliyeTipi === 'e-irsaliye' ? t('e-irsaliye') : t('irsaliye')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('irsaliye-no')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{irsaliyeNo || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('cari-kod')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{cariKod || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2">
              <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('tarih')}:</Text>
              <Text className="font-semibold" style={{ color: textColor }}>{selectedDate || t('belirtilmemis')}</Text>
            </View>
          </View>
        )}
      </View>
      
      {/* Ürün Seçimi */}
      <View style={{ marginBottom: 24 }}>
        <Text style={{ 
          fontSize: 16, 
          fontWeight: '600', 
          color: textColor, 
          marginBottom: 16
        }}>
          {t('siparis-secimi')} ({Object.values(selectedCategories).filter(Boolean).length} {t('siparis-secildi')})
        </Text>
        
        <View>
          {malKabulSiparisler.map((malKabulSiparisler, index) => (
            <View 
              key={malKabulSiparisler.FATIRS_NO} 
              style={{ backgroundColor: cardColor, borderRadius: 12, borderColor: borderColor, borderWidth: 1, overflow: 'hidden', marginVertical: 4 }}
            >
              {/* Category Header */}
              <TouchableOpacity
                style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', padding: 16,backgroundColor: index % 2 === 0 ? grayColor: blueColor}}
                onPress={() => toggleSection(String(malKabulSiparisler.FATIRS_NO))}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={{ flex: 1 }}>
                     <Text style={{fontSize: 16, fontWeight: '600', color: textColor, marginBottom: 4}}>{t('fatura-no')}: {malKabulSiparisler.FATIRS_NO}</Text>
                     <Text style={{fontSize: 14, color: textColor, opacity: 0.7}}>{t('brut-tutar')}: {malKabulSiparisler?.BRUTTUTAR}</Text>
                     <Text style={{fontSize: 14, color: textColor, opacity: 0.7}}>{t('tarih')}: { new Date(malKabulSiparisler?.TARIH).toLocaleDateString('tr-TR')}</Text>
                   </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => toggleCategorySelection(String(malKabulSiparisler?.FATIRS_NO))}
                    style={{ marginRight: 12 }}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={selectedCategories[malKabulSiparisler.FATIRS_NO] ? 'checkbox' : 'square-outline'} 
                      size={24} 
                      color={selectedCategories[malKabulSiparisler.FATIRS_NO] ? primaryColor : textColor} 
                    />
                  </TouchableOpacity>
                  <Ionicons 
                    name={openSections[malKabulSiparisler.FATIRS_NO] ? 'chevron-up' : 'chevron-down'} 
                    size={20} 
                    color={textColor} 
                  />
                </View>
              </TouchableOpacity>

              {/* Category Products */}
              {openSections[malKabulSiparisler?.FATIRS_NO] && (
                <View style={{ borderTopWidth: 1, borderTopColor: borderColor }}>
                  {siparisDetaylar[malKabulSiparisler?.FATIRS_NO]?.map((detay, detayIndex) => (
                    <View
                       key={`${detay.STOK_KODU}-${detayIndex}`}
                       style={{
                         padding: 16,
                         flexDirection: 'row',
                         alignItems: 'center',
                         backgroundColor: detayIndex % 2 === 0 
                           ? grayColor
                           : greenColor,
                         borderBottomWidth: detayIndex < siparisDetaylar[malKabulSiparisler?.FATIRS_NO].length - 1 ? 1 : 0,
                         borderBottomColor: borderColor
                       }}
                     >
                       <View style={{ flex: 1 }}>
                           <Text style={{fontSize: 16, fontWeight: '500', color: textColor, marginBottom: 4}}>{detay.STOK_ADI || t('stok-adi-bulunamadi')}</Text>
                           <Text style={{fontSize: 14, color: textColor, marginBottom: 4}}>{t('stok-kodu')}: {detay.STOK_KODU}</Text>
                           <Text style={{fontSize: 14, color: textColor, marginBottom: 4}}>{t('kalan-miktar')}: {detay.KALAN_MIKTAR || 0}</Text>
                           <Text style={{fontSize: 14, color: textColor, marginBottom: 4}}>{t('depo')}: {detay.DEPO_ISMI || t('belirtilmemis')}</Text>
                           <Text style={{fontSize: 14, color: textColor, marginBottom: 4}}>{t('giris-seri')}: {detay.GIRIS_SERI}</Text>
                           <Text style={{fontSize: 14, color: textColor}}>{t('seri-mik')}: {detay.SERI_MIK}</Text>
                        </View>
                     </View>
                  )) || (
                    <View style={{ padding: 16, alignItems: 'center' }}>
                      <Text style={{ color: textColor, opacity: 0.7 }}>{t('siparis-detaylari-yukleniyor')}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 8, justifyContent: 'center' }}>
        <TouchableOpacity 
          style={{
            width: 128,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: borderColor,
            backgroundColor: surfaceColor,
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 4,
            shadowColor: isDarkMode ? '#000' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: isDarkMode ? 0.3 : 0.1,
            shadowRadius: 4,
            elevation: 2
          }}
          onPress={onBack}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
          <Text style={{ 
            color: textColor, 
            fontSize: 16, 
            fontWeight: '600' 
          }}>
            {t('geri')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{
            width: 128,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            backgroundColor: isLoading ? (isDarkMode ? '#6B7280' : '#9CA3AF') : blueColor,
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 4,
            shadowColor: isDarkMode ? '#000' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isDarkMode ? 0.4 : 0.2,
            shadowRadius: 6,
            elevation: 4
          }}
          onPress={handleSubmit}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
           <>
              <View style={{
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor: 'white',
                borderTopColor: 'transparent',
                borderRadius: 10,
                marginRight: 12
              }} />
              <Text style={{ 
                color: textColor, 
                fontSize: 16, 
                fontWeight: '600' 
              }}>{t('isleniyor')}</Text>
            </>
          ) : (
            <>
              <Text style={{ 
                color: textColor, 
                fontSize: 16, 
                fontWeight: '600' 
              }}>
                {t('ileri')}
              </Text>
              <Ionicons name="arrow-forward" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </>
          )}
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttons={[
          {
            text: t('tamam'),
            onPress: () => setAlertVisible(false)
          }
        ]}
        onClose={() => setAlertVisible(false)}
      />
    </View>
  );
}