import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IErpService } from '../Interfaces/IErpService';
import { ApiResponse } from '../Models/ApiResponse';
import { 
  OnHandQuantityDto, 
  CariDto, 
  StokDto, 
  DepoDto, 
  ProjeDto, 
  OpenGoodsForOrderByCustomerDto, 
  OpenGoodsForOrderDetailDto 
} from '../Models/ErpTypes';

const api = axios.create({
  baseURL: API_BASE_URL + "/Erp",
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config : AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class ErpService implements IErpService {
  async getOnHandQuantityById(depoKodu?: number, stokKodu?: string, seriNo?: string, projeKodu?: string): Promise<ApiResponse<OnHandQuantityDto | null>> {
    try {
      const params = new URLSearchParams();
      if (depoKodu !== undefined) params.append('depoKodu', depoKodu.toString());
      if (stokKodu) params.append('stokKodu', stokKodu);
      if (seriNo) params.append('seriNo', seriNo);
      if (projeKodu) params.append('projeKodu', projeKodu);

      const response = await api.get<ApiResponse<OnHandQuantityDto | null>>(`/get-onhand-quantity-by-id/${depoKodu}/${stokKodu}/${seriNo}/${projeKodu}?${params.toString()}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<OnHandQuantityDto | null>(error);
    }
  }

  async getCaris(): Promise<ApiResponse<CariDto[]>> {
    try {
      const response = await api.get<ApiResponse<CariDto[]>>('/getCari');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<CariDto[]>(error);
    }
  }

  async getStoks(): Promise<ApiResponse<StokDto[]>> {
    try {
      const response = await api.get<ApiResponse<StokDto[]>>('/getStoks');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<StokDto[]>(error);
    }
  }

  async getDepos(): Promise<ApiResponse<DepoDto[]>> {
    try {
      const response = await api.get<ApiResponse<DepoDto[]>>('/getDepos');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<DepoDto[]>(error);
    }
  }

  async getProjeler(): Promise<ApiResponse<ProjeDto[]>> {
    try {
      const response = await api.get<ApiResponse<ProjeDto[]>>('/getProjeler');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<ProjeDto[]>(error);
    }
  }

  async getOpenGoodsForOrderByCustomerById(cariKodu: string): Promise<ApiResponse<OpenGoodsForOrderByCustomerDto | null>> {
    try {
      const response = await api.get<ApiResponse<OpenGoodsForOrderByCustomerDto | null>>(`/get-open-goods-for-order-by-customer-by-id/${cariKodu}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<OpenGoodsForOrderByCustomerDto | null>(error);
    }
  }

  async getOpenGoodsForOrderDetailsByOrderNumber(orderNumber: string): Promise<ApiResponse<OpenGoodsForOrderDetailDto[]>> {
    try {
      const response = await api.get<ApiResponse<OpenGoodsForOrderDetailDto[]>>(`/get-open-goods-for-order-details-by-order-number/${orderNumber}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<OpenGoodsForOrderDetailDto[]>(error);
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await api.get<boolean>('/health-check');
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<boolean>(error);
    }
  }

}

