using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class MobilemenuLineService : IMobilemenuLineService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public MobilemenuLineService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuLineDto>>> GetAllAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuLines.GetAllAsync();
                var dtos = _mapper.Map<IEnumerable<MobilemenuLineDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuLineDto>> GetByIdAsync(long id)
        {
            try
            {
                var entity = await _unitOfWork.MobilemenuLines.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilemenuLineDto>.ErrorResult(message, "Record not found", 404, default);
                }

                var dto = _mapper.Map<MobilemenuLineDto>(entity);
                return ApiResponse<MobilemenuLineDto>.SuccessResult(dto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuLineDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuLineDto>> GetByItemIdAsync(string itemId)
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuLines.FindAsync(x => x.ItemId == itemId && !x.IsDeleted);
                var entity = entities.FirstOrDefault();
                
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilemenuLineDto>.ErrorResult(message, "Record not found", 404, default);
                }

                var dto = _mapper.Map<MobilemenuLineDto>(entity);
                return ApiResponse<MobilemenuLineDto>.SuccessResult(dto, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuLineDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuLineDto>>> GetByHeaderIdAsync(int headerId)
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuLines.FindAsync(x => x.HeaderId == headerId && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilemenuLineDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuLineDto>>> GetByTitleAsync(string title)
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuLines.FindAsync(x => x.Title.Contains(title) && !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilemenuLineDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuLineDto>> CreateAsync(CreateMobilemenuLineDto createDto)
        {
            try
            {
                var entity = _mapper.Map<MobilemenuLine>(createDto);
                entity.CreatedDate = DateTime.UtcNow;

                await _unitOfWork.MobilemenuLines.AddAsync(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobilemenuLineDto>(entity);
                return ApiResponse<MobilemenuLineDto>.SuccessResult(dto, "Data created successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuLineDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<MobilemenuLineDto>> UpdateAsync(long id, UpdateMobilemenuLineDto updateDto)
        {
            try
            {
                var entity = await _unitOfWork.MobilemenuLines.GetByIdAsync(id);
                if (entity == null)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<MobilemenuLineDto>.ErrorResult(message, "Record not found", 404, default);
                }

                _mapper.Map(updateDto, entity);
                entity.UpdatedDate = DateTime.UtcNow;

                _unitOfWork.MobilemenuLines.Update(entity);
                await _unitOfWork.SaveChangesAsync();

                var dto = _mapper.Map<MobilemenuLineDto>(entity);
                return ApiResponse<MobilemenuLineDto>.SuccessResult(dto, "Data updated successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<MobilemenuLineDto>.ErrorResult(message, ex.Message, 500, default);
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.MobilemenuLines.ExistsAsync(id);
                if (!exists)
                {
                    var message = _localizationService.GetLocalizedString("RecordNotFound");
                    return ApiResponse<bool>.ErrorResult(message, "Record not found", 404, "Record not found");
                }

                await _unitOfWork.MobilemenuLines.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(true, "Data deleted successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<bool>.ErrorResult(message, ex.Message, 500, "Error occurred");
            }
        }

        public async Task<ApiResponse<IEnumerable<MobilemenuLineDto>>> GetActiveAsync()
        {
            try
            {
                var entities = await _unitOfWork.MobilemenuLines.FindAsync(x => !x.IsDeleted);
                var dtos = _mapper.Map<IEnumerable<MobilemenuLineDto>>(entities);
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.SuccessResult(dtos, "Data retrieved successfully");
            }
            catch (Exception ex)
            {
                var message = _localizationService.GetLocalizedString("ErrorOccurred");
                return ApiResponse<IEnumerable<MobilemenuLineDto>>.ErrorResult(message, ex.Message, 500, default);
            }
        }
    }
}
