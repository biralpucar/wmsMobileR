export interface MobileUserGroupMatchDto {
  id: number;
  userId: number;
  groupCode: string;
  createdDate: Date;
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

export interface CreateMobileUserGroupMatchDto {
  userId: number;
  groupCode: string;
  createdBy?: string;
}

export interface UpdateMobileUserGroupMatchDto {
  userId?: number;
  groupCode?: string;
  updatedBy?: string;
}