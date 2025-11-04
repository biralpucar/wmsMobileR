// GrHeader DTOs - Backend ile eşleşen TypeScript interfaces

export interface GrHeaderDto {
  id: number;
  branchCode: string;
  projectCode?: string;
  customerCode: string;
  erpDocumentNo: string;
  documentType: string;
  documentDate: string;
  yearCode: string;
  returnCode: boolean;
  ocrSource: boolean;
  isPlanned: boolean;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
  createdDate: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
  erpIntegrationStatus?: string;
  erpErrorMessage?: string;
}

export interface CreateGrHeaderDto {
  branchCode: string;
  projectCode?: string;
  customerCode: string;
  erpDocumentNo: string;
  documentType: string;
  documentDate: string; // ISO date string
  yearCode: string;
  returnCode?: boolean;
  ocrSource?: boolean;
  isPlanned?: boolean;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
}

export interface UpdateGrHeaderDto {
  branchCode?: string;
  projectCode?: string;
  customerCode?: string;
  erpDocumentNo?: string;
  documentType?: string;
  documentDate?: string; // ISO date string
  yearCode?: string;
  returnCode?: boolean;
  ocrSource?: boolean;
  isPlanned?: boolean;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
}
