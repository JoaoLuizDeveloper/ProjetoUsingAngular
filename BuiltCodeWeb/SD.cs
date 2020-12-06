using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BuiltCodeWeb
{
    public static class SD
    {
        public static string APIBaseUrl = "https://localhost:44387";
        public static string PatientAPIPath = APIBaseUrl + "/api/v1/patients/";
        public static string DoctorAPIPath = APIBaseUrl + "/api/v1/doctors/";
    }
}