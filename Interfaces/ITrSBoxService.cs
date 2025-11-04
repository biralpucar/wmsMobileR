using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface ITrSBoxService
    {
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetAllAsync();
        Task<ApiResponse<TrSBoxDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByImportLineIdAsync(long importLineId);
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByBoxIdAsync(long boxId);
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetBySerialNumberAsync(string serialNumber);
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetBySerialNoAsync(string serialNo);
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetActiveAsync();
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByDescriptionAsync(string description);
        Task<ApiResponse<IEnumerable<TrSBoxDto>>> SearchByDescriptionAsync(string description);
        Task<ApiResponse<TrSBoxDto>> CreateAsync(CreateTrSBoxDto createDto);
        Task<ApiResponse<TrSBoxDto>> UpdateAsync(long id, UpdateTrSBoxDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}