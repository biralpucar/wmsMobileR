import { ApiResponse } from '../Models/ApiResponse';
import { GrLineDto, CreateGrLineDto, UpdateGrLineDto } from '../Models/GrLineDtos';

export interface IGrLineService {
  getAll(): Promise<ApiResponse<GrLineDto[]>>;
  getById(id: number): Promise<ApiResponse<GrLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<GrLineDto[]>>;
  create(createDto: CreateGrLineDto): Promise<ApiResponse<GrLineDto>>;
  update(id: number, updateDto: UpdateGrLineDto): Promise<ApiResponse<GrLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}