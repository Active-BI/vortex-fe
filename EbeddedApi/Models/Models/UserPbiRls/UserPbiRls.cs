using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace EbeddedApi.Models
{
    public class UserPbiRls
    {

        public UserPbiRls()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Identificacao { get; set; }
        public string Empresa { get; set; }
        public Guid PerfilId { get; set; }
        [NotMapped]
        public string EmailContato { get; set; }
        [NotMapped]
        public DateTime? DataUltimoAcesso { get; set; }
        public virtual List<UserVisions> UserVisions { get; set; }
    }
}