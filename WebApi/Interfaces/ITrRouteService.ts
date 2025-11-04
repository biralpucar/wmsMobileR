import { ApiResponse } from '../Models/ApiResponse';
import { TrRouteDto, CreateTrRouteDto, UpdateTrRouteDto } from '../Models/TrRouteDtos';

export interface ITrRouteService {
  getAll(): Promise<ApiResponse<TrRouteDto[]>>;
  getById(id: number): Promise<ApiResponse<TrRouteDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<TrRouteDto[]>>;
  getByStockCode(stockCode: string): Promise<ApiResponse<TrRouteDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<TrRouteDto[]>>;
  getBySourceWarehouse(sourceWarehouse: string): Promise<ApiResponse<TrRouteDto[]>>;
  getByTargetWarehouse(targetWarehouse: string): Promise<ApiResponse<TrRouteDto[]>>;
  getActive(): Promise<ApiResponse<TrRouteDto[]>>;
  getByQuantityRange(minQuantity: number, maxQuantity: number): Promise<ApiResponse<TrRouteDto[]>>;
  create(createDto: CreateTrRouteDto): Promise<ApiResponse<TrRouteDto>>;
  update(id: number, updateDto: UpdateTrRouteDto): Promise<ApiResponse<TrRouteDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}