using Microsoft.EntityFrameworkCore;
using BuiltCodeAPI.Data;
using BuiltCodeAPI.Models;
using BuiltCodeAPI.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BuiltCodeAPI.Repository
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly ApplicationDbContext _db;
        public DoctorRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateDoctor(Doctor doctor)
        {
            _db.Doctors.Add(doctor);
            return Save();
        }

        public bool DeleteDoctor(Doctor doctor)
        {
            _db.Doctors.Remove(doctor);
            return Save();
        }

        public Doctor GetDoctor(Guid doctorId)
        {
            return _db.Doctors.Include(c => c.Patient).FirstOrDefault(n => n.Id == doctorId);
        }

        public ICollection<Doctor> GetDoctors()
        {
            return _db.Doctors.Include(c => c.Patient).OrderBy(n => n.Name).ToList();
        }

        public bool DoctorExists(string name)
        {
            bool value = _db.Doctors.Any(n => n.Name.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool DoctorExists(Guid id)
        {
            bool value = _db.Doctors.Any(n => n.Id == id);
            return value;
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }

        public bool UpdateDoctor(Doctor doctor)
        {
            _db.Doctors.Update(doctor);
            return Save();
        }

        public ICollection<Doctor> GetDoctorsInPatients(Guid npId)
        {
            return _db.Doctors.Include(c=>c.Patient).Where(c=>c.Id == npId).ToList();
        }
    }
}