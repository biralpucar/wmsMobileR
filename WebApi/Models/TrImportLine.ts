import { BaseEntity } from './BaseEntity';
import { TrHeader } from './TrHeader';
import { TrBox } from './TrBox';
import { TrLine } from './TrLine';
import { TrRoute } from './TrRoute';

export interface TrImportLine extends BaseEntity {
  // Header ilişkisi
  headerId: number;
  header?: TrHeader;
  
  // Üst işlem (Line)
  lineId: number;
  line?: TrLine;
  
  // Route ilişkisi
  routeId?: number;
  route?: TrRoute;
  
  // Ürün bilgileri
  stockCode: string;
  serialNo?: string;
  serialNo2?: string;
  serialNo3?: string;
  serialNo4?: string;
  quantity: number;
  scannedBarkod?: string;
  
  // ERP bağlantısı
  erpOrderNumber?: string;
  erpOrderNo?: string;
  erpOrderLineNumber?: string;
  erpOrderSequence?: string;
  
  // Açıklamalar
  description1?: string;
  description2?: string;
  description?: string;
  
  // Navigation properties
  boxes?: TrBox[];
}