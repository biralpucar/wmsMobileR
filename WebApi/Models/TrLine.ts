import { BaseEntity } from './BaseEntity';
import { TrHeader } from './TrHeader';
import { TrRoute } from './TrRoute';
import { TrImportLine } from './TrImportLine';
import { TrTerminalLine } from './TrTerminalLine';

export interface TrLine extends BaseEntity {
  // Header ilişkisi
  headerId: number;
  header?: TrHeader;
  
  // Ürün bilgileri
  stockCode: string;
  orderId?: number;
  quantity: number;
  unit?: string;
  
  // ERP alanları
  erpOrderNo?: string;
  erpOrderLineNo?: string;
  erpLineReference?: string;
  description?: string;
  
  // Navigation properties
  routes?: TrRoute[];
  importLines?: TrImportLine[];
  terminalLines?: TrTerminalLine[];
}