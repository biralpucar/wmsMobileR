export interface GrLineDto {
  id: number;
  headerId: number;
  orderId?: number;
  quantity: number;
  erpProductCode: string;
  measurementUnit?: number;
  isSerial: boolean;
  autoSerial: boolean;
  quantityBySerial: boolean;
  targetWarehouse?: number;
  description1?: string;
  description2?: string;
  description3?: string;
  createdDate: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted: boolean;
  
  // User tracking properties
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  
  // Full user information properties
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateGrLineDto {
  headerId: number;
  orderId?: number;
  quantity: number;
  erpProductCode: string;
  measurementUnit?: number;
  isSerial?: boolean;
  autoSerial?: boolean;
  quantityBySerial?: boolean;
  targetWarehouse?: number;
  description1?: string;
  description2?: string;
  description3?: string;
}

export interface UpdateGrLineDto {
  headerId?: number;
  orderId?: number;
  quantity?: number;
  erpProductCode?: string;
  measurementUnit?: number;
  isSerial?: boolean;
  autoSerial?: boolean;
  quantityBySerial?: boolean;
  targetWarehouse?: number;
  description1?: string;
  description2?: string;
  description3?: string;
}