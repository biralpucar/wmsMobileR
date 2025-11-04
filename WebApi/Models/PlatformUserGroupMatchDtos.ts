export interface PlatformUserGroupMatchDto {
  id: number;
  userId: number;
  groupCode: string;
  createdDate?: Date;
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

export interface CreatePlatformUserGroupMatchDto {
  userId: number;
  groupCode: string;
}

export interface UpdatePlatformUserGroupMatchDto {
  userId?: number;
  groupCode?: string;
}