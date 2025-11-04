using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface IGrImportSerialLineService
    {
        Task<ApiResponse<IEnumerable<GrImportSerialLineDto>>> GetAllAsync();
        Task<ApiResponse<GrImportSerialLineDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<GrImportSerialLineDto>>> GetByImportLineIdAsync(long importLineId);
        Task<ApiResponse<GrImportSerialLineDto>> CreateAsync(CreateGrImportSerialLineDto createDto);
        Task<ApiResponse<GrImportSerialLineDto>> UpdateAsync(long id, UpdateGrImportSerialLineDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
        Task<ApiResponse<bool>> ExistsAsync(long id);
    }
}