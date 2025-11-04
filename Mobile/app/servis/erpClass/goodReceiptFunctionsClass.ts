// GoodReceipt Functions API Class ve Interface Tanımları
// WMS depo mal kabul işlemleri için veri modeli ve ilgili tipler

export interface GoodsOpenOrdersHeader {
  Mode: string;                      // varchar(1), NOT NULL
  SiparisNo: string;                 // varchar(15), NOT NULL
  OrderID?: number;                  // int, nullable
  CustomerCode?: string;             // varchar(30), nullable
  CustomerName?: string;             // varchar(100), nullable
  BranchCode?: number;               // smallint, nullable
  TargetWh?: number;                 // smallint, nullable
  ProjectCode?: string;              // varchar(50), nullable
  OrderDate?: Date;                  // datetime, nullable
  OrderedQty?: number;               // decimal(18,4), nullable
  DeliveredQty?: number;             // decimal(18,4), nullable
  RemainingHamax?: number;           // decimal(18,4), nullable
  PlannedQtyAllocated: number;       // decimal(18,4), NOT NULL
  RemainingForImport?: number;       // decimal(18,4), nullable
}

export interface GoodsOpenOrdersLine {
  Mode: string;                      // varchar(1), NOT NULL
  SiparisNo: string;                 // varchar(15), NOT NULL
  OrderID: number;                   // int, NOT NULL
  StockCode?: string;                // varchar(35), nullable
  StockName?: string;                // varchar(35), nullable
  CustomerCode?: string;             // varchar(35), nullable
  CustomerName?: string;             // varchar(100), nullable
  BranchCode: number;                // int, NOT NULL
  TargetWh?: number;                 // smallint, nullable
  ProjectCode?: string;              // varchar(50), nullable
  OrderDate?: Date;                  // datetime, nullable
  OrderedQty?: number;               // decimal(17), nullable
  DeliveredQty?: number;             // decimal(17), nullable
  RemainingHamax?: number;           // decimal(9), nullable
  PlannedQtyAllocated: number;       // decimal(17), NOT NULL
  RemainingForImport?: number;       // decimal(9), nullable
}

// API Response tipleri
export interface GoodsOpenOrdersHeaderResponse {
  success: boolean;
  data: GoodsOpenOrdersHeader[];
  message?: string;
  error?: string;
}

export interface GoodsOpenOrdersLineResponse {
  success: boolean;
  data: GoodsOpenOrdersLine[];
  message?: string;
  error?: string;
}

// Axios ile gelen API Response formatı
export interface AxiosGoodsOpenOrdersHeaderResponse {
  success: boolean;
  message?: string;
  data: {
    totalCount?: number;
    items: GoodsOpenOrdersHeader[];
  };
  error?: string;
}

export interface AxiosGoodsOpenOrdersLineResponse {
  success: boolean;
  message?: string;
  data: {
    totalCount?: number;
    items: GoodsOpenOrdersLine[];
  };
  error?: string;
}

// Axios Request Config
export interface GoodReceiptFunctionsAxiosConfig {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

// Mal kabul sipariş arama sonucu
export interface GoodsOpenOrdersSearchResult {
  headers: GoodsOpenOrdersHeader[];
  lines: GoodsOpenOrdersLine[];
  totalCount: number;
  filteredCount: number;
}


