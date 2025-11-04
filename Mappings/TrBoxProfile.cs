using AutoMapper;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Mappings
{
    public class TrBoxProfile : Profile
    {
        public TrBoxProfile()
        {
            // TrBox to TrBoxDto
            CreateMap<TrBox, TrBoxDto>()
                .ForMember(dest => dest.BoxNo, opt => opt.MapFrom(src => src.BoxNo))
                .ForMember(dest => dest.BoxNumber, opt => opt.MapFrom(src => src.BoxNumber))
                .ForMember(dest => dest.BoxCode, opt => opt.MapFrom(src => src.BoxCode))
                .ForMember(dest => dest.BoxType, opt => opt.MapFrom(src => src.BoxType))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest => dest.Weight, opt => opt.MapFrom(src => src.Weight))
                .ForMember(dest => dest.Volume, opt => opt.MapFrom(src => src.Volume))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Description1, opt => opt.MapFrom(src => src.Description1))
                .ForMember(dest => dest.Description2, opt => opt.MapFrom(src => src.Description2))
                .ForMember(dest => dest.CreatedByFullUser, opt => opt.MapFrom(src => src.CreatedByUser != null ? $"{src.CreatedByUser.FirstName} {src.CreatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.UpdatedByFullUser, opt => opt.MapFrom(src => src.UpdatedByUser != null ? $"{src.UpdatedByUser.FirstName} {src.UpdatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.DeletedByFullUser, opt => opt.MapFrom(src => src.DeletedByUser != null ? $"{src.DeletedByUser.FirstName} {src.DeletedByUser.LastName}".Trim() : null));

            // CreateTrBoxDto to TrBox
            CreateMap<CreateTrBoxDto, TrBox>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.BoxNo, opt => opt.MapFrom(src => src.BoxNo))
                .ForMember(dest => dest.BoxNumber, opt => opt.MapFrom(src => src.BoxNumber))
                .ForMember(dest => dest.BoxCode, opt => opt.MapFrom(src => src.BoxCode))
                .ForMember(dest => dest.BoxType, opt => opt.MapFrom(src => src.BoxType))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest => dest.Weight, opt => opt.MapFrom(src => src.Weight))
                .ForMember(dest => dest.Volume, opt => opt.MapFrom(src => src.Volume))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Description1, opt => opt.MapFrom(src => src.Description1))
                .ForMember(dest => dest.Description2, opt => opt.MapFrom(src => src.Description2))
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedBy, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
                .ForMember(dest => dest.ImportLine, opt => opt.Ignore());

            // UpdateTrBoxDto to TrBox
            CreateMap<UpdateTrBoxDto, TrBox>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.BoxNo, opt => opt.MapFrom(src => src.BoxNo))
                .ForMember(dest => dest.BoxNumber, opt => opt.MapFrom(src => src.BoxNumber))
                .ForMember(dest => dest.BoxCode, opt => opt.MapFrom(src => src.BoxCode))
                .ForMember(dest => dest.BoxType, opt => opt.MapFrom(src => src.BoxType))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest => dest.Weight, opt => opt.MapFrom(src => src.Weight))
                .ForMember(dest => dest.Volume, opt => opt.MapFrom(src => src.Volume))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Description1, opt => opt.MapFrom(src => src.Description1))
                .ForMember(dest => dest.Description2, opt => opt.MapFrom(src => src.Description2))
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedBy, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
                .ForMember(dest => dest.ImportLine, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}