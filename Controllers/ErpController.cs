using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErpController : ControllerBase
    {
        private readonly IErpService _erpService;

        public ErpController(IErpService erpService)
        {
            _erpService = erpService;
        }


        [HttpGet("get-onhand-quantity-by-id/{depoKodu}/{stokKodu}/{seriNo}/{projeKodu}")]
        public async Task<ActionResult<ApiResponse<OnHandQuantityDto?>>> GetOnHandQuantityById(
            [FromQuery] int? depoKodu = null, 
            [FromQuery] string? stokKodu = null, 
            [FromQuery] string? seriNo = null, 
            [FromQuery] string? projeKodu = null)
        {
            var result = await _erpService.GetOnHandQuantityByIdAsync(depoKodu, stokKodu, seriNo, projeKodu);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("getCari")]
        public async Task<ActionResult<ApiResponse<List<CariDto>>>> GetCaris()
        {
            var result = await _erpService.GetCarisAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("getStoks")]
        public async Task<ActionResult<ApiResponse<List<StokDto>>>> GetStoks()
        {
            var result = await _erpService.GetStoksAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("getDepos")]
        public async Task<ActionResult<ApiResponse<List<DepoDto>>>> GetDepos()
        {
            var result = await _erpService.GetDeposAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("getProjeler")]
        public async Task<ActionResult<ApiResponse<List<ProjeDto>>>> GetProjeler()
        {
            var result = await _erpService.GetProjelerAsync();
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("get-open-goods-for-order-by-customer-by-id/{cariKodu}")]
        public async Task<ActionResult<ApiResponse<OpenGoodsForOrderByCustomerDto?>>> GetOpenGoodsForOrderByCustomerById(string cariKodu)
        {
            var result = await _erpService.GetOpenGoodsForOrderByCustomerByIdAsync(cariKodu);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("get-open-goods-for-order-details-by-order-number/{orderNumber}")]
        public async Task<ActionResult<ApiResponse<List<OpenGoodsForOrderDetailDto>>>> GetOpenGoodsForOrderDetailsByOrderNumber(string orderNumber)
        {
            var result = await _erpService.GetOpenGoodsForOrderDetailsByOrderNumbersAsync(orderNumber);
            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("health-check")]
        [AllowAnonymous]
        public IActionResult HealthCheck()
        {
            var healthResponse = new { Status = "Healthy", Timestamp = DateTime.UtcNow };
            return StatusCode(200, healthResponse);
        }
    }
}