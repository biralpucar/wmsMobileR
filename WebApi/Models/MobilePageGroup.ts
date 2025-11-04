import { BaseEntity } from './BaseEntity';
import { MobileUserGroupMatch } from './MobileUserGroupMatch';
import { MobilemenuHeader } from './MobilemenuHeader';
import { MobilemenuLine } from './MobilemenuLine';

export interface MobilePageGroup extends BaseEntity {
  groupName: string;
  groupCode: string;
  
  // Foreign Keys
  menuHeaderId?: number;
  menuHeaders?: MobilemenuHeader;
  
  menuLineId?: number;
  menuLines?: MobilemenuLine;
  
  // Navigation property for many-to-many relationship
  userGroupMatches?: MobileUserGroupMatch[];
}