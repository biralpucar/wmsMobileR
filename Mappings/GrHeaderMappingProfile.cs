using AutoMapper;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Mappings
{
    public class GrHeaderMappingProfile : Profile
    {
        public GrHeaderMappingProfile()
        {
            // GrHeader mappings
            CreateMap<GrHeader, GrHeaderDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ERPDocumentNo, opt => opt.MapFrom(src => src.ERPDocumentNo))
                .ForMember(dest => dest.BranchCode, opt => opt.MapFrom(src => src.BranchCode))
                .ForMember(dest => dest.ProjectCode, opt => opt.MapFrom(src => src.ProjectCode))
                .ForMember(dest => dest.CustomerCode, opt => opt.MapFrom(src => src.CustomerCode))
                .ForMember(dest => dest.DocumentDate, opt => opt.MapFrom(src => src.DocumentDate))
                .ForMember(dest => dest.DocumentType, opt => opt.MapFrom(src => src.DocumentType))
                .ForMember(dest => dest.YearCode, opt => opt.MapFrom(src => src.YearCode))
                .ForMember(dest => dest.ReturnCode, opt => opt.MapFrom(src => src.ReturnCode))
                .ForMember(dest => dest.OCRSource, opt => opt.MapFrom(src => src.OCRSource))
                .ForMember(dest => dest.IsPlanned, opt => opt.MapFrom(src => src.IsPlanned))
                .ForMember(dest => dest.Description1, opt => opt.MapFrom(src => src.Description1))
                .ForMember(dest => dest.Description2, opt => opt.MapFrom(src => src.Description2))
                .ForMember(dest => dest.Description3, opt => opt.MapFrom(src => src.Description3))
                .ForMember(dest => dest.Description4, opt => opt.MapFrom(src => src.Description4))
                .ForMember(dest => dest.Description5, opt => opt.MapFrom(src => src.Description5))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate))
                .ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => src.UpdatedDate))
                .ForMember(dest => dest.DeletedDate, opt => opt.MapFrom(src => src.DeletedDate))
                .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => src.IsDeleted))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy))
                .ForMember(dest => dest.UpdatedBy, opt => opt.MapFrom(src => src.UpdatedBy))
                .ForMember(dest => dest.DeletedBy, opt => opt.MapFrom(src => src.DeletedBy))
                .ForMember(dest => dest.CreatedByFullUser, opt => opt.MapFrom(src => src.CreatedByUser != null ? $"{src.CreatedByUser.FirstName} {src.CreatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.UpdatedByFullUser, opt => opt.MapFrom(src => src.UpdatedByUser != null ? $"{src.UpdatedByUser.FirstName} {src.UpdatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.DeletedByFullUser, opt => opt.MapFrom(src => src.DeletedByUser != null ? $"{src.DeletedByUser.FirstName} {src.DeletedByUser.LastName}".Trim() : null));

            CreateMap<CreateGrHeaderDto, GrHeader>()
                .ForMember(dest => dest.ERPDocumentNo, opt => opt.MapFrom(src => src.ERPDocumentNo))
                .ForMember(dest => dest.BranchCode, opt => opt.MapFrom(src => src.BranchCode))
                .ForMember(dest => dest.ProjectCode, opt => opt.MapFrom(src => src.ProjectCode))
                .ForMember(dest => dest.CustomerCode, opt => opt.MapFrom(src => src.CustomerCode))
                .ForMember(dest => dest.DocumentDate, opt => opt.MapFrom(src => src.DocumentDate))
                .ForMember(dest => dest.DocumentType, opt => opt.MapFrom(src => src.DocumentType))
                .ForMember(dest => dest.YearCode, opt => opt.MapFrom(src => src.YearCode))
                .ForMember(dest => dest.ReturnCode, opt => opt.MapFrom(src => src.ReturnCode))
                .ForMember(dest => dest.OCRSource, opt => opt.MapFrom(src => src.OCRSource))
                .ForMember(dest => dest.IsPlanned, opt => opt.MapFrom(src => src.IsPlanned))
                .ForMember(dest => dest.Description1, opt => opt.MapFrom(src => src.Description1))
                .ForMember(dest => dest.Description2, opt => opt.MapFrom(src => src.Description2))
                .ForMember(dest => dest.Description3, opt => opt.MapFrom(src => src.Description3))
                .ForMember(dest => dest.Description4, opt => opt.MapFrom(src => src.Description4))
                .ForMember(dest => dest.Description5, opt => opt.MapFrom(src => src.Description5))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore());

            CreateMap<UpdateGrHeaderDto, GrHeader>()
                .ForMember(dest => dest.BranchCode, opt => opt.MapFrom(src => src.BranchCode))
                .ForMember(dest => dest.ProjectCode, opt => opt.MapFrom(src => src.ProjectCode))
                .ForMember(dest => dest.CustomerCode, opt => opt.MapFrom(src => src.CustomerCode))
                .ForMember(dest => dest.DocumentDate, opt => opt.MapFrom(src => src.DocumentDate))
                .ForMember(dest => dest.DocumentType, opt => opt.MapFrom(src => src.DocumentType))
                .ForMember(dest => dest.YearCode, opt => opt.MapFrom(src => src.YearCode))
                .ForMember(dest => dest.ReturnCode, opt => opt.MapFrom(src => src.ReturnCode))
                .ForMember(dest => dest.OCRSource, opt => opt.MapFrom(src => src.OCRSource))
                .ForMember(dest => dest.IsPlanned, opt => opt.MapFrom(src => src.IsPlanned))
                .ForMember(dest => dest.Description1, opt => opt.MapFrom(src => src.Description1))
                .ForMember(dest => dest.Description2, opt => opt.MapFrom(src => src.Description2))
                .ForMember(dest => dest.Description3, opt => opt.MapFrom(src => src.Description3))
                .ForMember(dest => dest.Description4, opt => opt.MapFrom(src => src.Description4))
                .ForMember(dest => dest.Description5, opt => opt.MapFrom(src => src.Description5))
                .ForMember(dest => dest.UpdatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.ERPDocumentNo, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore());
        }
    }
}