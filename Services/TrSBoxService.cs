using AutoMapper;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class TrSBoxService : ITrSBoxService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public TrSBoxService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrSBoxDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.TrSBoxes
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrSBoxDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                var dto = _mapper.Map<TrSBoxDto>(entity);
                return ApiResponse<TrSBoxDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrSBoxDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByBoxCodeAsync(string boxCode)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.BoxCode == boxCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByImportLineIdAsync(long importLineId)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.ImportLineId == importLineId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByBoxIdAsync(long boxId)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.BoxId == boxId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetBySerialNumberAsync(string serialNumber)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.SerialNumber == serialNumber && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetBySerialNoAsync(string serialNo)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.SerialNumber == serialNo && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByDescriptionAsync(string description)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.Description.Contains(description) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> SearchByDescriptionAsync(string description)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.Description.Contains(description) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => x.StockCode == stockCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrSBoxDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrSBoxes
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrSBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrSBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrSBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrSBoxDto>> CreateAsync(CreateTrSBoxDto createDto)
        {
            try
            {
                var entity = _mapper.Map<TrSBox>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;

                await _unitOfWork.TrSBoxes.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrSBoxDto>(entity);
                return ApiResponse<TrSBoxDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrSBoxDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrSBoxDto>> UpdateAsync(long id, UpdateTrSBoxDto dto)
        {
            try
            {
                var entity = await _unitOfWork.TrSBoxes
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrSBoxDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                _mapper.Map(dto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.TrSBoxes.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var updatedDto = _mapper.Map<TrSBoxDto>(entity);
                return ApiResponse<TrSBoxDto>.SuccessResult(updatedDto, _localizationService.GetLocalizedString("UpdateSuccess"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrSBoxDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.TrSBoxes.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                await _unitOfWork.TrSBoxes.SoftDelete(id);
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
