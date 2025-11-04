import { BaseEntity } from './BaseEntity';
import { SidebarmenuHeader } from './SidebarmenuHeader';
import { SidebarmenuLine } from './SidebarmenuLine';

export interface PlatformPageGroup extends BaseEntity {
  groupName: string;
  groupCode: string;
  
  // Foreign Keys
  menuHeaderId?: number;
  menuHeaders?: SidebarmenuHeader;
  
  menuLineId?: number;
  menuLines?: SidebarmenuLine;
}