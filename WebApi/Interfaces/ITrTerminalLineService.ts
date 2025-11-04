import { ApiResponse } from '../Models/ApiResponse';
import { TrTerminalLineDto, CreateTrTerminalLineDto, UpdateTrTerminalLineDto } from '../Models/TrTerminalLineDtos';

export interface ITrTerminalLineService {
  getAll(): Promise<ApiResponse<TrTerminalLineDto[]>>;
  getById(id: number): Promise<ApiResponse<TrTerminalLineDto>>;
  getByLineId(lineId: number): Promise<ApiResponse<TrTerminalLineDto[]>>;
  getByRouteId(routeId: number): Promise<ApiResponse<TrTerminalLineDto[]>>;
  getByUserId(userId: string): Promise<ApiResponse<TrTerminalLineDto[]>>;
  getByTerminalCode(terminalCode: string): Promise<ApiResponse<TrTerminalLineDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<TrTerminalLineDto[]>>;
  getByStatus(status: string): Promise<ApiResponse<TrTerminalLineDto[]>>;
  getActive(): Promise<ApiResponse<TrTerminalLineDto[]>>;
  create(createDto: CreateTrTerminalLineDto): Promise<ApiResponse<TrTerminalLineDto>>;
  update(id: number, updateDto: UpdateTrTerminalLineDto): Promise<ApiResponse<TrTerminalLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}