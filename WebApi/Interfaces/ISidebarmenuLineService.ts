import { ApiResponse } from '../Models/ApiResponse';
import { SidebarmenuLineDto, CreateSidebarmenuLineDto, UpdateSidebarmenuLineDto } from '../Models/SidebarmenuLineDtos';

export interface ISidebarmenuLineService {
  getAll(): Promise<ApiResponse<SidebarmenuLineDto[]>>;
  getById(id: number): Promise<ApiResponse<SidebarmenuLineDto>>;
  create(createDto: CreateSidebarmenuLineDto): Promise<ApiResponse<SidebarmenuLineDto>>;
  update(id: number, updateDto: UpdateSidebarmenuLineDto): Promise<ApiResponse<SidebarmenuLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<SidebarmenuLineDto[]>>;
  getByPage(page: string): Promise<ApiResponse<SidebarmenuLineDto>>;
}