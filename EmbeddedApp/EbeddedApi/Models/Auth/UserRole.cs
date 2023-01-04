using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace EbeddedApi.Models.Auth
{
    public class UserRole : IdentityUserRole<Guid>
    {
        //public virtual User User { get; set; }
        //public virtual Role Role { get; set; }
    }
}