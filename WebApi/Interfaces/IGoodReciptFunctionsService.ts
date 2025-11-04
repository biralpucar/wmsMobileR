import { ApiResponse } from '../Models/ApiResponse';
import { GoodsOpenOrdersHeaderDto, GoodsOpenOrdersLineDto } from '../Models/GoodReciptFunctionsDtos';

export interface IGoodReciptFunctionsService {
  getGoodsReceiptHeader(customerCode: string): Promise<ApiResponse<GoodsOpenOrdersHeaderDto[]>>;
  getGoodsReceiptLine(siparisNoCsv: string): Promise<ApiResponse<GoodsOpenOrdersLineDto[]>>;
}