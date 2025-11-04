export interface PlatformPageGroupDto {
  id: number;
  groupName: string;
  groupCode: string;
  menuHeaderId?: number;
  menuLineId?: number;
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

export interface CreatePlatformPageGroupDto {
  groupName: string;
  groupCode: string;
  menuHeaderId?: number;
  menuLineId?: number;
}

export interface UpdatePlatformPageGroupDto {
  groupName?: string;
  groupCode?: string;
  menuHeaderId?: number;
  menuLineId?: number;
}