// Stok Eldeki Miktar DTO
export interface OnHandQuantityDto {
  depoKodu: number;
  stokKodu?: string;
  projeKodu?: string;
  seriNo?: string;
  hucreKodu?: string;
  kaynak?: string;
  bakiye?: number;
  stokAdi?: string;
  depoIsmi?: string;
}

// Cari DTO
export interface CariDto {
  subeKodu: number;
  isletmeKodu: number;
  cariKod: string;
  cariTel?: string;
  cariIl?: string;
  ulkeKodu?: string;
  cariIsim?: string;
  cariTip?: string;
  grupKodu?: string;
  raporKodu1?: string;
  raporKodu2?: string;
  raporKodu3?: string;
  raporKodu4?: string;
  raporKodu5?: string;
  cariAdres?: string;
  cariIlce?: string;
  vergiDairesi?: string;
  vergiNumarasi?: string;
  fax?: string;
  postaKodu?: string;
  detayKodu?: number;
  nakliyeKatsayisi?: number;
  riskSiniri?: number;
  teminati?: number;
  cariRisk?: number;
  ccRisk?: number;
  saRisk?: number;
  scRisk?: number;
  cmBorct?: number;
  cmAlact?: number;
  cmRapTarih?: string;
  kosulKodu?: string;
  iskontoOrani?: number;
  vadeGunu?: number;
  listeFiati?: number;
  acik1?: string;
  acik2?: string;
  acik3?: string;
  mKod?: string;
  dovizTipi?: number;
  dovizTuru?: number;
  hesapTutmaSekli?: string;
  dovizLimi?: string;
}

// Stok DTO
export interface StokDto {
  subeKodu: number;
  isletmeKodu: number;
  stokKodu: string;
  ureticiKodu: string;
  stokAdi: string;
  grupKodu: string;
  saticiKodu: string;
  olcuBr1: string;
  olcuBr2: string;
  pay1: number;
  kod1: string;
  kod2: string;
  kod3: string;
  kod4: string;
  kod5: string;
}

export interface DepoDto {
  depoKodu: number;
  depoIsmi: string;
}

export interface ProjeDto {
  projeKod: string;
  projeAciklama: string;
}

// Müşteri Siparişi DTO
export interface OpenGoodsForOrderByCustomerDto {
  fatirsNo: string;
  tarih: string;
  brutTutar?: number;
}

// Sipariş Detay DTO
export interface OpenGoodsForOrderDetailDto {
  stokKodu: string;
  kalanMiktar?: number;
  depoKodu?: number;
  depoIsmi?: string;
  stokAdi?: string;
  girisSeri: string;
  seriMik: string;
}

// Genel API Response DTO
export interface ErpApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  totalCount: number;
}

// Sayfalama için DTO
export interface ErpPagedRequest {
  page: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  sortDescending: boolean;
}

export interface ErpPagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}