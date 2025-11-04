export interface GoodsOpenOrdersHeaderDto {
  mode: string;
  siparisNo: string;
  orderID?: number;
  customerCode?: string;
  customerName?: string;
  branchCode?: number;
  targetWh?: number;
  projectCode?: string;
  orderDate?: Date;
  orderedQty?: number;
  deliveredQty?: number;
  remainingHamax?: number;
  plannedQtyAllocated: number;
  remainingForImport?: number;
}

export interface GoodsOpenOrdersLineDto {
  mode: string;
  siparisNo: string;
  orderID: number;
  stockCode?: string;
  stockName?: string;
  customerCode?: string;
  customerName?: string;
  branchCode: number;
  targetWh?: number;
  projectCode?: string;
  orderDate?: Date;
  orderedQty?: number;
  deliveredQty?: number;
  remainingHamax?: number;
  plannedQtyAllocated: number;
  remainingForImport?: number;
}