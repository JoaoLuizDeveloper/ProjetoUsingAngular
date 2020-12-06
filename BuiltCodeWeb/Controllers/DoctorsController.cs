using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BuiltCodeWeb.Models;
using BuiltCodeWeb.Models.ViewModel;
using BuiltCodeWeb.Repository;
using BuiltCodeWeb.Repository.IRepository;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

namespace BuiltCodeWeb.Controllers
{
    public class DoctorsController : Controller
    {
        #region Construtor/Injection
        private readonly IPatientRepository _patient;
        private readonly IDoctorRepository _doctor;

        public DoctorsController(IPatientRepository patient, IDoctorRepository doctor)
        {
            _patient = patient;
            _doctor = doctor;
        }
        #endregion

        #region Listagem
        public IActionResult Index()
        {
            return View( new Doctor() { });
        }

        public async Task<IActionResult> GetAllPatrimonios()
        {
            var model = await _doctor.GetAllAsync(SD.DoctorAPIPath);
            return Json(new { data = model });
        }
        #endregion

        #region Add e update
        public async Task<IActionResult> Upsert(int? id)
        {
            IEnumerable<Patient> npList = await _patient.GetAllAsync(SD.PatientAPIPath);

            DoctorsVM objVM = new DoctorsVM()
            {
                PatientsList = npList.Select(i => new SelectListItem {
                    Text = i.Name,
                    Value = i.Id.ToString()
                }),
                Doctor = new Doctor()
            };

            if(id == null)
            {
                //Insert Or create
                return View(objVM);
            }
            objVM.Doctor = await _doctor.GetAsync(SD.DoctorAPIPath, id.GetValueOrDefault());

            if(objVM.Doctor == null)
            {
                //Edit or Update
                return NotFound();
            }
            return View(objVM);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Upsert(DoctorsVM obj)
        {
            if (ModelState.IsValid)
            {
                if(obj.Doctor.Id == new Guid())
                {
                    obj.Doctor.DateCreated = DateTime.Now;
                    
                    await _doctor.CreateAsync(SD.DoctorAPIPath, obj.Doctor);
                }
                else
                {
                    await _doctor.UpdateAsync(SD.DoctorAPIPath + obj.Doctor.Id, obj.Doctor);
                }

                return RedirectToAction(nameof(Index));
            }
            else
            {
                IEnumerable<Patient> npList = await _patient.GetAllAsync(SD.PatientAPIPath);

                DoctorsVM objVM = new DoctorsVM()
                {
                    PatientsList = npList.Select(i => new SelectListItem
                    {
                        Text = i.Name,
                        Value = i.Id.ToString()
                    }),
                    Doctor = obj.Doctor
                };
                return View(objVM);
            }
        }
        #endregion

        #region Deletar
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var status = await _doctor.DeleteAsync(SD.DoctorAPIPath, id);
            if (status)
            {
                return Json(new { success = true, message = "Deleted with success!" });
            }
            return Json(new { success = false, message = "Falha ao deletar!" });
        }
        #endregion
    }
}