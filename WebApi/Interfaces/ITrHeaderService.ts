import { ApiResponse } from '../Models/ApiResponse';
import { TrHeaderDto, CreateTrHeaderDto, UpdateTrHeaderDto } from '../Models/TrHeaderDtos';

export interface ITrHeaderService {
  getAll(): Promise<ApiResponse<TrHeaderDto[]>>;
  getById(id: number): Promise<ApiResponse<TrHeaderDto>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<TrHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<TrHeaderDto[]>>;
  getActive(): Promise<ApiResponse<TrHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<TrHeaderDto[]>>;
  getByDocumentType(documentType: string): Promise<ApiResponse<TrHeaderDto[]>>;
  create(createDto: CreateTrHeaderDto): Promise<ApiResponse<TrHeaderDto>>;
  update(id: number, updateDto: UpdateTrHeaderDto): Promise<ApiResponse<TrHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
}