using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GoodReciptFunctionsController : ControllerBase
    {
        private readonly IGoodReciptFunctionsService _goodReciptFunctionsService;
        private readonly ILocalizationService _localizationService;

        public GoodReciptFunctionsController(IGoodReciptFunctionsService goodReciptFunctionsService, ILocalizationService localizationService)
        {
            _goodReciptFunctionsService = goodReciptFunctionsService;
            _localizationService = localizationService;
        }

        // Sadece iki uç nokta: müşteri kodu ile header ve sipariş CSV ile line

        /// <summary>
        /// Müşteri koduna göre açık sipariş başlıklarını getirir
        /// </summary>
        /// <param name="customerCode">Müşteri kodu</param>
        /// <returns>Müşteriye ait açık sipariş başlık listesi</returns>
        [HttpGet("headers/customer/{customerCode}")]
        public async Task<ActionResult<ApiResponse<List<GoodsOpenOrdersHeaderDto>>>> GetGoodsReceiptHeadersByCustomer(string customerCode)
        {
            var result = await _goodReciptFunctionsService.GetGoodsReceiptHeaderAsync(customerCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Sipariş numarası CSV'ye göre açık sipariş satırlarını getirir
        /// </summary>
        /// <param name="siparisNoCsv">Sipariş numaraları CSV (örn: 1001,1002,1003)</param>
        /// <returns>Belirtilen siparişlere ait satır listesi</returns>
        [HttpGet("lines/orders/{siparisNoCsv}")]
        public async Task<ActionResult<ApiResponse<List<GoodsOpenOrdersLineDto>>>> GetGoodsReceiptLinesByOrderCsv(string siparisNoCsv)
        {
            var result = await _goodReciptFunctionsService.GetGoodsReceiptLineAsync(siparisNoCsv);
            return StatusCode(result.StatusCode, result);
        }
    }
}