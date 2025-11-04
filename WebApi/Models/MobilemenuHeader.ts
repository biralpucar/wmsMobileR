import { BaseEntity } from './BaseEntity';
import { MobilemenuLine } from './MobilemenuLine';

export interface MobilemenuHeader extends BaseEntity {
  menuId: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  
  // Navigation property
  lines?: MobilemenuLine[];
}