import CustomInfoCard from '@/components/CustomInfoCard';
import { useDepo } from '@/contexts/DepoContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import PlanliHucreTransferiBaslat from './PlanliHucreTransferiBaslat';
import PlanliHucreTransferiDetayBilgisi from './PlanliHucreTransferiDetayBilgisi';
import PlanlıHucreTransferleriListesi from './PlanlıHucreTransferleriListesi';

type RootStackParamList = {
  'hucretakibi/planlihucretransferi/PlanliHucreTransferi': { selectedDepo: string };
};

type PlanliHucreTransferiRouteProp = RouteProp<RootStackParamList, 'hucretakibi/planlihucretransferi/PlanliHucreTransferi'>;

interface RouteParams {
  selectedDepo?: string;
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
  stoklar: any[];
}

export default function PlanliHucreTransferi() {
  const navigation = useNavigation();
  const route = useRoute<PlanliHucreTransferiRouteProp>();
  const { selectedDepo } = (route.params as RouteParams) || {};
  const { selectedDepo: globalSelectedDepo, setSelectedDepo } = useDepo();
  const { theme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  
  // State'ler
  const [showBaslat, setShowBaslat] = useState(false);
  const [showDetayBilgisi, setShowDetayBilgisi] = useState(false);
  const [selectedHucreTransferi, setSelectedHucreTransferi] = useState<PlanliHucreTransferi | null>(null);

  // Route parametrelerini dinle
  useFocusEffect(
    useCallback(() => {
      if (route.params) {
        const params = route.params as RouteParams;
        if (params.selectedDepo) {
          setSelectedDepo(params.selectedDepo);
        }
      }
    }, [route.params, setSelectedDepo])
  );


  
  const handleHeaderBackPress = () => {
    // Eğer Başlat sayfası gösteriliyorsa, ana sayfaya dön
    if (showBaslat) {
      setShowBaslat(false);
      setSelectedHucreTransferi(null);
    }
    // Eğer Detay Bilgisi sayfası gösteriliyorsa, ana sayfaya dön
    else if (showDetayBilgisi) {
      setShowDetayBilgisi(false);
      setSelectedHucreTransferi(null);
    }
    // Ana sayfada ise home'a dön
    else {
      // Ana sayfada ise home'a dön ve güncellenmiş depo bilgisini gönder
      if (globalSelectedDepo && globalSelectedDepo !== selectedDepo) {
        // Güncellenmiş depo bilgisi varsa home sayfasına parametre olarak gönder
        (navigation as any).navigate('home' as never, { updatedSelectedDepo: globalSelectedDepo } as never);
      } else {
        navigation.goBack();
      }
    }
  };

  // Başlat butonuna basıldığında
  const handleBaslatPress = (hucreTransferi: PlanliHucreTransferi) => {
    setSelectedHucreTransferi(hucreTransferi);
    setShowBaslat(true);
  };

  // Detay butonuna basıldığında
  const handleDetayPress = (hucreTransferi: PlanliHucreTransferi) => {
    setSelectedHucreTransferi(hucreTransferi);
    setShowDetayBilgisi(true);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <CustomHeader 
        title="Planlı Hücre Transferi" 
        subtitle="Kurumsal Yönetim Paneli"
        iconName="swap-horizontal-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />

      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Planlı hücre transfer işlemlerini gerçekleştirmek için aşağıdan hücre transfer işlemindeki başlat butonuna basın."
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Ana Liste Sayfası */}
        {!showBaslat && !showDetayBilgisi ? (
          <PlanlıHucreTransferleriListesi 
            onBaslatPress={handleBaslatPress}
            onDetayPress={handleDetayPress}
          />
        ) : showBaslat && selectedHucreTransferi ? (
          <PlanliHucreTransferiBaslat
            hucreTransferi={selectedHucreTransferi}
            selectedDepo={globalSelectedDepo}
            onClose={() => {
              setShowBaslat(false);
              setSelectedHucreTransferi(null);
            }}
          />
        ) : showDetayBilgisi && selectedHucreTransferi ? (
          <PlanliHucreTransferiDetayBilgisi
            hucreTransferi={selectedHucreTransferi}
            onClose={() => {
              setShowDetayBilgisi(false);
              setSelectedHucreTransferi(null);
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}