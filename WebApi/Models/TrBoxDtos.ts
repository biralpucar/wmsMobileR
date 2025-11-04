export interface TrBoxDto {
  id: number;
  importLineId: number;
  boxNo: string;
  boxNumber: string;
  boxCode?: string;
  boxType?: string;
  quantity?: number;
  weight?: number;
  volume?: number;
  description?: string;
  description1?: string;
  description2?: string;
  createdBy?: number;
  createdDate: string;
  updatedBy?: number;
  updatedDate?: string;
  isDeleted: boolean;
  deletedBy?: number;
  deletedDate?: string;
  
  // Full user information properties
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateTrBoxDto {
  importLineId: number;
  boxNo: string;
  boxNumber: string;
  boxCode?: string;
  boxType?: string;
  quantity?: number;
  weight?: number;
  volume?: number;
  description?: string;
  description1?: string;
  description2?: string;
}

export interface UpdateTrBoxDto {
  importLineId?: number;
  boxNo?: string;
  boxNumber?: string;
  boxCode?: string;
  boxType?: string;
  quantity?: number;
  weight?: number;
  volume?: number;
  description?: string;
  description1?: string;
  description2?: string;
}