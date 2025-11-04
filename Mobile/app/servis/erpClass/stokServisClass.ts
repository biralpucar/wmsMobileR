// Stok API Class ve Interface Tanımları
// CksStok veri modeli ve ilgili tipler

export interface erpStok {
  SUBE_KODU?: number;
  ISLETME_KODU?: number;
  STOK_KODU?: string;
  URETICI_KODU?: string;
  STOK_ADI?: string;
  // API'den gelen küçük harfli versiyonlar
  subE_KODU?: number;
  isletmE_KODU?: number;
  stoK_KODU?: string;
  ureticI_KODU?: string;
  stoK_ADI?: string;
  GRUP_KODU?: string;
  KOD_1?: string;
  KOD_2?: string;
  KOD_3?: string;
  KOD_4?: string;
  KOD_5?: string;
  SATICI_KODU?: string;
  OLCU_BR1?: string;
  OLCU_BR2?: string;
  PAY_1?: number;
  PAYDA_1?: number;
  OLCU_BR3?: string;
  PAY2?: number;
  PAYDA2?: number;
  FIAT_BIRIMI?: string;
  AZAMI_STOK?: number;
  ASGARI_STOK?: number;
  TEMIN_SURESI?: number;
  KUL_MIK?: number;
  RISK_SURESI?: number;
  ZAMAN_BIRIMI?: string;
  SATIS_FIAT1?: number;
  SATIS_FIAT2?: number;
  SATIS_FIAT3?: number;
  SATIS_FIAT4?: number;
  SAT_DOV_TIP?: number;
  DOV_ALIS_FIAT?: number;
  DOV_MAL_FIAT?: number;
  DOV_SATIS_FIAT?: number;
  MUH_DETAYKODU?: number;
  BIRIM_AGIRLIK?: number;
  NAKLIYET_TUT?: number;
  KDV_ORANI?: number;
  ALIS_DOV_TIP?: number;
  DEPO_KODU?: number;
  DOV_TUR?: number;
  URET_OLCU_BR?: number;
  BILESENMI?: string;
  MAMULMU?: string;
  FORMUL_TOPLAMI?: number;
  UPDATE_KODU?: string;
  MAX_ISKONTO?: number;
  ECZACI_KARI?: number;
  MIKTAR?: number;
  MAL_FAZLASI?: number;
  KDV_TENZIL_ORAN?: number;
  KILIT?: string;
  ONCEKI_KOD?: string;
  SONRAKI_KOD?: string;
  BARKOD1?: string;
  BARKOD2?: string;
  BARKOD3?: string;
  ALIS_KDV_KODU?: number;
  ALIS_FIAT1?: number;
  ALIS_FIAT2?: number;
  ALIS_FIAT3?: number;
  ALIS_FIAT4?: number;
  LOT_SIZE?: number;
  MIN_SIP_MIKTAR?: number;
  SABIT_SIP_ARALIK?: number;
  SIP_POLITIKASI?: string;
  OZELLIK_KODU1?: number;
  OZELLIK_KODU2?: number;
  OZELLIK_KODU3?: number;
  OZELLIK_KODU4?: number;
  OZELLIK_KODU5?: number;
  OPSIYON_KODU1?: number;
  OPSIYON_KODU2?: number;
  OPSIYON_KODU3?: number;
  OPSIYON_KODU4?: number;
  OPSIYON_KODU5?: number;
  BILESEN_OP_KODU?: number;
  SIP_VER_MAL?: number;
  ELDE_BUL_MAL?: number;
  YIL_TAH_KUL_MIK?: number;
  EKON_SIP_MIKTAR?: number;
  ESKI_RECETE?: string;
  OTOMATIK_URETIM?: string;
  ALFKOD?: string;
  SAFKOD?: string;
  KODTURU?: string;
  S_YEDEK1?: string;
  S_YEDEK2?: string;
  F_YEDEK3?: number;
  F_YEDEK4?: number;
  C_YEDEK5?: string;
  C_YEDEK6?: string;
  B_YEDEK7?: number;
  I_YEDEK8?: number;
  L_YEDEK9?: number;
  D_YEDEK10?: Date;
  GIRIS_SERI?: string;
  CIKIS_SERI?: string;
  SERI_BAK?: string;
  SERI_MIK?: string;
  SERI_GIR_OT?: string;
  SERI_CIK_OT?: string;
  SERI_BASLANGIC?: string;
  FIYATKODU?: string;
  FIYATSIRASI?: number;
  PLANLANACAK?: string;
  LOT_SIZECUSTOMER?: number;
  MIN_SIP_MIKTARCUSTOMER?: number;
  GUMRUKTARIFEKODU?: string;
  ABCKODU?: string;
  PERFORMANSKODU?: string;
  SATICISIPKILIT?: string;
  MUSTERISIPKILIT?: string;
  SATINALMAKILIT?: string;
  SATISKILIT?: string;
  EN?: number;
  BOY?: number;
  GENISLIK?: number;
  SIPLIMITVAR?: string;
  SONSTOKKODU?: string;
  ONAYTIPI?: string;
  ONAYNUM?: number;
  FIKTIF_MAM?: string;
  YAPILANDIR?: string;
  SBOMVARMI?: string;
  BAGLISTOKKOD?: string;
  YAPKOD?: string;
  ALISTALTEKKILIT?: string;
  SATISTALTEKKILIT?: string;
  S_YEDEK3?: string;
  STOKMEVZUAT?: number;
  OTVTEVKIFAT?: string;
  SERIBARKOD?: string;
  ATIK_URUN?: string;
}

// API Response tipi
export interface StokApiResponse {
  success: boolean;
  data: erpStok[];
  message?: string;
  error?: string;
}

// Axios ile gelen API Response formatı
export interface AxiosStokApiResponse {
  success: boolean;
  message?: string;
  data: {
    totalCount?: number;
    items: erpStok[];
  };
  error?: string;
}

// Stok filtreleme parametreleri
export interface StokFilterParams {
  stokKodu?: string;
  stokAdi?: string;
  grupKodu?: string;
  barkod?: string;
  ureticiKodu?: string;
}

// Axios Request Config
export interface StokAxiosConfig {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

// Stok arama sonucu
export interface StokSearchResult {
  stoklar: erpStok[];
  totalCount: number;
  filteredCount: number;
}