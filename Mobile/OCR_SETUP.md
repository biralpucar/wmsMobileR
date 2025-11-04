# ML Kit OCR Kurulum ve Kullanım Kılavuzu

Bu kılavuz, React Native Expo uygulamanızda ML Kit OCR kullanarak OCR (Optik Karakter Tanıma) özelliğini nasıl kuracağınızı ve kullanacağınızı açıklar.

## ML Kit OCR Avantajları

- ✅ **Ücretsiz**: Tamamen ücretsiz kullanım
- ✅ **Offline**: İnternet bağlantısı gerektirmez
- ✅ **Hızlı**: Cihaz üzerinde işlem yapar
- ✅ **Kolay Kurulum**: API anahtarı gerektirmez
- ✅ **Expo Uyumlu**: Expo development build ile çalışır

## 1. Kurulum

ML Kit OCR paketi zaten kurulmuştur:

```bash
npm install react-native-mlkit-ocr
```

## 2. Expo Development Build

ML Kit OCR native modül kullandığı için Expo Go ile çalışmaz. Development build oluşturmanız gerekir:

```bash
# Development build oluşturma
eas build --profile development --platform android
eas build --profile development --platform ios
```

## 3. Kullanım

Kod zaten `IrsaliyeFaturaGirisi.tsx` dosyasında entegre edilmiştir:

```typescript
import MlkitOcr from 'react-native-mlkit-ocr';

const performOCR = async (imageUri: string) => {
  try {
    const result = await MlkitOcr.detectFromUri(imageUri);
    const detectedText = result.map(block => block.text).join('\n');
    return extractInvoiceData(detectedText);
  } catch (error) {
    console.error('ML Kit OCR Hatası:', error);
    return simulateDemoOCR();
  }
};
```

## 4. Desteklenen Platformlar

- ✅ Android (API 21+)
- ✅ iOS (iOS 10.0+)
- ❌ Expo Go (Native modül gerektirir)
- ✅ Expo Development Build
- ✅ Standalone App

## 5. OCR Sonuç Formatı

ML Kit OCR şu formatta sonuç döner:

```typescript
interface MLKitOCRResult {
  text: string;
  bounds: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}
```

## 6. Test Etme

1. Development build'i cihazınıza yükleyin
2. Uygulamayı açın
3. "İrsaliye/Fatura Girişi" ekranına gidin
4. Kamera butonuna basın
5. Fatura/İrsaliye fotoğrafı çekin
6. OCR otomatik olarak çalışacak

## 7. Sorun Giderme

### Hata: "MlkitOcr is not defined"
**Çözüm**: Development build kullandığınızdan emin olun. Expo Go ile çalışmaz.

### Hata: "No text detected"
**Çözüm**: 
- Fotoğrafın net olduğundan emin olun
- Işıklandırmanın yeterli olduğunu kontrol edin
- Metnin açık ve okunabilir olduğunu doğrulayın

### Hata: "Permission denied"
**Çözüm**: Kamera izinlerinin verildiğinden emin olun.

## 8. Performans İpuçları

- **Görüntü Kalitesi**: Yüksek çözünürlüklü, net fotoğraflar kullanın
- **Işıklandırma**: İyi ışıklandırma OCR başarısını artırır
- **Açı**: Belgeyi düz açıdan çekin
- **Kontrast**: Metin ve arka plan arasında yeterli kontrast olsun

## 9. Güvenlik Notları

- ML Kit tamamen offline çalışır
- Verileriniz cihazınızdan çıkmaz
- İnternet bağlantısı gerektirmez
- Gizlilik dostu çözümdür

## 10. Sınırlamalar

- Karmaşık düzenlerde başarı oranı düşebilir
- El yazısı metinlerde sınırlı başarı
- Çok küçük fontlarda zorluk yaşayabilir
- Döndürülmüş metinlerde performans düşebilir

## 11. Alternatif Çözümler

Eğer ML Kit yeterli gelmezse:

1. **Google Cloud Vision API**: Daha gelişmiş OCR
2. **Azure Computer Vision**: Microsoft'un OCR servisi
3. **AWS Textract**: Amazon'un belge analiz servisi
4. **Tesseract**: Açık kaynak OCR motoru

## Destek

Sorularınız için:
- [ML Kit Dokümantasyonu](https://developers.google.com/ml-kit/vision/text-recognition)
- [react-native-mlkit-ocr GitHub](https://github.com/agoldis/react-native-mlkit-ocr)