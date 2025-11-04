import { BaseHeaderEntity } from './BaseHeaderEntity';

export interface TrHeader extends BaseHeaderEntity {
  branchCode: string;
  projectCode?: string;
  documentNo: string;
  documentDate: Date;
  documentType: string;
  customerCode?: string;
  customerName?: string;
  sourceWarehouse?: string;
  targetWarehouse?: string;
  priority?: string;
  yearCode: string;
  
  // Açıklamalar
  description1?: string;
  description2?: string;
  
  // Öncelik ve tür
  priorityLevel?: number;
  type: number;
  
  // Navigation properties
  lines?: TrLine[]; // Forward reference - will be updated when TrLine is created
  importLines?: TrImportLine[]; // Forward reference - will be updated when TrImportLine is created
}

// Forward declarations - will be replaced with actual imports when those models are created
export interface TrLine extends BaseHeaderEntity {
  headerId: number;
  stockCode: string;
  quantity: number;
}

export interface TrImportLine extends BaseHeaderEntity {
  headerId: number;
  stockCode: string;
  quantity: number;
}