import { BaseEntity } from './BaseEntity';
import { TrImportLine } from './TrImportLine';
import { TrSBox } from './TrSBox';

export interface TrBox extends BaseEntity {
  // ImportLine ilişkisi
  importLineId: number;
  importLine?: TrImportLine;
  
  // Kutu bilgileri
  boxNo: string;
  boxNumber: string;
  boxCode: string;
  boxType: string;
  quantity?: number;
  weight?: number;
  volume?: number;
  
  // Açıklamalar
  description1?: string;
  description2?: string;
  description: string;
  
  // Navigation properties
  sBoxes?: TrSBox[];
}