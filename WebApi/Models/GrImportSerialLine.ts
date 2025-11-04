import { BaseEntity } from './BaseEntity';
import { GrImportL } from './GrImportL';

export interface GrImportSerialLine extends BaseEntity {
  importLineId: number;
  importLine?: GrImportL;
  
  serialNumber: string;
  quantity: number;
  targetWarehouse: number;
  targetCellCode?: string;
  scannedBarcode: string;
  serialNumber2?: string;
  serialNumber3?: string;
  serialNumber4?: string;
  description1?: string;
  description2?: string;
}