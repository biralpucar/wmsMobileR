using Microsoft.EntityFrameworkCore;
using AutoMapper;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Services
{
    public class GoodReciptFunctionsService : IGoodReciptFunctionsService
    {
        private readonly WmsDbContext _wmsDbContext;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public GoodReciptFunctionsService(WmsDbContext wmsDbContext, IMapper mapper, ILocalizationService localizationService)
        {
            _wmsDbContext = wmsDbContext;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<List<GoodsOpenOrdersHeaderDto>>> GetGoodsReceiptHeaderAsync(string customerCode)
        {
            try
            {
                var headers = await _wmsDbContext.Set<FN_GoodsOpenOrders_Header>()
                    .FromSqlRaw("SELECT * FROM dbo.RII_FNC_GoodsOpenOrders_Header({0})", customerCode)
                    .AsNoTracking()
                    .ToListAsync();

                var headerDtos = _mapper.Map<List<GoodsOpenOrdersHeaderDto>>(headers);

                return ApiResponse<List<GoodsOpenOrdersHeaderDto>>.SuccessResult(headerDtos,"Açık siparişler başarıyla getirildi");
            }
            catch (Exception ex)
            {
                return ApiResponse<List<GoodsOpenOrdersHeaderDto>>.ErrorResult("Bir hata oluştu",ex.Message,500);
            }
        }

        public async Task<ApiResponse<List<GoodsOpenOrdersLineDto>>> GetGoodsReceiptLineAsync(string siparisNoCsv)
        {
            try
            {
                var lines = await _wmsDbContext.Set<FN_GoodsOpenOrders_Line>()
                    .FromSqlRaw("SELECT * FROM dbo.RII_FNC_GoodsOpenOrders_Line({0})", siparisNoCsv)
                    .AsNoTracking()
                    .ToListAsync();

                var lineDtos = _mapper.Map<List<GoodsOpenOrdersLineDto>>(lines);

                return ApiResponse<List<GoodsOpenOrdersLineDto>>.SuccessResult(lineDtos,"Sipariş detayları başarıyla getirildi");
            }
            catch (Exception ex)
            {
                return ApiResponse<List<GoodsOpenOrdersLineDto>>.ErrorResult("Bir hata oluştu",ex.Message,500);
            }
        }
    }
}
