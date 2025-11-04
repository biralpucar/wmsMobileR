import { ApiResponse } from '../Models/ApiResponse';
import { TrImportLineDto, CreateTrImportLineDto, UpdateTrImportLineDto } from '../Models/TrImportLineDtos';

export interface ITrImportLineService {
  getAll(): Promise<ApiResponse<TrImportLineDto[]>>;
  getById(id: number): Promise<ApiResponse<TrImportLineDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<TrImportLineDto[]>>;
  getByRouteId(routeId: number): Promise<ApiResponse<TrImportLineDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<TrImportLineDto[]>>;
  getByCellCode(cellCode: string): Promise<ApiResponse<TrImportLineDto[]>>;
  getByErpOrderNo(erpOrderNo: string): Promise<ApiResponse<TrImportLineDto[]>>;
  getActive(): Promise<ApiResponse<TrImportLineDto[]>>;
  create(createDto: CreateTrImportLineDto): Promise<ApiResponse<TrImportLineDto>>;
  update(id: number, updateDto: UpdateTrImportLineDto): Promise<ApiResponse<TrImportLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}