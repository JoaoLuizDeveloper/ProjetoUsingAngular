using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BuiltCodeAPI.Models;
using BuiltCodeAPI.Models.DTOs;
using BuiltCodeAPI.Repository.IRepository;

namespace BuiltCodeAPI.Controllers
{
    [Route("api/v{version:apiversion}/doctors")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class DoctorsController : ControllerBase
    {
        #region Construtor/Injection
        private readonly IDoctorRepository _doctor;
        private readonly IMapper _mapper;

        public DoctorsController(IDoctorRepository doctor, IMapper mapper)
        {
            _doctor = doctor;
            _mapper = mapper;
        }
        #endregion

        #region Get List of Doctors
        /// <summary>
        /// Get List of Doctors
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(200, Type= typeof(List<Doctor>))]
        public IActionResult GetPatrimonios()
        {
            var objList = _doctor.GetDoctors();
            var objDTo = new List<Doctor>();

            foreach (var obj in objList)
            {
                objDTo.Add(_mapper.Map<Doctor>(obj));
            }

            return Ok(objDTo);
        }
        #endregion

        #region Get Individual Doctor
        /// <summary>
        /// Get Individual Doctor
        /// </summary>
        /// <param name="id">The id of the Doctor</param>
        /// <returns></returns>
        [HttpGet("{id:int}", Name = "GetDoctor")]
        [ProducesResponseType(200, Type = typeof(Doctor))]
        [ProducesResponseType(404)]
        [ProducesDefaultResponseType]
        public IActionResult GetPatrimonio(Guid id)
        {
            var obj = _doctor.GetDoctor(id);
            if (obj == null)
            {
                return NotFound();
            }

            var objDTO = _mapper.Map<Doctor>(obj);
            return Ok(objDTO);
        }
        #endregion

        #region Get Individual Doctor
        /// <summary>
        /// Get Individual Doctor
        /// </summary>
        /// <param name="doctorid">The id of the DoctorId</param>
        /// <returns></returns>
        [HttpGet("[action]/{doctorid:int}")]
        [ProducesResponseType(200, Type = typeof(Doctor))]
        [ProducesResponseType(404)]
        [ProducesDefaultResponseType]
        public IActionResult GetPatrimonioInMarcas(Guid doctorid)
        {
            var objList = _doctor.GetDoctorsInPatients(doctorid);
            if (objList == null)
            {
                return NotFound();
            }

            var objDto = new List<Doctor>();
            foreach(var obj in objList)
            {
                objDto.Add(_mapper.Map<Doctor>(obj));
            }
            
            return Ok(objDto);
        }
        #endregion

        #region Create, Update and Delete Doctor
        /// <summary>
        /// Create Doctor
        /// </summary>
        /// <param name="doctor">The Doctor</param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(Doctor))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult CreatePatrimonio([FromBody] DoctorCreateDto doctor)
        {
            if (doctor == null)
            {
                return BadRequest(ModelState);
            }

            if (_doctor.DoctorExists(doctor.Name))
            {
                ModelState.AddModelError("", "The Doctor alredy Exist");
                return StatusCode(404, ModelState);
            }

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var doctorsObj = _mapper.Map<Doctor>(doctor);

            if (!_doctor.CreateDoctor(doctorsObj))
            {
                ModelState.AddModelError("", $"Something went wrong when you trying to save {doctor.Name}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetPatrimonio", new { version = HttpContext.GetRequestedApiVersion().ToString(), id = doctorsObj.Id }, doctorsObj);
        }

        /// <summary>
        /// Update Doctor
        /// </summary>
        /// <param name="id, doctorsDto">The Doctor</param>
        /// <returns></returns>
        [HttpPatch("{id:int}", Name = "UpdateDoctor")]
        [ProducesResponseType(204)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateDoctor(Guid id, [FromBody] DoctorUpdateDto doctorsDto)
        {
            if (doctorsDto == null || id != doctorsDto.Id)
            {
                return BadRequest(ModelState);
            }

            var doctorsObj = _mapper.Map<Doctor>(doctorsDto);

            if (!_doctor.UpdateDoctor(doctorsObj))
            {
                ModelState.AddModelError("", $"Something went wrong when you trying to updating {doctorsDto.Name}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        /// <summary>
        /// Delete Doctor
        /// </summary>
        /// <param name="id">The Doctor</param>
        /// <returns></returns>
        [HttpDelete("{id:int}", Name = "DeleteDoctor")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteDoctor(Guid id)
        {
            if (!_doctor.DoctorExists(id))
            {
                return NotFound();
            }

            var doctorsDto = _doctor.GetDoctor(id);

            if (!_doctor.DeleteDoctor(doctorsDto))
            {
                ModelState.AddModelError("", $"Something went wrong when you trying to deleting {doctorsDto.Name}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
        #endregion
    }
}