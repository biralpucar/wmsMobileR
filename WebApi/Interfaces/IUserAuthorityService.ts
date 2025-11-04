import { ApiResponse } from '../Models/ApiResponse';
import { UserAuthorityDto, CreateUserAuthorityDto, UpdateUserAuthorityDto } from '../Models/UserAuthorityDtos';

export interface IUserAuthorityService {
  getAll(): Promise<ApiResponse<UserAuthorityDto[]>>;
  getById(id: number): Promise<ApiResponse<UserAuthorityDto>>;
  create(createDto: CreateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>>;
  update(id: number, updateDto: UpdateUserAuthorityDto): Promise<ApiResponse<UserAuthorityDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}