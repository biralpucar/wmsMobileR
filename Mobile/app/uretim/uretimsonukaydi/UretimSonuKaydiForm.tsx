import { erpStok } from '@/app/servis/erpClass/stokServisClass';
import { getErpStoklar } from '@/app/servis/erpServis/stokServis';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCustomAlert } from '../../../components/CustomAlert';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomTextInput from '../../../components/CustomTextInput';
import { useDepo } from '../../../contexts/DepoContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface UretimSonuKaydiFormProps {
  onNext: (data: {
    selectedDepo?: string;
    isEmriBaglantili?: boolean;
    isEmriNo?: string;
    stokKodu?: string;
    miktar?: string;
    aciklama?: string;
  }) => void;
}

const UretimSonuKaydiForm: React.FC<UretimSonuKaydiFormProps> = ({ onNext }) => {
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const { selectedDepo, setSelectedDepo, depoOptions, selectedDepoInfo } = useDepo();
  const { t } = useLanguage();

  const { theme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const successColor = useThemeColor({}, 'success');
  const errorColor = useThemeColor({}, 'error');
  const warningColor = useThemeColor({}, 'warning');
  const surfaceColor = useThemeColor({}, 'surface');
  const secondaryColor = useThemeColor({}, 'secondary');
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

  // State'ler
  const [isEmriNo, setIsEmriNo] = useState<string>('');
  const [stokKodu, setStokKodu] = useState<string>('');
  const [miktar, setMiktar] = useState<string>('');
  const [aciklama, setAciklama] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmriBaglantili, setIsEmriBaglantili] = useState<boolean>(false);
  const [isInfoExpanded, setIsInfoExpanded] = useState<boolean>(true);

  // API Stok verileri için state'ler
  const [apiStoklar, setApiStoklar] = useState<erpStok[]>([]);
  const [isStokLoading, setIsStokLoading] = useState<boolean>(false);
  const [stokError, setStokError] = useState<string | null>(null);
  const [apiStokSuccess, setApiStokSuccess] = useState<boolean>(false);
  const [selectedStok, setSelectedStok] = useState<any>(null);
  const [isEmriData, setIsEmriData] = useState<any>(null);

  // API'den stok verilerini çek
  useEffect(() => {
    const fetchStoklar = async () => {
      setIsStokLoading(true);
      setStokError(null);

      try {
        console.log('Stok verileri çekiliyor...');
        const response = await getErpStoklar();

        if (response.success && response.data) {
          setApiStoklar(response.data);
          setApiStokSuccess(true);
          console.log('Stok verileri başarıyla yüklendi:', response.data.length, 'adet');
        } else {
          setStokError(response.error || t('stokVerileriAlinamadi'));
          console.error('Stok verileri alınamadı:', response.error);
        }
      } catch (error) {
        setStokError(t('stokVerileriYuklenirkenHataOlustu'));
        console.error('Stok verileri yükleme hatası:', error);
      } finally {
        setIsStokLoading(false);
      }
    };

    fetchStoklar();
  }, []);

  // API'den gelen stok verilerini dropdown formatına çevir
  const convertApiStokToProduct = (stok: erpStok) => {
    // API'den gelen alan adları küçük harfle başlıyor, önce onları kontrol et
    const stokKodu = stok.stoK_KODU || stok.STOK_KODU || '';
    const stokAdi = stok.stoK_ADI || stok.STOK_ADI || t('isimsizUrun');
    const miktar = stok.MIKTAR || 0;

    return {
      label: `${stokAdi} (${stokKodu})`,
      value: stokKodu,
      name: stokAdi,
      stokKodu: stokKodu,
      miktar: miktar.toString(),
      uretilecekMiktar: miktar, // Üretim için miktar bilgisi
      seriTakibi: stok.SERI_BAK === 'E' ? t('evet') : t('hayir'),
      miktarKadarSeri: stok.SERI_MIK === 'E' ? t('evet') : t('hayir'),
      // Ek bilgiler
      grupKodu: stok.GRUP_KODU || '',
      olcuBr1: stok.OLCU_BR1 || '',
      barkod1: stok.BARKOD1 || '',
      barkod2: stok.BARKOD2 || '',
      barkod3: stok.BARKOD3 || '',
      satisFiat1: stok.SATIS_FIAT1 || 0,
      alisFiat1: stok.ALIS_FIAT1 || 0
    };
  };

  // Depo seçimi değiştiğinde global context'i güncelle
  const handleDepoChange = (newDepoValue: string) => {
    setSelectedDepo(newDepoValue);
  };

  // Mevcut bilgiler alanını toggle etme fonksiyonu
  const toggleInfoSection = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  // Seçilen iş emri bilgilerini al
  const getSelectedIsEmriInfo = () => {
    if (!isEmriNo) return null;
    const selectedOption = isEmriNoOptions.find(option => option.value === isEmriNo);
    return selectedOption ? selectedOption.label : isEmriNo;
  };

  // Seçilen stok kodu bilgilerini al
  const getSelectedStokKoduInfo = () => {
    if (!stokKodu) return null;
    const selectedOption = stokKoduOptions.find(option => option.value === stokKodu);
    return selectedOption ? selectedOption.label : stokKodu;
  };



  // İş Emri No seçenekleri
  const isEmriNoOptions = [
    { label: 'IE-2024-001', value: 'IE-2024-001', uretilecekMiktar: 10 },
    { label: 'IE-2024-002', value: 'IE-2024-002', uretilecekMiktar: 20 },
    { label: 'IE-2024-003', value: 'IE-2024-003', uretilecekMiktar: 30 },
    { label: 'IE-2024-004', value: 'IE-2024-004', uretilecekMiktar: 40 },
  ];

  // Stok Kodu seçenekleri - API'den gelen veriler + fallback veriler
  const stokKoduOptions = React.useMemo(() => {
    if (apiStoklar.length > 0) {
      // API'den gelen verileri kullan
      return apiStoklar.map(convertApiStokToProduct);
    } else {
      // API verisi yoksa fallback veriler
      return [
        { label: 'STK-001 - Hammadde A', value: 'STK-001', uretilecekMiktar: 10 },
        { label: 'STK-002 - Hammadde B', value: 'STK-002', uretilecekMiktar: 20 },
      ];
    }
  }, [apiStoklar]);



  // Stok kodu veya iş emri no değiştiğinde otomatik olarak bilgileri yükle
  useEffect(() => {
    if (!isEmriBaglantili && stokKodu) {
      const foundStok = stokKoduOptions.find(option => option.value === stokKodu);
      if (foundStok) {
        setSelectedStok(foundStok);
      } else {
        setSelectedStok(null);
      }
    } else if (isEmriBaglantili && isEmriNo) {
      const foundEmri = isEmriNoOptions.find(option => option.value === isEmriNo);
      if (foundEmri) {
        setIsEmriData({
          isEmriNo: foundEmri.value,
          uretimMiktari: foundEmri.uretilecekMiktar
        });
      } else {
        setIsEmriData(null);
      }
    } else {
      // Eğer değerler boşsa state'leri temizle
      setSelectedStok(null);
      setIsEmriData(null);
    }
  }, [stokKodu, isEmriNo, isEmriBaglantili, stokKoduOptions]);

  // İleri butonu fonksiyonu
  const handleNext = () => {
    handleIleriPress();
  };



  const handleIleriPress = async () => {
    // Depo seçimi kontrolü
    if (!selectedDepo) {
      showAlert(
        t('uyari'),
        t('lutfenBirDepoSecimiYapiniz'),
        'warning',
        t('tamam')
      );
      return;
    }

    // Form validasyonu - daha detaylı kontrol
    const eksikAlanlar = [];

    if (isEmriBaglantili) {
      if (!isEmriNo) eksikAlanlar.push(t('isEmriNo'));
      if (!miktar) eksikAlanlar.push(t('miktar'));
    } else {
      if (!stokKodu) eksikAlanlar.push(t('stokKodu'));
      if (!miktar) eksikAlanlar.push(t('miktar'));
    }

    if (eksikAlanlar.length > 0) {
      showAlert(
        t('eksikBilgi'),
        `${t('lutfenSuAlanlariDoldurunuz')}: ${eksikAlanlar.join(', ')}`,
        'warning',
        t('tamam')
      );
      return;
    }

    // Miktar sayısal kontrol
    if (isNaN(Number(miktar)) || Number(miktar) <= 0) {
      showAlert(
        t('hataliMiktar'),
        t('lutfenGecerliBirMiktarGiriniz'),
        'warning',
        t('tamam')
      );
      return;
    }

    setIsLoading(true);

    try {
      const formData = {
        selectedDepo: selectedDepo,
        isEmriBaglantili,
        ...(isEmriBaglantili ? {
          isEmriNo,
        } : {
          stokKodu,
        }),
        miktar,
        aciklama
      };

      console.log('Form verileri:', formData);

      // Simulated delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));

      onNext(formData);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor }}>
      <AlertComponent />

      {/* Depo Seçimi Uyarısı */}
      {!selectedDepo && (
        <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning-outline" size={20} color={textColor} />
            <Text className="font-medium ml-2" style={{ color: textColor }}>Depo Seçimi Gerekli</Text>

          </View>
          <Text className="text-sm" style={{ color: textColor }}>
            Ana sayfadan bir depo seçimi yapılmamış. Lütfen ana sayfaya dönüp depo seçimi yapınız.
          </Text>
        </View>
      )}

      {/* Kaynak Depo Seçimi */}
      <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: greenBorderColor }}>
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
            <FontAwesome6 name="warehouse" size={20} color={textColor} />
          </View>
          <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('secilenDepo')}</Text>
        </View>
        <CustomDropdown
          label=""
          icon="business-outline"
          iconColor={blueBorderColor}
          placeholder={t('kaynakDepoSeciniz')}
          options={depoOptions}
          value={selectedDepo}
          onSelect={(option) => handleDepoChange(option.value)}
        />
      </View>


      {/* Üretim Sonu Kaydı İşlemleri */}
      <View className="rounded-xl p-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
        <View className="flex-row items-center mb-6">
          <Ionicons name="construct-outline" size={24} color={textColor} />
          <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('uretimSonuKaydi')}</Text>
        </View>

        {/* İş Emri Bağlantılı Checkbox */}
        <View className="mb-6">
          <TouchableOpacity
            className="flex-row items-center p-4 rounded-xl"
            style={{ backgroundColor: surfaceColor, borderColor, borderWidth: 1 }}
            onPress={() => setIsEmriBaglantili(!isEmriBaglantili)}
            activeOpacity={0.7}
          >
            <View className="w-6 h-6 rounded-md border-2 mr-3 items-center justify-center" style={{
              backgroundColor: isEmriBaglantili ? primaryColor : cardColor,
              borderColor: isEmriBaglantili ? primaryColor : borderColor
            }}>
              {isEmriBaglantili && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium" style={{ color: textColor }}>{t('isEmri')}</Text>
              <Text className="text-sm mt-1" style={{ color: textColor, opacity: 0.7 }}>{t('buKayitBirIsEmrineBaglidir')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Barkod Okutma - Sadece stok kodu seçimi yapılırken göster */}
        {!isEmriBaglantili && (
          <View className="mb-4">
            <TouchableOpacity
              className="flex-1 rounded-xl p-2 shadow-sm flex-row items-center"
              style={{ backgroundColor: cardColor, borderColor, borderWidth: 1 }}
              activeOpacity={0.7}
              onPress={() => console.log('Kamera OCR pressed')}
            >
              <View className="w-8 h-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: surfaceColor }}>
                <Ionicons name="barcode-sharp" size={20} color={successColor} />
              </View>
              <Text className="font-medium text-sm" style={{ color: textColor }}>{t('barkodOkut')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* İş Emri No veya Stok Kodu Seçimi */}
        <View className="mb-6">

          {/* API Stok Durumu */}
          {isStokLoading && (
            <View className="rounded-xl p-4 mb-4" style={{ backgroundColor: surfaceColor, borderColor: primaryColor, borderWidth: 1 }}>
              <Text className="text-center font-medium" style={{ color: primaryColor }}>{t('stokBilgileriYukleniyor')}</Text>
            </View>
          )}

          {stokError && (
            <View className="rounded-xl p-4 mb-4" style={{ backgroundColor: surfaceColor, borderColor: errorColor, borderWidth: 1 }}>
              <Text className="text-center font-medium" style={{ color: errorColor }}>{t('hata')}: {stokError}</Text>
            </View>
          )}

          {/* {apiStokSuccess && (
            <View className="rounded-xl p-4 mb-4" style={{ backgroundColor: surfaceColor, borderColor: successColor, borderWidth: 1 }}>
              <Text className="text-center font-medium" style={{ color: successColor }}>Stok bilgileri başarıyla yüklendi ({apiStoklar.length} adet)!</Text>
            </View>
          )} */}

          {isEmriBaglantili ? (
            <CustomDropdown
              label="İş Emri No"
              icon="document-text-outline"
              iconColor={primaryColor}
              placeholder={t('isEmriNumarasiSeciniz')}
              options={isEmriNoOptions}
              value={isEmriNo}
              onSelect={(option) => setIsEmriNo(option.value)}
            />
          ) : (
            <CustomDropdown
              label="Stok Kodu"
              icon="cube-outline"
              iconColor={primaryColor}
              placeholder={t('stokKoduSeciniz')}
              options={stokKoduOptions}
              value={stokKodu}
              onSelect={(option) => setStokKodu(option.value)}
            />
          )}
        </View>

        {/* Mevcut Bilgiler */}
        {(selectedStok || isEmriData) && (
          <View className="rounded-xl p-4 mb-6" style={{ backgroundColor: cardColor, borderColor: successColor, borderWidth: 1 }}>
            <View className="flex-row items-center mb-3">
              <Ionicons name="information-circle-outline" size={20} color={successColor} />
              <Text className="font-semibold ml-2" style={{ color: textColor }}>{t('mevcutBilgiler')}</Text>
            </View>

            {isEmriBaglantili && isEmriData && (
              <>
                <View className="flex-row justify-between py-2">
                  <Text className="font-medium" style={{ color: textColor }}>{t('isEmriNo')}:</Text>
                  <Text style={{ color: textColor, opacity: 0.7 }}>{isEmriData.isEmriNo}</Text>
                </View>
                <View className="flex-row justify-between py-2">
                  <Text className="font-medium" style={{ color: textColor }}>{t('uretimMiktari')}:</Text>
                  <Text style={{ color: textColor, opacity: 0.7 }}>{isEmriData.uretimMiktari}</Text>
                </View>
              </>
            )}

            {selectedStok && (
              <>
                <View className="flex-row justify-between py-2">
                  <Text className="font-medium" style={{ color: textColor }}>{t('stokKodu')}:</Text>
                  <Text style={{ color: textColor, opacity: 0.7 }}>{selectedStok.stokKodu}</Text>
                </View>
                <View className="flex-row justify-between py-2">
                  <Text className="font-medium" style={{ color: textColor }}>{t('stokAdi')}:</Text>
                  <Text style={{ color: textColor, opacity: 0.7 }}>{selectedStok.stokAdi}</Text>
                </View>
                <View className="flex-row justify-between py-2">
                  <Text className="font-medium" style={{ color: textColor }}>{t('birim')}:</Text>
                  <Text style={{ color: textColor, opacity: 0.7 }}>{selectedStok.birim}</Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* Miktar Girişi - Sadece iş emri veya stok kodu seçildikten sonra göster */}
        {((isEmriBaglantili && isEmriNo) || (!isEmriBaglantili && stokKodu)) && (
          <View className="mb-6">
            <CustomTextInput
              label={t('miktar')}
              icon="calculator-outline"
              iconColor={successColor}
              placeholder={t('miktariGiriniz')}
              value={miktar}
              onChangeText={setMiktar}
              keyboardType="numeric"
            />
          </View>
        )}

        {/* Açıklama - Sadece miktar alanı görünür olduğunda göster */}
        {((isEmriBaglantili && isEmriNo) || (!isEmriBaglantili && stokKodu)) && (
          <View className="mb-6">
            <CustomTextInput
              label={t('aciklamaOpsiyonel')}
              icon="document-text-outline"
              iconColor={primaryColor}
              placeholder={t('aciklamaGiriniz')}
              value={aciklama}
              onChangeText={setAciklama}
              multiline={true}
            />
          </View>
        )}

        {/* Butonlar */}
        <View className="flex-row space-x-4">
          <TouchableOpacity
            className="flex-1 p-4 rounded-xl flex-row items-center justify-center"
            style={{ backgroundColor: secondaryColor, borderColor, borderWidth: 1 }}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">{t('geri')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 p-4 rounded-xl flex-row items-center justify-center"
            style={{ backgroundColor: blueColor }}
            onPress={handleNext}
            activeOpacity={0.7}
          >
            <Text className="text-white font-semibold mr-2">{t('ileri')}</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UretimSonuKaydiForm;