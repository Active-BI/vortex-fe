using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.Admin
{
    public class PreRegisterUserRequest
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Identificacao { get; set; }
        public string Role { get; set; }
        public List<string> Visions { get; set; }
        public List<string> Menus { get; set; }
        
    }
}