using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BuiltCodeWeb.Models;
using BuiltCodeWeb.Repository.IRepository;

namespace BuiltCodeWeb.Controllers
{
    public class PatientsController : Controller
    {
        #region Construtor/Injection
        private readonly IPatientRepository _patient;

        public PatientsController(IPatientRepository patient)
        {
            _patient = patient;
        }
        #endregion

        #region Listagem
        public IActionResult Index()
        {
            return View();
        }
        #endregion

        #region ADD e update
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Upsert(int? id)
        {
            Patient obj = new Patient();

            if(id == null)
            {
                //Insert Or create
                return View(obj);
            }
            obj = await _patient.GetAsync(SD.PatientAPIPath, id.GetValueOrDefault());

            if(obj == null)
            {
                //Edit or Update
                return NotFound();
            }
            return View(obj);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Upsert(Patient obj)
        {
            if (ModelState.IsValid)
            {
                if (obj.Id == new Guid())
                {
                    obj.DateCreated = DateTime.Now;
                    await _patient.CreateAsync(SD.PatientAPIPath, obj);
                }
                else
                {
                    await _patient.UpdateAsync(SD.PatientAPIPath + obj.Id, obj);
                }

                return RedirectToAction(nameof(Index));
            }
            else
            {
                return View(obj);
            }
        }
        #endregion

        #region Deletar
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var status = await _patient.DeleteAsync(SD.PatientAPIPath, id);
            if (status)
            {
                return Json(new { success = true, message = "Deleted Successfull" });
            }
            return Json(new { success = false, message = "Delete not Successfull" });
        }
        #endregion
    }
}