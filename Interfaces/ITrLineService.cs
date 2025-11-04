using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface ITrLineService
    {
        Task<ApiResponse<IEnumerable<TrLineDto>>> GetAllAsync();
        Task<ApiResponse<TrLineDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<TrLineDto>>> GetByHeaderIdAsync(long headerId);
        Task<ApiResponse<IEnumerable<TrLineDto>>> GetByStockCodeAsync(string stockCode);
        Task<ApiResponse<IEnumerable<TrLineDto>>> GetByErpOrderNoAsync(string erpOrderNo);
        Task<ApiResponse<IEnumerable<TrLineDto>>> GetActiveAsync();
        Task<ApiResponse<IEnumerable<TrLineDto>>> GetByQuantityRangeAsync(decimal minQuantity, decimal maxQuantity);
        Task<ApiResponse<TrLineDto>> CreateAsync(CreateTrLineDto createDto);
        Task<ApiResponse<TrLineDto>> UpdateAsync(long id, UpdateTrLineDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}