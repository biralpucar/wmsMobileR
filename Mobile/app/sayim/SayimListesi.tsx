import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../hooks/useLanguage';
import { useThemeColor } from '../../hooks/useThemeColor';

interface SayimBilgisi {
  id: string;
  tarih: string;
  depoKodu: string;
  depoAdi: string;
  rafKodu: string;
  rafAdi: string;
  stokKodu: string;
  aciklama: string;
}

interface SayimListesiProps {
  selectedDepo: string;
  onSayimBaslat: (sayim: SayimBilgisi) => void;
}

const SayimListesi: React.FC<SayimListesiProps> = ({ selectedDepo, onSayimBaslat }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>('1');
  const { t } = useLanguage();
  const { theme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
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
  // Örnek sayım verileri
  const [sayimlar] = useState<SayimBilgisi[]>([
    {
      id: '1',
      tarih: '2024-01-15',
      depoKodu: 'D001',
      depoAdi: 'Ana Depo',
      rafKodu: 'R001',
      rafAdi: 'A Rafı',
      stokKodu: 'STK001',
      aciklama: 'Aylık sayım işlemi'
    },
    {
      id: '2',
      tarih: '2024-01-16',
      depoKodu: 'D002',
      depoAdi: 'Yedek Depo',
      rafKodu: 'R002',
      rafAdi: 'B Rafı',
      stokKodu: 'STK002',
      aciklama: 'Özel sayım kontrolü'
    },
    {
      id: '3',
      tarih: '2024-01-17',
      depoKodu: 'D001',
      depoAdi: 'Ana Depo',
      rafKodu: 'R003',
      rafAdi: 'C Rafı',
      stokKodu: 'STK003',
      aciklama: 'Haftalık rutin sayım'
    }
  ]);

  const handleBaslat = (sayim: SayimBilgisi) => {
    onSayimBaslat(sayim);
  };

  const toggleExpanded = (id: string) => {
    setExpandedItem(prev => prev === id ? null : id);
  };

  return (
    <>
      {/* Genel Sayım Bilgileri Container */}
      <View className="rounded-xl shadow-sm p-4 mb-6" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
        {/* Başlık */}
        <View className="flex-row items-center mb-6">
          <Ionicons name="calculator-outline" size={24} color={textColor} />
          <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('sayimListesi')}</Text>
        </View>
        <View className="space-y-4">
          {sayimlar.map((sayim) => (
            <View key={sayim.id} className="rounded-lg mb-2" style={{ borderColor, borderWidth: 1 }}>
              {/* Sayım Başlığı - Tıklanabilir */}
              <TouchableOpacity
                className="rounded-t-lg p-4 flex-row items-center justify-between"
                style={{ backgroundColor: parseInt(sayim.id) % 2 === 1 ? grayColor : blueColor }}
                onPress={() => toggleExpanded(sayim.id)}
                activeOpacity={0.7}
              >
                <View className="flex-1">
                  <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('sayim')} #{sayim.id}</Text>
                  <Text className="text-sm mt-1" style={{ color: textColor, opacity: 0.7 }}>{sayim.tarih} - {sayim.depoAdi}</Text>
                </View>
                <Ionicons
                  name={expandedItem === sayim.id ? "chevron-up-outline" : "chevron-down-outline"}
                  size={20}
                  color={textColor}
                />
              </TouchableOpacity>

              {/* Sayım Detayları - Açılıp Kapanan */}
              {expandedItem === sayim.id && (
                <View className="rounded-b-lg p-4" style={{ backgroundColor: cardColor, borderTopColor: borderColor, borderTopWidth: 1 }}>
                  <Text className="text-lg font-semibold mb-3" style={{ color: textColor }}>{t('sayimBilgileri')}</Text>
                  <View className="space-y-3">
                    <View className="rounded-lg p-3 flex-row items-center" style={{ backgroundColor: grayColor }}>
                      <View className="w-8 h-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
                        <Ionicons name="calendar-outline" size={16} color={textColor} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('tarih')}</Text>
                        <Text className="text-base font-medium" style={{ color: textColor }}>{sayim.tarih}</Text>
                      </View>
                    </View>

                    <View className="rounded-lg p-3 flex-row items-center" style={{ backgroundColor: backgroundColor }}>
                      <View className="w-8 h-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: greenColor }}>

                        <Ionicons name="business-outline" size={16} color={textColor} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('depo')}</Text>
                        <Text className="text-base font-medium" style={{ color: textColor }}>{sayim.depoKodu} - {sayim.depoAdi}</Text>
                      </View>
                    </View>

                    <View className="rounded-lg p-3 flex-row items-center" style={{ backgroundColor: grayColor }}>
                      <View className="w-8 h-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: purpleColor }}>
                        <Ionicons name="grid-outline" size={16} color={textColor} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('raf')}</Text>
                        <Text className="text-base font-medium" style={{ color: textColor }}>{sayim.rafKodu} - {sayim.rafAdi}</Text>
                      </View>
                    </View>

                    <View className="rounded-lg p-3 flex-row items-center" style={{ backgroundColor: backgroundColor }}>
                      <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: orangeColor }}>
                        <Ionicons name="cube-outline" size={16} color={textColor} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('stokKodu')}</Text>
                        <Text className="text-base font-medium" style={{ color: textColor }}>{sayim.stokKodu}</Text>
                      </View>
                    </View>

                    <View className="rounded-lg p-3 flex-row items-center" style={{ backgroundColor: grayColor }}>
                      <View className="w-8 h-8 bg-red-100 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: redColor }}>

                        <Ionicons name="document-text-outline" size={16} color={textColor} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>{t('aciklama')}</Text>
                        <Text className="text-base font-medium" style={{ color: textColor }}>{sayim.aciklama}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Başlat Butonu */}
                  <TouchableOpacity
                    className="rounded-lg py-3 px-4 flex-row items-center justify-center mt-4"
                    style={{ backgroundColor: greenColor }}
                    onPress={() => handleBaslat(sayim)}
                    activeOpacity={0.8}
                  >
                    <Text className="font-semibold mr-2" style={{ color: textColor }}>{t('baslat')}</Text>
                    <Ionicons name="play-outline" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default SayimListesi;