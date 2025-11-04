using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface IGrHeaderService
    {
        Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetAllAsync();
        Task<ApiResponse<GrHeaderDto?>> GetByIdAsync(int id);
        Task<ApiResponse<GrHeaderDto?>> GetByERPDocumentNoAsync(string erpDocumentNo);
        Task<ApiResponse<GrHeaderDto>> CreateAsync(CreateGrHeaderDto createDto);
        Task<ApiResponse<GrHeaderDto>> UpdateAsync(int id, UpdateGrHeaderDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(int id);
        Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetActiveAsync();
        Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByBranchCodeAsync(string branchCode);
        Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByCustomerCodeAsync(string customerCode);
        Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}