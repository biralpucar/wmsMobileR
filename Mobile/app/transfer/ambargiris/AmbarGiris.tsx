import CustomInfoCard from '@/components/CustomInfoCard';
import { useDepo } from '@/contexts/DepoContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useLanguage } from '@/hooks/useLanguage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import AmbarGirisForm from './AmbarGirisForm';
import AmbarGirisSiparisBaglantiliForm from './AmbarGirisSiparisBaglantiliForm';
import AmbarGirisSiparisBaglantiliForm2 from './AmbarGirisSiparisBaglantiliForm2';
import AmbarGirisSiparsiBaglantisizForm from './AmbarGirisSiparsiBaglantisizForm';

type RootStackParamList = {
  'transfer/ambargiris/AmbarGiris': { selectedDepo: string };
};

type AmbarGirisRouteProp = RouteProp<RootStackParamList, 'transfer/ambargiris/AmbarGiris'>;

interface RouteParams {
  selectedDepo?: string;
}

export default function AmbarGiris() {
  const navigation = useNavigation();
  const route = useRoute<AmbarGirisRouteProp>();
  const { selectedDepo: routeSelectedDepo } = route.params;
  const { selectedDepo } = useDepo();
  const { t } = useLanguage();

  // Tema renkleri
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
  const surfaceColor = useThemeColor({}, 'surface');
  
  // Form state'leri
  const [showForm2, setShowForm2] = useState(false);
  const [showSiparisBaglantiliForm, setShowSiparisBaglantiliForm] = useState(false);
  const [showSiparisBaglantiliForm2, setShowSiparisBaglantiliForm2] = useState(false);

  const [formData, setFormData] = useState<{
    selectedDepo?: string;
    hucreTuru?: string;
    cikisYeri?: string;
    projeKodu?: string;
    aciklama1?: string;
    aciklama2?: string;
    aciklamaText?: string;
    siparisBaglantili?: boolean;
  } | null>(null);



  
  const handleHeaderBackPress = () => {
    // Eğer Form2 (sipariş bağlantısız) gösteriliyorsa, ana forma dön
    if (showForm2) {
      setShowForm2(false);
    }
    // Eğer sipariş bağlantılı form 2 gösteriliyorsa, sipariş bağlantılı form 1'e dön
    else if (showSiparisBaglantiliForm2) {
      setShowSiparisBaglantiliForm2(false);
    }
    // Eğer sipariş bağlantılı form 1 gösteriliyorsa, ana forma dön
    else if (showSiparisBaglantiliForm) {
      setShowSiparisBaglantiliForm(false);
    }
    // Ana formda ise home'a dön
    else {
      navigation.goBack();
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      
      <StatusBar style="dark" />
      
      {/* Header */}
      <CustomHeader 
        title={t('ambarGiris')} 
        subtitle={t('ambaraMalGirisIslemi')}
        iconName="enter-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />
       
      {/* Info Card */}
      <CustomInfoCard 
        title={t('bilgilendirme')}
        message={t('ambaraMalGirisIslemleriniGerceklestirmekIcinAsagidakiFormuDoldurunuz')}
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

        {/* Form Card */}
        {!showForm2 && !showSiparisBaglantiliForm && !showSiparisBaglantiliForm2 ? (
          <AmbarGirisForm 
            onNext={(data) => {
              setFormData(data);
              if (data.siparisBaglantili) {
                setShowSiparisBaglantiliForm(true);
              } else {
                setShowForm2(true);
              }
            }}
          />
        ) : showSiparisBaglantiliForm && !showSiparisBaglantiliForm2 ? (
          <AmbarGirisSiparisBaglantiliForm
            formData={formData}
            onBack={() => {
              setShowSiparisBaglantiliForm(false);
            }}
            onComplete={(data) => {
              console.log('Sipariş bağlantılı form ileri:', data);
              setFormData(data);
              setShowSiparisBaglantiliForm2(true);
            }}
          />
        ) : showSiparisBaglantiliForm2 ? (
          <AmbarGirisSiparisBaglantiliForm2
            formData={formData}
            onBack={() => {
              setShowSiparisBaglantiliForm2(false);
            }}
            onNext={(data) => {
              console.log('Sipariş bağlantılı form 2 tamamlandı:', data);
              // Ana sayfaya dön veya başka bir işlem yap
              setShowSiparisBaglantiliForm2(false);
              setShowSiparisBaglantiliForm(false);
            }}
          />
        ) : (
          <AmbarGirisSiparsiBaglantisizForm
            formData={formData}
            onBack={() => {
              setShowForm2(false);
            }}
            onComplete={(data) => {
              console.log('Sipariş bağlantısız işlem tamamlandı:', data);
              // Ana sayfaya dön veya başka bir işlem yap
              setShowForm2(false);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}