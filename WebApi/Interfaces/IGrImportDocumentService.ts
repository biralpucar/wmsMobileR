import { ApiResponse } from '../Models/ApiResponse';
import { GrImportDocumentDto, CreateGrImportDocumentDto, UpdateGrImportDocumentDto } from '../Models/GrImportDocumentDtos';

export interface IGrImportDocumentService {
  getAll(): Promise<ApiResponse<GrImportDocumentDto[]>>;
  getById(id: number): Promise<ApiResponse<GrImportDocumentDto>>;
  getByHeaderId(headerId: number): Promise<ApiResponse<GrImportDocumentDto[]>>;
  create(createDto: CreateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>>;
  update(id: number, updateDto: UpdateGrImportDocumentDto): Promise<ApiResponse<GrImportDocumentDto>>;
  softDelete(id: number): Promise<ApiResponse<boolean>>;
  exists(id: number): Promise<ApiResponse<boolean>>;
}