using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class SidebarmenuLineService : ISidebarmenuLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public SidebarmenuLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<SidebarmenuLineDto>>> GetAllAsync()
        {
            try
            {
                var lines = await _unitOfWork.SidebarmenuLines.GetAllAsync();
                var lineDtos = _mapper.Map<IEnumerable<SidebarmenuLineDto>>(lines);
                return ApiResponse<IEnumerable<SidebarmenuLineDto>>.SuccessResult(lineDtos, _localizationService.GetLocalizedString("DataRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<IEnumerable<SidebarmenuLineDto>>.ErrorResult(message, ex.Message, 500, _localizationService.GetLocalizedString("ErrorRetrievingData"));
            }
        }

        public async Task<ApiResponse<SidebarmenuLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var line = await _unitOfWork.SidebarmenuLines.GetByIdAsync(id);
                if (line == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<SidebarmenuLineDto>.ErrorResult(notFoundMessage, _localizationService.GetLocalizedString("RecordNotFound"), 404, _localizationService.GetLocalizedString("RecordNotFound"));
                }

                var lineDto = _mapper.Map<SidebarmenuLineDto>(line);
                return ApiResponse<SidebarmenuLineDto>.SuccessResult(lineDto, _localizationService.GetLocalizedString("DataRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<SidebarmenuLineDto>.ErrorResult(message, ex.Message, 500, _localizationService.GetLocalizedString("ErrorRetrievingData"));
            }
        }

        public async Task<ApiResponse<SidebarmenuLineDto>> CreateAsync(CreateSidebarmenuLineDto createDto)
        {
            try
            {
                var line = _mapper.Map<SidebarmenuLine>(createDto);
                var createdLine = await _unitOfWork.SidebarmenuLines.AddAsync(line);
                await _unitOfWork.SaveChangesAsync();
                
                var lineDto = _mapper.Map<SidebarmenuLineDto>(createdLine);
                return ApiResponse<SidebarmenuLineDto>.SuccessResult(lineDto, _localizationService.GetLocalizedString("DataCreatedSuccessfully"));
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorCreatingData");
                return ApiResponse<SidebarmenuLineDto>.ErrorResult(message, ex.Message, 500, _localizationService.GetLocalizedString("ErrorCreatingData"));
            }
        }

        public async Task<ApiResponse<SidebarmenuLineDto>> UpdateAsync(long id, UpdateSidebarmenuLineDto updateDto)
        {
            try
            {
                var existingLine = await _unitOfWork.SidebarmenuLines.GetByIdAsync(id);
                if (existingLine == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<SidebarmenuLineDto>.ErrorResult(notFoundMessage, _localizationService.GetLocalizedString("RecordNotFound"), 404, _localizationService.GetLocalizedString("RecordNotFound"));
                }

                if (updateDto.HeaderId.HasValue)
                    existingLine.HeaderId = updateDto.HeaderId.Value;

                if (updateDto.Page != null)
                    existingLine.Page = updateDto.Page;

                if (updateDto.Title != null)
                    existingLine.Title = updateDto.Title;

                if (updateDto.Description != null)
                    existingLine.Description = updateDto.Description;

                if (updateDto.Icon != null)
                    existingLine.Icon = updateDto.Icon;

                _unitOfWork.SidebarmenuLines.Update(existingLine);
                await _unitOfWork.SaveChangesAsync();

                var lineDto = _mapper.Map<SidebarmenuLineDto>(existingLine);
                return ApiResponse<SidebarmenuLineDto>.SuccessResult(lineDto, _localizationService.GetLocalizedString("DataUpdatedSuccessfully"));
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorUpdatingData");
                return ApiResponse<SidebarmenuLineDto>.ErrorResult(message, ex.Message, 500, _localizationService.GetLocalizedString("ErrorUpdatingData"));
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var line = await _unitOfWork.SidebarmenuLines.GetByIdAsync(id);
                if (line == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<bool>.ErrorResult(notFoundMessage, _localizationService.GetLocalizedString("RecordNotFound"), 404, _localizationService.GetLocalizedString("RecordNotFound"));
                }

                await _unitOfWork.SidebarmenuLines.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();
                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("DataDeletedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("ErrorOccurred"),
                    ex.Message,
                    500);
            }
        }

        public async Task<ApiResponse<bool>> ExistsAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.SidebarmenuLines.ExistsAsync(id);
                return ApiResponse<bool>.SuccessResult(exists, _localizationService.GetLocalizedString("DataRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<bool>.ErrorResult(message, ex.Message, 500, _localizationService.GetLocalizedString("ErrorDeletingData"));
            }
        }

        public async Task<ApiResponse<IEnumerable<SidebarmenuLineDto>>> GetByHeaderIdAsync(int headerId)
        {
            try
            {
                var lines = await _unitOfWork.SidebarmenuLines.FindAsync(l => l.HeaderId == headerId);
                var lineDtos = _mapper.Map<IEnumerable<SidebarmenuLineDto>>(lines);
                return ApiResponse<IEnumerable<SidebarmenuLineDto>>.SuccessResult(lineDtos, _localizationService.GetLocalizedString("DataRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<IEnumerable<SidebarmenuLineDto>>.ErrorResult(message, ex.Message, 500, _localizationService.GetLocalizedString("ErrorRetrievingData"));
            }
        }

        public async Task<ApiResponse<SidebarmenuLineDto>> GetByPageAsync(string page)
        {
            try
            {
                var line = await _unitOfWork.SidebarmenuLines.GetFirstOrDefaultAsync(l => l.Page == page);
                if (line == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<SidebarmenuLineDto>.ErrorResult(notFoundMessage, _localizationService.GetLocalizedString("RecordNotFound"), 404, _localizationService.GetLocalizedString("RecordNotFound"));
                }

                var lineDto = _mapper.Map<SidebarmenuLineDto>(line);
                return ApiResponse<SidebarmenuLineDto>.SuccessResult(lineDto, _localizationService.GetLocalizedString("DataRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<SidebarmenuLineDto>.ErrorResult(message, ex.Message, 500, _localizationService.GetLocalizedString("ErrorRetrievingData"));
            }
        }
    }
}
