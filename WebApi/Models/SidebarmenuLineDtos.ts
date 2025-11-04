export interface SidebarmenuLineDto {
  id: number;
  headerId: number;
  page: string;
  title: string;
  description?: string;
  icon?: string;
  createdDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  
  // Full user information properties
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateSidebarmenuLineDto {
  headerId: number;
  page: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface UpdateSidebarmenuLineDto {
  headerId?: number;
  page?: string;
  title?: string;
  description?: string;
  icon?: string;
}