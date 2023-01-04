using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EbeddedApi.Models.TFA
{
    public class UserTFA
    {
        public UserTFA()
        {
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }
        public string Email { get; set; }
        public bool? TFASettedUp { get; set; }
        public string TFASecretKey { get; set; }
    }
}