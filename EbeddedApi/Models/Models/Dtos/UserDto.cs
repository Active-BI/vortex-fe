
using EbeddedApi.Models;
using EbeddedApi.Models.Admin;
using System;

namespace Models.Models.Dtos
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string EmailContato { get; set; }
        public string Identificacao { get; set; }
        public Guid PerfilId { get; set; }
        public List<string> Visions { get; set; }
    }
}
