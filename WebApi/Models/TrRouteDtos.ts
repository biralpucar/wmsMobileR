export interface TrRouteDto {
  id: number;
  lineId: number;
  stockCode: string;
  routeCode?: string;
  quantity: number;
  serialNo?: string;
  serialNo2?: string;
  sourceWarehouse?: number;
  targetWarehouse?: number;
  sourceCellCode?: string;
  targetCellCode?: string;
  priority: number;
  description?: string;
  createdBy?: number;
  createdDate: string;
  updatedBy?: number;
  updatedDate?: string;
  isDeleted: boolean;
  deletedBy?: number;
  deletedDate?: string;
  
  // Full user information properties
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateTrRouteDto {
  lineId: number;
  stockCode: string;
  routeCode?: string;
  quantity: number;
  serialNo?: string;
  serialNo2?: string;
  sourceWarehouse?: number;
  targetWarehouse?: number;
  sourceCellCode?: string;
  targetCellCode?: string;
  priority: number;
  description?: string;
}

export interface UpdateTrRouteDto {
  lineId?: number;
  stockCode?: string;
  routeCode?: string;
  quantity?: number;
  serialNo?: string;
  serialNo2?: string;
  sourceWarehouse?: number;
  targetWarehouse?: number;
  sourceCellCode?: string;
  targetCellCode?: string;
  priority?: number;
  description?: string;
}