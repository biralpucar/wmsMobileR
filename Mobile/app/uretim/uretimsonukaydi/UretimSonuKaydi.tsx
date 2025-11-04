import CustomInfoCard from '@/components/CustomInfoCard';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import { useTheme } from '../../../contexts/ThemeContext';
import { useThemeColor } from '../../../hooks/useThemeColor';
import UretimSonuKaydiForm from './UretimSonuKaydiForm';
import UretimSonuKaydiForm2 from './UretimSonuKaydiForm2';

type RootStackParamList = {
  'uretim/uretimsonukaydi/UretimSonuKaydi': { selectedDepo: string };
};

type UretimSonuKaydiRouteProp = RouteProp<RootStackParamList, 'uretim/uretimsonukaydi/UretimSonuKaydi'>;

interface RouteParams {
  selectedDepo?: string;
}

export default function UretimSonuKaydi() {
  const navigation = useNavigation();
  const route = useRoute<UretimSonuKaydiRouteProp>();
  const { selectedDepo } = (route.params as RouteParams) || {};
  
  const { theme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  
  // Form state'leri
  const [showForm2, setShowForm2] = useState(false);
  const [currentSelectedDepo, setCurrentSelectedDepo] = useState<string>(selectedDepo || '');
  const [formData, setFormData] = useState<{
    selectedDepo?: string;
    isEmriNo?: string;
    urunKodu?: string;
    miktar?: string;
    aciklama?: string;
  } | null>(null);

  // Depo seçimi değiştiğinde home.tsx'e geri bildir
  const handleDepoSelectionChange = (newDepoValue: string) => {
    setCurrentSelectedDepo(newDepoValue);
  };
  
  const handleHeaderBackPress = () => {
    // Eğer Form2 gösteriliyorsa, ana forma dön
    if (showForm2) {
      setShowForm2(false);
    } else {// Ana formda ise home'a dön
      // Ana formda ise home'a dön ve güncellenmiş depo bilgisini gönder
      if (currentSelectedDepo && currentSelectedDepo !== selectedDepo) {
        // Güncellenmiş depo bilgisi varsa home sayfasına parametre olarak gönder
        (navigation as any).navigate('home' as never, { updatedSelectedDepo: currentSelectedDepo } as never);
      } else {
        navigation.goBack();
      }
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <CustomHeader 
        title="Üretim Sonu Kaydı" 
        subtitle="Tamamlanan üretim kayıtları"
        iconName="checkmark-done-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />
       
      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Tamamlanan üretim işlemlerini kaydetmek için aşağıdaki formu doldurunuz."
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

        {/* Form Card */}
        {!showForm2 ? (
          <UretimSonuKaydiForm 
            selectedDepo={selectedDepo}
            onNext={(data) => {
              setFormData(data);
              setShowForm2(true);
            }}
            onDepoChange={handleDepoSelectionChange}
          />
        ) : (
          <UretimSonuKaydiForm2
            formData={formData}
            onBack={() => {
              setShowForm2(false);
            }}
            onComplete={(data) => {
              console.log('Üretim sonu kaydı tamamlandı:', data);
              // Ana sayfaya dön veya başka bir işlem yap
              setShowForm2(false);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}