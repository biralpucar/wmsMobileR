import CustomInfoCard from '@/components/CustomInfoCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import PlanliDepoTransferiDetayBilgisi from './PlanliDepoTransferiDetayBilgisi';
import PlanliDepoTransferleriBaslat from './PlanliDepoTransferleriBaslat';
import PlanliDepoTransferleriListesi from './PlanliDepoTransferleriListesi';

type RootStackParamList = {
  'transfer/planlidepotransferi/PlanliDepoTransferleri': { selectedDepo?: string; updatedSelectedDepo?: string };
};

type PlanliDepoTransferleriRouteProp = RouteProp<RootStackParamList, 'transfer/planlidepotransferi/PlanliDepoTransferleri'>;

interface PlanliTransfer {
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

const PlanliDepoTransferleri = () => {
  const navigation = useNavigation();
  const route = useRoute<PlanliDepoTransferleriRouteProp>();
  const { selectedDepo, updatedSelectedDepo } = route.params || {};

  const backgroundColor = useThemeColor({}, 'background');

  const [currentSelectedDepo, setCurrentSelectedDepo] = useState<string | undefined>(selectedDepo);
  const [showDetay, setShowDetay] = useState(false);
  const [showBaslat, setShowBaslat] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<PlanliTransfer | null>(null);

  const handleDepoSelectionChange = (newDepoValue: string) => {
    setCurrentSelectedDepo(newDepoValue);
  };

  const handleHeaderBackPress = () => {
    // Eğer başlat ekranı gösteriliyorsa, ana listeye dön
    if (showBaslat) {
      setShowBaslat(false);
      setSelectedTransfer(null);
    }
    // Eğer detay ekranı gösteriliyorsa, ana listeye dön
    else if (showDetay) {
      setShowDetay(false);
      setSelectedTransfer(null);
    }
    // Ana listede ise home'a dön
    else {
      if (currentSelectedDepo && currentSelectedDepo !== selectedDepo) {
        (navigation as any).navigate('home', { updatedSelectedDepo: currentSelectedDepo });
      } else {
        navigation.goBack();
      }
    }
  };

  const handleDetayPress = (transfer: PlanliTransfer) => {
    setSelectedTransfer(transfer);
    setShowDetay(true);
  };

  const handleBaslatPress = (transfer: PlanliTransfer) => {
    setSelectedTransfer(transfer);
    setShowBaslat(true);
  };

  useFocusEffect(
    useCallback(() => {
      if (updatedSelectedDepo) {
        setCurrentSelectedDepo(updatedSelectedDepo);
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
        title="Planlı Depo Transferleri" 
        subtitle="Planlı transfer işlemleri"
        iconName="swap-horizontal-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />

      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Planlı depo transfer işlemlerini görüntülemek ve başlatmak için aşağıdaki listeden seçim yapınız."
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
      >


        {/* Ana liste ekranı */}
        {!showDetay && !showBaslat ? (
          <>
            <PlanliDepoTransferleriListesi
              selectedDepo={currentSelectedDepo}
              onDetayPress={handleDetayPress}
              onBaslatPress={handleBaslatPress}
              onDepoChange={handleDepoSelectionChange}
            />
          </>
        ) : showDetay && selectedTransfer ? (
          <PlanliDepoTransferiDetayBilgisi
            transfer={{...selectedTransfer, stoklar: []}}
            onClose={() => {
              setShowDetay(false);
              setSelectedTransfer(null);
            }}
          />
        ) : showBaslat && selectedTransfer ? (
          <PlanliDepoTransferleriBaslat
            transfer={selectedTransfer}
            selectedDepo={currentSelectedDepo}
            onClose={() => {
              setShowBaslat(false);
              setSelectedTransfer(null);
            }}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlanliDepoTransferleri;