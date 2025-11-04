import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { MobilePageGroup } from './MobilePageGroup';

export interface MobileUserGroupMatch extends BaseEntity {
  userId: number;
  groupCode: string;
  
  // Navigation properties
  users?: User;
  mobilePageGroups?: MobilePageGroup[];
}