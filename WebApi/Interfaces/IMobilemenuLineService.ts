import { ApiResponse } from '../Models/ApiResponse';
import { MobilemenuLineDto, CreateMobilemenuLineDto, UpdateMobilemenuLineDto } from '../Models/MobilemenuLineDtos';

export interface IMobilemenuLineService {
  getAll(): Promise<ApiResponse<MobilemenuLineDto[]>>;
  getById(id: number): Promise<ApiResponse<MobilemenuLineDto>>;
  getByItemId(itemId: string): Promise<ApiResponse<MobilemenuLineDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<MobilemenuLineDto[]>>;
  getByTitle(title: string): Promise<ApiResponse<MobilemenuLineDto[]>>;
  create(createDto: CreateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>>;
  update(id: number, updateDto: UpdateMobilemenuLineDto): Promise<ApiResponse<MobilemenuLineDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  getActive(): Promise<ApiResponse<MobilemenuLineDto[]>>;
  getPaginated(page?: number, pageSize?: number, searchTerm?: string): Promise<ApiResponse<{
    data: MobilemenuLineDto[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
  isItemIdUnique(itemId: string, excludeId?: number): Promise<ApiResponse<boolean>>;
  getOrderedBySequence(headerId: number, orderBy?: 'asc' | 'desc'): Promise<ApiResponse<MobilemenuLineDto[]>>;
}