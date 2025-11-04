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

interface SevkiyatEmri {
  id: string;
  tarih: string;
  durum: 'Bekliyor' | 'Toplanıyor' | 'Tamamlandı';
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
  stoklar?: any[];
}

interface SevkiyatEmriDetayBilgisiProps {
  sevkiyat: SevkiyatEmri;
  onClose: () => void;
}

const SevkiyatEmriDetayBilgisi: React.FC<SevkiyatEmriDetayBilgisiProps> = ({
  sevkiyat,
  onClose
}) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
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

  const getStatusText = (durum: string) => {
    switch (durum) {
      case 'Bekliyor':
        return t('bekliyor');
      case 'Toplanıyor':
        return t('toplaniyor');
      case 'Tamamlandı':
        return t('tamamlandi');
      default:
        return durum;
    }
  };

  // Örnek stok verileri
  const stokBilgileri: StokBilgisi[] = [
    {
      stokKodu: "STK001",
      stokAdi: "Ürün A",
      seriNumarasi: "SN001",
      miktari: 10,
      seriTakibi: true,
      miktarKadarSerisi: true,
      depoBakiyesi: 50,
      rafBakiyesi: 25
    },
    {
      stokKodu: "STK002",
      stokAdi: "Ürün B",
      seriNumarasi: "SN002",
      miktari: 5,
      seriTakibi: false,
      miktarKadarSerisi: false,
      depoBakiyesi: 30,
      rafBakiyesi: 15
    },
    {
      stokKodu: "STK003",
      stokAdi: "Ürün C",
      seriNumarasi: "SN003",
      miktari: 8,
      seriTakibi: true,
      miktarKadarSerisi: false,
      depoBakiyesi: 40,
      rafBakiyesi: 20
    }
  ];

  return (
    <View className="flex-1 mt-12" style={{ backgroundColor: backgroundColor }}>
      {/* Header */}
      <View className="px-4 py-4" style={{ backgroundColor: cardColor, borderBottomWidth: 1, borderBottomColor: borderColor }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center mr-3">
              <Ionicons name="document-text-outline" size={20} color="#8B5CF6" />
            </View>
            <View>
              <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('sevkiyat-emri-detayi')}</Text>
              <Text className="text-sm" style={{ color: textColor }}>{t('sevkiyat-emri')} #{sevkiyat.id}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="w-8 h-8 rounded-lg items-center justify-center"
            style={{ backgroundColor: borderColor }}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={18} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
       <ScrollView className="flex-1 p-4 z-50">
        
         {/* Sevkiyat Emri Detayı */}
         <View className="rounded-xl border p-4 mb-4" style={{ backgroundColor: cardColor, borderColor: borderColor }}>
           <View className="flex-row items-center mb-4">
             <Ionicons name="document-text-outline" size={18} color="#8B5CF6" />
             <Text className="text-base font-semibold ml-2" style={{ color: textColor }}>{t('sevkiyat-emri-detayi')}</Text>
           </View>

           
           {/* Depo Bilgileri */}
           <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('cikis-depo')}:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.cikisDepoKodu} - {sevkiyat.cikisDepoAdi}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('karsi-depo')}:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.karsiDepoKodu} - {sevkiyat.karsiDepoAdi}
               </Text>
             </View>
           </View>

           {/* Cari ve Proje Bilgileri */}
           <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('cari')}:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.cariKodu} - {sevkiyat.cariAdi}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('proje')}:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.projeKodu} - {sevkiyat.projeAdi}
               </Text>
             </View>
           </View>

           {/* E-İrsaliye ve Belge Bilgileri */}
           <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('belge-seri-no')}:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.belgeSeriNo}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('e-irsaliye')}:
               </Text>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <Ionicons 
                   name={sevkiyat.eIrsaliye ? "checkmark-circle" : "close-circle"} 
                   size={16} 
                   color={sevkiyat.eIrsaliye ? "#10B981" : "#EF4444"} 
                 />
                 <Text style={{
                   fontSize: 14,
                   fontWeight: '500',
                   marginLeft: 4,
                   color: sevkiyat.eIrsaliye ? '#10B981' : '#EF4444'
                 }}>
                   {sevkiyat.eIrsaliye ? t('evet') : t('hayir')}
                 </Text>
               </View>
             </View>
           </View>

           {/* Açıklamalar */}
           <View style={{ marginBottom: 16 }}>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('aciklama')} 1:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.aciklama1}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('aciklama')} 2:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.aciklama2}
               </Text>
             </View>
             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('aciklama')} 3:
               </Text>
               <Text style={{ 
                 fontSize: 14, 
                 fontWeight: '500', 
                 color: textColor 
               }}>
                 {sevkiyat.aciklama3}
               </Text>
             </View>
           </View>
           
           {/* Durum ve Tarih */}
           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Text style={{ 
                 fontSize: 14, 
                 color: isDarkMode ? '#9CA3AF' : '#6B7280' 
               }}>
                 {t('durum')}:
               </Text>
               <View className={`px-2 py-1 rounded-full ml-2`} style={{ backgroundColor: colorYellow }}>
                 <Text className="text-xs font-medium" style={{ color: textColor }}>{getStatusText(sevkiyat.durum)}</Text>

               </View>
             </View>
             <Text style={{ 
               fontSize: 14, 
               color: isDarkMode ? '#9CA3AF' : '#6B7280' 
             }}>
               {sevkiyat.tarih}
             </Text>
           </View>
         </View>

         {/* Stok Bilgileri */}
         <View className="rounded-xl border p-4 mb-4" style={{ backgroundColor: cardColor, borderColor: borderColor }}>
           <View className="flex-row items-center mb-4">
             <Ionicons name="cube-outline" size={18} color="#8B5CF6" />
             <Text className="text-base font-semibold ml-2" style={{ color: textColor }}>{t('stok-bilgileri')}</Text>
           </View>
          
            {stokBilgileri.map((stok, index) => (
              <View key={index} style={{ marginBottom: 16 }}>
                {/* Stok Detayları */}
                <View style={{
                  backgroundColor: index % 2 === 0 
                    ? (isDarkMode ? '#374151' : '#F9FAFB') 
                    : (isDarkMode ? '#1E3A8A' : '#DBEAFE'),
                  borderRadius: 8,
                  padding: 12,
                  gap: 8
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('stok-kodu')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.stokKodu}
                    </Text>
                  </View>
                   
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('stok-adi')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.stokAdi}
                    </Text>
                  </View>
                   
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('miktar')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.miktari}
                    </Text>
                  </View>
                   
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('seri-numarasi')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.seriNumarasi}
                    </Text>
                  </View>
                   
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('seri-takibi')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.seriTakibi ? t('evet') : t('hayir')}
                    </Text>
                  </View>
                   
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('miktar-kadar-serisi')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.miktarKadarSerisi ? t('evet') : t('hayir')}
                    </Text>
                  </View>
                   
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('depo-bakiyesi')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.depoBakiyesi}
                    </Text>
                  </View>
                   
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ 
                      fontSize: 12, 
                      color: isDarkMode ? '#9CA3AF' : '#6B7280' 
                    }}>
                      {t('raf-bakiyesi')}:
                    </Text>
                    <Text style={{ 
                      fontSize: 12, 
                      fontWeight: '500', 
                      color: textColor 
                    }}>
                      {stok.rafBakiyesi}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
         </View>

       </ScrollView>
    </View>
  );
};

export default SevkiyatEmriDetayBilgisi;