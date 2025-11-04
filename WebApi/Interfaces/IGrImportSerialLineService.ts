import { ApiResponse } from '../Models/ApiResponse';
import { GrImportSerialLineDto, CreateGrImportSerialLineDto, UpdateGrImportSerialLineDto } from '../Models/GrImportSerialLineDtos';

export interface IGrImportSerialLineService {
  getAll(): Promise<ApiResponse<GrImportSerialLineDto[]>>;
  getById(id: number): Promise<ApiResponse<GrImportSerialLineDto>>;
  getByImportLineId(importLineId: number): Promise<ApiResponse<GrImportSerialLineDto[]>>;
  create(createDto: CreateGrImportSerialLineDto): Promise<ApiResponse<GrImportSerialLineDto>>;
  update(id: number, updateDto: UpdateGrImportSerialLineDto): Promise<ApiResponse<GrImportSerialLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}