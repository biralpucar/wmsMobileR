using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface ITrRouteService
    {
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetAllAsync();
        Task<ApiResponse<TrRouteDto>> GetByIdAsync(long id);
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByLineIdAsync(long lineId);
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByStockCodeAsync(string stockCode);
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetBySerialNoAsync(string serialNo);
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetBySourceWarehouseAsync(string sourceWarehouse);
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByTargetWarehouseAsync(string targetWarehouse);
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetActiveAsync();
        Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByQuantityRangeAsync(decimal minQuantity, decimal maxQuantity);
        Task<ApiResponse<TrRouteDto>> CreateAsync(CreateTrRouteDto createDto);
        Task<ApiResponse<TrRouteDto>> UpdateAsync(long id, UpdateTrRouteDto updateDto);
        Task<ApiResponse<bool>> SoftDeleteAsync(long id);
    }
}