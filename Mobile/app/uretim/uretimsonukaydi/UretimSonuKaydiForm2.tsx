import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCustomAlert } from '../../../components/CustomAlert';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomTextInput from '../../../components/CustomTextInput';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface UretimSonuKaydiForm2Props {
  formData: {
    selectedDepo?: string;
    isEmriBaglantili?: boolean;
    isEmriNo?: string;
    stokKodu?: string;
    urunKodu?: string;
    miktar?: string;
    aciklama?: string;
  } | null;
  onBack: () => void;
  onComplete: (data: any) => void;
}

const UretimSonuKaydiForm2: React.FC<UretimSonuKaydiForm2Props> = ({ formData, onBack, onComplete }) => {
  // Dil hook'u
  const { t } = useLanguage();
  
  // Tema hook'ları
  const { theme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
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
  // Bilgiler alanının açık/kapalı durumu
  const [isInfoExpanded, setIsInfoExpanded] = useState<boolean>(true);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(true);

  // Stok ekleme için state'ler
  const [selectedStok, setSelectedStok] = useState<string>('');
  const [stokMiktar, setStokMiktar] = useState<string>('');

  // Eklenen stokları tutacak state
  const [eklenenStoklar, setEklenenStoklar] = useState<Array<{
    stokKodu: string;
    stokAdi: string;
    miktar: string;
  }>>([]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingMiktar, setEditingMiktar] = useState<string>('');

  // CustomAlert hook'u
  const { showAlert, AlertComponent } = useCustomAlert();

  // Stok seçenekleri (örnek veri)
  const stokOptions = [
    { label: 'Ürün A - Plastik Parça', value: 'URN001' },
    { label: 'Ürün B - Metal Aksam', value: 'URN002' },
    { label: 'Ürün C - Elektronik Kart', value: 'URN003' },
    { label: 'Ürün D - Kablo Grubu', value: 'URN004' },
    { label: 'Ürün E - Montaj Parçası', value: 'URN005' },
  ];

  // Bilgiler alanını açıp kapatma fonksiyonu
  const toggleInfoSection = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  // Detaylar alanını açıp kapatma fonksiyonu
  const toggleDetailsSection = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  // Stok seçimi fonksiyonu
  const handleStokSelect = (option: { label: string; value: string }) => {
    setSelectedStok(option.value);
  };

  // Stok ekleme fonksiyonu
  const handleStokEkle = () => {
    // Miktar kontrolü
    if (!stokMiktar || stokMiktar.trim() === '') {
      showAlert({
        title: t('uyari'),
        message: t('lutfenMiktarGiriniz'),
        type: 'warning',
        buttons: [{ text: t('tamam'), onPress: () => { } }]
      });
      return;
    }

    // Seçilen stok bilgisini bul
    const selectedStokInfo = stokOptions.find(option => option.value === selectedStok);
    if (!selectedStokInfo) {
      showAlert({
        title: t('hata'),
        message: t('secilenStokBulunamadi'),
        type: 'error',
        buttons: [{ text: 'Tamam', onPress: () => { } }]
      });
      return;
    }

    // Duplicate kontrol
    const mevcutStok = eklenenStoklar.find(stok => stok.stokKodu === selectedStok);
    if (mevcutStok) {
      showAlert({
        title: t('uyari'),
        message: t('zatenBuStokDahaOnceEklenmis'),
        type: 'warning',
        buttons: [{ text: 'Tamam', onPress: () => { } }]
      });
      return;
    }

    // Stoku listeye ekle
    const yeniStok = {
      stokKodu: selectedStok,
      stokAdi: selectedStokInfo.label,
      miktar: stokMiktar
    };

    setEklenenStoklar(prev => [...prev, yeniStok]);

    // State'leri temizle
    setSelectedStok('');
    setStokMiktar('');

    // Başarı mesajı
    showAlert({
      title: t('basarili'),
      message: t('stokBasariylaEklendi'),
      type: 'success',
      buttons: [{ text: 'Tamam', onPress: () => { } }]
    });
  };

  const handleStokSil = (index: number) => {
    showAlert({
      title: 'Onay',
      message: 'Bu stoku silmek istediğinizden emin misiniz?',
      type: 'warning',
      buttons: [
        { text: 'İptal', onPress: () => { } },
        {
          text: 'Sil',
          onPress: () => {
            setEklenenStoklar(prev => prev.filter((_, i) => i !== index));
            showAlert({
              title: 'Başarılı',
              message: 'Stok başarıyla silindi.',
              type: 'success',
              buttons: [{ text: 'Tamam', onPress: () => { } }]
            });
          }
        }
      ]
    });
  };

  const handleDuzenleBaslat = (index: number) => {
    setEditingIndex(index);
    setEditingMiktar(eklenenStoklar[index].miktar);
  };

  const handleDuzenleKaydet = () => {
    if (!editingMiktar.trim()) {
      showAlert({
        title: 'Uyarı',
        message: 'Lütfen miktar giriniz.',
        type: 'warning',
        buttons: [{ text: 'Tamam', onPress: () => { } }]
      });
      return;
    }

    if (editingIndex !== null) {
      setEklenenStoklar(prev =>
        prev.map((stok, index) =>
          index === editingIndex
            ? { ...stok, miktar: editingMiktar }
            : stok
        )
      );

      setEditingIndex(null);
      setEditingMiktar('');

      showAlert({
        title: t('basarili'),
        message: t('stokMiktariBasariylaGuncellendi'),
        type: 'success',
        buttons: [{ text: 'Tamam', onPress: () => { } }]
      });
    }
  };

  const handleDuzenleIptal = () => {
    setEditingIndex(null);
    setEditingMiktar('');
  };
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor }}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <AlertComponent />

        {/* Ana Container */}
        <View className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
          <View className="flex-row items-center mb-6">
            <Ionicons name="construct-outline" size={24} color={textColor} />
            <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('uretimSonuKaydi')}</Text>
          </View>

          {/* Form Bilgileri Özeti */}
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
                <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                  <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('depo')}:</Text>
                  <Text className="font-semibold" style={{ color: textColor }}>{formData?.selectedDepo || '-'}</Text>
                </View>

                <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                  <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('kayitTuru')}:</Text>
                  <Text className="font-semibold" style={{ color: textColor }}>{formData?.isEmriBaglantili ? t('isEmriBaglantili') : t('stokBaglantili')}</Text>
                </View>

                {formData?.isEmriBaglantili ? (
                  <>
                    <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                      <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('isEmriNo')}:</Text>
                      <Text className="font-semibold" style={{ color: textColor }}>{formData?.isEmriNo || '-'}</Text>
                    </View>

                    <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                      <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('urunKodu')}:</Text>
                      <Text className="font-semibold" style={{ color: textColor }}>{formData?.urunKodu || '-'}</Text>
                    </View>
                  </>
                ) : (
                  <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                    <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('stokKodu')}:</Text>
                    <Text className="font-semibold" style={{ color: textColor }}>{formData?.stokKodu || '-'}</Text>
                  </View>
                )}

                <View className="flex-row justify-between items-center py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
                  <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('miktar')}:</Text>
                  <Text className="font-semibold" style={{ color: textColor }}>{formData?.miktar || '-'}</Text>
                </View>

                {formData?.aciklama && (
                  <View className="flex-row justify-between items-center py-2">
                    <Text className="font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('aciklama')}:</Text>
                    <Text className="font-semibold" style={{ color: textColor }}>{formData.aciklama}</Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Stok Ekleme Alanı */}
          <View className="rounded-xl p-6 mb-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor: purpleBorderColor, borderWidth: 1 }}>

            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>

                <Ionicons name="add" size={20} color={textColor} />
              </View>
              <Text className="text-lg font-bold" style={{ color: textColor }}>{t('stokEkle')}</Text>
            </View>

            {/* Stok Dropdown */}
            <CustomDropdown
              label={t('stokSecimi')}
              icon="cube"
              iconColor={textColor}
              placeholder={t('stokSeciniz')}
              options={stokOptions}
              value={selectedStok}
              onSelect={handleStokSelect}
              showClearButton={true}
              onClear={() => setSelectedStok('')}
            />

            {/* Miktar Input ve Ekle Butonu - Sadece stok seçildiğinde göster */}
            {selectedStok && (
              <>
                <CustomTextInput
                  label={t('miktar')}
                  icon="calculator"
                  iconColor={textColor}
                  placeholder={t('miktarGiriniz')}
                  value={stokMiktar}
                  onChangeText={setStokMiktar}
                  keyboardType="numeric"
                />

                <TouchableOpacity
                  className="rounded-xl py-4 items-center shadow-lg flex-row justify-center mt-2"
                  onPress={handleStokEkle}
                  activeOpacity={0.8}
                  style={{ backgroundColor: blueColor }}
                >
                  <Text className="text-white text-base font-semibold mr-1">{t('ekle')}</Text>
                  <Ionicons name="add" size={18} color="white" style={{ marginRight: 8 }} />
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Üretim Detayları */}
          <View className="rounded-xl p-4" style={{ backgroundColor: grayColor, borderColor: yellowBorderColor, borderWidth: 1 }}>
            <TouchableOpacity
              className="flex-row items-center justify-between mb-4"
              onPress={toggleDetailsSection}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>

                  <Ionicons name="document-outline" size={20} color="white" />
                </View>
                <Text className="text-lg font-bold" style={{ color: textColor }}>{t('uretimDetaylari')}</Text>
              </View>
              <Ionicons
                name={isDetailsExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={textColor}
              />
            </TouchableOpacity>

            {isDetailsExpanded && (
              <View>
                {eklenenStoklar.length > 0 ? (
                  <View className="space-y-3">
                    <Text className="text-base font-semibold mb-3" style={{ color: textColor }}>
                      {t('eklenenStoklar')} ({eklenenStoklar.length})
                    </Text>
                    {eklenenStoklar.map((stok, index) => (
                      <View
                        key={index}
                        className="rounded-lg p-4 shadow-sm mb-3"
                        style={{ backgroundColor: cardColor, borderColor, borderWidth: 1 }}
                      >
                        <View className="flex-row justify-between items-center mb-2">
                          <Text className="text-sm font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('stokKodu')}:</Text>
                          <Text className="text-sm font-semibold" style={{ color: textColor }}>{stok.stokKodu}</Text>
                        </View>
                        <View className="flex-row justify-between items-center mb-2">
                          <Text className="text-sm font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('stokAdi')}:</Text>
                          <Text className="text-sm flex-1 text-right ml-2" style={{ color: textColor }} numberOfLines={2}>
                            {stok.stokAdi}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center mb-3">
                          <Text className="text-sm font-medium" style={{ color: textColor, opacity: 0.7 }}>{t('miktar')}:</Text>
                          {editingIndex === index ? (
                            <View className="flex-row items-center">
                              <TextInput
                                value={editingMiktar}
                                onChangeText={setEditingMiktar}
                                placeholder="Miktar"
                                keyboardType="numeric"
                                className="rounded px-2 py-1 text-sm w-16 text-center mr-2"
                                style={{ borderColor, borderWidth: 1, color: textColor }}
                              />
                              <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>Adet</Text>
                            </View>
                          ) : (
                            <Text className="text-sm font-bold text-orange-600">{stok.miktar} Adet</Text>
                          )}
                        </View>

                        {/* Butonlar - Miktar bilgisinin altında */}
                        <View className="flex-row justify-center space-x-3">
                          {editingIndex === index ? (
                            <>
                              <TouchableOpacity
                                onPress={handleDuzenleKaydet}
                                className="bg-green-500 rounded-lg px-4 py-2 flex-row items-center mr-3"
                              >
                                <Ionicons name="checkmark" size={16} color="white" />
                                <Text className="text-white text-sm font-medium ml-1">Kaydet</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={handleDuzenleIptal}
                                className="rounded-lg px-4 py-2 flex-row items-center"
                                style={{ backgroundColor: theme === 'dark' ? '#6B7280' : '#9CA3AF' }}
                              >
                                <Ionicons name="close" size={16} color="white" />
                                <Text className="text-white text-sm font-medium ml-1">İptal</Text>
                              </TouchableOpacity>
                            </>
                          ) : (
                            <>
                              <TouchableOpacity
                                onPress={() => handleDuzenleBaslat(index)}
                                className="rounded-lg px-4 py-2 flex-row items-center mr-3"
                                style={{ backgroundColor: blueColor }}
                              >
                                <Ionicons name="create" size={16} color="white" />
                                <Text className="text-white text-sm font-medium ml-1">Düzenle</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handleStokSil(index)}
                                className="rounded-lg px-4 py-2 flex-row items-center"
                                style={{ backgroundColor: redColor }}
                              >
                                <Ionicons name="trash" size={16} color="white" />
                                <Text className="text-white text-sm font-medium ml-1">Sil</Text>
                              </TouchableOpacity>
                            </>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View className="items-center py-8">
                    <Ionicons name="cube-outline" size={48} color={textColor} style={{ opacity: 0.3 }} />
                    <Text className="text-center mt-4" style={{ color: textColor, opacity: 0.7 }}>
                      {t('henuzStokEklenmemis')}.{'\n'}{t('yukaridakiAlandanStokEkleyebilirsiniz')}.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-center mt-6">
            <TouchableOpacity
              className="w-32 rounded-xl py-4 items-center flex-row justify-center mx-1"
              style={{ backgroundColor: theme === 'dark' ? '#6B7280' : '#9CA3AF', borderColor, borderWidth: 1 }}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color="white" style={{ marginRight: 6 }} />
              <Text className="text-white text-base font-semibold">{t('geri')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-32 rounded-xl py-4 items-center shadow-lg flex-row justify-center mx-1"
              style={{ backgroundColor: greenColor }}
              onPress={() => onComplete(formData)}
              activeOpacity={0.8}
            >
              <Text className="text-white text-base font-semibold">{t('tamamla')}</Text>
              <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UretimSonuKaydiForm2;