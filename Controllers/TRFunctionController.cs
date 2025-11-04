using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TRFunctionController : ControllerBase
    {
        private readonly ITRFunctionService _trFunctionService;

        public TRFunctionController(ITRFunctionService trFunctionService)
        {
            _trFunctionService = trFunctionService;
        }

        /// <summary>
        /// Müşteri koduna göre transfer açık sipariş başlıklarını getirir
        /// </summary>
        /// <param name="customerCode">Müşteri kodu</param>
        /// <returns>Transfer açık sipariş başlık listesi</returns>
        [HttpGet("headers/{customerCode}")]
        public async Task<ActionResult<ApiResponse<List<TransferOpenOrderHeaderDto>>>> GetTransferOpenOrderHeader(string customerCode)
        {
            var result = await _trFunctionService.GetTransferOpenOrderHeaderAsync(customerCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Sipariş numaralarına göre transfer açık sipariş detaylarını getirir
        /// </summary>
        /// <param name="siparisNoCsv">Virgülle ayrılmış sipariş numaraları</param>
        /// <returns>Transfer açık sipariş detay listesi</returns>
        [HttpGet("lines/{siparisNoCsv}")]
        public async Task<ActionResult<ApiResponse<List<TransferOpenOrderLineDto>>>> GetTransferOpenOrderLine(string siparisNoCsv)
        {
            var result = await _trFunctionService.GetTransferOpenOrderLineAsync(siparisNoCsv);
            return StatusCode(result.StatusCode, result);
        }
    }
}