using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GrImportDocumentController : ControllerBase
    {
        private readonly IGrImportDocumentService _grImportDocumentService;
        private readonly ILocalizationService _localizationService;

        public GrImportDocumentController(IGrImportDocumentService grImportDocumentService, ILocalizationService localizationService)
        {
            _grImportDocumentService = grImportDocumentService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm GR Import Document kayıtlarını getirir
        /// </summary>
        /// <returns>GR Import Document listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrImportDocumentDto>>>> GetAll()
        {
            var result = await _grImportDocumentService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre GR Import Document kaydını getirir
        /// </summary>
        /// <param name="id">GR Import Document ID</param>
        /// <returns>GR Import Document detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<GrImportDocumentDto>>> GetById(long id)
        {
            var result = await _grImportDocumentService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Header ID'ye göre GR Import Document kayıtlarını getirir
        /// </summary>
        /// <param name="headerId">GR Header ID</param>
        /// <returns>GR Import Document listesi</returns>
        [HttpGet("by-header/{headerId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<GrImportDocumentDto>>>> GetByHeaderId(long headerId)
        {
            var result = await _grImportDocumentService.GetByHeaderIdAsync(headerId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni GR Import Document kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak GR Import Document bilgileri</param>
        /// <returns>Oluşturulan GR Import Document</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<GrImportDocumentDto>>> Create([FromBody] CreateGrImportDocumentDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ApiResponse<GrImportDocumentDto>.ErrorResult(_localizationService.GetLocalizedString("InvalidModelState"), ModelState?.ToString() ?? string.Empty, 400, default));
            }

            var result = await _grImportDocumentService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Mevcut GR Import Document kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek GR Import Document ID</param>
        /// <param name="updateDto">Güncellenecek GR Import Document bilgileri</param>
        /// <returns>Güncellenmiş GR Import Document</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<GrImportDocumentDto>>> Update(long id, [FromBody] UpdateGrImportDocumentDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ApiResponse<GrImportDocumentDto>.ErrorResult(_localizationService.GetLocalizedString("InvalidModelState"), ModelState?.ToString() ?? string.Empty, 400, default));
            }

            var result = await _grImportDocumentService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// GR Import Document kaydını soft delete yapar
        /// </summary>
        /// <param name="id">Silinecek GR Import Document ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _grImportDocumentService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// GR Import Document kaydının varlığını kontrol eder
        /// </summary>
        /// <param name="id">Kontrol edilecek GR Import Document ID</param>
        /// <returns>Kayıt varlık durumu</returns>
        [HttpGet("{id}/exists")]
        public async Task<ActionResult<ApiResponse<bool>>> Exists(long id)
        {
            var result = await _grImportDocumentService.ExistsAsync(id);
            return StatusCode(result.StatusCode, result);
        }
    }
}