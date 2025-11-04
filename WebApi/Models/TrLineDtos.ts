export interface TrLineDto {
  id: number;
  headerId: number;
  stockCode: string;
  orderId?: number;
  quantity: number;
  unit?: string;
  erpOrderNo?: string;
  erpOrderLineNo?: string;
  erpLineReference?: string;
  description?: string;
  
  // User tracking properties
  createdDate: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  
  // Full user information properties
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateTrLineDto {
  headerId: number;
  stockCode: string;
  orderId?: number;
  quantity: number;
  unit?: string;
  erpOrderNo?: string;
  erpOrderLineNo?: string;
  erpLineReference?: string;
  description?: string;
}

export interface UpdateTrLineDto {
  headerId?: number;
  stockCode?: string;
  orderId?: number;
  quantity?: number;
  unit?: string;
  erpOrderNo?: string;
  erpOrderLineNo?: string;
  erpLineReference?: string;
  description?: string;
}