import CustomHeader from '@/components/CustomHeader';
import CustomInfoCard from '@/components/CustomInfoCard';
import { useDepo } from '@/contexts/DepoContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useThemeColor } from '../../../hooks/useThemeColor';
import DepoTransferiForm from './DepoTransferiForm';
import DepoTransferiForm2 from './DepoTransferiForm2';

interface RouteParams {
  selectedDepo?: string;
}

const DepoTransferi = () => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
  const surfaceColor = useThemeColor({}, 'surface');

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedDepo: routeSelectedDepo } = (route.params as RouteParams) || {};
  const { selectedDepo, setSelectedDepo } = useDepo();
  
  // Form state'leri
  const [showForm2, setShowForm2] = useState(false);

  const handleHeaderBackPress = () => {
    // Eğer Form2 gösteriliyorsa, Form1'e dön
    if (showForm2) {
      setShowForm2(false);
    } else {
      // Ana formda ise home'a dön ve güncellenmiş depo bilgisini gönder
      if (selectedDepo && selectedDepo !== routeSelectedDepo) {
        // Güncellenmiş depo bilgisi varsa home sayfasına parametre olarak gönder
        (navigation as any).navigate('home' as never, { updatedSelectedDepo: selectedDepo } as never);
      } else {
        navigation.goBack();
      }
    }
  };
  const [formData, setFormData] = useState<{
    selectedDepo?: string;
    karsiDepo?: string;
    selectedCari?: string;
    selectedProje?: string;
    eIrsaliye?: boolean;
    aciklama1?: string;
    aciklama2?: string;
    aciklama3?: string;
  } | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <CustomHeader 
        title="Depo Transferi" 
        subtitle="Kurumsal Yönetim Paneli"
        iconName="business-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />
       
      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Depolar arası transfer işlemi gerçekleştirmek için aşağıdaki formu doldurunuz."
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />
      
      {/* Content */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        

        {/* Form Card */}
        {!showForm2 ? (
          <DepoTransferiForm 
            onNext={(data) => {
              setFormData(data);
              setShowForm2(true);
            }}
          />
        ) : (
          <DepoTransferiForm2
            formData={formData}
            onBack={() => {
              setShowForm2(false);
            }}
            onComplete={(data) => {
              console.log('Transfer tamamlandı:', data);
              // Ana sayfaya dön veya başka bir işlem yap
              setShowForm2(false);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DepoTransferi;