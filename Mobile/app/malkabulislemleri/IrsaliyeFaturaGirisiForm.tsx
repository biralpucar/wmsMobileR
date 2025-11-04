import { erpCari } from '@/app/servis/erpClass/cariServisClass';
import { getErpCariler } from '@/app/servis/erpServis/cariServis';
import CustomAlert from '@/components/CustomAlert';
import CustomDropdown from '@/components/CustomDropdown';
import CustomTextInput from '@/components/CustomTextInput';
import { useDepo } from '@/contexts/DepoContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface DropdownOption {
  label: string;
  value: string;
}

interface IrsaliyeFaturaData {
  id?: string;
  irsaliyeNo: string;
  tarih: string;
  durum?: 'Bekliyor' | 'İşleniyor' | 'Tamamlandı';
  cikisDepoKodu: string;
  cikisDepoAdi: string;
  cariKodu: string;
  cariKod: string;
  cariAdi: string;
  projeKodu?: string;
  projeAdi?: string;
  belgeSeriNo?: string;
  eIrsaliye: boolean;
  siparisBaglantili: boolean;
  irsaliyeTipi: 'irsaliye' | 'e-irsaliye';
  selectedDate: Date;
  aciklama1?: string;
  aciklama2?: string;
  aciklama3?: string;
  stoklar?: any[];
}

interface IrsaliyeFaturaGirisiFormProps {
  onNext: (data: IrsaliyeFaturaData) => void;
  onSiparisBaglantiliNext?: (data: IrsaliyeFaturaData) => void;
  initialData?: Partial<IrsaliyeFaturaData>;
}

