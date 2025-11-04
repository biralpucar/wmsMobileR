# GoodReceipt Functions Servisi

## 📋 Genel Bakış

Bu servis, **WMS (Warehouse Management System) depo mal kabul** işlemleri için kullanılan API servisidir. 
Backend'deki `GoodReciptFunctionsController` ile iletişim kurar ve **V3RIIWMS** veritabanından veri çeker.

## 🎯 Neden Bu Servis?

**Depo işlemleri** için artık **WMS veritabanı (V3RIIWMS)** kullanılmaktadır.
Eski `malKabulSiparisServis.ts` servisi **ERP veritabanı (V3RIICO)** kullandığı için **deprecated** olarak işaretlenmiştir.

## 📁 Dosya Yapısı

```
Mobile/app/servis/
├── baseUrl.tsx                                    # API endpoint'leri tanımı
├── erpServis/
│   ├── goodReceiptFunctionsServis.ts             # ✅ YENİ - WMS servisi
│   └── malKabulSiparisServis.ts                  # ⚠️ DEPRECATED - ERP servisi
└── erpClass/
    ├── goodReceiptFunctionsClass.ts              # ✅ YENİ - WMS interface'leri
    └── malKabulSiparisServisClass.ts             # ⚠️ DEPRECATED - ERP interface'leri
```

## 🔌 API Endpoint'leri

Backend `GoodReciptFunctionsController`:

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/GoodReciptFunctions/headers/customer/{customerCode}` | GET | Müşteri koduna göre açık sipariş başlıklarını getirir |
| `/api/GoodReciptFunctions/lines/orders/{siparisNoCsv}` | GET | Sipariş numaralarına göre açık sipariş satırlarını getirir |

## 📦 Veri Modelleri

### GoodsOpenOrdersHeader
```typescript
interface GoodsOpenOrdersHeader {
  Mode: string;                      // varchar(1), NOT NULL
  SiparisNo: string;                 // varchar(15), NOT NULL
  OrderID?: number;                  // int, nullable
  CustomerCode?: string;             // varchar(30), nullable
  CustomerName?: string;             // varchar(100), nullable
  BranchCode?: number;               // smallint, nullable
  TargetWh?: number;                 // smallint, nullable
  ProjectCode?: string;              // varchar(50), nullable
  OrderDate?: Date;                  // datetime, nullable
  OrderedQty?: number;               // decimal(18,4), nullable
  DeliveredQty?: number;             // decimal(18,4), nullable
  RemainingHamax?: number;           // decimal(18,4), nullable
  PlannedQtyAllocated: number;       // decimal(18,4), NOT NULL
  RemainingForImport?: number;       // decimal(18,4), nullable
}
```

### GoodsOpenOrdersLine
```typescript
interface GoodsOpenOrdersLine {
  Mode: string;                      // varchar(1), NOT NULL
  SiparisNo: string;                 // varchar(15), NOT NULL
  OrderID: number;                   // int, NOT NULL
  StockCode?: string;                // varchar(35), nullable
  StockName?: string;                // varchar(35), nullable
  CustomerCode?: string;             // varchar(35), nullable
  CustomerName?: string;             // varchar(100), nullable
  BranchCode: number;                // int, NOT NULL
  TargetWh?: number;                 // smallint, nullable
  ProjectCode?: string;              // varchar(50), nullable
  OrderDate?: Date;                  // datetime, nullable
  OrderedQty?: number;               // decimal(17), nullable
  DeliveredQty?: number;             // decimal(17), nullable
  RemainingHamax?: number;           // decimal(9), nullable
  PlannedQtyAllocated: number;       // decimal(17), NOT NULL
  RemainingForImport?: number;       // decimal(9), nullable
}
```

## 💻 Kullanım Örnekleri

### 1. Açık Sipariş Başlıklarını Getir

```typescript
import { getGoodsReceiptHeadersByCustomer } from '../servis/erpServis/goodReceiptFunctionsServis';

