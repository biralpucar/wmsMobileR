using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class MobilemenuHeaderService : IMobilemenuHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public MobilemenuHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuHeaderDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuHeaders.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<MobilemenuHeaderDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuHeaderDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.MobilemenuHeaders.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilemenuHeaderDto>.ErrorResult(message, "Record not found", 404, "Record not found");
                }

                var dto = _mapper.Map<MobilemenuHeaderDto>(entity);
                return ApiResponse<MobilemenuHeaderDto>.SuccessResult(dto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuHeaderDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuHeaderDto>> GetByMenuIdAsync(string menuId)
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuHeaders.FindAsync(x => x.MenuId == menuId && !x.IsDeleted);
                var entity = entities.FirstOrDefault();
                
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilemenuHeaderDto>.ErrorResult(message, "Record not found", 404, "Record not found");
                }

                var dto = _mapper.Map<MobilemenuHeaderDto>(entity);
                return ApiResponse<MobilemenuHeaderDto>.SuccessResult(dto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuHeaderDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuHeaderDto>>> GetByTitleAsync(string title)
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuHeaders.FindAsync(x => x.Title.Contains(title) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilemenuHeaderDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuHeaderDto>>> GetOpenMenusAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuHeaders.FindAsync(x => x.IsOpen && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilemenuHeaderDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuHeaderDto>> CreateAsync(CreateMobilemenuHeaderDto createDto)
        {
            try
            {
                var entity = _mapper.Map<MobilemenuHeader>(createDto);
                entity.CreatedDate = DateTime.UtcNow;

                await _unitOfWork.MobilemenuHeaders.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobilemenuHeaderDto>(entity);
                return ApiResponse<MobilemenuHeaderDto>.SuccessResult(dto, "Data created successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuHeaderDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuHeaderDto>> UpdateAsync(long id, UpdateMobilemenuHeaderDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.MobilemenuHeaders.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilemenuHeaderDto>.ErrorResult(message, "Record not found", 404, "Record not found");
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.MobilemenuHeaders.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobilemenuHeaderDto>(entity);
                return ApiResponse<MobilemenuHeaderDto>.SuccessResult(dto, "Data updated successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuHeaderDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.MobilemenuHeaders.ExistsAsync(id);
                if (!exists)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<bool>.ErrorResult(message, "Record not found", 404, "Record not found");
                }

                await _unitOfWork.MobilemenuHeaders.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, "Data deleted successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<bool>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuHeaderDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuHeaders.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilemenuHeaderDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuHeaderDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }
    }
}
