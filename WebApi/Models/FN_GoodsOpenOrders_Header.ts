export interface FN_GoodsOpenOrders_Header {
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