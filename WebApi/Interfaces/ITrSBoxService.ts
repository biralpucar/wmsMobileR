import { ApiResponse } from '../Models/ApiResponse';
import { TrSBoxDto, CreateTrSBoxDto, UpdateTrSBoxDto } from '../Models/TrSBoxDtos';

export interface ITrSBoxService {
  getAll(): Promise<ApiResponse<TrSBoxDto[]>>;
  getById(id: number): Promise<ApiResponse<TrSBoxDto>>;
  getByImportLineId(importLineId: number): Promise<ApiResponse<TrSBoxDto[]>>;
  getByBoxId(boxId: number): Promise<ApiResponse<TrSBoxDto[]>>;
  getBySerialNumber(serialNumber: string): Promise<ApiResponse<TrSBoxDto[]>>;
  getBySerialNo(serialNo: string): Promise<ApiResponse<TrSBoxDto[]>>;
  getActive(): Promise<ApiResponse<TrSBoxDto[]>>;
  getByDescription(description: string): Promise<ApiResponse<TrSBoxDto[]>>;
  searchByDescription(description: string): Promise<ApiResponse<TrSBoxDto[]>>;
  create(createDto: CreateTrSBoxDto): Promise<ApiResponse<TrSBoxDto>>;
  update(id: number, updateDto: UpdateTrSBoxDto): Promise<ApiResponse<TrSBoxDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}