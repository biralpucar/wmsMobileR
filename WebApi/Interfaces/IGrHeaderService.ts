import { ApiResponse } from '../Models/ApiResponse';
import { GrHeaderDto, CreateGrHeaderDto, UpdateGrHeaderDto } from '../Models/GrHeaderDtos';

export interface IGrHeaderService {
  getAll(): Promise<ApiResponse<GrHeaderDto[]>>;
  getById(id: number): Promise<ApiResponse<GrHeaderDto | null>>;
  getByERPDocumentNo(erpDocumentNo: string): Promise<ApiResponse<GrHeaderDto | null>>;
  create(createDto: CreateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>>;
  update(id: number, updateDto: UpdateGrHeaderDto): Promise<ApiResponse<GrHeaderDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  getActive(): Promise<ApiResponse<GrHeaderDto[]>>;
  getByBranchCode(branchCode: string): Promise<ApiResponse<GrHeaderDto[]>>;
  getByCustomerCode(customerCode: string): Promise<ApiResponse<GrHeaderDto[]>>;
  getByDateRange(startDate: Date, endDate: Date): Promise<ApiResponse<GrHeaderDto[]>>;
}