using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EbeddedApi.Models.Auth
{
    public class Role : IdentityRole<Guid>
    {
        public Role()
        {
            Id = Guid.NewGuid();
        }
    }

}