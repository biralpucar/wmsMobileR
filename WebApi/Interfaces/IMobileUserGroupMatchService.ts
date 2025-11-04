import { ApiResponse } from '../Models/ApiResponse';
import { MobileUserGroupMatchDto, CreateMobileUserGroupMatchDto, UpdateMobileUserGroupMatchDto } from '../Models/MobileUserGroupMatchDtos';

export interface IMobileUserGroupMatchService {
  getAll(): Promise<ApiResponse<MobileUserGroupMatchDto[]>>;
  getById(id: number): Promise<ApiResponse<MobileUserGroupMatchDto>>;
  getByUserId(userId: number): Promise<ApiResponse<MobileUserGroupMatchDto[]>>;
  getByGroupCode(groupCode: string): Promise<ApiResponse<MobileUserGroupMatchDto[]>>;
  create(createDto: CreateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>>;
  update(id: number, updateDto: UpdateMobileUserGroupMatchDto): Promise<ApiResponse<MobileUserGroupMatchDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  getActive(): Promise<ApiResponse<MobileUserGroupMatchDto[]>>;
}