import { ApiResponse } from '../Models/ApiResponse';
import { SidebarmenuHeaderDto, CreateSidebarmenuHeaderDto, UpdateSidebarmenuHeaderDto } from '../Models/SidebarmenuHeaderDtos';
import { SidebarmenuHeader } from '../Models/SidebarmenuHeader';

export interface ISidebarmenuHeaderService {
  getAll(): Promise<ApiResponse<SidebarmenuHeaderDto[]>>;
  getById(id: number): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  create(createDto: CreateSidebarmenuHeaderDto): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  update(id: number, updateDto: UpdateSidebarmenuHeaderDto): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
  getByMenuKey(menuKey: string): Promise<ApiResponse<SidebarmenuHeaderDto>>;
  getByRoleLevel(roleLevel: number): Promise<ApiResponse<SidebarmenuHeaderDto[]>>;
  getSidebarmenuHeadersByUserId(userId: number): Promise<ApiResponse<SidebarmenuHeader[]>>;
}