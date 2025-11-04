export interface TrTerminalLineDto {
  id: number;
  lineId: number;
  routeId?: number;
  userId: number;
  terminalCode?: string;
  assignedDate?: Date;
  completedDate?: Date;
  status?: string;
  notes?: string;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateTrTerminalLineDto {
  lineId: number;
  routeId?: number;
  userId: number;
  terminalCode?: string;
  assignedDate?: Date;
  completedDate?: Date;
  status?: string;
  notes?: string;
}

export interface UpdateTrTerminalLineDto {
  lineId?: number;
  routeId?: number;
  userId?: number;
  terminalCode?: string;
  assignedDate?: Date;
  completedDate?: Date;
  status?: string;
  notes?: string;
}