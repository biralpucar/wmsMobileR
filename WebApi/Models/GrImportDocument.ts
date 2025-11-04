import { BaseEntity } from './BaseEntity';
import { GrHeader } from './GrHeader';

export interface GrImportDocument extends BaseEntity {
  headerId: number;
  header?: GrHeader;
  
  // Base64 encoded document data
  base64: string; // In TypeScript, we'll use string for base64 data
}