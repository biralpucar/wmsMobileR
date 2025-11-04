import { useLanguage } from '@/hooks/useLanguage';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeColor } from '../../../hooks/useThemeColor';

interface DepoTransferiForm2Props {
  formData?: {
    selectedDepo?: string;
    karsiDepo?: string;
    selectedCari?: string;
    selectedProje?: string;
    selectedBelgeSeriNo?: string;
    eIrsaliye?: boolean;
    aciklama1?: string;
    aciklama2?: string;
    aciklama3?: string;
  } | null;
  onBack?: () => void;
  onComplete?: (data: any) => void;
}

const DepoTransferiForm2: React.FC<DepoTransferiForm2Props> = ({ formData, onBack, onComplete }) => {
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
  const grayColor = useThemeColor({}, 'gray');
  const redBorderColor = useThemeColor({}, 'redBorder');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');
  const cyanBorderColor = useThemeColor({}, 'cyanBorder');
  const [stokKodu, setStokKodu] = useState('');
  const [miktar, setMiktar] = useState('');
  const [birim, setBirim] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);

    // Simulated processing time
    setTimeout(() => {
      setIsLoading(false);

      if (onComplete) {
        onComplete({ ...formData, completed: true });
      }
    }, 2000); // 2 saniye loading göster
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <StatusBar style="auto" />

      {/* Content */}
      <ScrollView style={{ flex: 1 }}>
        {/* Depo Transfer İşlemleri */}
        <View style={{ backgroundColor: cardColor, borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 2, borderColor: blueBorderColor }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <FontAwesome6 name="truck-ramp-box" size={24} color={textColor} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('depoTransferIslemleri')}</Text>
          </View>

          {/* Form Özeti */}
          {formData && (
            <View style={{backgroundColor: surfaceColor,borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: greenBorderColor}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16}}
                onPress={() => setIsCollapsed(!isCollapsed)}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 18, fontWeight: '600', color: textColor }}>
                  {t('transferOzeti')}
                </Text>
                <Ionicons
                  name={isCollapsed ? "chevron-down" : "chevron-up"}
                  size={20}
                  color={textColor}
                />
              </TouchableOpacity>

              {!isCollapsed && (
                <View style={{ gap: 12 }}>
                  {formData.selectedDepo && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                      <Text style={{ color: textColor, fontWeight: '600' }}>{t('kaynakDepo')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.selectedDepo}</Text>
                    </View>
                  )}
                  {formData.karsiDepo && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                      <Text style={{ color: textColor, fontWeight: '600' }}>{t('hedefDepo')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.karsiDepo}</Text>
                    </View>
                  )}
                  {formData.selectedCari && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                      <Text style={{ color: textColor, fontWeight: '600' }}>{t('cari')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.selectedCari}</Text>
                    </View>
                  )}
                  {formData.selectedProje && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                      <Text style={{ color: textColor, fontWeight: '600' }}>{t('proje')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.selectedProje}</Text>
                    </View>
                  )}
                  {formData.selectedBelgeSeriNo && (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                      <Text style={{ color: textColor, fontWeight: '600' }}>{t('belgeSeriNo')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.selectedBelgeSeriNo}</Text>
                    </View>
                  )}
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                    <Text style={{ color: textColor, fontWeight: '600' }}>{t('eIrsaliye')}:</Text>
                    <Text style={{ color: textColor, fontWeight: '400' }}>{formData.eIrsaliye ? t('evet') : t('hayir')}</Text>
                  </View>
                  {formData.aciklama1 && (
                    <View style={{paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                      <Text style={{ color: textColor, fontWeight: '600', marginBottom: 4 }}>{t('aciklama1')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.aciklama1}</Text>
                    </View>
                  )}
                  {formData.aciklama2 && (
                    <View style={{paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: greenBorderColor}}>
                      <Text style={{ color: textColor, fontWeight: '600', marginBottom: 4 }}>{t('aciklama2')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.aciklama2}</Text>
                    </View>
                  )}
                  {formData.aciklama3 && (
                    <View style={{ paddingVertical: 8 }}>
                      <Text style={{ color: textColor, fontWeight: '600', marginBottom: 4 }}>{t('aciklama3')}:</Text>
                      <Text style={{ color: textColor, fontWeight: '400' }}>{formData.aciklama3}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}

          {/* Ürün Listesi Bölümü */}
          {/* Kamera OCR Butonu */}
          <View style={{ marginBottom: 16 }}>
            <TouchableOpacity
              style={{flex: 1, backgroundColor: surfaceColor, borderRadius: 12, padding: 8, borderWidth: 1, borderColor: greenBorderColor, flexDirection: 'row', alignItems: 'center'}}
              activeOpacity={0.7}
              onPress={() => console.log('Kamera OCR pressed')}
            >
              <View style={{width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12,}}>
                <Ionicons name="barcode-sharp" size={20} color={greenBorderColor}/>
              </View>
              <Text style={{ color: textColor, fontWeight: '500', fontSize: 14 }}>{t('barkodOkut')}</Text>
            </TouchableOpacity>
          </View>

          <View style={{backgroundColor: surfaceColor, borderRadius: 12, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: yellowBorderColor}}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: textColor, marginBottom: 16 }}>
              {t('transferEdilecekUrunler')}
            </Text>
            <View style={{ backgroundColor: cardColor, borderRadius: 8, padding: 16 }}>
              <Text style={{ color: secondaryColor, textAlign: 'center' }}>
                {t('bolumHenuzGelistirilmeAsamasinda')}
              </Text>
              <Text style={{ color: secondaryColor, textAlign: 'center', fontSize: 14, marginTop: 8 }}>
                {t('urunSecimiVeMiktarBelirlemeBuradaYapilacak')}
              </Text>
            </View>
          </View>

          {/* Aksiyon Butonları */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
            {onBack && (
              <TouchableOpacity
                style={{
                  width: 128,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: borderColor,
                  backgroundColor: cardColor,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginHorizontal: 4
                }}
                onPress={onBack}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
                <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{t('back')}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                width: 128,
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                marginHorizontal: 4,
                backgroundColor: isLoading ? '#9CA3AF' : greenColor
              }}
              onPress={handleComplete}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <>
                  <View style={{
                    width: 20,
                    height: 20,
                    borderWidth: 2,
                    borderColor: 'white',
                    borderTopColor: 'transparent',
                    borderRadius: 10,
                    marginRight: 12
                  }} />
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{t('processing')}</Text>
                </>
              ) : (
                <>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{t('tamamla')}</Text>
                  <Ionicons name="checkmark" size={20} color="white" style={{ marginLeft: 8 }} />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DepoTransferiForm2;