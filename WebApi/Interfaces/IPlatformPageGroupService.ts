import { ApiResponse } from '../Models/ApiResponse';
import { PlatformPageGroupDto, CreatePlatformPageGroupDto, UpdatePlatformPageGroupDto } from '../Models/PlatformPageGroupDtos';

export interface IPlatformPageGroupService {
  getAll(): Promise<ApiResponse<PlatformPageGroupDto[]>>;
  getById(id: number): Promise<ApiResponse<PlatformPageGroupDto>>;
  create(createDto: CreatePlatformPageGroupDto): Promise<ApiResponse<PlatformPageGroupDto>>;
  update(id: number, updateDto: UpdatePlatformPageGroupDto): Promise<ApiResponse<PlatformPageGroupDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
  getByGroupCode(groupCode: string): Promise<ApiResponse<PlatformPageGroupDto[]>>;
  getByMenuHeaderId(menuHeaderId: number): Promise<ApiResponse<PlatformPageGroupDto[]>>;
  getByMenuLineId(menuLineId: number): Promise<ApiResponse<PlatformPageGroupDto[]>>;
  getPageGroupsGroupByGroupCode(): Promise<ApiResponse<PlatformPageGroupDto[]>>;
}