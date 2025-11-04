export interface GrImportDocumentDto {
  id: number;
  headerId: number;
  base64: Uint8Array;
  createdDate: Date;
  updatedDate?: Date;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateGrImportDocumentDto {
  headerId: number;
  base64: Uint8Array;
}

export interface UpdateGrImportDocumentDto {
  headerId: number;
  base64: Uint8Array;
}