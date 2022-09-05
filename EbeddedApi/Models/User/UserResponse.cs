using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.User
{
    public class UserResponse
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Empresa { get; set; }
        public string Nome { get; set; }
        public string Identificacao { get; set; }
        public List<Vision> Visions { get; set; }
        public bool TfaSettedUp { get; set; }

    }
}