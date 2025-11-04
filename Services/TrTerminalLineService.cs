using AutoMapper;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class TrTerminalLineService : ITrTerminalLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public TrTerminalLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrTerminalLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.TrTerminalLines
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                var dto = _mapper.Map<TrTerminalLineDto>(entity);
                return ApiResponse<TrTerminalLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByTerminalIdAsync(long terminalId)
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                // TrTerminalLine'da StockCode yok, Line üzerinden erişmek gerekiyor
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => x.LineId == lineId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByRouteIdAsync(long routeId)
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => x.RouteId == routeId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByUserIdAsync(string userId)
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByTerminalCodeAsync(string terminalCode)
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => x.CreatedDate >= startDate && x.CreatedDate <= endDate && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetByStatusAsync(string status)
        {
            try
            {
                // TrTerminalLine model doesn't have Status property, filtering only by IsDeleted
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrTerminalLineDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrTerminalLines
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrTerminalLineDto>>(entities);
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrTerminalLineDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrTerminalLineDto>> CreateAsync(CreateTrTerminalLineDto createDto)
        {
            try
            {
                var entity = _mapper.Map<TrTerminalLine>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;

                await _unitOfWork.TrTerminalLines.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrTerminalLineDto>(entity);
                return ApiResponse<TrTerminalLineDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrTerminalLineDto>> UpdateAsync(long id, UpdateTrTerminalLineDto dto)
        {
            try
            {
                var entity = await _unitOfWork.TrTerminalLines
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                _mapper.Map(dto, entity);
                entity.UpdatedDate = DateTime.Now;

                _unitOfWork.TrTerminalLines
                    .Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var updatedDto = _mapper.Map<TrTerminalLineDto>(entity);
                return ApiResponse<TrTerminalLineDto>.SuccessResult(updatedDto, _localizationService.GetLocalizedString("UpdateSuccess"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrTerminalLineDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.TrTerminalLines.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                await _unitOfWork.TrTerminalLines.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("DeleteSuccess"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }
    }
}
