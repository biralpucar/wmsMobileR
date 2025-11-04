using AutoMapper;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class TrRouteService : ITrRouteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public TrRouteService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrRouteDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.TrRoutes
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrRouteDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                var dto = _mapper.Map<TrRouteDto>(entity);
                return ApiResponse<TrRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.LineId == lineId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.StockCode == stockCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetBySerialNoAsync(string serialNo)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.SerialNo == serialNo && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetBySourceWarehouseAsync(string sourceWarehouse)
        {
            try
            {
                // Convert string to int for comparison with SourceWarehouse (int?)
                if (int.TryParse(sourceWarehouse, out int warehouseId))
                {
                    var entities = await _unitOfWork.TrRoutes
                        .FindAsync(x => x.SourceWarehouse == warehouseId && !x.IsDeleted);
                    var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                    return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
                }
                else
                {
                    // If conversion fails, return empty result
                    var emptyDtos = new List<TrRouteDto>();
                    return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(emptyDtos, _localizationService.GetLocalizedString("Success"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByTargetWarehouseAsync(string targetWarehouse)
        {
            try
            {
                // Convert string to int for comparison with TargetWarehouse (int?)
                if (int.TryParse(targetWarehouse, out int warehouseId))
                {
                    var entities = await _unitOfWork.TrRoutes
                        .FindAsync(x => x.TargetWarehouse == warehouseId && !x.IsDeleted);
                    var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                    return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
                }
                else
                {
                    // If conversion fails, return empty result
                    var emptyDtos = new List<TrRouteDto>();
                    return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(emptyDtos, _localizationService.GetLocalizedString("Success"));
                }
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByQuantityRangeAsync(decimal minQuantity, decimal maxQuantity)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.Quantity >= minQuantity && x.Quantity <= maxQuantity && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByRouteCodeAsync(string routeCode)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.RouteCode == routeCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByWarehouseIdAsync(long warehouseId)
        {
            try
            {
                // TrRoute model doesn't have WarehouseId property, filtering only by IsDeleted
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByDescriptionAsync(string description)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.Description.Contains(description) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByStatusAsync(short status)
        {
            try
            {
                // TrRoute model doesn't have Status property, filtering only by IsDeleted
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByPriorityAsync(short priority)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.Priority == priority && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrRouteDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var entities = await _unitOfWork.TrRoutes
                    .FindAsync(x => x.CreatedDate >= startDate && x.CreatedDate <= endDate && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrRouteDto>>(entities);
                return ApiResponse<IEnumerable<TrRouteDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrRouteDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrRouteDto>> CreateAsync(CreateTrRouteDto createDto)
        {
            try
            {
                var entity = _mapper.Map<TrRoute>(createDto);
                entity.CreatedDate = DateTime.Now;
                entity.IsDeleted = false;

                await _unitOfWork.TrRoutes.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrRouteDto>(entity);
                return ApiResponse<TrRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrRouteDto>> UpdateAsync(long id, UpdateTrRouteDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.TrRoutes.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrRouteDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.Now;

                _unitOfWork.TrRoutes.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrRouteDto>(entity);
                return ApiResponse<TrRouteDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrRouteDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.TrRoutes.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                await _unitOfWork.TrRoutes.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }
    }
}
