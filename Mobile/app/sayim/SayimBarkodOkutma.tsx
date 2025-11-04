import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
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

interface SayimBarkodOkutmaProps {
  sayim: SayimBilgisi;
  selectedDepo: string;
  onBack: () => void;
}

const SayimBarkodOkutma: React.FC<SayimBarkodOkutmaProps> = ({ sayim, selectedDepo, onBack }) => {
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
  const handleBack = () => {
    onBack();
  };

  const handleComplete = () => {
    // Sayım tamamlama işlemi
    console.log('Sayım tamamlandı:', sayim);
    onBack();
  };

  return (
    <View className="flex-1 p-4 rounded-xl" style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2 }}>
      {/* Başlık */}
      <View className="flex-row items-center mb-6">
        <Ionicons name="calculator-outline" size={24} color={textColor} />
        <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('sayimBaslat')}</Text>
      </View>
      {/* Sayım Özeti */}
      <View className="rounded-xl p-4 mb-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor:greenBorderColor, borderWidth: 1 }}>
        <View className='flex-row'>
          <Ionicons name="document-text-outline" className='mr-2' size={24} color={textColor} />
          <Text className="text-lg font-semibold mb-4" style={{ color: textColor }}>
            {t('sayimOzeti')}
          </Text>
        </View>
        <View className="space-y-3">
          <View className="flex-row justify-between py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
            <Text style={{ color: textColor, opacity: 0.7 }}>{t('tarih')}:</Text>
            <Text className="font-medium" style={{ color: textColor }}>{sayim.tarih}</Text>
          </View>

          <View className="flex-row justify-between py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
            <Text style={{ color: textColor, opacity: 0.7 }}>{t('depo')}:</Text>
            <Text className="font-medium" style={{ color: textColor }}>{sayim.depoKodu} - {sayim.depoAdi}</Text>
          </View>

          <View className="flex-row justify-between py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
            <Text style={{ color: textColor, opacity: 0.7 }}>{t('raf')}:</Text>
            <Text className="font-medium" style={{ color: textColor }}>{sayim.rafKodu} - {sayim.rafAdi}</Text>
          </View>

          <View className="flex-row justify-between py-2" style={{ borderBottomColor: greenBorderColor, borderBottomWidth: 1 }}>
            <Text style={{ color: textColor, opacity: 0.7 }}>{t('stokKodu')}:</Text>
            <Text className="font-medium" style={{ color: textColor }}>{sayim.stokKodu}</Text>
          </View>

          <View className="py-2">
            <Text className="mb-1" style={{ color: textColor, opacity: 0.7 }}>{t('aciklama')}:</Text>
            <Text style={{ color: textColor }}>{sayim.aciklama}</Text>
          </View>
        </View>
      </View>

      {/* Barkod Okutma Bölümü */}
      {/* Kamera OCR Butonu */}
      <View className="mb-4">
        <TouchableOpacity
          className="flex-1 rounded-xl p-2 shadow-sm flex-row items-center"
          style={{ backgroundColor: cardColor, borderColor:greenBorderColor, borderWidth: 1 }}
          activeOpacity={0.7}
          onPress={() => console.log('Kamera OCR pressed')}
        >
          <View className="w-8 h-8 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: greenColor }}>

            <Ionicons name="camera" size={16} color={textColor} />
          </View>
          <Text className="font-medium text-sm" style={{ color: textColor }}>{t('barkodOkut')}</Text>
        </TouchableOpacity>
      </View>

      <View className="rounded-xl p-4 mb-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor:yellowBorderColor, borderWidth: 1 }}>
        <Text className="text-lg font-semibold mb-4" style={{ color: textColor }}>
          {t('sayimEdilecekUrunler')}
        </Text>
        <View className="rounded-lg p-4" style={{ backgroundColor: grayColor }}>
          <Text className="text-center" style={{ color: textColor, opacity: 0.7 }}>
            {t('buBolumHenuzGelistirilmeAsamasindadir')}
          </Text>
          <Text className="text-center text-sm mt-2" style={{ color: textColor, opacity: 0.5 }}>
            {t('urunSecimiVeMiktarBelirlemeBuradaYapilacak')}
          </Text>
        </View>
      </View>

      {/* Aksiyon Butonları */}
      <View className="flex-row justify-center space-x-4">
        {/* Geri Butonu */}
        <TouchableOpacity
          className="flex-1 rounded-xl py-4 items-center flex-row justify-center mx-1"
          style={{ backgroundColor: cardColor, borderColor, borderWidth: 1 }}
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={16} color={textColor} style={{ marginRight: 6 }} />
          <Text className="text-base font-semibold" style={{ color: textColor }}>{t('geri')}</Text>
        </TouchableOpacity>

        {/* Tamamla Butonu */}
        <TouchableOpacity
          className="flex-1 rounded-xl py-4 items-center shadow-lg flex-row justify-center mx-1 bg-green-500"
          style={{ backgroundColor:greenColor}}

          onPress={handleComplete}
          activeOpacity={0.8}
        >
          <Text className="text-base font-semibold" style={{ color: textColor }}>{t('tamamla')}</Text>

          <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SayimBarkodOkutma;