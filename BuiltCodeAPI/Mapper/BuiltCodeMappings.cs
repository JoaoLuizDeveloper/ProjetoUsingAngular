using AutoMapper;
using BuiltCodeAPI.Models;
using BuiltCodeAPI.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BuiltCodeAPI.Mapper
{
    public class BuiltCodeMappings: Profile
    {
        public BuiltCodeMappings()
        {
            CreateMap<Patient, PatientDto>().ReverseMap();
            CreateMap<Doctor, DoctorDto>().ReverseMap();
            CreateMap<Doctor, DoctorCreateDto>().ReverseMap();
            CreateMap<Doctor, DoctorUpdateDto>().ReverseMap();
        }
    }
}