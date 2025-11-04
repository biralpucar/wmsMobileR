import { BaseEntity } from './BaseEntity';
import { GrLine } from './GrLine';
import { GrHeader } from './GrHeader';
import { GrImportSerialLine } from './GrImportSerialLine';

export interface GrImportL extends BaseEntity {
  lineId?: number;
  line?: GrLine;
  
  headerId: number;
  header?: GrHeader;
  
  stockCode: string;
  description1?: string;
  description2?: string;
  
  // Navigation property for serial lines
  serialLines?: GrImportSerialLine[];
}