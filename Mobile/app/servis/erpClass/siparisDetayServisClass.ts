// Sipariş Detay API Class ve Interface Tanımları
// Sipariş detayları veri modeli ve ilgili tipler

export interface erpSiparisDetay {
  STOK_KODU: string;                    // varchar(35), NOT NULL
  KALAN_MIKTAR?: number;                // decimal(29,8), NULL
  DEPO_KODU?: number;                   // smallint, NULL
  DEPO_ISMI?: string;                   // varchar(20), NULL
  STOK_ADI?: string;                    // varchar(100), NULL
  GIRIS_SERI: string;                   // char(1), NOT NULL
  SERI_MIK: string;                     // char(1), NOT NULL
}

// API Response tipi
export interface SiparisDetayApiResponse {
  success: boolean;
  data: erpSiparisDetay[];
  message?: string;
  error?: string;
}

// Axios ile gelen API Response formatı
export interface AxiosSiparisDetayApiResponse {
  success: boolean;
  message?: string;
  data: {
    totalCount?: number;
    items: erpSiparisDetay[];
  };
  error?: string;
}

// Axios Request Config
export interface SiparisDetayAxiosConfig {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

// Sipariş detay arama sonucu
export interface SiparisDetaySearchResult {
  siparisDetaylar: erpSiparisDetay[];
  totalCount: number;
  filteredCount: number;
}