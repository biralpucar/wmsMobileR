using AutoMapper;
using WMS_WEBAPI.DTOs;
using WMS_WEBAPI.Models;

namespace WMS_WEBAPI.Mappings
{
    public class TRFunctionMappingProfile : Profile
    {
        public TRFunctionMappingProfile()
        {
            CreateMap<FN_TransferOpenOrder_Header, TransferOpenOrderHeaderDto>();
            CreateMap<FN_TransferOpenOrder_Line, TransferOpenOrderLineDto>();
        }
    }
}