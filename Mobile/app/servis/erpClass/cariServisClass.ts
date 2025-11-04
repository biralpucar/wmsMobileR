// Cari API Class ve Interface Tanımları
// CksCari veri modeli ve ilgili tipler

export interface erpCari {
  SUBE_KODU?: number;
  ISLETME_KODU?: number;
  CARI_KOD?: string;
  CARI_TEL?: string;
  CARI_IL?: string;
  ULKE_KODU?: string;
  CARI_ISIM?: string;
  CARI_TIP?: string;
  GRUP_KODU?: string;
  RAPOR_KODU1?: string;
  RAPOR_KODU2?: string;
  RAPOR_KODU3?: string;
  RAPOR_KODU4?: string;
  RAPOR_KODU5?: string;
  CARI_ADRES?: string;
  CARI_ILCE?: string;
  VERGI_DAIRESI?: string;
  VERGI_NUMARASI?: string;
  FAX?: string;
  POSTAKODU?: string;
  DETAY_KODU?: number;
  NAKLIYE_KATSAYISI?: number;
  RISK_SINIRI?: number;
  TEMINATI?: number;
  CARISK?: number;
  CCRISK?: number;
  SARISK?: number;
  SCRISK?: number;
  CM_BORCT?: number;
  CM_ALACT?: number;
  CM_RAP_TARIH?: Date;
  KOSULKODU?: string;
  ISKONTO_ORANI?: number;
  VADE_GUNU?: number;
  LISTE_FIATI?: number;
  ACIK1?: string;
  ACIK2?: string;
  ACIK3?: string;
  M_KOD?: string;
  DOVIZ_TIPI?: number;
  DOVIZ_TURU?: number;
  HESAPTUTMASEKLI?: string;
  DOVIZLIMI?: string;
  UPDATE_KODU?: string;
  PLASIYER_KODU?: string;
  LOKALDEPO?: number;
  EMAIL?: string;
  WEB?: string;
  KURFARKIBORC?: string;
  KURFARKIALAC?: string;
  S_YEDEK1?: string;
  S_YEDEK2?: string;
  F_YEDEK1?: number;
  F_YEDEK2?: number;
  C_YEDEK1?: string;
  C_YEDEK2?: string;
  B_YEDEK1?: number;
  I_YEDEK1?: number;
  L_YEDEK1?: number;
  FIYATGRUBU?: string;
  KAYITYAPANKUL?: string;
  KAYITTARIHI?: Date;
  DUZELTMEYAPANKUL?: string;
  DUZELTMETARIHI?: Date;
  ODEMETIPI?: number;
  ONAYTIPI?: string;
  ONAYNUM?: number;
  MUSTERIBAZIKDV?: string;
  AGIRLIK_ISK?: number;
  CARI_TEL2?: string;
  CARI_TEL3?: string;
  FAX2?: string;
  GSM1?: string;
  GSM2?: string;
  GEKAPHESAPLANMASIN?: string;
  ONCEKI_KOD?: string;
  SONRAKI_KOD?: string;
  SONCARIKODU?: string;
  TESLIMCARIBAGLIMI?: string;
  BAGLICARIKOD?: string;
  FABRIKA_KODU?: string;
  NAKLIYE_SURESI?: number;
  TESLIMAT_PERIYOD_TIPI?: string;
  TESLIMAT_GUNU?: number;
  TESLIMAT_EXTRAINFO?: string;
  TCKIMLIKNO?: string;
}

// API Response tipi
export interface CariApiResponse {
  success: boolean;
  data: erpCari[];
  message?: string;
  error?: string;
}

// Axios ile gelen API Response formatı
export interface AxiosCariApiResponse {
  success: boolean;
  message?: string;
  data: {
    totalCount?: number;
    items: erpCari[];
  };
  error?: string;
}

// Cari filtreleme parametreleri
export interface CariFilterParams {
  cariKod?: string;
  cariIsim?: string;
  grupKodu?: string;
  cariTip?: string;
  vergiNumarasi?: string;
  email?: string;
  telefon?: string;
}

// Axios Request Config
export interface CariAxiosConfig {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

// Cari arama sonucu
export interface CariSearchResult {
  cariler: erpCari[];
  totalCount: number;
  filteredCount: number;
}