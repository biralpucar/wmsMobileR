import { BaseEntity } from './BaseEntity';
import { SidebarmenuLine } from './SidebarmenuLine';

export interface SidebarmenuHeader extends BaseEntity {
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
  
  // Navigation property
  lines?: SidebarmenuLine[];
}