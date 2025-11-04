using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;

namespace WMS_WEBAPI.Services
{
    public class ErpService : IErpService
    {
        private readonly ErpDbContext _erpContext;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public ErpService(ErpDbContext erpContext, IMapper mapper, ILocalizationService localizationService)
        {
            _erpContext = erpContext;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        // OnHandQuantity işlemleri
        public async Task<ApiResponse<OnHandQuantityDto?>> GetOnHandQuantityByIdAsync(int? depoKodu = null, string? stokKodu = null, string? seriNo = null, string? projeKodu = null)
        {
            try
            {
                var result = await _erpContext.OnHandQuantities.ToListAsync();
                var mappedResult = _mapper.Map<OnHandQuantityDto?>(result);

                return ApiResponse<OnHandQuantityDto?>.SuccessResult(mappedResult, _localizationService.GetLocalizedString("OnHandQuantityRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OnHandQuantityDto?>.ErrorResult(_localizationService.GetLocalizedString("OnHandQuantityRetrievalError"), ex.Message, 500, ex.Message);
            }
        }

        // Cari işlemleri
        public async Task<ApiResponse<List<CariDto>>> GetCarisAsync()
        {
            try
            {
                var result = await _erpContext.Caris.ToListAsync();
                var mappedResult = _mapper.Map<List<CariDto>>(result);

                return ApiResponse<List<CariDto>>.SuccessResult(mappedResult, _localizationService.GetLocalizedString("CariRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<List<CariDto>>.ErrorResult(_localizationService.GetLocalizedString("CariRetrievalError"), ex.Message, 500, "Error retrieving Cari data");
            }
        }

        // Stok işlemleri
        public async Task<ApiResponse<List<StokDto>>> GetStoksAsync()
        {
            try
            {
                var result = await _erpContext.Stoks.ToListAsync();
                var mappedResult = _mapper.Map<List<StokDto>>(result);

                return ApiResponse<List<StokDto>>.SuccessResult(mappedResult, _localizationService.GetLocalizedString("StokRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<List<StokDto>>.ErrorResult(_localizationService.GetLocalizedString("StokRetrievalError"), ex.Message, 500, "Error retrieving Stok data");
            }
        }

        // Depo işlemleri
        public async Task<ApiResponse<List<DepoDto>>> GetDeposAsync()
        {
            try
            {
                var result = await _erpContext.Depos.ToListAsync();
                var mappedResult = _mapper.Map<List<DepoDto>>(result);

                return ApiResponse<List<DepoDto>>.SuccessResult(mappedResult, _localizationService.GetLocalizedString("DepoRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<List<DepoDto>>.ErrorResult(_localizationService.GetLocalizedString("DepoRetrievalError"), ex.Message, 500, "Error retrieving Depo data");
            }
        }

        // Proje işlemleri
        public async Task<ApiResponse<List<ProjeDto>>> GetProjelerAsync()
        {
            try
            {
                var result = await _erpContext.Projeler.ToListAsync();
                var mappedResult = _mapper.Map<List<ProjeDto>>(result);

                return ApiResponse<List<ProjeDto>>.SuccessResult(mappedResult, _localizationService.GetLocalizedString("ProjeRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<List<ProjeDto>>.ErrorResult(_localizationService.GetLocalizedString("ProjeRetrievalError"), ex.Message, 500, "Error retrieving Proje data");
            }
        }

        public async Task<ApiResponse<OpenGoodsForOrderByCustomerDto?>> GetOpenGoodsForOrderByCustomerByIdAsync(string cariKodu)
        {
            try
            {
                var result = await _erpContext.CustomerOrders
                    .Where(x => x.FATIRS_NO == cariKodu)
                    .FirstOrDefaultAsync();

                var mappedResult = _mapper.Map<OpenGoodsForOrderByCustomerDto?>(result);

                return ApiResponse<OpenGoodsForOrderByCustomerDto?>.SuccessResult(mappedResult, _localizationService.GetLocalizedString("CustomerOrderRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<OpenGoodsForOrderByCustomerDto?>.ErrorResult(_localizationService.GetLocalizedString("CustomerOrderRetrievalError"), ex.Message, 500, "Error retrieving customer order data");
            }
        }

        // Sipariş detay işlemleri
        public async Task<ApiResponse<List<OpenGoodsForOrderDetailDto>>> GetOpenGoodsForOrderDetailsByOrderNumbersAsync(string orderNumber)
        {
            try
            {
                var result = await _erpContext.OrderDetails
                    .ToListAsync();
                var mappedResult = _mapper.Map<List<OpenGoodsForOrderDetailDto>>(result);

                return ApiResponse<List<OpenGoodsForOrderDetailDto>>.SuccessResult(mappedResult, _localizationService.GetLocalizedString("OrderDetailRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<List<OpenGoodsForOrderDetailDto>>.ErrorResult(_localizationService.GetLocalizedString("OrderDetailRetrievalError"), ex.Message, 500, "Error retrieving order detail data");
            }
        }
    }
}
