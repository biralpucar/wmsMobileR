import { Ionicons } from '@expo/vector-icons';
import { Camera, CameraView } from 'expo-camera';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useCustomAlert } from '../../components/CustomAlert';
import CustomTextInput from '../../components/CustomTextInput';

const SesliKomut = () => {
  const [sesliMetin, setSesliMetin] = useState<string>('');
  const [dinleniyor, setDinleniyor] = useState<boolean>(false);
  const [hazir, setHazir] = useState<boolean>(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string>('');
  const { showAlert, AlertComponent } = useCustomAlert();

  // Event listener'ları hook ile tanımlıyoruz
  useSpeechRecognitionEvent("start", () => {
    console.log('Speech recognition started');
    setDinleniyor(true);
  });

  useSpeechRecognitionEvent("end", () => {
    console.log('Speech recognition ended');
    setDinleniyor(false);
  });

  useSpeechRecognitionEvent("result", (event) => {
    console.log('Speech recognition result:', event);
    if (event.results && event.results.length > 0) {
      setSesliMetin(event.results[0].transcript);
      setHazir(true);
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.log('Speech recognition error:', event.error, event.message);
    setDinleniyor(false);
    showAlert({
      title: 'Hata',
      message: `Ses tanıma hatası: ${event.message || 'Bilinmeyen hata'}`,
      type: 'error',
      buttons: [{ text: 'Tamam', onPress: () => {} }]
    });
  });

  useEffect(() => {
    // Kamera izni iste
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    if (Platform.OS === 'web') {
      // Web platformunda ses tanıma durumunu kontrol et
      const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
      if (!available) {
        showAlert('Uyarı', 'Ses tanıma özelliği bu tarayıcıda desteklenmemektedir.');
      }
    }
  }, []);

  const startListening = async () => {
    if (Platform.OS === 'web') {
      const available = ExpoSpeechRecognitionModule.isRecognitionAvailable();
      if (!available) {
        showAlert('Uyarı', 'Ses tanıma özelliği bu tarayıcıda desteklenmemektedir.');
        return;
      }
    }

    try {
      // İzinleri kontrol et ve iste
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!result.granted) {
        showAlert('İzin Gerekli', 'Ses tanıma için mikrofon izni gereklidir.');
        return;
      }

      // Ses tanımayı başlat
      ExpoSpeechRecognitionModule.start({
        lang: "tr-TR",
        interimResults: true,
        continuous: false,
        maxAlternatives: 1,
        requiresOnDeviceRecognition: false,
        addsPunctuation: true,
      });
    } catch (e) {
      console.error('Start listening error:', e);
      showAlert('Hata', 'Ses tanıma başlatılamadı. Lütfen tekrar deneyin.');
    }
  };

  const stopListening = async () => {
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch (e) {
      console.error('Stop listening error:', e);
    }
  };

  const temizle = () => {
    setSesliMetin('');
    setHazir(false);
    setScannedData('');
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScannedData(data);
    setSesliMetin(data);
    setShowBarcodeScanner(false);
    showAlert({
      title: 'Barkod Okundu',
      message: `Tip: ${type}\nVeri: ${data}`,
      type: 'success',
      buttons: [{ text: 'Tamam', onPress: () => {} }]
    });
  };

  const openBarcodeScanner = () => {
    if (hasPermission === null) {
      showAlert({
        title: 'İzin Bekleniyor',
        message: 'Kamera izni kontrol ediliyor...',
        type: 'info',
        buttons: [{ text: 'Tamam', onPress: () => {} }]
      });
      return;
    }
    if (hasPermission === false) {
      showAlert({
        title: 'İzin Gerekli',
        message: 'Barkod okutmak için kamera izni gereklidir.',
        type: 'error',
        buttons: [{ text: 'Tamam', onPress: () => {} }]
      });
      return;
    }
    setShowBarcodeScanner(true);
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <AlertComponent />
      
      {/* Başlık */}
      <View className="mb-8">
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 bg-blue-500 rounded-xl items-center justify-center mr-4">
            <Ionicons name="mic" size={24} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Sesli Komut</Text>
        </View>
        <Text className="text-gray-600 text-base">
          Mikrofon butonuna basarak sesli komutlarınızı verebilirsiniz.
        </Text>
      </View>

      {/* Platform Bilgisi */}
      <View className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <Text className="text-blue-800 text-sm font-medium">
          📱 Platform: {Platform.OS === 'web' ? 'Web' : 'Mobil'} - Expo Speech Recognition
        </Text>
      </View>

      {/* Sesli Metin Girişi */}
      <View className="mb-6">
        <CustomTextInput
          label="Sesli Metin"
          placeholder="Sesli komutunuz burada görünecek..."
          value={sesliMetin}
          onChangeText={setSesliMetin}
          multiline={true}
          numberOfLines={4}
          icon="text-outline"
          iconColor="#3B82F6"
        />
      </View>

      {/* Barkod/QR Kod Bilgisi */}
      <View className="mb-6">
        <CustomTextInput
          label="Okutulan Barkod/QR Kod"
          value={scannedData}
          onChangeText={setScannedData}
          placeholder="Barkod okutmak için yeşil butona basın..."
          editable={true}
        />
      </View>

      {/* Durum Göstergesi */}
      {dinleniyor && (
        <View className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
          <View className="flex-row items-center">
            <View className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
            <Text className="text-green-800 font-medium">Dinleniyor...</Text>
          </View>
          <Text className="text-green-700 text-sm mt-1">
            Konuşmaya başlayabilirsiniz
          </Text>
        </View>
      )}

      {/* Kontrol Butonları */}
      <View className="flex-row space-x-4 justify-center">
        {/* Mikrofon Butonu */}
        <TouchableOpacity
          className={`w-20 h-20 rounded-full items-center justify-center shadow-lg ${
            dinleniyor ? 'bg-red-500' : 'bg-blue-500'
          }`}
          onPress={dinleniyor ? stopListening : startListening}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={dinleniyor ? "stop" : "mic"} 
            size={32} 
            color="white" 
          />
        </TouchableOpacity>

        {/* Barkod Okut Butonu */}
        <TouchableOpacity
          className="w-20 h-20 rounded-full items-center justify-center shadow-lg bg-green-500"
          onPress={openBarcodeScanner}
          activeOpacity={0.8}
        >
          <Ionicons name="barcode-outline" size={32} color="white" />
        </TouchableOpacity>

        {/* Temizle Butonu */}
        <TouchableOpacity
          className="w-20 h-20 rounded-full items-center justify-center shadow-lg bg-red-500"
          onPress={temizle}
          activeOpacity={0.8}
        >
          <Ionicons name="trash-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Buton Açıklamaları */}
      <View className="flex-row justify-center mt-4 space-x-6">
        <View className="items-center">
          <Text className="text-gray-600 text-sm font-medium">
            {dinleniyor ? 'Durdur' : 'Başlat'}
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-600 text-sm font-medium">Barkod Okut</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-600 text-sm font-medium">Temizle</Text>
        </View>
      </View>

      {/* Kullanım Bilgisi */}
      <View className="bg-blue-50 rounded-xl p-4 mt-8 border border-blue-200">
        <View className="flex-row items-center mb-2">
          <Ionicons name="information-circle-outline" size={20} color="#3B82F6" />
          <Text className="text-blue-800 font-medium ml-2">Kullanım Bilgisi</Text>
        </View>
        <Text className="text-blue-700 text-sm">
          • Mavi mikrofon butonuna basarak ses kaydını başlatın{'\n'}
          • Yeşil barkod butonuna basarak QR kod/barkod okutun{'\n'}
          • Konuşmanız bittiğinde kırmızı durdur butonuna basın{'\n'}
          • Metni temizlemek için çöp kutusu butonunu kullanın{'\n'}
          • Ses tanıma Türkçe dilinde çalışmaktadır{'\n'}
          • Expo Speech Recognition ve Camera kullanılmaktadır
        </Text>
      </View>

      {/* Barkod Scanner Modal */}
       <Modal
         visible={showBarcodeScanner}
         animationType="slide"
         onRequestClose={() => setShowBarcodeScanner(false)}
       >
         <View className="flex-1 bg-black">
           <CameraView
             style={{ flex: 1 }}
             facing="back"
             onBarcodeScanned={handleBarCodeScanned}
             barcodeScannerSettings={{
               barcodeTypes: ['qr', 'pdf417', 'aztec', 'ean13', 'ean8', 'upc_e', 'datamatrix', 'code128', 'code39', 'code93', 'codabar', 'itf14', 'upc_a'],
             }}
           />
           <View className="absolute top-12 left-4 right-4">
             <View className="bg-black bg-opacity-50 rounded-lg p-4">
               <Text className="text-white text-center text-lg font-medium mb-2">
                 Barkod/QR Kod Okutun
               </Text>
               <Text className="text-white text-center text-sm">
                 Kamerayı barkod veya QR koda doğrultun
               </Text>
             </View>
           </View>
           <View className="absolute bottom-12 left-4 right-4">
             <TouchableOpacity
               className="bg-red-500 rounded-full py-4 px-8 mx-auto"
               onPress={() => setShowBarcodeScanner(false)}
               activeOpacity={0.8}
             >
               <View className="flex-row items-center justify-center">
                 <Ionicons name="close" size={24} color="white" />
                 <Text className="text-white font-medium ml-2">Kapat</Text>
               </View>
             </TouchableOpacity>
           </View>
         </View>
       </Modal>
    </View>
  );
};

export default SesliKomut;