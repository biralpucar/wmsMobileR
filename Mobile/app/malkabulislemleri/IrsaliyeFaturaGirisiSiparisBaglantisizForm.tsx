import { erpStok } from '@/app/servis/erpClass/stokServisClass';
import { getErpStoklar } from '@/app/servis/erpServis/stokServis';
import CustomDropdown from '@/components/CustomDropdown';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface IrsaliyeFaturaGirisiSiparisBaglantisizFormProps {
  irsaliyeNo: string;
  cariKod: string;
  cariAdi?: string;
  selectedDate: string;
  irsaliyeTipi?: string;
  onNext: (data: any) => void;
  onBack: () => void;
}

export default function IrsaliyeFaturaGirisiSiparisBaglantisizForm({
  irsaliyeNo,
  cariKod,
  cariAdi,
  selectedDate,
  irsaliyeTipi,
  onNext,
  onBack
}: IrsaliyeFaturaGirisiSiparisBaglantisizFormProps) {
  const router = useRouter();
  const { t } = useLanguage();

  // Tema hook'ları
  const { theme, isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const surfaceColor = useThemeColor({}, 'surface');
  const colorRed = useThemeColor({}, 'red');
  const colorGreen = useThemeColor({}, 'green');
  const colorBlue = useThemeColor({}, 'blue');
  const colorOrange = useThemeColor({}, 'orange');
  const colorYellow = useThemeColor({}, 'yellow');
  const colorPurple = useThemeColor({}, 'purple');
  const colorPink = useThemeColor({}, 'pink');
  const colorSuccess = useThemeColor({}, 'success');
  const colorIndigo = useThemeColor({}, 'indigo');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const redBorderColor = useThemeColor({}, 'redBorder');
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);
  const [isHelpExpanded, setIsHelpExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStokKodu, setSelectedStokKodu] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [malKabulMiktarlari, setMalKabulMiktarlari] = useState<{ [key: string]: string }>({});
  const [expandedProducts, setExpandedProducts] = useState<{ [key: string]: boolean }>({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'warning' as const, buttons: [] as any[] });

  // API'den gelen stok verileri için state'ler
  const [apiStoklar, setApiStoklar] = useState<erpStok[]>([]);
  const [isStokLoading, setIsStokLoading] = useState(false);
  const [stokError, setStokError] = useState<string | null>(null);

  // API'den stok verilerini çek
  useEffect(() => {
    const fetchStoklar = async () => {
      setIsStokLoading(true);
      setStokError(null);

      try {
        const response = await getErpStoklar();

        if (response.success) {
          setApiStoklar(response.data);
          console.log('Stok verileri başarıyla yüklendi:', response.data.length, 'adet');
        } else {
          setStokError(response.error || 'Stok verileri yüklenirken hata oluştu');
          console.error('Stok API hatası:', response.error);
        }
      } catch (error) {
        setStokError('Ağ hatası: Stok verileri yüklenemedi');
        console.error('Stok yükleme hatası:', error);
      } finally {
        setIsStokLoading(false);
      }
    };

    fetchStoklar();
  }, []);

  // API'den gelen stok verilerini dropdown formatına çevir
  const convertApiStokToProduct = (stok: erpStok) => {
    console.log('convertApiStokToProduct - stok objesi:', stok);
    console.log('convertApiStokToProduct - stok keys:', Object.keys(stok));

    // API'den gelen veriler büyük harfli alan adlarına sahip
    const stokKodu = stok.STOK_KODU || '';
    const stokAdi = stok.STOK_ADI || 'İsimsiz Ürün';
    const miktar = stok.MIKTAR || 0;

    console.log('convertApiStokToProduct - çıkarılan değerler:', {
      stokKodu,
      stokAdi,
      miktar
    });

    if (!stokKodu) {
      console.warn('Stok kodu bulunamadı:', stok);
      return null;
    }

    return {
      label: `${stokAdi} (${stokKodu})`,
      value: stokKodu,
      name: stokAdi,
      stokKodu: stokKodu,
      miktar: miktar.toString(),
      seriTakibi: stok.GIRIS_SERI=== 'E' ? 'Evet' : 'Hayır',
      miktarKadarSeri: stok.SERI_MIK === 'E' ? 'Evet' : 'Hayır',
    };
  };

  // Stok kodu seçenekleri - API'den gelen veriler varsa onları kullan, yoksa fallback veriler
  const stokProducts = apiStoklar.length > 0
    ? apiStoklar.map(convertApiStokToProduct).filter(product => product !== null)
    : [
      // Fallback veriler (API çalışmadığında)

    ];

  console.log('stokProducts:', stokProducts.slice(0, 3)); // İlk 3 ürünü logla
  console.log('Total stokProducts count:', stokProducts.length);

  const stokKoduOptions = stokProducts
    .filter(product => product && product.stokKodu && product.name) // Boş değerleri filtrele
    .map(product => ({
      label: product.label,
      value: product.value
    }));

  console.log('stokKoduOptions:', stokKoduOptions.slice(0, 3)); // İlk 3 seçeneği logla
  console.log('Total stokKoduOptions count:', stokKoduOptions.length);

  if (stokKoduOptions.length === 0 && apiStoklar.length > 0) {
    console.error('Beklenmeyen veri formatı: API\'den veri geldi ama dropdown seçenekleri oluşturulamadı');
    console.error('İlk API stok verisi:', apiStoklar[0]);
  }

  const toggleInfoSection = () => {
    setIsInfoExpanded(prev => !prev);
  };

  const toggleHelpSection = () => {
    setIsHelpExpanded(prev => !prev);
  };

  const toggleProductDetail = (productValue: string) => {
    setExpandedProducts(prev => ({
      ...prev,
      [productValue]: !prev[productValue]
    }));
  };

  const handleStokSelection = (option: any) => {
    const product = stokProducts.find(p => p.value === option.value);

    // Aynı ürün daha önce seçilmiş mi kontrol et
    const isAlreadySelected = selectedProducts.some(p => p.value === option.value);

    if (isAlreadySelected) {
      setAlertConfig({
        title: 'Uyarı',
        message: 'Bu ürün zaten seçilmiş!',
        type: 'warning',
        buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
      });
      setAlertVisible(true);
      return;
    }

    if (product) {
      setSelectedProducts(prev => [...prev, product]);
      // Dropdown'u sıfırla
      setSelectedStokKodu('');
    }
  };

  const removeProduct = (productValue: string) => {
    setSelectedProducts(prev => prev.filter(p => p.value !== productValue));
    // İlgili mal kabul miktarını da sil
    setMalKabulMiktarlari(prev => {
      const newMiktarlar = { ...prev };
      delete newMiktarlar[productValue];
      return newMiktarlar;
    });
  };

  const updateMalKabulMiktari = (productValue: string, miktar: string) => {
    setMalKabulMiktarlari(prev => ({
      ...prev,
      [productValue]: miktar
    }));
  };

  const openSerialEntry = (productValue: string, product: any) => {
    const miktar = malKabulMiktarlari[productValue] || '';
    setAlertConfig({
      title: 'Seri Girişi',
      message: `${product.name} için seri numarası girişi açılacak.\nMiktar: ${miktar}`,
      type: 'warning',
      buttons: [
        { text: 'İptal', onPress: () => setAlertVisible(false), style: 'cancel' },
        { text: 'Tamam', onPress: () => { console.log('Seri girişi açıldı'); setAlertVisible(false); } }
      ]
    });
    setAlertVisible(true);
  };

  const openStockDetail = (product: any) => {
    setAlertConfig({
      title: 'Stok Detayı',
      message: `Ürün: ${product.name}\nStok Kodu: ${product.stokKodu}\nMevcut Miktar: ${product.miktar}\nSeri Takibi: ${product.seriTakibi}`,
      type: 'warning',
      buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
    });
    setAlertVisible(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulated validation
    setTimeout(() => {
      setIsLoading(false);

      // Form verilerini hazırla
      const formData = {
        irsaliyeNo,
        cariKod,
        selectedDate,
        irsaliyeTipi,
        selectedProducts,
        malKabulMiktarlari,
        // Sipariş bağlantısız form için ek veriler
        formType: 'siparis-baglantisiz',
        timestamp: new Date().toISOString()
      };

      onNext(formData);
    }, 1000);
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <ScrollView>

      {/* Ana İçerik Kartı */}
      <View className="rounded-xl p-6 mb-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
        {/* Başlık */}
        <View className="flex-row items-center mb-6">
          <Ionicons name="unlink" size={24} color={textColor} />
          <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('siparis-baglantisiz-form')}</Text>
        </View>

        {/* Mevcut Bilgiler Card */}
        <View className="rounded-xl p-6 mb-6" style={{ backgroundColor: backgroundColor, borderColor: greenBorderColor, borderWidth: 1, }}>
          <TouchableOpacity
            className="flex-row items-center justify-between mb-4"
            onPress={toggleInfoSection}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-500 rounded-lg items-center justify-center mr-3">
                <Ionicons name="information-circle" size={20} color="white" />
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
              <View className="flex-row justify-between items-center py-2 border-b border-green-500">
                <Text className="font-medium" style={{ color: textColor }}>{t('irsaliye-tipi')}:</Text>
                <Text className="font-semibold" style={{ color: textColor }}>{irsaliyeTipi === 'e-irsaliye' ? t('e-irsaliye') : t('irsaliye')}</Text>
              </View>
              <View className="flex-row justify-between items-center py-2 border-b border-green-500">
                <Text className="font-medium" style={{ color: textColor }}>{t('irsaliye-no')}:</Text>
                <Text className="font-semibold" style={{ color: textColor }}>{irsaliyeNo || t('belirtilmemis')}</Text>
              </View>
              <View className="flex-row justify-between items-center py-2 border-b border-green-500">
                <Text className="font-medium" style={{ color: textColor }}>{t('cari-kod')}:</Text>
                <Text className="font-semibold" style={{ color: textColor }}>{cariKod || t('belirtilmemis')}</Text>
              </View>
              <View className="flex-row justify-between items-center py-2 border-b border-green-500">
                <Text className="font-medium" style={{ color: textColor }}>{t('cari-adi')}:</Text>
                <View className='' style={{maxWidth:150}}>
                  <Text className="font-semibold" style={{ color: textColor }}>{cariAdi || t('belirtilmemis')}</Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center py-2">
                <Text className="font-medium" style={{ color: textColor }}>{t('tarih')}:</Text>
                <Text className="font-semibold" style={{ color: textColor }}>{selectedDate || t('belirtilmemis')}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Form Content */}
        <View className="bg-gray-white rounded-xl p-6 mb-6 border border-green-500">

          {/* <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4" style={{ backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 1 }}>
            <TouchableOpacity
              className="flex-row items-start"
              onPress={toggleHelpSection}
              activeOpacity={0.7}
            >
              <View className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center mr-3 mt-1">
                <Ionicons name="information" size={16} color="white" />
              </View>
              <View className="flex-1 items-center">
                <View className="flex-row items-center justify-between">
                  <Text className="font-semibold mb-1" style={{ color: textColor }}>Sipariş Bağlantısız Form</Text>
                  <Ionicons
                    name={isHelpExpanded ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#1E40AF"
                  />
                </View>
                {isHelpExpanded && (
                  <Text className="text-sm leading-5" style={{ color: textColor }}>
                    Bu form sipariş bağlantısı olmayan irsaliye/fatura kayıtları için kullanılmaktadır.
                    Stok kodunu seçtikten sonra işlemi tamamlayabilirsiniz.
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View> */}

          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-green-500 rounded-lg items-center justify-center mr-3">
              <Ionicons name="document-text" size={20} color="white" />
            </View>
            <Text className="text-lg font-bold" style={{ color: textColor }}>{t('form-bilgileri')}</Text>
          </View>

          {/* API Durum Bilgisi */}
          {isStokLoading && (
            <View className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex-row items-center">
              <View className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-3" />
              <Text className="text-blue-700 text-sm">{t('stok-verileri-yukleniyor')}</Text>
            </View>
          )}

          {stokError && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex-row items-center">
              <Ionicons name="warning" size={16} color={colorRed} style={{ marginRight: 8 }} />
              <Text className="text-red-700 text-sm flex-1">{stokError}</Text>
            </View>
          )}

          {/* {!isStokLoading && !stokError && apiStoklar.length > 0 && (
            <View className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex-row items-center">
              <Ionicons name="checkmark-circle" size={16} color="#059669" style={{ marginRight: 8 }} />
              <Text className="text-green-700 text-sm">{apiStoklar.length} adet stok verisi yüklendi</Text>
            </View>
          )} */}

          <CustomDropdown
            label={t('stok-kodu')}
            icon="cube-outline"
            placeholder={isStokLoading ? t('stok-verileri-yukleniyor') : t('stok-kodu-ve-adi-seciniz')}
            options={stokKoduOptions}
            value={selectedStokKodu}
            onSelect={handleStokSelection}
            disabled={isStokLoading}
          />

          {/* Seçilen Ürünler Listesi */}
          {selectedProducts.map((product, index) => (
            <View key={product.value} style={{
              backgroundColor: index % 2 === 0
                ? (isDarkMode ? '#374151' : '#F3F4F6')
                : (isDarkMode ? '#1E3A8A' : '#DBEAFE'),
              borderRadius: 8,
              padding: 16,
              marginBottom: 16
            }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12
                }}
                onPress={() => toggleProductDetail(product.value)}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colorRed,
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12
                    }}
                    onPress={() => removeProduct(product.value)}
                  >
                    <Ionicons name="trash" size={14} color={textColor} />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      color: textColor,
                      fontSize: 16,
                      fontWeight: '600'
                    }}>{product.name}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons
                    name={expandedProducts[product.value] ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={textColor}
                  />
                </View>
              </TouchableOpacity>

              {expandedProducts[product.value] && (
                <View style={{
                  borderTopWidth: 1,
                  borderTopColor: borderColor,
                  paddingTop: 12
                }}>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    marginBottom: 4,
                    opacity: 0.8
                  }}>{t('stok-kodu')}: {product.stokKodu}</Text>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    marginBottom: 4,
                    opacity: 0.8
                  }}>{t('miktar')}: {product.miktar}</Text>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    marginBottom: 4,
                    opacity: 0.8
                  }}>{t('seri-takibi')}: {product.seriTakibi}</Text>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    marginBottom: 12,
                    opacity: 0.8
                  }}>{t('miktar-kadar-seri')}: {product.miktarKadarSeri}</Text>

                  {/* Mal Kabul Miktarı Gir TextBox */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{
                      color: textColor,
                      fontSize: 14,
                      fontWeight: '500',
                      marginBottom: 4,
                      opacity: 0.8
                    }}>{t('mal-kabul-miktari-girin')}:</Text>
                    <TextInput
                      style={{
                        backgroundColor: cardColor,
                        borderWidth: 1,
                        borderColor: borderColor,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        fontSize: 14,
                        color: textColor
                      }}
                      placeholder={t('mal-kabul-miktarini-girin')}
                      placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                      value={malKabulMiktarlari[product.value] || ''}
                      onChangeText={(value) => {
                        // Sadece tam sayı değerlerine izin ver
                        const numericValue = value.replace(/[^0-9]/g, '');
                        updateMalKabulMiktari(product.value, numericValue);
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
                          backgroundColor: cardColor,
                          borderRadius: 8,
                          paddingHorizontal: 16,
                          paddingVertical: 8
                        }}
                        onPress={() => {
                          const miktar = malKabulMiktarlari[product.value];
                          if (!miktar || parseInt(miktar) <= 0) {
                            setAlertConfig({
                              title: t('uyari'),
                              message: t('seri-miktari-bos-birakilamaz'),
                              type: 'warning',
                              buttons: [{ text: t('tamam'), onPress: () => setAlertVisible(false) }]
                            });
                            setAlertVisible(true);
                            return;
                          }
                          openSerialEntry(product.value, product);
                        }}
                      >
                        <Text style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: '500',
                          textAlign: 'center'
                        }}>{t('seri-gir')}</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={{ marginBottom: 12 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: primaryColor,
                        borderRadius: 8,
                        paddingHorizontal: 16,
                        paddingVertical: 8
                      }}
                      onPress={() => openStockDetail(product)}
                    >
                      <Text style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: '500',
                        textAlign: 'center'
                      }}>{t('stok-detay-goster')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}

        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3 mt-6 items-center justify-center">
          <TouchableOpacity
            className="w-32 rounded-xl py-4 items-center border bg-white flex-row justify-center mx-1"
            style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1, }}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={16} color={textColor} style={{ marginRight: 6 }} />
            <Text className="text-base font-semibold" style={{ color: textColor }}>{t('geri')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-32 rounded-xl py-4 items-center shadow-lg flex-row justify-center mx-1`}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.8}
            style={{ backgroundColor: isLoading ? '#9CA3AF' : colorGreen }}
          >
            {isLoading ? (
              <>
                <View className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  style={{
                    transform: [{ rotate: '0deg' }],
                    // Simple loading animation placeholder
                  }}
                />
                <Text className="text-white text-base font-semibold" style={{ color: textColor }}>{t('isleniyor')}</Text>
              </>
            ) : (
              <>
                <Text className="text-base font-semibold" style={{ color: textColor }}>{t('tamamla')}</Text>
                <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 8 }} />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}