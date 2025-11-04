using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class GrImportLService : IGrImportLService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public GrImportLService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<GrImportLDto>>> GetAllAsync()
        {
            try
            {
                var grImportLs = await _unitOfWork.GrImportLines.GetAllAsync();
                var grImportLDtos = _mapper.Map<IEnumerable<GrImportLDto>>(grImportLs);
                
                return ApiResponse<IEnumerable<GrImportLDto>>.SuccessResult(
                    grImportLDtos, 
                    _localizationService.GetLocalizedString("GrImportLRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportLDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportLDto?>> GetByIdAsync(long id)
        {
            try
            {
                var grImportL = await _unitOfWork.GrImportLines.GetByIdAsync(id);
                
                if (grImportL == null)
                {
                    return ApiResponse<GrImportLDto?>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportLNotFound"),
                        "Record not found",
                        404,
                        "GrImportL not found"
                    );
                }

                var grImportLDto = _mapper.Map<GrImportLDto>(grImportL);
                
                return ApiResponse<GrImportLDto?>.SuccessResult(
                    grImportLDto,
                    _localizationService.GetLocalizedString("GrImportLRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportLDto?>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrImportLDto>>> GetByHeaderIdAsync(long headerId)
        {
            try
            {
                var grImportLs = await _unitOfWork.GrImportLines.FindAsync(x => x.HeaderId == headerId);
                var grImportLDtos = _mapper.Map<IEnumerable<GrImportLDto>>(grImportLs);
                
                return ApiResponse<IEnumerable<GrImportLDto>>.SuccessResult(
                    grImportLDtos,
                    _localizationService.GetLocalizedString("GrImportLRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportLDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrImportLDto>>> GetByLineIdAsync(long lineId)
        {
            try
            {
                var grImportLs = await _unitOfWork.GrImportLines.FindAsync(x => x.LineId == lineId);
                var grImportLDtos = _mapper.Map<IEnumerable<GrImportLDto>>(grImportLs);
                
                return ApiResponse<IEnumerable<GrImportLDto>>.SuccessResult(
                    grImportLDtos,
                    _localizationService.GetLocalizedString("GrImportLRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportLDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrImportLDto>>> GetByStockCodeAsync(string stockCode)
        {
            try
            {
                var grImportLs = await _unitOfWork.GrImportLines.FindAsync(x => x.StockCode == stockCode);
                var grImportLDtos = _mapper.Map<IEnumerable<GrImportLDto>>(grImportLs);
                
                return ApiResponse<IEnumerable<GrImportLDto>>.SuccessResult(
                    grImportLDtos,
                    _localizationService.GetLocalizedString("GrImportLRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportLDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportLDto>> CreateAsync(CreateGrImportLDto createDto)
        {
            try
            {
                var grImportL = _mapper.Map<GrImportL>(createDto);
                grImportL.CreatedDate = DateTime.UtcNow;
                
                await _unitOfWork.GrImportLines.AddAsync(grImportL);
                await _unitOfWork.SaveChangesAsync();
                
                var grImportLDto = _mapper.Map<GrImportLDto>(grImportL);
                
                return ApiResponse<GrImportLDto>.SuccessResult(
                    grImportLDto,
                    _localizationService.GetLocalizedString("GrImportLCreatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportLDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLCreationError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportLDto>> UpdateAsync(long id, UpdateGrImportLDto updateDto)
        {
            try
            {
                var existingGrImportL = await _unitOfWork.GrImportLines.GetByIdAsync(id);
                
                if (existingGrImportL == null)
                {
                    return ApiResponse<GrImportLDto>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportLNotFound"),
                        "Record not found",
                        404,
                        "GrImportL not found"
                    );
                }

                _mapper.Map(updateDto, existingGrImportL);
                existingGrImportL.UpdatedDate = DateTime.UtcNow;
                
                _unitOfWork.GrImportLines.Update(existingGrImportL);
                await _unitOfWork.SaveChangesAsync();
                
                var grImportLDto = _mapper.Map<GrImportLDto>(existingGrImportL);
                
                return ApiResponse<GrImportLDto>.SuccessResult(
                    grImportLDto,
                    _localizationService.GetLocalizedString("GrImportLUpdatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportLDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLUpdateError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.GrImportLines.ExistsAsync(id);
                if (!exists)
                {
                    return ApiResponse<bool>.ErrorResult(
                        _localizationService.GetLocalizedString("GrImportLNotFound"),
                        "Record not found",
                        404,
                        "GrImportL not found"
                    );
                }

                await _unitOfWork.GrImportLines.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();
                
                return ApiResponse<bool>.SuccessResult(
                    true,
                    _localizationService.GetLocalizedString("GrImportLDeletedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLDeletionError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrImportLDto>>> GetActiveAsync()
        {
            try
            {
                var grImportLs = await _unitOfWork.GrImportLines.FindAsync(x => !x.IsDeleted);
                var grImportLDtos = _mapper.Map<IEnumerable<GrImportLDto>>(grImportLs);
                
                return ApiResponse<IEnumerable<GrImportLDto>>.SuccessResult(
                    grImportLDtos,
                    _localizationService.GetLocalizedString("GrImportLRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportLDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrImportLRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }
    }
}
