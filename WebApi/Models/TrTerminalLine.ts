import { BaseEntity } from './BaseEntity';
import { TrLine } from './TrLine';
import { TrRoute } from './TrRoute';

export interface TrTerminalLine extends BaseEntity {
  // Line ilişkisi
  lineId: number;
  line?: TrLine;
  
  // Route ilişkisi (opsiyonel)
  routeId?: number;
  route?: TrRoute;
}