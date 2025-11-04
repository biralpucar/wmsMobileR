import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useCustomAlert } from '../../../components/CustomAlert';
import CustomDropdown from '../../../components/CustomDropdown';
import CustomTextInput from '../../../components/CustomTextInput';
import { useDepo } from '../../../contexts/DepoContext';
import { useLanguage } from '../../../hooks/useLanguage';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface AmbarCikisFormProps {
  selectedDepo?: string;
  onDepoChange?: (depo: string) => void;
  onNext: (data: {
    selectedDepo?: string;
    hucreTuru?: string;
    cikisYeri?: string;
    projeKodu?: string;
    aciklama1?: string;
    aciklama2?: string;
    aciklamaText?: string;
    siparisBaglantili?: boolean;
    eIrsaliye?: boolean;
    irsaliye?: boolean;
  }) => void;
}

const AmbarCikisForm: React.FC<AmbarCikisFormProps> = ({ selectedDepo: propSelectedDepo, onDepoChange, onNext }) => {
  const router = useRouter();
  const { showAlert, AlertComponent } = useCustomAlert();
  const { selectedDepo, setSelectedDepo, depoOptions, selectedDepoInfo } = useDepo();
  const { t } = useLanguage();

  // Tema renkleri
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
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
  const redBorderColor = useThemeColor({}, 'redBorder');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');
  const cyanBorderColor = useThemeColor({}, 'cyanBorder');

  // State'ler
  const [hucreTuru, setHucreTuru] = useState<string>('');
  const [cikisYeri, setCikisYeri] = useState<string>('');
  const [projeKodu, setProjeKodu] = useState<string>('');
  const [aciklama1, setAciklama1] = useState<string>('');
  const [aciklama2, setAciklama2] = useState<string>('');
  const [aciklamaText, setAciklamaText] = useState<string>('');
  const [siparisBaglantili, setSiparisBaglantili] = useState<boolean>(false);
  const [eIrsaliye, setEIrsaliye] = useState<boolean>(false);
  const [irsaliye, setIrsaliye] = useState<boolean>(false);
  // Depo seçimi değiştiğinde global context'i güncelle
  const handleDepoChange = (newDepoValue: string) => {
    setSelectedDepo(newDepoValue);
  };


  // Dropdown seçenekleri
  const hucreTuruOptions = [
    { label: 'A Tipi Hücre', value: 'A' },
    { label: 'B Tipi Hücre', value: 'B' },
    { label: 'C Tipi Hücre', value: 'C' },
    { label: 'D Tipi Hücre', value: 'D' },
  ];

  const cikisYeriOptions = [
    { label: 'Ana Kapı', value: 'AK001' },
    { label: 'Yan Kapı', value: 'YK001' },
    { label: 'Yükleme Rampası', value: 'YR001' },
    { label: 'Acil Çıkış', value: 'AC001' },
  ];

  const projeKoduOptions = [
    { label: 'PRJ-2024-001', value: 'PRJ-2024-001' },
    { label: 'PRJ-2024-002', value: 'PRJ-2024-002' },
    { label: 'PRJ-2024-003', value: 'PRJ-2024-003' },
    { label: 'PRJ-2024-004', value: 'PRJ-2024-004' },
  ];

  const aciklama1Options = [
    { label: 'Normal Çıkış', value: 'normal' },
    { label: 'Acil Çıkış', value: 'acil' },
    { label: 'Planlı Çıkış', value: 'planli' },
    { label: 'Transfer Çıkış', value: 'transfer' },
  ];

  const aciklama2Options = [
    { label: 'Kalite Kontrol Gerekli', value: 'kalite' },
    { label: 'Direkt Çıkarma', value: 'direkt' },
    { label: 'Geçici Depolama', value: 'gecici' },
    { label: 'Özel İşlem', value: 'ozel' },
  ];

  const handleCheckboxChange = () => {
    setSiparisBaglantili(!siparisBaglantili);
  };

  const handleEIrsaliyeChange = () => {
    setEIrsaliye(!eIrsaliye);
  };

  const handleIrsaliyeChange = () => {
    setIrsaliye(!irsaliye);
  };

  const handleIleriPress = () => {
    // Depo seçimi kontrolü
    if (!selectedDepo) {
      showAlert(
        'Uyarı',
        'Lütfen ana sayfadan bir depo seçimi yapınız.',
        'warning',
        'Tamam'
      );
      return;
    }

    // Form validasyonu
    if (!hucreTuru || !cikisYeri || !projeKodu || !aciklama1 || !aciklama2) {
      showAlert(
        'Eksik Bilgi',
        'Lütfen tüm zorunlu alanları doldurunuz.',
        'warning',
        'Tamam'
      );
      return;
    }

    // Form validasyonu ve sonraki sayfaya yönlendirme
    const formData = {
      selectedDepo,
      hucreTuru,
      cikisYeri,
      projeKodu,
      aciklama1,
      aciklama2,
      aciklamaText,
      siparisBaglantili,
      eIrsaliye,
      irsaliye
    };

    console.log('Form verileri:', formData);
    onNext(formData);
  };

  return (
    <View>
      <AlertComponent />


      {/* Uyarı Mesajı - Sadece home.tsx'ten depo seçilmemişse ve dropdown'dan da seçilmemişse göster */}
      {!selectedDepo && (
        <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning-outline" size={20} color={textColor} />
            <Text className="font-medium ml-2" style={{ color: textColor }}>{t('depoSecimiGerekli')}</Text>
          </View>
          <Text className="text-sm" style={{ color: textColor }}>
            {t('anaSayfadanDepoSecilmemis')}
          </Text>
        </View>
      )}

      {/* Kaynak Depo Seçimi */}
      <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: greenBorderColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
            <FontAwesome6 name="warehouse" size={20} color={textColor} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>{t('secilenDepo')}</Text>
        </View>
        <CustomDropdown
          label={t('depoSecimi')}
          icon="business-outline"
          iconColor={blueBorderColor}
          placeholder={t('kaynakDepoSeciniz')}
          options={depoOptions}
          value={selectedDepo}
          onSelect={(option) => handleDepoChange(option.value)}
        />
      </View>


      {/* Ambar Çıkış İşlemleri */}
      <View style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2, borderRadius: 12, padding: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <FontAwesome6 name="truck-ramp-box" size={24} color={textColor} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('ambarCikisIslemleri')}</Text>
        </View>

        {/* Hücre Türü */}
        <View className="mb-4">
          <CustomDropdown
            label={t('hareketTipi')}
            icon="grid-outline"
            iconColor={blueBorderColor}
            placeholder={t('hareketTipiniSeciniz')}
            options={hucreTuruOptions}
            value={hucreTuru}
            onSelect={(option) => setHucreTuru(option.value)}
          />
        </View>

        {/* Çıkış Yeri */}
        <View className="mb-4">
          <CustomDropdown
            label={t('cikisYeri')}
            icon="exit-outline"
            iconColor={redBorderColor}
            placeholder={t('cikisYeriniSeciniz')}
            options={cikisYeriOptions}
            value={cikisYeri}
            onSelect={(option) => setCikisYeri(option.value)}
          />
        </View>

        {/* Proje Kodu */}
        <View className="mb-4">
          <CustomDropdown
            label={t('projeKodu')}
            icon="code-slash-outline"
            iconColor={greenBorderColor}
            placeholder={t('projeKodunuSeciniz')}
            options={projeKoduOptions}
            value={projeKodu}
            onSelect={(option) => setProjeKodu(option.value)}
          />
        </View>

        {/* Açıklama 1 */}
        <View className="mb-4">
          <CustomDropdown
            label={t('aciklama1')}
            icon="information-circle-outline"
            iconColor={yellowBorderColor}
            placeholder={t('aciklamaSeciniz')}
            options={aciklama1Options}
            value={aciklama1}
            onSelect={(option) => setAciklama1(option.value)}
          />
        </View>

        {/* Açıklama 2 */}
        <View className="mb-4">
          <CustomDropdown
            label={t('aciklama2')}
            icon="list-outline"
            iconColor={purpleBorderColor}
            placeholder={t('aciklamaSeciniz')}
            options={aciklama2Options}
            value={aciklama2}
            onSelect={(option) => setAciklama2(option.value)}
          />
        </View>

        {/* Açıklama Metin */}
        <View className="mb-6">
          <CustomTextInput
            label={t('aciklama')}
            icon="create-outline"
            iconColor={cyanBorderColor}
            placeholder={t('aciklamaGiriniz')}
            value={aciklamaText}
            onChangeText={setAciklamaText}
            multiline={true}
            numberOfLines={3}
          />
        </View>

        {/* İrsaliye Türü */}
        <View className="mb-6">
          {/* <View className="flex-row items-center mb-3">
            <Ionicons name="document-outline" size={18} color="#374151" />
            <Text className="text-base font-medium text-gray-700 ml-2">İrsaliye Türü</Text>
          </View> */}

          <View style={{ flexDirection: 'row', backgroundColor: surfaceColor, borderRadius: 12, borderColor: borderColor, borderWidth: 1 }}>
            {/* E-irsaliye */}
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16 }}
              onPress={handleEIrsaliyeChange}
              activeOpacity={0.7}
            >
              <View style={{
                width: 24, height: 24, borderRadius: 6, borderWidth: 2, marginRight: 12, alignItems: 'center', justifyContent: 'center',
                backgroundColor: eIrsaliye ? primaryColor : cardColor,
                borderColor: eIrsaliye ? primaryColor : borderColor
              }}>
                {eIrsaliye && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: textColor }}>{t('eIrsaliye')}</Text>
              </View>
            </TouchableOpacity>

            {/* İrsaliye */}
            <TouchableOpacity
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 16 }}
              onPress={handleIrsaliyeChange}
              activeOpacity={0.7}
            >
              <View style={{
                width: 24, height: 24, borderRadius: 6, borderWidth: 2, marginRight: 12, alignItems: 'center', justifyContent: 'center',
                backgroundColor: irsaliye ? primaryColor : cardColor,
                borderColor: irsaliye ? primaryColor : borderColor
              }}>
                {irsaliye && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: textColor }}>{t('irsaliye')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sipariş Durumu */}
        <View style={{ marginBottom: 24 }}>
          {/* <View className="flex-row items-center mb-3">
            <Ionicons name="document-text-outline" size={18} color="#374151" />
            <Text className="text-base font-medium text-gray-700 ml-2">Sipariş Durumu</Text>
          </View> */}

          {/* Sipariş Bağlantılı */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: surfaceColor, borderRadius: 12, borderColor: borderColor, borderWidth: 1 }}
            onPress={handleCheckboxChange}
            activeOpacity={0.7}
          >
            <View style={{
              width: 24, height: 24, borderRadius: 6, borderWidth: 2, marginRight: 12, alignItems: 'center', justifyContent: 'center',
              backgroundColor: siparisBaglantili ? primaryColor : cardColor,
              borderColor: siparisBaglantili ? primaryColor : borderColor
            }}>
              {siparisBaglantili && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: textColor }}>{t('siparisBaglantili')}</Text>
              <Text style={{ fontSize: 14, color: secondaryColor, marginTop: 4 }}>{t('buCikisBirSipariseBaglidir')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Butonlar */}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {/* Geri Butonu */}
          <TouchableOpacity
            style={{ flex: 1, borderRadius: 12, paddingVertical: 16, alignItems: 'center', borderColor: borderColor, borderWidth: 1, backgroundColor: cardColor, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 4 }}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={16} color={textColor} style={{ marginRight: 6 }} />
            <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('geri')}</Text>
          </TouchableOpacity>

          {/* İleri Butonu */}
          <TouchableOpacity
            style={{ flex: 1, borderRadius: 12, paddingVertical: 16, alignItems: 'center', backgroundColor: blueColor, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 4 }}

            onPress={handleIleriPress}
            activeOpacity={0.8}
          >
            <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('ileri')}</Text>
            <Ionicons name="arrow-forward" size={20} color={textColor} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AmbarCikisForm;