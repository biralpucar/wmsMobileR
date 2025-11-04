import { ApiResponse } from '../Models/ApiResponse';
import { 
  OnHandQuantityDto, 
  CariDto, 
  StokDto, 
  DepoDto, 
  ProjeDto, 
  OpenGoodsForOrderByCustomerDto, 
  OpenGoodsForOrderDetailDto 
} from '../Models/ErpDtos';

export interface IErpService {
  // OnHandQuantity işlemleri
  getOnHandQuantityById(
    depoKodu?: number | null, 
    stokKodu?: string | null, 
    seriNo?: string | null, 
    projeKodu?: string | null
  ): Promise<ApiResponse<OnHandQuantityDto | null>>;

  // Cari işlemleri
  getCaris(): Promise<ApiResponse<CariDto[]>>;

  // Stok işlemleri
  getStoks(): Promise<ApiResponse<StokDto[]>>;

  // Depo işlemleri
  getDepos(): Promise<ApiResponse<DepoDto[]>>;

  // Proje işlemleri
  getProjeler(): Promise<ApiResponse<ProjeDto[]>>;

  // Müşteri siparişi işlemleri
  getOpenGoodsForOrderByCustomerById(cariKodu: string): Promise<ApiResponse<OpenGoodsForOrderByCustomerDto | null>>;

  // Sipariş detay işlemleri
  getOpenGoodsForOrderDetailsByOrderNumbers(orderNumber: string): Promise<ApiResponse<OpenGoodsForOrderDetailDto[]>>;
}