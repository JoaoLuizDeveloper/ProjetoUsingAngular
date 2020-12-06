using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BuiltCodeAPI.Models;
using BuiltCodeAPI.Repository.IRepository;

namespace BuiltCodeAPI.Controllers
{
    [Route("api/v{version:apiversion}/patients")]
    [ApiVersion("2.0")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public class PatientsV2Controller : ControllerBase
    {
        #region Construtor/Injection
        private readonly IPatientRepository _patients;
        private readonly IMapper _mapper;

        public PatientsV2Controller(IPatientRepository patients, IMapper mapper)
        {
            _patients = patients;
            _mapper = mapper;
        }
        #endregion

        #region Pegar Marcas
        /// <summary>
        /// Get First Patient
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(200, Type= typeof(List<Patient>))]
        public IActionResult GetFirstPatient()
        {
            var obj = _patients.GetPatients().FirstOrDefault();

            return Ok(_mapper.Map<Patient>(obj));
        }
        #endregion
    }
}