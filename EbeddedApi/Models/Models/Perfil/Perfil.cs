using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models
{
    public class Perfil
    {
        public Perfil()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }

        public List<UserPbiRls> Users { get; set; }
    }
}