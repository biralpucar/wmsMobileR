using AutoMapper;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Mappings
{
    public class TrSBoxProfile : Profile
    {
        public TrSBoxProfile()
        {
            // TrSBox to TrSBoxDto
            CreateMap<TrSBox, TrSBoxDto>()
                .ForMember(dest => dest.Status, opt => opt.Ignore())
                .ForMember(dest => dest.Location, opt => opt.Ignore())
                .ForMember(dest => dest.Weight, opt => opt.Ignore())
                .ForMember(dest => dest.Volume, opt => opt.Ignore())
                .ForMember(dest => dest.Dimensions, opt => opt.Ignore())
                .ForMember(dest => dest.PackedDate, opt => opt.Ignore())
                .ForMember(dest => dest.PackedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UnpackedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UnpackedBy, opt => opt.Ignore())
                .ForMember(dest => dest.QualityStatus, opt => opt.Ignore())
                .ForMember(dest => dest.QualityNotes, opt => opt.Ignore())
                .ForMember(dest => dest.DamageStatus, opt => opt.Ignore())
                .ForMember(dest => dest.DamageNotes, opt => opt.Ignore())
                .ForMember(dest => dest.TrackingNumber, opt => opt.Ignore())
                .ForMember(dest => dest.BarcodeNumber, opt => opt.Ignore())
                .ForMember(dest => dest.RfidTag, opt => opt.Ignore())
                .ForMember(dest => dest.Temperature, opt => opt.Ignore())
                .ForMember(dest => dest.Humidity, opt => opt.Ignore())
                .ForMember(dest => dest.EnvironmentalConditions, opt => opt.Ignore())
                .ForMember(dest => dest.HandlingInstructions, opt => opt.Ignore())
                .ForMember(dest => dest.SpecialRequirements, opt => opt.Ignore())
                .ForMember(dest => dest.Notes, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedBy, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedByFullUser, opt => opt.MapFrom(src => src.CreatedByUser != null ? $"{src.CreatedByUser.FirstName} {src.CreatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.UpdatedByFullUser, opt => opt.MapFrom(src => src.UpdatedByUser != null ? $"{src.UpdatedByUser.FirstName} {src.UpdatedByUser.LastName}".Trim() : null))
                .ForMember(dest => dest.DeletedByFullUser, opt => opt.MapFrom(src => src.DeletedByUser != null ? $"{src.DeletedByUser.FirstName} {src.DeletedByUser.LastName}".Trim() : null));

            // CreateTrSBoxDto to TrSBox
            CreateMap<CreateTrSBoxDto, TrSBox>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.BoxNo, opt => opt.MapFrom(src => src.SerialNumber))
                .ForMember(dest => dest.BoxCode, opt => opt.Ignore())
                .ForMember(dest => dest.StockCode, opt => opt.Ignore())
                .ForMember(dest => dest.Description1, opt => opt.Ignore())
                .ForMember(dest => dest.Description2, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedBy, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
                .ForMember(dest => dest.ImportLine, opt => opt.Ignore())
                .ForMember(dest => dest.Box, opt => opt.Ignore());

            // UpdateTrSBoxDto to TrSBox
            CreateMap<UpdateTrSBoxDto, TrSBox>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.BoxNo, opt => opt.MapFrom(src => src.SerialNumber))
                .ForMember(dest => dest.BoxCode, opt => opt.Ignore())
                .ForMember(dest => dest.StockCode, opt => opt.Ignore())
                .ForMember(dest => dest.Description1, opt => opt.Ignore())
                .ForMember(dest => dest.Description2, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedBy, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedBy, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedDate, opt => opt.Ignore())
                .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
                .ForMember(dest => dest.ImportLine, opt => opt.Ignore())
                .ForMember(dest => dest.Box, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}