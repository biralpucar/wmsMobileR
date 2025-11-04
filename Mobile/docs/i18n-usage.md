# i18n (Çok Dilli Destek) Kullanım Kılavuzu

## Kurulum

Projeye i18n desteği başarıyla eklenmiştir. Aşağıdaki paketler kurulmuştur:

- `react-i18next`: React Native için i18n kütüphanesi
- `i18next`: Ana i18n kütüphanesi
- `@react-native-async-storage/async-storage`: Dil tercihini kaydetmek için

## Dosya Yapısı

```
i18n/
├── index.ts                 # Ana i18n yapılandırması
└── locales/
    ├── tr.json             # Türkçe çeviriler
    └── en.json             # İngilizce çeviriler

hooks/
└── useLanguage.ts          # Dil yönetimi hook'u

components/
└── LanguageSelector.tsx    # Dil seçici bileşeni
```

## Kullanım

### 1. Bileşenlerde Çeviri Kullanma

```tsx
import { useLanguage } from '@/hooks/useLanguage';

function MyComponent() {
  const { t } = useLanguage();

  return (
    <Text>{t('welcome')}</Text>
  );
}
```

### 2. Dil Değiştirme

```tsx
import { useLanguage } from '@/hooks/useLanguage';

function MyComponent() {
  const { changeLanguage, currentLanguage } = useLanguage();

  const handleLanguageChange = () => {
    changeLanguage(currentLanguage === 'tr' ? 'en' : 'tr');
  };

  return (
    <TouchableOpacity onPress={handleLanguageChange}>
      <Text>Dil Değiştir</Text>
    </TouchableOpacity>
  );
}
```

### 3. Dil Seçici Bileşeni Kullanma

```tsx
import { LanguageSelector } from '@/components/LanguageSelector';

function SettingsScreen() {
  return (
    <View>
      <LanguageSelector />
    </View>
  );
}
```

## Yeni Çeviri Ekleme

### 1. Türkçe çeviri ekleme (`i18n/locales/tr.json`):

```json
{
  "new_key": "Yeni çeviri",
  "nested": {
    "key": "İç içe çeviri"
  }
}
```

### 2. İngilizce çeviri ekleme (`i18n/locales/en.json`):

```json
{
  "new_key": "New translation",
  "nested": {
    "key": "Nested translation"
  }
}
```

### 3. Kullanım:

```tsx
const { t } = useLanguage();

// Basit kullanım
<Text>{t('new_key')}</Text>

// İç içe kullanım
<Text>{t('nested.key')}</Text>
```

## Mevcut Çeviriler

Aşağıdaki çeviriler hazır olarak gelir:

- `welcome`: Hoş geldiniz / Welcome
- `hello`: Merhaba / Hello
- `save`: Kaydet / Save
- `cancel`: İptal / Cancel
- `delete`: Sil / Delete
- `edit`: Düzenle / Edit
- `add`: Ekle / Add
- `search`: Ara / Search
- `loading`: Yükleniyor... / Loading...
- `error`: Hata / Error
- `success`: Başarılı / Success
- `language`: Dil / Language
- `turkish`: Türkçe / Turkish
- `english`: İngilizce / English
- `settings`: Ayarlar / Settings
- `home`: Ana Sayfa / Home
- `login`: Giriş / Login
- `logout`: Çıkış / Logout

Ve daha fazlası...

## Özellikler

- ✅ Otomatik dil algılama
- ✅ Dil tercihini kaydetme (AsyncStorage)
- ✅ Tema uyumlu dil seçici bileşeni
- ✅ TypeScript desteği
- ✅ React Native Expo uyumluluğu
- ✅ Kolay kullanım hook'u

## Yeni Dil Ekleme

1. `i18n/locales/` klasörüne yeni dil dosyası ekleyin (örn: `de.json`)
2. `i18n/index.ts` dosyasında resources'a yeni dili ekleyin
3. `components/LanguageSelector.tsx` dosyasında languages dizisine yeni dili ekleyin

## Notlar

- Dil değişiklikleri otomatik olarak AsyncStorage'a kaydedilir
- Uygulama yeniden başlatıldığında son seçilen dil yüklenir
- Varsayılan dil Türkçe'dir
- Yedek dil İngilizce'dir