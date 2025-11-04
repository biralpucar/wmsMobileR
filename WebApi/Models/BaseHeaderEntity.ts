import { BaseEntity } from './BaseEntity';

export interface BaseHeaderEntity extends BaseEntity {
  // Completion Date (specific)
  completionDate?: string;
  isCompleted: boolean;
  
  // Approval Fields (ERP specific)
  isPendingApproval: boolean;
  approvalStatus?: boolean; // true = Approved, false = Rejected, null = Pending
  approvedByUserId?: number;
  approvalDate?: string;
  isERPIntegrated: boolean;
  
  // ERP Integration Fields
  erpReferenceNumber?: string;
  erpIntegrationDate?: string;
  erpIntegrationStatus?: string;
  erpErrorMessage?: string;
}