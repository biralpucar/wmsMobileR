using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TrImportLineController : ControllerBase
    {
        private readonly ITrImportLineService _trImportLineService;
        private readonly ILocalizationService _localizationService;

        public TrImportLineController(ITrImportLineService trImportLineService, ILocalizationService localizationService)
        {
            _trImportLineService = trImportLineService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm TrImportLine kayıtlarını getirir
        /// </summary>
        /// <returns>TrImportLine listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrImportLineDto>>>> GetAll()
        {
            var result = await _trImportLineService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre TrImportLine kaydını getirir
        /// </summary>
        /// <param name="id">TrImportLine ID</param>
        /// <returns>TrImportLine detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TrImportLineDto?>>> GetById(long id)
        {
            var result = await _trImportLineService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Line ID'ye göre TrImportLine kayıtlarını getirir
        /// </summary>
        /// <param name="lineId">Line ID</param>
        /// <returns>TrImportLine listesi</returns>
        [HttpGet("line/{lineId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrImportLineDto>>>> GetByLineId(long lineId)
        {
            var result = await _trImportLineService.GetByLineIdAsync(lineId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Route ID'ye göre TrImportLine kayıtlarını getirir
        /// </summary>
        /// <param name="routeId">Route ID</param>
        /// <returns>TrImportLine listesi</returns>
        [HttpGet("route/{routeId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrImportLineDto>>>> GetByRouteId(long routeId)
        {
            var result = await _trImportLineService.GetByRouteIdAsync(routeId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Stok koduna göre TrImportLine kayıtlarını getirir
        /// </summary>
        /// <param name="stockCode">Stok kodu</param>
        /// <returns>TrImportLine listesi</returns>
        [HttpGet("stock/{stockCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrImportLineDto>>>> GetByStockCode(string stockCode)
        {
            var result = await _trImportLineService.GetByStockCodeAsync(stockCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Cell koduna göre TrImportLine kayıtlarını getirir
        /// </summary>
        /// <param name="cellCode">Cell kodu</param>
        /// <returns>TrImportLine listesi</returns>
        [HttpGet("cell/{cellCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrImportLineDto>>>> GetByCellCode(string cellCode)
        {
            var result = await _trImportLineService.GetByCellCodeAsync(cellCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ERP sipariş numarasına göre TrImportLine kayıtlarını getirir
        /// </summary>
        /// <param name="erpOrderNo">ERP sipariş numarası</param>
        /// <returns>TrImportLine listesi</returns>
        [HttpGet("erporder/{erpOrderNo}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrImportLineDto>>>> GetByErpOrderNo(string erpOrderNo)
        {
            var result = await _trImportLineService.GetByErpOrderNoAsync(erpOrderNo);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni TrImportLine kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak TrImportLine bilgileri</param>
        /// <returns>Oluşturulan TrImportLine</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TrImportLineDto>>> Create([FromBody] CreateTrImportLineDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trImportLineService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrImportLine kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek TrImportLine ID</param>
        /// <param name="updateDto">Güncellenecek TrImportLine bilgileri</param>
        /// <returns>Güncellenmiş TrImportLine</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TrImportLineDto>>> Update(long id, [FromBody] UpdateTrImportLineDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trImportLineService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrImportLine kaydını siler (soft delete)
        /// </summary>
        /// <param name="id">Silinecek TrImportLine ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _trImportLineService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif TrImportLine kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif TrImportLine listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrImportLineDto>>>> GetActive()
        {
            var result = await _trImportLineService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }
    }
}