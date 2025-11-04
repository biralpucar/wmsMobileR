import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface StokBilgisi {
  stokKodu: string;
  stokAdi: string;
  seriNumarasi: string;
  miktari: number;
  seriTakibi: boolean;
  miktarKadarSerisi: boolean;
  depoBakiyesi: number;
  rafBakiyesi: number;
}

interface PlanliTransfer {
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
  stoklar: StokBilgisi[];
}

interface PlanliDepoTransferiDetayBilgisiProps {
  transfer: PlanliTransfer;
  onClose: () => void;
}

const PlanliDepoTransferiDetayBilgisi: React.FC<PlanliDepoTransferiDetayBilgisiProps> = ({ transfer, onClose }) => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const notificationColor = useThemeColor({}, 'notification');
  const cardColor = useThemeColor({}, 'card');
  const surfaceColor = useThemeColor({}, 'surface');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
  const redColor = useThemeColor({}, 'red');
  const orangeColor = useThemeColor({}, 'orange');
  const yellowColor = useThemeColor({}, 'yellow');
  const greenColor = useThemeColor({}, 'green');
  const blueColor = useThemeColor({}, 'blue');
  const indigoColor = useThemeColor({}, 'indigo');
  const purpleColor = useThemeColor({}, 'purple');
  const pinkColor = useThemeColor({}, 'pink');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const getStatusColor = (durum: string) => {
    switch (durum) {
      case 'Bekliyor':
        return {
          backgroundColor: isDarkMode ? '#92400E' : '#FEF3C7',
          color: isDarkMode ? '#FDE68A' : '#92400E'
        };
      case 'Toplanıyor':
        return {
          backgroundColor: isDarkMode ? '#1E3A8A' : '#DBEAFE',
          color: isDarkMode ? '#93C5FD' : '#1E40AF'
        };
      case 'Tamamlandı':
        return {
          backgroundColor: isDarkMode ? '#064E3B' : '#D1FAE5',
          color: isDarkMode ? '#6EE7B7' : '#065F46'
        };
      default:
        return { backgroundColor: surfaceColor, color: secondaryColor };
    }
  };

  // Örnek stok verileri
  const ornekStoklar: StokBilgisi[] = [
    {
      stokKodu: 'STK001',
      stokAdi: 'Laptop Dell Inspiron 15',
      seriNumarasi: 'DL2024001',
      miktari: 5,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 15,
      rafBakiyesi: 8
    },
    {
      stokKodu: 'STK002',
      stokAdi: 'Wireless Mouse Logitech',
      seriNumarasi: '',
      miktari: 10,
      seriTakibi: false,
      miktarKadarSerisi: false,
      depoBakiyesi: 50,
      rafBakiyesi: 25
    },
    {
      stokKodu: 'STK003',
      stokAdi: 'USB Kablo Type-C',
      seriNumarasi: 'USB2024001',
      miktari: 25,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 100,
      rafBakiyesi: 75
    },
    {
      stokKodu: 'STK003',
      stokAdi: 'USB Kablo Type-C',
      seriNumarasi: 'USB2024001',
      miktari: 25,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 100,
      rafBakiyesi: 75
    },
    {
      stokKodu: 'STK003',
      stokAdi: 'USB Kablo Type-C',
      seriNumarasi: 'USB2024001',
      miktari: 25,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 100,
      rafBakiyesi: 75
    },
    {
      stokKodu: 'STK003',
      stokAdi: 'USB Kablo Type-C',
      seriNumarasi: 'USB2024001',
      miktari: 25,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 100,
      rafBakiyesi: 75
    },
    {
      stokKodu: 'STK003',
      stokAdi: 'USB Kablo Type-C',
      seriNumarasi: 'USB2024001',
      miktari: 25,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 100,
      rafBakiyesi: 75
    },
    {
      stokKodu: 'STK003',
      stokAdi: 'USB Kablo Type-C',
      seriNumarasi: 'USB2024001',
      miktari: 25,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 100,
      rafBakiyesi: 75
    },
    {
      stokKodu: 'STK003',
      stokAdi: 'USB Kablo Type-C',
      seriNumarasi: 'USB2024001',
      miktari: 25,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 100,
      rafBakiyesi: 75
    },

  ];

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor, marginTop: 48 }}>
      {/* Header */}
      <View style={{ backgroundColor: surfaceColor, paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: borderColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
              <Ionicons name="document-text-outline" size={20} color={textColor} />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>{t('planliDepoTransferiDetayi')}</Text>

              <Text style={{ fontSize: 14, color: secondaryColor }}>{t('planliTransfer')} #{transfer.id}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={{ width: 32, height: 32, backgroundColor: notificationColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 16 }}>

        {/* Stok Bilgileri */}
        <View className="rounded-xl border p-4 mb-4" style={{ backgroundColor: cardColor, borderColor: borderColor }}>
          <View className="flex-row items-center mb-4">
            <Ionicons name="cube-outline" size={18} color={purpleBorderColor} />
            <Text className="text-base font-semibold ml-2" style={{ color: textColor }}>{t('stokBilgileri')}</Text>
          </View>

          {ornekStoklar.map((stok, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <View style={{
                backgroundColor: index % 2 === 0 ? borderColor : indigoColor,
                borderRadius: 8,
                padding: 16,
                gap: 8
              }}>
                {/* Stok Detayları */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('stokKodu')}:</Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.stokKodu}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('stokAdi')}:</Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.stokAdi}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('miktar')}:</Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.miktari}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: textColor }}>{t('seriNumarasi')}:</Text>
                    <Text style={{ fontSize: 12, fontWeight: '400', color: textColor }}>{stok.seriNumarasi}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', color: textColor }}>{t('seriTakibi')}:</Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 20,
                      backgroundColor: stok.seriTakibi ? greenColor : redColor
                    }}>
                      <Ionicons
                        name={stok.seriTakibi ? 'checkmark' : 'close'}
                        size={12}
                        color="white"
                      />
                      <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: 'white' }}>
                        {stok.seriTakibi ? t('evet') : t('hayir')}
                      </Text>
                    </View>
                  </View>

                  {/* Miktar Kadar Serisi */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', color: textColor }}>{t('miktarKadarSerisi')}:</Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 20,
                      backgroundColor: stok.miktarKadarSerisi ? greenColor : redColor
                    }}>
                      <Ionicons
                        name={stok.miktarKadarSerisi ? 'checkmark' : 'close'}
                        size={12}
                        color="white"
                      />
                      <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: 'white' }}>
                        {stok.miktarKadarSerisi ? t('evet') : t('hayir')}
                      </Text>
                    </View>
                  </View>

                  {/* Depo Bakiyesi */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', color: textColor }}>{t('depoBakiyesi')}:</Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 20,
                      backgroundColor: orangeColor
                    }}>
                      <Ionicons name="cube-outline" size={12} color="white" />
                      <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: 'white' }}>
                        {stok.depoBakiyesi} {t('adet')}
                      </Text>
                    </View>
                  </View>

                  {/* Raf Bakiyesi */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '600', color: textColor }}>{t('rafBakiyesi')}:</Text>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 20,
                      backgroundColor: purpleColor
                    }}>
                      <Ionicons name="library-outline" size={12} color="white" />
                      <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: 'white' }}>
                        {stok.rafBakiyesi} {t('adet')}
                      </Text>
                    </View>
                  </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PlanliDepoTransferiDetayBilgisi;