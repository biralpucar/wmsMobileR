using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TrTerminalLineController : ControllerBase
    {
        private readonly ITrTerminalLineService _trTerminalLineService;
        private readonly ILocalizationService _localizationService;

        public TrTerminalLineController(ITrTerminalLineService trTerminalLineService, ILocalizationService localizationService)
        {
            _trTerminalLineService = trTerminalLineService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <returns>TrTerminalLine listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetAll()
        {
            var result = await _trTerminalLineService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre TrTerminalLine kaydını getirir
        /// </summary>
        /// <param name="id">TrTerminalLine ID</param>
        /// <returns>TrTerminalLine detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TrTerminalLineDto?>>> GetById(long id)
        {
            var result = await _trTerminalLineService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Line ID'ye göre TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <param name="lineId">Line ID</param>
        /// <returns>TrTerminalLine listesi</returns>
        [HttpGet("line/{lineId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetByLineId(long lineId)
        {
            var result = await _trTerminalLineService.GetByLineIdAsync(lineId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Route ID'ye göre TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <param name="routeId">Route ID</param>
        /// <returns>TrTerminalLine listesi</returns>
        [HttpGet("route/{routeId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetByRouteId(long routeId)
        {
            var result = await _trTerminalLineService.GetByRouteIdAsync(routeId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Kullanıcı ID'ye göre TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <param name="userId">Kullanıcı ID</param>
        /// <returns>TrTerminalLine listesi</returns>
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetByUserId(string userId)
        {
            var result = await _trTerminalLineService.GetByUserIdAsync(userId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Terminal koduna göre TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <param name="terminalCode">Terminal kodu</param>
        /// <returns>TrTerminalLine listesi</returns>
        [HttpGet("terminal/{terminalCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetByTerminalCode(string terminalCode)
        {
            var result = await _trTerminalLineService.GetByTerminalCodeAsync(terminalCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Tarih aralığına göre TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <param name="startDate">Başlangıç tarihi</param>
        /// <param name="endDate">Bitiş tarihi</param>
        /// <returns>TrTerminalLine listesi</returns>
        [HttpGet("daterange")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var result = await _trTerminalLineService.GetByDateRangeAsync(startDate, endDate);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Duruma göre TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <param name="status">Durum</param>
        /// <returns>TrTerminalLine listesi</returns>
        [HttpGet("status/{status}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetByStatus(string status)
        {
            var result = await _trTerminalLineService.GetByStatusAsync(status);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni TrTerminalLine kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak TrTerminalLine bilgileri</param>
        /// <returns>Oluşturulan TrTerminalLine</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TrTerminalLineDto>>> Create([FromBody] CreateTrTerminalLineDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trTerminalLineService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrTerminalLine kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek TrTerminalLine ID</param>
        /// <param name="updateDto">Güncellenecek TrTerminalLine bilgileri</param>
        /// <returns>Güncellenmiş TrTerminalLine</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TrTerminalLineDto>>> Update(long id, [FromBody] UpdateTrTerminalLineDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trTerminalLineService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrTerminalLine kaydını siler (soft delete)
        /// </summary>
        /// <param name="id">Silinecek TrTerminalLine ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _trTerminalLineService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif TrTerminalLine kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif TrTerminalLine listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrTerminalLineDto>>>> GetActive()
        {
            var result = await _trTerminalLineService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }
    }
}