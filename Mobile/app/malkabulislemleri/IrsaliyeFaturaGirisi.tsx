import CustomAlert from '@/components/CustomAlert';
import CustomHeader from '@/components/CustomHeader';
import CustomInfoCard from '@/components/CustomInfoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MlkitOcr from 'react-native-mlkit-ocr';
import IrsaliyeFaturaGirisiForm from './IrsaliyeFaturaGirisiForm';
import IrsaliyeFaturaGirisiSiparisBaglantiliForm from './IrsaliyeFaturaGirisiSiparisBaglantiliForm';
import IrsaliyeFaturaGirisiSiparisBaglantiliForm2 from './IrsaliyeFaturaGirisiSiparisBaglantiliForm2';
import IrsaliyeFaturaGirisiSiparisBaglantisizForm from './IrsaliyeFaturaGirisiSiparisBaglantisizForm';

export default function IrsaliyeFaturaGirisiScreen() {
  const navigation = useNavigation();
  
  // Tema hook'ları
  const { theme } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const colorRed = useThemeColor({}, 'red');
  const colorGreen = useThemeColor({}, 'green');
  const colorBlue = useThemeColor({}, 'blue');
  const colorOrange = useThemeColor({}, 'orange');
  const colorYellow = useThemeColor({}, 'yellow');
  const colorPurple = useThemeColor({}, 'purple');
  const colorPink = useThemeColor({}, 'pink');
  const colorSuccess = useThemeColor({}, 'success');
  const colorIndigo = useThemeColor({}, 'indigo');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const redBorderColor = useThemeColor({}, 'redBorder');
  const [irsaliyeNo, setIrsaliyeNo] = useState('');
  const [cariKod, setCariKod] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [siparisBaglantili, setSiparisBaglantili] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSiparisBaglantiliForm, setShowSiparisBaglantiliForm] = useState(false);
  const [showSiparisBaglantiliForm2, setShowSiparisBaglantiliForm2] = useState(false);
  const [showSiparisBaglantisizForm, setShowSiparisBaglantisizForm] = useState(false);
  const [formData, setFormData] = useState<{
    irsaliyeNo: string;
    cariKod: string;
    cariAdi?: string;
    selectedDate: Date;
    siparisBaglantili: boolean;
    irsaliyeTipi?: string;
  } | null>(null);
  const [siparisBaglantiliFormData, setSiparisBaglantiliFormData] = useState<any>(null);
  const router = useRouter();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info',
    buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
  });

  // Cari kod seçenekleri
  const cariKodOptions = [
    { label: 'ACME Corp. (ACM001)', value: 'ACM001' },
    { label: 'Beta Ltd. (BET002)', value: 'BET002' },
    { label: 'Gamma Inc. (GAM003)', value: 'GAM003' },
    { label: 'Delta Co. (DEL004)', value: 'DEL004' },
    { label: 'Epsilon LLC (EPS005)', value: 'EPS005' },
    { label: 'Zeta Group (ZET006)', value: 'ZET006' },
    { label: 'Eta Industries (ETA007)', value: 'ETA007' },
    { label: 'Theta Solutions (THE008)', value: 'THE008' },
  ];

  const handleSubmit = async () => {
    if (!irsaliyeNo.trim() || !cariKod.trim()) {
      setAlertConfig({
        title: 'Hata',
        message: 'Lütfen tüm alanları doldurunuz.',
        type: 'error',
        buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
      });
      setAlertVisible(true);
      return;
    }

    setIsLoading(true);
    
    // Simulated API call
    setTimeout(() => {
      setIsLoading(false);
      setAlertConfig({
        title: 'Başarılı',
        message: 'İrsaliye/Fatura girişi başarıyla kaydedildi.',
        type: 'success',
        buttons: [
          {
            text: 'Tamam',
            onPress: () => {
              // Clear form
              setIrsaliyeNo('');
              setCariKod('');
              setAlertVisible(false);
            }
          }
        ]
      });
      setAlertVisible(true);
    }, 1500);
  };

  const goBack = () => {
    router.back();
  };

  const handleHeaderBackPress = () => {
    // Eğer sipariş bağlantılı form gösteriliyorsa, ana forma dön
    if (showSiparisBaglantiliForm) {
      setShowSiparisBaglantiliForm(false);
    } else if (showSiparisBaglantiliForm2) {
      // Form2'den Form1'e dön
      setShowSiparisBaglantiliForm2(false);
      setShowSiparisBaglantiliForm(true);
    } else if (showSiparisBaglantisizForm) {
      setShowSiparisBaglantisizForm(false);
    } else {
      // Ana formda ise home'a dön
      navigation.goBack();
    }
  };

  const performOCR = async (imageUri: string) => {
    try {
      // Expo Go kontrolü - native modül kullanılamıyorsa hata ver
      if (typeof MlkitOcr === 'undefined' || !MlkitOcr.detectFromUri) {
        throw new Error('OCR özelliği sadece development build ile kullanılabilir. Lütfen uygulamayı development build ile çalıştırın.');
      }
      
      // ML Kit OCR ile metin tanıma (offline, ücretsiz)
      console.log('ML Kit OCR başlatılıyor...');
      
      const result = await MlkitOcr.detectFromUri(imageUri);
      
      // Tüm metin bloklarını birleştir
      const detectedText = result.map(block => block.text).join('\n');
      
      console.log('OCR Sonucu:', detectedText);
      
      // OCR sonucundan İrsaliye No ve Cari Kod çıkarma
      const extractedData = extractInvoiceData(detectedText);
      return extractedData;
      
    } catch (error) {
      console.error('ML Kit OCR Hatası:', error);
      throw error;
    }
  };
  

  
  const extractInvoiceData = (text: string) => {
    // Türkçe fatura/irsaliye formatlarını tanıma
    const lines = text.split('\n').map(line => line.trim().replace(/\s+/g, ' '));
    
    let irsaliyeNo = '';
    let cariKod = '';
    
    // İrsaliye numarası arama (daha spesifik ve doğru formatlar)
    const irsaliyePatterns = [
      // Özelleştirme No: TR1.2, IRS20220000000029 gibi
      /(?:Özelleştirme\s*No|ÖZELLEŞTIRME\s*NO)[:\s]*([A-Z]{2,3}[0-9\.\-]{2,20})/i,
      // İrsaliye No: formatları
      /(?:İrsaliye\s*No|IRSALIYE\s*NO|İRSALİYE\s*NO)[:\s]*([A-Z0-9\-\/\.]{6,25})/i,
      // Fatura No: formatları
      /(?:Fatura\s*No|FATURA\s*NO)[:\s]*([A-Z0-9\-\/\.]{6,25})/i,
      // Belge No: formatları
      /(?:Belge\s*No|BELGE\s*NO)[:\s]*([A-Z0-9\-\/\.]{6,25})/i,
      // IRS ile başlayan uzun numaralar
      /(IRS\d{14,20})/i,
      // TR ile başlayan numaralar (TR1.2 gibi)
      /(TR\d+\.\d+)/i,
      // VVV ile başlayan numaralar
      /(VVV\d{14,20})/i
    ];
    
    // Cari kod arama (VKN, müşteri kodu formatları)
    const cariPatterns = [
      // VKN: 1234567802 formatı
      /(?:VKN|vkn)[:\s]*(\d{10,11})(?!\d)/i,
      // Vergi No: formatı
      /(?:Vergi\s*No|VERGİ\s*NO)[:\s]*(\d{10,11})(?!\d)/i,
      // Cari kod alanları
      /(?:Cari\s*Kod|CARI\s*KOD|CARİ\s*KOD)[:\s]*([A-Z0-9]{3,15})/i,
      // Müşteri kodu alanları
      /(?:Müşteri\s*Kod|MÜŞTERİ\s*KOD|MUSTERI\s*KOD)[:\s]*([A-Z0-9]{3,15})/i,
      // Parantez içindeki VKN: (VKN) formatı
      /\(VKN\)[:\s]*(\d{10,11})(?!\d)/i
    ];
    
    // İrsaliye numarası bulma
    for (const line of lines) {
      for (const pattern of irsaliyePatterns) {
        const match = line.match(pattern);
        if (match && match[1]) {
          const candidate = match[1].trim();
          // Minimum uzunluk kontrolü ve geçerli karakter kontrolü
          if (candidate.length >= 3 && /[A-Z0-9]/.test(candidate)) {
            irsaliyeNo = candidate.toUpperCase();
            console.log('İrsaliye No bulundu:', irsaliyeNo, 'Satır:', line);
            break;
          }
        }
      }
      if (irsaliyeNo) break;
    }
    
    // Cari kod bulma
    for (const line of lines) {
      for (const pattern of cariPatterns) {
        const match = line.match(pattern);
        if (match && match[1]) {
          const candidate = match[1].trim();
          // VKN için 10-11 hane kontrolü, diğerleri için minimum 3 karakter
          if ((candidate.length === 10 || candidate.length === 11) && /^\d+$/.test(candidate)) {
            cariKod = candidate;
            console.log('Cari Kod (VKN) bulundu:', cariKod, 'Satır:', line);
            break;
          } else if (candidate.length >= 3 && /[A-Z0-9]/.test(candidate)) {
            cariKod = candidate;
            console.log('Cari Kod bulundu:', cariKod, 'Satır:', line);
            break;
          }
        }
      }
      if (cariKod) break;
    }
    
    // Eğer VKN bulunamadıysa, satırlarda tek başına duran 10-11 haneli sayıları ara
    if (!cariKod) {
      for (const line of lines) {
        const vknMatch = line.match(/\b(\d{10,11})\b/);
        if (vknMatch && vknMatch[1]) {
          const candidate = vknMatch[1];
          if (candidate.length === 10 || candidate.length === 11) {
            cariKod = candidate;
            console.log('Standalone VKN bulundu:', cariKod, 'Satır:', line);
            break;
          }
        }
      }
    }
    
    // Debug için tüm OCR metnini logla
    console.log('=== OCR DEBUG ===');
    console.log('OCR Metni:', text);
    console.log('İşlenen Satırlar:', lines);
    console.log('Bulunan İrsaliye No:', irsaliyeNo || 'BULUNAMADI');
    console.log('Bulunan Cari Kod:', cariKod || 'BULUNAMADI');
    console.log('================');
    
    return { irsaliyeNo, cariKod };
  };

  const handleCameraPress = async () => {
    try {
      // Kamera izni iste
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        setAlertConfig({
          title: 'İzin Gerekli',
          message: 'Kamera kullanabilmek için izin vermeniz gerekiyor.',
          type: 'warning',
          buttons: [
            { text: 'İptal', onPress: () => setAlertVisible(false) },
            { 
              text: 'Ayarlara Git', 
              onPress: () => {
                setAlertVisible(false);
                // Kullanıcıyı ayarlara yönlendir
                setTimeout(() => {
                  setAlertConfig({
                    title: 'Bilgi',
                    message: 'Lütfen ayarlardan kamera iznini manuel olarak verin.',
                    type: 'info',
                    buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
                  });
                  setAlertVisible(true);
                }, 100);
              }
            }
          ]
        });
        setAlertVisible(true);
        return;
      }

      // Kamerayı aç
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        
        // Gerçek OCR işlemi
        setAlertConfig({
          title: 'Fotoğraf İşleniyor',
          message: 'Fatura/İrsaliye okunuyor, lütfen bekleyiniz...',
          type: 'info',
          buttons: []
        });
        setAlertVisible(true);

        try {
          const ocrResult = await performOCR(imageUri);
          
          // OCR sonuçlarını kontrol et
          if (!ocrResult.irsaliyeNo && !ocrResult.cariKod) {
            setAlertConfig({
              title: 'OCR Sonucu',
              message: 'Belgede İrsaliye No veya Cari Kod bulunamadı. Lütfen belgeyi daha net çekin veya manuel olarak girin.',
              type: 'warning',
              buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
            });
            setAlertVisible(true);
            return;
          }
          
          const foundItems = [];
          if (ocrResult.irsaliyeNo) foundItems.push(`İrsaliye No: ${ocrResult.irsaliyeNo}`);
          if (ocrResult.cariKod) foundItems.push(`Cari Kod: ${ocrResult.cariKod}`);
          
          setAlertConfig({
            title: 'OCR Tamamlandı',
            message: `Okunan Bilgiler:\n\n${foundItems.join('\n')}\n\nBu bilgileri forma eklemek istiyor musunuz?`,
            type: 'success',
            buttons: [
              { text: 'Hayır', onPress: () => setAlertVisible(false) },
              { 
                text: 'Evet', 
                onPress: () => {
                  // Form alanlarını doldur (sadece bulunan değerler)
                  if (ocrResult.irsaliyeNo) setIrsaliyeNo(ocrResult.irsaliyeNo);
                  if (ocrResult.cariKod) setCariKod(ocrResult.cariKod);
                  
                  setAlertVisible(false);
                  setTimeout(() => {
                    setAlertConfig({
                      title: 'Başarılı',
                      message: 'Okunan bilgiler forma başarıyla eklendi!',
                      type: 'success',
                      buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
                    });
                    setAlertVisible(true);
                  }, 100);
                }
              }
            ]
          });
          setAlertVisible(true);
        } catch (ocrError) {
          console.error('OCR hatası:', ocrError);
          setAlertConfig({
            title: 'OCR Hatası',
            message: 'Fatura/İrsaliye okunurken bir hata oluştu. Lütfen tekrar deneyin.\n\nHata: ' + (ocrError as Error).message,
            type: 'error',
            buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
          });
          setAlertVisible(true);
        }
      }
    } catch (error) {
      console.error('Kamera hatası:', error);
      setAlertConfig({
        title: 'Hata',
        message: 'Kamera açılırken bir hata oluştu.',
        type: 'error',
        buttons: [{ text: 'Tamam', onPress: () => setAlertVisible(false) }]
      });
      setAlertVisible(true);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      
      {/* Header */}
      <CustomHeader 
        title="İrsaliye/Fatura Girişi" 
        subtitle="Kurumsal Yönetim Paneli"
        iconName="business-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />
      
      {/* Info Card */}
      <CustomInfoCard 
        title="Bilgilendirme"
        message="Gelen irsaliye ve fatura bilgilerini sisteme kaydetmek için aşağıdaki formu doldurunuz."
        iconName="information"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />
      {/* Content */}
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        
        {/* Quick Actions - Sadece ana form gösterilirken görünür */}
        {!showSiparisBaglantiliForm && !showSiparisBaglantiliForm2 && !showSiparisBaglantisizForm && (
          <View className="mt-3">
            <Text className="text-base font-semibold mb-4" style={{ color: textColor }}>Hızlı İşlemler</Text>
            <View className="flex-row space-x-3 pb-3">
              {/* Kamera ile data almak için kullanılan buton */}
              <TouchableOpacity 
                className="flex-1 rounded-xl p-2 shadow-sm flex-row items-center"
                style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}
                activeOpacity={0.7}
                onPress={handleCameraPress}
              >
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: colorGreen}} >
                  <Ionicons name="camera" size={16} color={textColor}/>
                </View>
                <Text className="font-medium text-sm" style={{ color: textColor }}>Kamera OCR</Text>
              </TouchableOpacity>
              {/* Kamera ile görsel yüklemek için kullanılan buton */}
              <TouchableOpacity 
                className="flex-1 rounded-xl p-4 ml-1 shadow-sm flex-row items-center"
                style={{ backgroundColor: cardColor, borderColor: borderColor, borderWidth: 1 }}
                activeOpacity={0.7}
              >
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: colorGreen}} >
                  <Ionicons name="camera" size={16} color={textColor} />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-xs leading-tight" style={{ color: textColor }}>İrsaliye Fatura</Text>
                  <Text className="font-medium text-xs leading-tight" style={{ color: textColor }}>Görseli Yükle</Text>
                </View>
              </TouchableOpacity>
              
              {/* <TouchableOpacity 
                className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-row items-center"
                activeOpacity={0.7}
                onPress={handleCameraPress}
              >
                <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center mr-3">
                  <Ionicons name="search-outline" size={16} color="#8B5CF6" />
                </View>
                <Text className="text-gray-700 font-medium text-sm">Cari Ara</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        )}
        {/* Form Card */}
        {!showSiparisBaglantiliForm && !showSiparisBaglantiliForm2 && !showSiparisBaglantisizForm ? (
          <IrsaliyeFaturaGirisiForm 
            onNext={(data) => {
              // Sipariş bağlantılı değilse sipariş bağlantısız forma yönlendir
              setFormData(data);
              setShowSiparisBaglantisizForm(true);
            }}
            onSiparisBaglantiliNext={(data) => {
              setFormData(data);
              setShowSiparisBaglantiliForm(true);
            }}
            initialData={{
              irsaliyeNo,
              cariKod,
              selectedDate,
              siparisBaglantili
            }}
          />
        ) : showSiparisBaglantiliForm && !showSiparisBaglantiliForm2 ? (
          <IrsaliyeFaturaGirisiSiparisBaglantiliForm 
            irsaliyeNo={formData?.irsaliyeNo || ''}
            cariKod={formData?.cariKod || ''}
            selectedDate={formData?.selectedDate?.toLocaleDateString('tr-TR') || ''}
            irsaliyeTipi={formData?.irsaliyeTipi || 'irsaliye'}
            onNext={(data) => {
              console.log('Sipariş bağlantılı form data:', data);
              setSiparisBaglantiliFormData(data);
              setShowSiparisBaglantiliForm2(true);
            }}
            onBack={() => {
              setShowSiparisBaglantiliForm(false);
            }}
          />
        ) : showSiparisBaglantiliForm2 ? (
          <IrsaliyeFaturaGirisiSiparisBaglantiliForm2
            irsaliyeNo={siparisBaglantiliFormData?.irsaliyeNo || ''}
            cariKod={siparisBaglantiliFormData?.cariKod || ''}
            selectedDate={siparisBaglantiliFormData?.selectedDate || ''}
            selectedCategoryDetails={siparisBaglantiliFormData?.selectedCategoryDetails || []}
            irsaliyeTipi={formData?.irsaliyeTipi || 'irsaliye'}
            onNext={(data) => {
              console.log('Form 2 tamamlandı:', data);
              // Ana sayfaya dön veya başka bir işlem yap
              setShowSiparisBaglantiliForm2(false);
              setShowSiparisBaglantiliForm(false);
            }}
            onBack={() => {
              setShowSiparisBaglantiliForm2(false);
            }}
          />
        ) : showSiparisBaglantisizForm ? (
          <IrsaliyeFaturaGirisiSiparisBaglantisizForm
            irsaliyeNo={formData?.irsaliyeNo || ''}
            cariKod={formData?.cariKod || ''}
            cariAdi={formData?.cariAdi || ''}
            selectedDate={formData?.selectedDate?.toLocaleDateString('tr-TR') || ''}
            irsaliyeTipi={formData?.irsaliyeTipi || 'irsaliye'}
            onNext={(data) => {
              console.log('Sipariş bağlantısız form tamamlandı:', data);
              // Ana sayfaya dön veya başka bir işlem yap
              setShowSiparisBaglantisizForm(false);
            }}
            onBack={() => {
              setShowSiparisBaglantisizForm(false);
            }}
          />
        ) : null}

       
      </ScrollView>
      
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttons={alertConfig.buttons}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}