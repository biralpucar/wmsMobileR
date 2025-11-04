import CustomInfoCard from '@/components/CustomInfoCard';
import { useDepo } from '@/contexts/DepoContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import SevkiyatKontrolBaslat from './SevkiyatKontrolBaslat';
import SevkiyatKontrolDetayBilgisi from './SevkiyatKontrolDetayBilgisi';
import SevkiyatKontrolSecim from './SevkiyatKontrolSecim';

type RootStackParamList = {
  'sevkiyat/sevkiyatkontrol/SevkiyatKontrol': { selectedDepo?: string; updatedSelectedDepo?: string };
};

type SevkiyatKontrolRouteProp = RouteProp<RootStackParamList, 'sevkiyat/sevkiyatkontrol/SevkiyatKontrol'>;

interface SevkiyatKontrol {
  id: string;
  tarih: string;
  durum: 'Bekliyor' | 'Kontrol Ediliyor' | 'Tamamlandı';
  DepoKodu: string;
  DepoAdi: string;
  cariKodu: string;
  cariAdi: string;
  nakliyeTipi: string;
  projeKodu: string;
  projeAdi: string;
  belgeSeriNo: string;
  stoklar?: any[];
}

const SevkiyatKontrolScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<SevkiyatKontrolRouteProp>();
  const { selectedDepo: routeSelectedDepo, updatedSelectedDepo } = route.params || {};
  const { selectedDepo } = useDepo();
  const { t } = useLanguage();

  // Tema renkleri
  const backgroundColor = useThemeColor({}, 'background');
  const [showSecim, setShowSecim] = useState(true);
  const [showDetay, setShowDetay] = useState(false);
  const [showBaslat, setShowBaslat] = useState(false);
  const [selectedKontrol, setSelectedKontrol] = useState<SevkiyatKontrol | null>(null);
  const [selectedKontrolData, setSelectedKontrolData] = useState<any[]>([]);

  const handleHeaderBackPress = () => {
    // Eğer başlat ekranı gösteriliyorsa, seçim sayfasına dön
    if (showBaslat) {
      setShowBaslat(false);
      setSelectedKontrol(null);
      setShowSecim(true);
    }
    // Eğer detay ekranı gösteriliyorsa, seçim sayfasına dön
    else if (showDetay) {
      setShowDetay(false);
      setSelectedKontrol(null);
      setShowSecim(true);
    }
    // Seçim sayfasında ise home'a dön
    else if (showSecim) {
      navigation.goBack();
    }
  };

  const handleDetayPress = (kontrol: SevkiyatKontrol) => {
    setSelectedKontrol(kontrol);
    setShowDetay(true);
  };

  const handleBaslatPress = (kontrol: SevkiyatKontrol) => {
    setSelectedKontrol(kontrol);
    setShowBaslat(true);
  };

  const handleSecimSelect = (selectedData: any[]) => {
    console.log('Seçilen kontrol verileri:', selectedData);
    setSelectedKontrolData(selectedData);
    
    // Eğer seçili veri varsa, ilk kontrol verisini al ve başlat ekranına geç
    if (selectedData && selectedData.length > 0) {
      const firstKontrol = selectedData[0];
      setSelectedKontrol(firstKontrol);
      setShowSecim(false);
      setShowBaslat(true);
    } else {
      // Veri yoksa sadece seçim ekranını kapat
      setShowSecim(false);
    }
  };

  const handleSecimClose = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      if (updatedSelectedDepo) {
        // Parametreyi temizle
        (navigation as any).setParams({ updatedSelectedDepo: undefined });
      }
    }, [updatedSelectedDepo, navigation])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <StatusBar style="dark" />
      
      
      {/* Header */}
      <CustomHeader 
        title={t('sevkiyat-kontrol')} 
        subtitle={t('sevkiyat-kontrol-islemleri')}
        iconName="checkmark-circle-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />

      {/* Info Card */}
      <CustomInfoCard 
        title={t('bilgilendirme')}
        message={t('sevkiyat-kontrol-bilgilendirme-mesaji')}
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
      >

        {/* Seçim ekranı */}
        {showSecim ? (
          <SevkiyatKontrolSecim
            onSelect={handleSecimSelect}
            onClose={handleSecimClose}
          />
        ) : !showDetay && !showBaslat ? (
          <>
            {/* SevkiyatKontrolListesi kaldırıldı */}
          </>
        ) : showDetay && selectedKontrol ? (
          <SevkiyatKontrolDetayBilgisi
            kontrol={{...selectedKontrol, stoklar: []}}
            onClose={() => {
              setShowDetay(false);
              setSelectedKontrol(null);
            }}
          />
        ) : showBaslat && selectedKontrol ? (
          <SevkiyatKontrolBaslat
            kontrol={selectedKontrol}
            onClose={() => {
              setShowBaslat(false);
              setSelectedKontrol(null);
              setShowSecim(true);
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SevkiyatKontrolScreen;