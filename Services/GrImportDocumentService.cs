using AutoMapper;
using Microsoft.Extensions.Localization;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Interfaces;
using WMS_WEBAPI.Models;
using WMS_WEBAPI.UnitOfWork;

namespace WMS_WEBAPI.Services
{
    public class GrImportDocumentService : IGrImportDocumentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILocalizationService _localizationService;

        public GrImportDocumentService(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILocalizationService localizationService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _localizationService = localizationService;
        }

        public async Task<ApiResponse<IEnumerable<GrImportDocumentDto>>> GetAllAsync()
        {
            try
            {
                var documents = await _unitOfWork.GrImportDocuments.GetAllAsync();
                var documentDtos = _mapper.Map<IEnumerable<GrImportDocumentDto>>(documents);

                return ApiResponse<IEnumerable<GrImportDocumentDto>>.SuccessResult(
                    documentDtos,
                    _localizationService.GetLocalizedString("Success")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportDocumentDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("Error_GetAll"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportDocumentDto>> GetByIdAsync(long id)
        {
            try
            {
                var document = await _unitOfWork.GrImportDocuments.GetByIdAsync(id);
                if (document == null)
                {
                    return ApiResponse<GrImportDocumentDto>.ErrorResult(
                        _localizationService.GetLocalizedString("Error_NotFound"),
                        "Record not found",
                        404,
                        "GrImportDocument not found"
                    );
                }

                var documentDto = _mapper.Map<GrImportDocumentDto>(document);
                return ApiResponse<GrImportDocumentDto>.SuccessResult(
                    documentDto,
                    _localizationService.GetLocalizedString("Success")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportDocumentDto>.ErrorResult(
                    _localizationService.GetLocalizedString("Error_GetById"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<IEnumerable<GrImportDocumentDto>>> GetByHeaderIdAsync(long headerId)
        {
            try
            {
                var documents = await _unitOfWork.GrImportDocuments.FindAsync(d => d.HeaderId == headerId);
                var documentDtos = _mapper.Map<IEnumerable<GrImportDocumentDto>>(documents);

                return ApiResponse<IEnumerable<GrImportDocumentDto>>.SuccessResult(
                    documentDtos,
                    _localizationService.GetLocalizedString("Success")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<GrImportDocumentDto>>.ErrorResult(
                    _localizationService.GetLocalizedString("Error_GetByHeaderId"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportDocumentDto>> CreateAsync(CreateGrImportDocumentDto createDto)
        {
            try
            {
                // HeaderId'nin geçerli olup olmadığını kontrol et
                var headerExists = await _unitOfWork.GrHeaders.ExistsAsync((int)createDto.HeaderId);
                if (!headerExists)
                {
                    return ApiResponse<GrImportDocumentDto>.ErrorResult(
                        _localizationService.GetLocalizedString("Error_InvalidHeaderId"),
                        "Invalid header ID",
                        404,
                        "Header not found"
                    );
                }

                var document = _mapper.Map<GrImportDocument>(createDto);
                var createdDocument = await _unitOfWork.GrImportDocuments.AddAsync(document);
                await _unitOfWork.SaveChangesAsync();

                var documentDto = _mapper.Map<GrImportDocumentDto>(createdDocument);
                return ApiResponse<GrImportDocumentDto>.SuccessResult(
                    documentDto,
                    _localizationService.GetLocalizedString("Success_Created")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportDocumentDto>.ErrorResult(
                    _localizationService.GetLocalizedString("Error_Create"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<GrImportDocumentDto>> UpdateAsync(long id, UpdateGrImportDocumentDto updateDto)
        {
            try
            {
                var document = await _unitOfWork.GrImportDocuments.GetByIdAsync(id);
                if (document == null)
                {
                    return ApiResponse<GrImportDocumentDto>.ErrorResult(
                        _localizationService.GetLocalizedString("Error_NotFound"),
                        "Record not found",
                        404,
                        "GrImportDocument not found"
                    );
                }

                // HeaderId'nin geçerli olup olmadığını kontrol et
                var headerExists = await _unitOfWork.GrHeaders.ExistsAsync((int)updateDto.HeaderId);
                if (!headerExists)
                {
                    return ApiResponse<GrImportDocumentDto>.ErrorResult(
                        _localizationService.GetLocalizedString("Error_InvalidHeaderId"),
                        "Invalid header ID",
                        404,
                        "Header not found"
                    );
                }

                _mapper.Map(updateDto, document);
                _unitOfWork.GrImportDocuments.Update(document);
                await _unitOfWork.SaveChangesAsync();

                var documentDto = _mapper.Map<GrImportDocumentDto>(document);
                return ApiResponse<GrImportDocumentDto>.SuccessResult(
                    documentDto,
                    _localizationService.GetLocalizedString("Success_Updated")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<GrImportDocumentDto>.ErrorResult(
                    _localizationService.GetLocalizedString("Error_Update"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<bool>> SoftDeleteAsync(long id)
        {
            try
            {
                var document = await _unitOfWork.GrImportDocuments.GetByIdAsync(id);
                if (document == null)
                {
                    return ApiResponse<bool>.ErrorResult(
                        _localizationService.GetLocalizedString("Error_NotFound"),
                        "Record not found",
                        404,
                        "GrImportDocument not found"
                    );
                }

                await _unitOfWork.GrImportDocuments.SoftDelete(id);
                await _unitOfWork.SaveChangesAsync();

                return ApiResponse<bool>.SuccessResult(
                    true,
                    _localizationService.GetLocalizedString("Success_Deleted")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("Error_Delete"),
                    ex.Message,
                    500
                );
            }
        }

        public async Task<ApiResponse<bool>> ExistsAsync(long id)
        {
            try
            {
                var exists = await _unitOfWork.GrImportDocuments.ExistsAsync((int)id);
                return ApiResponse<bool>.SuccessResult(
                    exists,
                    _localizationService.GetLocalizedString("Success")
                );
            }
            catch (Exception ex)
            {
                return ApiResponse<bool>.ErrorResult(
                    _localizationService.GetLocalizedString("Error_Exists"),
                    ex.Message,
                    500
                );
            }
        }
    }
}
