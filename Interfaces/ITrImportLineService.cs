using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface ITrImportLineService
    {
        Task<ApiResponse<IEnumerable<TrImportLineDto>>> GetAllAsync();
        Task<ApiResponse<TrImportLineDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<TrImportLineDto>>> GetByLineIdAsync(long lineId);
        Task<ApiResponse<IEnumerable<TrImportLineDto>>> GetByRouteIdAsync(long routeId);
        Task<ApiResponse<IEnumerable<TrImportLineDto>>> GetByStockCodeAsync(string stockCode);
        Task<ApiResponse<IEnumerable<TrImportLineDto>>> GetByCellCodeAsync(string cellCode);
        Task<ApiResponse<IEnumerable<TrImportLineDto>>> GetByErpOrderNoAsync(string erpOrderNo);
        Task<ApiResponse<IEnumerable<TrImportLineDto>>> GetActiveAsync();
        Task<ApiResponse<TrImportLineDto>> CreateAsync(CreateTrImportLineDto createDto);
        Task<ApiResponse<TrImportLineDto>> UpdateAsync(long id, UpdateTrImportLineDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}