using AutoMapper;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class GrImportSerialLineService : IGrImportSerialLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public GrImportSerialLineService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<GrImportSerialLineDto>>> GetAllAsync()
        {
            try
            {
                var serialLines = await _unitOfWork.GrImportSerialLines.GetAllAsync();
                var serialLineDtos = _mapper.Map<IEnumerable<GrImportSerialLineDto>>(serialLines);

                return ApiResponse<IEnumerable<GrImportSerialLineDto>>.SuccessResult(
                    serialLineDtos,
                    _localizationService.GetLocalizedString("GrImportSerialLineRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportSerialLineDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportSerialLineGetAllError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportSerialLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var serialLine = await _unitOfWork.GrImportSerialLines.GetByIdAsync(id);
                if (serialLine == null)
                {
                    return ApiResponse<GrImportSerialLineDto>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportSerialLineNotFound"),
                        "Record not found",
                        404,
                        "GrImportSerialLine not found"
                    );
                }

                var serialLineDto = _mapper.Map<GrImportSerialLineDto>(serialLine);
                return ApiResponse<GrImportSerialLineDto>.SuccessResult(
                    serialLineDto,
                    _localizationService.GetLocalizedString("GrImportSerialLineRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportSerialLineDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportSerialLineGetByIdError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrImportSerialLineDto>>> GetByImportLineIdAsync(long importLineId)
        {
            try
            {
                var serialLines = await _unitOfWork.GrImportSerialLines.FindAsync(x => x.ImportLineId == importLineId);
                var serialLineDtos = _mapper.Map<IEnumerable<GrImportSerialLineDto>>(serialLines);

                return ApiResponse<IEnumerable<GrImportSerialLineDto>>.SuccessResult(
                    serialLineDtos,
                    _localizationService.GetLocalizedString("GrImportSerialLineRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportSerialLineDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportSerialLineGetByImportLineIdError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportSerialLineDto>> CreateAsync(CreateGrImportSerialLineDto createDto)
        {
            try
            {
                // ImportLine'ın var olup olmadığını kontrol et
                var importLineExists = await _unitOfWork.GrImportLines.ExistsAsync(createDto.ImportLineId);
                if (!importLineExists)
                {
                    return ApiResponse<GrImportSerialLineDto>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportLNotFound"),
                        "Import line not found",
                        400,
                        "GrImportL not found"
                    );
                }

                var serialLine = _mapper.Map<GrImportSerialLine>(createDto);

                await _unitOfWork.GrImportSerialLines.AddAsync(serialLine);
                await _unitOfWork.SaveChangesAsync();

                var serialLineDto = _mapper.Map<GrImportSerialLineDto>(serialLine);
                return ApiResponse<GrImportSerialLineDto>.SuccessResult(
                    serialLineDto,
                    _localizationService.GetLocalizedString("GrImportSerialLineCreatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportSerialLineDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportSerialLineCreateError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportSerialLineDto>> UpdateAsync(long id, UpdateGrImportSerialLineDto updateDto)
        {
            try
            {
                var serialLine = await _unitOfWork.GrImportSerialLines.GetByIdAsync(id);
                if (serialLine == null)
                {
                    return ApiResponse<GrImportSerialLineDto>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportSerialLineNotFound"),
                        "Record not found",
                        404,
                        "GrImportSerialLine not found"
                    );
                }

                // ImportLine'ın var olup olmadığını kontrol et
                var importLineExists = await _unitOfWork.GrImportLines.ExistsAsync(updateDto.ImportLineId);
                if (!importLineExists)
                {
                    return ApiResponse<GrImportSerialLineDto>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportLNotFound"),
                        "Import line not found",
                        400,
                        "GrImportL not found"
                    );
                }

                _mapper.Map(updateDto, serialLine);

                _unitOfWork.GrImportSerialLines.Update(serialLine);
                await _unitOfWork.SaveChangesAsync();

                var serialLineDto = _mapper.Map<GrImportSerialLineDto>(serialLine);
                return ApiResponse<GrImportSerialLineDto>.SuccessResult(
                    serialLineDto,
                    _localizationService.GetLocalizedString("GrImportSerialLineUpdatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportSerialLineDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportSerialLineUpdateError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var serialLine = await _unitOfWork.GrImportSerialLines.GetByIdAsync(id);
                if (serialLine == null)
                {
                    return ApiResponse<bool>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportSerialLineNotFound"),
                        "Record not found",
                        404,
                        "GrImportSerialLine not found"
                    );
                }

                await _unitOfWork.GrImportSerialLines.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(
                    true,
                    _localizationService.GetLocalizedString("GrImportSerialLineDeletedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportSerialLineDeleteError"),
                    "Error deleting data",
                    500,
                    ex.Message
                );
            }
        }

        public async Task<ApiResponse<bool>> ExistsAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.GrImportSerialLines.ExistsAsync((int)id);
                return ApiResponse<bool>.SuccessResult(
                    exists,
                    _localizationService.GetLocalizedString("GrImportSerialLineExistsCheckCompleted")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportSerialLineExistsCheckError"),
                    ex.Message,
                    500
                );
            }
        }
    }
}
