import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../../../hooks/useLanguage';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface AmbarGirisSiparsiBaglantisizFormProps {
  formData: {
    selectedDepo?: string;
    hucreTuru?: string;
    cikisYeri?: string;
    projeKodu?: string;
    aciklama1?: string;
    aciklama2?: string;
    aciklamaText?: string;
    siparisBaglantili?: boolean;
  } | null;
  onBack: () => void;
  onComplete: (data: any) => void;
}

const AmbarGirisSiparsiBaglantisizForm: React.FC<AmbarGirisSiparsiBaglantisizFormProps> = ({ formData, onBack, onComplete }) => {
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
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowColor = useThemeColor({}, 'yellow');
  const greenColor = useThemeColor({}, 'green');
  const blueColor = useThemeColor({}, 'blue');
  const indigoColor = useThemeColor({}, 'indigo');
  const purpleColor = useThemeColor({}, 'purple');
  const pinkColor = useThemeColor({}, 'pink');
  const grayColor = useThemeColor({}, 'gray');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');


  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: backgroundColor }}
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View >
        {/* General Container */}
        <View style={{ backgroundColor: cardColor, borderColor: blueBorderColor, borderWidth: 2, borderRadius: 12, padding: 24, shadowOpacity: 0.1 }}>
           {/* Başlık */}
          <View className="flex-row items-center mb-6">
            <Ionicons name="unlink" size={24} color={textColor} />
            <Text className="text-xl font-bold ml-2" style={{ color: textColor }}>{t('siparisBaglantisizAmbarGirisForm')}</Text>
          </View>

          {/* Kamera OCR Butonu */}
          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: cardColor,
                borderRadius: 12,
                padding: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
                borderWidth: 1,
                borderColor: greenBorderColor,
                flexDirection: 'row',
                alignItems: 'center'
              }}
              activeOpacity={0.7}
              onPress={() => console.log('Kamera OCR pressed')}
            >
              <View style={{width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12,}}>
                <Ionicons name="barcode-sharp" size={20} color={greenBorderColor}/>
              </View>
              <Text style={{color: textColor, fontWeight: '500', fontSize: 14}}>{t('barkodOkut')}</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content Container */}
          <View style={{ backgroundColor: surfaceColor, borderColor: greenBorderColor, borderWidth: 1, borderRadius: 12, padding: 16 }}>
            {/* Okutulan Ürünler */}
            <View className="mb-6">
              <Text style={{ color: textColor, fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
                {t('okutulanUrunler')}
              </Text>
              <View style={{ backgroundColor: cardColor, borderRadius: 8, padding: 16 }}>
                <Text style={{ color: secondaryColor, textAlign: 'center' }}>
                  {t('buBolumHenuzGelistirilmeAsamasindadir')}
                </Text>
                <Text style={{ color: secondaryColor, textAlign: 'center', fontSize: 14, marginTop: 8 }}>
                  {t('urunSecimiVeMiktarBelirlemeBuradaYapilacak')}
                </Text>
              </View>
            </View>
          </View>
          {/* Action Buttons */}
          <View className="flex-row justify-center mt-6">
            <TouchableOpacity
              style={{ width: 128, borderRadius: 12, paddingVertical: 16, alignItems: 'center', borderColor: borderColor, borderWidth: 1, backgroundColor: cardColor, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 4 }}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
              <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('geri')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: 128, borderRadius: 12, paddingVertical: 16, alignItems: 'center', shadowOpacity: 0.2, flexDirection: 'row', justifyContent: 'center', marginHorizontal: 4, backgroundColor: greenColor }}
              onPress={() => onComplete({})}
              activeOpacity={0.8}
            >
              <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('tamamla')}</Text>
              <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AmbarGirisSiparsiBaglantisizForm;