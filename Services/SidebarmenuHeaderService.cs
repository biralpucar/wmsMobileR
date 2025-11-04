using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;
using WMS_WEBAPI.Data;

namespace WMS_WEBAPI.Services
{
    public class SidebarmenuHeaderService : ISidebarmenuHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public SidebarmenuHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<SidebarmenuHeaderDto>>> GetAllAsync()
        {
            try
            {
                var headers = await _unitOfWork.SidebarmenuHeaders.GetAllAsync();
                var headerDtos = _mapper.Map<IEnumerable<SidebarmenuHeaderDto>>(headers);
                return ApiResponse<IEnumerable<SidebarmenuHeaderDto>>.SuccessResult(headerDtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<IEnumerable<SidebarmenuHeaderDto>>.ErrorResult(message, ex.Message, 500, "Error retrieving data");
            }
        }

        public async Task<ApiResponse<SidebarmenuHeaderDto>> GetByIdAsync(long id)
        {
            try
            {
                var header = await _unitOfWork.SidebarmenuHeaders.GetByIdAsync(id);
                if (header == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<SidebarmenuHeaderDto>.ErrorResult(notFoundMessage, "Record not found", 404, "Record not found");
                }

                var headerDto = _mapper.Map<SidebarmenuHeaderDto>(header);
                return ApiResponse<SidebarmenuHeaderDto>.SuccessResult(headerDto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<SidebarmenuHeaderDto>.ErrorResult(message, ex.Message, 500, "Error retrieving data");
            }
        }

        public async Task<ApiResponse<SidebarmenuHeaderDto>> CreateAsync(CreateSidebarmenuHeaderDto createDto)
        {
            try
            {
                var header = _mapper.Map<SidebarmenuHeader>(createDto);
                var createdHeader = await _unitOfWork.SidebarmenuHeaders.AddAsync(header);
                await _unitOfWork.SaveChangesAsync();
                
                var headerDto = _mapper.Map<SidebarmenuHeaderDto>(createdHeader);
                return ApiResponse<SidebarmenuHeaderDto>.SuccessResult(headerDto, "Data created successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorCreatingData");
                return ApiResponse<SidebarmenuHeaderDto>.ErrorResult(message, ex.Message, 500, "Error creating record");
            }
        }

        public async Task<ApiResponse<SidebarmenuHeaderDto>> UpdateAsync(long id, UpdateSidebarmenuHeaderDto updateDto)
        {
            try
            {
                var existingHeader = await _unitOfWork.SidebarmenuHeaders.GetByIdAsync(id);
                if (existingHeader == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<SidebarmenuHeaderDto>.ErrorResult(notFoundMessage, "Record not found", 404, "Record not found");
                }

                if (updateDto.MenuKey != null)
                    existingHeader.MenuKey = updateDto.MenuKey;

                if (updateDto.Title != null)
                    existingHeader.Title = updateDto.Title;

                if (updateDto.Icon != null)
                    existingHeader.Icon = updateDto.Icon;

                if (updateDto.Color != null)
                    existingHeader.Color = updateDto.Color;

                if (updateDto.DarkColor != null)
                    existingHeader.DarkColor = updateDto.DarkColor;

                if (updateDto.ShadowColor != null)
                    existingHeader.ShadowColor = updateDto.ShadowColor;

                if (updateDto.DarkShadowColor != null)
                    existingHeader.DarkShadowColor = updateDto.DarkShadowColor;

                if (updateDto.TextColor != null)
                    existingHeader.TextColor = updateDto.TextColor;

                if (updateDto.DarkTextColor != null)
                    existingHeader.DarkTextColor = updateDto.DarkTextColor;

                if (updateDto.RoleLevel.HasValue)
                    existingHeader.RoleLevel = updateDto.RoleLevel.Value;

                _unitOfWork.SidebarmenuHeaders.Update(existingHeader);
                await _unitOfWork.SaveChangesAsync();

                var headerDto = _mapper.Map<SidebarmenuHeaderDto>(existingHeader);
                return ApiResponse<SidebarmenuHeaderDto>.SuccessResult(headerDto, "Data updated successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorUpdatingData");
                return ApiResponse<SidebarmenuHeaderDto>.ErrorResult(message, ex.Message, 500, "Error updating record");
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var header = await _unitOfWork.SidebarmenuHeaders.GetByIdAsync(id);
                if (header == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<bool>.ErrorResult(notFoundMessage, "Record not found", 404, "Record not found");
                }

                await _unitOfWork.SidebarmenuHeaders.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();
                return ApiResponse<bool>.SuccessResult(true, "Data deleted successfully");
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
                var exists = await _unitOfWork.SidebarmenuHeaders.ExistsAsync(id);
                return ApiResponse<bool>.SuccessResult(exists, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<bool>.ErrorResult(message, ex.Message, 500, "Error deleting record");
            }
        }

        public async Task<ApiResponse<SidebarmenuHeaderDto>> GetByMenuKeyAsync(string menuKey)
        {
            try
            {
                var header = await _unitOfWork.SidebarmenuHeaders.GetFirstOrDefaultAsync(h => h.MenuKey == menuKey);
                if (header == null)
                {
                    var notFoundMessage = _localizationService.GetLocalizedString("DataNotFound");
                    return ApiResponse<SidebarmenuHeaderDto>.ErrorResult(notFoundMessage, "Record not found", 404, "Record not found");
                }

                var headerDto = _mapper.Map<SidebarmenuHeaderDto>(header);
                return ApiResponse<SidebarmenuHeaderDto>.SuccessResult(headerDto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<SidebarmenuHeaderDto>.ErrorResult(message, ex.Message, 500, "Error retrieving data");
            }
        }

        public async Task<ApiResponse<IEnumerable<SidebarmenuHeaderDto>>> GetByRoleLevelAsync(int roleLevel)
        {
            try
            {
                var headers = await _unitOfWork.SidebarmenuHeaders.FindAsync(h => h.RoleLevel <= roleLevel);
                var headerDtos = _mapper.Map<IEnumerable<SidebarmenuHeaderDto>>(headers);
                return ApiResponse<IEnumerable<SidebarmenuHeaderDto>>.SuccessResult(headerDtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
                return ApiResponse<IEnumerable<SidebarmenuHeaderDto>>.ErrorResult(message, ex.Message, 500, "Error retrieving data");
            }
        }

    public async Task<ApiResponse<List<SidebarmenuHeader>>> GetSidebarmenuHeadersByUserId(int userId)
    {
        try
        {
            var user = await _unitOfWork.UserEntities.AsQueryable().FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted);
            if (user == null)
            {
                return ApiResponse<List<SidebarmenuHeader>>.ErrorResult(
                    _localizationService.GetLocalizedString("UserNotFound"),
                    "Record not found",
                    404
                );
            }

            var query = _unitOfWork.SidebarmenuHeaders.AsQueryable();

            if (user.RoleId != 1)
            {
                query = query
                    .Where(h => h.RoleLevel <= user.RoleId)
                    .Include(h => h.Lines);
            }
            else
            {
                var userGroupCodes = await _unitOfWork.PlatformUserGroupMatches
                    .AsQueryable()
                    .Where(a => a.UserId == userId && !a.IsDeleted)
                    .Select(a => a.GroupCode)
                    .Distinct()
                    .ToListAsync();

                query = query
                    .Where(h => h.Lines.Any(l =>
                        _unitOfWork.PlatformPageGroups.AsQueryable().Any(pg =>
                            !pg.IsDeleted &&
                            userGroupCodes.Contains(pg.GroupCode) &&
                            pg.MenuHeaderId == h.Id &&
                            pg.MenuLineId == l.Id)))
                    .Include(h => h.Lines);
            }

            var result = await query.ToListAsync();
            return ApiResponse<List<SidebarmenuHeader>>.SuccessResult(result, "Data retrieved successfully");
        }
        catch (Exception ex)
        {
            var message = _localizationService.GetLocalizedString("ErrorRetrievingData");
            return ApiResponse<List<SidebarmenuHeader>>.ErrorResult(message, ex.Message, 500, message);
        }
    }

    }
}
