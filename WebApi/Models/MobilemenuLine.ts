import { BaseEntity } from './BaseEntity';
import { MobilemenuHeader } from './MobilemenuHeader';

export interface MobilemenuLine extends BaseEntity {
  itemId: string;
  title: string;
  icon?: string;
  description?: string;
  headerId: number;
  
  // Navigation property
  header?: MobilemenuHeader;
}