// Mal Kabul Sipariş API Class ve Interface Tanımları
// Açık siparişler veri modeli ve ilgili tipler

export interface erpMalKabulSiparis {
  FATIRS_NO: string;                    // varchar(15), NOT NULL
  TARIH: Date;                          // datetime, NOT NULL
  BRUTTUTAR?: number;                   // decimal(28,8), NULL
}

// API Response tipi
export interface MalKabulSiparisApiResponse {
  success: boolean;
  data: erpMalKabulSiparis[];
  message?: string;
  error?: string;
}

// Axios ile gelen API Response formatı
export interface AxiosMalKabulSiparisApiResponse {
  success: boolean;
  message?: string;
  data: {
    totalCount?: number;
    items: erpMalKabulSiparis[];
  };
  error?: string;
}

// Axios Request Config
export interface MalKabulSiparisAxiosConfig {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

// Mal kabul sipariş arama sonucu
export interface MalKabulSiparisSearchResult {
  siparisler: erpMalKabulSiparis[];
  totalCount: number;
  filteredCount: number;
}