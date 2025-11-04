using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TrBoxController : ControllerBase
    {
        private readonly ITrBoxService _trBoxService;
        private readonly ILocalizationService _localizationService;

        public TrBoxController(ITrBoxService trBoxService, ILocalizationService localizationService)
        {
            _trBoxService = trBoxService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm TrBox kayıtlarını getirir
        /// </summary>
        /// <returns>TrBox listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrBoxDto>>>> GetAll()
        {
            var result = await _trBoxService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre TrBox kaydını getirir
        /// </summary>
        /// <param name="id">TrBox ID</param>
        /// <returns>TrBox detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TrBoxDto?>>> GetById(long id)
        {
            var result = await _trBoxService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Import Line ID'ye göre TrBox kayıtlarını getirir
        /// </summary>
        /// <param name="importLineId">Import Line ID</param>
        /// <returns>TrBox listesi</returns>
        [HttpGet("importline/{importLineId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrBoxDto>>>> GetByImportLineId(long importLineId)
        {
            var result = await _trBoxService.GetByImportLineIdAsync(importLineId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// BoxNo'ya göre TrBox kayıtlarını getirir
        /// </summary>
        /// <param name="boxNo">Box numarası</param>
        /// <returns>TrBox listesi</returns>
        [HttpGet("boxno/{boxNo}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrBoxDto>>>> GetByBoxNo(string boxNo)
        {
            var result = await _trBoxService.GetByBoxNumberAsync(boxNo);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni TrBox kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak TrBox bilgileri</param>
        /// <returns>Oluşturulan TrBox</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TrBoxDto>>> Create([FromBody] CreateTrBoxDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trBoxService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrBox kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek TrBox ID</param>
        /// <param name="updateDto">Güncellenecek TrBox bilgileri</param>
        /// <returns>Güncellenmiş TrBox</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TrBoxDto>>> Update(long id, [FromBody] UpdateTrBoxDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trBoxService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrBox kaydını siler (soft delete)
        /// </summary>
        /// <param name="id">Silinecek TrBox ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _trBoxService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif TrBox kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif TrBox listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrBoxDto>>>> GetActive()
        {
            var result = await _trBoxService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Açıklamaya göre TrBox kayıtlarını arar
        /// </summary>
        /// <param name="description">Aranacak açıklama</param>
        /// <returns>TrBox listesi</returns>
        [HttpGet("search/{description}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrBoxDto>>>> SearchByDescription(string description)
        {
            var result = await _trBoxService.GetByDescriptionAsync(description);
            return StatusCode(result.StatusCode, result);
        }
    }
}