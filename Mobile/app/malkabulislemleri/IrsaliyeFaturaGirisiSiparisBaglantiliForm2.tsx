import { useCustomAlert } from '@/components/CustomAlert';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import StokDetayEkrani from '../../components/StokDetayEkrani';

interface IrsaliyeFaturaGirisiSiparisBaglantiliForm2Props {
  irsaliyeNo: string;
  cariKod: string;
  selectedDate: string;
  selectedCategoryDetails: any[];
  irsaliyeTipi?: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function IrsaliyeFaturaGirisiSiparisBaglantiliForm2({
  irsaliyeNo,
  cariKod,
  selectedDate,
  selectedCategoryDetails,
  irsaliyeTipi,
  onNext,
  onBack
}: IrsaliyeFaturaGirisiSiparisBaglantiliForm2Props) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { showAlert, AlertComponent } = useCustomAlert();
  const { t } = useLanguage();
  
  // Tema hook'ları
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const successColor = useThemeColor({}, 'success');
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
  // Parametreleri al (prop'lardan veya params'dan)
  const finalIrsaliyeNo = irsaliyeNo || (params.irsaliyeNo as string) || '';
  const finalCariKod = cariKod || (params.cariKod as string) || '';
  const cariAdi = (params.cariAdi as string) || '';
  const finalSelectedDate = selectedDate || (params.selectedDate as string) || '';
  const selectedProducts = params.selectedProducts ? JSON.parse(params.selectedProducts as string) : [];
  const finalSelectedCategoryDetails = selectedCategoryDetails && selectedCategoryDetails.length > 0 ? selectedCategoryDetails : (params.selectedCategoryDetails ? JSON.parse(params.selectedCategoryDetails as string) : []);

