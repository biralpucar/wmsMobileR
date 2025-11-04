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
import StokDetayEkrani from '../../../components/StokDetayEkrani';

interface AmbarCikisSiparisBaglantiliForm2Props {
  formData: {
    selectedDepo?: string;
    hucreTuru?: string;
    cikisYeri?: string;
    projeKodu?: string;
    aciklama1?: string;
    aciklama2?: string;
    aciklamaText?: string;
    siparisBaglantili?: boolean;
    selectedProducts?: any[];
    selectedCategoryDetails?: any[];
    cariAdi?: string;
    siparisNo?: string;
    urunKod?: string;
    miktar?: number;
    birimFiyat?: number;
  } | null;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function AmbarCikisSiparisBaglantiliForm2({
  formData,
  onNext,
  onBack
}: AmbarCikisSiparisBaglantiliForm2Props) {
  // Tema hook'ları
  const { theme } = useTheme();
  const { t } = useLanguage();
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
  const router = useRouter();
  const params = useLocalSearchParams();
  const { showAlert, AlertComponent } = useCustomAlert();

  // Form verilerini al
  const selectedProducts = formData?.selectedProducts || [];
  const selectedCategoryDetails = formData?.selectedCategoryDetails || [];

  // Seri numaralarını tutmak için state
  const [serialNumbers, setSerialNumbers] = useState<{ [key: string]: string }>({});

  // Mevcut Bilgiler alanının açık/kapalı durumu
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);

  // Seçili siparişlerin açık/kapalı durumu - ilk sipariş açık, diğerleri kapalı
  const [expandedOrders, setExpandedOrders] = useState<{ [key: number]: boolean }>(
    selectedCategoryDetails.reduce((acc, _, index) => {
      acc[index] = index === 0; // İlk sipariş açık, diğerleri kapalı
      return acc;
    }, {} as { [key: number]: boolean })
  );

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Stok detay popup state'i
  const [isStockDetailVisible, setIsStockDetailVisible] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<any>(null);

  // Seri gir popup state'i
  const [isSerialEntryVisible, setIsSerialEntryVisible] = useState(false);
  const [currentProductKey, setCurrentProductKey] = useState<string>('');
  const [serialEntries, setSerialEntries] = useState<{ [key: string]: string[] }>({});

