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

interface SevkiyatKontrol {
  id: string;
  DepoKodu: string;
  DepoAdi: string;
  cariKodu: string;
  cariAdi: string;
  projeKodu: string;
  projeAdi: string;
  belgeSeriNo: string;
  durum: 'Bekliyor' | 'Kontrol Ediliyor' | 'Tamamlandı';
  tarih: string;
  stoklar: StokBilgisi[];
}

interface SevkiyatKontrolDetayBilgisiProps {
  kontrol: SevkiyatKontrol;
  onClose: () => void;
}

const SevkiyatKontrolDetayBilgisi: React.FC<SevkiyatKontrolDetayBilgisiProps> = ({ kontrol, onClose }) => {
  const { t } = useLanguage();
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

  const getStatusText = (durum: string) => {
    switch (durum) {
      case 'Bekliyor':
        return t('bekliyor');
      case 'Kontrol Ediliyor':
        return t('kontrol-ediliyor');
      case 'Tamamlandı':
        return t('tamamlandi');
      default:
        return durum;
    }
  };

  const getStatusColor = (durum: string) => {
    switch (durum) {
      case 'Bekliyor':
        return { backgroundColor: surfaceColor, color: warningColor };
      case 'Kontrol Ediliyor':
        return { backgroundColor: surfaceColor, color: primaryColor };
      case 'Tamamlandı':
        return { backgroundColor: surfaceColor, color: successColor };
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
      <View style={{ backgroundColor: surfaceColor, paddingHorizontal: 16, paddingVertical: 16, borderBottomColor: borderColor, borderBottomWidth: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 40, backgroundColor: surfaceColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Ionicons name="document-text-outline" size={20} color={primaryColor} />
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>{t('sevkiyat-kontrol-detayi')}</Text>
              <Text style={{ fontSize: 14, color: secondaryColor }}>{t('kontrol')} #{kontrol.id}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={{ width: 32, height: 32, backgroundColor: errorColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
       
        {/* Stok Bilgileri */}
        <View style={{ backgroundColor: cardColor, borderRadius: 12, borderColor: borderColor, borderWidth: 1, padding: 16, marginBottom: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="cube-outline" size={18} color={primaryColor} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: textColor, marginLeft: 8 }}>{t('stok-bilgileri')}</Text>
          </View>
          
          {ornekStoklar.map((stok, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
             

              {/* Stok Detayları */}
               <View style={{ backgroundColor: index % 2 === 0 ? surfaceColor : surfaceColor, borderRadius: 8, padding: 12 }}>
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('stok-kodu')}:</Text>
                   <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.stokKodu}</Text>
                 </View>
                 
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('stok-adi')}:</Text>
                   <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.stokAdi}</Text>
                 </View>
                 
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('miktar')}:</Text>
                   <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.miktari}</Text>
                 </View>
                 
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('seri-numarasi')}:</Text>
                   <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{stok.seriNumarasi}</Text>
                 </View>
                 
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('seri-takibi')}:</Text>
                   <View style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     paddingHorizontal: 8,
                     paddingVertical: 4,
                     borderRadius: 16,
                     backgroundColor: stok.seriTakibi ? surfaceColor : surfaceColor
                   }}>
                     <Ionicons 
                       name={stok.seriTakibi ? 'checkmark-circle' : 'close-circle'} 
                       size={12} 
                       color={stok.seriTakibi ? successColor : errorColor} 
                     />
                     <Text style={{
                       fontSize: 12,
                       fontWeight: '500',
                       marginLeft: 4,
                       color: stok.seriTakibi ? successColor : errorColor
                     }}>
                       {stok.seriTakibi ? t('evet') : t('hayir')}
                     </Text>
                   </View>
                 </View>

                {/* Miktar Kadar Serisi */}
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('miktar-kadar-serisi')}:</Text>
                   <View style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     paddingHorizontal: 8,
                     paddingVertical: 4,
                     borderRadius: 16,
                     backgroundColor: stok.miktarKadarSerisi ? surfaceColor : surfaceColor
                   }}>
                     <Ionicons 
                       name={stok.miktarKadarSerisi ? 'checkmark-circle' : 'close-circle'} 
                       size={12} 
                       color={stok.miktarKadarSerisi ? successColor : errorColor} 
                     />
                     <Text style={{
                       fontSize: 12,
                       fontWeight: '500',
                       marginLeft: 4,
                       color: stok.miktarKadarSerisi ? successColor : errorColor
                     }}>
                       {stok.miktarKadarSerisi ? t('evet') : t('hayir')}
                     </Text>
                   </View>
                 </View>

                 {/* Depo Bakiyesi */}
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('depo-bakiyesi')}:</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, backgroundColor: surfaceColor }}>
                     <Ionicons name="cube-outline" size={12} color={warningColor} />
                     <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: warningColor }}>
                       {stok.depoBakiyesi} {t('adet')}
                     </Text>
                   </View>
                 </View>

                 {/* Raf Bakiyesi */}
                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                   <Text style={{ fontSize: 12, color: secondaryColor }}>{t('raf-bakiyesi')}:</Text>
                   <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, backgroundColor: surfaceColor }}>
                     <Ionicons name="library-outline" size={12} color={primaryColor} />
                     <Text style={{ fontSize: 12, fontWeight: '500', marginLeft: 4, color: primaryColor }}>
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

export default SevkiyatKontrolDetayBilgisi;