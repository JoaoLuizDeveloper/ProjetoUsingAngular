using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BuiltCodeAPI.Models
{
    public class Patient
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string CPF { get; set; }
        public byte[] Picture { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