  // Ürün detaylarının açık/kapalı durumu
  const [expandedProducts, setExpandedProducts] = useState<{ [key: string]: boolean }>({});

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
      // Mevcut seri girişlerini al veya yeni array oluştur
      const currentEntries = serialEntries[productKey] || [];
      // miktarKadarSeri 'Evet' ise girilen miktar kadar, 'Hayır' ise 1 textbox
      const textboxCount = product.miktarKadarSeri === 'Evet' ? quantity : 1;
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
  };

  // Ürün detaylarını toggle etme fonksiyonu
  const toggleProductSection = (productKey: string) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productKey]: !prev[productKey]
    }));
  };

  const updateSerialEntry = (index: number, value: string) => {
    setSerialEntries(prev => ({
      ...prev,
      [currentProductKey]: prev[currentProductKey]?.map((entry, i) => i === index ? value : entry) || []
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // İşlemi tamamla
      const submitData = {
        ...formData,
        serialNumbers,
        serialEntries
      };

      console.log('Form tamamlandı:', submitData);
      await onNext(submitData);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <View className="rounded-2xl shadow-sm p-6" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
      {/* Başlık */}
      <View className="flex-row items-center mb-6">
        <Ionicons name="link" size={24} color={textColor} />
        <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('siparisBaglantiliAmbarCikisForm')}</Text>
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
            <Text className="text-lg font-bold" style={{ color: textColor }}>{t('mevcutBilgiler')}</Text>
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
              <Text style={{ fontWeight: '600', color: textColor }}>{t('secilenDepo')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{formData?.selectedDepo || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('hareketTipi')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{formData?.hucreTuru || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('cikisYeri')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{formData?.cikisYeri || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('projeKodu')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{formData?.projeKodu || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('cariAdi')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{formData?.cariAdi || t('belirtilmemis')}</Text>
            </View>
            <View className="flex-row justify-between items-center py-2 border-b" style={{ borderColor: greenBorderColor }}>
              <Text style={{ fontWeight: '600', color: textColor }}>{t('aciklama')}:</Text>
              <Text style={{ fontWeight: '500', color: textColor }}>{formData?.aciklamaText || t('belirtilmemis')}</Text>
            </View>
            {selectedCategoryDetails && selectedCategoryDetails.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                <Text style={{ fontWeight: '600', color: textColor }}>{t('siparisNo')}:</Text>
                <Text style={{ fontWeight: '500', color: textColor }}>{selectedCategoryDetails.map((cat: { siparisNo: string }) => cat.siparisNo).join(', ')}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Seçili Siparişler */}
      {selectedCategoryDetails && selectedCategoryDetails.length > 0 ? (
        selectedCategoryDetails.map((category: any, categoryIndex: number) => (
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
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold', 
                  color: textColor 
                }}>
                  {category.name}
                </Text>
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
                              {product.name}
                            </Text>
                            <Text style={{ 
                              color: textColor, 
                              opacity: 0.7, 
                              fontSize: 14 
                            }}>
                              {t('stokKodu')}: {product.stokKodu}
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
                            {t('miktar')}: {product.miktar}
                          </Text>
                          <Text style={{ 
                            color: textColor, 
                            opacity: 0.7, 
                            fontSize: 14, 
                            marginBottom: 4 
                          }}>
                            {t('seriTakibi')}: {product.seriTakibi}
                          </Text>
                          <Text style={{ 
                            color: textColor, 
                            opacity: 0.7, 
                            fontSize: 14, 
                            marginBottom: 12 
                          }}>
                            {t('miktarKadarSeri')}: {product.miktarKadarSeri}
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
                              {t('malKabulMiktariGirin')}:
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
                              placeholder={t('malKabulMiktariniGirin')}
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
                          {product.seriTakibi === 'Evet' && (
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
                                      message: t('seriMiktariBosOlamaz'),
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
                                  {t('seriGir')}
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
                                {t('stokDetayGoster')}
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
                      {t('kategoriUrunSayisi')}:
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
                      {t('toplamMiktar')}:
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
                <Text className="text-gray-500 text-center mt-3 font-medium">Bu kategoride seçili ürün bulunmamaktadır</Text>
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
            <Text className="text-lg font-bold text-gray-900">Seçili Siparişler</Text>
          </View>
          <View className="bg-gray-50 rounded-lg p-6 items-center">
            <Ionicons name="cube-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 text-center mt-3 font-medium">Seçili sipariş bulunmamaktadır</Text>
            <Text className="text-gray-400 text-center text-sm mt-1">Önceki sayfadan sipariş seçimi yapınız</Text>
          </View>
        </View>
      )}

      {/* Genel Özet */}
      {selectedCategoryDetails && selectedCategoryDetails.length > 0 && (
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
              {t('genelOzet')}
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
                {t('toplamSiparis')}:
              </Text>
              <Text style={{ 
                color: textColor, 
                fontWeight: '400' 
              }}>
                {selectedCategoryDetails.length} {t('adet')}
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
                {t('toplamUrun')}:
              </Text>
              <Text style={{ 
                color: textColor, 
                fontWeight: '400' 
              }}>
                {selectedCategoryDetails.reduce((total: number, category: any) => total + (category.products ? category.products.length : 0), 0)} {t('adet')}
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
                {t('toplamMiktar')}:
              </Text>
              <Text style={{ 
                color: textColor, 
                fontWeight: '400', 
                fontSize: 18 
              }}>
                {selectedCategoryDetails.reduce((total: number, category: any) =>
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
              ? (isDarkMode ? '#6B7280' : '#9CA3AF')
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
                color: 'white',
                fontSize: 16,
                fontWeight: '600'
              }}>{t('isleniyor')}...</Text>
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: 'rgba(0, 0, 0, 0.7)', }}>
          <View style={{ backgroundColor: grayColor, borderRadius: 16, padding: 24, width: '95%', maxWidth: 400, maxHeight: 500, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,borderWidth:1, borderColor:yellowBorderColor }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, backgroundColor: blueColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Ionicons name="list" size={20} color={textColor} />
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>{t('seriNumaralari')}</Text>
              </View>
              <TouchableOpacity onPress={closeSerialEntry}>
                <Ionicons name="close" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            {/* Serial Number Inputs */}
            <ScrollView style={{ marginBottom: 16 }}>
              <View>
                {serialEntries[currentProductKey]?.map((entry, index) => (
                  <View key={index} style={{ backgroundColor: grayColor, borderWidth: 1, borderColor: blueBorderColor, borderRadius: 8, padding: 12, marginBottom: 12 }}>

                    <Text style={{ color: textColor, fontSize: 14, fontWeight: '500', marginBottom: 8 }}>{t('seriNo')} {index + 1}:</Text>
                    <TextInput
                      style={{ backgroundColor: surfaceColor, borderWidth: 1, borderColor: borderColor, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, fontSize: 14, color: textColor }}
                      placeholder={`${index + 1}. ${t('seriNumarasiniGirin')}...`}
                      placeholderTextColor={textColor}
                      value={entry}
                      onChangeText={(value) => updateSerialEntry(index, value)}
                      autoCapitalize="characters"
                    />
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ backgroundColor: backgroundColor, borderRadius: 8, borderWidth: 1, borderColor: borderColor, paddingVertical: 12, paddingHorizontal: 24, flex: 1, marginRight: 8 }}
                onPress={closeSerialEntry}
              >
                <Text style={{ color: textColor, textAlign: 'center', fontWeight: '600' }}>{t('iptal')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: greenColor, borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, flex: 1, marginLeft: 8 }}
                onPress={closeSerialEntry}
              >
                <Text style={{ color: textColor, textAlign: 'center', fontWeight: '600' }}>{t('kaydet')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <AlertComponent />
    </View>
  );
}