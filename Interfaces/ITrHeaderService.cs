using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface ITrHeaderService
    {
        Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetAllAsync();
        Task<ApiResponse<TrHeaderDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByBranchCodeAsync(string branchCode);
        Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetActiveAsync();
        Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByCustomerCodeAsync(string customerCode);
        Task<ApiResponse<IEnumerable<TrHeaderDto>>> GetByDocumentTypeAsync(string documentType);
        Task<ApiResponse<TrHeaderDto>> CreateAsync(CreateTrHeaderDto createDto);
        Task<ApiResponse<TrHeaderDto>> UpdateAsync(long id, UpdateTrHeaderDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}