import { ApiResponse } from '../Models/ApiResponse';
import { TrBoxDto, CreateTrBoxDto, UpdateTrBoxDto } from '../Models/TrBoxDtos';

export interface ITrBoxService {
  getAll(): Promise<ApiResponse<TrBoxDto[]>>;
  getById(id: number): Promise<ApiResponse<TrBoxDto>>;
  getByImportLineId(importLineId: number): Promise<ApiResponse<TrBoxDto[]>>;
  getByBoxNumber(boxNumber: string): Promise<ApiResponse<TrBoxDto[]>>;
  getActive(): Promise<ApiResponse<TrBoxDto[]>>;
  getByDescription(description: string): Promise<ApiResponse<TrBoxDto[]>>;
  create(createDto: CreateTrBoxDto): Promise<ApiResponse<TrBoxDto>>;
  update(id: number, updateDto: UpdateTrBoxDto): Promise<ApiResponse<TrBoxDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}