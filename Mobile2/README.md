# WMS Mobile V2 - Depo Yönetim Sistemi

Sıfırdan yazılan React Native Expo tabanlı depo yönetim mobil uygulaması.

## 🚀 Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start

# Android'de çalıştır
npm run android

# iOS'ta çalıştır  
npm run ios

# Web'de çalıştır
npm run web
```

## 📁 Proje Yapısı

```
Mobile2/
├── app/              # Expo Router ekranları
│   ├── index.tsx     # Ana yönlendirme
│   ├── login.tsx     # Giriş ekranı
│   └── home.tsx      # Ana sayfa
├── config/           # Yapılandırma dosyaları
│   └── apiConfig.ts  # API URL ve endpoint'ler
├── services/         # API servisleri
│   └── AuthService.ts # Authentication servisi
├── types/            # TypeScript type tanımları
│   ├── ApiResponse.ts
│   └── Auth.ts
└── assets/           # Görseller ve ikonlar
```

## 🔌 API Entegrasyonu

- Base URL: `http://92.205.188.223:5000/api`
- Authentication: `POST /auth/login`
- JWT Token tabanlı kimlik doğrulama

## 🎨 Teknoloji Stack

- **Framework**: Expo ~53
- **Routing**: Expo Router ~5
- **Styling**: StyleSheet (Native) - NativeWind removed for compatibility
- **HTTP**: Axios
- **Storage**: AsyncStorage
- **Language**: TypeScript

## 📱 Özellikler

- ✅ Login/Logout
- ✅ JWT Token yönetimi
- ✅ User Profile
- ✅ Dashboard with Menus
- ✅ Navigation sistemi
- ✅ Responsive UI
- 🔜 Mal Kabul işlemleri
- 🔜 Transfer işlemleri
- 🔜 Sayım işlemleri

## ⚠️ Known Issues

- **SDK 53**: Project uses SDK 53, but latest Expo Go requires SDK 54+
- **Mobile Testing**: Use `npm run web` for testing, or upgrade to SDK 54

