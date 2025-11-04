import CustomAlert from '@/components/CustomAlert';
import CustomDropdown from '@/components/CustomDropdown';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PlanliAmbarCikis {
  id: string;
  cikisDepoKodu: string;
  cikisDepoAdi: string;
  karsiDepoKodu: string;
  karsiDepoAdi: string;
  cariKodu: string;
  cariAdi: string;
  projeKodu: string;
  projeAdi: string;
  belgeSeriNo: string;
  eIrsaliye: boolean;
  aciklama1: string;
  aciklama2: string;
  aciklama3: string;
  durum: 'Bekliyor' | 'Toplanıyor' | 'Tamamlandı';
  tarih: string;
  stoklar: any[];
}

interface PlanliAmbarCikisListesiProps {
  selectedDepo?: string;
  onBaslatPress: (ambarCikis: PlanliAmbarCikis) => void;
  onDetayPress: (ambarCikis: PlanliAmbarCikis) => void;
  onDepoChange: (depo: string) => void;
}

const PlanliAmbarCikisListesi: React.FC<PlanliAmbarCikisListesiProps> = ({
  selectedDepo,
  onBaslatPress,
  onDetayPress,
  onDepoChange
}) => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = isDarkMode ? '#3B82F6' : '#2563EB';
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

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [expandedAmbarCikislar, setExpandedAmbarCikislar] = useState<{ [key: string]: boolean }>({});
  const [currentSelectedDepo, setCurrentSelectedDepo] = useState<string>(selectedDepo || '');

  // Depo seçenekleri
  const depoOptions = [
    { label: 'Ana Depo', value: 'D001' },
    { label: 'Yedek Depo', value: 'D002' },
    { label: 'Satış Deposu', value: 'D003' },
    { label: 'İade Deposu', value: 'D004' },
  ];

  // Seçili depo bilgisini bul
  const selectedDepoInfo = depoOptions.find(depo => depo.value === selectedDepo);


  // Depo seçimi değiştiğinde parent component'e bildir
  const handleDepoChange = (newDepoValue: string) => {
    setCurrentSelectedDepo(newDepoValue);
    // Parent component'e bildir
    if (onDepoChange) {
      onDepoChange(newDepoValue);
    }
  };



  // Örnek planlı ambar çıkış verileri
  const planliAmbarCikislar: PlanliAmbarCikis[] = [
    {
      id: '1',
      cikisDepoKodu: 'D001',
      cikisDepoAdi: 'Ana Depo',
      karsiDepoKodu: 'D002',
      karsiDepoAdi: 'Şube Depo',
      cariKodu: 'C001',
      cariAdi: 'ABC Şirketi',
      projeKodu: 'P001',
      projeAdi: 'Proje Alpha',
      belgeSeriNo: 'BSN',
      eIrsaliye: true,
      aciklama1: 'Acil çıkış',
      aciklama2: 'Müşteri talebi',
      aciklama3: 'Öncelikli sevkiyat',
      durum: 'Bekliyor',
      tarih: '2024-01-15',
      stoklar: []
    },
    {
      id: '2',
      cikisDepoKodu: 'D001',
      cikisDepoAdi: 'Ana Depo',
      karsiDepoKodu: 'D003',
      karsiDepoAdi: 'Bölge Depo',
      cariKodu: 'C002',
      cariAdi: 'XYZ Ltd.',
      projeKodu: 'P002',
      projeAdi: 'Proje Beta',
      belgeSeriNo: 'BSN',
      eIrsaliye: false,
      aciklama1: 'Normal çıkış',
      aciklama2: 'Stok dengeleme',
      aciklama3: 'Haftalık rutin',
      durum: 'Toplanıyor',
      tarih: '2024-01-16',
      stoklar: []
    },
    {
      id: '3',
      cikisDepoKodu: 'D002',
      cikisDepoAdi: 'Şube Depo',
      karsiDepoKodu: 'D001',
      karsiDepoAdi: 'Ana Depo',
      cariKodu: 'C003',
      cariAdi: 'DEF A.Ş.',
      projeKodu: 'P003',
      projeAdi: 'Proje Gamma',
      belgeSeriNo: 'BSN',
      eIrsaliye: true,
      aciklama1: 'Geri çıkış',
      aciklama2: 'Fazla stok',
      aciklama3: 'Merkeze iade',
      durum: 'Bekliyor',
      tarih: '2024-01-14',
      stoklar: []
    }
  ];

  const getStatusColor = (durum: string) => {
    switch (durum) {
      case 'Bekliyor':
        return yellowColor;
      case 'Toplanıyor':
        return purpleColor;
      case 'Tamamlandı':
        return greenColor;
      default:
        return blueColor;
    }
  };

  React.useEffect(() => {
    // İlk ambar çıkışını açık olarak ayarla
    if (planliAmbarCikislar.length > 0) {
      setExpandedAmbarCikislar({ [planliAmbarCikislar[0].id]: true });
    }
  }, []);

  const toggleAmbarCikisExpansion = (ambarCikisId: string) => {
    setExpandedAmbarCikislar(prev => ({
      ...prev,
      [ambarCikisId]: !prev[ambarCikisId]
    }));
  };
  const handleBaslatPress = (transfer: PlanliAmbarCikis) => {
        if (!selectedDepo) {
            setAlertMessage(t('lutfenOnceAnaSayfadanBirDepoSeciniz'));
            setAlertVisible(true);
        } else if (selectedDepo !== `${transfer.cikisDepoKodu}`) {
            setAlertMessage(`${t('anaSayfadanSecilenDepo')} (${selectedDepo}) ${t('ileTransferCikisDeposuFarklidir')} (${transfer.cikisDepoKodu} - ${transfer.cikisDepoAdi}) ${t('lutfenUygunDepoyuSeciniz')}`);
            setAlertVisible(true);
        } else {
            if (onBaslatPress) {
                onBaslatPress(transfer);
            }
        }
    };
  return (
    <>

      {/* Uyarı Mesajı - Sadece home.tsx'ten depo seçilmemişse ve dropdown'dan da seçilmemişse göster */}
      {!selectedDepo && !currentSelectedDepo && (
        <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
          <View className="flex-row items-center mb-2">
            <Ionicons name="warning-outline" size={20} color={textColor} />
            <Text className="font-medium ml-2" style={{ color: textColor }}>{t('depoSecimiGerekli')}</Text>

          </View>
          <Text className="text-sm" style={{ color: textColor }}>
            {t('anaSayfadanBirDepoSecimiYapilmamis')}
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
          value={currentSelectedDepo}
          onSelect={(option) => handleDepoChange(option.value)}
        />
      </View>

      {/* Ambar Çıkış Listesi */}
      <View style={{ padding: 16, borderWidth: 2, borderColor: blueBorderColor, borderRadius: 12, backgroundColor: cardColor }}>
        {/* Başlık */}
        <View className="flex-row items-center mb-6">
          <FontAwesome6 name="truck-ramp-box" size={24} color={textColor} />
          <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('planliAmbarCikislari')}</Text>
        </View>

        <View>
          {planliAmbarCikislar.map((ambarCikis) => (
            <View key={ambarCikis.id} style={{ backgroundColor: cardColor, marginBottom: 16, borderRadius: 12, borderWidth: 1, borderColor: greenBorderColor, overflow: 'hidden' }}>
              {/* Ambar Çıkış Header */}
              <TouchableOpacity
                style={{ backgroundColor: backgroundColor, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: borderColor }}
                onPress={() => toggleAmbarCikisExpansion(ambarCikis.id)}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 32, height: 32, backgroundColor: grayColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                      <Ionicons name="swap-horizontal-outline" size={16} color={textColor} />
                    </View>
                    <View>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>{t('ambarCikis')} #{ambarCikis.id}</Text>
                      <Text style={{ fontSize: 14, color: textColor }}>{ambarCikis.tarih}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginRight: 12, backgroundColor: getStatusColor(ambarCikis.durum) }}>
                      <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{ambarCikis.durum}</Text>
                    </View>
                    <Ionicons
                      name={expandedAmbarCikislar[ambarCikis.id] ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={"white"}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Ambar Çıkış Detayları */}
              {expandedAmbarCikislar[ambarCikis.id] && (
                <View style={{ padding: 16 }}>
                  {/* Depo Bilgileri */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('depoBilgileri')}</Text>
                    <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: blueBorderColor }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cikisDepo')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.cikisDepoKodu} - {ambarCikis.cikisDepoAdi}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('karsiDepo')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.karsiDepoKodu} - {ambarCikis.karsiDepoAdi}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Cari ve Proje Bilgileri */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('cariVeProje')}</Text>
                    <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: greenBorderColor }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cari')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.cariKodu} - {ambarCikis.cariAdi}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('proje')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.projeKodu} - {ambarCikis.projeAdi}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('belgeSeriNo')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{ambarCikis.belgeSeriNo}</Text>
                      </View>
                    </View>
                  </View>

                  {/* E-İrsaliye */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('eIrsaliye')}</Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 20,
                      backgroundColor: ambarCikis.eIrsaliye
                        ? greenColor
                        : redColor
                    }}>
                      <Ionicons
                        name={ambarCikis.eIrsaliye ? 'checkmark' : 'close'}
                        size={14}
                        color={ambarCikis.eIrsaliye ? textColor : textColor}
                      />
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: 4,
                        color: textColor
                      }}>
                        {ambarCikis.eIrsaliye ? t('aktif') : t('pasif')}
                      </Text>
                    </View>
                  </View>

                  {/* Açıklamalar */}
                  <View style={{ marginBottom: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('aciklamalar')}</Text>
                    <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: purpleBorderColor }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: textColor, marginBottom: 4 }}>1. {ambarCikis.aciklama1}</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: textColor, marginBottom: 4 }}>2. {ambarCikis.aciklama2}</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: textColor, marginBottom: 4 }}>3. {ambarCikis.aciklama3}</Text>
                    </View>
                  </View>

                  {/* Aksiyon Butonları */}
                  <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: blueColor,
                        gap: 8
                      }}
                      onPress={() => onDetayPress(ambarCikis)}
                    >
                      <Ionicons name="eye" size={16} color={textColor} />
                      <Text style={{ color: textColor, fontWeight: '700', fontSize: 14 }}>{t('detay')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flex: 1,
                        paddingVertical: 12,
                        borderRadius: 8,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: greenColor,
                        gap: 8
                      }}
                      onPress={() => handleBaslatPress(ambarCikis)}
                    >
                      <Text className="text-white font-medium text-sm">{t('baslat')}</Text>
                      <Ionicons name="play" size={16} color={textColor} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        title={t('depoUyarisi')}
        message={alertMessage}
        type="warning"
        buttons={[
          {
            text: t('tamam'),
            onPress: () => setAlertVisible(false),
            style: "default"
          }
        ]}
        onClose={() => setAlertVisible(false)}
      />
    </>
  );
};

export default PlanliAmbarCikisListesi;