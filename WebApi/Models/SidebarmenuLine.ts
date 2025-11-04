import { BaseEntity } from './BaseEntity';
import { SidebarmenuHeader } from './SidebarmenuHeader';

export interface SidebarmenuLine extends BaseEntity {
  headerId: number;
  page: string;
  title: string;
  description?: string;
  icon?: string;
  
  // Navigation property
  header?: SidebarmenuHeader;
}