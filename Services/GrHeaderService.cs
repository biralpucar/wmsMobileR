using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WMS_WEBAPI.Data;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class GrHeaderService : IGrHeaderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public GrHeaderService(IUnitOfWork unitOfWork, IMapper mapper, ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetAllAsync()
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders.GetAllAsync();
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos, 
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrHeaderDto?>> GetByIdAsync(int id)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetByIdAsync(id);
                if (grHeader == null)
                {
                    return ApiResponse<GrHeaderDto?>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }
                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto?>.SuccessResult(grHeaderDto,_localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully"));
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto?>.ErrorResult(_localizationService.GetLocalizedString("GrHeaderRetrievalError"), ex.Message, 500, "Error retrieving GrHeader data");
            }
        }

        public async Task<ApiResponse<GrHeaderDto?>> GetByERPDocumentNoAsync(string erpDocumentNo)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetFirstOrDefaultAsync(x => x.ERPDocumentNo == erpDocumentNo);
                
                if (grHeader == null)
                {
                    return ApiResponse<GrHeaderDto?>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }

                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto?>.SuccessResult(
                    grHeaderDto,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto?>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrHeaderDto>> CreateAsync(CreateGrHeaderDto createDto)
        {
            try
            {
                var grHeader = _mapper.Map<GrHeader>(createDto);

                await _unitOfWork.GrHeaders.AddAsync(grHeader);
                await _unitOfWork.SaveChangesAsync();

                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto>.SuccessResult(
                    grHeaderDto,
                    _localizationService.GetLocalizedString("GrHeaderCreatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderCreationError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrHeaderDto>> UpdateAsync(int id, UpdateGrHeaderDto updateDto)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetByIdAsync(id);
                if (grHeader == null)
                {
                    return ApiResponse<GrHeaderDto>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }

                // Update only non-null properties
                if (!string.IsNullOrEmpty(updateDto.BranchCode))
                    grHeader.BranchCode = updateDto.BranchCode;
                
                if (updateDto.ProjectCode != null)
                    grHeader.ProjectCode = updateDto.ProjectCode;
                
                if (!string.IsNullOrEmpty(updateDto.CustomerCode))
                    grHeader.CustomerCode = updateDto.CustomerCode;
                
                if (!string.IsNullOrEmpty(updateDto.ERPDocumentNo))
                    grHeader.ERPDocumentNo = updateDto.ERPDocumentNo;
                
                if (!string.IsNullOrEmpty(updateDto.DocumentType))
                    grHeader.DocumentType = updateDto.DocumentType;
                
                if (updateDto.DocumentDate.HasValue)
                    grHeader.DocumentDate = updateDto.DocumentDate.Value;
                
                if (!string.IsNullOrEmpty(updateDto.YearCode))
                    grHeader.YearCode = updateDto.YearCode;
                
                if (updateDto.ReturnCode.HasValue)
                    grHeader.ReturnCode = updateDto.ReturnCode.Value;
                
                if (updateDto.OCRSource.HasValue)
                    grHeader.OCRSource = updateDto.OCRSource.Value;
                
                if (updateDto.IsPlanned.HasValue)
                    grHeader.IsPlanned = updateDto.IsPlanned.Value;

                if (updateDto.Description1 != null)
                    grHeader.Description1 = updateDto.Description1;
                
                if (updateDto.Description2 != null)
                    grHeader.Description2 = updateDto.Description2;
                
                if (updateDto.Description3 != null)
                    grHeader.Description3 = updateDto.Description3;
                
                if (updateDto.Description4 != null)
                    grHeader.Description4 = updateDto.Description4;
                
                if (updateDto.Description5 != null)
                    grHeader.Description5 = updateDto.Description5;

                _unitOfWork.GrHeaders.Update(grHeader);
                await _unitOfWork.SaveChangesAsync();

                var grHeaderDto = _mapper.Map<GrHeaderDto>(grHeader);
                return ApiResponse<GrHeaderDto>.SuccessResult(
                    grHeaderDto,
                    _localizationService.GetLocalizedString("GrHeaderUpdatedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrHeaderDto>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderUpdateError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(int id)
        {
            try
            {
                var grHeader = await _unitOfWork.GrHeaders.GetByIdAsync(id);
                if (grHeader == null)
                {
                    return ApiResponse<bool>.ErrorResult(
                        _localizationService.GetLocalizedString("GrHeaderNotFound"),
                        "Record not found",
                        404,
                        "GrHeader not found"
                    );
                }

                await _unitOfWork.GrHeaders.SoftDelete(grHeader.Id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(
                    true,
                    _localizationService.GetLocalizedString("GrHeaderDeletedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderSoftDeletionError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetActiveAsync()
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders.GetAllAsync();
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByBranchCodeAsync(string branchCode)
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders
                    .FindAsync(x => x.BranchCode == branchCode);
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByCustomerCodeAsync(string customerCode)
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders
                    .FindAsync(x => x.CustomerCode == customerCode);
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrHeaderDto>>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            try
            {
                var grHeaders = await _unitOfWork.GrHeaders
                    .FindAsync(x => x.DocumentDate >= startDate && x.DocumentDate <= endDate);
                
                var grHeaderDtos = _mapper.Map<IEnumerable<GrHeaderDto>>(grHeaders);
                
                return ApiResponse<IEnumerable<GrHeaderDto>>.SuccessResult(
                    grHeaderDtos,
                    _localizationService.GetLocalizedString("GrHeaderRetrievedSuccessfully")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrHeaderDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("GrHeaderRetrievalError"),
                    ex.Message,
                    500
                );
            }
        }
    }
}
