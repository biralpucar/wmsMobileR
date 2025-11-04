export interface SidebarmenuHeaderDto {
  id: number;
  menuKey: string;
  title: string;
  icon?: string;
  color?: string;
  darkColor?: string;
  shadowColor?: string;
  darkShadowColor?: string;
  textColor?: string;
  darkTextColor?: string;
  roleLevel: number;
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

export interface CreateSidebarmenuHeaderDto {
  menuKey: string;
  title: string;
  icon?: string;
  color?: string;
  darkColor?: string;
  shadowColor?: string;
  darkShadowColor?: string;
  textColor?: string;
  darkTextColor?: string;
  roleLevel?: number;
}

export interface UpdateSidebarmenuHeaderDto {
  menuKey?: string;
  title?: string;
  icon?: string;
  color?: string;
  darkColor?: string;
  shadowColor?: string;
  darkShadowColor?: string;
  textColor?: string;
  darkTextColor?: string;
  roleLevel?: number;
}

export interface SidebarmenuHeaderWithLinesDto {
  id: number;
  menuKey: string;
  title: string;
  icon?: string;
  color?: string;
  darkColor?: string;
  shadowColor?: string;
  darkShadowColor?: string;
  textColor?: string;
  darkTextColor?: string;
  roleLevel: number;
  lines: SidebarmenuLineDto[];
}

// Forward declaration for SidebarmenuLineDto
export interface SidebarmenuLineDto {
  id: number;
  headerId: number;
  menuKey: string;
  title: string;
  icon?: string;
  url?: string;
  orderNo?: number;
  roleLevel: number;
  isActive: boolean;
  createdDate?: string;
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