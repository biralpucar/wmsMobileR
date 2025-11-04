import { BaseEntity } from './BaseEntity';
import { TrImportLine } from './TrImportLine';
import { TrBox } from './TrBox';

export interface TrSBox extends BaseEntity {
  // ImportLine ilişkisi
  importLineId: number;
  importLine?: TrImportLine;
  
  // Box ilişkisi
  boxId: number;
  box?: TrBox;
  
  // Kutu bilgileri
  boxNo: string;
  boxCode: string;
  serialNumber: string;
  stockCode: string;
  
  // Açıklamalar
  description: string;
  description1?: string;
  description2?: string;
}