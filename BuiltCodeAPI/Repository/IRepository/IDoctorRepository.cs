using BuiltCodeAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BuiltCodeAPI.Repository.IRepository
{
    public interface IDoctorRepository
    {
        ICollection<Doctor> GetDoctors();
        ICollection<Doctor> GetDoctorsInPatients(Guid npId);
        Doctor GetDoctor(Guid doctorId);
        bool DoctorExists(string name);
        bool DoctorExists(Guid id);
        bool CreateDoctor(Doctor doctor);
        bool UpdateDoctor(Doctor doctor);
        bool DeleteDoctor(Doctor doctor);
        bool Save();
    }
}