// Müşteri koduna göre açık sipariş başlıklarını getir
const result = await getGoodsReceiptHeadersByCustomer('CUSTOMER001');

if (result.success) {
  console.log(`Bulunan siparişler: ${result.data.length}`);
  result.data.forEach(header => {
    console.log(`${header.SiparisNo} - ${header.CustomerName}`);
  });
} else {
  console.error('Hata:', result.error);
}
```

### 2. Açık Sipariş Satırlarını Getir

```typescript
import { getGoodsReceiptLinesByOrders } from '../servis/erpServis/goodReceiptFunctionsServis';

// Virgülle ayrılmış sipariş numaralarını gönder
const result = await getGoodsReceiptLinesByOrders('1001,1002,1003');

if (result.success) {
  console.log(`Bulunan satırlar: ${result.data.length}`);
  result.data.forEach(line => {
    console.log(`${line.StockCode} - ${line.StockName}`);
  });
} else {
  console.error('Hata:', result.error);
}
```

## 🔄 Migration: Eski Servisten Yeni Servise

### Eski Kod (DEPRECATED)
```typescript
import { getMalKabulSiparisByCariKod } from '../servis/erpServis/malKabulSiparisServis';

const result = await getMalKabulSiparisByCariKod('CUSTOMER001');
```

### Yeni Kod (RECOMMENDED)
```typescript
import { getGoodsReceiptHeadersByCustomer } from '../servis/erpServis/goodReceiptFunctionsServis';

const result = await getGoodsReceiptHeadersByCustomer('CUSTOMER001');
```

## 🔐 Authentication

Servis, JWT token kullanır. Token `AsyncStorage`'dan otomatik olarak alınır ve `Authorization` header'ına eklenir.

## 📊 API Response Formatı

Tüm API response'ları standart `ApiResponse<T>` formatını kullanır:

```typescript
interface ApiResponse<T> {
  Success: boolean;
  Message: string;
  Data?: T;
  StatusCode: number;
  ExceptionMessage?: string;
  Errors?: string[];
  Timestamp?: string;
  ClassName?: string;
}
```

## 🗄️ Veritabanı Bilgileri

| Servis | Veritabanı | DbContext | Kullanım Amacı |
|--------|-----------|-----------|----------------|
| `goodReceiptFunctionsServis` | **V3RIIWMS** | `WmsDbContext` | ✅ Depo mal kabul işlemleri |
| `malKabulSiparisServis` (DEPRECATED) | V3RIICO | `ErpDbContext` | ⚠️ Eski ERP verisi |

## 🚀 Backend Detayları

Backend servisi `GoodReciptFunctionsService`:
- **Veritabanı**: V3RIIWMS
- **Stored Procedure**: `RII_FNC_GoodsOpenOrders_Header` ve `RII_FNC_GoodsOpenOrders_Line`
- **Controller**: `GoodReciptFunctionsController`
- **Route**: `/api/GoodReciptFunctions`

## ⚠️ Önemli Notlar

1. **DEPRECATED** servis sadece geriye dönük uyumluluk için korunmuştur
2. Yeni geliştirmelerde **mutlaka** `goodReceiptFunctionsServis` kullanılmalıdır
3. WMS ve ERP veritabanları **farklı** veri yapılarına sahiptir
4. API response formatı **tamamen uyumludur** - `ApiResponse<T>` kullanılır
5. Authentication **gerekli** - JWT token ile istek atılmalıdır

## 📝 Changelog

### v2.0.0 (Current)
- ✅ Yeni `goodReceiptFunctionsServis` servisi eklendi
- ✅ WMS veritabanı entegrasyonu tamamlandı
- ⚠️ Eski `malKabulSiparisServis` deprecated olarak işaretlendi
- ✅ API response formatı standardize edildi

### v1.0.0
- Eski ERP tabanlı servis implementasyonu


