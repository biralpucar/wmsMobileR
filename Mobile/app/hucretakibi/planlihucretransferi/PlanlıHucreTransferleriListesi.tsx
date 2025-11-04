import CustomAlert from '@/components/CustomAlert';
import CustomDropdown from '@/components/CustomDropdown';
import { useDepo } from '@/contexts/DepoContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLanguage } from '@/hooks/useLanguage';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface PlanliHucreTransferi {
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

interface PlanlıHucreTransferleriListesiProps {
  onBaslatPress: (hucreTransferi: PlanliHucreTransferi) => void;
  onDetayPress: (hucreTransferi: PlanliHucreTransferi) => void;
}

const PlanlıHucreTransferleriListesi: React.FC<PlanlıHucreTransferleriListesiProps> = ({
  onBaslatPress,
  onDetayPress
}) => {
  const [selectedDurum, setSelectedDurum] = useState('');
  const { selectedDepo, setSelectedDepo, depoOptions, selectedDepoInfo } = useDepo();
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
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [expandedHucreTransferleri, setExpandedHucreTransferleri] = useState<{ [key: string]: boolean }>({});

  // Örnek planlı hücre transferi verileri
  const planliHucreTransferleri: PlanliHucreTransferi[] = [
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
      aciklama1: 'Acil transfer',
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
      aciklama1: 'Normal transfer',
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
      aciklama1: 'Geri transfer',
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
        return 'bg-yellow-100 text-yellow-800';
      case 'Toplanıyor':
        return 'bg-blue-100 text-blue-800';
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  React.useEffect(() => {
    // İlk hücre transferini açık olarak ayarla
    if (planliHucreTransferleri.length > 0) {
      setExpandedHucreTransferleri({ [planliHucreTransferleri[0].id]: true });
    }
  }, []);

  const toggleHucreTransferiExpansion = (hucreTransferiId: string) => {
    setExpandedHucreTransferleri(prev => ({
      ...prev,
      [hucreTransferiId]: !prev[hucreTransferiId]
    }));
  };

  return (
    <>
      {/* Uyarı Mesajı - Sadece home.tsx'ten depo seçilmemişse ve dropdown'dan da seçilmemişse göster */}
      {!selectedDepo && (
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
            <Ionicons name="business-outline" size={20} color={textColor} />
          </View>
          <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('secilenDepo')}</Text>
        </View>
        <CustomDropdown
          label=""
          icon="business-outline"
          iconColor= {blueBorderColor}
          placeholder={t('kaynakDepoSeciniz')}
          options={depoOptions}
          value={selectedDepo}
          onSelect={(option) => setSelectedDepo(option.value)}
        />
      </View>

      {/* Hücre Transferi Listesi */}
      <View className='p-4 border border rounded-xl' style={{ backgroundColor: cardColor, borderColor: blueBorderColor }}>

        {/* Başlık */}
        <View className="flex-row items-center mb-6">
          <Ionicons name="swap-horizontal-outline" size={24} color={textColor} />
          <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('planliHucreTransferleri')}</Text>
        </View>

        {planliHucreTransferleri.length === 0 && (
          <View className="items-center py-8">
            <Ionicons name="document-outline" size={48} color={textColor} style={{ opacity: 0.5 }} />
            <Text className="text-center mt-4" style={{ color: textColor, opacity: 0.7 }}>
              {t('secilenKriterlereUygunTransferBulunamadi')}
            </Text>
          </View>
        )}

        <View >
          {planliHucreTransferleri.map((hucreTransferi) => (
            <View key={hucreTransferi.id} style={{
              marginBottom: 16,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: cardColor,
              borderColor: greenBorderColor,
              borderWidth: 1,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}>
              {/* Hücre Transferi Header */}
              <TouchableOpacity
                style={{
                  backgroundColor: backgroundColor,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: borderColor
                }}
                onPress={() => toggleHucreTransferiExpansion(hucreTransferi.id)}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      width: 32,
                      height: 32,
                      backgroundColor: grayColor,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12
                    }}>
                      <Ionicons name="swap-horizontal-outline" size={16} color={textColor} />

                    </View>
                    <View>
                      <Text style={{ 
                        fontSize: 16, 
                        fontWeight: '600', 
                        color: textColor

                      }}>
                        {t('hucreTransferi')} #{hucreTransferi.id}
                      </Text>
                      <Text style={{ 
                        fontSize: 14, 
                        color: textColor,
                        opacity: 0.9
                      }}>
                        {hucreTransferi.tarih}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 20,
                      marginRight: 12,
                      backgroundColor: hucreTransferi.durum === 'Bekliyor' ? yellowColor :
                                     hucreTransferi.durum === 'Toplanıyor' ? purpleColor : greenColor

                    }}>
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: hucreTransferi.durum === 'Bekliyor' ? textColor :
                               hucreTransferi.durum === 'Toplanıyor' ? textColor : textColor
                      }}>
                        {hucreTransferi.durum === 'Bekliyor' ? t('bekliyor') : 
                         hucreTransferi.durum === 'Toplanıyor' ? t('toplaniyor') : t('tamamlandi')}
                      </Text>
                    </View>
                    <Ionicons
                      name={expandedHucreTransferleri[hucreTransferi.id] ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="white"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Hücre Transferi Detayları */}
              {expandedHucreTransferleri[hucreTransferi.id] && (
                <View style={{ padding: 16, gap: 12 }}>
                  {/* Depo Bilgileri */}
                  <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>
                      {t('depoBilgileri')}
                    </Text>
                    <View style={{
                      backgroundColor: borderColor,
                      borderRadius: 8,
                      padding: 12,
                      gap: 8,
                      borderWidth: 1,
                      borderColor: blueBorderColor
                    }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cikisDepo')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>
                          {hucreTransferi.cikisDepoKodu} - {hucreTransferi.cikisDepoAdi}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('karsiDepo')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>
                          {hucreTransferi.karsiDepoKodu} - {hucreTransferi.karsiDepoAdi}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Cari ve Proje Bilgileri */}
                  <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>
                      {t('cariVeProje')}
                    </Text>
                    <View style={{
                      backgroundColor: borderColor,
                      borderRadius: 8,
                      padding: 12,
                      gap: 8,
                      borderWidth: 1,
                      borderColor: greenColor
                    }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cari')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>
                          {hucreTransferi.cariKodu} - {hucreTransferi.cariAdi}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('proje')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>
                          {hucreTransferi.projeKodu} - {hucreTransferi.projeAdi}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('belgeSeriNo')}:</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>
                          {hucreTransferi.belgeSeriNo}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* E-İrsaliye */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {t('eIrsaliye')}
                    </Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 20,
                      backgroundColor: hucreTransferi.eIrsaliye ? 
                        greenColor : 
                        redColor
                    }}>
                      <Ionicons
                        name={hucreTransferi.eIrsaliye ? 'checkmark' : 'close'}
                        size={14}
                        color={hucreTransferi.eIrsaliye ? textColor : textColor}
                      />
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '500',
                        marginLeft: 4,
                        color: textColor
                      }}>
                        {hucreTransferi.eIrsaliye ? t('aktif') : t('pasif')}
                      </Text>
                    </View>
                  </View>

                  {/* Açıklamalar */}
                  <View style={{ gap: 8 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      Açıklamalar
                    </Text>
                    <View style={{
                      backgroundColor: borderColor,
                      borderRadius: 8,
                      padding: 12,
                      gap: 4,
                      borderWidth: 1,
                      borderColor: purpleBorderColor
                    }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>1. {hucreTransferi.aciklama1}</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: textColor}}>2. {hucreTransferi.aciklama2}</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: textColor}}>3. {hucreTransferi.aciklama3}</Text>
                    </View>
                  </View>

                  {/* Stok Listesi */}
                  <View className="p-4 rounded-lg" style={{ backgroundColor: borderColor, borderColor: yellowBorderColor, borderWidth: 1}}>

                    <Text className="text-sm font-semibold mb-3" style={{ color: textColor }}>
                      {t('transferEdilecekStoklar')} ({hucreTransferi.stoklar.length})
                    </Text>
                    {hucreTransferi.stoklar.map((stok, index) => (
                      <View key={index} className="rounded-lg p-3 mb-2" style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}>
                        <View className="flex-row justify-between items-start">
                          <View className="flex-1">
                            <Text className="text-sm font-semibold" style={{ color: textColor }}>{stok.stokKodu}</Text>
                            <Text className="text-xs mt-1" style={{ color: textColor, opacity: 0.7 }}>{stok.stokAdi}</Text>
                          </View>
                          <View className="items-end">
                            <Text className="text-sm font-medium" style={{ color: textColor }}>{stok.miktar} {stok.birim}</Text>
                            <Text className="text-xs mt-1" style={{ color: textColor, opacity: 0.5 }}>{stok.hucre}</Text>
                          </View>
                        </View>
                      </View>
                    ))}
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
                      onPress={() => onDetayPress(hucreTransferi)}
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
                      onPress={() => {
                        if (!selectedDepo) {
                          setAlertMessage(t('lutfenOnceBirDepoSeciniz'));
                          setAlertVisible(true);
                        } else if (selectedDepo !== hucreTransferi.cikisDepoKodu) {
                          setAlertMessage(`${t('secilenDepo')} (${selectedDepo}) ${t('ileHucreTransferiDeposu')} (${hucreTransferi.cikisDepoKodu} - ${hucreTransferi.cikisDepoAdi}) ${t('farklidirLutfenUygunDepoyuSeciniz')}`);
                          setAlertVisible(true);
                        } else {
                          onBaslatPress(hucreTransferi);
                        }
                      }}
                    >
                      <Text style={{ color: textColor, fontWeight: '700', fontSize: 14 }}>{t('baslat')}</Text>

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

export default PlanlıHucreTransferleriListesi;