import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { PlatformPageGroup } from './PlatformPageGroup';

export interface PlatformUserGroupMatch extends BaseEntity {
  userId: number;
  groupCode: string;
  
  // Navigation properties
  users?: User;
  groups?: PlatformPageGroup;
}