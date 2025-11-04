import { ApiResponse } from '../Models/ApiResponse';
import { TrLineDto, CreateTrLineDto, UpdateTrLineDto } from '../Models/TrLineDtos';

export interface ITrLineService {
  getAll(): Promise<ApiResponse<TrLineDto[]>>;
  getById(id: number): Promise<ApiResponse<TrLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<TrLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<TrLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<TrLineDto[]>>;
  getActive(): Promise<ApiResponse<TrLineDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<TrLineDto[]>>;
  create(createDto: CreateTrLineDto): Promise<ApiResponse<TrLineDto>>;
  update(id: number, updateDto: UpdateTrLineDto): Promise<ApiResponse<TrLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}