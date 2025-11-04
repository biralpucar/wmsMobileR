import CustomInfoCard from '@/components/CustomInfoCard';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../components/CustomHeader';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeColor } from '../../hooks/useThemeColor';
import SayimBarkodOkutma from './SayimBarkodOkutma';
import SayimListesi from './SayimListesi';

type RootStackParamList = {
  'sayim/Sayim': { selectedDepo: string };
};

type SayimRouteProp = RouteProp<RootStackParamList, 'sayim/Sayim'>;

interface RouteParams {
  selectedDepo?: string;
}

export default function Sayim() {
  const navigation = useNavigation();
  const route = useRoute<SayimRouteProp>();
  const { selectedDepo } = route.params;
  
  const { theme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  
  // Sayfa state'leri
  const [showSayimBarkodOkutma, setShowSayimBarkodOkutma] = useState(false);
  const [selectedSayim, setSelectedSayim] = useState<any>(null);

  const handleHeaderBackPress = () => {
    // Eğer SayimBarkodOkutma gösteriliyorsa, sayım listesine dön
    if (showSayimBarkodOkutma) {
      setShowSayimBarkodOkutma(false);
      setSelectedSayim(null);
    }
    // Ana sayfada ise home'a dön
    else {
      navigation.goBack();
    }
  };

  const handleSayimBaslat = (sayim: any) => {
    setSelectedSayim(sayim);
    setShowSayimBarkodOkutma(true);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <CustomHeader 
        title="Sayım Girişi" 
        subtitle="Stok sayım işlemleri"
        iconName="calculator-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />

      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Stok sayım işlemlerini gerçekleştirmek için aşağıdaki listeden sayım seçiniz."
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
       

        {/* Content */}
        {!showSayimBarkodOkutma ? (
          <SayimListesi 
            selectedDepo={selectedDepo}
            onSayimBaslat={handleSayimBaslat}
          />
        ) : (
          <SayimBarkodOkutma
            sayim={selectedSayim}
            selectedDepo={selectedDepo}
            onBack={() => {
              setShowSayimBarkodOkutma(false);
              setSelectedSayim(null);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}