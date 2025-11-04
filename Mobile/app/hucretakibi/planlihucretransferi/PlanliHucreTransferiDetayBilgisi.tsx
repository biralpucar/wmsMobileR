import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLanguage } from '@/hooks/useLanguage';
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
  stoklar: StokBilgisi[];
}

interface PlanliHucreTransferiDetayBilgisiProps {
  hucreTransferi: PlanliHucreTransferi;
  onClose: () => void;
}

const PlanliHucreTransferiDetayBilgisi: React.FC<PlanliHucreTransferiDetayBilgisiProps> = ({
  hucreTransferi,
  onClose
}) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const notificationColor = useThemeColor({}, 'notification');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const colorYellow = useThemeColor({}, 'yellow');
  const colorRed = useThemeColor({}, 'red');
  const colorGreen = useThemeColor({}, 'green');
  const colorBlue = useThemeColor({}, 'blue');
  const colorIndigo = useThemeColor({}, 'indigo');
  const colorPurple = useThemeColor({}, 'purple');
  const colorPink = useThemeColor({}, 'pink');
  const colorOrange = useThemeColor({}, 'orange');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const isDarkMode = theme === 'dark';
  const primaryColor = useThemeColor({}, 'tint');
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

  // Örnek stok verileri
  const stokListesi: StokBilgisi[] = [
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
    <View className="flex-1 mt-12" style={{ backgroundColor: backgroundColor }}>
      {/* Header */}
      <View className="px-4 py-4" style={{ backgroundColor: cardColor, borderBottomWidth: 1, borderBottomColor: borderColor }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: colorBlue }}>
              <Ionicons name="document-text-outline" size={20} color={textColor} />
            </View>
            <View>
              <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('hucreTransferiDetayi')}</Text>
              <Text className="text-sm" style={{ color: textColor }}>{t('hucreTransferi')} #{hucreTransferi.id}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="w-8 h-8 rounded-lg items-center justify-center"
            style={{ backgroundColor: notificationColor }}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 p-4 z-50">

        {/* Hücre Transferi Detayı */}
        {/* <View className="rounded-xl border p-4 mb-4" style={{ backgroundColor: cardColor, borderColor: borderColor }}>
           <View className="flex-row items-center mb-4">
             <Ionicons name="swap-horizontal-outline" size={18} color="#8B5CF6" />
             <Text className="text-base font-semibold ml-2" style={{ color: textColor }}>Hücre Transferi Detayı</Text>
           </View> */}

        {/* Depo Bilgileri */}
        {/* <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Çıkış Depo:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.cikisDepoKodu} - {hucreTransferi.cikisDepoAdi}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Karşı Depo:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.karsiDepoKodu} - {hucreTransferi.karsiDepoAdi}
               </Text>
             </View>
           </View> */}

        {/* Cari ve Proje Bilgileri */}
        {/* <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Cari:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.cariKodu} - {hucreTransferi.cariAdi}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Proje:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.projeKodu} - {hucreTransferi.projeAdi}
               </Text>
             </View>
           </View> */}

        {/* E-İrsaliye ve Belge Bilgileri */}
        {/* <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Belge Seri No:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.belgeSeriNo}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 E-İrsaliye:
               </Text>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <Ionicons 
                   name={hucreTransferi.eIrsaliye ? "checkmark-circle" : "close-circle"} 
                   size={16} 
                   color={hucreTransferi.eIrsaliye ? "#10B981" : "#EF4444"} 
                 />
                 <Text style={{
                   fontSize: 14,
                   fontWeight: '500',
                   marginLeft: 4,
                   color: hucreTransferi.eIrsaliye ? '#10B981' : '#EF4444'
                 }}>
                   {hucreTransferi.eIrsaliye ? 'Evet' : 'Hayır'}
                 </Text>
               </View>
             </View>
           </View> */}

        {/* Açıklamalar */}
        {/* <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Açıklama 1:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.aciklama1}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Açıklama 2:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.aciklama2}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Açıklama 3:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {hucreTransferi.aciklama3}
               </Text>
             </View>
           </View> */}

        {/* Durum ve Tarih */}
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 Durum:
               </Text>
               <View className={`px-2 py-1 rounded-full ml-2`} style={{ backgroundColor: colorYellow }}>
                 <Text className="text-xs font-medium" style={{ color: textColor }}>{hucreTransferi.durum}</Text>

               </View>
             </View>
             <Text style={{ 
               fontSize: 14, 
               color: isDarkMode ? '#9CA3AF' : '#6B7280' 
             }}>
               {hucreTransferi.tarih}
             </Text>
           </View>
         </View> */}

        {/* Stok Bilgileri */}
        <View className="rounded-xl border p-4 mb-4" style={{ backgroundColor: cardColor, borderColor: borderColor }}>
          <View className="flex-row items-center mb-4">
            <Ionicons name="cube-outline" size={18} color={purpleBorderColor} />
            <Text className="text-base font-semibold ml-2" style={{ color: textColor }}>{t('stokBilgileri')}</Text>
          </View>

          {stokListesi.map((stok, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              {/* Stok Detayları */}
              <View style={{
                backgroundColor: index % 2 === 0 ? borderColor : colorIndigo,
                borderRadius: 8,
                padding: 16,
                gap: 8
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('stokKodu')}:</Text>
                  <Text style={{fontSize: 12, fontWeight: '400', color: textColor}}> {stok.stokKodu} </Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('stokAdi')}:</Text>
                  <Text style={{fontSize: 12, fontWeight: '400', color: textColor}}>{stok.stokAdi}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('miktar')}:</Text>
                  <Text style={{fontSize: 12, fontWeight: '400', color: textColor}}>{stok.miktari}</Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('seriNumarasi')}:</Text>
                  <Text style={{fontSize: 12, fontWeight: '400', color: textColor}}>{stok.seriNumarasi}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, fontWeight: '600', color: textColor}}>{t('seriTakibi')}:</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 16,
                    backgroundColor: stok.seriTakibi ? colorGreen : colorRed
                  }}>
                    <Ionicons
                      name={stok.seriTakibi ? 'checkmark' : 'close'}
                      size={12}
                      color={textColor}
                    />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '500',
                      marginLeft: 4,
                      color: textColor
                    }}>
                      {stok.seriTakibi ? t('evet') : t('hayir')}
                    </Text>
                  </View>
                </View>

                {/* Miktar Kadar Serisi */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('miktarKadarSerisi')}:</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 16,
                    backgroundColor: stok.seriTakibi ? colorGreen : colorRed
                  }}>
                    <Ionicons
                      name={stok.miktarKadarSerisi ? 'checkmark' : 'close'}
                      size={12}
                      color={textColor}

                    />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '500',
                      marginLeft: 4,
                      color: textColor
                    }}>
                      {stok.miktarKadarSerisi ? t('evet') : t('hayir')}
                    </Text>
                  </View>
                </View>

                {/* Depo Bakiyesi */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>
                    {t('depoBakiyesi')}:
                  </Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 16,
                    backgroundColor: colorOrange
                  }}>
                    <Ionicons name="cube-outline" size={12} color={textColor} />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '500',
                      marginLeft: 4,
                      color: textColor
                    }}>
                      {stok.depoBakiyesi} {t('adet')}
                    </Text>
                  </View>
                </View>

                {/* Raf Bakiyesi */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{fontSize: 12, fontWeight: '600', color: textColor}}>{t('rafBakiyesi')}:</Text>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 16,
                    backgroundColor: colorPurple
                  }}>
                    <Ionicons name="library-outline" size={12} color={textColor} />
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '500',
                      marginLeft: 4,
                      color: textColor
                    }}>
                      {stok.rafBakiyesi} {t('adet')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Geri Butonu */}
        <View className="mt-6">
          <TouchableOpacity
            className="rounded-xl py-4 items-center"
            style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text className="font-semibold" style={{ color: textColor }}>{t('geriDon')}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default PlanliHucreTransferiDetayBilgisi;