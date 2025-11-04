import CustomDropdown from '@/components/CustomDropdown';
import CustomTextInput from '@/components/CustomTextInput';
import { useDepo } from '@/contexts/DepoContext';
import { useLanguage } from '@/hooks/useLanguage';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface DepoTransferiFormProps {
  onNext: (data: {
    selectedDepo?: string;
    karsiDepo?: string;
    selectedCari?: string;
    selectedProje?: string;
    selectedBelgeSeriNo?:string
    hedefDepo?: string;
    hucreTuru?: string;
    cikisYeri?: string;
    projeKodu?: string;
    aciklama1?: string;
    aciklama2?: string;
    aciklama3?: string;
    aciklamaText?: string;
    siparisBaglantili?: boolean;
    eIrsaliye?: boolean;
    irsaliye?: boolean;
  }) => void;
}

interface RouteParams {
  selectedDepo?: string;
}

const DepoTransferiForm: React.FC<DepoTransferiFormProps> = ({ onNext }) => {
  const router = useRouter();
  const { selectedDepo, setSelectedDepo, depoOptions, selectedDepoInfo } = useDepo();
  const navigation = useNavigation();
  const { t } = useLanguage();

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
  // State değişkenleri
  const [karsiDepo, setKarsiDepo] = useState<string>('');
  const [selectedCari, setSelectedCari] = useState<string>('');
  const [selectedProje, setSelectedProje] = useState<string>('');
  const [selectedBelgeSeriNo, setSelectedBelgeSeriNo] = useState<string>('');
  const [eIrsaliye, setEIrsaliye] = useState<boolean>(false);
  const [aciklama1, setAciklama1] = useState<string>('');
  const [aciklama2, setAciklama2] = useState<string>('');
  const [aciklama3, setAciklama3] = useState<string>('');

  // Depo seçimi değiştiğinde global context'i güncelle
  const handleDepoChange = (newDepoValue: string) => {
    setSelectedDepo(newDepoValue);
  };

  // Cari seçenekleri
  const cariOptions = [
    { label: 'ABC Şirketi', value: 'C001' },
    { label: 'XYZ Ltd. Şti.', value: 'C002' },
    { label: 'DEF Ticaret A.Ş.', value: 'C003' },
    { label: 'GHI İnşaat Ltd.', value: 'C004' },
    { label: 'JKL Teknoloji A.Ş.', value: 'C005' },
  ];

  // Proje seçenekleri
  const projeOptions = [
    { label: 'Proje Alpha', value: 'P001' },
    { label: 'Proje Beta', value: 'P002' },
    { label: 'Proje Gamma', value: 'P003' },
    { label: 'Proje Delta', value: 'P004' },
    { label: 'Proje Epsilon', value: 'P005' },
  ];

  // Belge seri numarası seçenekleri
  const belgeSeriNoOptions = [
    { label: 'BSN-2024-001', value: 'BSN-2024-001' },
    { label: 'BSN-2024-002', value: 'BSN-2024-002' },
    { label: 'BSN-2024-003', value: 'BSN-2024-003' },
    { label: 'BSN-2024-004', value: 'BSN-2024-004' },
    { label: 'BSN-2024-005', value: 'BSN-2024-005' },
  ];



  return (
    <ScrollView style={{ flex: 1 }}>


      {/* Uyarı Mesajı - Sadece home.tsx'ten depo seçilmemişse göster */}
      {!selectedDepo && (
        <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning-outline" size={20} color={textColor} />
            <Text className="font-medium ml-2" style={{ color: textColor }}>{t('depo-secimi-gerekli')}</Text>
          </View>
          <Text className="text-sm" style={{ color: textColor }}>
            {t('noWarehouseSelectedFromHomePage')}
          </Text>
        </View>
      )}

      {/* Kaynak Depo Seçimi */}
      <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: greenBorderColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
            <FontAwesome6 name="warehouse" size={20} color={textColor} />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>{t('selectedWarehouse')}</Text>
        </View>
        <CustomDropdown
          label={t('warehouse')}
          icon="business-outline"
          iconColor={blueBorderColor}
          placeholder={t('selectSourceWarehouse')}
          options={depoOptions}
          value={selectedDepo}
          onSelect={(option) => handleDepoChange(option.value)}
        />
      </View>

      {/* Transfer İşlemleri Bölümü */}
      <View style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2, borderRadius: 12, padding: 24 }}>
       <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <FontAwesome6 name="truck-ramp-box" size={24} color={textColor} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('depoTransferIslemleri')}</Text>
        </View>

          {/* Karşı Depo Dropdown */}
          <View style={{ marginBottom: 8 }}>
            <CustomDropdown
              label={t('karsiDepo')}
              icon="business-outline"
              iconColor={blueBorderColor}
              placeholder={t('karsiDepoSeciniz')}
              options={depoOptions}
              value={karsiDepo}
              onSelect={(option) => setKarsiDepo(option.value)}
            />
          </View>

          {/* Cari Dropdown */}
          <View style={{ marginBottom: 8 }}>
            <CustomDropdown
              label={t('cari')}
              icon="person-outline"
              iconColor={redBorderColor}
              placeholder={t('cariSeciniz')}
              options={cariOptions}
              value={selectedCari}
              onSelect={(option) => setSelectedCari(option.value)}
            />
          </View>

          {/* Proje Kodu Dropdown */}
          <View style={{ marginBottom: 8 }}>
            <CustomDropdown
              label={t('projeKodu')}
              icon="folder-outline"
              iconColor={greenBorderColor}
              placeholder={t('projeKoduSeciniz')}
              options={projeOptions}
              value={selectedProje}
              onSelect={(option) => setSelectedProje(option.value)}
            />
          </View>

          {/* Belge Seri Numarası Dropdown */}
          <View style={{ marginBottom: 8 }}>
            <CustomDropdown
              label={t('belgeSeriNumarasi')}
              icon="document-text-outline"
              iconColor={yellowBorderColor}
              placeholder={t('belgeSeriNumarasiSeciniz')}
              options={belgeSeriNoOptions}
              value={selectedBelgeSeriNo}
              onSelect={(option) => setSelectedBelgeSeriNo(option.value)}
            />
          </View>

          {/* E-İrsaliye Checkbox */}
          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: surfaceColor, borderRadius: 12, borderWidth: 1, borderColor: borderColor }}
              onPress={() => setEIrsaliye(!eIrsaliye)}
              activeOpacity={0.7}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                borderWidth: 2,
                marginRight: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: eIrsaliye ? primaryColor : 'transparent',
                borderColor: eIrsaliye ? primaryColor : borderColor
              }}>
                {eIrsaliye && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: textColor }}>{t('eIrsaliye')}</Text>
        <Text style={{ fontSize: 14, color: secondaryColor, marginTop: 4 }}>{t('elektronikIrsaliyeOlustur')}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Açıklama Alanları */}
          <View style={{ marginBottom: 8 }}>
            <CustomTextInput
              label={t('aciklama1')}
              icon="create-outline"
              iconColor={purpleBorderColor}
              placeholder={t('ilkAciklama')}
              value={aciklama1}
              onChangeText={setAciklama1}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <CustomTextInput
              label={t('aciklama2')}
              icon="create-outline"
              iconColor={indigoBorderColor}
              placeholder={t('ikinciAciklama')}
              value={aciklama2}
              onChangeText={setAciklama2}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <CustomTextInput
              label={t('aciklama3')}
              icon="create-outline"
              iconColor={cyanBorderColor}
              placeholder={t('ucuncuAciklama')}
              value={aciklama3}
              onChangeText={setAciklama3}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Butonlar */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {/* Geri Butonu */}
            <TouchableOpacity
              style={{ flex: 1, borderRadius: 12, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: borderColor, backgroundColor: cardColor, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 4 }}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
              <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('geri')}</Text>
            </TouchableOpacity>

            {/* İleri Butonu */}
            <TouchableOpacity
              style={{ flex: 1, borderRadius: 12, paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: blueColor, marginHorizontal: 4 }}
              onPress={() => {
                if (onNext) {
                  onNext({
                    selectedDepo: selectedDepo,
                    karsiDepo,
                    selectedCari,
                    selectedProje,
                    selectedBelgeSeriNo,
                    eIrsaliye,
                    aciklama1,
                    aciklama2,
                    aciklama3,
                  });
                }
              }}
              activeOpacity={0.8}
            >
              <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('ileri')}</Text>
              <Ionicons name="arrow-forward" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
      </View>
    </ScrollView>
  );
};

export default DepoTransferiForm;