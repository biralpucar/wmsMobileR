import CustomInfoCard from '@/components/CustomInfoCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import AmbarCikisForm from './AmbarCikisForm';
import AmbarCikisSiparisBaglantiliForm from './AmbarCikisSiparisBaglantiliForm';
import AmbarCikisSiparisBaglantiliForm2 from './AmbarCikisSiparisBaglantiliForm2';
import AmbarCikisSiparisBaglantisizForm from './AmbarCikisSiparisBaglantisizForm';

type RootStackParamList = {
  'transfer/ambarcikis/AmbarCikis': { selectedDepo: string };
};

type AmbarCikisRouteProp = RouteProp<RootStackParamList, 'transfer/ambarcikis/AmbarCikis'>;

interface RouteParams {
  selectedDepo?: string;
}

export default function AmbarCikis() {
  const navigation = useNavigation();
  const route = useRoute<AmbarCikisRouteProp>();
  const { selectedDepo } = route.params;

  // Tema renkleri
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const borderColor = useThemeColor({}, 'border');
  const surfaceColor = useThemeColor({}, 'surface');
  const colorRed = useThemeColor({}, 'red');
  const colorGreen = useThemeColor({}, 'green');
  const colorBlue = useThemeColor({}, 'blue');
  const colorIndigo = useThemeColor({}, 'indigo');
  const colorPurple = useThemeColor({}, 'purple');
  const colorPink = useThemeColor({}, 'pink');
  const colorOrange = useThemeColor({}, 'orange');
  const colorYellow = useThemeColor({}, 'yellow');
  // Form state'leri
  const [showForm2, setShowForm2] = useState(false);
  const [showSiparisBaglantiliForm, setShowSiparisBaglantiliForm] = useState(false);
  const [showSiparisBaglantiliForm2, setShowSiparisBaglantiliForm2] = useState(false);
  const [currentSelectedDepo, setCurrentSelectedDepo] = useState<string>(selectedDepo || '');
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

  // Depo seçimi değiştiğinde home.tsx'e geri bildir
  const handleDepoSelectionChange = (newDepoValue: string) => {
    setCurrentSelectedDepo(newDepoValue);
  };


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
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <StatusBar style="dark" />

      {/* Header */}
      <CustomHeader
        title="Ambar Çıkış"
        subtitle="Ambardan mal çıkış işlemi"
        iconName="exit-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />

      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Ambardan mal çıkış işlemlerini gerçekleştirmek için aşağıdaki formu doldurunuz."
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
          <AmbarCikisForm
            selectedDepo={selectedDepo}
            onNext={(data) => {
              setFormData(data);
              if (data.siparisBaglantili) {
                setShowSiparisBaglantiliForm(true);
              } else {
                setShowForm2(true);
              }
            }}
            onDepoChange={handleDepoSelectionChange}
          />
        ) : showSiparisBaglantiliForm && !showSiparisBaglantiliForm2 ? (
          <AmbarCikisSiparisBaglantiliForm
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
          <AmbarCikisSiparisBaglantiliForm2
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
          <AmbarCikisSiparisBaglantisizForm
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