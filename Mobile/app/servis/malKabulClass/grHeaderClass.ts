// GrHeader API Class ve Interface Tanımları
// Mal kabul başlık veri modeli ve ilgili tipler

export interface GrHeader {
  id: number;
  branchCode: string;
  projectCode?: string;
  customerCode: string;
  erpDocumentNo: string;
  documentType: string;
  documentDate: string;
  yearCode: string;
  returnCode: boolean;
  ocrSource: boolean;
  isPlanned: boolean;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
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
  erpIntegrationStatus?: string;
  erpErrorMessage?: string;
}

export interface CreateGrHeader {
  branchCode: string;
  projectCode?: string;
  customerCode: string;
  erpDocumentNo: string;
  documentType: string;
  documentDate: string;
  yearCode: string;
  returnCode?: boolean;
  ocrSource?: boolean;
  isPlanned?: boolean;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
}

export interface UpdateGrHeader {
  branchCode?: string;
  projectCode?: string;
  customerCode?: string;
  erpDocumentNo?: string;
  documentType?: string;
  documentDate?: string;
  yearCode?: string;
  returnCode?: boolean;
  ocrSource?: boolean;
  isPlanned?: boolean;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  description5?: string;
}

// API Response tipleri
export interface GrHeaderResponse {
  success: boolean;
  data: GrHeader | GrHeader[];
  message?: string;
  error?: string;
}


