export interface BaseEntity {
  id: number;
  createdDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted: boolean;
  
  // User Information
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  
  // Navigation properties (optional for frontend)
  createdByUser?: UserInfo;
  updatedByUser?: UserInfo;
  deletedByUser?: UserInfo;
}

export interface UserInfo {
  id: number;
  username: string;
  fullName: string;
}