  // Seri numaralarını tutmak için state
  const [serialNumbers, setSerialNumbers] = useState<{ [key: string]: string }>({});

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Mevcut Bilgiler alanının açık/kapalı durumu
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);

  // Ürün detaylarının açık/kapalı durumu
  const [expandedProducts, setExpandedProducts] = useState<{ [key: string]: boolean }>({});

  // Stok detay popup state'i
  const [isStockDetailVisible, setIsStockDetailVisible] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<any>(null);

  // Seri gir popup state'i
  const [isSerialEntryVisible, setIsSerialEntryVisible] = useState(false);
  const [currentProductKey, setCurrentProductKey] = useState<string>('');
  const [currentProductInfo, setCurrentProductInfo] = useState<any>(null);
  const [serialEntries, setSerialEntries] = useState<{ [key: string]: string[] }>({});

  // Seri numarası güncelleme fonksiyonu
  const updateSerialNumber = (productKey: string, value: string) => {
    setSerialNumbers(prev => ({
      ...prev,
      [productKey]: value
    }));
  };

  // Mevcut Bilgiler toggle fonksiyonu
  const toggleInfoSection = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  // Ürün toggle fonksiyonu
  const toggleProductSection = (productKey: string) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productKey]: !prev[productKey]
    }));
  };

  // Stok detay popup fonksiyonları
  const openStockDetail = (product: any) => {
    setSelectedProductForDetail(product);
    setIsStockDetailVisible(true);
  };

  const closeStockDetail = () => {
    setIsStockDetailVisible(false);
    setSelectedProductForDetail(null);
  };

  // Seri gir popup fonksiyonları
  const openSerialEntry = (productKey: string, product: any) => {
    const quantity = parseInt(serialNumbers[productKey] || '0');
    if (quantity > 0) {
      setCurrentProductKey(productKey);
      setCurrentProductInfo(product);
      // Mevcut seri girişlerini al veya yeni array oluştur
      const currentEntries = serialEntries[productKey] || [];
      // SERI_MIK 'E' ise girilen miktar kadar, değilse 1 textbox
      const textboxCount = product.SERI_MIK === 'E' ? quantity : 1;
      const newEntries = Array(textboxCount).fill('').map((_, index) => currentEntries[index] || '');
      setSerialEntries(prev => ({
        ...prev,
        [productKey]: newEntries
      }));
      setIsSerialEntryVisible(true);
    }
  };

  const closeSerialEntry = () => {
    setIsSerialEntryVisible(false);
    setCurrentProductKey('');
    setCurrentProductInfo(null);
  };

  const updateSerialEntry = (index: number, value: string) => {
    setSerialEntries(prev => ({
      ...prev,
      [currentProductKey]: prev[currentProductKey]?.map((entry, i) => i === index ? value : entry) || []
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Tüm sayfa verilerini topla
    const allPageData = {
      // Temel Bilgiler
      basicInfo: {
        irsaliyeNo: finalIrsaliyeNo,
        cariKod: finalCariKod,
        cariAdi: cariAdi,
        selectedDate: finalSelectedDate,
        irsaliyeTipi: irsaliyeTipi
      },
      // Seçili Ürünler
      selectedProducts: selectedProducts,
      // Kategori Detayları
      selectedCategoryDetails: finalSelectedCategoryDetails,
      // Seri Numaraları
      serialNumbers: serialNumbers,
      // Seri Girişleri
      serialEntries: serialEntries,
      // UI State'leri
      uiStates: {
        isInfoExpanded: isInfoExpanded,
        expandedProducts: expandedProducts,
        isStockDetailVisible: isStockDetailVisible,
        isSerialEntryVisible: isSerialEntryVisible,
        currentProductKey: currentProductKey,
        selectedProductForDetail: selectedProductForDetail
      },
      // Parametreler
      params: {
        originalIrsaliyeNo: irsaliyeNo,
        originalCariKod: cariKod,
        originalSelectedDate: selectedDate,
        originalSelectedCategoryDetails: selectedCategoryDetails
      }
    };

    // Konsola detaylı yazdır
    console.log('=== SAYFA VERİLERİ ===');
    console.log('Temel Bilgiler:', allPageData.basicInfo);
    console.log('Seçili Ürünler:', allPageData.selectedProducts);
    console.log('Kategori Detayları:', allPageData.selectedCategoryDetails);
    console.log('Seri Numaraları:', allPageData.serialNumbers);
    console.log('Seri Girişleri:', allPageData.serialEntries);
    console.log('UI Durumları:', allPageData.uiStates);
    console.log('Orijinal Parametreler:', allPageData.params);
    console.log('TÜM VERİLER:', allPageData);
    console.log('=== VERİ TOPLAMA TAMAMLANDI ===');
    console.log('ALL PAGES DATA: ',allPageData);
    
    // Simulated processing time
    setTimeout(() => {
      setIsLoading(false);
      
      // İşlemi tamamla
      const formData = {
        irsaliyeNo: finalIrsaliyeNo,
        cariKod: finalCariKod,
        selectedDate: finalSelectedDate,
        selectedProducts,
        selectedCategoryDetails: finalSelectedCategoryDetails,
        serialNumbers,
        serialEntries
      };

      console.log('Form tamamlandı:', formData);
      onNext(formData);
    }, 2000); // 2 saniye loading göster
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <View className="rounded-2xl shadow-sm p-6" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
      {/* Başlık */}
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
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('irsaliye-no')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{finalIrsaliyeNo || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('cari-kod')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{finalCariKod || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('cari-adi')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{cariAdi || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('tarih')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{finalSelectedDate || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('irsaliye-tipi')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{irsaliyeTipi === 'e-irsaliye' ? t('e-irsaliye') : t('irsaliye')}</Text>
            </View>
            {finalSelectedCategoryDetails && finalSelectedCategoryDetails.length > 0 && (
              <View className="flex-row justify-between items-center py-2">
                <Text style={{ fontWeight: '600', color: textColor }}>{t('siparis-no')}:</Text>
                <View style={{maxWidth:150}}>
                  <Text style={{ fontWeight: '500', color: textColor }}>{finalSelectedCategoryDetails.map((cat: { siparisNo: string }) => cat.siparisNo).join(', ')}</Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Seçili Siparişler */}
      {finalSelectedCategoryDetails && finalSelectedCategoryDetails.length > 0 ? (
        finalSelectedCategoryDetails.map((category: any, categoryIndex: number) => (
          <View 
            key={categoryIndex} 
            style={{
              backgroundColor: surfaceColor,
              borderRadius: 12,
              padding: 24,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: greenBorderColor,
              shadowColor: isDarkMode ? '#000' : '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDarkMode ? 0.3 : 0.1,
              shadowRadius: 4,
              elevation: 3
            }}
          >
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: 16 
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: blueColor,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12
                }}>
                  <Ionicons name="list" size={20} color={textColor} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>{category.cariUnvani}</Text>
                
              </View>
              <View style={{
                backgroundColor: blueColor,
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 20
              }}>
                <Text style={{ 
                  color: textColor, 
                  fontWeight: '600', 
                  fontSize: 14 
                }}>
                  {category.siparisNo}
                </Text>
              </View>
            </View>

            {category.products && category.products.length > 0 ? (
              <>
                {category.products.map((product: any, productIndex: number) => {
                  const productKey = `${categoryIndex}-${productIndex}`;
                  return (
                    <View 
                      key={productIndex} 
                      style={{
                        backgroundColor: grayColor,
                        borderRadius: 8,
                        padding: 16,
                        marginBottom: 12,
                        borderWidth: 1,
                        borderColor: yellowBorderColor
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 12
                        }}
                        onPress={() => toggleProductSection(productKey)}
                        activeOpacity={0.7}
                      >
                        <View style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center', 
                          flex: 1 
                        }}>
                          <View style={{
                            width: 32,
                            height: 32,
                            backgroundColor: greenColor,
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 12
                          }}>
                            <Ionicons name="cube" size={16} color={textColor} />
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={{ 
                              color: textColor, 
                              fontWeight: '600', 
                              fontSize: 16 
                            }}>
                              {product.STOK_ADI || t('stok-adi-bulunamadi')}
                            </Text>
                            <Text style={{ 
                              color: textColor, 
                              opacity: 0.7, 
                              fontSize: 14 
                            }}>
                              {t('stok-kodu')}: {product.STOK_KODU}
                            </Text>
                          </View>
                        </View>
                        <Ionicons
                          name={expandedProducts[productKey] ? 'chevron-up' : 'chevron-down'}
                          size={20}
                          color={textColor}
                        />
                      </TouchableOpacity>

                      {expandedProducts[productKey] && (
                        <View style={{ paddingLeft: 8 }}>
                          <Text style={{ 
                            color: textColor, 
                            opacity: 0.7, 
                            fontSize: 14, 
                            marginBottom: 4 
                          }}>
                            {t('stok-kodu')}: {product.STOK_KODU}
                          </Text>
                          <Text style={{ 
                            color: textColor, 
                            opacity: 0.7, 
                            fontSize: 14, 
                            marginBottom: 4 
                          }}>
                            {t('kalan-miktar')}: {product.KALAN_MIKTAR || 0}
                          </Text>
                          <Text style={{ 
                            color: textColor, 
                            opacity: 0.7, 
                            fontSize: 14, 
                            marginBottom: 4 
                          }}>
                            {t('depo')}: {product.DEPO_ISMI || t('belirtilmemis')}
                          </Text>
                          <Text style={{ 
                            color: textColor, 
                            opacity: 0.7, 
                            fontSize: 14, 
                            marginBottom: 4 
                          }}>
                            {t('giris-seri')}: {product.GIRIS_SERI}
                          </Text>
                          <Text style={{ 
                            color: textColor, 
                            opacity: 0.7, 
                            fontSize: 14, 
                            marginBottom: 12 
                          }}>
                            {t('seri-mik')}: {product.SERI_MIK}
                          </Text>

                          {/* Mal Kabul Miktarı Gir TextBox */}
                          <View style={{ marginBottom: 12 }}>
                            <Text style={{ 
                              color: textColor, 
                              opacity: 0.8, 
                              fontSize: 14, 
                              fontWeight: '500', 
                              marginBottom: 4 
                            }}>
                              {t('mal-kabul-miktari-girin')}:
                            </Text>
                            <TextInput
                              style={{
                                backgroundColor: backgroundColor,
                                borderWidth: 1,
                                borderColor: borderColor,
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 8,
                                fontSize: 14,
                                color: textColor
                              }}
                              placeholder={t('mal-kabul-miktarini-girin')}
                              placeholderTextColor={textColor}
                              value={serialNumbers[`${categoryIndex}-${productIndex}`] || ''}
                              onChangeText={(value) => {
                                // Sadece tam sayı değerlerine izin ver
                                const numericValue = value.replace(/[^0-9]/g, '');
                                updateSerialNumber(`${categoryIndex}-${productIndex}`, numericValue);
                              }}
                              keyboardType="numeric"
                              multiline={false}
                              autoCapitalize="none"
                            />
                          </View>

                          {/* Seri Gir Butonu - Sadece seri takibi "Evet" ise göster */}
                          {product.GIRIS_SERI === 'E' && (
                            <View style={{ marginBottom: 12 }}>
                              <TouchableOpacity
                                style={{
                                  backgroundColor: greenColor,
                                  borderRadius: 8,
                                  paddingHorizontal: 16,
                                  paddingVertical: 8
                                }}
                                onPress={() => {
                                  const quantity = serialNumbers[`${categoryIndex}-${productIndex}`];
                                  if (!quantity || parseInt(quantity) <= 0) {
                                    showAlert({
                                      title: t('uyari'),
                                      message: t('seri-miktari-bos-birakilamaz'),
                                      type: 'warning',
                                      buttons: [{ text: t('tamam'), onPress: () => {} }]
                                    });
                                    return;
                                  }
                                  openSerialEntry(`${categoryIndex}-${productIndex}`, product);
                                }}
                              >
                                <Text style={{ 
                                  color: textColor, 
                                  fontSize: 12, 
                                  fontWeight: '500', 
                                  textAlign: 'center' 
                                }}>
                                  {t('seri-gir')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}

                          <View style={{ marginBottom: 12 }}>
                            <TouchableOpacity
                              style={{
                                backgroundColor: blueColor,
                                borderRadius: 8,
                                paddingHorizontal: 16,
                                paddingVertical: 8
                              }}
                              onPress={() => openStockDetail(product)}
                            >
                              <Text style={{ 
                                color: textColor, 
                                fontSize: 12, 
                                fontWeight: '500', 
                                textAlign: 'center' 
                              }}>
                                {t('stok-detay-goster')}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}

                {/* Kategori Özeti */}
                <View style={{ 
                  borderTopWidth: 1, 
                  borderTopColor: borderColor, 
                  paddingTop: 16, 
                  marginTop: 16 
                }}>
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <Text style={{ 
                      color: textColor, 
                      opacity: 0.8, 
                      fontWeight: '500' 
                    }}>
                      {t('kategori-urun-sayisi')}:
                    </Text>
                    <Text style={{ 
                      color: textColor, 
                      fontWeight: 'bold' 
                    }}>
                      {category.products.length} {t('adet')}
                    </Text>
                  </View>
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginTop: 8 
                  }}>
                    <Text style={{ 
                      color: textColor, 
                      opacity: 0.8, 
                      fontWeight: '500' 
                    }}>
                      {t('toplam-miktar')}:
                    </Text>
                    <Text style={{ 
                      color: primaryColor, 
                      fontWeight: 'bold', 
                      fontSize: 18 
                    }}>
                      {category.products.reduce((total: number, product: any) => {
                        return total + parseInt(product.miktar || '0');
                      }, 0)} {t('adet')}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <View className="bg-gray-50 rounded-lg p-6 items-center">
                <Ionicons name="cube-outline" size={48} color="#9CA3AF" />
                <Text className="text-gray-500 text-center mt-3 font-medium">{t('bu-kategoride-secili-urun-bulunmamaktadir')}</Text>
              </View>
            )}
          </View>
        ))
      ) : (
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-green-500 rounded-lg items-center justify-center mr-3">
              <Ionicons name="checkmark-circle" size={20} color={textColor} />
            </View>
            <Text className="text-lg font-bold text-gray-900">{t('secili-siparisler')}</Text>
          </View>
          <View className="bg-gray-50 rounded-lg p-6 items-center">
            <Ionicons name="cube-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 text-center mt-3 font-medium">{t('secili-siparis-bulunmamaktadir')}</Text>
            <Text className="text-gray-400 text-center text-sm mt-1">{t('onceki-sayfadan-siparis-secimi-yapiniz')}</Text>
          </View>
        </View>
      )}

      {/* Genel Özet */}
      {finalSelectedCategoryDetails && finalSelectedCategoryDetails.length > 0 && (
        <View style={{
          backgroundColor: blueColor,
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          borderWidth: 1,
          borderColor: blueBorderColor
        }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 2
            }}>
              <Ionicons name="calculator" size={20} color={textColor} />
            </View>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: textColor 
            }}>
              {t('genel-ozet')}
            </Text>
          </View>
          <View style={{ gap: 12 }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingVertical: 8, 
              borderBottomWidth: 1, 
              borderBottomColor: blueBorderColor
            }}>
              <Text style={{ 
                color: textColor, 
                fontWeight: '600' 
              }}>
                {t('toplam-siparis')}:
              </Text>
              <Text style={{ 
                color: textColor, 
                fontWeight: '400' 
              }}>
                {finalSelectedCategoryDetails.length} {t('adet')}
              </Text>
            </View>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingVertical: 8, 
              borderBottomWidth: 1, 
              borderBottomColor: blueBorderColor 
            }}>
              <Text style={{ 
                color: textColor, 
                fontWeight: '600' 
              }}>
                {t('toplam-urun')}:
              </Text>
              <Text style={{ 
                color: textColor, 
                fontWeight: '400' 
              }}>
                {finalSelectedCategoryDetails.reduce((total: number, category: any) => total + (category.products ? category.products.length : 0), 0)} {t('adet')}
              </Text>
            </View>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingVertical: 8 
            }}>
              <Text style={{ 
                color: textColor, 
                fontWeight: '600' 
              }}>
                {t('toplam-miktar')}:
              </Text>
              <Text style={{ 
                color: textColor, 
                fontWeight: '400', 
                fontSize: 18 
              }}>
                {finalSelectedCategoryDetails.reduce((total: number, category: any) =>
                  total + (category.products ? category.products.reduce((catTotal: number, product: any) => {
                    return catTotal + parseInt(product.miktar || '0');
                  }, 0) : 0), 0
                )} {t('adet')}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        gap: 16 
      }}>
        <TouchableOpacity
          style={{
            width: 128,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: borderColor,
            backgroundColor: backgroundColor,
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
          <Text style={{ 
            color: textColor, 
            fontSize: 16, 
            fontWeight: '600' 
          }}>{t('geri')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 128,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            backgroundColor: isLoading 
              ? grayColor
              : greenColor,
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 5
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
              }}>{t('tamamla')}</Text>
              <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Stok Detay Popup */}
      <StokDetayEkrani
        visible={isStockDetailVisible}
        selectedProduct={selectedProductForDetail}
        onClose={closeStockDetail}
      />

      {/* Seri Gir Popup */}
      <Modal
        visible={isSerialEntryVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeSerialEntry}
      >
        <View className="flex-1 justify-center items-center p-4">
          <View className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg" style={{ maxHeight: 500 }}>
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <View className="w-10 h-10 bg-green-500 rounded-lg items-center justify-center mr-3">
                    <Ionicons name="list" size={20} color="white" />
                  </View>
                  <Text className="text-lg font-bold text-gray-900">{t('seri-numaralari')}</Text>
                </View>
                {currentProductInfo && (
                  <View className="ml-13">
                    <Text className="text-sm text-gray-600">{t('siparis-no')}: {currentProductInfo.siparisNo || 'N/A'}</Text>
                    <Text className="text-sm text-gray-600">{t('stok-kodu')}: {currentProductInfo.STOK_KODU || 'N/A'}</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={closeSerialEntry}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Serial Number Inputs */}
            <ScrollView className="mb-4">
              <View className="space-y-3">
                {serialEntries[currentProductKey]?.map((entry, index) => (
                  <View key={index} className="bg-gray-50 rounded-lg p-3">
                    <Text className="text-gray-600 text-sm font-medium mb-2">
                      {currentProductInfo ? 
                        `${currentProductInfo.siparisNo || 'N/A'}-${currentProductInfo.STOK_KODU || 'N/A'} ${t('seri')} ${index + 1}:` : 
                        `${t('seri-no')} ${index + 1}:`
                      }
                    </Text>
                    <TextInput
                      className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      placeholder={`${index + 1}. ${t('seri-numarasini-girin')}`}
                      value={entry}
                      onChangeText={(value) => updateSerialEntry(index, value)}
                      autoCapitalize="characters"
                    />
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-500 rounded-lg py-3 px-6 flex-1 mr-2"
                onPress={closeSerialEntry}
              >
                <Text className="text-white text-center font-semibold">{t('iptal')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-green-500 rounded-lg py-3 px-6 flex-1 ml-2"
                onPress={closeSerialEntry}
              >
                <Text className="text-white text-center font-semibold">{t('kaydet')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <AlertComponent />
    </View>
  );
}