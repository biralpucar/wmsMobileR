import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../../hooks/useLanguage';
import { useThemeColor } from '../../../hooks/useThemeColor';

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
  stoklar: StokBilgisi[];
}

interface PlanliAmbarCikisDetayBilgisiProps {
  ambarCikis: PlanliAmbarCikis;
  onClose: () => void;
}

const PlanliAmbarCikisDetayBilgisi: React.FC<PlanliAmbarCikisDetayBilgisiProps> = ({ ambarCikis, onClose }) => {
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
  const getStatusColor = (durum: string) => {
    switch (durum) {
      case 'Bekliyor':
        return { backgroundColor: yellowColor, color: 'white' };
      case 'Toplanıyor':
        return { backgroundColor: blueColor, color: 'white' };
      case 'Tamamlandı':
        return { backgroundColor: greenColor, color: 'white' };
      default:
        return { backgroundColor: surfaceColor, color: textColor };
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

  ];

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor, marginTop: 48 }}>
      {/* Header */}
      <View style={{ backgroundColor: surfaceColor, paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: borderColor }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 40, backgroundColor: cardColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Ionicons name="document-text-outline" size={20} color={primaryColor} />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>{t('ambarCikisDetayi')}</Text>
              <Text style={{ fontSize: 14, color: secondaryColor }}>Ambar Çıkış #{ambarCikis.id}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={{ width: 32, height: 32, backgroundColor: redColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 16 }}>

        {/* Stok Bilgileri */}
        <View style={{ backgroundColor: cardColor, borderRadius: 12, borderWidth: 1, borderColor: borderColor, padding: 16, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="cube-outline" size={18} color={primaryColor} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginLeft: 8 }}>{t('stokBilgileri')}</Text>
          </View>

          {ornekStoklar.map((stok, index) => (
            <View key={index} style={{
              backgroundColor: index % 2 === 0 ? surfaceColor : blueColor,
              borderRadius: 8,
              padding: 12,
              gap: 8
            }}>
              {/* Stok Detayları */}
              <View style={{borderRadius: 8, padding: 12, gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('stokKodu')}:</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.stokKodu}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('stokAdi')}:</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.stokAdi}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('miktar')}:</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.miktari}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('seriNumarasi')}:</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.seriNumarasi}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('seriTakibi')}:</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 20,
                    backgroundColor: stok.seriTakibi ? greenColor : redColor
                  }}>
                    <Ionicons
                      name={stok.seriTakibi ? 'checkmark-circle' : 'close-circle'}
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
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('miktarKadarSerisi')}:</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 20,
                    backgroundColor: stok.miktarKadarSerisi ? greenColor : redColor
                  }}>
                    <Ionicons
                      name={stok.miktarKadarSerisi ? 'checkmark-circle' : 'close-circle'}
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
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('depoBakiyesi')}:</Text>
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
                  <Text style={{ fontSize: 12, color: secondaryColor }}>{t('rafBakiyesi')}:</Text>
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

export default PlanliAmbarCikisDetayBilgisi;