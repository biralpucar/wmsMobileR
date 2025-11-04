// GrLine API Class ve Interface Tanımları
// Mal kabul satır veri modeli ve ilgili tipler

export interface GrLine {
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
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateGrLine {
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

export interface UpdateGrLine {
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

// API Response tipleri
export interface GrLineResponse {
  success: boolean;
  data: GrLine | GrLine[];
  message?: string;
  error?: string;
}


