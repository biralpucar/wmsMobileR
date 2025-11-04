export interface MobilePageGroupDto {
  id: number;
  groupName: string;
  groupCode: string;
  menuHeaderId?: number;
  menuLineId?: number;
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

export interface CreateMobilePageGroupDto {
  groupName: string;
  groupCode: string;
  menuHeaderId?: number;
  menuLineId?: number;
  createdBy?: string;
}

export interface UpdateMobilePageGroupDto {
  groupName?: string;
  groupCode?: string;
  menuHeaderId?: number;
  menuLineId?: number;
}