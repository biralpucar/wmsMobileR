using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TrHeaderController : ControllerBase
    {
        private readonly ITrHeaderService _trHeaderService;
        private readonly ILocalizationService _localizationService;

        public TrHeaderController(ITrHeaderService trHeaderService, ILocalizationService localizationService)
        {
            _trHeaderService = trHeaderService;
            _localizationService = localizationService;
        }

        /// <summary>
        /// Tüm TrHeader kayıtlarını getirir
        /// </summary>
        /// <returns>TrHeader listesi</returns>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrHeaderDto>>>> GetAll()
        {
            var result = await _trHeaderService.GetAllAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// ID'ye göre TrHeader kaydını getirir
        /// </summary>
        /// <param name="id">TrHeader ID</param>
        /// <returns>TrHeader detayı</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TrHeaderDto?>>> GetById(long id)
        {
            var result = await _trHeaderService.GetByIdAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Şube koduna göre TrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="branchCode">Şube kodu</param>
        /// <returns>TrHeader listesi</returns>
        [HttpGet("branch/{branchCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrHeaderDto>>>> GetByBranchCode(string branchCode)
        {
            var result = await _trHeaderService.GetByBranchCodeAsync(branchCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Tarih aralığına göre TrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="startDate">Başlangıç tarihi</param>
        /// <param name="endDate">Bitiş tarihi</param>
        /// <returns>TrHeader listesi</returns>
        [HttpGet("daterange")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrHeaderDto>>>> GetByDateRange(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            var result = await _trHeaderService.GetByDateRangeAsync(startDate, endDate);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Yeni TrHeader kaydı oluşturur
        /// </summary>
        /// <param name="createDto">Oluşturulacak TrHeader bilgileri</param>
        /// <returns>Oluşturulan TrHeader</returns>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TrHeaderDto>>> Create([FromBody] CreateTrHeaderDto createDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trHeaderService.CreateAsync(createDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrHeader kaydını günceller
        /// </summary>
        /// <param name="id">Güncellenecek TrHeader ID</param>
        /// <param name="updateDto">Güncellenecek TrHeader bilgileri</param>
        /// <returns>Güncellenmiş TrHeader</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TrHeaderDto>>> Update(long id, [FromBody] UpdateTrHeaderDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return StatusCode(400, ModelState);
            }

            var result = await _trHeaderService.UpdateAsync(id, updateDto);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// TrHeader kaydını siler (soft delete)
        /// </summary>
        /// <param name="id">Silinecek TrHeader ID</param>
        /// <returns>Silme işlemi sonucu</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> Delete(long id)
        {
            var result = await _trHeaderService.SoftDeleteAsync(id);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Aktif TrHeader kayıtlarını getirir
        /// </summary>
        /// <returns>Aktif TrHeader listesi</returns>
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrHeaderDto>>>> GetActive()
        {
            var result = await _trHeaderService.GetActiveAsync();
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Müşteri koduna göre TrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="customerCode">Müşteri kodu</param>
        /// <returns>TrHeader listesi</returns>
        [HttpGet("customer/{customerCode}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrHeaderDto>>>> GetByCustomerCode(string customerCode)
        {
            var result = await _trHeaderService.GetByCustomerCodeAsync(customerCode);
            return StatusCode(result.StatusCode, result);
        }

        /// <summary>
        /// Belge tipine göre TrHeader kayıtlarını getirir
        /// </summary>
        /// <param name="documentType">Belge tipi</param>
        /// <returns>TrHeader listesi</returns>
        [HttpGet("documenttype/{documentType}")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TrHeaderDto>>>> GetByDocumentType(string documentType)
        {
            var result = await _trHeaderService.GetByDocumentTypeAsync(documentType);
            return StatusCode(result.StatusCode, result);
        }
    }
}