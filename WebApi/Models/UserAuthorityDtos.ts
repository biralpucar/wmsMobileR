export interface UserAuthorityDto {
  id: number;
  title: string;
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

export interface CreateUserAuthorityDto {
  title: string;
}

export interface UpdateUserAuthorityDto {
  title: string;
}