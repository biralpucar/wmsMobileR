using AutoMapper;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class TrBoxService : ITrBoxService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public TrBoxService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<TrBoxDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrBoxes
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrBoxDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.TrBoxes
                    .GetByIdAsync(id);

                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrBoxDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                var dto = _mapper.Map<TrBoxDto>(entity);
                return ApiResponse<TrBoxDto>.SuccessResult(dto, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrBoxDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrBoxDto>>> GetByBoxCodeAsync(string boxCode)
        {
            try
            {
                var entities = await _unitOfWork.TrBoxes
                    .FindAsync(x => x.BoxCode == boxCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrBoxDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.TrBoxes
                    .FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrBoxDto>> CreateAsync(CreateTrBoxDto createDto)
        {
            try
            {
                var entity = _mapper.Map<TrBox>(createDto);
                entity.CreatedDate = DateTime.UtcNow;
                entity.IsDeleted = false;

                await _unitOfWork.TrBoxes.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrBoxDto>(entity);
                return ApiResponse<TrBoxDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrBoxDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<TrBoxDto>> UpdateAsync(long id, UpdateTrBoxDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.TrBoxes.GetByIdAsync(id);
                if (entity == null || entity.IsDeleted)
                {
                    return ApiResponse<TrBoxDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.TrBoxes.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<TrBoxDto>(entity);
                return ApiResponse<TrBoxDto>.SuccessResult(dto, _localizationService.GetLocalizedString("RecordUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<TrBoxDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.TrBoxes.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), _localizationService.GetLocalizedString("RecordNotFound"), 404);
                }

                await _unitOfWork.TrBoxes.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("RecordDeletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrBoxDto>>> GetByImportLineIdAsync(long importLineId)
        {
            try
            {
                var entities = await _unitOfWork.TrBoxes
                    .FindAsync(x => x.ImportLineId == importLineId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrBoxDto>>> GetByBoxNumberAsync(string boxNumber)
        {
            try
            {
                var entities = await _unitOfWork.TrBoxes
                    .FindAsync(x => x.BoxNumber == boxNumber && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }

        public async Task<ApiResponse<IEnumerable<TrBoxDto>>> GetByDescriptionAsync(string description)
        {
            try
            {
                var entities = await _unitOfWork.TrBoxes
                    .FindAsync(x => x.Description.Contains(description) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<TrBoxDto>>(entities);
                return ApiResponse<IEnumerable<TrBoxDto>>.SuccessResult(dtos, _localizationService.GetLocalizedString("Success"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<TrBoxDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorOccurred") + ": " + ex.Message, ex.Message, 500);
            }
        }
    }
}