export default function IrsaliyeFaturaGirisiForm({
  onNext,
  onSiparisBaglantiliNext,
  initialData
}: IrsaliyeFaturaGirisiFormProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const { selectedDepo, setSelectedDepo, depoOptions } = useDepo();
  const { t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
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
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');
  const redBorderColor = useThemeColor({}, 'redBorder');
  const [irsaliyeNo, setIrsaliyeNo] = useState(initialData?.irsaliyeNo || '');
  const [cariKod, setCariKod] = useState(initialData?.cariKodu || '');
  const [selectedDate, setSelectedDate] = useState(initialData?.selectedDate || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [siparisBaglantili, setSiparisBaglantili] = useState(initialData?.siparisBaglantili || false);
  const [isLoading, setIsLoading] = useState(false);
  const [irsaliyeTipi, setIrsaliyeTipi] = useState<'irsaliye' | 'e-irsaliye'>(initialData?.irsaliyeTipi || 'irsaliye');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
  });
  const [cariler, setCariler] = useState<erpCari[]>([]);
  const [cariLoading, setCariLoading] = useState(false);

  // Depo seçimi değiştiğinde global context'i güncelle
  const handleDepoChange = (newDepoValue: string) => {
    setSelectedDepo(newDepoValue);
  };

  // Cari kod seçenekleri - API'den gelen verilerle oluşturuluyor
  const cariKodOptions = cariler.map(cari => ({
    label: `${cari.CARI_ISIM || 'İsimsiz'} (${cari.CARI_KOD || 'Kodsuz'})`,
    value: cari.CARI_KOD || ''
  }));

  // Cari verilerini API'den çek
  useEffect(() => {
    const fetchCariler = async () => {
      setCariLoading(true);
      try {
        const response = await getErpCariler();
        if (response.success && response.data) {
          setCariler(response.data);
          console.log('Cari verileri başarıyla yüklendi:', response.data.length, 'adet');
        } else {
          console.error('Cari verileri yüklenemedi:', response.error);
          setAlertConfig({
            title: 'Hata',
            message: 'Cari verileri yüklenemedi. Lütfen tekrar deneyin.',
            type: 'error',
            buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
          });
          setAlertVisible(true);
        }
      } catch (error) {
        console.error('Cari verileri yükleme hatası:', error);
        setAlertConfig({
          title: 'Hata',
          message: 'Cari verileri yüklenirken bir hata oluştu.',
          type: 'error',
          buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
        });
        setAlertVisible(true);
      } finally {
        setCariLoading(false);
      }
    };

    fetchCariler();
  }, []);

  const handleSubmit = async () => {
    if (!irsaliyeNo.trim() || !cariKod.trim()) {
      setAlertConfig({
        title: t('uyari'),
        message: t('lutfen-tum-alanlari-doldurunuz'),
        type: 'warning',
        buttons: [{ text: t('tamam'), onPress: () => setAlertVisible(false) }]
      });
      setAlertVisible(true);
      return;
    }

    // İrsaliye No karakter sayısı kontrolü
    const requiredLength = irsaliyeTipi === 'irsaliye' ? 15 : 16;
    if (irsaliyeNo.trim().length !== requiredLength) {
      setAlertConfig({
        title: t('uyari'),
        message: t('irsaliye-no-karakter-uyarisi', { 
          requiredLength: irsaliyeTipi === 'irsaliye' ? '15' : '16',
          currentLength: irsaliyeNo.trim().length.toString()
        }),
        type: 'warning',
        buttons: [{ text: t('tamam'), onPress: () => setAlertVisible(false) }]
      });
      setAlertVisible(true);
      return;
    }

    setIsLoading(true);

    // Simulated validation
    setTimeout(() => {
      setIsLoading(false);

      // Seçilen cari koduna göre cari adını bul
      const selectedCari = cariler.find(cari => cari.CARI_KOD === cariKod);
      const cariAdi = selectedCari?.CARI_ISIM || '';

      // Seçilen depo bilgisini bul
      const selectedDepoData = depoOptions.find(depo => depo.value === selectedDepo);

      const formData: IrsaliyeFaturaData = {
        id: `IRS${Date.now()}`,
        irsaliyeNo,
        tarih: selectedDate.toISOString().split('T')[0],
        durum: 'Bekliyor',
        cikisDepoKodu: selectedDepo || '',
        cikisDepoAdi: selectedDepoData?.label || '',
        cariKodu: cariKod,
        cariKod: cariKod,
        cariAdi,
        belgeSeriNo: irsaliyeNo,
        eIrsaliye: irsaliyeTipi === 'e-irsaliye',
        siparisBaglantili,
        irsaliyeTipi,
        selectedDate,
        stoklar: []
      };

      if (siparisBaglantili && onSiparisBaglantiliNext) {
        onSiparisBaglantiliNext(formData);
      } else {
        onNext(formData);
      }
    }, 500);
  };

  return (
    <>
      {/* Uyarı Mesajı - Depo seçilmemişse göster */}
      {!selectedDepo && (
        <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning-outline" size={20} color={textColor} />
            <Text className="font-medium ml-2" style={{ color: textColor }}>{t('depo-secimi-gerekli')}</Text>
          </View>
          <Text className="text-sm" style={{ color: textColor }}>
            {t('depo-secimi-uyarisi')}
          </Text>
        </View>
      )}

      {/* Kaynak Depo Seçimi */}
      <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: greenBorderColor }}>
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
            <FontAwesome6 name="warehouse" size={20} color={textColor} />
          </View>
          <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('secilen-depo')}</Text>
        </View>
        <CustomDropdown
          label=""
          icon="business-outline"
          iconColor={blueBorderColor}
          placeholder={t('kaynak-depo-seciniz')}
          options={depoOptions}
          value={selectedDepo || ''}
          onSelect={(option) => handleDepoChange(option.value)}
        />
      </View>

      <View className="rounded-2xl shadow-sm p-6" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 1 }}>
        <View className="flex-row items-center mb-6">
          <Ionicons name="document-text-outline" size={24} color={textColor} />
          <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('irsaliye-fatura-girisi')}</Text>
        </View>
        {/* İrsaliye Tipi Seçimi */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-3" style={{ color: textColor }}>{t('irsaliye-tipi')}</Text>
          <View className="flex-row space-x-4">
            {/* İrsaliye Checkbox */}
            <TouchableOpacity
              className="flex-row items-center flex-1"
              onPress={() => setIrsaliyeTipi('irsaliye')}
              activeOpacity={0.7}
            >
              <View className="w-5 h-5 rounded-md border-2 mr-2 items-center justify-center"
                style={{
                  backgroundColor: irsaliyeTipi === 'irsaliye' ? blueBorderColor : cardColor,
                  borderColor: irsaliyeTipi === 'irsaliye' ? blueBorderColor : borderColor
                }}>
                {irsaliyeTipi === 'irsaliye' && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
              <Text className="text-base" style={{ color: textColor }}>{t('irsaliye')}</Text>
            </TouchableOpacity>

            {/* E-İrsaliye Checkbox */}
            <TouchableOpacity
              className="flex-row items-center flex-1"
              onPress={() => setIrsaliyeTipi('e-irsaliye')}
              activeOpacity={0.7}
            >
              <View className="w-5 h-5 rounded-md border-2 mr-2 items-center justify-center"
                style={{
                  backgroundColor: irsaliyeTipi === 'e-irsaliye' ? blueBorderColor : cardColor,
                  borderColor: irsaliyeTipi === 'e-irsaliye' ? blueBorderColor : borderColor
                }}>
                {irsaliyeTipi === 'e-irsaliye' && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
              <Text className="text-base" style={{ color: textColor }}>{t('e-irsaliye')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomTextInput
          label={t('irsaliye-no')}
          icon="receipt-outline"
          iconColor={blueBorderColor}
          placeholder={t('irsaliye-numarasi-giriniz')}
          value={irsaliyeNo}
          onChangeText={(text) => {
            const maxLength = irsaliyeTipi === 'irsaliye' ? 15 : 16;
            if (text.length <= maxLength) {
              setIrsaliyeNo(text);
            }
          }}
          maxLength={irsaliyeTipi === 'irsaliye' ? 15 : 16}
          autoCapitalize="characters"
          autoCorrect={false}
        />

        <CustomDropdown
          label={t('cari-kod')}
          icon="person-outline"
          iconColor={redBorderColor}
          placeholder={cariLoading ? t('cari-veriler-yukleniyor') : t('cari-kod-seciniz')}
          options={cariKodOptions}
          value={cariKod}
          onSelect={(option) => setCariKod(option.value)}
          disabled={cariLoading}
        />

        {/* Tarih Seçimi */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-2" style={{ color: textColor }}>{t('tarih')}</Text>
          <TouchableOpacity
            className="flex-row items-center rounded-xl px-4 py-4"
            style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={20} color={greenBorderColor} />
            <Text className="flex-1 ml-3 text-base" style={{ color: textColor }}>
              {selectedDate.toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </Text>
            <Ionicons name="chevron-down" size={20} color={textColor} />
          </TouchableOpacity>
        </View>

        {/* Tarih Seçici Modal */}
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="rounded-2xl p-6 mx-4 w-80" style={{ backgroundColor: cardColor }}>
              <Text className="text-lg font-semibold mb-4 text-center" style={{ color: textColor }}>{t('tarih-secin')}</Text>

              {/* Basit tarih seçici - son 30 gün */}
              <ScrollView className="max-h-60">
                {Array.from({ length: 30 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - i);
                  return date;
                }).map((date, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-3 rounded-lg mb-2"
                    style={{
                      backgroundColor: selectedDate.toDateString() === date.toDateString()
                        ? blueColor
                        : backgroundColor
                    }}
                    onPress={() => {
                      setSelectedDate(date);
                      setShowDatePicker(false);
                    }}
                  >
                    <Text className="text-center" style={{
                      color: selectedDate.toDateString() === date.toDateString()
                        ? 'white'
                        : textColor,
                      fontWeight: selectedDate.toDateString() === date.toDateString()
                        ? '600'
                        : 'normal'
                    }}>
                      {date.toLocaleDateString('tr-TR', {
                        weekday: 'long',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity
                className="rounded-lg py-3 mt-4"
                style={{ backgroundColor: backgroundColor }}
                onPress={() => setShowDatePicker(false)}
              >
                <Text className="text-center font-medium" style={{ color: textColor }}>{t('iptal')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Sipariş Bağlantılı Checkbox */}
        <View className="mb-6">
          <TouchableOpacity
            className="flex-row items-center p-4 rounded-xl"
            style={{ backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 1 }}
            onPress={() => setSiparisBaglantili(!siparisBaglantili)}
            activeOpacity={0.7}
          >
            <View className="w-6 h-6 rounded-md border-2 mr-3 items-center justify-center"
              style={{
                backgroundColor: siparisBaglantili ? blueBorderColor : cardColor,
                borderColor: siparisBaglantili ? blueBorderColor : borderColor
              }}>
              {siparisBaglantili && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium" style={{ color: textColor }}>{t('siparis-baglantili')}</Text>
              <Text className="text-sm mt-1" style={{ color: textColor, opacity: 0.7 }}>{t('siparis-baglantili-aciklama')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-3 mt-2 justify-center">
          <TouchableOpacity
            className="w-32 rounded-xl py-4 items-center flex-row justify-center mx-1"
            style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
            <Text className="text-base font-semibold" style={{ color: textColor }}>{t('geri')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-32 rounded-xl py-4 items-center shadow-lg flex-row justify-center mx-1"
            style={{ backgroundColor: isLoading ? '#9CA3AF' : blueColor }}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <>
                <View className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                  style={{
                    transform: [{ rotate: '0deg' }],
                    // Simple loading animation placeholder
                  }}
                />
                <Text className="text-white text-base font-semibold">{t('isleniyor')}</Text>
              </>
            ) : (
              <>
                <Text className="text-base font-semibold" style={{ color: textColor }}>{t('ileri')}</Text>
                <Ionicons name="arrow-forward" size={20} color={textColor} style={{ marginLeft: 8 }} />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* CustomAlert */}
        <CustomAlert
          visible={alertVisible}
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          buttons={alertConfig.buttons}
          onClose={() => setAlertVisible(false)}
        />
      </View>
    </>
  );
}