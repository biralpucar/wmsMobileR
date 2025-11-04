using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class MobilePageGroupService : IMobilePageGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public MobilePageGroupService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<MobilePageGroupDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobilePageGroups.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<MobilePageGroupDto>>(entities);
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilePageGroupDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.MobilePageGroups.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilePageGroupDto>.ErrorResult(message, "Record not found", 404, default);
                }

                var dto = _mapper.Map<MobilePageGroupDto>(entity);
                return ApiResponse<MobilePageGroupDto>.SuccessResult(dto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilePageGroupDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilePageGroupDto>>> GetByGroupCodeAsync(string groupCode)
        {
            try
            {
                var entities = await _unitOfWork.MobilePageGroups.FindAsync(x => x.GroupCode == groupCode && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilePageGroupDto>>(entities);
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilePageGroupDto>>> GetByMenuHeaderIdAsync(int menuHeaderId)
        {
            try
            {
                var entities = await _unitOfWork.MobilePageGroups.FindAsync(x => x.MenuHeaderId == menuHeaderId);
                var dtos = _mapper.Map<IEnumerable<MobilePageGroupDto>>(entities);
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilePageGroupDto>>> GetByMenuLineIdAsync(int menuLineId)
        {
            try
            {
                var entities = await _unitOfWork.MobilePageGroups.FindAsync(x => x.MenuLineId == menuLineId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilePageGroupDto>>(entities);
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilePageGroupDto>> CreateAsync(CreateMobilePageGroupDto createDto)
        {
            try
            {
                var entity = _mapper.Map<MobilePageGroup>(createDto);
                entity.CreatedDate = DateTime.UtcNow;

                await _unitOfWork.MobilePageGroups.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobilePageGroupDto>(entity);
                return ApiResponse<MobilePageGroupDto>.SuccessResult(dto, "Data created successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilePageGroupDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilePageGroupDto>> UpdateAsync(long id, UpdateMobilePageGroupDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.MobilePageGroups.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilePageGroupDto>.ErrorResult(message, "Record not found", 404, default);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.MobilePageGroups.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobilePageGroupDto>(entity);
                return ApiResponse<MobilePageGroupDto>.SuccessResult(dto, "Data updated successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilePageGroupDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.MobilePageGroups.ExistsAsync(id);
                if (!exists)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<bool>.ErrorResult(message, "Record not found", 404, "Record not found");
                }

                await _unitOfWork.MobilePageGroups.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, "Data deleted successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<bool>.ErrorResult(message, ex.Message, 500, "Error occurred");
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilePageGroupDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobilePageGroups.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilePageGroupDto>>(entities);
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilePageGroupDto>>> GetMobilPageGroupsByGroupCodeAsync()
        {
            try
            {
                var groupedByGroupCode = await _unitOfWork.MobilePageGroups.AsQueryable()
                    .Where(pg => !pg.IsDeleted)
                    .GroupBy(pg => pg.GroupCode)
                    .Select(g => g.First())
                    .ToListAsync();

                var dtos = _mapper.Map<IEnumerable<MobilePageGroupDto>>(groupedByGroupCode);
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.SuccessResult(dtos, "Sayfa grupları başarıyla getirildi");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilePageGroupDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }
    }
}
