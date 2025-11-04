import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponseErrorHelper } from '../ApiResponseErrorHelper';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { ITRFunctionService } from '../Interfaces/ITRFunctionService';
import { ApiResponse } from '../Models/ApiResponse';
import { TransferOpenOrderHeaderDto, TransferOpenOrderLineDto } from '../Models/TRFunctionsDtos';

const api = axios.create({
  baseURL: API_BASE_URL + "/TRFunction",
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

export class TRFunctionService implements ITRFunctionService {

  async getTransferOpenOrderHeader(customerCode: string): Promise<ApiResponse<TransferOpenOrderHeaderDto[]>> {
    try {
      const response = await api.get<ApiResponse<TransferOpenOrderHeaderDto[]>>(`/transfer-open-order-header/${encodeURIComponent(customerCode)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TransferOpenOrderHeaderDto[]>(error);
    }
  }

  async getTransferOpenOrderLine(siparisNoCsv: string): Promise<ApiResponse<TransferOpenOrderLineDto[]>> {
    try {
      const response = await api.get<ApiResponse<TransferOpenOrderLineDto[]>>(`/transfer-open-order-line/${encodeURIComponent(siparisNoCsv)}`);
      return response.data;
    } catch (error) {
      return ApiResponseErrorHelper.create<TransferOpenOrderLineDto[]>(error);
    }
  }
}

