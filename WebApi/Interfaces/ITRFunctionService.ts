import { ApiResponse } from '../Models/ApiResponse';
import { TransferOpenOrderHeaderDto, TransferOpenOrderLineDto } from '../Models/TRFunctionsDtos';

export interface ITRFunctionService {
  getTransferOpenOrderHeader(customerCode: string): Promise<ApiResponse<TransferOpenOrderHeaderDto[]>>;
  getTransferOpenOrderLine(siparisNoCsv: string): Promise<ApiResponse<TransferOpenOrderLineDto[]>>;
}