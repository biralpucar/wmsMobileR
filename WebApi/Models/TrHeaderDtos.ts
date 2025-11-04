export interface TrHeaderDto {
  id: number;
  branchCode: string;
  projectCode?: string;
  documentNo: string;
  documentDate: string;
  documentType: string;
  customerCode?: string;
  customerName?: string;
  sourceWarehouse?: string;
  targetWarehouse?: string;
  priority?: string;
  yearCode: string;
  description1?: string;
  description2?: string;
  priorityLevel?: number;
  type: number;
  createdBy?: string;
  createdDate: string;
  updatedBy?: string;
  updatedDate?: string;
  isDeleted: boolean;
  deletedBy?: string;
  deletedDate?: string;
  
  // BaseHeaderEntity properties
  completionDate?: string;
  isCompleted: boolean;
  isPendingApproval: boolean;
  approvalStatus?: boolean;
  approvedByUserId?: number;
  approvalDate?: string;
  isERPIntegrated: boolean;
  erpReferenceNumber?: string;
  erpIntegrationDate?: string;
  erpIntegrationStatus?: string;
  erpErrorMessage?: string;

  // Full user information properties
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateTrHeaderDto {
  branchCode: string;
  projectCode?: string;
  documentNo: string;
  documentDate: string;
  documentType: string;
  customerCode?: string;
  customerName?: string;
  sourceWarehouse?: string;
  targetWarehouse?: string;
  priority?: string;
  yearCode: string;
  description1?: string;
  description2?: string;
  priorityLevel?: number;
  type: number;
}

export interface UpdateTrHeaderDto {
  branchCode?: string;
  projectCode?: string;
  documentNo?: string;
  documentDate?: string;
  documentType?: string;
  customerCode?: string;
  customerName?: string;
  sourceWarehouse?: string;
  targetWarehouse?: string;
  priority?: string;
  yearCode?: string;
  description1?: string;
  description2?: string;
  priorityLevel?: number;
  type?: number;
}