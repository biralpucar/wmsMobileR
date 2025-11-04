export interface MobilemenuHeaderDto {
  id: number;
  menuId: string;
  title: string;
  icon?: string;
  isOpen: boolean;
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

export interface CreateMobilemenuHeaderDto {
  menuId: string;
  title: string;
  icon?: string;
  isOpen?: boolean;
  createdBy?: string;
}

export interface UpdateMobilemenuHeaderDto {
  menuId?: string;
  title?: string;
  icon?: string;
  isOpen?: boolean;
  updatedBy?: string;
}