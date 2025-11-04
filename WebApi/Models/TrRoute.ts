import { BaseEntity } from './BaseEntity';
import { TrLine } from './TrLine';
import { TrImportLine } from './TrImportLine';

export interface TrRoute extends BaseEntity {
  // Line ilişkisi
  lineId: number;
  line?: TrLine;
  
  // Ürün bilgileri
  stockCode: string;
  routeCode: string;
  quantity: number;
  
  // Seri bilgileri
  serialNo?: string;
  serialNo2?: string;
  
  // Lokasyon detayları
  sourceWarehouse?: number;
  targetWarehouse?: number;
  sourceCellCode?: string;
  targetCellCode?: string;
  
  // Öncelik ve açıklama
  priority: number;
  description?: string;
  
  // Navigation properties
  importLines?: TrImportLine[];
}