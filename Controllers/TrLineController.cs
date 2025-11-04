using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TrLineController : ControllerBase
    {
        private readonly ITrLineService _trLineService;
        private readonly ILocalizationService _localizationService;

        public TrLineController(ITrLineService trLineService, ILocalizationService localizationService)
        {
            _trLineService = trLineService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm TrLine kayıtlarını getirir
        /// </summary>
        /// <returns>TrLine listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrLineDto>>>> GetAll()
        {
            var result = await _trLineService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre TrLine kaydını getirir
        /// </summary>
        /// <param name="id">TrLine ID</param>
        /// <returns>TrLine detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TrLineDto?>>> GetById(long id)
        {
            var result = await _trLineService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Header ID'ye göre TrLine kayıtlarını getirir
        /// </summary>
        /// <param name="headerId">Header ID</param>
        /// <returns>TrLine listesi</returns>
        [HttpGet("header/{headerId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrLineDto>>>> GetByHeaderId(long headerId)
        {
            var result = await _trLineService.GetByHeaderIdAsync(headerId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Stok koduna göre TrLine kayıtlarını getirir
        /// </summary>
        /// <param name="stockCode">Stok kodu</param>
        /// <returns>TrLine listesi</returns>
        [HttpGet("stock/{stockCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrLineDto>>>> GetByStockCode(string stockCode)
        {
            var result = await _trLineService.GetByStockCodeAsync(stockCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ERP sipariş numarasına göre TrLine kayıtlarını getirir
        /// </summary>
        /// <param name="erpOrderNo">ERP sipariş numarası</param>
        /// <returns>TrLine listesi</returns>
        [HttpGet("erporder/{erpOrderNo}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrLineDto>>>> GetByErpOrderNo(string erpOrderNo)
        {
            var result = await _trLineService.GetByErpOrderNoAsync(erpOrderNo);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni TrLine kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak TrLine bilgileri</param>
        /// <returns>Oluşturulan TrLine</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TrLineDto>>> Create([FromBody] CreateTrLineDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trLineService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrLine kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek TrLine ID</param>
        /// <param name="updateDto">Güncellenecek TrLine bilgileri</param>
        /// <returns>Güncellenmiş TrLine</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TrLineDto>>> Update(long id, [FromBody] UpdateTrLineDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trLineService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrLine kaydını siler (soft delete)
        /// </summary>
        /// <param name="id">Silinecek TrLine ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _trLineService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif TrLine kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif TrLine listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrLineDto>>>> GetActive()
        {
            var result = await _trLineService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Miktar aralığına göre TrLine kayıtlarını getirir
        /// </summary>
        /// <param name="minQuantity">Minimum miktar</param>
        /// <param name="maxQuantity">Maksimum miktar</param>
        /// <returns>TrLine listesi</returns>
        [HttpGet("quantity")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrLineDto>>>> GetByQuantityRange(
            [FromQuery] decimal minQuantity, 
            [FromQuery] decimal maxQuantity)
        {
            var result = await _trLineService.GetByQuantityRangeAsync(minQuantity, maxQuantity);
            return StatusCode(result.StatusCode, result);
        }
    }
}