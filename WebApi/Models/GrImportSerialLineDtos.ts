export interface GrImportSerialLineDto {
  id: number;
  importLineId: number;
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
  createdDate: Date;
  updatedDate?: Date;
  deletedDate?: Date;
  isDeleted: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateGrImportSerialLineDto {
  importLineId: number;
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

export interface UpdateGrImportSerialLineDto {
  importLineId: number;
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