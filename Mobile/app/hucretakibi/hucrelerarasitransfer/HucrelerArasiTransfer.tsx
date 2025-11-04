import CustomDropdown from '@/components/CustomDropdown';
import CustomHeader from '@/components/CustomHeader';
import CustomInfoCard from '@/components/CustomInfoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLanguage } from '@/hooks/useLanguage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HucrelerArasiTransfer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDepo } = route.params as { selectedDepo?: string } || {};
  const { theme } = useTheme();
  const { t } = useLanguage();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const [girisHucre, setGirisHucre] = useState<string>('');
  const [cikisHucre, setCikisHucre] = useState<string>('');
  const [secilenStok, setSecilenStok] = useState<string>('');
  const colorRed = useThemeColor({}, 'red');
  const colorGreen = useThemeColor({}, 'green');
  const colorBlue = useThemeColor({}, 'blue');
  const colorOrange = useThemeColor({}, 'orange');
  const colorYellow = useThemeColor({}, 'yellow');
  const colorPurple = useThemeColor({}, 'purple');
  const colorPink = useThemeColor({}, 'pink');
  const colorSuccess = useThemeColor({}, 'success');
  const colorIndigo = useThemeColor({}, 'indigo');
  // Örnek hücre seçenekleri
  const hucreOptions = [
    { label: 'A-01-01', value: 'A0101' },
    { label: 'A-01-02', value: 'A0102' },
    { label: 'A-02-01', value: 'A0201' },
    { label: 'A-02-02', value: 'A0202' },
    { label: 'B-01-01', value: 'B0101' },
    { label: 'B-01-02', value: 'B0102' },
    { label: 'B-02-01', value: 'B0201' },
    { label: 'B-02-02', value: 'B0202' },
  ];

  // Örnek stok seçenekleri
  const stokOptions = [
    { label: 'STK001 - Örnek Ürün 1', value: 'STK001' },
    { label: 'STK002 - Örnek Ürün 2', value: 'STK002' },
    { label: 'STK003 - Örnek Ürün 3', value: 'STK003' },
    { label: 'STK004 - Örnek Ürün 4', value: 'STK004' },
    { label: 'STK005 - Örnek Ürün 5', value: 'STK005' },
  ];

  const handleGirisBarkodOkut = () => {
    // Örnek barkod okutma sonucu
    setGirisHucre('A0101');
    console.log('Giriş hücre barkodu okutuldu: A0101');
  };

  const handleCikisBarkodOkut = () => {
    // Örnek barkod okutma sonucu
    setCikisHucre('B0201');
    console.log('Çıkış hücre barkodu okutuldu: B0201');
  };

  const handleStokBarkodOkut = () => {
    // Örnek barkod okutma sonucu
    setSecilenStok('STK001');
    console.log('Stok barkodu okutuldu: STK001');
  };

  const handleTransferBaslat = () => {
    if (!girisHucre || !cikisHucre || !secilenStok) {
      console.log('Lütfen tüm alanları doldurun');
      return;
    }

    console.log('Transfer başlatıldı:', {
      girisHucre,
      cikisHucre,
      secilenStok,
      selectedDepo
    });

    // Transfer işlemi tamamlandıktan sonra geri dön
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <CustomHeader
        title={t('hucrelerArasiTransfer')}
        subtitle={t('hucrelerArasindaStokTransferi')}
        iconName="swap-vertical-outline"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      {/* Info Card */}
      <CustomInfoCard
        title={t('bilgilendirme')}
        message={t('hucrelerArasiTransferIslemleriniBaslatmak')}
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
      >

        {/* Transfer Bilgileri Kartı */}
        <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: blueBorderColor }}>
          {/* Başlık */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <Ionicons name="swap-horizontal-outline" size={24} color={textColor} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('hucrelerArasiTransfer')}</Text>
          </View>

          {/* Giriş Hücre */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
                <Ionicons name="enter-outline" size={16} color="#10B981" />
              </View>
              <Text className="text-base font-medium" style={{ color: textColor }}>{t('girisHucre')}</Text>
            </View>

            {/* Barkod Okutma */}
            <View>
              <TouchableOpacity
                className="flex-1 rounded-xl p-2 border border-green-500 flex-row items-center"
                style={{ backgroundColor: cardColor }}
                activeOpacity={0.7}
                onPress={() => console.log('Kamera OCR pressed')}
              >
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
                  <Ionicons name="camera" size={16} color="#10B981" />
                </View>
                <Text className="font-medium text-sm" style={{ color: textColor }}>{t('girisHucreBarkodOkut')}</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center space-x-2">
              <View className="flex-1">
                <CustomDropdown
                  label=""
                  icon="grid-outline"
                  iconColor="#10B981"
                  placeholder={t('girisHucresiniSeciniz')}
                  options={hucreOptions}
                  value={girisHucre}
                  onSelect={(option) => setGirisHucre(option.value)}
                  showClearButton={true}
                  onClear={() => setGirisHucre('')}
                />
              </View>
            </View>
          </View>

          {/* Çıkış Hücre */}
          <View>
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 bg-red-100 rounded-lg items-center justify-center mr-3">
                <Ionicons name="exit-outline" size={16} color="#EF4444" />
              </View>
              <Text className="text-base font-medium" style={{ color: textColor }}>{t('cikisHucre')}</Text>
            </View>

            {/* Barkod Okutma */}
            <View>
              <TouchableOpacity
                className="flex-1 rounded-xl p-2 border border-red-500 flex-row items-center"
                style={{ backgroundColor: cardColor }}
                activeOpacity={0.7}
                onPress={() => console.log('Kamera OCR pressed')}
              >
                <View className="w-8 h-8 bg-red-100 rounded-lg items-center justify-center mr-3">
                  <Ionicons name="camera" size={16} color="#EF4444" />
                </View>
                <Text className="font-medium text-sm" style={{ color: textColor }}>{t('cikisHucreBarkodOkut')}</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center space-x-2">
              <View className="flex-1">
                <CustomDropdown
                  label=""
                  icon="grid-outline"
                  iconColor="#EF4444"
                  placeholder={t('cikisHucresiniSeciniz')}
                  options={hucreOptions}
                  value={cikisHucre}
                  onSelect={(option) => setCikisHucre(option.value)}
                  showClearButton={true}
                  onClear={() => setCikisHucre('')}
                />
              </View>
            </View>
          </View>

          {/* Stok */}
          <View className="mb-4 mt-4">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-3">
                <Ionicons name="cube-outline" size={16} color="#3B82F6" />
              </View>
              <Text className="text-base font-medium" style={{ color: textColor }}>{t('stok')}</Text>
            </View>
            <View className="flex-row items-center space-x-2">
              <View className="flex-1">
                <CustomDropdown
                  label=""
                  icon="barcode-outline"
                  iconColor="#3B82F6"
                  placeholder={t('stokSeciniz')}
                  options={stokOptions}
                  value={secilenStok}
                  onSelect={(option) => setSecilenStok(option.value)}
                />
              </View>
            </View>
          </View>

          {/* Aksiyon Butonları */}
          <View className="flex-row justify-center mt-4">
            {/* Geri Butonu */}
            <TouchableOpacity
              className="flex-1 rounded-xl py-4 items-center border flex-row justify-center mx-1"
              style={{ backgroundColor: cardColor, borderColor: borderColor }}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={textColor} style={{ marginRight: 6 }} />
              <Text className="text-base font-semibold" style={{ color: textColor }}>{t('geri')}</Text>
            </TouchableOpacity>

            {/* Transfer Butonu */}
            <TouchableOpacity
              onPress={handleTransferBaslat}
              activeOpacity={0.8}
              disabled={!girisHucre || !cikisHucre || !secilenStok}
              style={{
                flex: 1,
                backgroundColor: colorGreen,
                borderRadius: 12,
                paddingVertical: 16,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <Text style={{color: textColor,fontWeight: '600'}}>{t('tamamla')}</Text>
              <Ionicons name="checkmark" size={20} color={textColor} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Seçilen Bilgiler Özeti */}
        {(girisHucre || cikisHucre || secilenStok) && (
          <View className="rounded-xl p-4 mb-6 shadow-sm" style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}>
            <Text className="text-lg font-semibold mb-4" style={{ color: textColor }}>
              {t('secilenBilgiler')}
            </Text>

            {girisHucre && (
              <View className="flex-row items-center mb-2">
                <Ionicons name="enter-outline" size={16} color="#10B981" style={{ marginRight: 8 }} />
                <Text style={{ color: textColor, opacity: 0.7 }}>{t('giris')}: </Text>
                <Text className="font-medium" style={{ color: textColor }}>
                  {hucreOptions.find(h => h.value === girisHucre)?.label || girisHucre}
                </Text>
              </View>
            )}

            {cikisHucre && (
              <View className="flex-row items-center mb-2">
                <Ionicons name="exit-outline" size={16} color="#EF4444" style={{ marginRight: 8 }} />
                <Text style={{ color: textColor, opacity: 0.7 }}>{t('cikis')}: </Text>
                <Text className="font-medium" style={{ color: textColor }}>
                  {hucreOptions.find(h => h.value === cikisHucre)?.label || cikisHucre}
                </Text>
              </View>
            )}

            {secilenStok && (
              <View className="flex-row items-center mb-2">
                <Ionicons name="cube-outline" size={16} color="#3B82F6" style={{ marginRight: 8 }} />
                <Text style={{ color: textColor, opacity: 0.7 }}>{t('stok')}: </Text>
                <Text className="font-medium" style={{ color: textColor }}>
                  {stokOptions.find(s => s.value === secilenStok)?.label || secilenStok}
                </Text>
              </View>
            )}
          </View>
        )}


      </ScrollView>
    </SafeAreaView>
  );
};

export default HucrelerArasiTransfer;