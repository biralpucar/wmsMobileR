using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TrRouteController : ControllerBase
    {
        private readonly ITrRouteService _trRouteService;
        private readonly ILocalizationService _localizationService;

        public TrRouteController(ITrRouteService trRouteService, ILocalizationService localizationService)
        {
            _trRouteService = trRouteService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm TrRoute kayıtlarını getirir
        /// </summary>
        /// <returns>TrRoute listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetAll()
        {
            var result = await _trRouteService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre TrRoute kaydını getirir
        /// </summary>
        /// <param name="id">TrRoute ID</param>
        /// <returns>TrRoute detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TrRouteDto?>>> GetById(long id)
        {
            var result = await _trRouteService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Line ID'ye göre TrRoute kayıtlarını getirir
        /// </summary>
        /// <param name="lineId">Line ID</param>
        /// <returns>TrRoute listesi</returns>
        [HttpGet("line/{lineId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetByLineId(long lineId)
        {
            var result = await _trRouteService.GetByLineIdAsync(lineId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Stok koduna göre TrRoute kayıtlarını getirir
        /// </summary>
        /// <param name="stockCode">Stok kodu</param>
        /// <returns>TrRoute listesi</returns>
        [HttpGet("stock/{stockCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetByStockCode(string stockCode)
        {
            var result = await _trRouteService.GetByStockCodeAsync(stockCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Seri numarasına göre TrRoute kayıtlarını getirir
        /// </summary>
        /// <param name="serialNo">Seri numarası</param>
        /// <returns>TrRoute listesi</returns>
        [HttpGet("serial/{serialNo}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetBySerialNo(string serialNo)
        {
            var result = await _trRouteService.GetBySerialNoAsync(serialNo);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Kaynak depo koduna göre TrRoute kayıtlarını getirir
        /// </summary>
        /// <param name="sourceWarehouse">Kaynak depo kodu</param>
        /// <returns>TrRoute listesi</returns>
        [HttpGet("sourcewarehouse/{sourceWarehouse}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetBySourceWarehouse(string sourceWarehouse)
        {
            var result = await _trRouteService.GetBySourceWarehouseAsync(sourceWarehouse);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Hedef depo koduna göre TrRoute kayıtlarını getirir
        /// </summary>
        /// <param name="targetWarehouse">Hedef depo kodu</param>
        /// <returns>TrRoute listesi</returns>
        [HttpGet("targetwarehouse/{targetWarehouse}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetByTargetWarehouse(string targetWarehouse)
        {
            var result = await _trRouteService.GetByTargetWarehouseAsync(targetWarehouse);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni TrRoute kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak TrRoute bilgileri</param>
        /// <returns>Oluşturulan TrRoute</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TrRouteDto>>> Create([FromBody] CreateTrRouteDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trRouteService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrRoute kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek TrRoute ID</param>
        /// <param name="updateDto">Güncellenecek TrRoute bilgileri</param>
        /// <returns>Güncellenmiş TrRoute</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TrRouteDto>>> Update(long id, [FromBody] UpdateTrRouteDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trRouteService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrRoute kaydını siler (soft delete)
        /// </summary>
        /// <param name="id">Silinecek TrRoute ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _trRouteService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif TrRoute kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif TrRoute listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetActive()
        {
            var result = await _trRouteService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Miktar aralığına göre TrRoute kayıtlarını getirir
        /// </summary>
        /// <param name="minQuantity">Minimum miktar</param>
        /// <param name="maxQuantity">Maksimum miktar</param>
        /// <returns>TrRoute listesi</returns>
        [HttpGet("quantity")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrRouteDto>>>> GetByQuantityRange(
            [FromQuery] decimal minQuantity, 
            [FromQuery] decimal maxQuantity)
        {
            var result = await _trRouteService.GetByQuantityRangeAsync(minQuantity, maxQuantity);
            return StatusCode(result.StatusCode, result);
        }
    }
}