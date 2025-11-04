import CustomInfoCard from '@/components/CustomInfoCard';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { useThemeColor } from '../../../hooks/useThemeColor';
import PlanliAmbarCikisBaslat from './PlanliAmbarCikisBaslat';
import PlanliAmbarCikisDetayBilgisi from './PlanliAmbarCikisDetayBilgisi';
import PlanliAmbarCikisListesi from './PlanliAmbarCikisListesi';

type RootStackParamList = {
  'transfer/planliambarcikis/PlanliAmbarCikis': { selectedDepo: string };
};

type PlanliAmbarCikisRouteProp = RouteProp<RootStackParamList, 'transfer/planliambarcikis/PlanliAmbarCikis'>;

interface RouteParams {
  selectedDepo?: string;
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
  stoklar: any[];
}

export default function PlanliAmbarCikis() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
  const surfaceColor = useThemeColor({}, 'surface');

  const navigation = useNavigation();
  const route = useRoute<PlanliAmbarCikisRouteProp>();
  const { selectedDepo } = (route.params as RouteParams) || {};
  
  // State'ler
  const [showBaslat, setShowBaslat] = useState(false);
  const [showDetayBilgisi, setShowDetayBilgisi] = useState(false);
  const [currentSelectedDepo, setCurrentSelectedDepo] = useState<string>(selectedDepo || '');
  const [selectedAmbarCikis, setSelectedAmbarCikis] = useState<PlanliAmbarCikis | null>(null);

  // Route parametrelerini dinle
  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        const params = route.params as RouteParams;
        if (params.selectedDepo) {
          setCurrentSelectedDepo(params.selectedDepo);
        }
      }
    }, [route.params])
  );

  // Depo seçimi değiştiğinde home.tsx'e geri bildir
  const handleDepoSelectionChange = (newDepoValue: string) => {
    setCurrentSelectedDepo(newDepoValue);
  };
  
  const handleHeaderBackPress = () => {
    // Eğer Başlat sayfası gösteriliyorsa, ana sayfaya dön
    if (showBaslat) {
      setShowBaslat(false);
      setSelectedAmbarCikis(null);
    }
    // Eğer Detay Bilgisi sayfası gösteriliyorsa, ana sayfaya dön
    else if (showDetayBilgisi) {
      setShowDetayBilgisi(false);
      setSelectedAmbarCikis(null);
    }
    // Ana sayfada ise home'a dön
    else {
      // Ana sayfada ise home'a dön ve güncellenmiş depo bilgisini gönder
      if (currentSelectedDepo && currentSelectedDepo !== selectedDepo) {
        // Güncellenmiş depo bilgisi varsa home sayfasına parametre olarak gönder
        (navigation as any).navigate('home' as never, { updatedSelectedDepo: currentSelectedDepo } as never);
      } else {
        navigation.goBack();
      }
    }
  };

  // Başlat butonuna basıldığında
  const handleBaslatPress = (ambarCikis: PlanliAmbarCikis) => {
    setSelectedAmbarCikis(ambarCikis);
    setShowBaslat(true);
  };

  // Detay butonuna basıldığında
  const handleDetayPress = (ambarCikis: PlanliAmbarCikis) => {
    setSelectedAmbarCikis(ambarCikis);
    setShowDetayBilgisi(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      
      <StatusBar style="auto" />
      
      {/* Header */}
      <CustomHeader 
        title="Planlı Ambar Çıkış" 
        subtitle="Kurumsal Yönetim Paneli"
        iconName="cube-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />

      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Planlı ambar çıkış işlemlerini gerçekleştirmek için aşağıdan ambar çıkış işlemindeki başlat butonuna basın."
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Ana Liste Sayfası */}
        {!showBaslat && !showDetayBilgisi ? (
          <PlanliAmbarCikisListesi 
            selectedDepo={currentSelectedDepo}
            onBaslatPress={handleBaslatPress}
            onDetayPress={handleDetayPress}
            onDepoChange={handleDepoSelectionChange}
          />
        ) : showBaslat && selectedAmbarCikis ? (
          <PlanliAmbarCikisBaslat
            ambarCikis={selectedAmbarCikis}
            selectedDepo={currentSelectedDepo}
            onClose={() => {
              setShowBaslat(false);
              setSelectedAmbarCikis(null);
            }}
          />
        ) : showDetayBilgisi && selectedAmbarCikis ? (
          <PlanliAmbarCikisDetayBilgisi
            ambarCikis={selectedAmbarCikis}
            onClose={() => {
              setShowDetayBilgisi(false);
              setSelectedAmbarCikis(null);
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}