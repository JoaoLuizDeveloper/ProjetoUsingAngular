using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BuiltCodeWeb.Models.ViewModel
{
    public class DoctorsVM
    {
        public IEnumerable<SelectListItem> PatientsList { get; set; }
        public Doctor Doctor { get; set; }
    }
}
