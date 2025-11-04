using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class PlatformUserGroupMatchService : IPlatformUserGroupMatchService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public PlatformUserGroupMatchService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>> GetAllAsync()
        {
            try
            {
                var matches = await _unitOfWork.PlatformUserGroupMatches.GetAllAsync();
                var result = _mapper.Map<IEnumerable<PlatformUserGroupMatchDto>>(matches);
                return ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>.SuccessResult(result, _localizationService.GetLocalizedString("SuccessfullyRetrieved"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorRetrievingData"), ex.Message, 500);
            }
        }

        public async Task<ApiResponse<PlatformUserGroupMatchDto>> GetByIdAsync(long id)
        {
            try
            {
                var match = await _unitOfWork.PlatformUserGroupMatches.GetByIdAsync(id);
                if (match == null)
                {
                    return ApiResponse<PlatformUserGroupMatchDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404, "Record not found");
                }
                
                var result = _mapper.Map<PlatformUserGroupMatchDto>(match);
                return ApiResponse<PlatformUserGroupMatchDto>.SuccessResult(result, _localizationService.GetLocalizedString("SuccessfullyRetrieved"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PlatformUserGroupMatchDto>.ErrorResult(
                    _localizationService.GetLocalizedString("PlatformUserGroupMatchNotFound"), 
                    "Record not found", 
                    404, 
                    ex.Message
                );
            }
        }

        public async Task<ApiResponse<PlatformUserGroupMatchDto>> CreateAsync(CreatePlatformUserGroupMatchDto createDto)
        {
            try
            {
                var match = _mapper.Map<PlatformUserGroupMatch>(createDto);
                var createdMatch = await _unitOfWork.PlatformUserGroupMatches.AddAsync(match);
                await _unitOfWork.SaveChangesAsync();
                
                var result = _mapper.Map<PlatformUserGroupMatchDto>(createdMatch);
                return ApiResponse<PlatformUserGroupMatchDto>.SuccessResult(result, _localizationService.GetLocalizedString("SuccessfullyCreated"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PlatformUserGroupMatchDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorCreatingRecord"), ex.Message, 500, "Error creating record");
            }
        }

        public async Task<ApiResponse<PlatformUserGroupMatchDto>> UpdateAsync(long id, UpdatePlatformUserGroupMatchDto updateDto)
        {
            try
            {
                var existingMatch = await _unitOfWork.PlatformUserGroupMatches.GetByIdAsync(id);
                if (existingMatch == null)
                {
                    return ApiResponse<PlatformUserGroupMatchDto>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404, "Record not found");
                }

                if (updateDto.UserId.HasValue)
                    existingMatch.UserId = updateDto.UserId.Value;

                if (updateDto.GroupCode != null)
                    existingMatch.GroupCode = updateDto.GroupCode;

                _unitOfWork.PlatformUserGroupMatches.Update(existingMatch);
                await _unitOfWork.SaveChangesAsync();

                var result = _mapper.Map<PlatformUserGroupMatchDto>(existingMatch);
                return ApiResponse<PlatformUserGroupMatchDto>.SuccessResult(result, _localizationService.GetLocalizedString("SuccessfullyUpdated"));
            }
            catch (Exception ex)
            {
                return ApiResponse<PlatformUserGroupMatchDto>.ErrorResult(_localizationService.GetLocalizedString("ErrorUpdatingRecord"), ex.Message, 500, "Error updating record");
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var match = await _unitOfWork.PlatformUserGroupMatches.GetByIdAsync(id);
                if (match == null)
                {
                    return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("RecordNotFound"), "Record not found", 404, "Record not found");
                }

                await _unitOfWork.PlatformUserGroupMatches.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();
                
                return ApiResponse<bool>.SuccessResult(true, _localizationService.GetLocalizedString("SuccessfullyDeleted"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorDeletingRecord"), ex.Message, 500, "Error deleting record");
            }
        }

        public async Task<ApiResponse<bool>> ExistsAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.PlatformUserGroupMatches.ExistsAsync(id);
                return ApiResponse<bool>.SuccessResult(exists, _localizationService.GetLocalizedString("SuccessfullyRetrieved"));
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(_localizationService.GetLocalizedString("ErrorCheckingExistence"), ex.Message, 500, "Error checking existence");
            }
        }

        public async Task<ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>> GetByUserIdAsync(int userId)
        {
            try
            {
                var matches = await _unitOfWork.PlatformUserGroupMatches.FindAsync(m => m.UserId == userId);
                var result = _mapper.Map<IEnumerable<PlatformUserGroupMatchDto>>(matches);
                return ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>.SuccessResult(result, _localizationService.GetLocalizedString("SuccessfullyRetrieved"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorRetrievingData"), ex.Message, 500, "Error retrieving data");
            }
        }

        public async Task<ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>> GetByGroupCodeAsync(string groupCode)
        {
            try
            {
                var matches = await _unitOfWork.PlatformUserGroupMatches.FindAsync(m => m.GroupCode == groupCode);
                var result = _mapper.Map<IEnumerable<PlatformUserGroupMatchDto>>(matches);
                return ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>.SuccessResult(result, _localizationService.GetLocalizedString("SuccessfullyRetrieved"));
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<PlatformUserGroupMatchDto>>.ErrorResult(_localizationService.GetLocalizedString("ErrorRetrievingData"), ex.Message, 500, "Error retrieving data");
            }
        }



    }
}
