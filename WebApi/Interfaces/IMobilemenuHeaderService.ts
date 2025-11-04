import { ApiResponse } from '../Models/ApiResponse';
import { MobilemenuHeaderDto, CreateMobilemenuHeaderDto, UpdateMobilemenuHeaderDto } from '../Models/MobilemenuHeaderDtos';

export interface IMobilemenuHeaderService {
  getAll(): Promise<ApiResponse<MobilemenuHeaderDto[]>>;
  getById(id: number): Promise<ApiResponse<MobilemenuHeaderDto>>;
  getByMenuId(menuId: string): Promise<ApiResponse<MobilemenuHeaderDto>>;
  getByTitle(title: string): Promise<ApiResponse<MobilemenuHeaderDto[]>>;
  getOpenMenus(): Promise<ApiResponse<MobilemenuHeaderDto[]>>;
  create(createDto: CreateMobilemenuHeaderDto): Promise<ApiResponse<MobilemenuHeaderDto>>;
  update(id: number, updateDto: UpdateMobilemenuHeaderDto): Promise<ApiResponse<MobilemenuHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  getActive(): Promise<ApiResponse<MobilemenuHeaderDto[]>>;
}