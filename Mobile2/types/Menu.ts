// Menu DTOs (camelCase serialization)
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
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

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
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface MobileUserGroupMatchDto {
  id: number;
  groupCode: string;
  userId: number;
  isActive: boolean;
  createdDate: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}


