export interface MobilemenuLineDto {
  id: number;
  headerId: number;
  menuName: string;
  menuCode: string;
  menuIcon?: string;
  menuUrl?: string;
  orderNo?: number;
  isActive: boolean;
  createdDate: string;
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

export interface CreateMobilemenuLineDto {
  itemId: string;
  title: string;
  icon?: string;
  description?: string;
  headerId: number;
  createdBy?: string;
}

export interface UpdateMobilemenuLineDto {
  itemId?: string;
  title?: string;
  icon?: string;
  description?: string;
  headerId?: number;
  updatedBy?: string;
}