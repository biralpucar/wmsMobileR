using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TrSBoxController : ControllerBase
    {
        private readonly ITrSBoxService _trSBoxService;
        private readonly ILocalizationService _localizationService;

        public TrSBoxController(ITrSBoxService trSBoxService, ILocalizationService localizationService)
        {
            _trSBoxService = trSBoxService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm TrSBox kayıtlarını getirir
        /// </summary>
        /// <returns>TrSBox listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrSBoxDto>>>> GetAll()
        {
            var result = await _trSBoxService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre TrSBox kaydını getirir
        /// </summary>
        /// <param name="id">TrSBox ID</param>
        /// <returns>TrSBox detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TrSBoxDto?>>> GetById(long id)
        {
            var result = await _trSBoxService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Import Line ID'ye göre TrSBox kayıtlarını getirir
        /// </summary>
        /// <param name="importLineId">Import Line ID</param>
        /// <returns>TrSBox listesi</returns>
        [HttpGet("importline/{importLineId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrSBoxDto>>>> GetByImportLineId(long importLineId)
        {
            var result = await _trSBoxService.GetByImportLineIdAsync(importLineId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Box ID'ye göre TrSBox kayıtlarını getirir
        /// </summary>
        /// <param name="boxId">Box ID</param>
        /// <returns>TrSBox listesi</returns>
        [HttpGet("box/{boxId}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrSBoxDto>>>> GetByBoxId(long boxId)
        {
            var result = await _trSBoxService.GetByBoxIdAsync(boxId);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Seri numarasına göre TrSBox kayıtlarını getirir
        /// </summary>
        /// <param name="serialNo">Seri numarası</param>
        /// <returns>TrSBox listesi</returns>
        [HttpGet("serial/{serialNo}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrSBoxDto>>>> GetBySerialNo(string serialNo)
        {
            var result = await _trSBoxService.GetBySerialNoAsync(serialNo);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni TrSBox kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak TrSBox bilgileri</param>
        /// <returns>Oluşturulan TrSBox</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TrSBoxDto>>> Create([FromBody] CreateTrSBoxDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trSBoxService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrSBox kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek TrSBox ID</param>
        /// <param name="updateDto">Güncellenecek TrSBox bilgileri</param>
        /// <returns>Güncellenmiş TrSBox</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TrSBoxDto>>> Update(long id, [FromBody] UpdateTrSBoxDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trSBoxService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrSBox kaydını siler (soft delete)
        /// </summary>
        /// <param name="id">Silinecek TrSBox ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _trSBoxService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif TrSBox kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif TrSBox listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrSBoxDto>>>> GetActive()
        {
            var result = await _trSBoxService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Açıklamaya göre TrSBox kayıtlarını arar
        /// </summary>
        /// <param name="description">Aranacak açıklama</param>
        /// <returns>TrSBox listesi</returns>
        [HttpGet("search/{description}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrSBoxDto>>>> SearchByDescription(string description)
        {
            var result = await _trSBoxService.SearchByDescriptionAsync(description);
            return StatusCode(result.StatusCode, result);
        }
    }
}