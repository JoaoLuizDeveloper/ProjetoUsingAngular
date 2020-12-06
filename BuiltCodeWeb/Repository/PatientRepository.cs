using BuiltCodeWeb.Models;
using BuiltCodeWeb.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace BuiltCodeWeb.Repository
{
    public class PatientRepository : Repository<Patient>, IPatientRepository 
    {
        private readonly IHttpClientFactory _clientFactory;
        public PatientRepository(IHttpClientFactory clientFactory) : base(clientFactory)
        {
            _clientFactory = clientFactory;
        }
    }
}
