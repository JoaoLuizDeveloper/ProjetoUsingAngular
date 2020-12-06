using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BuiltCodeWeb.Models;
using BuiltCodeWeb.Models.ViewModel;
using BuiltCodeWeb.Repository.IRepository;

namespace BuiltCodeWeb.Controllers
{
    public class HomeController : Controller
    {
        #region Construtor/Injection
        private readonly ILogger<HomeController> _logger;
        private readonly IPatientRepository _patient;
        private readonly IDoctorRepository _doctor;

        public HomeController(ILogger<HomeController> logger, IPatientRepository patient, IDoctorRepository doctor)
        {
            _logger = logger;
            _patient = patient;
            _doctor = doctor;
        }
        #endregion

        #region Index
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            IndexVM model = new IndexVM()
            {
                PatientList = await _patient.GetAllAsync(SD.PatientAPIPath),
                DoctorList = await _doctor.GetAllAsync(SD.DoctorAPIPath)
            };
            return View(model);
        }
        #endregion

        #region Erro
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        #endregion
    }
}