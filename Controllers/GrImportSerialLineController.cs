using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GrImportSerialLineController : ControllerBase
    {
        private readonly IGrImportSerialLineService _grImportSerialLineService;
        private readonly ILocalizationService _localizationService;

        public GrImportSerialLineController(IGrImportSerialLineService grImportSerialLineService, ILocalizationService localizationService)
        {
            _grImportSerialLineService = grImportSerialLineService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm GR Import Serial Line kayıtlarını getirir
        /// </summary>
        /// <returns>GR Import Serial Line listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrImportSerialLineDto>>>> GetAll()
        {
            var result = await _grImportSerialLineService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre GR Import Serial Line kaydını getirir
        /// </summary>
        /// <param name="id">GR Import Serial Line ID</param>
        /// <returns>GR Import Serial Line detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<GrImportSerialLineDto>>> GetById(long id)
        {
            var result = await _grImportSerialLineService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Import Line ID'ye göre GR Import Serial Line kayıtlarını getirir
        /// </summary>
        /// <param name="importLineId">GR Import Line ID</param>
        /// <returns>GR Import Serial Line listesi</returns>
        [HttpGet("by-import-line/{importLineId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrImportSerialLineDto>>>> GetByImportLineId(long importLineId)
        {
            var result = await _grImportSerialLineService.GetByImportLineIdAsync(importLineId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni GR Import Serial Line kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak GR Import Serial Line bilgileri</param>
        /// <returns>Oluşturulan GR Import Serial Line</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<GrImportSerialLineDto>>> Create([FromBody] CreateGrImportSerialLineDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ApiResponse<GrImportSerialLineDto>.ErrorResult(_localizationService.GetLocalizedString("InvalidModelState"), ModelState?.ToString() ?? string.Empty, 400, default));
            }

            var result = await _grImportSerialLineService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Mevcut GR Import Serial Line kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek GR Import Serial Line ID</param>
        /// <param name="updateDto">Güncellenecek GR Import Serial Line bilgileri</param>
        /// <returns>Güncellenmiş GR Import Serial Line</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<GrImportSerialLineDto>>> Update(long id, [FromBody] UpdateGrImportSerialLineDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ApiResponse<GrImportSerialLineDto>.ErrorResult(_localizationService.GetLocalizedString("InvalidModelState"), ModelState?.ToString() ?? string.Empty, 400, default));
            }

            var result = await _grImportSerialLineService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// GR Import Serial Line kaydını soft delete yapar
        /// </summary>
        /// <param name="id">Silinecek GR Import Serial Line ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _grImportSerialLineService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// GR Import Serial Line kaydının varlığını kontrol eder
        /// </summary>
        /// <param name="id">Kontrol edilecek GR Import Serial Line ID</param>
        /// <returns>Kayıt varlık durumu</returns>
        [HttpGet("{id}/exists")]
        public async Task<ActionResult<ApiResponse<bool>>> Exists(long id)
        {
            var result = await _grImportSerialLineService.ExistsAsync(id);
            return StatusCode(result.StatusCode, result);
        }
    }
}