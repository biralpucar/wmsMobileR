using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface ITrBoxService
    {
        Task<ApiResponse<IEnumerable<TrBoxDto>>> GetAllAsync();
        Task<ApiResponse<TrBoxDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<TrBoxDto>>> GetByImportLineIdAsync(long importLineId);
        Task<ApiResponse<IEnumerable<TrBoxDto>>> GetByBoxNumberAsync(string boxNumber);
        Task<ApiResponse<IEnumerable<TrBoxDto>>> GetActiveAsync();
        Task<ApiResponse<IEnumerable<TrBoxDto>>> GetByDescriptionAsync(string description);
        Task<ApiResponse<TrBoxDto>> CreateAsync(CreateTrBoxDto createDto);
        Task<ApiResponse<TrBoxDto>> UpdateAsync(long id, UpdateTrBoxDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}