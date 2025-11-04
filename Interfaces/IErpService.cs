using WMS_WEBAPI.DTOs;

namespace WMS_WEBAPI.Interfaces
{
    public interface IErpService
    {
        // OnHandQuantity işlemleri
          Task<ApiResponse<OnHandQuantityDto?>> GetOnHandQuantityByIdAsync(int? depoKodu = null, string? stokKodu = null, string? seriNo = null, string? projeKodu = null);

        // Cari işlemleri
        Task<ApiResponse<List<CariDto>>> GetCarisAsync();

        // Stok işlemleri
        Task<ApiResponse<List<StokDto>>> GetStoksAsync();

        // Depo işlemleri
        Task<ApiResponse<List<DepoDto>>> GetDeposAsync();

        // Proje işlemleri
        Task<ApiResponse<List<ProjeDto>>> GetProjelerAsync();

        // Müşteri siparişi işlemleri
        Task<ApiResponse<OpenGoodsForOrderByCustomerDto?>> GetOpenGoodsForOrderByCustomerByIdAsync(string cariKodu);

        // Sipariş detay işlemleri
        Task<ApiResponse<List<OpenGoodsForOrderDetailDto>>> GetOpenGoodsForOrderDetailsByOrderNumbersAsync(string orderNumber);
    }
}