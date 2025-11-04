import { BaseHeaderEntity } from './BaseHeaderEntity';
import { GrLine } from './GrLine';
import { GrImportL } from './GrImportL';

export interface GrHeader extends BaseHeaderEntity {
  // Temel alanlar
  branchCode: string;
  projectCode?: string;
  customerCode: string;
  erpDocumentNo: string;
  documentType: string;
  documentDate: string;
  yearCode: string;
  
  // Ek özellikler
  returnCode: boolean;
  ocrSource: boolean;
  isPlanned: boolean;
  
  // Açıklama alanları
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
  
  // İlişkiler (Navigation Properties)
  lines: GrLine[];
  importLines: GrImportL[];
}