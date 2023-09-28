using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<CreateActivity, Activity>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(s => new Guid()));
        }
    }
}