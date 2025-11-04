using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class MobileUserGroupMatchService : IMobileUserGroupMatchService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public MobileUserGroupMatchService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<MobileUserGroupMatchDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobileUserGroupMatches.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<MobileUserGroupMatchDto>>(entities);
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobileUserGroupMatchDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.MobileUserGroupMatches.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobileUserGroupMatchDto>.ErrorResult(message, "Record not found", 404, default);
                }

                var dto = _mapper.Map<MobileUserGroupMatchDto>(entity);
                return ApiResponse<MobileUserGroupMatchDto>.SuccessResult(dto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobileUserGroupMatchDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobileUserGroupMatchDto>>> GetByUserIdAsync(int userId)
        {
            try
            {
                var entities = await _unitOfWork.MobileUserGroupMatches.FindAsync(x => x.UserId == userId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobileUserGroupMatchDto>>(entities);
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobileUserGroupMatchDto>>> GetByGroupCodeAsync(string groupCode)
        {
            try
            {
                var entities = await _unitOfWork.MobileUserGroupMatches.FindAsync(x => x.GroupCode == groupCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobileUserGroupMatchDto>>(entities);
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobileUserGroupMatchDto>> CreateAsync(CreateMobileUserGroupMatchDto createDto)
        {
            try
            {
                var entity = _mapper.Map<MobileUserGroupMatch>(createDto);
                entity.CreatedDate = DateTime.UtcNow;

                await _unitOfWork.MobileUserGroupMatches.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobileUserGroupMatchDto>(entity);
                return ApiResponse<MobileUserGroupMatchDto>.SuccessResult(dto, "Data created successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobileUserGroupMatchDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobileUserGroupMatchDto>> UpdateAsync(long id, UpdateMobileUserGroupMatchDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.MobileUserGroupMatches.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobileUserGroupMatchDto>.ErrorResult(message, "Record not found", 404, default);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.MobileUserGroupMatches.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobileUserGroupMatchDto>(entity);
                return ApiResponse<MobileUserGroupMatchDto>.SuccessResult(dto, "Data updated successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobileUserGroupMatchDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.MobileUserGroupMatches.ExistsAsync(id);
                if (!exists)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<bool>.ErrorResult(message, "Record not found", 404, "Record not found");
                }

                await _unitOfWork.MobileUserGroupMatches.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, "Data deleted successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<bool>.ErrorResult(message, ex.Message, 500, "Error occurred");
            }
        }

        public async Task<ApiResponse<IEnumerable<MobileUserGroupMatchDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobileUserGroupMatches.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobileUserGroupMatchDto>>(entities);
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobileUserGroupMatchDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }
    }
}
