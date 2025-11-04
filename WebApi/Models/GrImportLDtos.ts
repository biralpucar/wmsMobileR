export interface GrImportLDto {
  id: number;
  lineId?: number;
  headerId: number;
  stockCode: string;
  description1?: string;
  description2?: string;
  createdDate: Date;
  updatedDate?: Date;
  createdBy?: string;
  deletedDate?: Date;
  updatedBy?: string;
  deletedBy?: string;
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateGrImportLDto {
  lineId?: number;
  headerId: number;
  stockCode: string;
  description1?: string;
  description2?: string;
  createdBy?: string;
}

export interface UpdateGrImportLDto {
  lineId?: number;
  headerId: number;
  stockCode: string;
  description1?: string;
  description2?: string;
  updatedBy?: string;
}