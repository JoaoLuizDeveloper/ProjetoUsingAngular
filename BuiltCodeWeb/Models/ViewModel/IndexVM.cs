using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BuiltCodeWeb.Models.ViewModel
{
    public class IndexVM
    {
        public IEnumerable<Patient> PatientList { get; set; }
        public IEnumerable<Doctor> DoctorList { get; set; }
    }
}